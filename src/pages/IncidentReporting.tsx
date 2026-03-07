import React from 'react';
import { useForm } from 'react-hook-form';
import { AlertTriangle, Save, User, MapPin, Stethoscope, FileText } from 'lucide-react';

export default function IncidentReporting() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const escalationRequired = watch("escalationRequired");

  const onSubmit = (data: any) => {
    console.log(data);
    alert("Incident Report Saved! (Demo Mode)");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-brand-tertiary/20 rounded-lg">
            <AlertTriangle className="w-6 h-6 text-brand-tertiary" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Medical Incident Report</h1>
        </div>
        <p className="text-text-secondary">
          Strictly for internal use by TRH Medical Staff. Ensure all details are accurate for legal and medical records.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Event Details */}
        <div className="bg-bg-card p-6 rounded-xl border border-white/10 shadow-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-text-secondary" /> Event Context
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Service / Event</label>
              <select {...register("serviceType", { required: true })} className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary">
                <option value="">Select Event...</option>
                <option>Sunday Service (1st)</option>
                <option>Sunday Service (2nd)</option>
                <option>Wednesday Midweek</option>
                <option>Special Event / Concert</option>
              </select>
              {errors.serviceType && <span className="text-brand-tertiary text-xs">Required</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Location Incident Occurred</label>
              <input 
                {...register("location", { required: true })}
                placeholder="e.g. Gallery Left Wing, Kids Church"
                className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Date & Time</label>
              <input 
                type="datetime-local"
                {...register("timestamp", { required: true })}
                className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary color-scheme-dark"
              />
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div className="bg-bg-card p-6 rounded-xl border border-white/10 shadow-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-text-secondary" /> Patient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Patient Category</label>
              <div className="flex gap-4">
                {['Member', 'Visitor', 'Workforce'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value={cat} {...register("patientCategory", { required: true })} className="text-brand-secondary focus:ring-brand-secondary bg-bg-input border-white/10" />
                    <span className="text-sm text-text-secondary">{cat}</span>
                  </label>
                ))}
              </div>
              {errors.patientCategory && <span className="text-brand-tertiary text-xs">Required</span>}
            </div>
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Patient Name (Optional if unknown)</label>
                <input {...register("patientName")} className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Phone Number</label>
                <input type="tel" {...register("patientPhone")} className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary" />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-text-secondary mb-1">Gender & Approx Age</label>
              <div className="flex gap-4">
                <select {...register("gender")} className="w-1/3 p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary">
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <input type="number" placeholder="Age" {...register("age")} className="w-1/3 p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Medical Intervention */}
        <div className="bg-bg-card p-6 rounded-xl border border-white/10 shadow-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-text-secondary" /> Clinical Assessment
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Presenting Symptoms / Complaint</label>
              <textarea 
                {...register("symptoms", { required: true })}
                rows={3}
                className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
                placeholder="e.g. Dizziness, fainting, laceration on left arm..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Vitals (if taken)</label>
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder="BP (mmHg)" {...register("bp")} className="p-2.5 bg-bg-input border border-white/10 rounded-lg text-sm text-text-primary placeholder-text-secondary/50" />
                  <input placeholder="Pulse (bpm)" {...register("pulse")} className="p-2.5 bg-bg-input border border-white/10 rounded-lg text-sm text-text-primary placeholder-text-secondary/50" />
                  <input placeholder="Temp (°C)" {...register("temp")} className="p-2.5 bg-bg-input border border-white/10 rounded-lg text-sm text-text-primary placeholder-text-secondary/50" />
                  <input placeholder="Sugar (mg/dL)" {...register("sugar")} className="p-2.5 bg-bg-input border border-white/10 rounded-lg text-sm text-text-primary placeholder-text-secondary/50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Intervention / Treatment Given</label>
                <textarea 
                  {...register("intervention", { required: true })}
                  rows={4}
                  className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
                  placeholder="e.g. Patient placed in recovery position, wound cleaned and dressed..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Medication Administered (Name & Dosage)</label>
              <input 
                {...register("medication")}
                className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
                placeholder="e.g. Paracetamol 1000mg PO"
              />
            </div>
          </div>
        </div>

        {/* Outcome & Escalation */}
        <div className="bg-bg-card p-6 rounded-xl border border-white/10 shadow-sm">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-text-secondary" /> Outcome
          </h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 p-4 border border-brand-tertiary/30 bg-brand-tertiary/10 rounded-lg cursor-pointer">
              <input type="checkbox" {...register("escalationRequired")} className="w-5 h-5 text-brand-tertiary rounded focus:ring-brand-tertiary bg-bg-input border-white/10" />
              <div>
                <span className="font-semibold text-brand-tertiary">Escalation / Hospital Referral Required</span>
                <p className="text-xs text-brand-tertiary/80">Check this if the patient was sent to a hospital or ambulance was called.</p>
              </div>
            </label>

            {escalationRequired && (
              <div className="p-4 border border-white/10 rounded-lg bg-bg-input animate-in fade-in slide-in-from-top-2">
                <label className="block text-sm font-medium text-text-secondary mb-1">Referred To (Hospital Name)</label>
                <input 
                  {...register("referralHospital")}
                  className="w-full p-2.5 bg-bg-card border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary"
                  placeholder="e.g. General Hospital Lagos"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Final Status</label>
              <select {...register("status")} className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary">
                <option>Discharged (Stable)</option>
                <option>Transferred to Hospital</option>
                <option>Refused Treatment</option>
                <option>Under Observation</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            className="bg-brand-secondary hover:bg-brand-secondary/90 text-bg-dark font-bold py-3 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Submit Report
          </button>
        </div>

      </form>
    </div>
  );
}
