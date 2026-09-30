import { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import { Card, CardB, Badge, Select, Input } from '../pharmacy/Shared';

export default function Appointments() {
  const [appointments] = useState([
    { id: 1, doctor: 'Dr. Neha Kapoor', spec: 'Cardiologist', date: 'May 20, 2026', time: '10:00 AM', hospital: 'CityCare Hospital', status: 'Confirmed' },
    { id: 2, doctor: 'Dr. Arjun Das', spec: 'General Physician', date: 'May 25, 2026', time: '11:30 AM', hospital: 'Sanjeevani Hospital', status: 'Pending' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#1E293B', fontSize: '1.5rem' }}>Appointments</h2>
        <button onClick={() => setIsModalOpen(true)} style={{ background: '#2563EB', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', fontWeight: 500, cursor: 'pointer' }}>Book Appointment</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {appointments.map(a => (
          <Card key={a.id}>
            <CardB style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', background: '#F8FAFC', padding: '0.75rem 1.25rem', borderRadius: '12px', minWidth: '80px' }}>
                  <div style={{ color: '#2563EB', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>{a.date.split(' ')[0]}</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', lineHeight: 1 }}>{a.date.split(' ')[1].replace(',', '')}</div>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', color: '#1E293B' }}>{a.doctor}</h4>
                  <div style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{a.spec}</div>
                  <div style={{ display: 'flex', gap: '1rem', color: '#475569', fontSize: '0.85rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {a.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {a.hospital}</span>
                  </div>
                </div>
              </div>
              <Badge color={a.status === 'Confirmed' ? 'green' : 'yellow'}>{a.status}</Badge>
            </CardB>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '500px', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1.5rem' }}>Book Appointment</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert('Appointment booked (demo)'); setIsModalOpen(false); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Doctor / Speciality</label><Select><option>Dr. Neha Kapoor (Cardiologist)</option><option>Dr. Arjun Das (General)</option></Select></div>
              <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Date</label><Input type="date" required /></div>
              <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Time</label><Input type="time" required /></div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: '1px solid #E2E8F0', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: '#2563EB', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Book</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
