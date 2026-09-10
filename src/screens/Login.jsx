import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { signIn } from '../services/authService';
import { useAuth } from '../context/useAuth';
import './Login.css';

function Login() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (session) {
    const zielSeite = location.state?.von?.pathname || '/';
    return <Navigate to={zielSeite} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email.trim(), password);
      const zielSeite = location.state?.von?.pathname || '/';
      navigate(zielSeite, { replace: true });
    } catch {
      setError('E-Mail oder Passwort ist falsch.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login">
      <p className="login__title">Anmelden</p>
      <p className="login__subtitle">Melde dich mit deinem Mengix-Konto an.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="login__input"
          placeholder="E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
        <input
          type="password"
          className="login__input"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
        {error && <p className="login__error">{error}</p>}
        <button type="submit" className="login__btn" disabled={loading}>
          {loading ? 'Wird geprüft …' : 'Anmelden'}
        </button>
      </form>
    </div>
  );
}

export default Login;
