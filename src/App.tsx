import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import EmergencySupport from './pages/EmergencySupport';
import Volunteer from './pages/Volunteer';
import IncidentReporting from './pages/IncidentReporting';
import WorkforceHealth from './pages/WorkforceHealth';
import MedicalServices from './pages/MedicalServices';
import Reports from './pages/Reports';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { DataProvider } from './context/DataContext';

export default function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/emergency" element={<EmergencySupport />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/incidents" element={<IncidentReporting />} />
            <Route path="/workforce" element={<WorkforceHealth />} />
            <Route path="/services" element={<MedicalServices />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </DataProvider>
    </BrowserRouter>
  );
}
