import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMangelList } from '../services/mangelService';
import MangelCard from '../components/MangelCard';
import './Mangelliste.css';

const FILTERS = [
  { label: 'Alle', status: null },
  { label: 'Offen', status: 'bopen' },
  { label: 'In Bearbeitung', status: 'bprog' },
  { label: 'Erledigt', status: 'bdone' },
];

function Mangelliste() {
  const navigate = useNavigate();
  const [activeStatus, setActiveStatus] = useState(null);
  const [mangelList, setMangelList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMangelList()
      .then(setMangelList)
      .catch(() => setMangelList([]))
      .finally(() => setLoading(false));
  }, []);

  const gefiltert = activeStatus
    ? mangelList.filter((mangel) => mangel.status === activeStatus)
    : mangelList;

  return (
    <div className="mangelliste">
      <p className="mangelliste__title">Meine Mängel</p>

      <div className="mangelliste__filters">
        {FILTERS.map((filter) => (
          <button
            key={filter.label}
            type="button"
            className={`chip ${activeStatus === filter.status ? 'chip--active' : ''}`}
            onClick={() => setActiveStatus(filter.status)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="mangelliste__empty">Lädt …</p>
      ) : gefiltert.length === 0 ? (
        <p className="mangelliste__empty">Keine Mängel in dieser Kategorie.</p>
      ) : (
        gefiltert.map((mangel) => (
          <MangelCard key={mangel.id} mangel={mangel} onClick={() => navigate(`/maengel/${mangel.id}`)} />
        ))
      )}
    </div>
  );
}

export default Mangelliste;
