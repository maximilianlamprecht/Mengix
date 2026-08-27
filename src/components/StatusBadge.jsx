import './StatusBadge.css';

function StatusBadge({ status, children }) {
  return <span className={`status-badge status-badge--${status}`}>{children}</span>;
}

export default StatusBadge;
