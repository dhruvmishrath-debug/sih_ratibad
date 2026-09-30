
import { Activity, User, ClipboardList, Pill, Calendar, FileText, Files, Bell, Bot, AlertTriangle, Search, ChevronRight, HeartPulse, Droplet, Phone, Mail, FilePlus2, FlaskConical, Receipt, MapPin } from 'lucide-react';
import { Card, CardH, CardB, Badge } from '../pharmacy/Shared';

export default function Dashboard({ setIsUploadModalOpen }: any) {
  return (
    <div className="animate-fade-in" style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Row: Hero & Quick Actions */}
      <div className="split-grid-2-1">
        <div style={{ backgroundColor: '#F0F5FF', borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
          {/* Heart Graphic bg */}
          <div style={{ position: 'absolute', right: '5%', top: '10%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '120px', height: '120px', background: '#DBEAFE', borderRadius: '50%', position: 'absolute' }} />
            <HeartPulse size={64} color="#60A5FA" style={{ position: 'relative', zIndex: 1 }} />
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={32} color="white" />
              </div>
              <div>
                <h1 style={{ fontSize: '1.75rem', color: '#1E293B', margin: '0 0 0.25rem' }}>Good morning,<br />Arjun Sharma 👋</h1>
                <p style={{ color: '#475569', margin: 0, fontSize: '0.95rem' }}>Take care of your health — it's your greatest wealth.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 500 }}><Calendar size={16} color="#2563EB" /> Age: 34 years</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 500 }}><User size={16} color="#2563EB" /> Male</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 500 }}><Droplet size={16} color="#2563EB" /> Blood Group: O+</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 500 }}><Phone size={16} color="#2563EB" /> +91 98765 43210</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem', fontWeight: 500 }}><Mail size={16} color="#2563EB" /> arjun.sharma@example.com</div>
            </div>
          </div>
        </div>

        <Card>
          <CardH style={{ padding: '1rem 1.5rem' }}><h3 style={{ margin: 0, fontSize: '1rem' }}>Quick Actions</h3></CardH>
          <CardB className="quick-actions-grid">
            {[
              { icon: <Calendar size={24} color="#2563EB" />, l: 'Book Appointment' },
              { icon: <Files size={24} color="#2563EB" />, l: 'Upload Document' },
              { icon: <FileText size={24} color="#2563EB" />, l: 'View Reports' },
              { icon: <Bell size={24} color="#2563EB" />, l: 'Medicine Reminder' },
            ].map((a, i) => (
              <div key={i} onClick={() => { if (a.l === 'Upload Document') setIsUploadModalOpen(true); }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F0F5FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{a.icon}</div>
                <span style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 500 }}>{a.l}</span>
              </div>
            ))}
          </CardB>
        </Card>
      </div>

      {/* Second Row: 4 Stats */}
      <div className="stats-grid-4">
        <Card style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F0F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Activity size={24} color="#2563EB" /></div>
          <div><div style={{ color: '#1E293B', fontSize: '0.9rem', fontWeight: 500 }}>Total Visits</div><div style={{ fontSize: '1.5rem', fontWeight: 700 }}>8</div><div style={{ color: '#64748B', fontSize: '0.75rem' }}>This year</div></div>
        </Card>
        <Card style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Pill size={24} color="#10B981" /></div>
          <div><div style={{ color: '#1E293B', fontSize: '0.9rem', fontWeight: 500 }}>Active Prescriptions</div><div style={{ fontSize: '1.5rem', fontWeight: 700 }}>3</div><div style={{ color: '#64748B', fontSize: '0.75rem' }}>Ongoing</div></div>
        </Card>
        <Card style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Calendar size={24} color="#8B5CF6" /></div>
          <div><div style={{ color: '#1E293B', fontSize: '0.9rem', fontWeight: 500 }}>Upcoming Appointments</div><div style={{ fontSize: '1.5rem', fontWeight: 700 }}>1</div><div style={{ color: '#64748B', fontSize: '0.75rem' }}>Next 7 days</div></div>
        </Card>
        <Card style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AlertTriangle size={24} color="#EF4444" /></div>
          <div><div style={{ color: '#1E293B', fontSize: '0.9rem', fontWeight: 500 }}>Health Alerts</div><div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#EF4444' }}>2</div><div style={{ color: '#EF4444', fontSize: '0.75rem', fontWeight: 500 }}>Needs attention</div></div>
        </Card>
      </div>

      {/* Third Row: 3 Columns */}
      <div className="stats-grid-3">
        {/* Recent Health Summary */}
        <Card>
          <CardH><h3 style={{ margin: 0, fontSize: '1.05rem' }}>Recent Health Summary</h3><span style={{ color: '#2563EB', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>View All</span></CardH>
          <CardB style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { i: <Activity size={18} color="#2563EB" />, b: '#F0F5FF', t: 'Hospital Visit', st: 'CityCare Hospital', d: 'May 12, 2026', s: 'Completed', c: 'green' },
              { i: <FilePlus2 size={18} color="#8B5CF6" />, b: '#F5F3FF', t: 'Prescription', st: 'Amoxicillin 500mg, 1-0-1 for 5 days', d: 'May 10, 2026', s: 'Active', c: 'green' },
              { i: <FlaskConical size={18} color="#2563EB" />, b: '#F0F5FF', t: 'Lab Report', st: 'Blood Test (CBC)', d: 'May 08, 2026', s: 'Available', c: 'blue' },
              { i: <Pill size={18} color="#10B981" />, b: '#ECFDF5', t: 'Medicine', st: 'Paracetamol 500mg', d: 'May 05, 2026', s: 'Active', c: 'green' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: item.b, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.i}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.t}</div>
                  <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '0.15rem' }}>{item.st}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                  <div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>{item.d}</div>
                  <Badge color={item.c}>{item.s}</Badge>
                </div>
              </div>
            ))}
          </CardB>
        </Card>

        {/* Current Medicines */}
        <Card>
          <CardH>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={18} color="#2563EB" /><h3 style={{ margin: 0, fontSize: '1.05rem' }}>Current Medicines</h3></div>
            <span style={{ color: '#2563EB', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>View All</span>
          </CardH>
          <CardB style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { n: 'Paracetamol 500mg', d: '1 tablet • Once daily', t: '08:00 AM' },
              { n: 'Amoxicillin 500mg', d: '1 tablet • Twice daily', t: '08:00 AM & 08:00 PM' },
              { n: 'Vitamin D3 60K', d: '1 tablet • Weekly', t: 'Sun • 10:00 AM' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F0F5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Pill size={16} color="#2563EB" /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.n}</div>
                  <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '0.15rem' }}>{item.d}</div>
                  <div style={{ color: '#2563EB', fontSize: '0.75rem', fontWeight: 500, marginTop: '0.25rem' }}>{item.t}</div>
                </div>
                <span style={{ color: '#16A34A', fontSize: '0.75rem', fontWeight: 600 }}>Active</span>
              </div>
            ))}
          </CardB>
        </Card>

        {/* Health Alerts */}
        <Card>
          <CardH>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertTriangle size={18} color="#EF4444" /><h3 style={{ margin: 0, fontSize: '1.05rem' }}>Health Alerts</h3></div>
            <span style={{ color: '#2563EB', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>View All</span>
          </CardH>
          <CardB style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FEF2F2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><AlertTriangle size={16} color="#EF4444" /></div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#EF4444' }}>Medicine Expiry Alert</div>
                <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '0.15rem' }}>Amoxicillin 500mg expires in 5 days</div>
                <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginTop: '0.25rem' }}>May 20, 2026</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Calendar size={16} color="#8B5CF6" /></div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#8B5CF6' }}>Follow-up Required</div>
                <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '0.15rem' }}>Cardiology consultation due</div>
                <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginTop: '0.25rem' }}>May 28, 2026</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#F0F5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><FlaskConical size={16} color="#2563EB" /></div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Lab Report Ready</div>
                <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '0.15rem' }}>Blood test report is available</div>
                <div style={{ color: '#94A3B8', fontSize: '0.75rem', marginTop: '0.25rem' }}>May 08, 2026</div>
              </div>
            </div>
          </CardB>
        </Card>
      </div>

      {/* Fourth Row: 3 Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        {/* Upcoming Appointments */}
        <Card>
          <CardH>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} color="#2563EB" /><h3 style={{ margin: 0, fontSize: '1.05rem' }}>Upcoming Appointments</h3></div>
            <span style={{ color: '#2563EB', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>View All</span>
          </CardH>
          <CardB>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', background: '#F8FAFC', padding: '0.75rem 1.25rem', borderRadius: '12px' }}>
                <div style={{ color: '#2563EB', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>May</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', lineHeight: 1 }}>20</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Dr. Neha Kapoor</div>
                  <Badge color="blue">Confirmed</Badge>
                </div>
                <div style={{ color: '#475569', fontSize: '0.85rem' }}>Cardiologist</div>
                <div style={{ color: '#64748B', fontSize: '0.8rem', marginTop: '0.25rem' }}>CityCare Hospital • 10:00 AM</div>
              </div>
            </div>
          </CardB>
        </Card>

        {/* Healthcare Spending */}
        <Card>
          <CardH>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={18} color="#10B981" /><h3 style={{ margin: 0, fontSize: '1.05rem' }}>Healthcare Spending</h3></div>
            <span style={{ color: '#2563EB', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>View All</span>
          </CardH>
          <CardB style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'conic-gradient(#3B82F6 0% 45%, #8B5CF6 45% 70%, #F59E0B 70% 85%, #10B981 85% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>₹ 18,450</span>
                <span style={{ fontSize: '0.6rem', color: '#64748B' }}>Total spent</span>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} /> Hospital</span> <span style={{ fontWeight: 600 }}>₹ 8,200</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8B5CF6' }} /> Medicines</span> <span style={{ fontWeight: 600 }}>₹ 4,850</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} /> Laboratory</span> <span style={{ fontWeight: 600 }}>₹ 2,300</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} /> Treatment</span> <span style={{ fontWeight: 600 }}>₹ 3,100</span></div>
            </div>
          </CardB>
        </Card>

        {/* Recent Hospital Visits */}
        <Card>
          <CardH>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={18} color="#2563EB" /><h3 style={{ margin: 0, fontSize: '1.05rem' }}>Recent Hospital Visits</h3></div>
            <span style={{ color: '#2563EB', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>View All</span>
          </CardH>
          <CardB style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { n: 'CityCare Hospital', d: 'General Checkup', date: 'May 12, 2026', loc: 'Bhopal' },
              { n: 'Sanjeevani Hospital', d: 'Fever & Cold', date: 'Apr 28, 2026', loc: 'Bhopal' },
              { n: 'Apollo Hospital', d: 'Dental Checkup', date: 'Apr 15, 2026', loc: 'Bhopal' },
            ].map((h, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F0F5FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Activity size={14} color="#2563EB" /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{h.n}</div>
                  <div style={{ color: '#64748B', fontSize: '0.75rem' }}>{h.d} • {h.date}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#64748B', fontSize: '0.75rem' }}><MapPin size={12} /> {h.loc}</div>
              </div>
            ))}
          </CardB>
        </Card>
      </div>

      {/* Fifth Row: Medical Timeline */}
      <Card>
        <CardH>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity size={18} color="#2563EB" /><h3 style={{ margin: 0, fontSize: '1.05rem' }}>Medical Timeline</h3></div>
          <span style={{ color: '#2563EB', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>View All</span>
        </CardH>
        <CardB>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1rem' }}>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Activity size={18} color="#10B981" /></div>
              <div><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Visit</div><div style={{ fontSize: '0.75rem', color: '#64748B' }}>May 12, 2026<br />CityCare Hospital</div></div>
            </div>

            <div style={{ flex: 1, height: '2px', background: '#E2E8F0', margin: '0 1rem', position: 'relative', top: '-10px' }}><div style={{ position: 'absolute', right: '-4px', top: '-3px', width: '8px', height: '8px', borderRadius: '50%', background: '#CBD5E1' }} /></div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FilePlus2 size={18} color="#8B5CF6" /></div>
              <div><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Prescription</div><div style={{ fontSize: '0.75rem', color: '#64748B' }}>May 10, 2026<br />Amoxicillin 500mg</div></div>
            </div>

            <div style={{ flex: 1, height: '2px', background: '#E2E8F0', margin: '0 1rem', position: 'relative', top: '-10px' }}><div style={{ position: 'absolute', right: '-4px', top: '-3px', width: '8px', height: '8px', borderRadius: '50%', background: '#CBD5E1' }} /></div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F0F5FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FlaskConical size={18} color="#2563EB" /></div>
              <div><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Lab Report</div><div style={{ fontSize: '0.75rem', color: '#64748B' }}>May 08, 2026<br />Blood Test (CBC)</div></div>
            </div>

            <div style={{ flex: 1, height: '2px', background: '#E2E8F0', margin: '0 1rem', position: 'relative', top: '-10px' }}><div style={{ position: 'absolute', right: '-4px', top: '-3px', width: '8px', height: '8px', borderRadius: '50%', background: '#CBD5E1' }} /></div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Pill size={18} color="#10B981" /></div>
              <div><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Medicine</div><div style={{ fontSize: '0.75rem', color: '#64748B' }}>May 05, 2026<br />Paracetamol 500mg</div></div>
            </div>

          </div>
        </CardB>
      </Card>

      {/* Sixth Row: 8 Quick Access Cards (2 rows of 4) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', paddingBottom: '2rem' }}>
        {[
          { i: <ClipboardList size={24} color="#10B981" />, bg: '#ECFDF5', t: 'Complete Health History', d: 'View your full medical history, visits, treatments and more.' },
          { i: <Pill size={24} color="#8B5CF6" />, bg: '#F5F3FF', t: 'Medicine History', d: 'View all medicines, dosage, quantity and expiry dates.' },
          { i: <Calendar size={24} color="#2563EB" />, bg: '#F0F5FF', t: 'Appointment Management', d: 'Book and manage appointments with your preferred doctors.' },
          { i: <Receipt size={24} color="#F59E0B" />, bg: '#FEF3C7', t: 'Receipts & Prescriptions', d: 'Access all receipts and prescriptions in one place.' },
          { i: <Search size={24} color="#06B6D4" />, bg: '#CFFAFE', t: 'Personal Health QR', d: 'Your digital health record in a secure QR code.' },
          { i: <AlertTriangle size={24} color="#EF4444" />, bg: '#FEF2F2', t: 'Emergency Management', d: 'Quick access to emergency services and SOS.' },
          { i: <Files size={24} color="#D946EF" />, bg: '#FDF4FF', t: 'Personal Medical Documents', d: 'Upload and manage your medical documents.' },
          { i: <Bot size={24} color="#3B82F6" />, bg: '#DBEAFE', t: 'AI Medicine Assistant', d: 'Get smart reminders and voice assistance.' }
        ].map((c, i) => (
          <Card key={i} style={{ padding: '1.25rem', display: 'flex', gap: '1rem', cursor: 'pointer', transition: 'box-shadow 0.2s', border: '1px solid #E2E8F0' }} >
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{c.i}</div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem', color: '#1E293B', lineHeight: 1.3 }}>{c.t}</div>
                <div style={{ color: '#64748B', fontSize: '0.75rem', lineHeight: 1.4 }}>{c.d}</div>
              </div>
              <ChevronRight size={16} color="#94A3B8" style={{ alignSelf: 'flex-end', marginTop: '0.5rem' }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
