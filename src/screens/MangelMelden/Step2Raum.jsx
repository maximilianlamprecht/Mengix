import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const RAEUME = [
  { key: 'bad', label: 'Badezimmer' },
  { key: 'kue', label: 'Küche' },
  { key: 'wohn', label: 'Wohnzimmer' },
  { key: 'schlaf', label: 'Schlafzimmer' },
  { key: 'flur', label: 'Flur' },
];

function Step2Raum() {
  const { meldung, setMeldung } = useOutletContext();
  const navigate = useNavigate();
  const [roomKey, setRoomKey] = useState(meldung.roomKey);

  function handleWeiter() {
    const raum = RAEUME.find((r) => r.key === roomKey);
    setMeldung((prev) => ({ ...prev, roomKey: raum.key, room: raum.label }));
    navigate('/melden/foto');
  }

  return (
    <>
      <p className="wizard-step-label">Schritt 2 von 4</p>
      <p className="wizard-heading">Wo ist der Mangel?</p>
      <p className="wizard-subheading">Wähle den Raum aus deinem Grundriss.</p>

      <div className="wizard-room-box">
        <p className="wizard-room-hint">Grundriss — tippe auf einen Raum</p>
        <div className="wizard-room-grid">
          {RAEUME.map((raum) => (
            <button
              key={raum.key}
              type="button"
              className={`wizard-room ${roomKey === raum.key ? 'wizard-room--active' : ''} ${
                raum.key === 'flur' ? 'wizard-room--wide' : ''
              }`}
              onClick={() => setRoomKey(raum.key)}
            >
              {raum.label}
            </button>
          ))}
        </div>
      </div>

      <button type="button" className="wizard-primary-btn" onClick={handleWeiter}>
        Weiter
      </button>
    </>
  );
}

export default Step2Raum;
