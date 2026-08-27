import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const HAEUFIGE_MAENGEL = ['Heizung defekt', 'Schimmel', 'Fenster defekt', 'Steckdose', 'Türschloss'];

function Step1Name() {
  const { meldung, setMeldung } = useOutletContext();
  const navigate = useNavigate();
  const [name, setName] = useState(meldung.name);
  const [error, setError] = useState(false);

  function handleWeiter() {
    const trimmed = name.trim();
    if (!trimmed) {
      setError(true);
      return;
    }
    setMeldung((prev) => ({ ...prev, name: trimmed }));
    navigate('/melden/raum');
  }

  return (
    <>
      <p className="wizard-step-label">Schritt 1 von 4</p>
      <p className="wizard-heading">Wie heißt der Mangel?</p>
      <p className="wizard-subheading">Gib dem Mangel einen kurzen, beschreibenden Namen.</p>

      <input
        type="text"
        className={`wizard-input ${error ? 'wizard-input--error' : ''}`}
        placeholder={error ? 'Bitte einen Namen eingeben …' : 'z.B. Wasserhahn tropft …'}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError(false);
        }}
      />

      <p className="wizard-chips-label">Häufige Mängel</p>
      <div className="wizard-chips">
        {HAEUFIGE_MAENGEL.map((label) => (
          <button
            key={label}
            type="button"
            className={`wizard-chip ${name === label ? 'wizard-chip--active' : ''}`}
            onClick={() => {
              setName(label);
              setError(false);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <button type="button" className="wizard-primary-btn" onClick={handleWeiter}>
        Weiter
      </button>
    </>
  );
}

export default Step1Name;
