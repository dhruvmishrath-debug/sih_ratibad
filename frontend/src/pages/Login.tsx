import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Login({ isModal }: { isModal?: boolean } = {}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const routeByEmail = (userEmail: string) => {
    if (userEmail === 'dhruvmishrath@gmail.com' || userEmail === 'hodpital@health.ai') {
      navigate('/hospital');
    } else if (userEmail === 'dhruvmishrata@gmail.com' || userEmail === 'medical@health.ai') {
      navigate('/pharmacy');
    } else if (userEmail === 'dhruvmishrats@gmail.com' || userEmail === 'patient@health.ai') {
      navigate('/patient');
    } else {
      alert(`Email not recognized: ${userEmail}. Please use registered email.`);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== 'Dhruv@2007') {
      alert('Incorrect password!');
      return;
    }
    routeByEmail(email);
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      if (decoded?.email) {
        routeByEmail(decoded.email);
      }
    }
  };

  const content = (
    <div className="card glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem', margin: isModal ? '0 auto' : undefined }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem' }}>
          <Activity color="var(--primary)" size={40} />
        </div>
        <h2>Welcome Back</h2>
        <p className="text-muted text-center" style={{ fontSize: '0.875rem' }}>
          Enter your credentials to access your portal.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            console.log('Login Failed');
            alert('Google Login Failed');
          }}
          useOneTap
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
        <span style={{ padding: '0 1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>OR</span>
        <div style={{ flex: 1, height: '1px', background: 'var(--border)' }}></div>
      </div>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label className="form-label">Email ID</label>
          <input 
            type="email" 
            className="form-control" 
            placeholder="e.g., patient@health.ai" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '0.75rem' }}>
          Sign In
        </button>
      </form>

      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
        <p className="text-muted text-center" style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
          Or use a quick demo login:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={() => { setEmail('hodpital@health.ai'); setPassword('Dhruv@2007'); setTimeout(() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 0); }}
          >
            Demo: Hospital Admin
          </button>
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={() => { setEmail('medical@health.ai'); setPassword('Dhruv@2007'); setTimeout(() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 0); }}
          >
            Demo: Pharmacy (Medical)
          </button>
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={() => { setEmail('patient@health.ai'); setPassword('Dhruv@2007'); setTimeout(() => document.querySelector('form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })), 0); }}
          >
            Demo: Patient Portal
          </button>
        </div>
      </div>
    </div>
  );

  if (isModal) return content;

  return (
    <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--background)' }}>
      {content}
    </div>
  );
}
