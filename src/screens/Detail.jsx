import { useNavigate, useParams } from 'react-router-dom';
import { getMangelById } from '../services/mangelService';
import StatusBadge from '../components/StatusBadge';
import './Detail.css';

function BackButton({ onClick }) {
  return (
    <button type="button" className="detail__back" aria-label="Zurück" onClick={onClick}>
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
  );
}

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mangel = getMangelById(id);

  if (!mangel) {
    return (
      <div className="detail">
        <div className="detail__topbar">
          <BackButton onClick={() => navigate('/maengel')} />
          <p className="detail__topbar-title">Mangeldetails</p>
        </div>
        <p className="detail__not-found">Dieser Mangel wurde nicht gefunden.</p>
      </div>
    );
  }

  const inBearbeitungErreicht = mangel.status === 'bprog' || mangel.status === 'bdone';
  const erledigtErreicht = mangel.status === 'bdone';

  return (
    <div className="detail">
      <div className="detail__topbar">
        <BackButton onClick={() => navigate('/maengel')} />
        <p className="detail__topbar-title">Mangeldetails</p>
      </div>

      <div className="detail__content">
        <div className="detail__header">
          <div>
            <p className="detail__title">{mangel.name}</p>
            <p className="detail__meta">
              {mangel.room} · {mangel.datum}
            </p>
          </div>
          <StatusBadge status={mangel.status}>{mangel.statusText}</StatusBadge>
        </div>

        <div className="detail__photo">
          {mangel.photo ? (
            <img src={mangel.photo} alt="" />
          ) : (
            <svg width="38" height="38" fill="none" viewBox="0 0 24 24">
              <path
                d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
                stroke="#ccc"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="13" r="4" stroke="#ccc" strokeWidth="1.5" />
            </svg>
          )}
        </div>

        <div className="detail__desc-box">
          <p className="detail__desc-label">Beschreibung</p>
          <p className="detail__desc-text">{mangel.desc || '–'}</p>
        </div>

        <p className="detail__timeline-title">Status-Verlauf</p>
        <div className="detail__timeline">
          <div className="detail__tl-item">
            <div className="detail__tl-marker">
              <div className="detail__tl-dot detail__tl-dot--active" />
              <div className="detail__tl-line" />
            </div>
            <div className="detail__tl-body">
              <p className="detail__tl-title">Mangel gemeldet</p>
              <p className="detail__tl-date">{mangel.datum}</p>
              <p className="detail__tl-text">Vermieter per E-Mail &amp; WhatsApp benachrichtigt.</p>
            </div>
          </div>

          <div className="detail__tl-item">
            <div className="detail__tl-marker">
              <div className={`detail__tl-dot ${inBearbeitungErreicht ? 'detail__tl-dot--active' : ''}`} />
              <div className="detail__tl-line" />
            </div>
            <div className="detail__tl-body">
              <p className={`detail__tl-title ${!inBearbeitungErreicht ? 'detail__tl-title--pending' : ''}`}>
                In Bearbeitung
              </p>
              <p className="detail__tl-text">
                {inBearbeitungErreicht ? 'Vermieter bearbeitet den Mangel.' : 'Ausstehend'}
              </p>
            </div>
          </div>

          <div className="detail__tl-item">
            <div className="detail__tl-marker">
              <div className={`detail__tl-dot ${erledigtErreicht ? 'detail__tl-dot--active' : ''}`} />
            </div>
            <div className="detail__tl-body">
              <p className={`detail__tl-title ${!erledigtErreicht ? 'detail__tl-title--pending' : ''}`}>Erledigt</p>
              <p className="detail__tl-text">{erledigtErreicht ? 'Mangel wurde behoben.' : 'Ausstehend'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
