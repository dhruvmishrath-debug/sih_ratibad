import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { Card, CardH, Badge, Input, Select } from './Shared';
import { mockApi } from '../../services/mockApi';

export default function Inventory() {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStock, setFilterStock] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState<any>(null);

  useEffect(() => {
    loadMedicines();
  }, []);

  const loadMedicines = async () => {
    setLoading(true);
    const data = await mockApi.getMedicines();
    setMedicines(data);
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMedicine.id) {
      await mockApi.updateMedicine(currentMedicine.id, currentMedicine);
      alert('Medicine updated successfully');
    } else {
      await mockApi.addMedicine({ ...currentMedicine, status: currentMedicine.stockQuantity > currentMedicine.reorderLevel ? 'In Stock' : 'Low Stock' });
      alert('Medicine added successfully');
    }
    setIsModalOpen(false);
    loadMedicines();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      await mockApi.deleteMedicine(id);
      alert('Medicine deleted successfully');
      loadMedicines();
    }
  };

  const filteredMeds = medicines.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.genericName.toLowerCase().includes(search.toLowerCase());
    const matchStock = filterStock === 'all' || (filterStock === 'low' && m.status === 'Low Stock');
    return matchSearch && matchStock;
  });

  if (loading) return <div style={{ padding: '2rem' }}>Loading inventory...</div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#1E293B', fontSize: '1.5rem' }}>Inventory Management</h2>
        <button onClick={() => { setCurrentMedicine({}); setIsModalOpen(true); }} style={{ background: '#3B82F6', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 500 }}>
          <Plus size={18} /> Add Medicine
        </button>
      </div>

      <Card>
        <CardH style={{ gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <Input type="text" placeholder="Search by name or generic name..." value={search} onChange={(e: any) => setSearch(e.target.value)} style={{ paddingLeft: '2.5rem' }} />
          </div>
          <div style={{ width: '200px' }}>
            <Select value={filterStock} onChange={(e: any) => setFilterStock(e.target.value)}>
              <option value="all">All Stock Levels</option>
              <option value="low">Low Stock</option>
            </Select>
          </div>
        </CardH>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ color: '#64748B', fontSize: '0.85rem', borderBottom: '1px solid #F1F5F9' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Medicine Name</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Stock</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Price</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: '0.9rem' }}>
              {filteredMeds.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#64748B' }}>No medicines found.</td>
                </tr>
              ) : filteredMeds.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid #F8FAFC' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontWeight: 500, color: '#1E293B' }}>{m.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{m.genericName}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>{m.category}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontWeight: 500 }}>{m.stockQuantity}</div>
                    {m.stockQuantity <= m.reorderLevel && <div style={{ fontSize: '0.75rem', color: '#EF4444', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><AlertTriangle size={12}/> Reorder</div>}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: '#475569' }}>₹ {m.price}</td>
                  <td style={{ padding: '1rem 1.5rem' }}><Badge color={m.status === 'In Stock' ? 'green' : 'red'}>{m.status}</Badge></td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => { setCurrentMedicine(m); setIsModalOpen(true); }} style={{ background: '#F0F5FF', border: 'none', padding: '0.4rem', borderRadius: '6px', color: '#3B82F6', cursor: 'pointer' }}><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(m.id)} style={{ background: '#FEF2F2', border: 'none', padding: '0.4rem', borderRadius: '6px', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '500px', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1.5rem' }}>{currentMedicine.id ? 'Edit Medicine' : 'Add Medicine'}</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.25rem', display: 'block' }}>Name</label>
                <Input required value={currentMedicine.name || ''} onChange={(e: any) => setCurrentMedicine({...currentMedicine, name: e.target.value})} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.25rem', display: 'block' }}>Generic Name</label>
                <Input required value={currentMedicine.genericName || ''} onChange={(e: any) => setCurrentMedicine({...currentMedicine, genericName: e.target.value})} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.25rem', display: 'block' }}>Stock Quantity</label>
                  <Input type="number" required value={currentMedicine.stockQuantity || ''} onChange={(e: any) => setCurrentMedicine({...currentMedicine, stockQuantity: parseInt(e.target.value)})} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '0.25rem', display: 'block' }}>Price</label>
                  <Input type="number" required value={currentMedicine.price || ''} onChange={(e: any) => setCurrentMedicine({...currentMedicine, price: parseFloat(e.target.value)})} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: '1px solid #E2E8F0', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: '#3B82F6', color: 'white', border: 'none', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
