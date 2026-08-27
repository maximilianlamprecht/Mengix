# Projekt: Mengix – React-MVP (Frontend-Testphase)

## Was wir bauen
Mengix ist eine App, mit der Mieter Mängel in ihrer Wohnung melden (Name, Raum im Grundriss, Foto, Beschreibung). Aktuell bauen wir NUR das Frontend neu (React), basierend auf einem bestehenden Klick-Prototyp (`index.html` in diesem Ordner). Ziel dieser Phase: eine responsive React-App, mit der echte Mieter/Vermieter den Ablauf testen können – noch OHNE echtes Backend.

Vollständiger Hintergrund und Phasenplan: siehe `Mengix_Bauplan_React_MVP.md` in diesem Ordner. Bitte diese Datei zu Beginn lesen.

## Wichtigste Architektur-Regel
Alle Datenzugriffe laufen ausschließlich über `src/services/mangelService.js` (Funktionen wie `getMangelList()`, `createMangel()`, `updateMangelStatus()`). Komponenten dürfen NIEMALS direkt auf Testdaten oder späteren Backend-Code zugreifen – nur über diese Service-Schicht. Grund: Später wird nur der Inhalt dieser Datei gegen ein echtes Backend (Supabase) ausgetauscht, der Rest der App bleibt unverändert.

## Tech-Stack
- React mit Vite (kein Next.js)
- JavaScript, kein TypeScript
- React Router für Navigation zwischen Screens
- Vorerst keine Backend-Anbindung, keine echten E-Mails/WhatsApp-Nachrichten (Wizard-of-Oz-Testphase)

## Wichtige Anforderung an die UI
Die App muss responsive sein und auf echten Handys vollflächig laufen – KEIN gezeichneter "Phone-Frame" wie im alten `index.html`-Prototyp (der war nur für Präsentationszwecke gedacht).

## Arbeitsweise
- Bitte in kleinen, einzeln testbaren Schritten vorgehen (siehe Abschnitt 6 im Bauplan), nicht alles auf einmal umsetzen.
- Nach jedem Schritt kurz erklären, was ich (der Nutzer, kein erfahrener Programmierer) im Browser prüfen soll, bevor wir weitermachen.
- Ich kann keinen Code selbst schreiben oder lesen – bitte Änderungen in einfachen Worten zusammenfassen, nicht nur den Code zeigen.
