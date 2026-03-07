import React, { useState } from 'react';
import { MessageCircle, X, Send, MapPin, User, Phone, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppEmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: 'Church Member',
    location: '',
    nature: ''
  });

  // Configuration - In a real app, this would be an env variable
  const EMERGENCY_PHONE_NUMBER = "+2348185546555"; // Replace with actual triage number

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*URGENT: MEDICAL ASSISTANCE REQUESTED*
--------------------------------
👤 *Name:* ${formData.name}
📱 *Phone:* ${formData.phone}
🏷️ *Category:* ${formData.category}
📍 *Location:* ${formData.location}
⚠️ *Nature of Emergency:* ${formData.nature}
--------------------------------
_Sent via TRH Medical Website_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${EMERGENCY_PHONE_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-500 transition-colors border border-green-400/30"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="font-bold hidden md:inline">Emergency Help</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-bg-card w-full max-w-md rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden pointer-events-auto relative border border-white/10"
            >
              {/* Header */}
              <div className="bg-red-600 p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  <h2 className="font-bold text-lg">Request Medical Help</h2>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <p className="text-sm text-text-secondary mb-4">
                  Please provide details to help our team reach you faster. 
                  <br/><strong className="text-red-400">In critical danger? Call emergency services immediately.</strong>
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Who are you?</label>
                    <select 
                      className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm text-text-primary"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      <option>Church Member</option>
                      <option>Workforce / Volunteer</option>
                      <option>Visitor</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-3 text-text-secondary" />
                        <input 
                          required
                          type="text" 
                          className="w-full pl-9 p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm text-text-primary placeholder-text-secondary/50"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Phone</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 absolute left-3 top-3 text-text-secondary" />
                        <input 
                          required
                          type="tel" 
                          className="w-full pl-9 p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm text-text-primary placeholder-text-secondary/50"
                          placeholder="Number"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Current Location</label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 absolute left-3 top-3 text-text-secondary" />
                      <input 
                        required
                        type="text" 
                        className="w-full pl-9 p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm text-text-primary placeholder-text-secondary/50"
                        placeholder="e.g. Main Auditorium, Row 5"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">Nature of Emergency</label>
                    <textarea 
                      required
                      rows={2}
                      className="w-full p-2.5 bg-bg-input border border-white/10 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-sm resize-none text-text-primary placeholder-text-secondary/50"
                      placeholder="Describe symptoms (e.g. Fainted, Chest Pain, Injury)"
                      value={formData.nature}
                      onChange={(e) => setFormData({...formData, nature: e.target.value})}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors mt-2 shadow-lg shadow-green-900/20"
                >
                  <Send className="w-5 h-5" />
                  Open WhatsApp Chat
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
