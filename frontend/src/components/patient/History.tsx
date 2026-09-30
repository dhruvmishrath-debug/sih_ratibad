import { useState } from 'react';
import { Activity, FlaskConical, Stethoscope, FilePlus2, FileText, HeartPulse, Search, ChevronDown, Download, Eye } from 'lucide-react';
import { Card, CardH, Badge } from '../pharmacy/Shared';

const allHistory = [
  { type: 'Visit', title: 'General Checkup', date: 'May 12, 2026', doctor: 'Dr. Neha Kapoor', hospital: 'CityCare Hospital', dept: 'General Medicine', status: 'Completed', notes: 'Patient vitals normal. BP: 120/80, Pulse: 72. Advised healthy diet and regular exercise.', prescription: true },
  { type: 'Lab', title: 'Blood Test (CBC)', date: 'May 08, 2026', doctor: 'Dr. Verma', hospital: 'CityCare Labs', dept: 'Pathology', status: 'Normal', notes: 'All values within normal range. Hemoglobin: 14.2 g/dL, WBC: 6,800/mcL, Platelets: 2.5 lakh.', prescription: false },
  { type: 'Prescription', title: 'Prescription — Amoxicillin 500mg', date: 'May 06, 2026', doctor: 'Dr. Neha Kapoor', hospital: 'CityCare Hospital', dept: 'General Medicine', status: 'AI Digitized', notes: 'Amoxicillin 500mg 1-0-1 for 5 days, Paracetamol 650mg SOS. AI confidence: 96%.', prescription: true },
  { type: 'Visit', title: 'Fever & Cold', date: 'Apr 28, 2026', doctor: 'Dr. Arjun Das', hospital: 'Sanjeevani Hospital', dept: 'General Medicine', status: 'Completed', notes: 'Upper respiratory tract infection diagnosed. 3-day course of antibiotics prescribed.', prescription: true },
  { type: 'Lab', title: 'Lipid Profile', date: 'Feb 15, 2026', doctor: 'Dr. Neha Kapoor', hospital: 'CityCare Labs', dept: 'Pathology', status: 'Review Required', notes: 'Total Cholesterol: 245 mg/dL (High), LDL: 165 mg/dL (High), HDL: 38 mg/dL (Low). Triglycerides: 210 mg/dL.', prescription: false },
  { type: 'Surgery', title: 'Appendectomy (Laparoscopic)', date: 'Jan 10, 2026', doctor: 'Dr. Priya Sharma', hospital: 'AIIMS Bhopal', dept: 'General Surgery', status: 'Recovered', notes: 'Emergency appendectomy performed under general anesthesia. Discharged after 2 days. Full recovery in 3 weeks.', prescription: true },
  { type: 'Lab', title: 'X-Ray Chest (PA View)', date: 'Jan 09, 2026', doctor: 'Dr. Rajesh Patel', hospital: 'AIIMS Bhopal', dept: 'Radiology', status: 'Normal', notes: 'Lungs are clear. Heart size normal. No pleural effusion. Pre-surgical clearance given.', prescription: false },
  { type: 'Visit', title: 'Acute Abdominal Pain', date: 'Jan 08, 2026', doctor: 'Dr. Priya Sharma', hospital: 'AIIMS Bhopal', dept: 'Emergency', status: 'Completed', notes: 'Patient presented with acute RIF pain. USG abdomen shows inflamed appendix. Advised immediate surgery.', prescription: true },
  { type: 'Lab', title: 'HbA1c (Glycated Hemoglobin)', date: 'Dec 02, 2025', doctor: 'Dr. Vikram Singh', hospital: 'Ratibad PHC', dept: 'Pathology', status: 'Normal', notes: 'HbA1c: 5.4% — Normal range. No indication of diabetes. Retest advised in 6 months.', prescription: false },
  { type: 'Visit', title: 'Annual Health Checkup', date: 'Nov 15, 2025', doctor: 'Dr. Vikram Singh', hospital: 'Ratibad PHC', dept: 'Preventive Medicine', status: 'Completed', notes: 'All vitals normal. BMI: 24.1. ECG: Normal sinus rhythm. No abnormalities detected. Next checkup: Nov 2026.', prescription: false },
  { type: 'Prescription', title: 'Prescription — Metformin + Atorvastatin', date: 'Nov 15, 2025', doctor: 'Dr. Vikram Singh', hospital: 'Ratibad PHC', dept: 'General Medicine', status: 'AI Digitized', notes: 'Metformin 500mg 1-0-1, Atorvastatin 10mg 0-0-1. Lifestyle modification advised. Confidence: 94%.', prescription: true },
  { type: 'Lab', title: 'Thyroid Profile (T3, T4, TSH)', date: 'Sep 20, 2025', doctor: 'Dr. Aisha Khan', hospital: 'MedPlus Diagnostics', dept: 'Endocrinology', status: 'Normal', notes: 'T3: 1.1 ng/mL, T4: 7.8 µg/dL, TSH: 2.4 µIU/mL. All within normal limits.', prescription: false },
  { type: 'Visit', title: 'Skin Allergy Consultation', date: 'Aug 05, 2025', doctor: 'Dr. Kavita Rao', hospital: 'Gandhi Medical College', dept: 'Dermatology', status: 'Completed', notes: 'Contact dermatitis diagnosed. Topical corticosteroid cream prescribed. Avoid known allergens.', prescription: true },
  { type: 'Vaccination', title: 'COVID-19 Booster (Covishield)', date: 'Jun 12, 2025', doctor: 'Dr. Public Health', hospital: 'Ratibad PHC', dept: 'Immunization', status: 'Completed', notes: 'Booster dose administered. Certificate issued. No adverse reactions observed for 30 minutes.', prescription: false },
  { type: 'Lab', title: 'Urine Routine & Microscopy', date: 'May 18, 2025', doctor: 'Dr. Verma', hospital: 'CityCare Labs', dept: 'Pathology', status: 'Normal', notes: 'pH: 6.0, Protein: Nil, Sugar: Nil, RBC: Nil. No infection detected.', prescription: false },
  { type: 'Visit', title: 'Eye Checkup (Routine)', date: 'Mar 10, 2025', doctor: 'Dr. Ritu Agarwal', hospital: 'Netravaidya Eye Clinic', dept: 'Ophthalmology', status: 'Completed', notes: 'Vision: 6/6 both eyes. No refractive error. Fundus examination normal. Next visit: Mar 2027.', prescription: false },
];

