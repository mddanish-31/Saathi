"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { EnquiryData, EnquiryContextType } from '../types';
import { useAuth } from './AuthContext';
import { createClient } from '../lib/supabase/client';

const EnquiryContext = createContext<EnquiryContextType | undefined>(undefined);

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
    message:
      'We are planning a 3-day royal palace wedding in Udaipur for approx 250 guests. We need comprehensive planning, vendor curation, and hospitality logistics management.',
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
    message:
      'Need on-ground coordination for ritual timelines, sangeet cue management, and guest ushering for our Mumbai reception.',
    status: 'pending',
    createdAt: '2026-09-20T09:15:00.000Z',
  },
];

export const EnquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [enquiries, setEnquiries] = useState<EnquiryData[]>(INITIAL_DEMO_ENQUIRIES);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState<number>(0);
  const supabase = createClient();

  // Fetch enquiries from backend
  const fetchEnquiries = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      const res = await fetch('/api/enquiries');
      if (res.ok) {
        const data = await res.json();
        if (data.enquiries && data.enquiries.length > 0) {
          setEnquiries(data.enquiries);
        }
      }
    } catch (err) {
      console.error('Error fetching enquiries:', err);
    }
  }, [isAuthenticated]);

  // Fetch initial notifications
  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    try {
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('read', false);

      if (!error && typeof count === 'number') {
        setUnreadNotificationCount(count);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  }, [user, supabase]);

  useEffect(() => {
    fetchEnquiries();
    fetchNotifications();
  }, [fetchEnquiries, fetchNotifications]);

  // Realtime Subscriptions
  useEffect(() => {
    if (!user) return;

    // 1. Channel for Enquiries
    // Professional gets updates where professional_id = their profile id (or broadcast)
    // Customer gets status changes
    const enquiriesChannel = supabase
      .channel(`realtime_enquiries_${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'enquiries',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newRow = payload.new as Record<string, unknown>;
            const mapped: EnquiryData = {
              id: newRow.id as string,
              professionalId: newRow.professional_id as string,
              professionalName: (newRow.professional_name as string) || 'Professional',
              professionalBrand: (newRow.professional_brand as string) || 'Professional Studio',
              customerName: newRow.customer_name as string,
              customerEmail: newRow.customer_email as string,
              customerPhone: newRow.customer_phone as string,
              serviceId: (newRow.service_id as string) || '',
              serviceName: newRow.service_name as string,
              eventDate: newRow.event_date as string,
              eventLocation: newRow.event_location as string,
              budgetRange: (newRow.budget_range as string) || '',
              message: newRow.message as string,
              status: (newRow.status as EnquiryData['status']) || 'pending',
              createdAt: newRow.created_at as string,
            };

            setEnquiries((prev) => {
              if (prev.some((e) => e.id === mapped.id)) return prev;
              return [mapped, ...prev];
            });
          } else if (payload.eventType === 'UPDATE') {
            const updatedRow = payload.new as Record<string, unknown>;
            setEnquiries((prev) =>
              prev.map((item) =>
                item.id === updatedRow.id
                  ? {
                      ...item,
                      status: (updatedRow.status as EnquiryData['status']) || item.status,
                    }
                  : item
              )
            );
          }
        }
      )
      .subscribe();

    // 2. Channel for Notifications
    const notificationsChannel = supabase
      .channel(`realtime_notifications_${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          setUnreadNotificationCount((prev) => prev + 1);
        }
      )
      .subscribe();

    // Clean up open channels on unmount to avoid connection leak on free tier
    return () => {
      enquiriesChannel.unsubscribe();
      notificationsChannel.unsubscribe();
      supabase.removeChannel(enquiriesChannel);
      supabase.removeChannel(notificationsChannel);
    };
  }, [user, supabase]);

  const createEnquiry = async (
    data: Omit<EnquiryData, 'id' | 'createdAt' | 'status'>
  ): Promise<EnquiryData> => {
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const json = await res.json();
        const created: EnquiryData = {
          ...data,
          id: json.enquiry.id,
          status: json.enquiry.status || 'pending',
          createdAt: json.enquiry.createdAt || new Date().toISOString(),
        };
        setEnquiries((prev) => [created, ...prev]);
        return created;
      }
    } catch (err) {
      console.error('API enquiry creation error:', err);
    }

    // Fallback local creation
    const fallbackEnquiry: EnquiryData = {
      ...data,
      id: `enq-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setEnquiries((prev) => [fallbackEnquiry, ...prev]);
    return fallbackEnquiry;
  };

  const updateEnquiryStatus = async (id: string, status: EnquiryData['status']) => {
    try {
      await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e))
      );
    } catch (err) {
      console.error('Error updating enquiry status:', err);
    }
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
        updateEnquiryStatus,
        unreadNotificationCount,
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
