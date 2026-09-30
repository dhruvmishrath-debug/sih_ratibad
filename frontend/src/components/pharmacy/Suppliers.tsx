import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Truck, X, Eye } from 'lucide-react';
import { Card, CardH, Badge, Input } from './Shared';
import { mockApi } from '../../services/mockApi';

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<any>(null);
  const [viewSupplier, setViewSupplier] = useState<any>(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await mockApi.getSuppliers();
    setSuppliers(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const allSuppliers = await mockApi.getSuppliers();
    if (currentSupplier.id) {
      const idx = allSuppliers.findIndex((s: any) => s.id === currentSupplier.id);
      if (idx !== -1) allSuppliers[idx] = currentSupplier;
    } else {
      currentSupplier.id = `SUP-${String(allSuppliers.length + 1).padStart(3, '0')}`;
      currentSupplier.suppliedMedicines = 0;
      currentSupplier.status = 'Active';
      allSuppliers.push(currentSupplier);
    }
    localStorage.setItem('suppliers', JSON.stringify(allSuppliers));
    alert(currentSupplier.id ? 'Supplier saved successfully' : 'Supplier added successfully');
    setIsModalOpen(false);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this supplier?')) return;
    const all = await mockApi.getSuppliers();
    localStorage.setItem('suppliers', JSON.stringify(all.filter((s: any) => s.id !== id)));
    alert('Supplier deleted successfully');
    loadData();
  };

  const filtered = suppliers.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.contactPerson.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div style={{ padding: '2rem' }}>Loading suppliers...</div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#1E293B', fontSize: '1.5rem' }}>Supplier Management</h2>
        <button onClick={() => { setCurrentSupplier({}); setIsModalOpen(true); }} style={{ background: '#3B82F6', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 500 }}>
          <Plus size={18} /> Add Supplier
        </button>
      </div>

      <Card>
        <CardH>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <Input type="text" placeholder="Search suppliers..." value={search} onChange={(e: any) => setSearch(e.target.value)} style={{ paddingLeft: '2.5rem' }} />
          </div>
        </CardH>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: '#64748B', fontSize: '0.85rem', borderBottom: '1px solid #F1F5F9' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Supplier</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Contact Person</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Phone</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Medicines</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.9rem' }}>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>No suppliers found.</td></tr>
              ) : filtered.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Truck size={16} color="#3B82F6" /></div>
                      <div><div style={{ fontWeight: 500 }}>{s.name}</div><div style={{ fontSize: '0.75rem', color: '#64748B' }}>{s.email}</div></div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>{s.contactPerson}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>{s.phone}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{s.suppliedMedicines}</td>
                  <td style={{ padding: '1rem 1.5rem' }}><Badge color={s.status === 'Active' ? 'green' : 'gray'}>{s.status}</Badge></td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => setViewSupplier(s)} style={{ background: '#F0F5FF', border: 'none', padding: '0.4rem', borderRadius: '6px', color: '#3B82F6', cursor: 'pointer' }}><Eye size={16} /></button>
                      <button onClick={() => { setCurrentSupplier({...s}); setIsModalOpen(true); }} style={{ background: '#F0F5FF', border: 'none', padding: '0.4rem', borderRadius: '6px', color: '#3B82F6', cursor: 'pointer' }}><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(s.id)} style={{ background: '#FEF2F2', border: 'none', padding: '0.4rem', borderRadius: '6px', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '500px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>{currentSupplier?.id ? 'Edit Supplier' : 'Add Supplier'}</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="#64748B" /></button>
            </div>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Name</label><Input required value={currentSupplier?.name || ''} onChange={(e: any) => setCurrentSupplier({...currentSupplier, name: e.target.value})} /></div>
              <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Contact Person</label><Input required value={currentSupplier?.contactPerson || ''} onChange={(e: any) => setCurrentSupplier({...currentSupplier, contactPerson: e.target.value})} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Phone</label><Input required value={currentSupplier?.phone || ''} onChange={(e: any) => setCurrentSupplier({...currentSupplier, phone: e.target.value})} /></div>
                <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Email</label><Input required type="email" value={currentSupplier?.email || ''} onChange={(e: any) => setCurrentSupplier({...currentSupplier, email: e.target.value})} /></div>
              </div>
              <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Address</label><Input value={currentSupplier?.address || ''} onChange={(e: any) => setCurrentSupplier({...currentSupplier, address: e.target.value})} /></div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: '1px solid #E2E8F0', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: '#3B82F6', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewSupplier && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '500px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0 }}>Supplier Details</h3>
              <button onClick={() => setViewSupplier(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="#64748B" /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                ['Name', viewSupplier.name], ['Contact', viewSupplier.contactPerson],
                ['Phone', viewSupplier.phone], ['Email', viewSupplier.email],
                ['Address', viewSupplier.address], ['Medicines Supplied', viewSupplier.suppliedMedicines],
                ['Status', viewSupplier.status]
              ].map(([label, val]) => (
                <div key={String(label)} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#F8FAFC', borderRadius: '8px' }}>
                  <span style={{ color: '#64748B', fontSize: '0.9rem' }}>{label}</span>
                  <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{String(val)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
