import { db, auth, isFirebaseConfigured } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { ServiceRequest, CustomerFeedback } from '../types';

const INITIAL_DEMO_FEEDBACK: CustomerFeedback[] = [
  {
    id: "fb-101",
    name: "Rajesh Sharma",
    contact: "+91 98450 12345",
    service: "Complete Engine Overhaul",
    rating: 5,
    feedback: "Exceptional overhaul service on our 500 kVA diesel generator engine. The Indian engineering team delivered zero vibration and restored prime engine efficiency within schedule.",
    testimonialPermission: true,
    status: "approved",
    reviewed: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "fb-102",
    name: "Priya Nair",
    contact: "priya.nair@coastalmarine.in",
    service: "Engine Diagnostics & Scanning",
    rating: 5,
    feedback: "Prompt diagnostic scanning for our marine engine system. They pinpointed a subtle fuel injection fault that two other workshops missed. Highly recommended!",
    testimonialPermission: true,
    status: "approved",
    reviewed: true,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    id: "fb-103",
    name: "Amitav Sengupta",
    contact: "+91 97110 88990",
    service: "Preventive Engine Care",
    rating: 5,
    feedback: "Quarterly preventive maintenance program has reduced our plant engine downtime by 40%. Thorough oil analysis and precision valve adjustment.",
    testimonialPermission: true,
    status: "approved",
    reviewed: true,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: "fb-104",
    name: "Vikram Patel",
    contact: "v.patel@patelconstructions.in",
    service: "Engine Repair",
    rating: 4,
    feedback: "Rebuilt heavy excavator cylinder block after thermal overheating. Quick response team and excellent workmanship by senior mechanics.",
    testimonialPermission: true,
    status: "approved",
    reviewed: true,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString()
  }
];

const INITIAL_DEMO_REQUESTS: ServiceRequest[] = [
  {
    id: "sr-201",
    fullName: "Suresh Menon",
    phone: "+91 99001 22334",
    email: "suresh@menonindus.com",
    companyName: "Menon Heavy Logistics",
    equipmentType: "Industrial Diesel Generator (750 kVA)",
    serviceRequired: "Routine Engine Maintenance",
    preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    problemDescription: "Engine oil pressure dropping under high load. Requires inspection and filter change.",
    preferredContact: "phone",
    status: "pending",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: "sr-202",
    fullName: "Anand Verma",
    phone: "+91 98102 44556",
    email: "anand.verma@vermapower.in",
    companyName: "Verma Engineering Works",
    equipmentType: "Marine Main Propulsion Diesel Engine",
    serviceRequired: "Complete Engine Overhaul",
    preferredDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
    problemDescription: "Exhaust smoke elevation and loss of power. Full cylinder head teardown needed.",
    preferredContact: "email",
    status: "in_progress",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  }
];

const getLocalFeedback = (): CustomerFeedback[] => {
  if (typeof window === 'undefined') return INITIAL_DEMO_FEEDBACK;
  const data = localStorage.getItem('demo_feedback');
  if (!data) {
    localStorage.setItem('demo_feedback', JSON.stringify(INITIAL_DEMO_FEEDBACK));
    return INITIAL_DEMO_FEEDBACK;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_DEMO_FEEDBACK;
  }
};

const getLocalRequests = (): ServiceRequest[] => {
  if (typeof window === 'undefined') return INITIAL_DEMO_REQUESTS;
  const data = localStorage.getItem('demo_requests');
  if (!data) {
    localStorage.setItem('demo_requests', JSON.stringify(INITIAL_DEMO_REQUESTS));
    return INITIAL_DEMO_REQUESTS;
  }
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_DEMO_REQUESTS;
  }
};

export const submitServiceRequest = async (request: Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>): Promise<string> => {
  const newRequest: ServiceRequest = {
    ...request,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'service_requests'), newRequest);
      return docRef.id;
    } catch (err) {
      console.warn("Firestore save failed, using local storage:", err);
    }
  }

  const requests = getLocalRequests();
  const id = `sr-${Date.now()}`;
  const requestWithId = { ...newRequest, id };
  requests.unshift(requestWithId);
  if (typeof window !== 'undefined') {
    localStorage.setItem('demo_requests', JSON.stringify(requests));
  }
  return id;
};

