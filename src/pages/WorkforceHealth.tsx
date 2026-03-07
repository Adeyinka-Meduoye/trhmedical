import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, Activity, Heart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useData, Appointment } from '../context/DataContext';

export default function WorkforceHealth() {
  const { addAppointment, appointments, cancelAppointment } = useData();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingType, setBookingType] = useState('bp_check');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<'Adult' | 'Child' | 'Elder' | 'Special Needs'>('Adult');
  const [notes, setNotes] = useState('');
  const [refId, setRefId] = useState<string | null>(null);
  const [checkRefId, setCheckRefId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const refIdInputRef = React.useRef<HTMLInputElement>(null);

  const availableSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"
  ];

  const [reason, setReason] = useState('');

  const handleBook = () => {
    if (!selectedDate || !selectedSlot || !fullName || !phone) {
      alert("Please fill in all required fields.");
      return;
    }
    const newRefId = 'REF-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      refId: newRefId,
      patientName: fullName,
      category: category as any, 
      type: bookingType === 'bp_check' ? 'BP Check' : bookingType === 'sugar_check' ? 'Blood Sugar' : 'Consultation',
      date: selectedDate,
      time: selectedSlot,
      status: 'Pending',
      reason: reason,
      notes: notes
    };

    addAppointment(newAppointment);
    setRefId(newRefId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Optional: Reset form here if desired, but keeping Ref ID visible might be better
  };

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusResult, setStatusResult] = useState<{found: boolean, data?: Appointment} | null>(null);

  const handleCheckStatus = () => {
    if (!checkRefId) return;
    const appointment = appointments.find(a => a.refId === checkRefId);
    
    setStatusResult({
      found: !!appointment,
      data: appointment
    });
    setStatusModalOpen(true);
  };

  const handleCancelAppointment = () => {
    if (statusResult?.data && window.confirm("Are you sure you want to cancel this appointment?")) {
      cancelAppointment(statusResult.data.refId);
      setStatusModalOpen(false);
      // Refresh status result immediately if we were to keep modal open, but closing is safer
      alert("Appointment cancelled successfully.");
    }
  };

  const scrollToRefIdInput = () => {
    refIdInputRef.current?.scrollIntoView({ behavior: 'smooth' });
    refIdInputRef.current?.focus();
  };

  return (
    <div className="max-w-5xl mx-auto relative">
      <AnimatePresence>
        {statusModalOpen && (
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
              className="bg-bg-card border border-brand-secondary/30 p-8 rounded-2xl shadow-2xl max-w-md w-full relative text-center"
            >
              <button 
                onClick={() => setStatusModalOpen(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>

              {statusResult?.found && statusResult.data ? (
                <>
                  <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-secondary/30">
                    <Activity className="w-8 h-8 text-brand-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Appointment Status</h3>
                  
                  <div className="bg-bg-input p-4 rounded-xl border border-white/10 mb-6 text-left space-y-3">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-text-secondary text-sm">Reference ID:</span>
                      <span className="font-mono font-bold text-brand-secondary">{statusResult.data.refId}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-text-secondary text-sm">Patient:</span>
                      <span className="font-medium text-text-primary">{statusResult.data.patientName}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-text-secondary text-sm">Date & Time:</span>
                      <span className="font-medium text-text-primary">{statusResult.data.date} at {statusResult.data.time}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-text-secondary text-sm">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        statusResult.data.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                        statusResult.data.status === 'Completed' ? 'bg-blue-500/20 text-blue-400' :
                        statusResult.data.status === 'Rejected' || statusResult.data.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {statusResult.data.status}
                      </span>
                    </div>
                    {statusResult.data.status === 'Rejected' && statusResult.data.rejectionReason && (
                       <div className="pt-2 text-xs text-red-400 italic border-t border-white/10 mt-2">
                         Reason: {statusResult.data.rejectionReason}
                       </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => setStatusModalOpen(false)}
                      className="flex-1 px-6 py-3 bg-white/10 text-text-primary font-bold rounded-xl hover:bg-white/20 transition-colors"
                    >
                      Close
                    </button>
                    {statusResult.data.status !== 'Cancelled' && statusResult.data.status !== 'Completed' && statusResult.data.status !== 'Rejected' && (
                      <button 
                        onClick={handleCancelAppointment}
                        className="flex-1 px-6 py-3 bg-red-500/20 text-red-400 font-bold rounded-xl hover:bg-red-500/30 transition-colors border border-red-500/30"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/30">
                    <X className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-2">Not Found</h3>
                  <p className="text-text-secondary mb-6">
                    We couldn't find an appointment with Reference ID <span className="font-mono text-brand-secondary font-bold">{checkRefId}</span>.
                  </p>
                  <button 
                    onClick={() => setStatusModalOpen(false)}
                    className="px-6 py-3 bg-white/10 text-text-primary font-bold rounded-xl hover:bg-white/20 transition-colors w-full"
                  >
                    Close
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}

        {showModal && refId && (
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
                onClick={closeModal}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">Appointment Scheduled!</h3>
              <p className="text-text-secondary mb-4">
                Your appointment has been successfully booked. Please keep your Reference ID safe.
              </p>
              <div className="bg-bg-dark p-4 rounded-xl border border-white/10 inline-block mb-6">
                <span className="text-2xl font-mono font-bold text-brand-secondary tracking-wider">{refId}</span>
              </div>
              <button 
                onClick={closeModal}
                className="px-6 py-3 bg-brand-secondary text-bg-dark font-bold rounded-xl hover:bg-brand-secondary/90 transition-colors w-full"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">Check-up & Wellness Hub</h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Schedule your regular health checkups and track your appointment status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Booking Form */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Step 1: Personal Details */}
          <div className="bg-bg-card p-6 rounded-2xl border border-white/10 shadow-sm">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-primary/20 text-brand-secondary flex items-center justify-center text-sm font-bold border border-brand-primary/30">1</div>
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                <input 
                  type="text"
                  placeholder="Simon Priestley"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Phone Number</label>
                <input 
                  type="tel"
                  placeholder="+23481234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Patient Category</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary"
                >
                  <option value="Adult">Adult</option>
                  <option value="Child">Child</option>
                  <option value="Elder">Elder</option>
                  <option value="Special Needs">Special Needs</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Choose Service */}
          <div className="bg-bg-card p-6 rounded-2xl border border-white/10 shadow-sm">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-primary/20 text-brand-secondary flex items-center justify-center text-sm font-bold border border-brand-primary/30">2</div>
              Select Service
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'bp_check', name: 'BP Check', icon: Activity, desc: 'Blood Pressure monitoring' },
                { id: 'sugar_check', name: 'Blood Sugar', icon: Heart, desc: 'Glucose level check' },
                { id: 'consultation', name: 'Consultation', icon: UserIcon, desc: 'Speak with a doctor' }
              ].map((service) => (
                <button
                  key={service.id}
                  onClick={() => setBookingType(service.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    bookingType === service.id 
                      ? 'border-brand-secondary bg-brand-primary/20 ring-1 ring-brand-secondary' 
                      : 'border-white/10 hover:border-white/20 bg-bg-input'
                  }`}
                >
                  <service.icon className={`w-6 h-6 mb-3 ${bookingType === service.id ? 'text-brand-secondary' : 'text-text-secondary'}`} />
                  <div className="font-semibold text-text-primary">{service.name}</div>
                  <div className="text-xs text-text-secondary mt-1">{service.desc}</div>
                </button>
              ))}
            </div>
            
            {/* Reason for Appointment */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-text-secondary mb-1">Reason for Appointment <span className="text-xs text-text-secondary/50">(Optional)</span></label>
              <input 
                type="text"
                placeholder="e.g. Regular checkup, Feeling dizzy, etc."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
              />
            </div>
          </div>

          {/* Step 3: Choose Date & Time */}
          <div className="bg-bg-card p-6 rounded-2xl border border-white/10 shadow-sm">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-primary/20 text-brand-secondary flex items-center justify-center text-sm font-bold border border-brand-primary/30">3</div>
              Select Date & Time
            </h3>
            <div className="space-y-4">
              <input 
                type="date" 
                className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary color-scheme-dark"
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              
              {selectedDate && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
                >
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        selectedSlot === slot
                          ? 'bg-brand-secondary text-bg-dark shadow-md font-bold'
                          : 'bg-bg-input text-text-secondary hover:bg-white/5'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Step 4: Additional Notes */}
          <div className="bg-bg-card p-6 rounded-2xl border border-white/10 shadow-sm">
            <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-primary/20 text-brand-secondary flex items-center justify-center text-sm font-bold border border-brand-primary/30">4</div>
              Additional Notes
            </h3>
            <textarea 
              rows={3}
              placeholder="Any specific concerns"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50"
            />
          </div>

          {/* Schedule Button */}
          <button 
            disabled={!selectedDate || !selectedSlot || !fullName || !phone}
            onClick={handleBook}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
              !selectedDate || !selectedSlot || !fullName || !phone
                ? 'bg-white/5 text-text-secondary cursor-not-allowed'
                : 'bg-brand-secondary hover:bg-brand-secondary/90 text-bg-dark transform hover:-translate-y-1'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            Schedule Appointment
          </button>

          {/* Success Message with REF ID */}
          {refId && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-500/10 border border-green-500/30 p-6 rounded-2xl text-center"
            >
              <h4 className="text-xl font-bold text-green-400 mb-2">Appointment Scheduled Successfully!</h4>
              <p className="text-text-secondary mb-4">Please keep your Reference ID safe.</p>
              <div className="bg-bg-dark p-4 rounded-xl border border-white/10 inline-block">
                <span className="text-2xl font-mono font-bold text-brand-secondary tracking-wider">{refId}</span>
              </div>
            </motion.div>
          )}

        </div>

        {/* Right: Info Panel */}
        <div className="space-y-6">
          
          {/* Check Status Widget */}
          <div className="bg-bg-card border border-white/10 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-secondary" />
              Check Appointment Status
            </h3>
            <div className="space-y-3">
              <input 
                ref={refIdInputRef}
                type="text"
                placeholder="Enter REF ID"
                value={checkRefId}
                onChange={(e) => setCheckRefId(e.target.value)}
                className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary placeholder-text-secondary/50 text-sm"
              />
              <button 
                onClick={handleCheckStatus}
                disabled={!checkRefId}
                className="w-full py-2 bg-brand-primary hover:bg-brand-primary/80 text-white font-semibold rounded-lg transition-colors text-sm border border-brand-secondary/20"
              >
                Check Status
              </button>
            </div>
          </div>

          <div className="bg-brand-primary text-white p-6 rounded-2xl border border-brand-secondary/20">
            <h3 className="text-xl font-bold mb-4">Why Check Your Health?</h3>
            <ul className="space-y-4 text-text-secondary text-sm">
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-brand-secondary shrink-0" />
                <span>Early detection of hypertension and diabetes prevents complications.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-brand-secondary shrink-0" />
                <span>Ensure you are physically fit to handle the demands of ministry work.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-brand-secondary shrink-0" />
                <span>Set a good example for the congregation by prioritizing wellness.</span>
              </li>
            </ul>
          </div>

          <div className="bg-bg-card border border-brand-secondary/30 p-6 rounded-2xl">
            <h3 className="font-bold text-brand-secondary mb-2">Need to Cancel?</h3>
            <p className="text-sm text-text-secondary mb-4">
              Please cancel at least 24 hours in advance so another workforce member can use the slot.
            </p>
            <button 
              onClick={scrollToRefIdInput}
              className="text-sm font-semibold text-brand-secondary hover:text-text-primary underline transition-colors"
            >
              Manage My Bookings
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function UserIcon(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
