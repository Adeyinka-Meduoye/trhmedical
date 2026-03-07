import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { googleSheetsService, GOOGLE_SCRIPT_URL } from '../services/googleSheets';

// --- Types ---
export interface Volunteer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  rejectionReason?: string;
  joinedDate: string;
  licenseNumber?: string;
  experience?: string;
  specialization?: string;
  availability?: string[] | string;
  motivation?: string;
}

export interface Appointment {
  id: string;
  refId: string;
  patientName: string;
  category: 'Member' | 'Visitor' | 'Workforce' | 'Adult' | 'Child' | 'Elder' | 'Special Needs'; 
  type: string;
  date: string;
  time: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed' | 'Cancelled';
  rejectionReason?: string;
  reason?: string; // Optional reason for appointment
  notes?: string; // Additional notes
}

export interface Incident {
  id: string;
  type: string;
  description: string;
  reportedBy: string;
  fullName?: string;
  phone?: string;
  date: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'Resolved' | 'Unresolved';
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  contact: string;
  specialties: string;
}

// --- Mock Data (Fallback) ---
// Mock data removed as per request.
const MOCK_VOLUNTEERS: Volunteer[] = [];
const MOCK_APPOINTMENTS: Appointment[] = [];
const MOCK_INCIDENTS: Incident[] = [];
const MOCK_HOSPITALS: Hospital[] = [];

interface DataContextType {
  volunteers: Volunteer[];
  appointments: Appointment[];
  incidents: Incident[];
  hospitals: Hospital[];
  addVolunteer: (volunteer: Volunteer) => void;
  updateVolunteer: (id: string, updates: Partial<Volunteer>) => void;
  deleteVolunteer: (id: string) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  cancelAppointment: (refId: string) => void;
  addIncident: (incident: Incident) => void;
  updateIncident: (id: string, updates: Partial<Incident>) => void;
  deleteIncident: (id: string) => void;
  addHospital: (hospital: Hospital) => void;
  deleteHospital: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  // Initialize state with empty arrays
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  // Fetch data on mount if URL is present (Google Sheets sync)
  useEffect(() => {
    if (GOOGLE_SCRIPT_URL) {
      const fetchData = async () => {
        try {
          const vData = await googleSheetsService.getData('Volunteers');
          if (Array.isArray(vData)) {
            setVolunteers(vData);
          } else {
            console.error("Failed to load Volunteers. Data received:", vData);
          }

          const aData = await googleSheetsService.getData('Appointments');
          if (Array.isArray(aData)) {
            setAppointments(aData);
          } else {
             console.error("Failed to load Appointments. Data received:", aData);
          }

          const iData = await googleSheetsService.getData('Incidents');
          if (Array.isArray(iData)) {
            setIncidents(iData);
          } else {
             console.error("Failed to load Incidents. Data received:", iData);
          }

          const hData = await googleSheetsService.getData('Hospitals');
          if (Array.isArray(hData)) {
            setHospitals(hData);
          } else {
             console.error("Failed to load Hospitals. Data received:", hData);
          }
        } catch (error) {
          console.error("Failed to sync with Google Sheets:", error);
        }
      };
      fetchData();
    }
  }, []);

  // Volunteers
  const addVolunteer = (v: Volunteer) => {
    setVolunteers(prev => [...prev, v]);
    if (GOOGLE_SCRIPT_URL) googleSheetsService.addRow('Volunteers', v);
  };
  const updateVolunteer = (id: string, updates: Partial<Volunteer>) => {
    setVolunteers(prev => prev.map(v => v.id === id ? { ...v, ...updates } : v));
    if (GOOGLE_SCRIPT_URL) googleSheetsService.updateRow('Volunteers', id, updates);
  };
  const deleteVolunteer = (id: string) => {
    setVolunteers(prev => prev.filter(v => v.id !== id));
    if (GOOGLE_SCRIPT_URL) googleSheetsService.deleteRow('Volunteers', id);
  };

  // Appointments
  const addAppointment = (a: Appointment) => {
    setAppointments(prev => [...prev, a]);
    if (GOOGLE_SCRIPT_URL) googleSheetsService.addRow('Appointments', a);
  };
  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    if (GOOGLE_SCRIPT_URL) googleSheetsService.updateRow('Appointments', id, updates);
  };
  const deleteAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    if (GOOGLE_SCRIPT_URL) googleSheetsService.deleteRow('Appointments', id);
  };

  const cancelAppointment = (refId: string) => {
    const appointment = appointments.find(a => a.refId === refId);
    if (appointment) {
      updateAppointment(appointment.id, { status: 'Cancelled' as any });
    }
  };

  // Incidents
  const addIncident = (i: Incident) => {
    setIncidents(prev => [i, ...prev]);
    if (GOOGLE_SCRIPT_URL) googleSheetsService.addRow('Incidents', i);
  };
  const updateIncident = (id: string, updates: Partial<Incident>) => {
    setIncidents(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
    if (GOOGLE_SCRIPT_URL) googleSheetsService.updateRow('Incidents', id, updates);
  };
  const deleteIncident = (id: string) => {
    setIncidents(prev => prev.filter(i => i.id !== id));
    if (GOOGLE_SCRIPT_URL) googleSheetsService.deleteRow('Incidents', id);
  };

  // Hospitals
  const addHospital = (h: Hospital) => {
    setHospitals(prev => [...prev, h]);
    if (GOOGLE_SCRIPT_URL) googleSheetsService.addRow('Hospitals', h);
  };
  const deleteHospital = (id: string) => {
    setHospitals(prev => prev.filter(h => h.id !== id));
    if (GOOGLE_SCRIPT_URL) googleSheetsService.deleteRow('Hospitals', id);
  };

  return (
    <DataContext.Provider value={{
      volunteers, appointments, incidents, hospitals,
      addVolunteer, updateVolunteer, deleteVolunteer,
      addAppointment, updateAppointment, deleteAppointment, cancelAppointment,
      addIncident, updateIncident, deleteIncident,
      addHospital, deleteHospital
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
