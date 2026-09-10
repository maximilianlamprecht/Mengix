import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './screens/Login';
import Home from './screens/Home';
import Mangelliste from './screens/Mangelliste';
import Detail from './screens/Detail';
import Erfolg from './screens/Erfolg';
import MangelMeldenLayout from './screens/MangelMelden/MangelMeldenLayout';
import Step1Name from './screens/MangelMelden/Step1Name';
import Step2Raum from './screens/MangelMelden/Step2Raum';
import Step3Foto from './screens/MangelMelden/Step3Foto';
import Step4Beschreibung from './screens/MangelMelden/Step4Beschreibung';
import SupabaseTest from './screens/SupabaseTest';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/supabase-test" element={<SupabaseTest />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/maengel" element={<Mangelliste />} />
              <Route path="/maengel/:id" element={<Detail />} />
            </Route>
            <Route path="/erfolg" element={<Erfolg />} />
            <Route path="/melden" element={<MangelMeldenLayout />}>
              <Route path="name" element={<Step1Name />} />
              <Route path="raum" element={<Step2Raum />} />
              <Route path="foto" element={<Step3Foto />} />
              <Route path="beschreibung" element={<Step4Beschreibung />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
