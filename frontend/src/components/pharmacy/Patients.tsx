import { useState, useEffect } from 'react';
import { Search, Phone, Mail, X, Eye } from 'lucide-react';
import { Card, CardH, Badge, Input } from './Shared';
import { mockApi } from '../../services/mockApi';

export default function Patients() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [pats, ords, pres] = await Promise.all([
      mockApi.getPatients(),
      mockApi.getOrders(),
      mockApi.getPrescriptions()
    ]);
    setPatients(pats);
    setOrders(ords);
    setPrescriptions(pres);
    setLoading(false);
  };

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div style={{ padding: '2rem' }}>Loading patients...</div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ margin: 0, color: '#1E293B', fontSize: '1.5rem' }}>Patient Management</h2>

      <Card>
        <CardH>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <Input type="text" placeholder="Search patients..." value={search} onChange={(e: any) => setSearch(e.target.value)} style={{ paddingLeft: '2.5rem' }} />
          </div>
        </CardH>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: '#64748B', fontSize: '0.85rem', borderBottom: '1px solid #F1F5F9' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Patient</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>ID</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Phone</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Blood Group</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Last Order</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Action</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.9rem' }}>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>No patients found.</td></tr>
              ) : filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#1E3A8A', fontSize: '0.8rem' }}>
                        {p.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: 500, color: '#1E293B' }}>{p.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{p.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>{p.id}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>{p.phone}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>{p.bloodGroup}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>{p.lastOrder}</td>
                  <td style={{ padding: '1rem 1.5rem' }}><Badge color={p.status === 'Active' ? 'green' : 'gray'}>{p.status}</Badge></td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <button onClick={() => setSelectedPatient(p)} style={{ background: '#F0F5FF', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', color: '#3B82F6', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Patient Details</h3>
              <button onClick={() => setSelectedPatient(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
            </div>

            {/* Patient Info */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#1E3A8A', fontSize: '1.2rem' }}>
                {selectedPatient.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.25rem', color: '#1E293B' }}>{selectedPatient.name}</div>
                <div style={{ color: '#64748B', fontSize: '0.9rem' }}>{selectedPatient.id} • {selectedPatient.gender} • {selectedPatient.age} yrs • {selectedPatient.bloodGroup}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.85rem', marginBottom: '0.25rem' }}><Phone size={14} /> Phone</div>
                <div style={{ fontWeight: 500 }}>{selectedPatient.phone}</div>
              </div>
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.85rem', marginBottom: '0.25rem' }}><Mail size={14} /> Email</div>
                <div style={{ fontWeight: 500 }}>{selectedPatient.email}</div>
              </div>
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Insurance</div>
                <div style={{ fontWeight: 500 }}>{selectedPatient.insurance}</div>
              </div>
              <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '8px' }}>
                <div style={{ color: '#64748B', fontSize: '0.85rem', marginBottom: '0.25rem' }}>Emergency Contact</div>
                <div style={{ fontWeight: 500 }}>{selectedPatient.emergencyContact}</div>
              </div>
            </div>

            {/* Orders */}
            <h4 style={{ margin: '0 0 0.75rem', color: '#1E293B' }}>Order History</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {orders.filter(o => o.patientId === selectedPatient.id).length === 0 ? (
                <div style={{ color: '#64748B', fontSize: '0.9rem' }}>No orders found.</div>
              ) : orders.filter(o => o.patientId === selectedPatient.id).map(o => (
                <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', fontSize: '0.9rem' }}>
                  <div><strong>{o.id}</strong> — {o.medicine}</div>
                  <Badge color={o.status === 'Delivered' ? 'green' : 'blue'}>{o.status}</Badge>
                </div>
              ))}
            </div>

            {/* Prescriptions */}
            <h4 style={{ margin: '0 0 0.75rem', color: '#1E293B' }}>Prescriptions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {prescriptions.filter(p => p.patientId === selectedPatient.id).length === 0 ? (
                <div style={{ color: '#64748B', fontSize: '0.9rem' }}>No prescriptions found.</div>
              ) : prescriptions.filter(p => p.patientId === selectedPatient.id).map(rx => (
                <div key={rx.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px', fontSize: '0.9rem' }}>
                  <div><strong>{rx.id}</strong> — {rx.medicines} ({rx.dosage})</div>
                  <Badge color={rx.status === 'Verified' ? 'green' : 'yellow'}>{rx.status}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
