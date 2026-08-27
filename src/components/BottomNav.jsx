import { NavLink } from 'react-router-dom';
import './BottomNav.css';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
          <path
            d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/maengel"
        className={({ isActive }) => `bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}
      >
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span>Mängel</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
