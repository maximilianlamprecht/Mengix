import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMangelList } from '../services/mangelService';
import { getProfile } from '../services/profileService';
import { useAuth } from '../context/useAuth';
import MangelCard from '../components/MangelCard';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [profile, setProfile] = useState(null);
  const [mangelList, setMangelList] = useState([]);
  const offenCount = mangelList.filter((m) => m.status === 'bopen').length;
  const progCount = mangelList.filter((m) => m.status === 'bprog').length;
  const doneCount = mangelList.filter((m) => m.status === 'bdone').length;
  const letzteAktivitaet = mangelList.slice(0, 2);

  useEffect(() => {
    if (!session) return;
    getProfile(session.user.id)
      .then(setProfile)
      .catch(() => setProfile(null));
    getMangelList()
      .then(setMangelList)
      .catch(() => setMangelList([]));
  }, [session]);

  return (
    <div className="home">
      <p className="home__greeting">Guten Morgen</p>
      <p className="home__name">{profile?.name || '…'}</p>

      <div className="home__apartment">
        <p className="home__apartment-label">Meine Wohnung</p>
        <p className="home__apartment-address">Hauptstraße 12, Wien</p>
        <p className="home__apartment-sub">Top 4 · 1010 Wien</p>
        <div className="home__stats">
          <div className="home__stat">
            <p className="home__stat-value">{offenCount}</p>
            <p className="home__stat-label">Offen</p>
          </div>
          <div className="home__stat">
            <p className="home__stat-value">{progCount}</p>
            <p className="home__stat-label">In Bearbeitung</p>
          </div>
          <div className="home__stat">
            <p className="home__stat-value">{doneCount}</p>
            <p className="home__stat-label">Erledigt</p>
          </div>
        </div>
      </div>

      <Link to="/melden/name" className="home__report-btn">
        + Mangel melden
      </Link>

      <p className="home__section-title">Letzte Aktivität</p>
      {letzteAktivitaet.map((mangel) => (
        <MangelCard key={mangel.id} mangel={mangel} onClick={() => navigate(`/maengel/${mangel.id}`)} />
      ))}
    </div>
  );
}

export default Home;
