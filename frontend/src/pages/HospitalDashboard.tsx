import { useState } from 'react';
import {
  Activity, Users, User, FileText, Stethoscope, FlaskConical,
  Calendar, AlertTriangle, Search, Clock, PlusCircle, Bell,
  ClipboardList, Settings, ShieldCheck, Bot, Eye,
  Check, X, ChevronRight, Download, Printer, QrCode,
  LogOut, Edit, Trash2, Phone, Filter,
  AlertCircle, Send, Home, Mail,
  Droplet, ChevronDown, Pill, Sparkles, ActivitySquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ─── Sidebar Nav Items ───────────────────────────────────────────
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Activity size={20} /> },
  { id: 'patients', label: 'Patients', icon: <Users size={20} /> },
  { id: 'appointments', label: 'Appointments', icon: <Calendar size={20} /> },
  { id: 'prescriptions', label: 'Prescriptions', icon: <Stethoscope size={20} /> },
  { id: 'lab', label: 'Lab Reports', icon: <FlaskConical size={20} /> },
  { id: 'treatment', label: 'Treatment Plans', icon: <ClipboardList size={20} /> },
  { id: 'review_queue', label: 'Review Queue', icon: <FileText size={20} /> },
  { id: 'ai_support', label: 'AI Diagnosis Support', icon: <Bot size={20} /> },
  { id: 'audit', label: 'Audit / History', icon: <ShieldCheck size={20} /> },
  { id: 'admin', label: 'Admin', icon: <Settings size={20} /> }
];

