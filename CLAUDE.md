# Projekt: Mengix – React-App (jetzt: Backend-Phase mit Login)

## Was wir bauen
Mengix ist eine App, mit der Mieter Mängel in ihrer Wohnung melden (Name, Raum im Grundriss, Foto, Beschreibung). Phase 1 (reines Frontend mit lokalen Testdaten) ist abgeschlossen und live unter mengix.vercel.app, aktuell im Test mit echten Mietern/Vermietern (Wizard-of-Oz, kleine Gruppe von ca. 5 vertrauenswürdigen Testpersonen, nicht öffentlich verbreiten).

Jetzt beginnt die Backend-Phase: Anbindung an Supabase, damit es echte Nutzerkonten (Login) statt eines geteilten Zugangscodes gibt, Daten dauerhaft zentral gespeichert werden (nicht mehr nur lokal im Browser), und ein gemeldeter Mangel automatisch per E-Mail an den Vermieter geschickt wird (Inhalt/Aufbau orientiert sich an `Mengix_QR_Code.pdf` bzw. der Mangelmeldungs-Vorlage: Mieter, Raum, Beschreibung, Foto, Meldungs-Nummer).

Hintergrund/Entscheidungsverlauf (für den roten Faden): Maximilians Mentor Dietmar hatte empfohlen, gleich auf eigener Infrastruktur (Hetzner-Server + Coolify, eigenes Backend statt Supabase) aufzubauen, um einen späteren Migrationsaufwand zu vermeiden. Nach Abwägung (Server-Kosten ca. 4–5 €/Monat, deutlich mehr eigener Code, Wartungsaufwand für einen nicht-technischen Nutzer) wurde bewusst entschieden, für die aktuelle Testphase trotzdem bei Supabase zu bleiben – in dem Wissen, dass ein späterer Umzug auf eigene Infrastruktur mehr Aufwand bedeuten kann. Das ist eine bewusste, begründete Entscheidung, keine vergessene Rücksprache mit Dietmar.

Vollständiger Hintergrund zu Phase 1: siehe `Mengix_Bauplan_React_MVP.md` in diesem Ordner.

## Wichtigste Architektur-Regel (weiterhin gültig)
Alle Datenzugriffe laufen ausschließlich über `src/services/mangelService.js` (Funktionen wie `getMangelList()`, `createMangel()`, `updateMangelStatus()`). Komponenten dürfen NIEMALS direkt auf Supabase oder Testdaten zugreifen – nur über diese Service-Schicht. Jetzt wird der Inhalt dieser Datei von lokalen Testdaten (localStorage) auf echte Supabase-Aufrufe umgestellt; der Rest der App (Screens, Komponenten) soll dabei möglichst unverändert bleiben.

## Tech-Stack
- React mit Vite (weiterhin – KEINE Umstellung auf Next.js)
- JavaScript, kein TypeScript
- React Router
- NEU: Supabase (Postgres-Datenbank, Auth für Login, Storage für Fotos), Projekt-Region Frankfurt (EU)
- NEU: E-Mail-Versand über Resend (oder vergleichbaren Dienst), ausgelöst über eine Supabase Edge Function, sobald ein neuer Mangel gespeichert wird – kein eigener Server dafür nötig
- Supabase- UND Resend-Zugangsdaten (Project URL, anon/public Key, Resend API-Key) werden als Umgebungsvariablen (`.env`) bzw. sichere Supabase-Secrets gespeichert, NIEMALS direkt im Code oder auf GitHub. `.env` muss in `.gitignore` stehen.
- Deployment weiterhin über GitHub → Vercel (automatisch bei jedem Push)
- Laufende Kosten in der Testphase: 0 €, solange Supabase- und Resend-Gratis-Tarif ausreichen (Supabase-Gratis-Tarif: 500 MB Datenbank, 1 GB Foto-Speicher, bis 50.000 aktive Nutzer/Monat – für ca. 5 Testpersonen mehr als ausreichend; Projekt pausiert nach 1 Woche Inaktivität automatisch, lässt sich aber jederzeit mit einem Klick reaktivieren).

## E-Mail-Versand an den Vermieter
Sobald ein Mangel über `createMangel()` gespeichert wird, soll automatisch eine E-Mail an die im jeweiligen Wohnungs-/Vermieter-Datensatz hinterlegte Adresse gehen. Inhalt/Aufbau an der bestehenden Mangelmeldungs-Vorlage orientieren (Mieter, Raum/Adresse, Beschreibung, Foto, Meldungs-Nummer, Status). Der Vermieter muss dafür (in dieser Phase) noch keinen eigenen Account haben – die E-Mail selbst reicht als Benachrichtigung; ein Link/Button zum Ändern des Status kann folgen, sobald die Grundfunktion steht.

## Neue Regeln für die Backend-Arbeit (Empfehlung meines Mentors)
- Keine neuen Datenbank-Tabellen oder größere Backend-Erweiterungen ohne vorherige Rücksprache mit mir. Bitte immer erst einen Vorschlag machen (welche Tabellen, welche Felder, warum), bevor etwas angelegt wird.
- Datenbankstruktur bewusst schlank halten – so wenige Tabellen wie möglich, nicht mehr als nötig für die aktuellen Funktionen.
- Vor jedem neuen Feature: bestehende Nutzerführung/UX perfektionieren und testen, nicht einfach neue Funktionen anhäufen.
- Ein aktuelles Kontext-Dokument über die gesamte Codebase pflegen ("roter Faden") und bei jeder größeren Änderung aktualisieren, damit nichts isoliert oder inkonsistent gebaut wird.

## Wichtige Anforderung an die UI
Die App muss responsive sein und auf echten Handys vollflächig laufen – kein gezeichneter "Phone-Frame".

## Arbeitsweise
- Bitte in kleinen, einzeln testbaren Schritten vorgehen, nicht alles auf einmal umsetzen.
- Nach jedem Schritt kurz erklären, was ich (der Nutzer, kein erfahrener Programmierer) im Browser prüfen soll, bevor wir weitermachen.
- Ich kann keinen Code selbst schreiben oder lesen – bitte Änderungen in einfachen Worten zusammenfassen, nicht nur den Code zeigen.
- Bei sicherheitsrelevanten Dingen (Zugangsdaten, Schlüssel) explizit erklären, wo sie gespeichert werden und warum das sicher ist.
