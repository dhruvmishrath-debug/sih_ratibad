import { useState, useEffect } from 'react';
import { BarChart3, Download } from 'lucide-react';
import { Card, CardH, Badge } from './Shared';
import { mockApi } from '../../services/mockApi';

export default function Reports() {
  const [reportType, setReportType] = useState('sales');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => { generateReport(); }, [reportType]);

  const generateReport = async () => {
    setLoading(true);
    const [medicines, orders, payments, patients] = await Promise.all([
      mockApi.getMedicines(), mockApi.getOrders(), mockApi.getPayments(), mockApi.getPatients()
    ]);

    const data: any = {};
    if (reportType === 'sales') {
      data.title = 'Sales Report';
      data.totalOrders = orders.length;
      data.totalRevenue = orders.reduce((s: number, o: any) => s + o.amount, 0);
      data.deliveredOrders = orders.filter((o: any) => o.status === 'Delivered').length;
      data.pendingOrders = orders.filter((o: any) => o.status !== 'Delivered').length;
      data.rows = orders.map((o: any) => ({ id: o.id, item: o.medicine, amount: o.amount, status: o.status, date: o.date }));
    } else if (reportType === 'inventory') {
      data.title = 'Inventory Report';
      data.totalItems = medicines.length;
      data.lowStock = medicines.filter((m: any) => m.status === 'Low Stock').length;
      data.totalValue = medicines.reduce((s: number, m: any) => s + (m.price * m.stockQuantity), 0);
      data.rows = medicines.map((m: any) => ({ id: m.id, item: m.name, stock: m.stockQuantity, price: m.price, status: m.status }));
    } else if (reportType === 'patients') {
      data.title = 'Patient Report';
      data.totalPatients = patients.length;
      data.activePatients = patients.filter((p: any) => p.status === 'Active').length;
      data.rows = patients.map((p: any) => ({ id: p.id, item: p.name, status: p.status, phone: p.phone }));
    } else if (reportType === 'revenue') {
      data.title = 'Revenue Report';
      data.totalRevenue = payments.reduce((s: number, p: any) => s + p.amount, 0);
      data.completedPayments = payments.filter((p: any) => p.status === 'Completed').length;
      data.rows = payments.map((p: any) => ({ id: p.id, item: `Order: ${p.orderId}`, amount: p.amount, status: p.status, date: p.date }));
    }

    setReportData(data);
    setLoading(false);
  };

  const handleDownload = () => {
    if (!reportData) return;
    const csvContent = reportData.rows.map((r: any) => Object.values(r).join(',')).join('\n');
    const header = Object.keys(reportData.rows[0] || {}).join(',');
    const blob = new Blob([header + '\n' + csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${reportType}_report.csv`; a.click();
    URL.revokeObjectURL(url);
    alert('Report downloaded successfully');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#1E293B', fontSize: '1.5rem' }}>Reports</h2>
        <button onClick={handleDownload} style={{ background: '#3B82F6', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 500 }}>
          <Download size={18} /> Download CSV
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {['sales', 'inventory', 'patients', 'revenue'].map(t => (
          <button key={t} onClick={() => setReportType(t)} style={{ background: reportType === t ? '#EFF6FF' : '#F8FAFC', color: reportType === t ? '#1D4ED8' : '#64748B', border: reportType === t ? '1px solid #BFDBFE' : '1px solid #E2E8F0', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 500, textTransform: 'capitalize' }}>
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>Generating report...</div>
      ) : reportData && (
        <>
          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {Object.entries(reportData).filter(([k]) => !['title', 'rows'].includes(k)).map(([key, val]) => (
              <Card key={key} style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.5rem', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E293B' }}>{typeof val === 'number' && key.includes('evenue') ? `₹ ${val}` : String(val)}</div>
              </Card>
            ))}
          </div>

          {/* Report Table */}
          <Card>
            <CardH>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <BarChart3 size={18} color="#3B82F6" />
                <h3 style={{ margin: 0, fontSize: '1rem' }}>{reportData.title}</h3>
              </div>
            </CardH>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ color: '#64748B', fontSize: '0.85rem', borderBottom: '1px solid #F1F5F9' }}>
                    {reportData.rows.length > 0 && Object.keys(reportData.rows[0]).map((k: string) => (
                      <th key={k} style={{ padding: '1rem 1.5rem', fontWeight: 600, textTransform: 'capitalize' }}>{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody style={{ fontSize: '0.9rem' }}>
                  {reportData.rows.map((row: any, i: number) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F8FAFC' }}>
                      {Object.entries(row).map(([k, v]) => (
                        <td key={k} style={{ padding: '1rem 1.5rem', color: '#475569' }}>
                          {k === 'status' ? <Badge color={(v as string) === 'Delivered' || (v as string) === 'Completed' || (v as string) === 'In Stock' || (v as string) === 'Active' ? 'green' : (v as string) === 'Low Stock' ? 'red' : 'blue'}>{String(v)}</Badge> :
                           k === 'amount' || k === 'price' ? `₹ ${v}` : String(v)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
