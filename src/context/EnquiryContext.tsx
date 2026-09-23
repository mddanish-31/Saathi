import React, { createContext, useContext, useState, useEffect } from 'react';
import { EnquiryData, EnquiryContextType } from '../types';

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

const ENQUIRIES_STORAGE_KEY = 'saathi_customer_enquiries';

const INITIAL_DEMO_ENQUIRIES: EnquiryData[] = [
  {
    id: 'enq-101',
    professionalId: 'pro-aura-weddings',
    professionalName: 'Kavya & Rohan Singhal',
    professionalBrand: 'Aura Bespoke Wedding Curators',
    customerName: 'Aanya Sharma',
    customerEmail: 'aanya.sharma@example.com',
    customerPhone: '+91 98201 54321',
    serviceId: 'wedding-planning',
    serviceName: 'Full-Service Wedding Planning',
    eventDate: '2026-11-20',
    eventLocation: 'Udaipur, Rajasthan',
    budgetRange: '₹15L - ₹25L',
    message: 'We are planning a 3-day royal palace wedding in Udaipur for approx 250 guests. We need comprehensive planning, vendor curation, and hospitality logistics management.',
    status: 'reviewed',
    createdAt: '2026-09-15T14:30:00.000Z',
  },
  {
    id: 'enq-102',
    professionalId: 'pro-vedic-heritage',
    professionalName: 'Pt. Devang Shastri & Team',
    professionalBrand: 'Vedic Heritage Traditional Celebrations',
    customerName: 'Aanya Sharma',
    customerEmail: 'aanya.sharma@example.com',
    customerPhone: '+91 98201 54321',
    serviceId: 'wedding-coordination',
    serviceName: 'Day-of & Ritual Coordination',
    eventDate: '2026-10-12',
    eventLocation: 'South Mumbai, Maharashtra',
    budgetRange: '₹3L - ₹5L',
    message: 'Need on-ground coordination for ritual timelines, sangeet cue management, and guest ushering for our Mumbai reception.',
    status: 'pending',
    createdAt: '2026-09-20T09:15:00.000Z',
  },
];

export const EnquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enquiries, setEnquiries] = useState<EnquiryData[]>(() => {
    try {
      const saved = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_DEMO_ENQUIRIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
    } catch {
      // ignore
    }
  }, [enquiries]);

  const createEnquiry = (data: Omit<EnquiryData, 'id' | 'createdAt' | 'status'>): EnquiryData => {
    const newEnquiry: EnquiryData = {
      ...data,
      id: `enq-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setEnquiries((prev) => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  const getEnquiryById = (id: string): EnquiryData | undefined => {
    return enquiries.find((enq) => enq.id === id);
  };

  const getEnquiriesByProfessional = (proId: string): EnquiryData[] => {
    return enquiries.filter((enq) => enq.professionalId === proId);
  };

  return (
    <EnquiryContext.Provider
      value={{
        enquiries,
        createEnquiry,
        getEnquiryById,
        getEnquiriesByProfessional,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
};

export const useEnquiry = (): EnquiryContextType => {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within an EnquiryProvider');
  }
  return context;
};
