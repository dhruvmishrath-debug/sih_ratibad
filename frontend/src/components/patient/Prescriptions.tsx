import { useState } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { Card, CardB, Badge } from '../pharmacy/Shared';

export default function Prescriptions() {
  const [prescriptions] = useState([
    { id: 'RX-2026-05-10', doctor: 'Dr. Neha Kapoor', hospital: 'CityCare Hospital', date: 'May 10, 2026', medicines: 'Amoxicillin 500mg, Paracetamol 500mg', status: 'Active' },
    { id: 'RX-2026-04-28', doctor: 'Dr. Arjun Das', hospital: 'Sanjeevani Hospital', date: 'Apr 28, 2026', medicines: 'Cefixime 200mg, Cetirizine 10mg', status: 'Completed' },
    { id: 'RX-2026-02-15', doctor: 'Dr. Neha Kapoor', hospital: 'CityCare Hospital', date: 'Feb 15, 2026', medicines: 'Atorvastatin 20mg', status: 'Completed' }
  ]);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ margin: 0, color: '#1E293B', fontSize: '1.5rem' }}>Prescriptions</h2>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        {prescriptions.map(p => (
          <Card key={p.id}>
            <CardB style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F0F5FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={24} color="#2563EB" /></div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem', fontSize: '1.1rem', color: '#1E293B' }}>{p.id}</h4>
                  <div style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{p.doctor} • {p.hospital}</div>
                  <div style={{ color: '#64748B', fontSize: '0.85rem' }}>{p.date} | {p.medicines}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                <Badge color={p.status === 'Active' ? 'green' : 'gray'}>{p.status}</Badge>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ background: 'none', border: '1px solid #E2E8F0', padding: '0.4rem', borderRadius: '6px', color: '#64748B', cursor: 'pointer' }}><Eye size={16} /></button>
                  <button style={{ background: '#F0F5FF', border: 'none', padding: '0.4rem', borderRadius: '6px', color: '#2563EB', cursor: 'pointer' }}><Download size={16} /></button>
                </div>
              </div>
            </CardB>
          </Card>
        ))}
      </div>
    </div>
  );
}
