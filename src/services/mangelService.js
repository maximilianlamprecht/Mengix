import { supabase } from './supabaseClient';

const FOTO_BUCKET = 'mangel-fotos';

const STATUS_LABELS = {
  bopen: 'Offen',
  bprog: 'In Bearbeitung',
  bdone: 'Erledigt',
};

const MONATE = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

function formatDatum(date) {
  return `${date.getDate()}. ${MONATE[date.getMonth()]} ${date.getFullYear()}`;
}

function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    room: row.room,
    datum: formatDatum(new Date(row.created_at)),
    status: row.status,
    statusText: STATUS_LABELS[row.status] ?? row.status,
    desc: row.description,
    photo: row.photo_url,
  };
}

export async function getMangelList() {
  const { data, error } = await supabase
    .from('maengel')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data.map(mapRow);
}

export async function getMangelById(id) {
  const { data, error } = await supabase.from('maengel').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : null;
}

async function uploadFoto(userId, file) {
  const endung = file.name.includes('.') ? file.name.split('.').pop() : 'jpg';
  const pfad = `${userId}/${crypto.randomUUID()}.${endung}`;

  const { error } = await supabase.storage.from(FOTO_BUCKET).upload(pfad, file);
  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(FOTO_BUCKET).getPublicUrl(pfad);
  return publicUrl;
}

export async function createMangel(data) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const photoUrl = data.photo ? await uploadFoto(user.id, data.photo) : null;

  const { data: row, error } = await supabase
    .from('maengel')
    .insert({
      user_id: user.id,
      name: data.name,
      room: data.room,
      description: data.desc,
      photo_url: photoUrl,
    })
    .select()
    .single();

  if (error) throw error;
  return mapRow(row);
}

export async function updateMangelStatus(id, status) {
  const { data: row, error } = await supabase
    .from('maengel')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return mapRow(row);
}
