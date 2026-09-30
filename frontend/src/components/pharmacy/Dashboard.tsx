import { useState, useEffect } from 'react';
import { Pill, Box, FileText, Package, Truck, Activity, FileUp, ShieldCheck, Plus, AlertTriangle, Calendar } from 'lucide-react';
import { Card, CardH, CardB, Badge } from './Shared';
import { mockApi } from '../../services/mockApi';

export default function Dashboard({ navigateTo }: { navigateTo: (tab: string) => void }) {
  const [stats, setStats] = useState<any>({ totalMedicines: 0, pendingPrescriptions: 0, lowStock: 0, orders: 0, revenue: 0 });
  const [orders, setOrders] = useState<any[]>([]);
  const [medicines, setMedicines] = useState<any[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      const [meds, ords, pres] = await Promise.all([
        mockApi.getMedicines(),
        mockApi.getOrders(),
        mockApi.getPrescriptions()
      ]);
      setMedicines(meds);
      setOrders(ords);

      const todayOrders = ords.filter((o: any) => new Date(o.date).toDateString() === new Date('2026-05-20').toDateString());
      
      setStats({
        totalMedicines: meds.length,
        pendingPrescriptions: pres.filter((p: any) => p.status === 'Pending').length,
        lowStock: meds.filter((m: any) => m.status === 'Low Stock').length,
        orders: todayOrders.length,
        revenue: todayOrders.reduce((sum: number, o: any) => sum + o.amount, 0)
      });
    };
    fetchData();
  }, []);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '1.5rem', flexDirection: 'row', flexWrap: 'wrap' }}>
        {/* Left Column (Main Stats & Tables) */}
        <div style={{ flex: '1 1 0%', minWidth: '0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Hero Section */}
          <div style={{ background: '#EFF6FF', borderRadius: '16px', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                  <Pill size={24} color="#3B82F6" style={{ transform: 'rotate(-45deg)' }} />
                </div>
              </div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 600, color: '#1E3A8A', margin: '0 0 0.5rem 0' }}>Good morning,<br/><span style={{ fontWeight: 800 }}>Rohit Patel!</span></h1>
              <p style={{ color: '#475569', maxWidth: '300px', lineHeight: 1.5, marginBottom: '1.5rem' }}>Manage your inventory, orders and prescriptions with ease.</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.85rem' }}>
                <Calendar size={14} /> May 20, 2026 <span style={{ color: '#CBD5E1', margin: '0 0.25rem' }}>|</span> CityCare Pharmacy
              </div>
            </div>
            {/* Decorative Elements */}
            <div style={{ position: 'absolute', right: '0', bottom: '0', height: '100%', width: '45%', background: 'linear-gradient(to right, transparent, #DBEAFE)', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '1.5rem' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <div style={{ padding: '0.75rem 1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', color: '#1D4ED8', fontWeight: 600, fontSize: '0.9rem' }}>Right Medicine</div>
                  <div style={{ padding: '0.75rem 1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', color: '#1D4ED8', fontWeight: 600, fontSize: '0.9rem' }}>Right Time</div>
                  <div style={{ padding: '0.75rem 1.5rem', background: 'white', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', color: '#1D4ED8', fontWeight: 600, fontSize: '0.9rem' }}>Better Health</div>
               </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
            <Card onClick={() => navigateTo('inventory')} style={{cursor: 'pointer'}}>
              <CardB style={{ padding: '1.25rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><Box size={18} color="#3B82F6" /></div>
                <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '0.25rem' }}>Total Medicines</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>{stats.totalMedicines}</div>
              </CardB>
            </Card>
            <Card onClick={() => navigateTo('orders')} style={{cursor: 'pointer'}}>
              <CardB style={{ padding: '1.25rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><FileText size={18} color="#3B82F6" /></div>
                <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '0.25rem' }}>Pending Prescriptions</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>{stats.pendingPrescriptions}</div>
              </CardB>
            </Card>
            <Card onClick={() => navigateTo('inventory')} style={{cursor: 'pointer'}}>
              <CardB style={{ padding: '1.25rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><Package size={18} color="#F97316" /></div>
                <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '0.25rem' }}>Low Stock Items</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>{stats.lowStock}</div>
              </CardB>
            </Card>
            <Card onClick={() => navigateTo('orders')} style={{cursor: 'pointer'}}>
              <CardB style={{ padding: '1.25rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><Truck size={18} color="#10B981" /></div>
                <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '0.25rem' }}>Today's Orders</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>{stats.orders}</div>
              </CardB>
            </Card>
            <Card onClick={() => navigateTo('payments')} style={{cursor: 'pointer'}}>
              <CardB style={{ padding: '1.25rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}><span style={{ color: '#16A34A', fontWeight: 700, fontSize: '1.1rem' }}>₹</span></div>
                <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500, marginBottom: '0.25rem' }}>Today's Revenue</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E293B', marginBottom: '0.5rem' }}>₹ {stats.revenue}</div>
              </CardB>
            </Card>
          </div>

          {/* Tables Section Row 1 */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
            <Card>
              <CardH>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} color="#3B82F6" />
                  <h3 style={{ margin: 0, fontSize: '1rem', color: '#1E293B' }}>Recent Orders</h3>
                </div>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('orders'); }} style={{ color: '#3B82F6', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500 }}>View All</a>
              </CardH>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ color: '#64748B', fontSize: '0.8rem', borderBottom: '1px solid #F1F5F9' }}>
                      <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Order ID</th>
                      <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Patient</th>
                      <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Medicine(s)</th>
                      <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '0.9rem' }}>
                    {orders.slice(0,5).map(o => (
                      <tr key={o.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                        <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>{o.id}</td>
                        <td style={{ padding: '1rem 1.5rem' }}>{o.patientName}</td>
                        <td style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Pill size={14} color="#3B82F6"/> {o.medicine}</td>
                        <td style={{ padding: '1rem 1.5rem' }}><Badge color={o.status === 'Delivered' ? 'green' : o.status === 'Processing' ? 'blue' : 'yellow'}>{o.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card>
              <CardH>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Activity size={18} color="#3B82F6" />
                  <h3 style={{ margin: 0, fontSize: '1rem', color: '#1E293B' }}>Stock Levels</h3>
                </div>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('inventory'); }} style={{ color: '#3B82F6', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500 }}>View All</a>
              </CardH>
              <CardB style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {medicines.slice(0,5).map((item, i) => {
                  const percent = Math.min((item.stockQuantity / item.reorderLevel) * 20, 100);
                  const color = item.status === 'In Stock' ? '#10B981' : '#EF4444';
                  return (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, color: '#334155' }}>
                        <Pill size={14} color="#3B82F6"/> {item.name}
                      </div>
                      <span style={{ color: '#64748B', fontSize: '0.85rem' }}>{item.stockQuantity} units</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: '#F1F5F9', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ width: `${percent}%`, height: '100%', background: color, borderRadius: '99px' }} />
                    </div>
                  </div>
                )})}
              </CardB>
            </Card>
          </div>

        </div>

        {/* Right Column (Sidecards) */}
        <div style={{ flex: '0 0 320px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Quick Actions */}
          <Card style={{ background: '#F8FAFC', border: 'none', boxShadow: 'none' }}>
            <div style={{ marginBottom: '1rem', fontWeight: 600, color: '#1E293B', fontSize: '1rem' }}>Quick Actions</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div onClick={() => navigateTo('orders')} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem 0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', background: '#EFF6FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileUp size={20} color="#3B82F6" /></div>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#1E293B', lineHeight: 1.2 }}>View<br/>Prescriptions</span>
              </div>
              <div onClick={() => navigateTo('inventory')} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem 0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', background: '#ECFDF5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={20} color="#10B981" /></div>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#1E293B', lineHeight: 1.2 }}>Check<br/>Availability</span>
              </div>
              <div onClick={() => navigateTo('reports')} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem 0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', background: '#F5F3FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={20} color="#8B5CF6" /></div>
                <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#1E293B', lineHeight: 1.2 }}>Generate<br/>Report</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div onClick={() => navigateTo('inventory')} style={{ background: '#FFF7ED', border: '1px dashed #FDBA74', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', background: '#FFEDD5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={16} color="#EA580C" /></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#9A3412' }}>Add Medicine</span>
              </div>
              <div onClick={() => navigateTo('suppliers')} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ width: '32px', height: '32px', background: '#EFF6FF', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Truck size={16} color="#3B82F6" /></div>
                <span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#1E293B' }}>Suppliers</span>
              </div>
            </div>
          </Card>

          {/* Low Stock Alert */}
          <Card>
            <CardH>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} color="#EF4444" />
                <h3 style={{ margin: 0, fontSize: '1rem', color: '#1E293B' }}>Low Stock Alert</h3>
              </div>
              <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('inventory'); }} style={{ color: '#3B82F6', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500 }}>View All</a>
            </CardH>
            <CardB style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {medicines.filter(m => m.status === 'Low Stock').slice(0, 4).map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: i !== 3 ? '1rem' : 0, borderBottom: i !== 3 ? '1px solid #F1F5F9' : 'none' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                     <div style={{ background: '#F1F5F9', padding: '0.5rem', borderRadius: '50%' }}><Pill size={14} color="#64748B" /></div>
                     <div>
                       <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#334155' }}>{item.name}</div>
                       <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>{item.stockQuantity} units left</div>
                     </div>
                  </div>
                  <Badge color="red">Low Stock</Badge>
                </div>
              ))}
            </CardB>
          </Card>
        </div>
      </div>
    </div>
  );
}
