import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Activity, Heart, Calendar } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Reports() {
  const { incidents, appointments, volunteers } = useData();

  // --- Calculations ---

  // 1. Monthly Incidents (Last 6 Months)
  const getMonthlyIncidents = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const data = [];

    // Initialize last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(currentMonth - i);
      const monthIndex = d.getMonth();
      const year = d.getFullYear();
      data.push({
        name: months[monthIndex],
        monthIndex: monthIndex, // 0-11
        year: year,
        incidents: 0
      });
    }

    // Populate counts
    incidents.forEach(inc => {
      const date = new Date(inc.date);
      const month = date.getMonth();
      const year = date.getFullYear();
      
      const monthData = data.find(d => d.monthIndex === month && d.year === year);
      if (monthData) {
        monthData.incidents++;
      }
    });

    return data;
  };

  const monthlyIncidentsData = getMonthlyIncidents();

  // 2. Patient Demographics (from Appointments)
  const getPatientDemographics = () => {
    const counts: Record<string, number> = {};
    appointments.forEach(app => {
      if (app.category) {
        counts[app.category] = (counts[app.category] || 0) + 1;
      }
    });

    const total = appointments.length || 1; // Avoid divide by zero
    return Object.entries(counts).map(([name, count]) => ({
      name,
      value: Math.round((count / total) * 100) || 0,
      count
    })).filter(item => item.value > 0);
  };

  const patientCategories = getPatientDemographics();
  const COLORS = ['#2a1b5e', '#f69d1a', '#e85615'];

  // 3. Key Stats
  const approvedVolunteers = volunteers.filter(v => v.status === 'Approved').length;
  const totalLivesTouched = appointments.length + incidents.length;
  const uniqueEventDates = new Set([...incidents.map(i => i.date), ...appointments.map(a => a.date)]).size;

  const stats = [
    { label: "Lives Touched", value: totalLivesTouched.toString(), icon: Heart, color: "text-brand-tertiary", bg: "bg-brand-tertiary/10" },
    { label: "Medical Volunteers", value: approvedVolunteers.toString(), icon: Users, color: "text-brand-secondary", bg: "bg-brand-secondary/10" },
    { label: "Health Checks", value: appointments.length.toString(), icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Active Days", value: uniqueEventDates.toString(), icon: Calendar, color: "text-brand-primary", bg: "bg-brand-primary/10" },
  ];

  // 4. Recent Activity (Combine Incidents & Appointments)
  const recentActivity = [
    ...incidents.map(i => ({
      date: i.date,
      event: 'Incident Report',
      type: i.type,
      status: i.status,
      isIncident: true
    })),
    ...appointments.map(a => ({
      date: a.date,
      event: 'Appointment',
      type: a.type,
      status: a.status,
      isIncident: false
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
   .slice(0, 5);

  return (
    <div className="space-y-12">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl font-bold text-text-primary mb-4">Impact Report & Analytics</h1>
        <p className="text-text-secondary">
          Tracking our service to the body of Christ. Data helps us improve our response times, resource allocation, and preventive care strategies.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-bg-card p-6 rounded-2xl border border-white/10 shadow-sm flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-text-secondary font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-text-primary">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Incident Trend */}
        <div className="bg-bg-card p-6 rounded-2xl border border-white/10 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-text-secondary" />
              Monthly Medical Incidents
            </h3>
            <select className="text-sm border-white/10 rounded-lg bg-bg-input text-text-primary p-1 outline-none">
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyIncidentsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#334155'}}
                  contentStyle={{backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc'}}
                />
                <Bar dataKey="incidents" fill="#f69d1a" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Distribution */}
        <div className="bg-bg-card p-6 rounded-2xl border border-white/10 shadow-sm">
          <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-text-secondary" />
            Patient Demographics (Appointments)
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            {patientCategories.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={patientCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {patientCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', color: '#f8fafc'}} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-text-secondary text-sm">No appointment data available</div>
            )}
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {patientCategories.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm text-text-secondary">{entry.name} ({entry.value}%)</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Activity Log */}
      <div className="bg-bg-card rounded-2xl border border-white/10 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h3 className="text-lg font-bold text-text-primary">Recent Medical Activities</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white/5 text-text-secondary font-medium">
              <tr>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Event/Source</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentActivity.map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-text-secondary">{row.date}</td>
                  <td className="px-6 py-4 font-medium text-text-primary">{row.event}</td>
                  <td className="px-6 py-4 text-text-secondary">{row.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.status === 'Resolved' || row.status === 'Completed' || row.status === 'Approved'
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : row.status === 'Pending' || row.status === 'Open'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentActivity.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-text-secondary">No recent activity found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
