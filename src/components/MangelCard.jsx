import StatusBadge from './StatusBadge';
import './MangelCard.css';

function MangelCard({ mangel, onClick }) {
  return (
    <div className="mangel-card" onClick={onClick}>
      <div className="mangel-card__info">
        <p className="mangel-card__name">{mangel.name}</p>
        <p className="mangel-card__meta">
          {mangel.room} · {mangel.datum}
        </p>
      </div>
      <StatusBadge status={mangel.status}>{mangel.statusText}</StatusBadge>
    </div>
  );
}

export default MangelCard;
