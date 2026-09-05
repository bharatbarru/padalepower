'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Star, 
  Filter, 
  RefreshCw, 
  LogOut, 
  ShieldCheck, 
  ClipboardList, 
  MessageSquare,
  Mail,
  Clock,
  CheckCheck,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { ServiceRequest, CustomerFeedback } from '../types';
import { 
  fetchAllServiceRequests, 
  updateServiceRequestStatus, 
  fetchAllFeedbackForAdmin, 
  updateFeedbackStatus, 
  deleteFeedbackItem, 
  logoutAdminUser 
} from '../services/dataService';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'feedback' | 'notifications'>('requests');
  
  // Data state
  const [feedbackList, setFeedbackList] = useState<CustomerFeedback[]>([]);
  const [requestsList, setRequestsList] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [feedbackStatusFilter, setFeedbackStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
  const [requestStatusFilter, setRequestStatusFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed' | 'cancelled'>('all');
  const [requestsTableView, setRequestsTableView] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [fb, reqs] = await Promise.all([
        fetchAllFeedbackForAdmin(),
        fetchAllServiceRequests()
      ]);
      setFeedbackList(fb);
      setRequestsList(reqs);
    } catch (err) {
      console.error("Failed loading admin dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogout = async () => {
    await logoutAdminUser();
    onLogout();
  };

  // Feedback Actions
  const handleApproveFeedback = async (id: string) => {
    await updateFeedbackStatus(id, 'approved');
    loadData();
  };

  const handleRejectFeedback = async (id: string) => {
    await updateFeedbackStatus(id, 'rejected');
    loadData();
  };

  const handleDeleteFeedback = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer feedback?")) {
      await deleteFeedbackItem(id);
      loadData();
    }
  };

  // Service Request Actions
  const handleUpdateRequestStatus = async (id: string, status: ServiceRequest['status']) => {
    await updateServiceRequestStatus(id, status);
    loadData();
  };

  // Analytics Math
  const totalFeedbackCount = feedbackList.length;
  const avgRating = totalFeedbackCount > 0
    ? (feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / totalFeedbackCount).toFixed(1)
    : "0.0";
  const approvedTestimonialsCount = feedbackList.filter(f => f.status === 'approved').length;

  const totalRequestsCount = requestsList.length;
  const pendingRequestsCount = requestsList.filter(r => r.status === 'pending').length;
  const inProgressRequestsCount = requestsList.filter(r => r.status === 'in_progress').length;
  const completedRequestsCount = requestsList.filter(r => r.status === 'completed').length;
  const cancelledRequestsCount = requestsList.filter(r => r.status === 'cancelled').length;

  // Filtered Feedback Data
  const filteredFeedback = feedbackList.filter(item => {
    if (feedbackStatusFilter !== 'all' && item.status !== feedbackStatusFilter) return false;
    if (ratingFilter !== 'all' && item.rating !== ratingFilter) return false;
    return true;
  });

  // Filtered Requests Data
  const filteredRequests = requestsList.filter(item => {
    if (requestStatusFilter !== 'all' && item.status !== requestStatusFilter) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-900/70 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-white border border-slate-200 rounded-3xl p-4 sm:p-8 shadow-2xl my-4 min-h-[85vh] flex flex-col justify-between text-slate-900">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-green-600 text-yellow-300 flex items-center justify-center shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Owner & Admin Management Portal</h2>
              <p className="text-xs text-slate-500">Filter & manage engine service requests by status and date, and review customer feedback.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="p-2.5 text-slate-700 hover:text-green-700 bg-slate-100 hover:bg-green-50 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-200"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 text-green-600 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-xl"
              aria-label="Close Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold uppercase">Total Requests</p>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-extrabold text-slate-900">{totalRequestsCount}</span>
              <span className="text-xs font-bold text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded-lg">{pendingRequestsCount} Pending</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold uppercase">In Progress</p>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-extrabold text-blue-700">{inProgressRequestsCount}</span>
              <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-lg">Active Jobs</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold uppercase">Completed Jobs</p>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-extrabold text-green-700">{completedRequestsCount}</span>
              <span className="text-xs font-bold text-green-800 bg-green-100 px-2 py-0.5 rounded-lg">Resolved</span>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs text-slate-500 font-bold uppercase">Customer Reviews</p>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-extrabold text-slate-900">{totalFeedbackCount}</span>
              <span className="text-xs font-bold text-green-700">{avgRating} ★ Avg</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2 mb-6">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
              activeTab === 'requests'
                ? 'bg-green-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-yellow-300" />
            <span>Service Requests ({requestsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
              activeTab === 'feedback'
                ? 'bg-green-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-yellow-300" />
            <span>Customer Feedback ({feedbackList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-5 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
              activeTab === 'notifications'
                ? 'bg-green-600 text-white shadow'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100'
            }`}
          >
            <Mail className="w-4 h-4 text-yellow-300" />
            <span>Owner Email Setup</span>
          </button>
        </div>

        {/* Tab 1: Service Requests Management */}
        {activeTab === 'requests' && (
          <div className="space-y-4 flex-1">
            
            {/* Request Status Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setRequestsTableView((v) => !v)}
                    className="px-3 py-1.5 rounded-xl font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  >
                    {requestsTableView ? 'Card View' : 'Table View'}
                  </button>
                </div>
              <div className="flex flex-wrap items-center gap-2">
                <Filter className="w-4 h-4 text-green-600 shrink-0" />
                <span className="font-bold text-slate-800 mr-1">Filter Requests by Status:</span>
                
                {/* All */}
                <button
                  onClick={() => setRequestStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                    requestStatusFilter === 'all'
                      ? 'bg-green-600 text-white shadow'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span>All</span>
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] ${requestStatusFilter === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>{totalRequestsCount}</span>
                </button>

                {/* Pending */}
                <button
                  onClick={() => setRequestStatusFilter('pending')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                    requestStatusFilter === 'pending'
                      ? 'bg-yellow-500 text-slate-950 shadow'
                      : 'bg-white text-slate-700 hover:bg-yellow-50 border border-slate-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pending</span>
                  <span className="bg-yellow-100 text-yellow-900 px-1.5 py-0.2 rounded-md text-[10px]">{pendingRequestsCount}</span>
                </button>

                {/* In Progress */}
                <button
                  onClick={() => setRequestStatusFilter('in_progress')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                    requestStatusFilter === 'in_progress'
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>In Progress</span>
                  <span className="bg-blue-100 text-blue-900 px-1.5 py-0.2 rounded-md text-[10px]">{inProgressRequestsCount}</span>
                </button>

                {/* Completed */}
                <button
                  onClick={() => setRequestStatusFilter('completed')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                    requestStatusFilter === 'completed'
                      ? 'bg-green-700 text-white shadow'
                      : 'bg-white text-slate-700 hover:bg-green-50 border border-slate-200'
                  }`}
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Completed</span>
                  <span className="bg-green-100 text-green-900 px-1.5 py-0.2 rounded-md text-[10px]">{completedRequestsCount}</span>
                </button>

                {/* Cancelled */}
                <button
                  onClick={() => setRequestStatusFilter('cancelled')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                    requestStatusFilter === 'cancelled'
                      ? 'bg-slate-700 text-white shadow'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Cancelled</span>
                  <span className="bg-slate-200 text-slate-800 px-1.5 py-0.2 rounded-md text-[10px]">{cancelledRequestsCount}</span>
                </button>

              </div>

              <div className="text-[11px] font-bold text-slate-500">
                Showing <span className="text-green-700 font-extrabold">{filteredRequests.length}</span> of {totalRequestsCount} requests
              </div>
            </div>

            {/* Filtered Requests List */}
            {filteredRequests.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <AlertTriangle className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="font-bold text-slate-700">No service requests found for status: <span className="uppercase text-green-700">{requestStatusFilter.replace('_', ' ')}</span></p>
                <button 
                  onClick={() => setRequestStatusFilter('all')}
                  className="text-xs font-bold text-green-700 hover:underline"
                >
                  Clear Status Filter
                </button>
              </div>
            ) : requestsTableView ? (
                <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 p-3">
                  <table className="min-w-full text-xs text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="px-3 py-2">ID</th>
                        <th className="px-3 py-2">Name</th>
                        <th className="px-3 py-2">Phone</th>
                        <th className="px-3 py-2">Email</th>
                        <th className="px-3 py-2">Service</th>
                        <th className="px-3 py-2">Equipment</th>
                        <th className="px-3 py-2">Preferred Date</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Submitted</th>
                        <th className="px-3 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((req) => (
                        <tr key={req.id} className="border-b hover:bg-slate-50">
                          <td className="px-3 py-2 align-top">{req.id}</td>
                          <td className="px-3 py-2 align-top">{req.fullName}</td>
                          <td className="px-3 py-2 align-top">{req.phone}</td>
                          <td className="px-3 py-2 align-top">{req.email || '-'}</td>
                          <td className="px-3 py-2 align-top">{req.serviceRequired}</td>
                          <td className="px-3 py-2 align-top">{req.equipmentType}</td>
                          <td className="px-3 py-2 align-top">{req.preferredDate || 'Flexible'}</td>
                          <td className="px-3 py-2 align-top">{req.status}</td>
                          <td className="px-3 py-2 align-top">{new Date(req.createdAt).toLocaleString()}</td>
                          <td className="px-3 py-2 align-top">
                            <select
                              value={req.status}
                              onChange={(e) => handleUpdateRequestStatus(req.id!, e.target.value as ServiceRequest['status'])}
                              className="border text-xs rounded-lg px-2 py-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                  {filteredRequests.map((req) => {
                  const createdDateObj = new Date(req.createdAt);
                  const formattedCreatedDate = isNaN(createdDateObj.getTime())
                    ? req.createdAt
                    : createdDateObj.toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      });

                  return (
                    <div
                      key={req.id}
                      className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 space-y-3 shadow-sm hover:border-green-400 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                        <div>
                          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                            <span>{req.fullName}</span>
                            {req.companyName && (
                              <span className="text-xs text-slate-500 font-semibold">({req.companyName})</span>
                            )}
                          </h4>
                          <p className="text-xs text-green-700 font-bold mt-0.5">
                            Equipment: {req.equipmentType || 'General Engine'} • Service: {req.serviceRequired}
                          </p>
                        </div>

                        {/* Dropdown Selector to Change Request Status */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-600">Change Status:</span>
                          <select
                            value={req.status}
                            onChange={(e) => handleUpdateRequestStatus(req.id!, e.target.value as ServiceRequest['status'])}
                            className={`border text-xs font-extrabold rounded-xl px-3 py-1.5 focus:outline-none shadow-sm transition-colors ${
                              req.status === 'pending' ? 'bg-yellow-100 text-yellow-900 border-yellow-300' :
                              req.status === 'in_progress' ? 'bg-blue-100 text-blue-900 border-blue-300' :
                              req.status === 'completed' ? 'bg-green-100 text-green-900 border-green-300' :
                              'bg-slate-200 text-slate-800 border-slate-300'
                            }`}
                          >
                            <option value="pending">🟡 Pending</option>
                            <option value="in_progress">🔵 In Progress</option>
                            <option value="completed">🟢 Completed</option>
                            <option value="cancelled">⚪ Cancelled</option>
                          </select>
                        </div>
                      </div>

                      {req.problemDescription && (
                        <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200">
                          <strong className="text-slate-900">Problem Details:</strong> {req.problemDescription}
                        </p>
                      )}

                      {/* Request Dates Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-slate-600 pt-1 bg-white/70 p-3 rounded-xl border border-slate-200">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Request Date & Time</span>
                          <strong className="text-green-700 font-extrabold flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3.5 h-3.5 text-green-600" />
                            <span>{formattedCreatedDate}</span>
                          </strong>
                        </div>

                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Preferred Service Date</span>
                          <strong className="text-slate-900 font-bold block mt-0.5">
                            {req.preferredDate || 'Flexible Schedule'}
                          </strong>
                        </div>

                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone Line</span>
                          <strong className="text-slate-900 font-bold block mt-0.5">{req.phone}</strong>
                        </div>

                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Preferred Contact</span>
                          <strong className="text-slate-900 uppercase font-bold block mt-0.5">{req.preferredContact}</strong>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Customer Feedback Moderation */}
        {activeTab === 'feedback' && (
          <div className="space-y-4 flex-1">
            
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-green-600" />
                <span className="font-bold text-slate-700">Filter Status:</span>
                {(['all', 'pending', 'approved', 'rejected'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setFeedbackStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg capitalize font-bold ${
                      feedbackStatusFilter === st
                        ? 'bg-green-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">Rating:</span>
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="bg-white border border-slate-200 text-slate-900 font-bold rounded-lg px-2.5 py-1 text-xs"
                >
                  <option value="all">All Stars</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
            </div>

            {/* Feedback Items List */}
            {filteredFeedback.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs bg-slate-50 rounded-2xl border border-slate-200">
                No feedback submissions match the selected filters.
              </div>
            ) : (
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {filteredFeedback.map((fb) => (
                  <div
                    key={fb.id}
                    className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 space-y-3 shadow-sm hover:border-green-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < fb.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-bold text-slate-900">{fb.name}</span>
                        <span className="text-xs text-slate-500">({fb.contact})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {fb.testimonialPermission ? (
                          <span className="text-[10px] bg-green-100 text-green-800 border border-green-200 px-2.5 py-0.5 rounded-md font-bold">
                            Testimonial Permitted
                          </span>
                        ) : (
                          <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                            Private Feedback
                          </span>
                        )}

                        <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md ${
                          fb.status === 'approved' ? 'bg-green-600 text-white' :
                          fb.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-200 text-yellow-900'
                        }`}>
                          {fb.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-slate-700 text-xs italic bg-white p-3.5 rounded-xl border border-slate-200">
                      "{fb.feedback}"
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 pt-1 gap-2">
                      <div>
                        <span>Service: <strong className="text-green-700 font-bold">{fb.service}</strong></span>
                        <span className="mx-2">•</span>
                        <span>Date: <strong className="text-slate-800 font-semibold">{new Date(fb.createdAt).toLocaleString()}</strong></span>
                      </div>

                      {/* Action Controls */}
                      <div className="flex items-center gap-2">
                        {fb.status !== 'approved' && (
                          <button
                            onClick={() => handleApproveFeedback(fb.id!)}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1 transition-colors shadow-sm"
                            title="Approve and Publish to Public Testimonials"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-yellow-300" />
                            <span>Approve Testimonial</span>
                          </button>
                        )}

                        {fb.status !== 'rejected' && (
                          <button
                            onClick={() => handleRejectFeedback(fb.id!)}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-2.5 py-1 rounded-lg text-xs flex items-center gap-1"
                          >
                            <XCircle className="w-3.5 h-3.5 text-slate-500" />
                            <span>Reject</span>
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteFeedback(fb.id!)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 p-1.5 rounded-lg border border-red-200 transition-colors"
                          title="Delete Feedback"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Tab 3: Owner Email Setup */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 flex-1 text-xs text-slate-700 bg-slate-50 p-6 rounded-2xl border border-slate-200 overflow-y-auto max-h-[50vh]">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-green-600" />
              <span>Owner Email Notification Architecture</span>
            </h3>
            
            <p className="leading-relaxed">
              When a customer submits a <strong>Service Request</strong> or <strong>Customer Feedback</strong>, an automated notification event is dispatched.
            </p>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-green-800">Firebase Cloud Functions Configuration:</h4>
              <p>
                We have included a production ready Cloud Functions template in <code className="text-green-700 font-bold">functions/index.js</code>. Deploy it to your Firebase Console using:
              </p>

              <pre className="bg-slate-900 text-yellow-300 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
{`cd functions
npm install
firebase deploy --only functions`}
              </pre>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
              <h4 className="font-bold text-green-800">Custom Webhook Integration:</h4>
              <p>
                Or provide your custom SendGrid / Zapier / Make email webhook URL in environment variable:
              </p>
              <code className="block bg-slate-900 text-yellow-300 p-2.5 rounded-lg font-mono">
                NEXT_PUBLIC_OWNER_NOTIFICATION_WEBHOOK_URL="https://your-webhook-service.com/notify"
              </code>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500 font-medium">
          <span>Logged in as Owner Admin</span>
          <span>PADALA E-POWER Admin Portal</span>
        </div>

      </div>
    </div>
  );
};
