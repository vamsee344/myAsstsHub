import { Property, Lead, Booking, ChatRoom, Notification, Referral, User } from '../types';
import { MOCK_PROPERTIES, MOCK_LEADS, MOCK_CHATS, MOCK_NOTIFICATIONS, MOCK_REFERRALS } from '../constants/mockData';

// Delay helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  login: async (email: string, role: 'buyer' | 'seller' | 'agent' | 'broker' | 'admin'): Promise<{ user: User; token: string }> => {
    await delay(1000);
    return {
      user: {
        id: 'usr-100',
        name: 'Alex Carter',
        email: email,
        phone: '+1 (555) 019-2834',
        role: role,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        biometricEnabled: true,
        kycStatus: 'verified',
        rewardsWallet: {
          balance: 4850,
          xp: 2450,
          level: 3,
          badge: 'Gold Consultant',
        }
      },
      token: 'jwt-mock-session-token-12345'
    };
  },
  verifyOtp: async (phone: string, code: string): Promise<boolean> => {
    await delay(800);
    return code === '123456';
  }
};

export const propertyService = {
  getProperties: async (): Promise<Property[]> => {
    await delay(800);
    return MOCK_PROPERTIES;
  },
  createProperty: async (propertyData: Partial<Property>): Promise<Property> => {
    await delay(1200);
    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      title: propertyData.title || 'New Listed Property',
      description: propertyData.description || '',
      type: propertyData.type || 'buy',
      propertyType: propertyData.propertyType || 'apartment',
      price: propertyData.price || 0,
      currency: '$',
      address: propertyData.address || '',
      city: propertyData.city || '',
      state: propertyData.state || '',
      beds: propertyData.beds || 0,
      baths: propertyData.baths || 0,
      area: propertyData.area || 0,
      areaUnit: 'sq ft',
      images: propertyData.images || ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'],
      amenities: propertyData.amenities || [],
      isFeatured: false,
      isTrending: false,
      latitude: 37.7749,
      longitude: -122.4194,
      agentId: 'usr-100',
      agentName: 'Alex Carter',
      postedDate: new Date().toISOString().split('T')[0],
      rating: 5.0,
      reviewsCount: 0,
      documents: []
    };
    return newProperty;
  }
};

export const leadService = {
  getLeads: async (): Promise<Lead[]> => {
    await delay(600);
    return MOCK_LEADS;
  }
};

export const bookingService = {
  getBookings: async (): Promise<Booking[]> => {
    await delay(600);
    return [
      {
        id: 'book-1',
        propertyId: 'prop-1',
        propertyTitle: 'Skyline Heights Penthouse',
        clientName: 'Robert Langdon',
        agentId: 'usr-100',
        dateTime: '2026-06-05T15:00:00Z',
        status: 'confirmed',
      }
    ];
  },
  createBooking: async (bookingData: Partial<Booking>): Promise<Booking> => {
    await delay(1000);
    return {
      id: `book-${Date.now()}`,
      propertyId: bookingData.propertyId || '',
      propertyTitle: bookingData.propertyTitle || '',
      clientName: bookingData.clientName || 'Anonymous Client',
      agentId: 'usr-100',
      dateTime: bookingData.dateTime || new Date().toISOString(),
      status: 'pending',
      notes: bookingData.notes
    };
  }
};

export const chatService = {
  getRooms: async (): Promise<ChatRoom[]> => {
    await delay(500);
    return MOCK_CHATS;
  }
};

export const referralService = {
  getReferrals: async (): Promise<Referral[]> => {
    await delay(500);
    return MOCK_REFERRALS;
  }
};

export const notificationService = {
  getNotifications: async (): Promise<Notification[]> => {
    await delay(400);
    return MOCK_NOTIFICATIONS;
  }
};
export default {
  auth: authService,
  properties: propertyService,
  leads: leadService,
  bookings: bookingService,
  chats: chatService,
  referrals: referralService,
  notifications: notificationService,
};
