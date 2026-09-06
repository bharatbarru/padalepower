'use client';

import React, { useEffect, useState } from 'react';
import { fetchAllFeedbackForAdmin, fetchAllServiceRequests, logoutAdminUser } from '../../services/dataService';
import type { CustomerFeedback, ServiceRequest } from '../../types';

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '123456';

const formatDateTime = (value?: string) => {
  if (!value) return '—';

  try {
    return new Date(value).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  } catch {
    return value;
  }
};

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [feedback, setFeedback] = useState<CustomerFeedback[]>([]);

  useEffect(() => {
    const savedAuth = typeof window !== 'undefined' ? localStorage.getItem('demo_admin_authed') === 'true' : false;
    setIsAuthenticated(savedAuth);

    if (savedAuth) {
      loadAdminData();
    }
  }, []);

  const loadAdminData = async () => {
    setLoadingData(true);
    try {
      const [requests, feedbackItems] = await Promise.all([
        fetchAllServiceRequests(),
        fetchAllFeedbackForAdmin()
      ]);

      setServiceRequests(requests);
      setFeedback(feedbackItems);
    } catch (err) {
      console.error('Failed to load admin data', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (username.trim() !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      setError('Invalid credentials. Use admin / 123456');
      return;
    }

    setLoading(true);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('demo_admin_authed', 'true');
      }
      setIsAuthenticated(true);
      await loadAdminData();
    } catch (err) {
      console.error('Admin login failed', err);
      setError('Unable to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutAdminUser();
    setIsAuthenticated(false);
    setServiceRequests([]);
    setFeedback([]);
    setUsername('');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-xl font-black text-yellow-300">
              A
            </div>
            <h1 className="text-2xl font-extrabold text-white">Admin Access</h1>
            <p className="mt-2 text-sm text-slate-300">Enter the protected admin credentials to view submissions.</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-300">Username</label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="admin"
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="123456"
                className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none ring-0 placeholder:text-slate-500 focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Admin Dashboard</p>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900">Submission Records</h1>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
          >
            Logout
          </button>
        </div>

        {loadingData ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-600">Loading data...</div>
        ) : (
          <div className="space-y-8">
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                <h2 className="text-xl font-extrabold text-slate-900">Service Requests</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-4 py-3 font-bold">Name</th>
                      <th className="px-4 py-3 font-bold">Phone</th>
                      <th className="px-4 py-3 font-bold">Company</th>
                      <th className="px-4 py-3 font-bold">Equipment</th>
                      <th className="px-4 py-3 font-bold">Service</th>
                      <th className="px-4 py-3 font-bold">Preferred Date</th>
                      <th className="px-4 py-3 font-bold">Status</th>
                      <th className="px-4 py-3 font-bold">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {serviceRequests.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-slate-500">No service requests found.</td>
                      </tr>
                    ) : (
                      serviceRequests.map((item) => (
                        <tr key={item.id ?? `${item.fullName}-${item.createdAt}`} className="border-t border-slate-200">
                          <td className="px-4 py-3 font-semibold text-slate-900">{item.fullName}</td>
                          <td className="px-4 py-3">{item.phone}</td>
                          <td className="px-4 py-3">{item.companyName || '—'}</td>
                          <td className="px-4 py-3">{item.equipmentType || '—'}</td>
                          <td className="px-4 py-3">{item.serviceRequired}</td>
                          <td className="px-4 py-3">{item.preferredDate || '—'}</td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-600">{formatDateTime(item.createdAt)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                <h2 className="text-xl font-extrabold text-slate-900">Customer Feedback</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-slate-100 text-slate-700">
                    <tr>
                      <th className="px-4 py-3 font-bold">Name</th>
                      <th className="px-4 py-3 font-bold">Contact</th>
                      <th className="px-4 py-3 font-bold">Service</th>
                      <th className="px-4 py-3 font-bold">Rating</th>
                      <th className="px-4 py-3 font-bold">Status</th>
                      <th className="px-4 py-3 font-bold">Testimonial</th>
                      <th className="px-4 py-3 font-bold">Feedback</th>
                      <th className="px-4 py-3 font-bold">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedback.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="px-4 py-8 text-center text-slate-500">No customer feedback found.</td>
                      </tr>
                    ) : (
                      feedback.map((item) => (
                        <tr key={item.id ?? `${item.name}-${item.createdAt}`} className="align-top border-t border-slate-200">
                          <td className="px-4 py-3 font-semibold text-slate-900">{item.name}</td>
                          <td className="px-4 py-3">{item.contact}</td>
                          <td className="px-4 py-3">{item.service}</td>
                          <td className="px-4 py-3">{item.rating} / 5</td>
                          <td className="px-4 py-3">
                            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">{item.testimonialPermission ? 'Yes' : 'No'}</td>
                          <td className="px-4 py-3 max-w-md text-slate-700">{item.feedback}</td>
                          <td className="px-4 py-3 text-slate-600">{formatDateTime(item.createdAt)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
