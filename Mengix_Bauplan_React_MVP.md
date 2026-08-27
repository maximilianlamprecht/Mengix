# Mengix – Bauplan React-MVP (Frontend-Testphase)

Stand: August 2026 · Ergänzung zur "Mengix Geschäftsübersicht & Konzept-Basis"

Dieses Dokument beschreibt, wie der bestehende HTML-Prototyp als React-Anwendung neu und erweiterbar aufgebaut wird – bereit für echte Nutzertests, aber von Anfang an so strukturiert, dass Backend, E-Mail-Versand und später die WhatsApp-API angedockt werden können, ohne die Codebasis neu zu schreiben.

## 1. Entscheidungen (getroffen)

- **Tech-Stack:** React mit Vite (kein Next.js) – schlank und einfach für den Einstieg mit Claude Code.
- **Testphase-Versand:** Wizard of Oz. Die App zeigt "Mangel gesendet", die tatsächliche Weiterleitung an den Vermieter erfolgt in dieser Phase manuell durch Maximilian (z. B. Screenshot/WhatsApp) – kein echter Versand im Code nötig.
- **Sprache:** JavaScript (nicht TypeScript), passend zum bisherigen Kurs-Wissen. Kann später bei Bedarf schrittweise auf TypeScript umgestellt werden.

## 2. Architektur-Prinzip: austauschbare Datenschicht

Der wichtigste Punkt, damit "später Backend ergänzen" wirklich einfach bleibt: Die Bildschirme (Komponenten) dürfen niemals direkt mit "wie werden Daten gespeichert" verdrahtet sein. Stattdessen läuft jeder Datenzugriff über eine eigene Zwischenschicht.

```
src/
  services/
    mangelService.js   ← einzige Stelle, die "weiß", woher Daten kommen
```

Beispiel-Funktionen in `mangelService.js`, die die Komponenten aufrufen:

- `getMangelList()`
- `getMangelById(id)`
- `createMangel(data)`
- `updateMangelStatus(id, status)`

**Jetzt (Testphase):** Diese Funktionen arbeiten mit Daten im Arbeitsspeicher/`localStorage` des Browsers (kein echtes Backend).
**Später:** Nur der Inhalt dieser Funktionen wird ausgetauscht (z. B. gegen Supabase-Aufrufe) – die Komponenten selbst bleiben unverändert.

Genau dieses Prinzip ermöglicht "erst Frontend testen, dann Backend andocken", ohne dass die Test-Version später weggeworfen werden muss.

## 3. Vorgeschlagene Ordnerstruktur

```
src/
  components/       ← wiederverwendbare UI-Bausteine (Card, StatusBadge, RoomGrid, Button …)
  screens/          ← die einzelnen Bildschirme aus dem Prototyp
    Home.jsx
    Mangelliste.jsx
    MangelMelden/
      Step1Name.jsx
      Step2Raum.jsx
      Step3Foto.jsx
      Step4Beschreibung.jsx
    Erfolg.jsx
    Detail.jsx
  services/
    mangelService.js
  data/
    mockData.js       ← Testdaten (entspricht heutiger mangelList im Prototyp)
  App.jsx             ← Navigation/Routing
  main.jsx
```

## 4. Wichtige Verbesserung gegenüber dem HTML-Prototyp

Der bisherige Prototyp zeigt die App in einem gezeichneten "Handy-Rahmen" auf einer Desktop-Seite – gut für Kundengespräche/Präsentation, aber **nicht** für einen echten Nutzertest geeignet. Für den Test mit echten Mietern/Vermietern soll die App **vollflächig** im echten Browser des jeweiligen Handys laufen (responsive, ohne Phone-Mockup-Rahmen). Das ist eine der ersten Anpassungen beim React-Rebuild.

Weitere sinnvolle Verbesserungen beim Neubau:

- Formular-Validierung robuster (z. B. auch Schritt 2–4 prüfen, nicht nur Schritt 1).
- Navigation über echtes Routing (React Router) statt reinem Sichtbar/Unsichtbar-Umschalten – ermöglicht später z. B. direkte Links (relevant für den Vermieter-Link zur Status-Seite).
- Struktur vorbereiten für einen künftigen **Vermieter-Blick** (Statusseite, wie in der PDF-Vorlage zu sehen) als eigenen Screen/Route – auch wenn er in der Testphase nur simuliert wird.

## 5. Phasenplan

**Phase 1 – React-Rebuild (jetzt):**
Bestehenden Prototyp 1:1 nach React übertragen (siehe Ordnerstruktur), verbessert wie oben beschrieben, mit Mock-Daten lauffähig, responsive für echte Handys, online erreichbar (z. B. kostenlos über Vercel oder Netlify deploybar), damit echte Testpersonen per Link zugreifen können.

**Phase 2 – Nutzertest (Wizard of Oz):**
Test mit echten Mietern und Vermietern. Maximilian verschickt Meldungen in dieser Phase manuell weiter. Ziel: Feedback zu Verständlichkeit, fehlenden Funktionen, Vertrauen ("würde ich das nutzen?").

**Phase 3 – Backend andocken:**
Basierend auf Testergebnissen: `mangelService.js` auf echte Datenhaltung umstellen (empfohlen: Supabase für Datenbank, Nutzer-Accounts und Foto-Speicher – deutlich weniger Aufwand als ein komplett selbst gebautes Backend). E-Mail-Versand ergänzen (z. B. über Resend). DSGVO-Grundlagen umsetzen (EU-Hosting, Datenschutzerklärung, Datensparsamkeit).

**Phase 4 – WhatsApp-Anbindung:**
Offizielle WhatsApp Business API ergänzen (kostenpflichtig, mit Verifizierung) – wie im Konzept-Dokument vorgesehen, bewusst erst nach Validierung des Grundkonzepts.

**Phase 5 – Erweiterte Funktionen:**
Übergabeprotokoll-Vergleich (Einzug/Auszug), Vermieter-Bewertungen, KI-Assistenz/Mängel-Datenbank – laut Geschäftsübersicht, Kapitel 3.

## 6. Erste konkrete Schritte für Claude Code in VS Code

1. Neues Vite-React-Projekt aufsetzen (`npm create vite@latest`).
2. Ordnerstruktur gemäß Abschnitt 3 anlegen.
3. `mockData.js` mit den heutigen Testdaten aus dem Prototyp befüllen.
4. `mangelService.js` bauen (liest/schreibt vorerst nur `mockData`/`localStorage`).
5. Screens einzeln nachbauen, beginnend mit Home und Mängelliste.
6. React Router einbauen für die Navigation zwischen Screens.
7. Responsive/mobile-first umsetzen (kein Phone-Frame mehr).
8. Lokal testen, dann Deployment auf Vercel/Netlify vorbereiten.

---

*Dieses Dokument ist als lebende Arbeitsgrundlage gedacht, ergänzend zur Mengix-Geschäftsübersicht. Es wird mit fortschreitendem Projekt aktualisiert.*
