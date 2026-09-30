import { useState } from 'react';
import { User, Bell, Shield, Lock, Save } from 'lucide-react';
import { Card, CardH, CardB, Input } from './Shared';

const getProfile = () => {
  const data = localStorage.getItem('pharmacyProfile');
  return data ? JSON.parse(data) : {
    name: 'Rohit Patel', email: 'rohit@citycarepharmacy.demo', phone: '+91 9000033333',
    pharmacyName: 'CityCare Pharmacy', address: 'Hoshangabad Road, Bhopal', license: 'PH-MP-2024-1234',
    notifyOrders: true, notifyStock: true, notifyPrescriptions: true
  };
};

export default function PharmacySettings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [profile, setProfile] = useState(getProfile());
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handleSaveProfile = () => {
    localStorage.setItem('pharmacyProfile', JSON.stringify(profile));
    alert('Profile updated successfully');
  };

  const handleChangePassword = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      alert('Please fill in all password fields');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      alert('New password and confirm password do not match');
      return;
    }
    if (passwords.new.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    alert('Password changed successfully (demo)');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'pharmacy', label: 'Pharmacy Info', icon: <Shield size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security', icon: <Lock size={18} /> },
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ margin: 0, color: '#1E293B', fontSize: '1.5rem' }}>Settings</h2>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {/* Sidebar */}
        <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px',
              border: 'none', background: activeSection === s.id ? '#EFF6FF' : 'transparent',
              color: activeSection === s.id ? '#1D4ED8' : '#64748B', fontWeight: 500, cursor: 'pointer', textAlign: 'left'
            }}>
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          {activeSection === 'profile' && (
            <Card>
              <CardH><h3 style={{ margin: 0 }}>Personal Profile</h3></CardH>
              <CardB>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Full Name</label><Input value={profile.name} onChange={(e: any) => setProfile({...profile, name: e.target.value})} /></div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Email</label><Input value={profile.email} onChange={(e: any) => setProfile({...profile, email: e.target.value})} /></div>
                    <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Phone</label><Input value={profile.phone} onChange={(e: any) => setProfile({...profile, phone: e.target.value})} /></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={handleSaveProfile} style={{ background: '#3B82F6', color: 'white', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 500 }}><Save size={16} /> Save Changes</button>
                  </div>
                </div>
              </CardB>
            </Card>
          )}

          {activeSection === 'pharmacy' && (
            <Card>
              <CardH><h3 style={{ margin: 0 }}>Pharmacy Information</h3></CardH>
              <CardB>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Pharmacy Name</label><Input value={profile.pharmacyName} onChange={(e: any) => setProfile({...profile, pharmacyName: e.target.value})} /></div>
                  <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Address</label><Input value={profile.address} onChange={(e: any) => setProfile({...profile, address: e.target.value})} /></div>
                  <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>License Number</label><Input value={profile.license} onChange={(e: any) => setProfile({...profile, license: e.target.value})} /></div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={handleSaveProfile} style={{ background: '#3B82F6', color: 'white', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontWeight: 500 }}><Save size={16} /> Save Changes</button>
                  </div>
                </div>
              </CardB>
            </Card>
          )}

          {activeSection === 'notifications' && (
            <Card>
              <CardH><h3 style={{ margin: 0 }}>Notification Preferences</h3></CardH>
              <CardB>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {[
                    { key: 'notifyOrders', label: 'Order Notifications', desc: 'Get notified about new and updated orders' },
                    { key: 'notifyStock', label: 'Low Stock Alerts', desc: 'Get alerts when medicine stock is running low' },
                    { key: 'notifyPrescriptions', label: 'Prescription Updates', desc: 'Get notified about new prescriptions' }
                  ].map(item => (
                    <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#F8FAFC', borderRadius: '8px' }}>
                      <div>
                        <div style={{ fontWeight: 500, marginBottom: '0.25rem' }}>{item.label}</div>
                        <div style={{ fontSize: '0.85rem', color: '#64748B' }}>{item.desc}</div>
                      </div>
                      <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                        <input type="checkbox" checked={profile[item.key]} onChange={() => { const updated = {...profile, [item.key]: !profile[item.key]}; setProfile(updated); localStorage.setItem('pharmacyProfile', JSON.stringify(updated)); }} style={{ opacity: 0, width: 0, height: 0 }} />
                        <span style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: profile[item.key] ? '#3B82F6' : '#CBD5E1', borderRadius: '99px', transition: '0.3s' }}>
                          <span style={{ position: 'absolute', content: '""', height: '18px', width: '18px', left: profile[item.key] ? '22px' : '3px', bottom: '3px', backgroundColor: 'white', borderRadius: '50%', transition: '0.3s' }} />
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </CardB>
            </Card>
          )}

          {activeSection === 'security' && (
            <Card>
              <CardH><h3 style={{ margin: 0 }}>Change Password</h3></CardH>
              <CardB>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                  <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Current Password</label><Input type="password" value={passwords.current} onChange={(e: any) => setPasswords({...passwords, current: e.target.value})} /></div>
                  <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>New Password</label><Input type="password" value={passwords.new} onChange={(e: any) => setPasswords({...passwords, new: e.target.value})} /></div>
                  <div><label style={{ fontSize: '0.85rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Confirm New Password</label><Input type="password" value={passwords.confirm} onChange={(e: any) => setPasswords({...passwords, confirm: e.target.value})} /></div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={handleChangePassword} style={{ background: '#3B82F6', color: 'white', border: 'none', padding: '0.6rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}>Change Password</button>
                  </div>
                </div>
              </CardB>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
