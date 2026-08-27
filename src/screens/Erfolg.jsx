import { Link, useLocation } from 'react-router-dom';
import './Erfolg.css';

function Erfolg() {
  const { state } = useLocation();
  const statusLink = state?.mangelId ? `/maengel/${state.mangelId}` : '/maengel';

  return (
    <div className="erfolg">
      <div className="erfolg__icon">
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
          <path
            d="M20 6L9 17l-5-5"
            stroke="#3B6D11"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="erfolg__title">Mangel gesendet!</p>
      <p className="erfolg__subtitle">Dein Vermieter wurde sofort benachrichtigt.</p>
      <p className="erfolg__hint">Du siehst den Status in Echtzeit.</p>

      <div className="erfolg__sent-box">
        <p className="erfolg__sent-label">Gesendet an</p>
        <div className="erfolg__sent-row">
          <div className="erfolg__sent-icon erfolg__sent-icon--whatsapp">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.21 12.21 0 00-.49-.014c-.17 0-.445.064-.678.31-.232.245-.887.867-.887 2.11s.908 2.444 1.034 2.613c.127.17 1.788 2.73 4.332 3.829.605.261 1.078.418 1.446.537.608.194 1.16.166 1.598.1.488-.073 1.503-.614 1.715-1.208.213-.593.213-1.102.149-1.208-.064-.106-.232-.17-.49-.298z" />
              <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.854.505 3.586 1.382 5.078L2 22l5.082-1.357A9.978 9.978 0 0012.004 22C17.524 22 22 17.52 22 12S17.524 2 12.004 2z" />
            </svg>
          </div>
          <span>+43 660 123 4567</span>
        </div>
        <div className="erfolg__sent-row">
          <div className="erfolg__sent-icon erfolg__sent-icon--email">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                stroke="#185FA5"
                strokeWidth="1.5"
              />
              <polyline points="22,6 12,13 2,6" stroke="#185FA5" strokeWidth="1.5" />
            </svg>
          </div>
          <span>vermieter@email.at</span>
        </div>
      </div>

      <Link to={statusLink} className="erfolg__btn-primary">
        Status verfolgen
      </Link>
      <Link to="/" className="erfolg__btn-secondary">
        Zurück zur Übersicht
      </Link>
    </div>
  );
}

export default Erfolg;