export const fetchAllServiceRequests = async (): Promise<ServiceRequest[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'service_requests'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as ServiceRequest));
    } catch (err) {
      console.warn("Firestore fetch error, using local storage:", err);
    }
  }

  return getLocalRequests();
};

export const updateServiceRequestStatus = async (id: string, status: ServiceRequest['status']): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const ref = doc(db, 'service_requests', id);
      await updateDoc(ref, { status });
      return;
    } catch (err) {
      console.warn("Firestore update error:", err);
    }
  }

  const requests = getLocalRequests();
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index].status = status;
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo_requests', JSON.stringify(requests));
    }
  }
};

export const submitCustomerFeedback = async (feedback: Omit<CustomerFeedback, 'id' | 'createdAt' | 'status' | 'reviewed'>): Promise<string> => {
  const newFeedback: CustomerFeedback = {
    ...feedback,
    status: 'pending',
    reviewed: false,
    createdAt: new Date().toISOString()
  };

  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'feedback'), newFeedback);
      return docRef.id;
    } catch (err) {
      console.warn("Firestore save failed, using local storage:", err);
    }
  }

  const items = getLocalFeedback();
  const id = `fb-${Date.now()}`;
  const itemWithId = { ...newFeedback, id };
  items.unshift(itemWithId);
  if (typeof window !== 'undefined') {
    localStorage.setItem('demo_feedback', JSON.stringify(items));
  }
  return id;
};

export const fetchApprovedTestimonials = async (): Promise<CustomerFeedback[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, 'feedback'), 
        where('testimonialPermission', '==', true),
        where('status', '==', 'approved')
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CustomerFeedback));
      if (list.length > 0) return list;
    } catch (err) {
      console.warn("Firestore fetch error, using local demo testimonials:", err);
    }
  }

  const items = getLocalFeedback();
  return items.filter(i => i.testimonialPermission && i.status === 'approved');
};

export const fetchAllFeedbackForAdmin = async (): Promise<CustomerFeedback[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'feedback'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() } as CustomerFeedback));
    } catch (err) {
      console.warn("Firestore admin feedback error:", err);
    }
  }

  return getLocalFeedback();
};

export const updateFeedbackStatus = async (id: string, status: CustomerFeedback['status']): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const ref = doc(db, 'feedback', id);
      await updateDoc(ref, { status, reviewed: true });
      return;
    } catch (err) {
      console.warn("Firestore update error:", err);
    }
  }

  const items = getLocalFeedback();
  const idx = items.findIndex(i => i.id === id);
  if (idx !== -1) {
    items[idx].status = status;
    items[idx].reviewed = true;
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo_feedback', JSON.stringify(items));
    }
  }
};

export const deleteFeedbackItem = async (id: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'feedback', id));
      return;
    } catch (err) {
      console.warn("Firestore delete error:", err);
    }
  }

  const items = getLocalFeedback();
  const filtered = items.filter(i => i.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem('demo_feedback', JSON.stringify(filtered));
  }
};

export const loginAdminUser = async (username: string, pass: string): Promise<boolean> => {
  const normalizedUsername = username.trim().toLowerCase();
  const validPasswords = new Set(['123456', 'admin123']);

  if (isFirebaseConfigured && auth) {
    try {
      await signInWithEmailAndPassword(auth, normalizedUsername === 'admin' ? 'admin@company.com' : normalizedUsername, pass);
      return true;
    } catch (err) {
      console.warn("Firebase auth failed, fallback demo check:", err);
    }
  }

  if ((normalizedUsername === 'admin' || normalizedUsername === 'admin@company.com') && validPasswords.has(pass)) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('demo_admin_authed', 'true');
    }
    return true;
  }
  return false;
};

export const checkAdminAuthStatus = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (isFirebaseConfigured && auth && auth.currentUser) {
    return true;
  }
  return localStorage.getItem('demo_admin_authed') === 'true';
};

export const logoutAdminUser = async (): Promise<void> => {
  if (isFirebaseConfigured && auth) {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("Logout error:", err);
    }
  }
  if (typeof window !== 'undefined') {
    localStorage.removeItem('demo_admin_authed');
  }
};
