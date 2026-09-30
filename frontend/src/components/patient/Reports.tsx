import { useState } from 'react';
import { FlaskConical, Receipt, Download, Eye } from 'lucide-react';
import { Card, CardB, Badge } from '../pharmacy/Shared';

export default function Reports() {
  const [items] = useState([
    { type: 'Report', id: 'REP-102', title: 'Blood Test (CBC)', date: 'May 08, 2026', provider: 'CityCare Labs' },
    { type: 'Receipt', id: 'REC-504', title: 'Pharmacy Bill', date: 'May 10, 2026', provider: 'CityCare Pharmacy' },
    { type: 'Report', id: 'REP-095', title: 'Lipid Profile', date: 'Feb 15, 2026', provider: 'CityCare Labs' },
    { type: 'Receipt', id: 'REC-302', title: 'Consultation Fee', date: 'Feb 15, 2026', provider: 'CityCare Hospital' }
  ]);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ margin: 0, color: '#1E293B', fontSize: '1.5rem' }}>Reports & Receipts</h2>
      
      <div style={{ display: 'grid', gap: '1rem' }}>
        {items.map((p, i) => (
          <Card key={i}>
            <CardB style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: p.type === 'Report' ? '#F0F5FF' : '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {p.type === 'Report' ? <FlaskConical size={24} color="#2563EB" /> : <Receipt size={24} color="#EA580C" />}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#1E293B' }}>{p.title}</h4>
                    <Badge color={p.type === 'Report' ? 'blue' : 'yellow'}>{p.type}</Badge>
                  </div>
                  <div style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '0.25rem' }}>{p.id} • {p.provider}</div>
                  <div style={{ color: '#64748B', fontSize: '0.85rem' }}>{p.date}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ background: 'none', border: '1px solid #E2E8F0', padding: '0.5rem', borderRadius: '8px', color: '#64748B', cursor: 'pointer' }}><Eye size={18} /></button>
                <button style={{ background: '#2563EB', border: 'none', padding: '0.5rem', borderRadius: '8px', color: 'white', cursor: 'pointer' }}><Download size={18} /></button>
              </div>
            </CardB>
          </Card>
        ))}
      </div>
    </div>
  );
}
