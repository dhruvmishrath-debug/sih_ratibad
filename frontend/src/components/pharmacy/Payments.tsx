import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Card, CardH, Badge, Input, Select } from './Shared';
import { mockApi } from '../../services/mockApi';

export default function Payments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    (async () => {
      setLoading(true);
      setPayments(await mockApi.getPayments());
      setLoading(false);
    })();
  }, []);

  const filtered = payments.filter(p => {
    const matchSearch = p.patientName.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()) || p.orderId.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  if (loading) return <div style={{ padding: '2rem' }}>Loading payments...</div>;

  const totalRevenue = payments.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ margin: 0, color: '#1E293B', fontSize: '1.5rem' }}>Payments</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        <Card style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.5rem' }}>Total Revenue</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E293B' }}>₹ {totalRevenue}</div>
        </Card>
        <Card style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.5rem' }}>Total Transactions</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E293B' }}>{payments.length}</div>
        </Card>
        <Card style={{ padding: '1.25rem' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.5rem' }}>Completed</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10B981' }}>{payments.filter(p => p.status === 'Completed').length}</div>
        </Card>
      </div>

      <Card>
        <CardH style={{ gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <Input type="text" placeholder="Search by patient, transaction, order ID..." value={search} onChange={(e: any) => setSearch(e.target.value)} style={{ paddingLeft: '2.5rem' }} />
          </div>
          <Select value={filterStatus} onChange={(e: any) => setFilterStatus(e.target.value)} style={{ width: '180px' }}>
            <option value="all">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </Select>
        </CardH>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: '#64748B', fontSize: '0.85rem', borderBottom: '1px solid #F1F5F9' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Transaction ID</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Order ID</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Patient</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Amount</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Method</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.9rem' }}>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>No payments found.</td></tr>
              ) : filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500, color: '#1E293B' }}>{p.id}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>{p.orderId}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>{p.patientName}</td>
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 500 }}>₹ {p.amount}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>{p.method}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#64748B' }}>{p.date}</td>
                  <td style={{ padding: '1rem 1.5rem' }}><Badge color={p.status === 'Completed' ? 'green' : p.status === 'Failed' ? 'red' : 'yellow'}>{p.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