const typeIcons: any = {
  Visit: <Stethoscope size={22} color="#3B82F6" />,
  Lab: <FlaskConical size={22} color="#8B5CF6" />,
  Prescription: <FilePlus2 size={22} color="#10B981" />,
  Surgery: <HeartPulse size={22} color="#EF4444" />,
  Vaccination: <Activity size={22} color="#D97706" />,
};

const typeBg: any = {
  Visit: '#EFF6FF',
  Lab: '#F5F3FF',
  Prescription: '#ECFDF5',
  Surgery: '#FEE2E2',
  Vaccination: '#FEF3C7',
};

const statusColor: any = {
  Completed: 'green', Normal: 'green', Recovered: 'green',
  'AI Digitized': 'blue', 'Review Required': 'yellow',
};

export default function PatientHistory() {
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const types = ['All', 'Visit', 'Lab', 'Prescription', 'Surgery', 'Vaccination'];

  const filtered = allHistory
    .filter(h => filterType === 'All' || h.type === filterType)
    .filter(h => searchQuery === '' || h.title.toLowerCase().includes(searchQuery.toLowerCase()) || h.doctor.toLowerCase().includes(searchQuery.toLowerCase()) || h.hospital.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 style={{ margin: 0, color: '#1E293B', fontSize: '1.5rem' }}>Health History</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search history..." style={{ paddingLeft: '2.25rem', padding: '0.5rem 0.75rem 0.5rem 2.25rem', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', width: '220px' }} />
          </div>
          <button onClick={() => alert('Export PDF coming soon')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: '1px solid #E2E8F0', borderRadius: '8px', background: 'white', cursor: 'pointer', color: '#475569', fontSize: '0.85rem' }}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {types.map(t => (
          <button key={t} onClick={() => setFilterType(t)} style={{
            padding: '0.4rem 1rem', borderRadius: '99px', border: '1px solid',
            borderColor: filterType === t ? '#2563EB' : '#E2E8F0',
            background: filterType === t ? '#2563EB' : 'white',
            color: filterType === t ? 'white' : '#475569',
            cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500
          }}>{t}</button>
        ))}
      </div>

      {/* Stats summary */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Total Records', value: allHistory.length, color: '#2563EB', bg: '#DBEAFE' },
          { label: 'Hospital Visits', value: allHistory.filter(h => h.type === 'Visit').length, color: '#3B82F6', bg: '#EFF6FF' },
          { label: 'Lab Reports', value: allHistory.filter(h => h.type === 'Lab').length, color: '#8B5CF6', bg: '#F5F3FF' },
          { label: 'AI Digitized', value: allHistory.filter(h => h.status === 'AI Digitized').length, color: '#10B981', bg: '#ECFDF5' },
        ].map((s, i) => (
          <div key={i} style={{ flex: 1, minWidth: '150px', background: s.bg, borderRadius: '12px', padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div style={{ fontSize: '0.8rem', color: s.color, fontWeight: 500 }}>{s.label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1E293B' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <Card>
        <CardH><h3 style={{ margin: 0 }}>Timeline ({filtered.length} records)</h3></CardH>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {filtered.map((h, i) => (
            <div key={i} style={{ borderBottom: i !== filtered.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
              <div
                onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem 1.5rem', cursor: 'pointer', transition: 'background 0.2s', alignItems: 'flex-start' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F8FAFC')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: typeBg[h.type] || '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {typeIcons[h.type] || <FileText size={22} color="#64748B" />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem', gap: '1rem', flexWrap: 'wrap' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', color: '#1E293B' }}>{h.title}</h4>
                    <span style={{ color: '#64748B', fontSize: '0.8rem', fontWeight: 500, flexShrink: 0 }}>{h.date}</span>
                  </div>
                  <div style={{ color: '#475569', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{h.doctor} • {h.hospital} • {h.dept}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <Badge color={statusColor[h.status] || 'gray'}>{h.status}</Badge>
                    {h.prescription && <Badge color="blue">Has Prescription</Badge>}
                  </div>
                </div>
                <ChevronDown size={18} color="#94A3B8" style={{ transition: 'transform 0.2s', transform: expandedIdx === i ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0, marginTop: '0.5rem' }} />
              </div>

              {/* Expandable notes */}
              {expandedIdx === i && (
                <div style={{ padding: '0 1.5rem 1.25rem 5.5rem', animation: 'fadeIn 0.2s' }}>
                  <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '1rem', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem', color: '#1E293B' }}>📋 Clinical Notes</div>
                    <div style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.6 }}>{h.notes}</div>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                      <button onClick={() => alert(`Viewing full details for: ${h.title}`)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.75rem', background: '#2563EB', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}><Eye size={14} /> View Details</button>
                      <button onClick={() => alert('Download PDF coming soon')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.75rem', background: 'white', color: '#475569', border: '1px solid #E2E8F0', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}><Download size={14} /> Download</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
