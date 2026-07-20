# Deploy su GitHub Pages + primo test

## 1. Pubblica su GitHub Pages

1. Vai su [github.com/new](https://github.com/new) → crea repo pubblico, es. `paperelle` (senza README).
2. Nel repo: **Add file → Upload files** → trascina i 3 file dalla cartella `app/`:
   - `index.html`
   - `sw.js`
   - `manifest.webmanifest`
3. **Commit changes**.
4. Repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main`, cartella `/ (root)` → **Save**.
5. Aspetta 1–2 minuti → l'URL sarà `https://TUOUSERNAME.github.io/paperelle/`.

## 2. Prepara un tag NTAG213

1. Installa **NFC Tools** (Play Store) sul tuo Android.
2. Tab **Scrivi** → Aggiungi record → Testo → scrivi qualsiasi cosa (o lascia vuoto) → **Scrivi** appoggiando il tag.
   Serve solo a formattarlo NDEF: senza questo `NDEFReader.scan()` non lo vede.
3. (Una volta sola per tag; il contenuto è irrilevante, conta solo l'UID.)

## 3. Test sul telefono

1. Apri l'URL in **Chrome su Android** (non Firefox, non Samsung Internet).
2. Tocca **Avvia scansione** → Chrome chiede il permesso NFC → consenti.
3. Appoggia il tag → dovresti vedere "Ciao! 1/10" con l'animazione.
4. Riappoggia subito → "Punto già registrato" (cooldown 3 h attivo). ✔
5. **Admin:** tocca 5 volte l'angolo in basso a destra → PIN `1234`.
   - Cambia subito il PIN.
   - Prova export backup (condividi su Drive/WhatsApp) e import.

## 4. Se qualcosa non va

| Problema | Causa probabile |
|---|---|
| "Web NFC non supportato" | Non è Chrome/Android, o pagina non HTTPS |
| Il tap non fa nulla | Tag non formattato NDEF (punto 2), o NFC spento nelle impostazioni |
| Schermo si spegne | Wake lock parte solo dopo "Avvia scansione"; controlla anche timeout schermo Android |
| Dopo riavvio Chrome scansione ferma | Normale: Web NFC richiede sempre il tocco su "Avvia scansione" |

## Note

- I dati stanno solo in IndexedDB di Chrome sul telefono: **non cancellare i dati di navigazione** di quel sito, e fai export backup regolarmente.
- Premio a 10 punti → schermata premio → counter azzerato automaticamente.
- Costanti modificabili in cima allo `<script>` di `index.html`: `PUNTI_PREMIO`, `COOLDOWN_ORE`, `PIN_DEFAULT`.
