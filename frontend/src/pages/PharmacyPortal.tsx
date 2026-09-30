import { useState } from 'react';
import { 
  Activity, Search, Bell, MoreVertical, X, LayoutDashboard, Box, FileText, 
  Users, Truck, BarChart3, CreditCard, Settings as SettingsIcon,
  Pill, ChevronDown, LogOut, Heart
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/pharmacy/Dashboard';
import Inventory from '../components/pharmacy/Inventory';
import Orders from '../components/pharmacy/Orders';
import Patients from '../components/pharmacy/Patients';
import Suppliers from '../components/pharmacy/Suppliers';
import Reports from '../components/pharmacy/Reports';
import Payments from '../components/pharmacy/Payments';
import Settings from '../components/pharmacy/Settings';const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'inventory', label: 'Inventory', icon: <Box size={20} /> },
  { id: 'orders', label: 'Orders & Prescriptions', icon: <FileText size={20} /> },
  { id: 'patients', label: 'Patients', icon: <Users size={20} /> },
  { id: 'suppliers', label: 'Suppliers', icon: <Truck size={20} /> },
  { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} /> },
  { id: 'payments', label: 'Payments', icon: <CreditCard size={20} /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon size={20} /> },
];





export default function PharmacyPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isPharmacyDropdownOpen, setIsPharmacyDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      {/* Sidebar Overlay (Mobile) */}
      {isMobileMenuOpen && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.4)', zIndex: 40, backdropFilter: 'blur(2px)' }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`} style={{ zIndex: 50, display: 'flex', flexDirection: 'column' }}>
        {/* Mobile Close Button */}
        <button 
          className="mobile-close-btn"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'white', border: '1px solid #E2E8F0', borderRadius: '50%', padding: '0.5rem', display: 'none', zIndex: 60 }}
        >
          <X size={20} color="#64748B" />
        </button>

        <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: '#3B82F6', borderRadius: '8px', padding: '0.5rem', flexShrink: 0 }}><Activity color="white" size={20} /></div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E293B', lineHeight: 1.2 }}>CareChain</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Pharmacy Portal</div>
            </div>
          </div>
        </div>
        <nav style={{ padding: '0.5rem 1rem', flex: 1, overflowY: 'auto' }}>
          <ul className="sidebar-nav-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {navItems.map(item => (
              <li key={item.id}>
                <button 
                  className="sidebar-nav-btn" 
                  onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }} 
                  style={{ 
                    width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', 
                    borderRadius: '8px', border: 'none', 
                    backgroundColor: activeTab === item.id ? '#3B82F6' : 'transparent', 
                    color: activeTab === item.id ? 'white' : '#475569', 
                    fontWeight: activeTab === item.id ? 600 : 500, 
                    textAlign: 'left', transition: 'all 0.2s', fontSize: '0.9rem', cursor: 'pointer' 
                  }}
                >
                  {item.icon}{item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div style={{ padding: '1.5rem', borderTop: '1px solid #E2E8F0' }}>
          <div style={{ background: '#F0F9FF', borderRadius: '12px', padding: '1.25rem', marginBottom: '1rem' }}>
            <div style={{ width: '32px', height: '32px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
              <Pill size={16} color="#3B82F6" />
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E3A8A', marginBottom: '0.25rem' }}>Better Medicines.</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1E3A8A' }}>Healthier Communities.</div>
            <Heart size={16} color="#3B82F6" style={{ marginTop: '0.75rem', alignSelf: 'flex-end', display: 'block', marginLeft: 'auto' }} />
          </div>
          <button onClick={() => navigate('/')} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '8px', border: 'none', background: 'transparent', color: '#64748B', fontWeight: 500, cursor: 'pointer', fontSize: '0.9rem' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-content-area" style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', padding: 0 }}>
        
        {/* Top Header */}
        <header style={{ height: '70px', background: 'white', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: '#1E293B' }}>
              <MoreVertical size={24} />
            </button>
            <div className="search-bar-container" style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>
              <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input type="text" placeholder="Search medicines, patients, orders, etc..." onKeyDown={(e) => { if(e.key === 'Enter') alert('Searching for: ' + e.currentTarget.value) }} style={{ width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', border: '1px solid #E2E8F0', borderRadius: '99px', fontSize: '0.9rem', outline: 'none', background: '#F8FAFC' }} />
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsProfileDropdownOpen(false); setIsPharmacyDropdownOpen(false); }}>
              <Bell size={24} color="#64748B" />
              <div style={{ position: 'absolute', top: '-4px', right: '-4px', width: '18px', height: '18px', background: '#EF4444', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, border: '2px solid white' }}>3</div>
              
              {isNotificationsOpen && (
                <div className="animate-fade-in" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', width: '320px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 50 }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', fontWeight: 600 }}>Pharmacy Alerts</div>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #F1F5F9', fontSize: '0.85rem' }}><strong>Low Stock Alert:</strong> Paracetamol 500mg is below threshold.</div>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #F1F5F9', fontSize: '0.85rem' }}><strong>Order Pending:</strong> 2 new incoming e-prescriptions.</div>
                    <div style={{ padding: '1rem', borderBottom: '1px solid #F1F5F9', fontSize: '0.85rem' }}><strong>Shipment Delayed:</strong> Supplier Alpha shipment delayed by 1 day.</div>
                  </div>
                  <div style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.8rem', color: '#2563EB', cursor: 'pointer', fontWeight: 500 }}>View all alerts</div>
                </div>
              )}
            </div>
            
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1rem', borderLeft: '1px solid #E2E8F0', cursor: 'pointer' }} onClick={() => { setIsPharmacyDropdownOpen(!isPharmacyDropdownOpen); setIsNotificationsOpen(false); setIsProfileDropdownOpen(false); }}>
               <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box size={20} color="white" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1E293B' }}>CityCare Pharmacy</span>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Pharmacy Store</span>
              </div>
              <ChevronDown size={16} color="#64748B" />
              
              {isPharmacyDropdownOpen && (
                <div className="animate-fade-in" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', width: '220px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 50, overflow: 'hidden' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#64748B', textTransform: 'uppercase' }}>Switch Branch</span>
                  </div>
                  <div style={{ padding: '0.5rem' }}>
                    <button style={{ width: '100%', textAlign: 'left', background: '#F0F5FF', border: 'none', padding: '0.75rem', fontSize: '0.9rem', cursor: 'pointer', borderRadius: '8px', color: '#2563EB', fontWeight: 500 }}>CityCare Pharmacy</button>
                    <button style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '0.75rem', fontSize: '0.9rem', cursor: 'pointer', borderRadius: '8px' }}>Sanjeevani Branch</button>
                  </div>
                </div>
              )}
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '1rem', borderLeft: '1px solid #E2E8F0', cursor: 'pointer' }} onClick={() => { setIsProfileDropdownOpen(!isProfileDropdownOpen); setIsNotificationsOpen(false); setIsPharmacyDropdownOpen(false); }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#DBEAFE', color: '#1E3A8A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.9rem' }}>
                RP
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1E293B' }}>Rohit Patel</span>
                <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Pharmacist</span>
              </div>
              <ChevronDown size={16} color="#64748B" />

              {isProfileDropdownOpen && (
                <div className="animate-fade-in" style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', width: '220px', background: 'white', border: '1px solid #E2E8F0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 50, overflow: 'hidden' }}>
                  <div style={{ padding: '1rem', borderBottom: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 600 }}>Rohit Patel</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>medical@health.ai</span>
                  </div>
                  <div style={{ padding: '0.5rem' }}>
                    <button onClick={() => { setActiveTab('settings'); setIsProfileDropdownOpen(false); }} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '0.75rem', fontSize: '0.9rem', cursor: 'pointer', borderRadius: '8px' }}>Store Settings</button>
                  </div>
                  <div style={{ padding: '0.5rem', borderTop: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.75rem', color: '#94A3B8', padding: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Switch Role (Demo)</div>
                    <button onClick={() => navigate('/patient')} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '0.75rem', fontSize: '0.9rem', cursor: 'pointer', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Activity size={16} color="#2563EB" /> Patient Portal
                    </button>
                    <button onClick={() => navigate('/hospital')} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '0.75rem', fontSize: '0.9rem', cursor: 'pointer', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Activity size={16} color="#10B981" /> Hospital Portal
                    </button>
                  </div>
                  <div style={{ padding: '0.5rem', borderTop: '1px solid #E2E8F0' }}>
                    <button onClick={() => navigate('/')} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '0.75rem', fontSize: '0.9rem', cursor: 'pointer', color: '#EF4444', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <LogOut size={16} /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="main-content-area" style={{ overflowY: 'auto', background: '#F8FAFC', padding: '1.5rem' }}>
          {activeTab === 'dashboard' && <Dashboard navigateTo={setActiveTab} />}
          {activeTab === 'inventory' && <Inventory />}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'patients' && <Patients />}
          {activeTab === 'suppliers' && <Suppliers />}
          {activeTab === 'reports' && <Reports />}
          {activeTab === 'payments' && <Payments />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}
