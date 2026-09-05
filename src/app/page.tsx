import React, { useState } from 'react';
import { COMPANY_CONFIG } from '../config/companyConfig';

export const metadata = {
  title: `${COMPANY_CONFIG.name} — Generator & Electrical Servicing in Visakhapatnam`,
  description: `${COMPANY_CONFIG.name} provides precision generator engine maintenance, alternator servicing, AVR testing, diagnostics, overhauling, and AMC solutions in Visakhapatnam. Contact ${COMPANY_CONFIG.phone} for service.`,
};
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { AboutUs } from '../components/AboutUs';
import { Services } from '../components/Services';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Process } from '../components/Process';
import { Equipment } from '../components/Equipment';
import { ServiceRequestModal } from '../components/ServiceRequestModal';
import { ContactSection } from '../components/ContactSection';
import { FeedbackSection } from '../components/FeedbackSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { AdminDashboard } from '../components/AdminDashboard';
import { AdminLoginModal } from '../components/AdminLoginModal';
import { Footer } from '../components/Footer';

export default function Home() {
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string | undefined>(undefined);
  
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  const handleOpenRequestModal = (serviceTitle?: string) => {
    setSelectedServiceForModal(serviceTitle);
    setRequestModalOpen(true);
  };

  const handleAdminLoginSuccess = () => {
    setAdminLoginModalOpen(false);
    setAdminDashboardOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* 1. Header Navigation Bar */}
      <Navbar
        onRequestService={handleOpenRequestModal}
        onOpenAdminModal={() => setAdminLoginModalOpen(true)}
      />

      {/* 2. Hero Section */}
      <Hero
        onRequestService={() => handleOpenRequestModal()}
      />

      {/* 3. About Us Section */}
      <AboutUs />

      {/* 4. Services Section */}
      <Services
        onRequestService={handleOpenRequestModal}
      />

      {/* 5. Why Choose Us Section */}
      <WhyChooseUs />

      {/* 6. Service Process Timeline */}
      <Process />

      {/* 7. Equipment / Applications Showcase */}
      <Equipment />

      {/* 8. Contact Section */}
      <ContactSection />

      {/* 9. Customer Feedback Section */}
      <FeedbackSection />

      {/* 10. Public Testimonials Section (Displays Owner Approved Feedback) */}
      <TestimonialsSection />

      {/* 11. Footer */}
      <Footer
        onOpenAdminModal={() => setAdminLoginModalOpen(true)}
        onRequestService={() => handleOpenRequestModal()}
      />

      {/* Service Request Popup Modal */}
      <ServiceRequestModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        defaultService={selectedServiceForModal}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={adminLoginModalOpen}
        onClose={() => setAdminLoginModalOpen(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* Admin / Owner Dashboard */}
      <AdminDashboard
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
        onLogout={() => setAdminDashboardOpen(false)}
      />

    </main>
  );
}
