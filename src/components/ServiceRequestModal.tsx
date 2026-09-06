'use client';

import React, { useState } from 'react';
import { X, Wrench, Calendar, Phone, Mail, Building, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitServiceRequest } from '../services/dataService';
import { triggerOwnerNotification } from '../services/notificationService';
import { ENGINE_SERVICES } from './Services';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({
  isOpen,
  onClose,
  defaultService = ''
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [equipmentType, setEquipmentType] = useState('Industrial Diesel Generator Engine');
  const [customEquipment, setCustomEquipment] = useState('');
  const [serviceRequired, setServiceRequired] = useState(defaultService || ENGINE_SERVICES[0].title);
  const [preferredDate, setPreferredDate] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [preferredContact, setPreferredContact] = useState<'phone' | 'email' | 'whatsapp'>('phone');
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (honeypot) return setErrorMsg('Spam check failed. Please try again.');

    // Only Full Name and Phone Number are required!
    if (!fullName.trim()) return setErrorMsg('Please enter your full name.');
    if (!phone.trim()) return setErrorMsg('Please enter your phone number.');

    const finalEquipment = equipmentType === 'Other' ? (customEquipment || 'General Engine') : equipmentType;

    setLoading(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        companyName: companyName.trim() || undefined,
        equipmentType: finalEquipment,
        serviceRequired,
        preferredDate: preferredDate || undefined,
        problemDescription: problemDescription.trim() || undefined,
        preferredContact
      };

      const requestId = await submitServiceRequest(payload);
      
      triggerOwnerNotification('service_request', { ...payload, id: requestId, status: 'pending', createdAt: new Date().toISOString() });

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }

      setSuccess(true);
      setLoading(false);
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg('Failed to submit service request. Please try again or call support.');
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setCompanyName('');
    setPreferredDate('');
    setProblemDescription('');
    setSuccess(false);
    setErrorMsg('');
    setHoneypot('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          /* Success Screen */
          <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 border border-green-200 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Service Request Submitted!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you, <strong className="text-green-700">{fullName}</strong>. Our engineering service team has received your request and will contact you via {preferredContact} shortly.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left text-xs space-y-2.5 max-w-md mx-auto text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Name:</span>
                <span className="font-bold text-slate-900">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="font-bold text-green-700">{phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service Required:</span>
                <span className="font-bold text-slate-900">{serviceRequired}</span>
              </div>
              {preferredDate && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Preferred Date:</span>
                  <span className="font-bold text-slate-900">{preferredDate}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleResetAndClose}
              className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all"
            >
              Done / Return to Site
            </button>
          </div>
        ) : (
          /* Request Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Wrench className="w-3.5 h-3.5" />
                <span>Engine Maintenance Portal</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Request a Service
              </h3>
              <p className="text-slate-600 text-xs mt-1">
                Fill out your name and phone number below. All other fields are optional.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div
              aria-hidden="true"
              className="hidden"
              style={{ position: 'absolute', left: '-9999px', pointerEvents: 'none' }}
            >
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            {/* Input Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name (REQUIRED) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-green-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rajesh Kumar"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
                />
              </div>

              {/* Phone Number (REQUIRED) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number <span className="text-green-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 96031 09512"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
                />
              </div>

              {/* Email Address (OPTIONAL) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rajesh@company.in"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
                />
              </div>

              {/* Company Name (OPTIONAL) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company Name <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Acme Engineering Works"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
                />
              </div>

              {/* Equipment Type Dropdown (OPTIONAL) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Equipment / Engine Type <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <select
                  value={equipmentType}
                  onChange={(e) => setEquipmentType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
                >
                  <option value="Industrial Diesel Generator Engine">Industrial Diesel Generator Engine</option>
                  <option value="Marine Propulsion Diesel Engine">Marine Propulsion Diesel Engine</option>
                  <option value="Heavy Machinery Diesel Engine">Heavy Machinery Engine (Excavator/Crane)</option>
                  <option value="Commercial Vehicle Engine">Commercial Heavy Vehicle Engine</option>
                  <option value="Stationary Pump/Compressor Engine">Stationary Pump/Compressor Engine</option>
                  <option value="Other">Other Engine Type...</option>
                </select>
              </div>

              {/* Custom Equipment Input if 'Other' (OPTIONAL) */}
              {equipmentType === 'Other' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Specify Engine Details <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={customEquipment}
                    onChange={(e) => setCustomEquipment(e.target.value)}
                    placeholder="Make, Model & Horsepower"
                    className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
                  />
                </div>
              )}

              {/* Service Required Dropdown (OPTIONAL) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Service Required <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <select
                  value={serviceRequired}
                  onChange={(e) => setServiceRequired(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
                >
                  {ENGINE_SERVICES.map(s => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              {/* Preferred Date (OPTIONAL) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Date <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
                />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Contact Method <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="flex gap-4 pt-1">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer font-semibold">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="phone"
                      checked={preferredContact === 'phone'}
                      onChange={() => setPreferredContact('phone')}
                      className="accent-green-600"
                    />
                    <span>Phone Call</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer font-semibold">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="whatsapp"
                      checked={preferredContact === 'whatsapp'}
                      onChange={() => setPreferredContact('whatsapp')}
                      className="accent-green-600"
                    />
                    <span>WhatsApp</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer font-semibold">
                    <input
                      type="radio"
                      name="contactMethod"
                      value="email"
                      checked={preferredContact === 'email'}
                      onChange={() => setPreferredContact('email')}
                      className="accent-green-600"
                    />
                    <span>Email</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Description of Problem (OPTIONAL) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description of Engine Problem / Requirements <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={3}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Describe symptoms, noise, oil pressure issues, smoke, or maintenance scope..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-green-600 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none transition-colors"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-yellow-300" />
                  <span>Submitting Service Request...</span>
                </>
              ) : (
                <span>Submit Service Request</span>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
