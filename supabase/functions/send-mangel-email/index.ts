// Supabase Edge Function: wird von mangelService.js direkt nach dem
// Speichern eines neuen Mangels aufgerufen. Schickt eine formatierte
// E-Mail über Resend an den Vermieter (oder, im Test-Modus, an eine
// feste Test-Adresse).

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const TEST_EMAIL_OVERRIDE = Deno.env.get('TEST_EMAIL_OVERRIDE');

// Wird direkt aus dem Browser aufgerufen (nicht mehr per Database Webhook) -
// ohne diese Kopfzeilen blockiert der Browser den Aufruf (CORS).
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function escapeHtml(text: string) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const payload = await req.json();
  const mangel = payload.record;

  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('name, phone, landlord_email')
    .eq('id', mangel.user_id)
    .single();

  if (profileError || !profile) {
    console.error('Profil nicht gefunden für user_id', mangel.user_id, profileError);
    return new Response('Profil nicht gefunden', { status: 200, headers: corsHeaders });
  }

  const meldungsNr = `#MNG-${new Date(mangel.created_at).getFullYear()}-${String(
    mangel.report_number
  ).padStart(4, '0')}`;

  const datum = new Date(mangel.created_at).toLocaleString('de-AT', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const zielAdresse = TEST_EMAIL_OVERRIDE || profile.landlord_email;
  const testHinweis = TEST_EMAIL_OVERRIDE
    ? `<p style="background:#FAEEDA;color:#854F0B;padding:10px 14px;border-radius:8px;font-size:13px;margin:0 0 16px;">TEST-MODUS – würde eigentlich an: ${escapeHtml(
        profile.landlord_email
      )} gehen</p>`
    : '';

  const fotoHtml = mangel.photo_url
    ? `<p style="font-weight:600;margin:20px 0 8px;">Foto</p>
       <img src="${mangel.photo_url}" style="max-width:100%;border-radius:10px;display:block;" />`
    : '';

  const html = `
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;color:#111;">
    <div style="background:#0F6E56;color:#fff;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;border-radius:8px 8px 0 0;">
      <strong style="font-size:18px;">Mengix</strong>
      <span style="font-size:13px;">Mangelsmeldung</span>
    </div>
    <div style="border:1px solid #e5e5e5;border-top:none;padding:20px;border-radius:0 0 8px 8px;">
      ${testHinweis}
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
        <span style="background:#FCEBEB;color:#A32D2D;padding:3px 10px;border-radius:20px;font-size:12px;">● Neu gemeldet</span>
        <span style="color:#888;font-size:13px;">${datum} Uhr</span>
      </div>
      <h1 style="font-size:22px;margin:0 0 4px;">${escapeHtml(mangel.name)}</h1>
      <p style="color:#888;font-size:13px;margin:0 0 20px;">${escapeHtml(mangel.room)}</p>

      <table style="width:100%;border-collapse:collapse;margin-bottom:20px;border-top:2px solid #0F6E56;">
        <tr style="color:#888;font-size:11px;">
          <td style="padding:10px 0 4px;">MIETER</td>
          <td style="padding:10px 0 4px;">RAUM</td>
          <td style="padding:10px 0 4px;">KONTAKT</td>
          <td style="padding:10px 0 4px;">MELDUNGS-NR.</td>
        </tr>
        <tr style="font-weight:600;font-size:14px;">
          <td style="padding:0 0 10px;">${escapeHtml(profile.name)}</td>
          <td style="padding:0 0 10px;">${escapeHtml(mangel.room)}</td>
          <td style="padding:0 0 10px;">${escapeHtml(profile.phone || '–')}</td>
          <td style="padding:0 0 10px;">${meldungsNr}</td>
        </tr>
      </table>

      <p style="font-weight:600;margin:0 0 8px;">Beschreibung</p>
      <p style="background:#f8f8f8;padding:14px;border-radius:10px;font-size:14px;line-height:1.6;">${escapeHtml(
        mangel.description
      )}</p>

      ${fotoHtml}

      <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
      <p style="color:#aaa;font-size:12px;">Mengix · Automatisch generiert · Meldung ${meldungsNr}</p>
    </div>
  </div>`;

  const resendResp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Mengix <onboarding@resend.dev>',
      to: zielAdresse,
      subject: `Neue Mängelmeldung – ${mangel.name} (${meldungsNr})`,
      html,
    }),
  });

  if (!resendResp.ok) {
    const errText = await resendResp.text();
    console.error('Resend-Fehler:', errText);
    return new Response('E-Mail-Versand fehlgeschlagen', { status: 500, headers: corsHeaders });
  }

  return new Response('OK', { status: 200, headers: corsHeaders });
});
