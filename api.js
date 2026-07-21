// Configurazione + funzioni condivise da tutte le pagine
const API = 'https://paperelle-api.razvan-dumitru97.workers.dev';
const PUNTI_PREMIO = 10;

// --- token admin (salvato solo sul telefono del negozio) ---
const getToken = () => localStorage.getItem('admin_token') || '';
const setToken = (t) => localStorage.setItem('admin_token', t);
const logout = () => { localStorage.removeItem('admin_token'); location.href = 'index.html'; };

async function chiamaAPI(percorso, opzioni = {}) {
  const headers = { 'Content-Type': 'application/json', ...(opzioni.headers || {}) };
  const t = getToken();
  if (t) headers['Authorization'] = 'Bearer ' + t;
  const r = await fetch(API + percorso, { ...opzioni, headers });
  const dati = await r.json();
  if (!r.ok) throw new Error(dati.errore || 'errore ' + r.status);
  return dati;
}

// --- UI condivisa ---
function toast(msg, ms = 2600) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('visibile');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('visibile'), ms);
}

function disegnaTimbri(contenitore, punti, evidenziaUltimo = false) {
  contenitore.innerHTML = '';
  for (let i = 1; i <= PUNTI_PREMIO; i++) {
    const d = document.createElement('div');
    d.className = 'timbro' + (i <= punti ? ' pieno' : '') +
                  (evidenziaUltimo && i === punti ? ' nuovo' : '');
    d.textContent = '🦆';
    contenitore.appendChild(d);
  }
}

function formattaData(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  return d.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit' }) +
         ' ' + d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
}

const normUid = (u) => (u || '').toUpperCase().replace(/[^0-9A-F]/g, '');
