import { useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const MAX_PHOTO_MB = 8;

function Step3Foto() {
  const { meldung, setMeldung } = useOutletContext();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [photoDataUrl, setPhotoDataUrl] = useState(meldung.photoDataUrl);
  const [photoName, setPhotoName] = useState(meldung.photoName);
  const [photoSizeMB, setPhotoSizeMB] = useState('');
  const [error, setError] = useState('');

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeMB = file.size / 1024 / 1024;
    if (sizeMB > MAX_PHOTO_MB) {
      setError(`Foto zu groß (${sizeMB.toFixed(1)} MB). Maximal ${MAX_PHOTO_MB} MB erlaubt.`);
      e.target.value = '';
      return;
    }
    setError('');
    setPhotoName(file.name);
    setPhotoSizeMB(sizeMB.toFixed(1));
    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoDataUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  function handleWeiter() {
    setMeldung((prev) => ({ ...prev, photoDataUrl, photoName }));
    navigate('/melden/beschreibung');
  }

  return (
    <>
      <p className="wizard-step-label">Schritt 3 von 4</p>
      <p className="wizard-heading">Foto hinzufügen</p>
      <p className="wizard-subheading">Ein Foto hilft dem Vermieter, den Mangel einzuschätzen.</p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {!photoDataUrl ? (
        <div className="wizard-upload-box" onClick={() => fileInputRef.current.click()}>
          <div className="wizard-upload-icon">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
                stroke="#888"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="13" r="4" stroke="#888" strokeWidth="1.5" />
            </svg>
          </div>
          <p className="wizard-upload-title">Foto aufnehmen</p>
          <p className="wizard-upload-sub">oder aus Galerie wählen</p>
        </div>
      ) : null}

      {error && <p className="wizard-error-text">{error}</p>}

      {photoDataUrl && (
        <div className="wizard-photo-added">
          <img src={photoDataUrl} alt="Vorschau des hochgeladenen Fotos" />
          <div className="wizard-photo-confirm">
            <div className="wizard-photo-confirm-icon">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="wizard-photo-confirm-name">{photoName} hinzugefügt</p>
              <p className="wizard-photo-confirm-size">{photoSizeMB} MB</p>
            </div>
          </div>
        </div>
      )}

      <button type="button" className="wizard-primary-btn" onClick={handleWeiter}>
        Weiter
      </button>
    </>
  );
}

export default Step3Foto;
