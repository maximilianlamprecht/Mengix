import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { createMangel } from '../../services/mangelService';

function Step4Beschreibung() {
  const { meldung } = useOutletContext();
  const navigate = useNavigate();
  const [desc, setDesc] = useState(meldung.desc);
  const [error, setError] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSenden() {
    const trimmed = desc.trim();
    if (!trimmed) {
      setError(true);
      return;
    }
    setSubmitError('');
    setSubmitting(true);
    try {
      const neuerMangel = await createMangel({
        name: meldung.name,
        room: meldung.room,
        desc: trimmed,
        photo: meldung.photoFile,
      });
      navigate('/erfolg', { state: { mangelId: neuerMangel.id } });
    } catch {
      setSubmitError('Senden hat nicht geklappt. Bitte versuch es noch einmal.');
      setSubmitting(false);
    }
  }

  return (
    <>
      <p className="wizard-step-label">Schritt 4 von 4</p>
      <p className="wizard-heading">Beschreibung</p>
      <p className="wizard-subheading">Beschreibe kurz, was nicht stimmt und seit wann.</p>

      <textarea
        className={`wizard-textarea ${error ? 'wizard-textarea--error' : ''}`}
        placeholder="Beschreibe kurz was nicht stimmt und seit wann …"
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
          setError(false);
        }}
      />
      {error && <p className="wizard-error-text">Bitte kurz beschreiben, was nicht stimmt.</p>}

      <div className="wizard-summary">
        <p className="wizard-summary-title">Zusammenfassung</p>
        <div className="wizard-summary-row">
          <span>Mangel</span>
          <span>{meldung.name || '–'}</span>
        </div>
        <div className="wizard-summary-row">
          <span>Raum</span>
          <span>{meldung.room || '–'}</span>
        </div>
        <div className="wizard-summary-row">
          <span>Foto</span>
          <span>{meldung.photoFile ? '1 Foto ✓' : 'Kein Foto'}</span>
        </div>
        <div className="wizard-summary-row">
          <span>Gesendet via</span>
          <span>E-Mail &amp; WhatsApp</span>
        </div>
      </div>

      {submitError && <p className="wizard-error-text">{submitError}</p>}

      <button type="button" className="wizard-primary-btn" onClick={handleSenden} disabled={submitting}>
        {submitting ? 'Wird gesendet …' : 'Mangel senden'}
      </button>
    </>
  );
}

export default Step4Beschreibung;
