'use client';

import React, { useState } from 'react';
import { X, Lock, Key, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { loginAdminUser } from '../services/dataService';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      return setErrorMsg('Please enter both email and password.');
    }

    setLoading(true);

    try {
      const success = await loginAdminUser(email, password);
      if (success) {
        setLoading(false);
        onSuccess();
      } else {
        setLoading(false);
        setErrorMsg('Invalid admin credentials. (Demo Mode: admin@company.com / admin123)');
      }
    } catch (err: unknown) {
      console.error(err);
      setLoading(false);
      setErrorMsg('Login failed. Please check credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-green-600 text-yellow-300 flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">Owner Portal Login</h3>
          <p className="text-xs text-slate-500">
            Secure admin authentication to manage service requests and approve testimonials.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Owner Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@company.com"
                className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl pl-9 pr-3 py-2.5 text-sm text-slate-900 focus:outline-none"
              />
              <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Demo Credentials Hint */}
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-[11px] text-slate-800 font-medium">
            <span className="font-bold text-slate-900">Demo Login Mode:</span>
            <br />Email: <code className="font-bold text-green-800">admin@company.com</code>
            <br />Password: <code className="font-bold text-green-800">admin123</code>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-yellow-300" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Login to Dashboard</span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
