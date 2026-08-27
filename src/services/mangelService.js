import { mangelList as initialMangelList } from '../data/mockData';

const STORAGE_KEY = 'mengix_mangel_list';

const STATUS_LABELS = {
  bopen: 'Offen',
  bprog: 'In Bearbeitung',
  bdone: 'Erledigt',
};

function loadList() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [...initialMangelList];
  try {
    return JSON.parse(raw);
  } catch {
    return [...initialMangelList];
  }
}

function saveList(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

const MONATE = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

function heutigesDatum() {
  const heute = new Date();
  return `${heute.getDate()}. ${MONATE[heute.getMonth()]} ${heute.getFullYear()}`;
}

export function getMangelList() {
  return loadList();
}

export function getMangelById(id) {
  return loadList().find((mangel) => mangel.id === id) ?? null;
}

export function createMangel(data) {
  const list = loadList();
  const neuerMangel = {
    id: crypto.randomUUID(),
    status: 'bopen',
    statusText: STATUS_LABELS.bopen,
    datum: heutigesDatum(),
    desc: '',
    photo: null,
    ...data,
  };
  saveList([neuerMangel, ...list]);
  return neuerMangel;
}

export function updateMangelStatus(id, status) {
  const list = loadList();
  const updatedList = list.map((mangel) =>
    mangel.id === id
      ? { ...mangel, status, statusText: STATUS_LABELS[status] ?? mangel.statusText }
      : mangel
  );
  saveList(updatedList);
  return updatedList.find((mangel) => mangel.id === id) ?? null;
}
