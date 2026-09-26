import { useState } from 'react';
import logo1 from '@/assets/logo1.png';

interface LoginProps {
  onLogin: (userId: string, password: string) => boolean;
}

const DEMO_CREDS = [
  { id: 'emp001', role: 'Employee', color: '#E8640A' },
  { id: 'mgr001', role: 'Store Manager', color: '#5C3317' },
  { id: 'area001', role: 'Area Manager', color: '#16697A' },
  { id: 'ops001', role: 'Operations Manager', color: '#2D6A4F' },
  { id: 'gm001', role: 'General Manager', color: '#1D3557' },
  { id: 'rd001', role: 'R&D Director', color: '#6B2D8B' },
  { id: 'ceo001', role: 'CEO', color: '#E8640A' },
];

export default function Login({ onLogin }: LoginProps) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setTimeout(() => {
      const ok = onLogin(userId.trim(), password);
      if (!ok) setError('Invalid User ID or Password. Please try again.');
      setLoading(false);
    }, 600);
  };

  const fillDemo = (id: string) => {
    setUserId(id);
    setPassword('1234');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #E8640A 0%, #C04D00 40%, #5C3317 100%)' }}>

      {/* Background coffee bean decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${60 + i * 30}px`,
              height: `${60 + i * 30}px`,
              background: 'white',
              top: `${10 + i * 12}%`,
              left: `${-5 + (i % 4) * 30}%`,
              transform: `rotate(${i * 25}deg)`,
            }}
          />
        ))}
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10 rounded-full bg-white transform translate-x-16 translate-y-16" />
        <div className="absolute top-0 left-0 w-48 h-48 opacity-10 rounded-full bg-white -translate-x-12 -translate-y-12" />
      </div>

      <div className="relative w-full max-w-md mx-4">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header band */}
          <div className="h-2" style={{ background: 'linear-gradient(90deg, #E8640A, #F7A45C, #5C3317)' }} />

          <div className="px-8 pt-8 pb-10">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <img src={logo1} alt="Barzilio Coffee & Bakery" className="w-24 h-24 rounded-2xl shadow-md mb-4 object-cover" />
              <h1 className="text-2xl font-800 text-bz-brown">Barzilio ERP</h1>
              <p className="text-sm text-gray-500 font-400 mt-0.5">Coffee & Bakery Management System</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-600 text-bz-brown mb-1.5 uppercase tracking-wide">User ID</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    placeholder="Enter your User ID"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-500 focus:outline-none focus:border-bz-orange transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-600 text-bz-brown mb-1.5 uppercase tracking-wide">Password</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm font-500 focus:outline-none focus:border-bz-orange transition-colors"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-600 text-white text-sm transition-all active:scale-98 disabled:opacity-70"
                style={{ background: loading ? '#aaa' : 'linear-gradient(135deg, #E8640A, #C04D00)' }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6">
              <button
                onClick={() => setShowDemo(!showDemo)}
                className="w-full text-xs text-gray-400 hover:text-bz-orange transition-colors flex items-center justify-center gap-1"
              >
                <span>Demo credentials</span>
                <svg className={`w-3 h-3 transition-transform ${showDemo ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showDemo && (
                <div className="mt-3 grid grid-cols-2 gap-1.5">
                  {DEMO_CREDS.map(c => (
                    <button
                      key={c.id}
                      onClick={() => fillDemo(c.id)}
                      className="text-left px-2.5 py-2 rounded-lg border border-gray-100 hover:border-bz-orange-light transition-all text-xs group"
                    >
                      <div className="font-600 text-gray-700 group-hover:text-bz-orange">{c.id}</div>
                      <div className="text-gray-400 truncate" style={{ color: c.color, opacity: 0.8 }}>{c.role}</div>
                    </button>
                  ))}
                </div>
              )}
              {showDemo && (
                <p className="text-center text-xs text-gray-400 mt-2">All passwords: <span className="font-600 text-bz-brown">1234</span></p>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-white/60 text-xs mt-6">
          © 2026 Barzilio Coffee & Bakery · All rights reserved
        </p>
      </div>
    </div>
  );
}