// ─── Shared Card Wrapper ─────────────────────────────────────────
const Card = ({ children, style = {} }: any) => (
  <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', ...style }}>{children}</div>
);
const CardH = ({ children, style = {} }: any) => (
  <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...style }}>{children}</div>
);
const CardB = ({ children, style = {} }: any) => (
  <div style={{ padding: '1.5rem', ...style }}>{children}</div>
);
const Badge = ({ children, color = 'blue' }: any) => {
  const map: any = { blue: ['#DBEAFE', '#1E40AF'], green: ['#DCFCE7', '#16A34A'], yellow: ['#FEF3C7', '#D97706'], red: ['#FEE2E2', '#DC2626'], purple: ['#F3E8FF', '#7C3AED'], gray: ['#F1F5F9', '#64748B'] };
  const [bg, fg] = map[color] || map.blue;
  return <span style={{ backgroundColor: bg, color: fg, padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{children}</span>;
};
const Btn = ({ children, variant = 'primary', onClick, style = {} }: any) => {
  const styles: any = {
    primary: { background: '#2563EB', color: 'white', border: 'none' },
    outline: { background: 'white', color: '#475569', border: '1px solid #E2E8F0' },
    danger: { background: '#FEE2E2', color: '#DC2626', border: 'none' },
    success: { background: '#DCFCE7', color: '#16A34A', border: 'none' },
  };
  return <button onClick={onClick} style={{ padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 500, cursor: 'pointer', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', ...styles[variant], ...style }}>{children}</button>;
};
const Input = ({ ...props }: any) => (
  <input {...props} style={{ width: '100%', padding: '0.6rem 0.75rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', ...props.style }} />
);

const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="animate-fade-in" style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}><X size={20} /></button>
        </div>
        <div style={{ padding: '1.5rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ──────────────────────────────────────────────
export default function HospitalDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview onNavigate={setActiveTab} />;
      case 'patients': return <PatientsSection />;
      case 'appointments': return <AppointmentsSection />;
      case 'prescriptions': return <PrescriptionsSection />;
      case 'lab': return <LabSection />;
      case 'treatment': return <TreatmentSection />;
      case 'review_queue': return <ReviewQueueSection />;
      case 'ai_support': return <AIDiagnosisSection />;
      case 'audit': return <AuditSection />;
      case 'admin': return <AdminSection />;
      default: return <DashboardOverview onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ padding: '1.5rem 1.5rem 1rem 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: '#2563EB', borderRadius: '8px', padding: '0.5rem' }}><Activity color="white" size={20} /></div>
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E293B' }}>CareChain</span>
          </div>
        </div>
        <nav style={{ padding: '0.5rem 1rem', flex: 1, overflowY: 'auto' }}>
          <ul className="sidebar-nav-list">
            {navItems.map(item => (
              <li key={item.id}>
                <button className="sidebar-nav-btn" onClick={() => setActiveTab(item.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '99px', border: 'none', backgroundColor: activeTab === item.id ? '#2563EB' : 'transparent', color: activeTab === item.id ? 'white' : '#64748B', fontWeight: 500, textAlign: 'left', transition: 'all 0.2s', fontSize: '0.95rem', cursor: 'pointer' }}>
                  {item.icon}{item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div style={{ padding: '1rem', borderTop: '1px solid #E2E8F0' }}>
          <button onClick={() => navigate('/')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0', background: 'white', color: '#64748B', fontWeight: 500, cursor: 'pointer' }}>
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content-area">
        <div key={activeTab} className="animate-fade-in" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 1. DASHBOARD
// ═══════════════════════════════════════════════════════════════════
function DashboardOverview({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Hero */}
      <div className="split-grid-2-1">
        <div style={{ backgroundColor: '#F0F4FF', borderRadius: '16px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: '5%', top: '10%', width: '180px', height: '180px', background: '#D9E2FF', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', zIndex: 0 }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ fontSize: '2.25rem', color: '#1E293B', marginBottom: '0.25rem' }}>Good morning,<br /><span style={{ color: '#2563EB' }}>Dr. Rajesh Mehta! 👋</span></h1>
            <p style={{ color: '#475569', marginBottom: '2rem', maxWidth: '400px' }}>Here's what's happening in your practice today. Stay aware, stay ahead.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Clock color="#2563EB" size={20} />
                <div><div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>09:30 AM</div><div style={{ color: '#64748B', fontSize: '0.8rem' }}>May 20, 2026, Tuesday</div></div>
              </div>
              <div style={{ width: '1px', background: '#CBD5E1' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Activity color="#2563EB" size={20} />
                <div><div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Cardiology Department</div><div style={{ color: '#64748B', fontSize: '0.8rem' }}>CityCare Multi-Speciality Hospital</div></div>
              </div>
            </div>
          </div>
        </div>
        <Card>
          <CardB>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bot color="#2563EB" size={24} /><h3 style={{ margin: 0, color: '#2563EB', fontSize: '1.15rem' }}>AI Clinical Assistant</h3></div>
              <Badge color="blue">BETA</Badge>
            </div>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Your AI assistant for smarter clinical decisions and summaries.</p>
            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '12px', padding: '1rem', marginTop: '1rem' }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>AI Patient Summary Generator</h4>
              <p style={{ color: '#64748B', fontSize: '0.8rem', marginBottom: '1rem' }}>Generate concise patient summaries with AI.</p>
              <Btn style={{ width: '100%' }}>Generate Summary</Btn>
            </div>
          </CardB>
        </Card>
      </div>
      {/* Stats */}
      <div className="stats-grid-5">
        <StatCard icon={<Users size={20} color="#2563EB" />} title="Total Patients (Dataset)" value="1,000" change="From hospital data analysis" color="green" />
        <StatCard icon={<FileText size={20} color="#EA580C" />} title="Conditions Tracked" value="15" change="Across all departments" color="green" />
        <StatCard icon={<FlaskConical size={20} color="#7C3AED" />} title="Recovery Rate" value="67%" change="670 of 1000 patients" color="green" />
        <StatCard icon={<Users size={20} color="#16A34A" />} title="Readmission Rate" value="33%" change="330 readmissions" color="yellow" />
        <StatCard icon={<AlertTriangle size={20} color="#DC2626" />} title="Avg Satisfaction" value="3.5" change="Out of 5.0 rating" color="green" />
      </div>
      {/* Bottom 3-column */}
      <div className="split-grid-1-2-1">
        <Card><CardH><h3 style={{ margin: 0, fontSize: '1.1rem' }}>Today's Appointments</h3><span onClick={() => onNavigate('appointments')} style={{ color: '#2563EB', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>View all</span></CardH><CardB>
          {[{ t: '09:30 AM', n: 'Arjun Sharma', tp: 'Follow-up', s: 'Confirmed' }, { t: '10:15 AM', n: 'Neha Kapoor', tp: 'Consultation', s: 'Confirmed' }, { t: '11:00 AM', n: 'Vikram Singh', tp: 'ECG Review', s: 'Pending' }, { t: '12:00 PM', n: 'Pooja Verma', tp: 'Consultation', s: 'Confirmed' }, { t: '02:00 PM', n: 'Rakesh Patel', tp: 'Follow-up', s: 'Pending' }].map((a, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9', paddingBottom: '0.75rem', marginBottom: i < 4 ? '0.75rem' : 0 }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}><div style={{ color: '#64748B', fontSize: '0.85rem', width: '60px' }}>{a.t}</div><div><div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.95rem' }}>{a.n}</div><div style={{ color: '#64748B', fontSize: '0.8rem' }}>{a.tp}</div></div></div>
              <Badge color={a.s === 'Confirmed' ? 'green' : 'yellow'}>{a.s}</Badge>
            </div>
          ))}
        </CardB></Card>
        <Card><CardH><h3 style={{ margin: 0, fontSize: '1.1rem' }}>Quick Links</h3></CardH><CardB>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', rowGap: '2rem' }}>
            {[{ icon: <Users size={24} color="#3B82F6" />, l: 'Patient Records', bg: '#DBEAFE', nav: 'patients' }, { icon: <Calendar size={24} color="#3B82F6" />, l: 'Appointments', bg: '#DBEAFE', nav: 'appointments' }, { icon: <FileText size={24} color="#3B82F6" />, l: 'Prescriptions', bg: '#DBEAFE', nav: 'prescriptions' }, { icon: <FlaskConical size={24} color="#A855F7" />, l: 'Lab Reports', bg: '#F3E8FF', nav: 'lab' }, { icon: <ClipboardList size={24} color="#A855F7" />, l: 'Treatment Plans', bg: '#F3E8FF', nav: 'treatment' }, { icon: <Clock size={24} color="#A855F7" />, l: 'Audit History', bg: '#F3E8FF', nav: 'audit' }].map((q, i) => (
              <div key={i} onClick={() => onNavigate(q.nav)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: q.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{q.icon}</div>
                <span style={{ fontSize: '0.8rem', color: '#475569', textAlign: 'center', fontWeight: 500 }}>{q.l}</span>
              </div>
            ))}
          </div>
        </CardB></Card>
        <Card><CardH><h3 style={{ margin: 0, fontSize: '1.1rem' }}>Notifications</h3><span style={{ color: '#2563EB', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>View all</span></CardH><CardB>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[{ icon: <FlaskConical size={18} color="#2563EB" />, bg: '#DBEAFE', t: 'Lab report for Arjun Sharma is ready.', tm: '10 mins ago' }, { icon: <Calendar size={18} color="#16A34A" />, bg: '#DCFCE7', t: 'New appointment request from Priya Nair.', tm: '25 mins ago' }, { icon: <FileText size={18} color="#DC2626" />, bg: '#FEE2E2', t: 'Prescription alert: 18 pending prescriptions.', tm: '45 mins ago' }].map((n, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ padding: '0.5rem', borderRadius: '50%', background: n.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n.icon}</div>
                <div><div style={{ fontWeight: 500, color: '#1E293B', fontSize: '0.9rem', lineHeight: 1.3, marginBottom: '0.25rem' }}>{n.t}</div><div style={{ color: '#94A3B8', fontSize: '0.75rem' }}>{n.tm}</div></div>
              </div>
            ))}
          </div>
        </CardB></Card>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, change, color }: any) {
  const c = color === 'green' ? '#16A34A' : color === 'red' ? '#DC2626' : '#64748B';
  return (
    <Card><CardB>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}><div style={{ padding: '0.4rem', borderRadius: '8px', background: '#F8FAFC' }}>{icon}</div><span style={{ color: '#64748B', fontSize: '0.85rem', fontWeight: 500 }}>{title}</span></div>
      <div style={{ fontSize: '2rem', fontWeight: 700, color: '#1E293B', lineHeight: '1' }}>{value}</div>
      <div style={{ color: c, fontSize: '0.75rem', fontWeight: 500, marginTop: '0.5rem' }}>{change}</div>
    </CardB></Card>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 2. PATIENTS — Data sourced from hospital data analysis.csv (1000 records)
// ═══════════════════════════════════════════════════════════════════
const patientsData = [
  { id: 'P-0001', name: 'Sunita Devi', age: 45, gender: 'Female', phone: '+91 98765 43210', abha: '91-1001-5678-9012', visits: 5, lastVisit: 'May 12, 2026', doctor: 'Dr. Mehta', diagnosis: 'Heart Disease', procedure: 'Angioplasty', cost: 15000, stay: 5, readmission: false, outcome: 'Recovered', satisfaction: 4, status: 'Active' },
  { id: 'P-0002', name: 'Ramesh Kumar', age: 60, gender: 'Male', phone: '+91 87654 32109', abha: '91-1002-6789-0123', visits: 8, lastVisit: 'May 10, 2026', doctor: 'Dr. Singh', diagnosis: 'Diabetes', procedure: 'Insulin Therapy', cost: 2000, stay: 3, readmission: true, outcome: 'Stable', satisfaction: 3, status: 'Follow-up' },
  { id: 'P-0003', name: 'Priya Sharma', age: 32, gender: 'Female', phone: '+91 76543 21098', abha: '91-1003-7890-1234', visits: 1, lastVisit: 'May 08, 2026', doctor: 'Dr. Patel', diagnosis: 'Fractured Arm', procedure: 'X-Ray and Splint', cost: 500, stay: 1, readmission: false, outcome: 'Recovered', satisfaction: 5, status: 'Discharged' },
  { id: 'P-0004', name: 'Mohan Lal', age: 75, gender: 'Male', phone: '+91 65432 10987', abha: '91-1004-8901-2345', visits: 12, lastVisit: 'May 06, 2026', doctor: 'Dr. Mehta', diagnosis: 'Stroke', procedure: 'CT Scan and Medication', cost: 10000, stay: 7, readmission: true, outcome: 'Stable', satisfaction: 2, status: 'Active' },
  { id: 'P-0005', name: 'Kavita Joshi', age: 50, gender: 'Female', phone: '+91 54321 09876', abha: '91-1005-9012-3456', visits: 4, lastVisit: 'May 04, 2026', doctor: 'Dr. Gupta', diagnosis: 'Cancer', procedure: 'Surgery and Chemotherapy', cost: 25000, stay: 10, readmission: false, outcome: 'Recovered', satisfaction: 4, status: 'Active' },
  { id: 'P-0006', name: 'Suresh Yadav', age: 68, gender: 'Male', phone: '+91 99887 76655', abha: '91-1006-0123-4567', visits: 6, lastVisit: 'May 02, 2026', doctor: 'Dr. Mehta', diagnosis: 'Hypertension', procedure: 'Medication and Counseling', cost: 1000, stay: 2, readmission: false, outcome: 'Stable', satisfaction: 4, status: 'Active' },
  { id: 'P-0007', name: 'Meena Agarwal', age: 55, gender: 'Female', phone: '+91 88776 65544', abha: '91-1007-1234-5678', visits: 2, lastVisit: 'Apr 28, 2026', doctor: 'Dr. Singh', diagnosis: 'Appendicitis', procedure: 'Appendectomy', cost: 8000, stay: 4, readmission: false, outcome: 'Recovered', satisfaction: 3, status: 'Discharged' },
  { id: 'P-0008', name: 'Rajesh Tiwari', age: 40, gender: 'Male', phone: '+91 77665 54433', abha: '91-1008-2345-6789', visits: 3, lastVisit: 'Apr 25, 2026', doctor: 'Dr. Patel', diagnosis: 'Fractured Leg', procedure: 'Cast and Physical Therapy', cost: 3000, stay: 6, readmission: false, outcome: 'Recovered', satisfaction: 4, status: 'Active' },
  { id: 'P-0009', name: 'Geeta Bai', age: 70, gender: 'Female', phone: '+91 66554 43322', abha: '91-1009-3456-7890', visits: 15, lastVisit: 'Apr 22, 2026', doctor: 'Dr. Mehta', diagnosis: 'Heart Attack', procedure: 'Cardiac Catheterization', cost: 18000, stay: 8, readmission: true, outcome: 'Stable', satisfaction: 2, status: 'Follow-up' },
  { id: 'P-0010', name: 'Amit Verma', age: 25, gender: 'Male', phone: '+91 55443 32211', abha: '91-1010-4567-8901', visits: 1, lastVisit: 'Apr 20, 2026', doctor: 'Dr. Gupta', diagnosis: 'Allergic Reaction', procedure: 'Epinephrine Injection', cost: 100, stay: 1, readmission: false, outcome: 'Recovered', satisfaction: 5, status: 'Discharged' },
  { id: 'P-0011', name: 'Sushma Pandey', age: 48, gender: 'Female', phone: '+91 44332 21100', abha: '91-1011-5678-9012', visits: 3, lastVisit: 'Apr 18, 2026', doctor: 'Dr. Singh', diagnosis: 'Respiratory Infection', procedure: 'Antibiotics and Rest', cost: 800, stay: 2, readmission: false, outcome: 'Stable', satisfaction: 4, status: 'Active' },
  { id: 'P-0012', name: 'Dinesh Gupta', age: 65, gender: 'Male', phone: '+91 33221 10099', abha: '91-1012-6789-0123', visits: 7, lastVisit: 'Apr 15, 2026', doctor: 'Dr. Mehta', diagnosis: 'Prostate Cancer', procedure: 'Radiation Therapy', cost: 20000, stay: 9, readmission: false, outcome: 'Recovered', satisfaction: 3, status: 'Active' },
  { id: 'P-0013', name: 'Anita Singh', age: 30, gender: 'Female', phone: '+91 22110 09988', abha: '91-1013-7890-1234', visits: 1, lastVisit: 'Apr 12, 2026', doctor: 'Dr. Patel', diagnosis: 'Childbirth', procedure: 'Delivery and Postnatal Care', cost: 12000, stay: 3, readmission: false, outcome: 'Recovered', satisfaction: 4, status: 'Discharged' },
  { id: 'P-0014', name: 'Vinod Mishra', age: 52, gender: 'Male', phone: '+91 11009 98877', abha: '91-1014-8901-2345', visits: 4, lastVisit: 'Apr 10, 2026', doctor: 'Dr. Gupta', diagnosis: 'Kidney Stones', procedure: 'Lithotripsy', cost: 6000, stay: 4, readmission: false, outcome: 'Recovered', satisfaction: 3, status: 'Active' },
  { id: 'P-0015', name: 'Lata Chauhan', age: 58, gender: 'Female', phone: '+91 99008 87766', abha: '91-1015-9012-3456', visits: 9, lastVisit: 'Apr 08, 2026', doctor: 'Dr. Singh', diagnosis: 'Osteoarthritis', procedure: 'Physical Therapy and Pain Management', cost: 4000, stay: 5, readmission: false, outcome: 'Stable', satisfaction: 4, status: 'Follow-up' },
  { id: 'P-0016', name: 'Arun Dubey', age: 55, gender: 'Male', phone: '+91 88007 76655', abha: '91-1016-0123-4567', visits: 6, lastVisit: 'Apr 05, 2026', doctor: 'Dr. Mehta', diagnosis: 'Heart Disease', procedure: 'Angioplasty', cost: 15000, stay: 6, readmission: true, outcome: 'Recovered', satisfaction: 3, status: 'Active' },
  { id: 'P-0017', name: 'Rekha Patil', age: 62, gender: 'Female', phone: '+91 77006 65544', abha: '91-1017-1234-5678', visits: 10, lastVisit: 'Apr 02, 2026', doctor: 'Dr. Gupta', diagnosis: 'Diabetes', procedure: 'Insulin Therapy', cost: 2000, stay: 4, readmission: false, outcome: 'Stable', satisfaction: 4, status: 'Active' },
  { id: 'P-0018', name: 'Manoj Thakur', age: 35, gender: 'Male', phone: '+91 66005 54433', abha: '91-1018-2345-6789', visits: 2, lastVisit: 'Mar 28, 2026', doctor: 'Dr. Patel', diagnosis: 'Fractured Arm', procedure: 'X-Ray and Splint', cost: 500, stay: 2, readmission: true, outcome: 'Recovered', satisfaction: 5, status: 'Discharged' },
  { id: 'P-0019', name: 'Kamala Bai', age: 78, gender: 'Female', phone: '+91 55004 43322', abha: '91-1019-3456-7890', visits: 18, lastVisit: 'Mar 25, 2026', doctor: 'Dr. Mehta', diagnosis: 'Stroke', procedure: 'CT Scan and Medication', cost: 10000, stay: 8, readmission: false, outcome: 'Stable', satisfaction: 2, status: 'Active' },
  { id: 'P-0020', name: 'Vikram Rathore', age: 53, gender: 'Male', phone: '+91 44003 32211', abha: '91-1020-4567-8901', visits: 5, lastVisit: 'Mar 22, 2026', doctor: 'Dr. Gupta', diagnosis: 'Cancer', procedure: 'Surgery and Chemotherapy', cost: 25000, stay: 11, readmission: true, outcome: 'Recovered', satisfaction: 4, status: 'Follow-up' },
];

function PatientsSection() {
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filtered = patientsData.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search) || p.abha.includes(search));

  if (selectedPatient) return <PatientDetail patient={selectedPatient} onBack={() => setSelectedPatient(null)} />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Patient Management</h2>
        <Btn onClick={() => setIsModalOpen(true)}><PlusCircle size={16} /> Register New Patient</Btn>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Patient">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Patient Name</label><Input placeholder="John Doe" /></div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Age</label><Input type="number" placeholder="30" /></div>
            <div style={{ flex: 1 }}><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Gender</label>
              <select style={{ width: '100%', padding: '0.6rem', border: '1px solid #E2E8F0', borderRadius: '8px' }}><option>Male</option><option>Female</option><option>Other</option></select>
            </div>
          </div>
          <div><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Phone Number</label><Input placeholder="+91" /></div>
          <div><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>ABHA ID</label><Input placeholder="91-XXXX-XXXX-XXXX" /></div>
          <Btn onClick={() => setIsModalOpen(false)} style={{ marginTop: '1rem', justifyContent: 'center' }}>Save Patient</Btn>
        </div>
      </Modal>
      <Card style={{ marginBottom: '1.5rem' }}><CardB style={{ display: 'flex', gap: '0.75rem' }}>
        <div style={{ position: 'relative', flex: 1 }}><Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} /><Input placeholder="Search by Name, Patient ID, or ABHA ID..." value={search} onChange={(e: any) => setSearch(e.target.value)} style={{ paddingLeft: '2.5rem' }} /></div>
        <Btn variant="outline"><Filter size={16} /> Filters</Btn>
      </CardB></Card>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead><tr style={{ borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
              {['Patient ID', 'Name', 'Age/Gender', 'Diagnosis', 'Procedure', 'Cost (₹)', 'Outcome', 'Status', ''].map((h, i) => <th key={i} style={{ padding: '1rem 1rem', color: '#64748B', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #F1F5F9', cursor: 'pointer', transition: 'background 0.15s' }} onClick={() => setSelectedPatient(p)} onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')} onMouseLeave={e => (e.currentTarget.style.background = 'white')}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#2563EB' }}>{p.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{p.name}</td>
                  <td style={{ padding: '1rem', color: '#64748B' }}>{p.age} / {p.gender}</td>
                  <td style={{ padding: '1rem' }}>{p.diagnosis}</td>
                  <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#475569' }}>{p.procedure}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>₹{p.cost?.toLocaleString()}</td>
                  <td style={{ padding: '1rem' }}><Badge color={p.outcome === 'Recovered' ? 'green' : 'yellow'}>{p.outcome}</Badge></td>
                  <td style={{ padding: '1rem' }}><Badge color={p.status === 'Active' ? 'green' : p.status === 'Follow-up' ? 'yellow' : 'gray'}>{p.status}</Badge></td>
                  <td style={{ padding: '1rem' }}><ChevronRight size={16} color="#94A3B8" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function PatientDetail({ patient, onBack }: any) {
  const [bottomTab, setBottomTab] = useState('history');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#1E293B' }}>

      {/* Breadcrumb & Back */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.9rem', fontWeight: 500 }}>
          <Home size={16} /> <ChevronRight size={14} /> <span>Patients</span> <ChevronRight size={14} /> <span style={{ color: '#1E293B' }}>Patient Profile</span>
        </div>
        <Btn variant="primary" onClick={onBack} style={{ display: 'flex', gap: '0.5rem', padding: '0.5rem 1rem' }}>
          ← Back to Patients
        </Btn>
      </div>

      {/* Top Section: Profile & AI Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={40} color="#2563EB" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.25rem' }}>
                  <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{patient.name}</h2>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: '#DCFCE7', color: '#16A34A', padding: '0.15rem 0.6rem', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 600 }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16A34A' }} /> Active</span>
                </div>
                <div style={{ color: '#64748B', fontSize: '0.9rem' }}>Patient ID: PAT-2026-0142</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Btn variant="primary"><Edit size={16} /> Edit Profile</Btn>
              <Btn variant="outline"><Calendar size={16} color="#2563EB" /> <span style={{ color: '#2563EB' }}>Book Appointment</span></Btn>
              <Btn variant="outline">More <ChevronDown size={16} /></Btn>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '2rem', borderTop: '1px solid #F1F5F9', paddingTop: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.9rem' }}><Calendar size={16} color="#2563EB" /> 34 years</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.9rem' }}><User size={16} color="#2563EB" /> Male</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.9rem' }}><Droplet size={16} color="#2563EB" /> O+</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.9rem', marginLeft: 'auto' }}><Phone size={16} color="#2563EB" /> +91 98765 43210</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748B', fontSize: '0.9rem' }}><Mail size={16} color="#2563EB" /> arjun.sharma@example.com</div>
          </div>
        </Card>

        <Card style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Bot size={24} color="#2563EB" />
            <h3 style={{ margin: 0, color: '#2563EB', fontSize: '1.1rem' }}>AI Clinical Summary</h3>
          </div>
          <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            Get an instant AI-powered summary of the patient's health record, history and key insights.
          </p>
          <Btn variant="primary" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}><Sparkles size={16} /> Generate Summary</Btn>
        </Card>
      </div>

      {/* 4 Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
        <Card style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F0F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ActivitySquare size={24} color="#2563EB" /></div>
          <div><div style={{ color: '#1E293B', fontSize: '0.9rem', fontWeight: 500 }}>Hospital Visits</div><div style={{ fontSize: '1.5rem', fontWeight: 700 }}>8</div><div style={{ color: '#64748B', fontSize: '0.75rem' }}>Total visits</div></div>
        </Card>
        <Card style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F0F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Pill size={24} color="#2563EB" /></div>
          <div><div style={{ color: '#1E293B', fontSize: '0.9rem', fontWeight: 500 }}>Current Medicines</div><div style={{ fontSize: '1.5rem', fontWeight: 700 }}>3</div><div style={{ color: '#64748B', fontSize: '0.75rem' }}>Active medicines</div></div>
        </Card>
        <Card style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F0F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FlaskConical size={24} color="#2563EB" /></div>
          <div><div style={{ color: '#1E293B', fontSize: '0.9rem', fontWeight: 500 }}>Lab Reports</div><div style={{ fontSize: '1.5rem', fontWeight: 700 }}>12</div><div style={{ color: '#64748B', fontSize: '0.75rem' }}>Total reports</div></div>
        </Card>
        <Card style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F0F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Calendar size={24} color="#2563EB" /></div>
          <div><div style={{ color: '#1E293B', fontSize: '0.9rem', fontWeight: 500 }}>Upcoming Appointment</div><div style={{ fontSize: '1.5rem', fontWeight: 700 }}>01</div><div style={{ color: '#64748B', fontSize: '0.75rem' }}>Scheduled</div></div>
        </Card>
      </div>

      {/* 3-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem' }}>

        {/* Left: Clinical Timeline */}
        <Card>
          <CardH>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity color="#2563EB" size={20} /><h3 style={{ margin: 0, fontSize: '1.1rem' }}>Clinical Timeline</h3></div>
            <Btn variant="outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>All Events <ChevronDown size={14} /></Btn>
          </CardH>
          <CardB>
            <div style={{ position: 'relative', borderLeft: '2px solid #E2E8F0', marginLeft: '0.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                { d: 'May 15, 2026', t: '10:30 AM', i: <ActivitySquare size={16} color="#2563EB" />, b: '#E0E7FF', title: 'Hospital Visit', desc: 'Routine check-up and vitals.', right1: 'CityCare Multi-Speciality Hospital', right2: 'General Medicine' },
                { d: 'May 10, 2026', t: '02:15 PM', i: <Stethoscope size={16} color="#2563EB" />, b: '#E0E7FF', title: 'Cardiology Consultation', desc: 'Chest discomfort, advised ECG.', right1: 'Dr. Priya Mehta', right2: 'Cardiologist' },
                { d: 'May 10, 2026', t: '03:00 PM', i: <Activity size={16} color="#2563EB" />, b: '#E0E7FF', title: 'ECG Report', desc: 'Normal sinus rhythm. No major abnormalities.', right1: 'CityCare Multi-Speciality Hospital', right2: 'Cardiology' },
                { d: 'May 08, 2026', t: '11:20 AM', i: <FileText size={16} color="#2563EB" />, b: '#E0E7FF', title: 'Prescription', desc: 'Amlodipine 5mg, Metformin 500mg.', right1: 'Dr. Priya Mehta', right2: 'Cardiologist' },
                { d: 'May 01, 2026', t: '09:00 AM', i: <Clock size={16} color="#2563EB" />, b: '#E0E7FF', title: 'Follow-up', desc: 'Next review in 2 weeks.', right1: 'Dr. Priya Mehta', right2: 'Cardiologist' },
              ].map((ev, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', position: 'relative', paddingLeft: '2rem' }}>
                  <div style={{ position: 'absolute', left: '-5px', top: '24px', width: '10px', height: '10px', borderRadius: '50%', background: '#2563EB', border: '2px solid white' }} />
                  <div style={{ width: '90px', flexShrink: 0, marginTop: '0.5rem' }}>
                    <div style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: 500 }}>{ev.d}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{ev.t}</div>
                  </div>
                  <div style={{ flex: 1, display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: ev.b, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ev.i}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{ev.title}</div>
                      <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.25rem' }}>{ev.desc}</div>
                    </div>
                  </div>
                  <div style={{ width: '200px', flexShrink: 0, marginTop: '0.5rem' }}>
                    <div style={{ fontSize: '0.85rem', color: '#64748B' }}>{ev.right1}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{ev.right2}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardB>
        </Card>

        {/* Middle: Current Meds & Upcoming Appt */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <CardH>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Pill color="#2563EB" size={18} /><h3 style={{ margin: 0, fontSize: '1rem' }}>Current Medications</h3></div>
              <span style={{ color: '#2563EB', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>View all</span>
            </CardH>
            <CardB style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Pill size={16} color="#DC2626" /></div>
                <div><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Amlodipine 5mg</div><div style={{ color: '#64748B', fontSize: '0.8rem' }}>1 tablet • Once daily</div></div>
              </div>
              <div style={{ width: '100%', height: '1px', background: '#F1F5F9' }} />
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Pill size={16} color="#2563EB" /></div>
                <div><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Metformin 500mg</div><div style={{ color: '#64748B', fontSize: '0.8rem' }}>1 tablet • Twice daily</div></div>
              </div>
              <div style={{ width: '100%', height: '1px', background: '#F1F5F9' }} />
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Pill size={16} color="#16A34A" /></div>
                <div><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Atorvastatin 20mg</div><div style={{ color: '#64748B', fontSize: '0.8rem' }}>1 tablet • Once daily</div></div>
              </div>
            </CardB>
          </Card>
          <Card>
            <CardH>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar color="#2563EB" size={18} /><h3 style={{ margin: 0, fontSize: '1rem' }}>Upcoming Appointment</h3></div>
              <span style={{ color: '#2563EB', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>View all</span>
            </CardH>
            <CardB style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#2563EB', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>May</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1E293B', lineHeight: 1 }}>28</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem' }}>10:00 AM</div>
                <div style={{ color: '#475569', fontSize: '0.85rem', fontWeight: 500 }}>Dr. Priya Mehta</div>
                <div style={{ color: '#64748B', fontSize: '0.8rem' }}>Cardiology Department</div>
              </div>
              <ChevronRight size={18} color="#94A3B8" />
            </CardB>
          </Card>
        </div>

        {/* Right: Latest Labs & Emergency */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <CardH>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FlaskConical color="#2563EB" size={18} /><h3 style={{ margin: 0, fontSize: '1rem' }}>Latest Lab Reports</h3></div>
              <span style={{ color: '#2563EB', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer' }}>View all</span>
            </CardH>
            <CardB style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <FlaskConical size={16} color="#64748B" style={{ marginTop: '0.15rem' }} />
                  <div><div style={{ fontWeight: 500, fontSize: '0.9rem' }}>Complete Blood Count (CBC)</div><div style={{ color: '#64748B', fontSize: '0.8rem' }}>May 10, 2026</div></div>
                </div>
                <span style={{ color: '#16A34A', fontSize: '0.75rem', fontWeight: 600, background: '#DCFCE7', padding: '0.15rem 0.5rem', borderRadius: '99px' }}>Completed</span>
              </div>
              <div style={{ width: '100%', height: '1px', background: '#F1F5F9' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <FlaskConical size={16} color="#16A34A" style={{ marginTop: '0.15rem' }} />
                  <div><div style={{ fontWeight: 500, fontSize: '0.9rem' }}>Lipid Profile</div><div style={{ color: '#64748B', fontSize: '0.8rem' }}>May 08, 2026</div></div>
                </div>
                <span style={{ color: '#16A34A', fontSize: '0.75rem', fontWeight: 600, background: '#DCFCE7', padding: '0.15rem 0.5rem', borderRadius: '99px' }}>Completed</span>
              </div>
              <div style={{ width: '100%', height: '1px', background: '#F1F5F9' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Activity size={16} color="#16A34A" style={{ marginTop: '0.15rem' }} />
                  <div><div style={{ fontWeight: 500, fontSize: '0.9rem' }}>ECG</div><div style={{ color: '#64748B', fontSize: '0.8rem' }}>May 05, 2026</div></div>
                </div>
                <span style={{ color: '#16A34A', fontSize: '0.75rem', fontWeight: 600, background: '#DCFCE7', padding: '0.15rem 0.5rem', borderRadius: '99px' }}>Completed</span>
              </div>
            </CardB>
          </Card>
          <Card>
            <CardH>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><AlertTriangle color="#DC2626" size={18} /><h3 style={{ margin: 0, fontSize: '1rem' }}>Emergency Contact</h3></div>
            </CardH>
            <CardB style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={20} color="#64748B" /></div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Neha Sharma</div>
                <div style={{ color: '#64748B', fontSize: '0.8rem', marginBottom: '0.25rem' }}>Spouse</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#475569', fontSize: '0.85rem' }}><Phone size={12} /> +91 98765 43211</div>
              </div>
            </CardB>
          </Card>
        </div>
      </div>

      {/* Bottom Tabs */}
      <Card>
        <div style={{ display: 'flex', borderBottom: '1px solid #E2E8F0', padding: '0 1.5rem', gap: '2rem' }}>
          {[
            { id: 'history', l: 'Medical History', i: <Clock size={16} /> },
            { id: 'prescriptions', l: 'Prescriptions', i: <Stethoscope size={16} /> },
            { id: 'lab', l: 'Lab Reports', i: <FlaskConical size={16} /> },
            { id: 'docs', l: 'Documents', i: <FileText size={16} /> },
            { id: 'treatment', l: 'Treatment Plans', i: <ClipboardList size={16} /> },
          ].map(t => (
            <button key={t.id} onClick={() => setBottomTab(t.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1.25rem 0', background: 'none', border: 'none', borderBottom: `2px solid ${bottomTab === t.id ? '#2563EB' : 'transparent'}`, color: bottomTab === t.id ? '#2563EB' : '#64748B', fontWeight: bottomTab === t.id ? 600 : 500, fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s' }}>
              {t.i} {t.l}
            </button>
          ))}
        </div>
        <CardB>
          {bottomTab === 'history' && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F0F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB' }}><FileText size={20} /></div>
                <div><h4 style={{ margin: '0 0 0.25rem' }}>Medical History</h4><p style={{ margin: 0, color: '#64748B', fontSize: '0.85rem' }}>Past medical conditions, diagnoses and treatment history.</p></div>
              </div>
              <span style={{ color: '#2563EB', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer' }}>View all</span>
            </div>
          )}
          {bottomTab !== 'history' && <div style={{ color: '#64748B', fontSize: '0.9rem', padding: '1rem 0' }}>Content for {bottomTab} goes here.</div>}
        </CardB>
      </Card>

    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// 3. APPOINTMENTS
// ═══════════════════════════════════════════════════════════════════
function AppointmentsSection() {
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const appointments = [
    { token: 'T-01', time: '09:30 AM', name: 'Arjun Sharma', type: 'Follow-up', doctor: 'Dr. Mehta', status: 'Confirmed', date: 'Oct 15, 2026' },
    { token: 'T-02', time: '10:15 AM', name: 'Neha Kapoor', type: 'Consultation', doctor: 'Dr. Singh', status: 'Confirmed', date: 'Oct 15, 2026' },
    { token: 'T-03', time: '11:00 AM', name: 'Vikram Singh', type: 'ECG Review', doctor: 'Dr. Mehta', status: 'Pending', date: 'Oct 15, 2026' },
    { token: 'T-04', time: '12:00 PM', name: 'Pooja Verma', type: 'Consultation', doctor: 'Dr. Patel', status: 'Confirmed', date: 'Oct 15, 2026' },
    { token: 'T-05', time: '02:00 PM', name: 'Rakesh Patel', type: 'Follow-up', doctor: 'Dr. Mehta', status: 'Pending', date: 'Oct 15, 2026' },
    { token: 'E-01', time: '03:30 PM', name: 'Emergency Patient', type: 'Emergency', doctor: 'Dr. Mehta', status: 'Emergency', date: 'Oct 15, 2026' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Appointment Management</h2>
        <Btn onClick={() => setIsModalOpen(true)}><PlusCircle size={16} /> New Appointment</Btn>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Appointment">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Select Patient</label><Input placeholder="Search patient..." /></div>
          <div><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Select Doctor</label><Input placeholder="e.g. Dr. Mehta" /></div>
          <div><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Date & Time</label><Input type="datetime-local" /></div>
          <Btn onClick={() => setIsModalOpen(false)} style={{ marginTop: '1rem', justifyContent: 'center' }}>Book Appointment</Btn>
        </div>
      </Modal>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Btn variant={tab === 'upcoming' ? 'primary' : 'outline'} onClick={() => setTab('upcoming')}>Upcoming</Btn>
        <Btn variant={tab === 'completed' ? 'primary' : 'outline'} onClick={() => setTab('completed')}>Completed</Btn>
      </div>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead><tr style={{ borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
              {['Token', 'Date', 'Time', 'Patient', 'Type', 'Doctor', 'Status', 'Actions'].map((h, i) => <th key={i} style={{ padding: '1rem', color: '#64748B', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {appointments.map((a, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '1rem', fontWeight: 700, color: a.status === 'Emergency' ? '#DC2626' : '#2563EB' }}>{a.token}</td>
                  <td style={{ padding: '1rem' }}>{a.date}</td>
                  <td style={{ padding: '1rem', fontWeight: 500 }}>{a.time}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{a.name}</td>
                  <td style={{ padding: '1rem' }}><Badge color={a.type === 'Emergency' ? 'red' : 'blue'}>{a.type}</Badge></td>
                  <td style={{ padding: '1rem' }}>{a.doctor}</td>
                  <td style={{ padding: '1rem' }}><Badge color={a.status === 'Confirmed' ? 'green' : a.status === 'Emergency' ? 'red' : 'yellow'}>{a.status}</Badge></td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <Btn variant="success" style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}><Check size={14} /> Complete</Btn>
                    <Btn variant="danger" style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}><X size={14} /></Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 4. PRESCRIPTIONS
// ═══════════════════════════════════════════════════════════════════
function PrescriptionsSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const prescriptions = [
    { id: 'RX-10234', patient: 'Arjun Sharma', doctor: 'Dr. Mehta', date: 'Oct 12, 2026', medicines: 3, status: 'Approved', qr: true },
    { id: 'RX-10235', patient: 'Neha Kapoor', doctor: 'Dr. Singh', date: 'Oct 10, 2026', medicines: 2, status: 'Pending Review', qr: false },
    { id: 'RX-10236', patient: 'Vikram Singh', doctor: 'Dr. Mehta', date: 'Oct 8, 2026', medicines: 4, status: 'Approved', qr: true },
    { id: 'RX-10237', patient: 'Pooja Verma', doctor: 'Dr. Patel', date: 'Oct 5, 2026', medicines: 1, status: 'Draft', qr: false },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Prescription & Receipt Management</h2>
        <Btn onClick={() => setIsModalOpen(true)}><PlusCircle size={16} /> New Prescription</Btn>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Prescription">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Select Patient</label><Input placeholder="Search patient..." /></div>
          <div><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Medicines (comma separated)</label><Input placeholder="e.g. Paracetamol 500mg, Amoxicillin 250mg" /></div>
          <div><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Instructions</label><Input placeholder="1 tablet twice a day" /></div>
          <Btn onClick={() => setIsModalOpen(false)} style={{ marginTop: '1rem', justifyContent: 'center' }}>Generate Prescription</Btn>
        </div>
      </Modal>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead><tr style={{ borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
              {['Rx ID', 'Patient', 'Doctor', 'Date', 'Medicines', 'Status', 'Actions'].map((h, i) => <th key={i} style={{ padding: '1rem', color: '#64748B', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {prescriptions.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '1rem', fontWeight: 700, color: '#2563EB' }}>{p.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{p.patient}</td>
                  <td style={{ padding: '1rem' }}>{p.doctor}</td>
                  <td style={{ padding: '1rem' }}>{p.date}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{p.medicines}</td>
                  <td style={{ padding: '1rem' }}><Badge color={p.status === 'Approved' ? 'green' : p.status === 'Pending Review' ? 'yellow' : 'gray'}>{p.status}</Badge></td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Btn variant="outline" style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}><Eye size={14} /> View</Btn>
                      <Btn variant="outline" style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}><Printer size={14} /></Btn>
                      {p.qr && <Btn variant="outline" style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}><QrCode size={14} /></Btn>}
                      <Btn variant="outline" style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}><Download size={14} /></Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 5. LAB REPORTS
// ═══════════════════════════════════════════════════════════════════
function LabSection() {
  const [tab, setTab] = useState<'reports' | 'samples' | 'payments'>('reports');
  const reports = [
    { id: 'LAB-5001', patient: 'Arjun Sharma', test: 'Complete Blood Count', lab: 'City Diagnostics', date: 'Oct 12, 2026', status: 'Received', cost: '₹850' },
    { id: 'LAB-5002', patient: 'Vikram Singh', test: 'Lipid Profile', lab: 'HealthScan Labs', date: 'Oct 11, 2026', status: 'Pending', cost: '₹1,200' },
    { id: 'LAB-5003', patient: 'Neha Kapoor', test: 'HbA1c', lab: 'City Diagnostics', date: 'Oct 10, 2026', status: 'Received', cost: '₹600' },
    { id: 'LAB-5004', patient: 'Rakesh Patel', test: 'CT Scan - Chest', lab: 'RadiVision Center', date: 'Oct 9, 2026', status: 'Sample Sent', cost: '₹4,500' },
    { id: 'LAB-5005', patient: 'Pooja Verma', test: 'X-Ray - Chest', lab: 'In-house', date: 'Oct 8, 2026', status: 'Received', cost: '₹400' },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Lab Management</h2>
      {/* Stats */}
      <div className="stats-grid-4" style={{ marginBottom: '1.5rem' }}>
        <Card><CardB><p style={{ color: '#64748B', fontSize: '0.85rem', margin: 0 }}>Total Reports</p><h3 style={{ margin: '0.25rem 0', fontSize: '1.75rem' }}>156</h3><Badge color="green">This month</Badge></CardB></Card>
        <Card><CardB><p style={{ color: '#64748B', fontSize: '0.85rem', margin: 0 }}>Pending</p><h3 style={{ margin: '0.25rem 0', fontSize: '1.75rem', color: '#D97706' }}>8</h3><Badge color="yellow">Awaiting results</Badge></CardB></Card>
        <Card><CardB><p style={{ color: '#64748B', fontSize: '0.85rem', margin: 0 }}>Samples to Send</p><h3 style={{ margin: '0.25rem 0', fontSize: '1.75rem', color: '#7C3AED' }}>3</h3><Badge color="purple">Ready for pickup</Badge></CardB></Card>
        <Card><CardB><p style={{ color: '#64748B', fontSize: '0.85rem', margin: 0 }}>Pending Payments</p><h3 style={{ margin: '0.25rem 0', fontSize: '1.75rem', color: '#DC2626' }}>₹18,400</h3><Badge color="red">To external labs</Badge></CardB></Card>
      </div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Btn variant={tab === 'reports' ? 'primary' : 'outline'} onClick={() => setTab('reports')}>Reports</Btn>
        <Btn variant={tab === 'samples' ? 'primary' : 'outline'} onClick={() => setTab('samples')}>Sample Tracking</Btn>
        <Btn variant={tab === 'payments' ? 'primary' : 'outline'} onClick={() => setTab('payments')}>Payments</Btn>
      </div>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead><tr style={{ borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
              {['Lab ID', 'Patient', 'Test', 'Laboratory', 'Date', 'Cost', 'Status', 'Actions'].map((h, i) => <th key={i} style={{ padding: '1rem', color: '#64748B', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {reports.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '1rem', fontWeight: 700, color: '#7C3AED' }}>{r.id}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{r.patient}</td>
                  <td style={{ padding: '1rem' }}>{r.test}</td>
                  <td style={{ padding: '1rem' }}>{r.lab}</td>
                  <td style={{ padding: '1rem' }}>{r.date}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{r.cost}</td>
                  <td style={{ padding: '1rem' }}><Badge color={r.status === 'Received' ? 'green' : r.status === 'Pending' ? 'yellow' : 'purple'}>{r.status}</Badge></td>
                  <td style={{ padding: '1rem' }}><Btn variant="outline" style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}><Eye size={14} /> View</Btn></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 6. TREATMENT PLANS
// ═══════════════════════════════════════════════════════════════════
function TreatmentSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const plans = [
    { id: 'TP-301', patient: 'Arjun Sharma', condition: 'Hypertension', startDate: 'Sep 1, 2026', endDate: 'Mar 1, 2027', medications: ['Amlodipine 5mg', 'Metoprolol 25mg'], progress: 65, status: 'Active' },
    { id: 'TP-302', patient: 'Neha Kapoor', condition: 'Diabetes Type 2', startDate: 'Aug 15, 2026', endDate: 'Feb 15, 2027', medications: ['Metformin 500mg', 'Glimepiride 1mg'], progress: 70, status: 'Active' },
    { id: 'TP-303', patient: 'Vikram Singh', condition: 'Coronary Artery Disease', startDate: 'Jul 1, 2026', endDate: 'Jan 1, 2027', medications: ['Aspirin 75mg', 'Atorvastatin 20mg', 'Clopidogrel 75mg'], progress: 85, status: 'Active' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Treatment Plans</h2>
        <Btn onClick={() => setIsModalOpen(true)}><PlusCircle size={16} /> Create Plan</Btn>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create Treatment Plan">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Select Patient</label><Input placeholder="Search patient..." /></div>
          <div><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Diagnosis/Condition</label><Input placeholder="e.g. Hypertension" /></div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Start Date</label><Input type="date" /></div>
            <div style={{ flex: 1 }}><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>End Date</label><Input type="date" /></div>
          </div>
          <div><label style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 500, display: 'block', marginBottom: '0.25rem' }}>Target Progress (%)</label><Input type="number" placeholder="100" /></div>
          <Btn onClick={() => setIsModalOpen(false)} style={{ marginTop: '1rem', justifyContent: 'center' }}>Save Treatment Plan</Btn>
        </div>
      </Modal>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {plans.map((p, i) => (
          <Card key={i}><CardB>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: 700, color: '#2563EB' }}>{p.id}</span>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{p.patient}</h3>
                  <Badge color="blue">{p.condition}</Badge>
                </div>
                <p style={{ color: '#64748B', fontSize: '0.85rem', margin: 0 }}>{p.startDate} → {p.endDate}</p>
              </div>
              <Badge color="green">{p.status}</Badge>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}><span style={{ fontSize: '0.85rem', color: '#64748B' }}>Progress</span><span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{p.progress}%</span></div>
              <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '99px' }}><div style={{ width: `${p.progress}%`, height: '100%', background: '#2563EB', borderRadius: '99px', transition: 'width 0.5s' }} /></div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {p.medications.map((m, j) => <Badge key={j} color="purple">{m}</Badge>)}
            </div>
          </CardB></Card>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 7. REVIEW QUEUE (AI Extraction Review)
// ═══════════════════════════════════════════════════════════════════
function ReviewQueueSection() {
  const queue = [
    { id: 'DOC-901', patient: 'Arjun Sharma', type: 'Handwritten Prescription', uploadedAt: '2 hours ago', fields: 6, flagged: 1, confidence: 0.92 },
    { id: 'DOC-902', patient: 'Neha Kapoor', type: 'OPD Card', uploadedAt: '3 hours ago', fields: 8, flagged: 3, confidence: 0.74 },
    { id: 'DOC-903', patient: 'Vikram Singh', type: 'Discharge Summary', uploadedAt: '5 hours ago', fields: 12, flagged: 0, confidence: 0.97 },
    { id: 'DOC-904', patient: 'Unknown Patient', type: 'Case Sheet', uploadedAt: '1 day ago', fields: 10, flagged: 5, confidence: 0.55 },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ margin: 0 }}>Review Queue</h2>
        <Badge color="yellow">{queue.length} documents pending review</Badge>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {queue.map((d, i) => (
          <Card key={i}><CardB>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: d.confidence > 0.9 ? '#DCFCE7' : d.confidence > 0.7 ? '#FEF3C7' : '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={28} color={d.confidence > 0.9 ? '#16A34A' : d.confidence > 0.7 ? '#D97706' : '#DC2626'} />
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, color: '#2563EB' }}>{d.id}</span>
                    <h4 style={{ margin: 0 }}>{d.patient}</h4>
                  </div>
                  <p style={{ color: '#64748B', fontSize: '0.85rem', margin: '0 0 0.25rem' }}>{d.type} • Uploaded {d.uploadedAt}</p>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Badge color="blue">{d.fields} fields extracted</Badge>
                    {d.flagged > 0 && <Badge color="red">{d.flagged} flagged</Badge>}
                    <Badge color={d.confidence > 0.9 ? 'green' : d.confidence > 0.7 ? 'yellow' : 'red'}>Confidence: {(d.confidence * 100).toFixed(0)}%</Badge>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Btn variant="primary"><Eye size={16} /> Review</Btn>
                <Btn variant="success"><Check size={16} /> Approve</Btn>
                <Btn variant="danger"><X size={16} /></Btn>
              </div>
            </div>
          </CardB></Card>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 8. AI DIAGNOSIS SUPPORT
// ═══════════════════════════════════════════════════════════════════
function AIDiagnosisSection() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello Dr. Mehta! I can help you with clinical decision support, patient summaries, drug interactions, and differential diagnoses. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }, { role: 'ai', text: 'Based on the symptoms you described (persistent headache, elevated BP 150/95 mmHg, dizziness), the differential diagnosis includes:\n\n1. **Essential Hypertension** (most likely)\n2. Secondary Hypertension (renal artery stenosis)\n3. Tension-type Headache\n\nRecommended investigations: CBC, RFT, Lipid Profile, ECG, Fundoscopy.\n\n⚠️ This is AI-assisted guidance only. Clinical judgment must be applied.' }]);
    setInput('');
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>AI Diagnosis Support</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        {/* Chat */}
        <Card style={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
          <CardH><div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Bot size={20} color="#2563EB" /><h3 style={{ margin: 0 }}>AI Clinical Chat</h3></div><Badge color="green">● Online</Badge></CardH>
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '80%', padding: '1rem', borderRadius: '12px', background: m.role === 'user' ? '#2563EB' : '#F1F5F9', color: m.role === 'user' ? 'white' : '#1E293B', fontSize: '0.9rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{m.text}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '1rem', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '0.5rem' }}>
            <Input value={input} onChange={(e: any) => setInput(e.target.value)} placeholder="Describe symptoms, ask for drug interactions..." onKeyDown={(e: any) => e.key === 'Enter' && handleSend()} style={{ flex: 1 }} />
            <Btn onClick={handleSend}><Send size={16} /></Btn>
          </div>
        </Card>
        {/* Quick Tools */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Card><CardB>
            <h4 style={{ marginBottom: '1rem' }}>Quick AI Tools</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {['Drug Interaction Check', 'Differential Diagnosis', 'Patient Summary', 'Treatment Recommendation', 'Lab Result Analysis'].map((t, i) => (
                <button key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s', fontSize: '0.9rem', fontWeight: 500 }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#2563EB')} onMouseLeave={e => (e.currentTarget.style.borderColor = '#E2E8F0')}>
                  <Bot size={18} color="#2563EB" />{t}<ChevronRight size={16} color="#94A3B8" style={{ marginLeft: 'auto' }} />
                </button>
              ))}
            </div>
          </CardB></Card>
          <Card style={{ background: '#FFFBEB', borderColor: '#FDE68A' }}><CardB>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <AlertCircle size={20} color="#D97706" style={{ marginTop: '0.15rem', flexShrink: 0 }} />
              <div><h4 style={{ margin: '0 0 0.25rem', color: '#92400E', fontSize: '0.9rem' }}>Disclaimer</h4><p style={{ margin: 0, fontSize: '0.8rem', color: '#92400E', lineHeight: 1.4 }}>AI suggestions are for reference only. All clinical decisions must be made by qualified medical professionals.</p></div>
            </div>
          </CardB></Card>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 9. AUDIT / HISTORY
// ═══════════════════════════════════════════════════════════════════
function AuditSection() {
  const logs = [
    { id: 'AUD-001', action: 'Prescription Approved', user: 'Dr. Mehta', target: 'RX-10234 (Arjun Sharma)', timestamp: 'Oct 12, 2026 09:45 AM', type: 'approval', hash: 'a3f2...c891' },
    { id: 'AUD-002', action: 'Medicine Corrected', user: 'Dr. Mehta', target: 'RX-10234 – Amlodipine dose changed 10mg → 5mg', timestamp: 'Oct 12, 2026 09:43 AM', type: 'correction', hash: 'b7d1...e432' },
    { id: 'AUD-003', action: 'Document Uploaded', user: 'Nurse Priya', target: 'DOC-901 (OPD Card – Arjun Sharma)', timestamp: 'Oct 12, 2026 09:30 AM', type: 'upload', hash: 'c4e5...f109' },
    { id: 'AUD-004', action: 'Lab Report Linked', user: 'System', target: 'LAB-5001 linked to P-8493', timestamp: 'Oct 12, 2026 08:15 AM', type: 'system', hash: 'd9a2...1bc7' },
    { id: 'AUD-005', action: 'Patient Registered', user: 'Receptionist Anu', target: 'P-8497 (Rakesh Patel)', timestamp: 'Oct 11, 2026 04:30 PM', type: 'create', hash: 'e3f7...2d45' },
    { id: 'AUD-006', action: 'Emergency Alert Created', user: 'System', target: 'EMR-045 – Unknown patient, cardiac event', timestamp: 'Oct 11, 2026 03:45 PM', type: 'emergency', hash: 'f1b8...9c63' },
  ];
  const typeColors: any = { approval: 'green', correction: 'yellow', upload: 'blue', system: 'gray', create: 'purple', emergency: 'red' };

  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem' }}>Audit Trail & History</h2>
      <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>Tamper-evident, immutable ledger of all clinical record changes. Each entry is cryptographically hashed.</p>
      <Card style={{ marginBottom: '1.5rem' }}><CardB style={{ display: 'flex', gap: '0.75rem' }}>
        <Input placeholder="Search audit logs..." style={{ flex: 1 }} />
        <Btn variant="outline"><Filter size={16} /> Filter by type</Btn>
        <Btn variant="outline"><Download size={16} /> Export</Btn>
      </CardB></Card>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead><tr style={{ borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
              {['Audit ID', 'Timestamp', 'Action', 'User', 'Target', 'Hash', 'Type'].map((h, i) => <th key={i} style={{ padding: '1rem', color: '#64748B', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {logs.map((l, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '1rem', fontWeight: 600, color: '#475569', fontFamily: 'monospace', fontSize: '0.8rem' }}>{l.id}</td>
                  <td style={{ padding: '1rem', fontSize: '0.85rem', color: '#64748B', whiteSpace: 'nowrap' }}>{l.timestamp}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{l.action}</td>
                  <td style={{ padding: '1rem' }}>{l.user}</td>
                  <td style={{ padding: '1rem', fontSize: '0.85rem', maxWidth: '250px' }}>{l.target}</td>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748B' }}>{l.hash}</td>
                  <td style={{ padding: '1rem' }}><Badge color={typeColors[l.type]}>{l.type}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// 10. ADMIN
// ═══════════════════════════════════════════════════════════════════
function AdminSection() {
  const staffMembers = [
    { name: 'Dr. Rajesh Mehta', role: 'Cardiologist', email: 'rajesh@carechain.com', access: 'Full Access', status: 'Active' },
    { name: 'Dr. Priya Singh', role: 'General Medicine', email: 'priya@carechain.com', access: 'Full Access', status: 'Active' },
    { name: 'Dr. Anil Patel', role: 'Orthopedic', email: 'anil@carechain.com', access: 'Full Access', status: 'Active' },
    { name: 'Nurse Priya', role: 'Head Nurse', email: 'nurse.priya@carechain.com', access: 'Limited', status: 'Active' },
    { name: 'Receptionist Anu', role: 'Front Desk', email: 'anu@carechain.com', access: 'Read-only', status: 'Active' },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Admin Panel</h2>
      {/* Settings Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <Card><CardB>
          <Settings size={24} color="#2563EB" style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ margin: '0 0 0.25rem' }}>Hospital Settings</h4>
          <p style={{ color: '#64748B', fontSize: '0.85rem', margin: 0 }}>Name, departments, working hours, contact info</p>
        </CardB></Card>
        <Card><CardB>
          <ShieldCheck size={24} color="#16A34A" style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ margin: '0 0 0.25rem' }}>Security & RBAC</h4>
          <p style={{ color: '#64748B', fontSize: '0.85rem', margin: 0 }}>Role-based permissions, access levels, 2FA</p>
        </CardB></Card>
        <Card><CardB>
          <Bell size={24} color="#D97706" style={{ marginBottom: '0.75rem' }} />
          <h4 style={{ margin: '0 0 0.25rem' }}>Notification Settings</h4>
          <p style={{ color: '#64748B', fontSize: '0.85rem', margin: 0 }}>Email, SMS, and push notification rules</p>
        </CardB></Card>
      </div>
      {/* Staff Management */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>Staff & Access Management</h3>
        <Btn><PlusCircle size={16} /> Add Staff</Btn>
      </div>
      <Card>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead><tr style={{ borderBottom: '2px solid #E2E8F0', textAlign: 'left' }}>
              {['Name', 'Role', 'Email', 'Access Level', 'Status', 'Actions'].map((h, i) => <th key={i} style={{ padding: '1rem', color: '#64748B', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {staffMembers.map((s, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{s.name}</td>
                  <td style={{ padding: '1rem' }}>{s.role}</td>
                  <td style={{ padding: '1rem', color: '#64748B' }}>{s.email}</td>
                  <td style={{ padding: '1rem' }}><Badge color={s.access === 'Full Access' ? 'green' : s.access === 'Limited' ? 'yellow' : 'gray'}>{s.access}</Badge></td>
                  <td style={{ padding: '1rem' }}><Badge color="green">{s.status}</Badge></td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Btn variant="outline" style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}><Edit size={14} /></Btn>
                      <Btn variant="danger" style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}><Trash2 size={14} /></Btn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
