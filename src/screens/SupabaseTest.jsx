import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

function SupabaseTest() {
  const [status, setStatus] = useState('pruefe');
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ error }) => {
        if (error) throw error;
        setStatus('erfolg');
      })
      .catch((error) => {
        setStatus('fehler');
        setMessage(error.message);
      });
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Supabase-Verbindungstest</h1>
      {status === 'pruefe' && <p>Verbindung wird geprüft …</p>}
      {status === 'erfolg' && <p style={{ color: '#3B6D11' }}>✅ Verbindung zu Supabase erfolgreich.</p>}
      {status === 'fehler' && (
        <p style={{ color: '#A32D2D' }}>❌ Verbindung fehlgeschlagen: {message}</p>
      )}
      <p style={{ color: '#888', fontSize: 13, marginTop: 16 }}>
        Projekt-URL: {import.meta.env.VITE_SUPABASE_URL}
      </p>
    </div>
  );
}

export default SupabaseTest;
