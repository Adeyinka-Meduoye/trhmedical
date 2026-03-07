import React from 'react';
import { Phone, MapPin, Navigation, AlertTriangle } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function EmergencySupport() {
  const { hospitals } = useData();

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 text-red-500 rounded-full mb-4 border border-red-500/20">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary">Emergency Support</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          If you are experiencing a medical emergency during a service, please alert the nearest Usher or Protocol officer immediately.
        </p>
      </div>

      {/* Emergency Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
          <h3 className="text-xl font-bold text-red-400">On-Site Emergency</h3>
          <p className="text-red-200/80">
            Locate the nearest Medical Stand or alert an Usher. 
            Our medical team is stationed at the <strong>Main Auditorium Entrance</strong> and <strong>Gallery Left Wing</strong>.
          </p>
        </div>
        <div className="bg-brand-primary/20 border border-brand-primary/30 p-8 rounded-2xl flex flex-col items-center text-center space-y-4">
          <h3 className="text-xl font-bold text-brand-secondary">Ambulance Service</h3>
          <p className="text-text-secondary">
            We have a standby ambulance for critical transport.
            <br />
            <strong>Call Dispatch: +234 800 TRH MED</strong>
          </p>
        </div>
      </div>

      {/* Nearby Hospitals */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <MapPin className="w-6 h-6 text-text-secondary" />
          Nearby Emergency Centers
        </h2>
        <div className="grid gap-4">
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="bg-bg-card border border-white/10 p-6 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-brand-secondary/50 transition-colors group">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold text-text-primary text-lg">{hospital.name}</h3>
                </div>
                <p className="text-text-secondary text-sm flex items-center gap-1 mb-2">
                  <MapPin className="w-3 h-3" /> {hospital.address}
                </p>
                <div className="flex flex-wrap gap-2">
                  {hospital.specialties.split(',').map((s, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-text-secondary border border-white/10">
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <a 
                  href={`tel:${hospital.contact}`}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-text-primary font-medium rounded-lg transition-colors border border-white/10"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-brand-primary/20 text-brand-secondary hover:bg-brand-primary/30 font-medium rounded-lg transition-colors border border-brand-primary/30">
                  <Navigation className="w-4 h-4" /> Directions
                </button>
              </div>
            </div>
          ))}
          {hospitals.length === 0 && (
            <div className="text-center p-8 text-text-secondary bg-bg-card border border-white/10 rounded-xl">
              No hospitals listed currently.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
