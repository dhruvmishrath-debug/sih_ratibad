import { useState, useEffect } from 'react';
import { Pill } from 'lucide-react';
import { Card, CardH, Badge, Select } from './Shared';
import { mockApi } from '../../services/mockApi';

export default function Orders() {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [ords, pres] = await Promise.all([mockApi.getOrders(), mockApi.getPrescriptions()]);
    setOrders(ords);
    setPrescriptions(pres);
    setLoading(false);
  };

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    await mockApi.updateOrderStatus(id, status);
    alert('Order status updated');
    loadData();
  };

  const handleUpdatePrescriptionStatus = async (id: string, status: string) => {
    await mockApi.updatePrescriptionStatus(id, status);
    alert('Prescription status updated');
    loadData();
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading data...</div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem' }}>
        <button onClick={() => setActiveTab('orders')} style={{ background: activeTab === 'orders' ? '#EFF6FF' : 'transparent', color: activeTab === 'orders' ? '#1D4ED8' : '#64748B', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Orders</button>
        <button onClick={() => setActiveTab('prescriptions')} style={{ background: activeTab === 'prescriptions' ? '#EFF6FF' : 'transparent', color: activeTab === 'prescriptions' ? '#1D4ED8' : '#64748B', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Prescriptions</button>
      </div>

      {activeTab === 'orders' && (
        <Card>
          <CardH>
            <h3 style={{ margin: 0 }}>All Orders</h3>
          </CardH>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: '#64748B', fontSize: '0.85rem', borderBottom: '1px solid #F1F5F9' }}>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Order ID</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Patient</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Medicines</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Total Amount</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Date</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Action</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.9rem' }}>
                {orders.length === 0 ? (
                  <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center' }}>No orders found.</td></tr>
                ) : orders.map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>{o.id}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>{o.patientName}</td>
                    <td style={{ padding: '1rem 1.5rem' }}><Pill size={14} color="#3B82F6"/> {o.medicine}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>₹ {o.amount}</td>
                    <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>{o.date}</td>
                    <td style={{ padding: '1rem 1.5rem' }}><Badge color={o.status === 'Delivered' ? 'green' : o.status === 'Processing' ? 'blue' : 'yellow'}>{o.status}</Badge></td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <Select value={o.status} onChange={(e: any) => handleUpdateOrderStatus(o.id, e.target.value)} style={{ padding: '0.4rem', width: 'auto' }}>
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'prescriptions' && (
        <Card>
          <CardH>
            <h3 style={{ margin: 0 }}>Prescriptions</h3>
          </CardH>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ color: '#64748B', fontSize: '0.85rem', borderBottom: '1px solid #F1F5F9' }}>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Rx ID</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Patient</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Doctor</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Medicines</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Action</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.9rem' }}>
                {prescriptions.length === 0 ? (
                  <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center' }}>No prescriptions found.</td></tr>
                ) : prescriptions.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>{p.id}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>{p.patientName}</td>
                    <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>{p.doctorName}</td>
                    <td style={{ padding: '1rem 1.5rem' }}>{p.medicines}</td>
                    <td style={{ padding: '1rem 1.5rem' }}><Badge color={p.status === 'Verified' ? 'green' : p.status === 'Processing' ? 'blue' : 'yellow'}>{p.status}</Badge></td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {p.status === 'Pending' && <button onClick={() => handleUpdatePrescriptionStatus(p.id, 'Processing')} style={{ background: '#EFF6FF', color: '#3B82F6', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Process</button>}
                        {p.status === 'Processing' && <button onClick={() => handleUpdatePrescriptionStatus(p.id, 'Verified')} style={{ background: '#ECFDF5', color: '#10B981', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Verify</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

    </div>
  );
}
