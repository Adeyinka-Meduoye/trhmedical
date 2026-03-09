import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, CheckCircle, X } from 'lucide-react';
import { useData, Volunteer as VolunteerType } from '../context/DataContext';
import { motion, AnimatePresence } from 'motion/react';

export default function Volunteer() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { addVolunteer } = useData();
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (data: any) => {
    // Convert availability array to string for Google Sheets compatibility
    const availabilityString = Array.isArray(data.availability) 
      ? data.availability.join(', ') 
      : data.availability || '';

    const newVolunteer: VolunteerType = {
      id: Date.now().toString(),
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      profession: data.profession,
      status: 'Pending',
      joinedDate: new Date().toISOString().split('T')[0],
      licenseNumber: data.licenseNumber,
      experience: data.experience,
      specialization: data.specialization,
      availability: availabilityString, // Use the string version
      motivation: data.motivation
    };

    addVolunteer(newVolunteer);
    setShowModal(true);
    reset();
  };

  return (
    <div className="max-w-3xl mx-auto relative">
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-bg-card border border-brand-secondary/30 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center relative"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">Application Submitted!</h3>
              <p className="text-text-secondary mb-6">
                Thank you for volunteering. Your application has been received and is under review. We will contact you shortly.
              </p>
              <button 
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-brand-secondary text-bg-dark font-bold rounded-xl hover:bg-brand-secondary/90 transition-colors w-full"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text-primary mb-4">Join the Medical Team</h1>
        <p className="text-lg text-text-secondary">
          Use your professional skills to serve God and humanity. We are looking for Doctors, Nurses, EMTs, and Pharmacists.
        </p>
      </div>

      <div className="bg-bg-card border border-white/10 rounded-2xl p-8 shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary border-b border-white/10 pb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                <input 
                  {...register("fullName", { required: true })}
                  placeholder="Simon Priestley"
                  className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
                />
                {errors.fullName && <span className="text-brand-tertiary text-xs">Required</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Email Address</label>
                <input 
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="simonpriestley@example.com"
                  className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Phone Number</label>
                <input 
                  type="tel"
                  {...register("phone", { required: true })}
                  placeholder="+23481234567890"
                  className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
                />
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary border-b border-white/10 pb-2">Professional Credentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Profession</label>
                <select 
                  {...register("profession", { required: true })}
                  className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary"
                >
                  <option value="">Select...</option>
                  <option value="Doctor">Medical Doctor</option>
                  <option value="Nurse">Registered Nurse</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="EMT">EMT / Paramedic</option>
                  <option value="Student">Medical Student</option>
                  <option value="Therapist">Therapist</option>
                  <option value="Health Advocate">Health Advocate</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">License Number <span className="text-xs text-text-secondary/50">(Optional)</span></label>
                <input 
                  {...register("licenseNumber", { required: false })}
                  placeholder="e.g. MDCN/12345"
                  className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Years of Experience</label>
                <input 
                  type="number"
                  {...register("experience", { required: true })}
                  placeholder="e.g. 5"
                  className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-secondary mb-1">Area of Specialization</label>
                <input 
                  {...register("specialization")}
                  placeholder="e.g. Pediatrics, Cardiology, General Practice"
                  className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
                />
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary border-b border-white/10 pb-2">Availability</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-white/10 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                <input type="checkbox" {...register("availability")} value="Sunday" className="w-4 h-4 text-brand-secondary rounded focus:ring-brand-secondary bg-bg-input border-white/10" />
                <span className="text-text-secondary">Sunday Services (7am - 2pm)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-white/10 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                <input type="checkbox" {...register("availability")} value="Wednesday" className="w-4 h-4 text-brand-secondary rounded focus:ring-brand-secondary bg-bg-input border-white/10" />
                <span className="text-text-secondary">Wednesday Midweek (5:30pm - 8:30pm)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-white/10 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                <input type="checkbox" {...register("availability")} value="Special" className="w-4 h-4 text-brand-secondary rounded focus:ring-brand-secondary bg-bg-input border-white/10" />
                <span className="text-text-secondary">Special Events (Concerts, Conferences)</span>
              </label>
              <label className="flex items-center gap-3 p-3 border border-white/10 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                <input type="checkbox" {...register("availability")} value="OnCall" className="w-4 h-4 text-brand-secondary rounded focus:ring-brand-secondary bg-bg-input border-white/10" />
                <span className="text-text-secondary">On-Call 24/7 Emergency</span>
              </label>
            </div>
          </div>

          {/* Motivation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary border-b border-white/10 pb-2">Motivation</h3>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Why Do You Want To Join Us?</label>
              <textarea 
                {...register("motivation", { required: true })}
                rows={4}
                placeholder="Tell us about your motivation"
                className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-brand-secondary hover:bg-brand-secondary/90 text-bg-dark font-bold py-4 rounded-xl shadow-lg shadow-brand-secondary/20 transition-all transform hover:-translate-y-1"
            >
              Submit Application
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
