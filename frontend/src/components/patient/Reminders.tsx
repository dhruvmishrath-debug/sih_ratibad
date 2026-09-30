import { useState } from 'react';
import { Clock, Bell, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardH, CardB } from '../pharmacy/Shared';

export default function Reminders() {
  const [reminders, setReminders] = useState([
    { id: 1, medicine: 'Paracetamol 500mg', time: '08:00 AM', taken: true },
    { id: 2, medicine: 'Amoxicillin 500mg', time: '08:00 AM', taken: true },
    { id: 3, medicine: 'Amoxicillin 500mg', time: '08:00 PM', taken: false },
    { id: 4, medicine: 'Vitamin D3 60K', time: 'Sunday 10:00 AM', taken: false }
  ]);

  const toggleStatus = (id: number) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, taken: !r.taken } : r));
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#1E293B', fontSize: '1.5rem' }}>Medicine Reminders</h2>
        <button style={{ background: '#2563EB', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bell size={16} /> Add Reminder</button>
      </div>
      
      <Card>
        <CardH><h3 style={{ margin: 0 }}>Today's Schedule</h3></CardH>
        <CardB style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {reminders.map(r => (
            <div key={r.id} onClick={() => toggleStatus(r.id)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderRadius: '12px', background: r.taken ? '#F8FAFC' : '#F0F5FF', border: `1px solid ${r.taken ? '#E2E8F0' : '#BFDBFE'}`, cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: r.taken ? '#E2E8F0' : '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Clock size={20} color={r.taken ? '#94A3B8' : '#2563EB'} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.05rem', color: r.taken ? '#64748B' : '#1E293B', textDecoration: r.taken ? 'line-through' : 'none' }}>{r.medicine}</h4>
                  <span style={{ color: '#64748B', fontSize: '0.85rem' }}>{r.time}</span>
                </div>
              </div>
              <div>
                {r.taken ? <CheckCircle2 size={28} color="#10B981" /> : <Circle size={28} color="#94A3B8" />}
              </div>
            </div>
          ))}
        </CardB>
      </Card>
    </div>
  );
}
