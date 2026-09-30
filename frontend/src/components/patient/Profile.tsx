import { useState, useEffect } from 'react';
import { Card, CardH, CardB, Input } from '../pharmacy/Shared';

export default function PatientProfile() {
  const [profile, setProfile] = useState<any>(null);
  
  useEffect(() => {
    // We mock the logged in patient (e.g. Arjun Sharma)
    setProfile({
      name: 'Arjun Sharma', age: 34, gender: 'Male', bloodGroup: 'O+', phone: '+91 98765 43210', email: 'arjun.sharma@example.com', abhaId: '91-1234-5678-9012', address: 'Bhopal, MP', insurance: 'Star Health (Policy: SH12345)'
    });
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h2 style={{ margin: 0, color: '#1E293B', fontSize: '1.5rem' }}>My Profile</h2>
      <Card>
        <CardH><h3 style={{ margin: 0 }}>Personal Information</h3></CardH>
        <CardB>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div><label style={{ color: '#64748B', fontSize: '0.85rem' }}>Full Name</label><Input value={profile.name} readOnly /></div>
            <div><label style={{ color: '#64748B', fontSize: '0.85rem' }}>ABHA ID</label><Input value={profile.abhaId} readOnly /></div>
            <div><label style={{ color: '#64748B', fontSize: '0.85rem' }}>Age</label><Input value={profile.age} readOnly /></div>
            <div><label style={{ color: '#64748B', fontSize: '0.85rem' }}>Gender</label><Input value={profile.gender} readOnly /></div>
            <div><label style={{ color: '#64748B', fontSize: '0.85rem' }}>Blood Group</label><Input value={profile.bloodGroup} readOnly /></div>
          </div>
        </CardB>
      </Card>
      <Card>
        <CardH><h3 style={{ margin: 0 }}>Contact Details</h3></CardH>
        <CardB>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div><label style={{ color: '#64748B', fontSize: '0.85rem' }}>Phone</label><Input value={profile.phone} readOnly /></div>
            <div><label style={{ color: '#64748B', fontSize: '0.85rem' }}>Email</label><Input value={profile.email} readOnly /></div>
            <div style={{ gridColumn: 'span 2' }}><label style={{ color: '#64748B', fontSize: '0.85rem' }}>Address</label><Input value={profile.address} readOnly /></div>
          </div>
        </CardB>
      </Card>
      <Card>
        <CardH><h3 style={{ margin: 0 }}>Insurance Information</h3></CardH>
        <CardB>
          <div><label style={{ color: '#64748B', fontSize: '0.85rem' }}>Provider & Policy</label><Input value={profile.insurance} readOnly /></div>
        </CardB>
      </Card>
    </div>
  );
}
