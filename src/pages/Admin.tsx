import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Calendar, AlertTriangle, Building2, Plus, LogOut, Trash2, Search, CheckCircle, XCircle, X, Eye } from 'lucide-react';
import { useData, Volunteer, Appointment, Incident, Hospital } from '../context/DataContext';

export default function Admin() {
  // --- State ---
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuth') === 'true';
  });
  const [loggedInAdmin, setLoggedInAdmin] = useState(() => {
    return localStorage.getItem('adminUsername') || '';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [activeTab, setActiveTab] = useState<'volunteers' | 'appointments' | 'incidents' | 'hospitals' | 'report'>('volunteers');

  // Data Context
  const { 
    volunteers, appointments, incidents, hospitals,
    addHospital, deleteHospital,
    addIncident, deleteIncident, updateIncident,
    deleteVolunteer, updateVolunteer,
    deleteAppointment, updateAppointment
  } = useData();

  // Form States
  const [newHospital, setNewHospital] = useState({ name: '', address: '', contact: '', specialties: '' });
  const [newIncident, setNewIncident] = useState({ type: '', description: '', reportedBy: '', severity: 'Low', fullName: '', phone: '' });

  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedItemForRejection, setSelectedItemForRejection] = useState<{id: string, type: 'volunteer' | 'appointment'} | null>(null);

  const [volunteerSearch, setVolunteerSearch] = useState('');
  const [appointmentSearch, setAppointmentSearch] = useState('');
  const [incidentSearch, setIncidentSearch] = useState('');

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [detailsItem, setDetailsItem] = useState<{type: 'volunteer' | 'appointment' | 'incident', data: any} | null>(null);

  const handleViewDetails = (item: any, type: 'volunteer' | 'appointment' | 'incident') => {
    setDetailsItem({ type, data: item });
    setDetailsModalOpen(true);
  };

  const filteredVolunteers = volunteers.filter(v => 
    v.fullName.toLowerCase().includes(volunteerSearch.toLowerCase()) || 
    v.email.toLowerCase().includes(volunteerSearch.toLowerCase()) ||
    v.profession.toLowerCase().includes(volunteerSearch.toLowerCase())
  );

  const filteredAppointments = appointments.filter(a => 
    a.patientName.toLowerCase().includes(appointmentSearch.toLowerCase()) || 
    a.refId.toLowerCase().includes(appointmentSearch.toLowerCase()) ||
    a.type.toLowerCase().includes(appointmentSearch.toLowerCase())
  );

  const filteredIncidents = incidents.filter(i => 
    i.type.toLowerCase().includes(incidentSearch.toLowerCase()) || 
    i.reportedBy.toLowerCase().includes(incidentSearch.toLowerCase()) ||
    (i.fullName && i.fullName.toLowerCase().includes(incidentSearch.toLowerCase()))
  );

  // --- Handlers ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validUsers = ['oba-medus', 'njane', 'echristy', 'njenny', 'efaith'];
    
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    if (validUsers.includes(username) && password === adminPassword) {
      setIsAuthenticated(true);
      setLoggedInAdmin(username);
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminUsername', username);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoggedInAdmin('');
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminUsername');
  };

  const handleAddHospital = (e: React.FormEvent) => {
    e.preventDefault();
    const hospital: Hospital = {
      id: Date.now().toString(),
      ...newHospital
    };
    addHospital(hospital);
    setNewHospital({ name: '', address: '', contact: '', specialties: '' });
    setModalMessage('Hospital added successfully!');
    setShowModal(true);
  };

  const handleReportIncident = (e: React.FormEvent) => {
    e.preventDefault();
    const incident: Incident = {
      id: Date.now().toString(),
      ...newIncident,
      date: new Date().toISOString().split('T')[0],
      status: 'Open',
      severity: newIncident.severity as any
    };
    addIncident(incident);
    setNewIncident({ type: '', description: '', reportedBy: '', severity: 'Low', fullName: '', phone: '' });
    setModalMessage('Incident reported successfully!');
    setShowModal(true);
    setActiveTab('incidents'); // Switch to list view
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{id: string, type: 'hospital' | 'incident' | 'volunteer' | 'appointment'} | null>(null);

  const handleDelete = (id: string, type: 'hospital' | 'incident' | 'volunteer' | 'appointment') => {
    setItemToDelete({ id, type });
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    
    const { id, type } = itemToDelete;
    switch(type) {
      case 'hospital': deleteHospital(id); break;
      case 'incident': deleteIncident(id); break;
      case 'volunteer': deleteVolunteer(id); break;
      case 'appointment': deleteAppointment(id); break;
    }
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const openRejectionModal = (id: string, type: 'volunteer' | 'appointment') => {
    setSelectedItemForRejection({ id, type });
    setRejectionReason('');
    setRejectionModalOpen(true);
  };

  const handleConfirmRejection = () => {
    if (!selectedItemForRejection) return;
    if (!rejectionReason.trim()) {
      alert("A reason is required for rejection.");
      return;
    }

    if (selectedItemForRejection.type === 'volunteer') {
      updateVolunteer(selectedItemForRejection.id, {
        status: 'Rejected',
        rejectionReason: rejectionReason,
        actionBy: loggedInAdmin
      });
    } else {
      updateAppointment(selectedItemForRejection.id, {
        status: 'Rejected',
        rejectionReason: rejectionReason,
        actionBy: loggedInAdmin
      });
    }
    setRejectionModalOpen(false);
    setSelectedItemForRejection(null);
  };

  const handleVolunteerAction = (id: string, action: 'Approve' | 'Reject') => {
    if (action === 'Reject') {
      openRejectionModal(id, 'volunteer');
      return;
    }

    updateVolunteer(id, {
      status: 'Approved',
      actionBy: loggedInAdmin
    });
  };

  const handleAppointmentAction = (id: string, action: 'Approve' | 'Reject' | 'Complete') => {
    if (action === 'Reject') {
      openRejectionModal(id, 'appointment');
      return;
    }

    updateAppointment(id, {
      status: action === 'Approve' ? 'Approved' : 'Completed',
      actionBy: loggedInAdmin
    });
  };

  const handleIncidentAction = (id: string, action: 'Resolved' | 'Unresolved') => {
    updateIncident(id, {
      status: action,
      actionBy: loggedInAdmin
    });
  };

  // --- Render Login ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-bg-card p-8 rounded-2xl border border-white/10 shadow-2xl w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand-primary/30">
              <Shield className="w-8 h-8 text-brand-secondary" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Admin Access</h1>
            <p className="text-text-secondary">Please sign in to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-brand-secondary outline-none text-text-primary"
              />
            </div>
            
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button 
              type="submit"
              className="w-full py-3 bg-brand-secondary text-bg-dark font-bold rounded-xl hover:bg-brand-secondary/90 transition-colors"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- Render Dashboard ---
  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
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
              <h3 className="text-2xl font-bold text-text-primary mb-2">Success!</h3>
              <p className="text-text-secondary mb-6">
                {modalMessage}
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

        {deleteModalOpen && (
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
              className="bg-bg-card border border-red-500/30 p-8 rounded-2xl shadow-2xl max-w-md w-full relative text-center"
            >
              <button 
                onClick={() => setDeleteModalOpen(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">Confirm Deletion</h3>
              <p className="text-text-secondary mb-6">
                Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.
              </p>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex-1 py-3 bg-white/10 text-text-primary font-bold rounded-xl hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {detailsModalOpen && detailsItem && (
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
              className="bg-bg-card border border-brand-secondary/30 p-8 rounded-2xl shadow-2xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setDetailsModalOpen(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-2xl font-bold text-text-primary mb-6 capitalize">{detailsItem.type} Details</h3>
              
              <div className="space-y-4 text-left">
                {Object.entries(detailsItem.data).map(([key, value]) => {
                  if (key === 'id') return null;
                  return (
                    <div key={key} className="border-b border-white/10 pb-2">
                      <span className="text-text-secondary text-sm capitalize block mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium text-text-primary">
                        {Array.isArray(value) ? value.join(', ') : String(value || 'N/A')}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={() => setDetailsModalOpen(false)}
                className="mt-8 px-6 py-3 bg-white/10 text-text-primary font-bold rounded-xl hover:bg-white/20 transition-colors w-full"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}

        {rejectionModalOpen && (
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
              className="bg-bg-card border border-red-500/30 p-8 rounded-2xl shadow-2xl max-w-md w-full relative"
            >
              <button 
                onClick={() => setRejectionModalOpen(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-text-primary"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-2 text-center">Reject Application</h3>
              <p className="text-text-secondary mb-6 text-center">
                Please provide a reason for rejecting this {selectedItemForRejection?.type}.
              </p>
              
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason..."
                className="w-full p-3 bg-bg-input border border-white/10 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-text-primary mb-6"
                rows={3}
              />

              <div className="flex gap-4">
                <button 
                  onClick={() => setRejectionModalOpen(false)}
                  className="flex-1 py-3 bg-white/10 text-text-primary font-bold rounded-xl hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmRejection}
                  className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors"
                >
                  Confirm Rejection
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-bg-card p-6 rounded-2xl border border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Admin Dashboard</h1>
          <p className="text-text-secondary">Manage volunteers, appointments, and incidents.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-text-secondary bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            Logged in as: <span className="font-bold text-brand-secondary">{loggedInAdmin}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { id: 'volunteers', label: 'Volunteers', icon: Users },
          { id: 'appointments', label: 'Appointments', icon: Calendar },
          { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
          { id: 'hospitals', label: 'Hospitals', icon: Building2 },
          { id: 'report', label: 'Report Incident', icon: Plus },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`p-4 rounded-xl border transition-all flex flex-col items-center justify-center gap-2 ${
              activeTab === tab.id
                ? 'bg-brand-primary/20 border-brand-secondary text-brand-secondary shadow-lg shadow-brand-primary/10'
                : 'bg-bg-card border-white/10 text-text-secondary hover:bg-white/5'
            }`}
          >
            <tab.icon className="w-6 h-6" />
            <span className="font-medium text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="bg-bg-card border border-white/10 rounded-2xl p-6 min-h-[500px]">
        
        {/* Volunteers Tab */}
        {activeTab === 'volunteers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-text-primary">Volunteer Applications</h2>
              <div className="relative w-full sm:w-auto">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder="Search volunteers..." 
                  value={volunteerSearch}
                  onChange={(e) => setVolunteerSearch(e.target.value)}
                  className="w-full sm:w-auto pl-10 pr-4 py-2 bg-bg-input border border-white/10 rounded-lg text-sm outline-none focus:border-brand-secondary" 
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-text-secondary text-sm">
                    <th className="p-4">Name</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Joined</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-text-primary">
                  {filteredVolunteers.map((v) => (
                    <tr key={v.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-medium">{v.fullName}</td>
                      <td className="p-4">{v.profession}</td>
                      <td className="p-4 text-sm text-text-secondary">
                        <div>{v.email}</div>
                        <div>{v.phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold w-fit ${
                            v.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                            v.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {v.status}
                          </span>
                          {v.actionBy && (
                            <span className="text-[10px] text-text-secondary italic">by {v.actionBy}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-text-secondary">{v.joinedDate}</td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleViewDetails(v, 'volunteer')} className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          {v.status === 'Pending' && (
                            <>
                              <button onClick={() => handleVolunteerAction(v.id, 'Approve')} className="p-2 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors" title="Approve">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleVolunteerAction(v.id, 'Reject')} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Reject">
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button onClick={() => handleDelete(v.id, 'volunteer')} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-text-primary">Scheduled Appointments</h2>
              <div className="relative w-full sm:w-auto">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder="Search appointments..." 
                  value={appointmentSearch}
                  onChange={(e) => setAppointmentSearch(e.target.value)}
                  className="w-full sm:w-auto pl-10 pr-4 py-2 bg-bg-input border border-white/10 rounded-lg text-sm outline-none focus:border-brand-secondary" 
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-text-secondary text-sm">
                    <th className="p-4">REF ID</th>
                    <th className="p-4">Patient</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-text-primary">
                  {filteredAppointments.map((a) => (
                    <tr key={a.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono text-sm text-brand-secondary">{a.refId}</td>
                      <td className="p-4 font-medium">{a.patientName}</td>
                      <td className="p-4">{a.type}</td>
                      <td className="p-4 text-sm text-text-secondary">{a.date} at {a.time}</td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold w-fit ${
                            a.status === 'Approved' ? 'bg-blue-500/20 text-blue-400' :
                            a.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                            a.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {a.status}
                          </span>
                          {a.actionBy && (
                            <span className="text-[10px] text-text-secondary italic">by {a.actionBy}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleViewDetails(a, 'appointment')} className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          {a.status === 'Pending' && (
                            <>
                              <button onClick={() => handleAppointmentAction(a.id, 'Approve')} className="p-2 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors" title="Approve">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleAppointmentAction(a.id, 'Reject')} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Reject">
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {a.status === 'Approved' && (
                            <button onClick={() => handleAppointmentAction(a.id, 'Complete')} className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors" title="Mark Completed">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button onClick={() => handleDelete(a.id, 'appointment')} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Incidents Tab */}
        {activeTab === 'incidents' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-text-primary">Incident Logs</h2>
              <div className="relative w-full sm:w-auto">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder="Search incidents..." 
                  value={incidentSearch}
                  onChange={(e) => setIncidentSearch(e.target.value)}
                  className="w-full sm:w-auto pl-10 pr-4 py-2 bg-bg-input border border-white/10 rounded-lg text-sm outline-none focus:border-brand-secondary" 
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-text-secondary text-sm">
                    <th className="p-4">Date</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Reported By</th>
                    <th className="p-4">Severity</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-text-primary">
                  {filteredIncidents.map((i) => (
                    <tr key={i.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-sm text-text-secondary">{i.date}</td>
                      <td className="p-4 font-medium">{i.type}</td>
                      <td className="p-4 text-sm">{i.reportedBy}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          i.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                          i.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                          i.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {i.severity}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold w-fit ${
                            i.status === 'Open' ? 'bg-blue-500/20 text-blue-400' :
                            i.status === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {i.status}
                          </span>
                          {i.actionBy && (
                            <span className="text-[10px] text-text-secondary italic">by {i.actionBy}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleViewDetails(i, 'incident')} className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors" title="View Details">
                            <Eye className="w-4 h-4" />
                          </button>
                          {i.status === 'Open' && (
                            <>
                              <button onClick={() => handleIncidentAction(i.id, 'Resolved')} className="p-2 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors" title="Mark Resolved">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleIncidentAction(i.id, 'Unresolved')} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors" title="Mark Unresolved">
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button onClick={() => handleDelete(i.id, 'incident')} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Hospitals Tab */}
        {activeTab === 'hospitals' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* List */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-xl font-bold text-text-primary">Partner Hospitals</h2>
                <div className="space-y-4">
                  {hospitals.map((h) => (
                    <div key={h.id} className="bg-bg-input p-4 rounded-xl border border-white/10 flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-text-primary">{h.name}</h3>
                        <p className="text-sm text-text-secondary mt-1">{h.address}</p>
                        <p className="text-sm text-brand-secondary mt-1">{h.contact}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {h.specialties.split(',').map((s, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white/5 rounded text-xs text-text-secondary">{s.trim()}</span>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => handleDelete(h.id, 'hospital')} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Form */}
              <div className="bg-bg-input p-6 rounded-xl border border-white/10 h-fit">
                <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add New Hospital
                </h3>
                <form onSubmit={handleAddHospital} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Hospital Name</label>
                    <input 
                      required
                      value={newHospital.name}
                      onChange={e => setNewHospital({...newHospital, name: e.target.value})}
                      className="w-full p-2 bg-bg-card border border-white/10 rounded-lg text-sm outline-none focus:border-brand-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Address</label>
                    <input 
                      required
                      value={newHospital.address}
                      onChange={e => setNewHospital({...newHospital, address: e.target.value})}
                      className="w-full p-2 bg-bg-card border border-white/10 rounded-lg text-sm outline-none focus:border-brand-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Contact Number</label>
                    <input 
                      required
                      value={newHospital.contact}
                      onChange={e => setNewHospital({...newHospital, contact: e.target.value})}
                      className="w-full p-2 bg-bg-card border border-white/10 rounded-lg text-sm outline-none focus:border-brand-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">Specialties (comma separated)</label>
                    <input 
                      required
                      value={newHospital.specialties}
                      onChange={e => setNewHospital({...newHospital, specialties: e.target.value})}
                      className="w-full p-2 bg-bg-card border border-white/10 rounded-lg text-sm outline-none focus:border-brand-secondary"
                    />
                  </div>
                  <button type="submit" className="w-full py-2 bg-brand-secondary text-bg-dark font-bold rounded-lg hover:bg-brand-secondary/90 transition-colors text-sm">
                    Add Hospital
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Report Incident Tab */}
        {activeTab === 'report' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-text-primary mb-6">Report New Incident</h2>
            <form onSubmit={handleReportIncident} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Incident Type</label>
                  <select 
                    required
                    value={newIncident.type}
                    onChange={e => setNewIncident({...newIncident, type: e.target.value})}
                    className="w-full p-3 bg-bg-input border border-white/10 rounded-xl outline-none focus:border-brand-secondary text-text-primary"
                  >
                    <option value="">Select Type...</option>
                    <option value="Medical Emergency">Medical Emergency</option>
                    <option value="Injury">Injury</option>
                    <option value="Fainting">Fainting</option>
                    <option value="Security">Security Issue</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Severity Level</label>
                  <select 
                    required
                    value={newIncident.severity}
                    onChange={e => setNewIncident({...newIncident, severity: e.target.value})}
                    className="w-full p-3 bg-bg-input border border-white/10 rounded-xl outline-none focus:border-brand-secondary text-text-primary"
                  >
                    <option value="Low">Low (Minor First Aid)</option>
                    <option value="Medium">Medium (Requires Attention)</option>
                    <option value="High">High (Urgent)</option>
                    <option value="Critical">Critical (Life Threatening)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Full Name</label>
                  <input 
                    required
                    placeholder="Name of affected person"
                    value={newIncident.fullName}
                    onChange={e => setNewIncident({...newIncident, fullName: e.target.value})}
                    className="w-full p-3 bg-bg-input border border-white/10 rounded-xl outline-none focus:border-brand-secondary text-text-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Phone Number</label>
                  <input 
                    required
                    placeholder="Contact number"
                    value={newIncident.phone}
                    onChange={e => setNewIncident({...newIncident, phone: e.target.value})}
                    className="w-full p-3 bg-bg-input border border-white/10 rounded-xl outline-none focus:border-brand-secondary text-text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Reported By</label>
                <input 
                  required
                  placeholder="Name of reporter (e.g. Usher, Security)"
                  value={newIncident.reportedBy}
                  onChange={e => setNewIncident({...newIncident, reportedBy: e.target.value})}
                  className="w-full p-3 bg-bg-input border border-white/10 rounded-xl outline-none focus:border-brand-secondary text-text-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe what happened..."
                  value={newIncident.description}
                  onChange={e => setNewIncident({...newIncident, description: e.target.value})}
                  className="w-full p-3 bg-bg-input border border-white/10 rounded-xl outline-none focus:border-brand-secondary text-text-primary"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <AlertTriangle className="w-5 h-5" />
                  Submit Incident Report
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}

function Shield(props: any) {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
