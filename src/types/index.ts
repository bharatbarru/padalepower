export type ServiceCategory = 
  | 'all' 
  | 'maintenance' 
  | 'repair' 
  | 'diagnostics' 
  | 'overhaul' 
  | 'testing';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  recommendedInterval: string;
}

export interface ServiceRequest {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  companyName?: string;
  equipmentType?: string;
  serviceRequired: string;
  preferredDate?: string;
  problemDescription?: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface CustomerFeedback {
  id?: string;
  name: string;
  contact: string;
  service: string;
  rating: number; // 1 to 5
  feedback: string;
  testimonialPermission: boolean;
  reviewed?: boolean;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface AdminUser {
  uid: string;
  email: string;
}
