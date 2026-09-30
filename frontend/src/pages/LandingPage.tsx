import { useState } from 'react';
import { 
  Activity, Shield, X, 
  Building2, Pill, UserCircle, Brain, FileText, QrCode, ShieldCheck, Ambulance,
  Network, Zap, ArrowRight, Lock, PlayCircle, Globe, ExternalLink, Heart
} from 'lucide-react';
import Login from './Login';
import techBharatLogo from '../assets/tech_bharat_logo.jpg';

export default function LandingPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="landing-page" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)', color: 'var(--text-primary)', fontFamily: 'var(--font-sans, system-ui, sans-serif)' }}>
      
      {/* Navigation */}
      <nav style={{ padding: '1rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', padding: '0.5rem', borderRadius: '0.5rem' }}>
            <Activity color="white" size={24} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>CareChain</span>
        </div>
        
        <div style={{ display: 'flex', gap: '2.5rem', fontWeight: 500, fontSize: '0.95rem' }}>
          <a href="#platform" style={{ color: 'var(--text-primary)' }}>Platform</a>
          <a href="#solutions" style={{ color: 'var(--text-primary)' }}>Solutions</a>
          <a href="#features" style={{ color: 'var(--text-primary)' }}>Features</a>
          <a href="#about" style={{ color: 'var(--text-primary)' }}>About</a>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" style={{ borderRadius: '2rem', padding: '0.5rem 1.5rem', fontWeight: 600 }} onClick={() => setIsLoginModalOpen(true)}>
            Login
          </button>
          <button className="btn btn-primary" style={{ borderRadius: '2rem', padding: '0.5rem 1.5rem', background: 'linear-gradient(to right, #6366f1, #06b6d4)', border: 'none', fontWeight: 600 }} onClick={() => setIsLoginModalOpen(true)}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header style={{ display: 'flex', padding: '4rem 4rem', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', position: 'relative' }}>
        {/* Background blobs */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '-10%', right: '15%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }}></div>

        <div style={{ flex: '1', maxWidth: '600px', position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '4.5rem', lineHeight: '1.1', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Next-Generation <br/>
            <span style={{ color: '#6366f1' }}>Healthcare</span> <br/>
            <span style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Interoperability</span>
          </h1>
          <p className="text-muted" style={{ fontSize: '1.125rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            Seamlessly connect hospitals, pharmacies, and patients through unified health records, real-time analytics, and secure data sharing in one platform.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
            <button className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '1rem', borderRadius: '2rem', background: '#6366f1', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }} onClick={() => setIsLoginModalOpen(true)}>
              Get Started <ArrowRight size={18} />
            </button>
            <button className="btn btn-outline" style={{ padding: '0.875rem 2rem', fontSize: '1rem', borderRadius: '2rem', color: '#6366f1', borderColor: '#e0e7ff', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white' }}>
              <PlayCircle size={18} /> Explore Platform
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={16} color="#6366f1" /> Secure</div>
            <span>•</span>
            <div>Interoperable</div>
            <span>•</span>
            <div>Patient-Centered</div>
          </div>
        </div>

        {/* Hero Graphic - Connected Nodes */}
        <div style={{ flex: '1', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1, minHeight: '500px', alignItems: 'center' }}>
          <img 
            src={techBharatLogo} 
            alt="Tech Bharat Logo" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '500px',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }} 
          />
        </div>
      </header>

      {/* Stats Bar */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'white', padding: '3rem 4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid var(--border)' }}>
            <div style={{ background: '#eff6ff', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}><Network color="#3b82f6" size={28} /></div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>3</h3>
            <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Connected Modules</p>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Hospital • Pharmacy • Patient</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid var(--border)' }}>
            <div style={{ background: '#eef2ff', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}><ShieldCheck color="#6366f1" size={28} /></div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem', marginTop: '1rem' }}>Secure Role-Based<br/>Access</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Right data. Right people.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRight: '1px solid var(--border)' }}>
            <div style={{ background: '#f5f3ff', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}><Brain color="#a855f7" size={28} /></div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem', marginTop: '1rem' }}>AI-Powered Records</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Smarter insights.<br/>Better care.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ background: '#ecfdf5', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}><Zap color="#10b981" size={28} /></div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem', marginTop: '1rem' }}>Real-Time Healthcare</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Live data. Faster decisions.</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" style={{ padding: '6rem 4rem', background: '#f8fafc' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
          <p style={{ color: '#6366f1', fontWeight: 700, letterSpacing: '0.1em', fontSize: '0.875rem', marginBottom: '1rem', textTransform: 'uppercase' }}>Platform Features</p>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: '1.2' }}>Everything You Need for Smarter Healthcare</h2>
          <p className="text-muted" style={{ fontSize: '1.125rem' }}>Powerful modules and intelligent tools designed to simplify healthcare operations and improve patient outcomes.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
          {/* Card 1 */}
          <div className="card" style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div style={{ background: '#eef2ff', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Building2 color="#6366f1" size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>Hospital / Admin</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>Manage operations, patients, lab reports, and hospital resources efficiently.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
               <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '50%' }}><ArrowRight size={16} color="#64748b" /></div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="card" style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div style={{ background: '#ecfdf5', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Pill color="#10b981" size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>Pharmacy / Medical Store</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>Track inventory, orders, prescriptions and manage medicine availability.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
               <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '50%' }}><ArrowRight size={16} color="#64748b" /></div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="card" style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div style={{ background: '#eff6ff', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <UserCircle color="#3b82f6" size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>Patient Portal</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>Access health records, book appointments, track medicines and more.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
               <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '50%' }}><ArrowRight size={16} color="#64748b" /></div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="card" style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div style={{ background: '#f5f3ff', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <FileText color="#a855f7" size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>AI Medical Document Digitization</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>Extract and process medical documents with AI-powered accuracy.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
               <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '50%' }}><ArrowRight size={16} color="#64748b" /></div>
            </div>
          </div>
          {/* Card 5 */}
          <div className="card" style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div style={{ background: '#e0f2fe', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <QrCode color="#0284c7" size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>Prescription QR</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>Share digital prescriptions securely with pharmacies.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
               <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '50%' }}><ArrowRight size={16} color="#64748b" /></div>
            </div>
          </div>
          {/* Card 6 */}
          <div className="card" style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div style={{ background: '#f3e8ff', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <ShieldCheck color="#9333ea" size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>Personal Health QR</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>Give authorized access to your complete health record.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
               <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '50%' }}><ArrowRight size={16} color="#64748b" /></div>
            </div>
          </div>
          {/* Card 7 */}
          <div className="card" style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div style={{ background: '#fee2e2', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Ambulance color="#dc2626" size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>Emergency Management</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>Get help fast with location sharing and emergency services.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
               <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '50%' }}><ArrowRight size={16} color="#64748b" /></div>
            </div>
          </div>
          {/* Card 8 */}
          <div className="card" style={{ padding: '2rem', background: 'white', borderRadius: '1rem', border: '1px solid #e2e8f0', transition: 'transform 0.2s', cursor: 'pointer' }}>
            <div style={{ background: '#ffedd5', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <FileText color="#ea580c" size={24} />
            </div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.75rem' }}>Secure Medical Documents</h3>
            <p className="text-muted" style={{ fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>Upload, store and manage all your medical documents safely.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
               <div style={{ background: '#f1f5f9', padding: '0.5rem', borderRadius: '50%' }}><ArrowRight size={16} color="#64748b" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section style={{ padding: '6rem 4rem', background: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '1rem' }}>One Connected Healthcare Ecosystem</h2>
        <p className="text-muted" style={{ fontSize: '1.125rem', marginBottom: '4rem' }}>Different modules. One platform. Complete healthcare interoperability.</p>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', maxWidth: '1000px', margin: '0 auto' }}>
           {/* Hospital */}
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
             <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Building2 color="#6366f1" size={40} />
             </div>
             <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Hospital</h4>
             <p className="text-muted" style={{ fontSize: '0.75rem' }}>Patient data, records,<br/>reports & more</p>
           </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 0.5 }}>
             <Lock size={16} color="#94a3b8" style={{ marginBottom: '0.25rem' }} />
             <span style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Secure Data Flow</span>
             <div style={{ width: '100%', height: '2px', background: '#e2e8f0', marginTop: '0.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', right: 0, top: '-4px', borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '5px solid #e2e8f0' }}></div>
             </div>
           </div>

           {/* Patient */}
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
             <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <UserCircle color="#3b82f6" size={40} />
             </div>
             <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Patient</h4>
             <p className="text-muted" style={{ fontSize: '0.75rem' }}>Unified health records,<br/>appointments & access</p>
           </div>

           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 0.5 }}>
             <Lock size={16} color="#94a3b8" style={{ marginBottom: '0.25rem' }} />
             <span style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Secure Data Flow</span>
             <div style={{ width: '100%', height: '2px', background: '#e2e8f0', marginTop: '0.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', right: 0, top: '-4px', borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '5px solid #e2e8f0' }}></div>
             </div>
           </div>

           {/* Pharmacy */}
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
             <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Pill color="#10b981" size={40} />
             </div>
             <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Pharmacy</h4>
             <p className="text-muted" style={{ fontSize: '0.75rem' }}>Prescriptions, inventory,<br/>medicine tracking</p>
           </div>

           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 0.5 }}>
             <Lock size={16} color="#94a3b8" style={{ marginBottom: '0.25rem' }} />
             <span style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>Secure Data Flow</span>
             <div style={{ width: '100%', height: '2px', background: '#e2e8f0', marginTop: '0.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', right: 0, top: '-4px', borderTop: '5px solid transparent', borderBottom: '5px solid transparent', borderLeft: '5px solid #e2e8f0' }}></div>
             </div>
           </div>

           {/* Emergency */}
           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
             <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Ambulance color="#dc2626" size={40} />
             </div>
             <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Emergency Services</h4>
             <p className="text-muted" style={{ fontSize: '0.75rem' }}>Location sharing,<br/>rapid response</p>
           </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '0 4rem 4rem' }}>
        <div style={{ background: 'linear-gradient(to right, #6366f1, #06b6d4, #10b981)', borderRadius: '1.5rem', padding: '4rem', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
          {/* Abstract curve background graphic */}
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '40%', opacity: 0.2, backgroundImage: 'radial-gradient(circle at right, white 10%, transparent 50%)' }}></div>
          <Activity size={300} style={{ position: 'absolute', right: '-50px', opacity: 0.1 }} />
          
          <div style={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, fontSize: '0.875rem', marginBottom: '1rem', opacity: 0.9 }}>Better Connectivity. Healthier Tomorrows.</p>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: '1.1' }}>Healthcare, connected for everyone.</h2>
            <p style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: '0' }}>Join the CareChain ecosystem and be part of a smarter, safer and more connected healthcare future.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', zIndex: 1, minWidth: '200px' }}>
            <button className="btn" style={{ background: 'white', color: '#6366f1', padding: '1rem 2rem', borderRadius: '2rem', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={() => setIsLoginModalOpen(true)}>
              Get Started <ArrowRight size={18} />
            </button>
            <button className="btn" style={{ background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.5)', padding: '1rem 2rem', borderRadius: '2rem', fontWeight: 600, fontSize: '1rem' }}>
              Explore Platform
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'white', borderTop: '1px solid var(--border)', padding: '4rem 4rem 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem' }}>
          <div style={{ maxWidth: '300px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', padding: '0.5rem', borderRadius: '0.5rem' }}>
                <Activity color="white" size={24} />
              </div>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>CareChain</span>
            </div>
            <p className="text-muted" style={{ fontSize: '0.875rem' }}>Connected Care. Better Tomorrow.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '6rem' }}>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Platform</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><a href="#" className="text-muted" style={{ fontSize: '0.875rem' }}>Hospital / Admin</a></li>
                <li><a href="#" className="text-muted" style={{ fontSize: '0.875rem' }}>Pharmacy</a></li>
                <li><a href="#" className="text-muted" style={{ fontSize: '0.875rem' }}>Patient Portal</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Solutions</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><a href="#" className="text-muted" style={{ fontSize: '0.875rem' }}>For Hospitals</a></li>
                <li><a href="#" className="text-muted" style={{ fontSize: '0.875rem' }}>For Pharmacies</a></li>
                <li><a href="#" className="text-muted" style={{ fontSize: '0.875rem' }}>For Patients</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><a href="#" className="text-muted" style={{ fontSize: '0.875rem' }}>About Us</a></li>
                <li><a href="#" className="text-muted" style={{ fontSize: '0.875rem' }}>Careers</a></li>
                <li><a href="#" className="text-muted" style={{ fontSize: '0.875rem' }}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href="#" className="text-muted"><Globe size={20} /></a>
                <a href="#" className="text-muted"><ExternalLink size={20} /></a>
                <a href="#" className="text-muted"><Heart size={20} /></a>
                <a href="#" className="text-muted"><Activity size={20} /></a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
          <p className="text-muted">© 2026 CareChain. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" className="text-muted">Privacy Policy</a>
            <a href="#" className="text-muted">Terms of Service</a>
            <a href="#" className="text-muted">Support</a>
          </div>
        </div>
      </footer>

      {/* Login Modal Overlay */}
      {isLoginModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }} onClick={() => setIsLoginModalOpen(false)}></div>
          <div style={{ position: 'relative', zIndex: 1001, width: '100%', maxWidth: '450px' }}>
            <button 
              onClick={() => setIsLoginModalOpen(false)}
              style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 1002, background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <X size={24} />
            </button>
            <Login isModal={true} />
          </div>
        </div>
      )}
    </div>
  );
}
