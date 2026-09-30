import { useState } from 'react';
import { Pill, AlertTriangle } from 'lucide-react';
import { Card, CardB } from '../pharmacy/Shared';

export default function Medicines() {
  const [medicines] = useState([
    { name: 'Paracetamol 500mg', dosage: '1 tablet', frequency: 'Once daily', time: '08:00 AM', status: 'Active', stock: 12 },
    { name: 'Amoxicillin 500mg', dosage: '1 tablet', frequency: 'Twice daily', time: '08:00 AM & 08:00 PM', status: 'Active', stock: 4 },
    { name: 'Vitamin D3 60K', dosage: '1 tablet', frequency: 'Weekly', time: 'Sunday 10:00 AM', status: 'Active', stock: 8 }
  ]);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ margin: 0, color: '#1E293B', fontSize: '1.5rem' }}>My Medicines</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {medicines.map((m, i) => (
          <Card key={i}>
            <CardB style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Pill size={20} color="#3B82F6" />
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.05rem', color: '#1E293B' }}>{m.name}</h4>
                    <span style={{ color: '#64748B', fontSize: '0.85rem' }}>{m.dosage} • {m.frequency}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#F8FAFC', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#64748B' }}>Time:</span>
                  <span style={{ fontWeight: 600, color: '#3B82F6' }}>{m.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#64748B' }}>Stock Left:</span>
                  <span style={{ fontWeight: 600, color: m.stock < 5 ? '#EF4444' : '#10B981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {m.stock < 5 && <AlertTriangle size={14} />} {m.stock} tablets
                  </span>
                </div>
              </div>
            </CardB>
          </Card>
        ))}
      </div>
    </div>
  );
}
