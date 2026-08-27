import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './wizard.css';

const STEP_ORDER = ['/melden/name', '/melden/raum', '/melden/foto', '/melden/beschreibung'];

function MangelMeldenLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [meldung, setMeldung] = useState({
    name: '',
    roomKey: 'bad',
    room: 'Badezimmer',
    photoDataUrl: null,
    photoName: '',
    desc: '',
  });

  const currentIndex = STEP_ORDER.indexOf(location.pathname);
  const backTarget = currentIndex <= 0 ? '/' : STEP_ORDER[currentIndex - 1];

  return (
    <div className="wizard">
      <div className="wizard-topbar">
        <button
          type="button"
          className="wizard-back"
          aria-label="Zurück"
          onClick={() => navigate(backTarget)}
        >
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
            <path
              d="M19 12H5M12 5l-7 7 7 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="wizard-title">Mangel melden</p>
      </div>

      <div className="wizard-progress">
        {STEP_ORDER.map((path, i) => (
          <div
            key={path}
            className={`wizard-progress__seg ${i <= currentIndex ? 'wizard-progress__seg--active' : ''}`}
          />
        ))}
      </div>

      <div className="wizard-content">
        <Outlet context={{ meldung, setMeldung }} />
      </div>
    </div>
  );
}

export default MangelMeldenLayout;
