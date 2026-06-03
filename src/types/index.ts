export type UserRole = 'buyer' | 'seller' | 'agent' | 'broker' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  biometricEnabled: boolean;
  kycStatus: 'pending' | 'submitted' | 'verified' | 'rejected';
  rewardsWallet: {
    balance: number;
    xp: number;
    level: number;
    badge: string;
  };
}

export interface Property {
  id: string;
  title: string;
  description: string;
  type: 'buy' | 'rent';
  propertyType: 'apartment' | 'villa' | 'commercial' | 'plot' | 'house';
  price: number;
  currency: string;
  address: string;
  city: string;
  state: string;
  beds: number;
  baths: number;
  area: number; // in sq ft
  areaUnit: string;
  images: string[];
  videoUrl?: string;
  virtualTourUrl?: string;
  amenities: string[];
  isFeatured: boolean;
  isTrending: boolean;
  latitude: number;
  longitude: number;
  agentId: string;
  agentName: string;
  agentAvatar?: string;
  postedDate: string;
  isSaved?: boolean;
  rating: number;
  reviewsCount: number;
  documents: { name: string; url: string; size: string }[];
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Interested' | 'Negotiation' | 'Won' | 'Lost';

export interface Lead {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  propertyId: string;
  propertyTitle: string;
  status: LeadStatus;
  value: number;
  assignedAgentId: string;
  notes: string[];
  createdAt: string;
  lastFollowUp: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  clientName: string;
  agentId: string;
  dateTime: string;
  status: 'pending' | 'confirmed' | 'rescheduled' | 'cancelled';
  notes?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  mediaType?: 'image' | 'voice' | 'document';
  mediaUrl?: string;
}

export interface ChatRoom {
  id: string;
  recipientName: string;
  recipientAvatar?: string;
  recipientRole: UserRole;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
  online: boolean;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  isRead: boolean;
  type: 'lead' | 'booking' | 'chat' | 'referral' | 'general';
}

export interface Referral {
  id: string;
  refereeName: string;
  refereeEmail: string;
  status: 'invited' | 'registered' | 'kyc_verified' | 'deal_closed';
  rewardAmount: number;
  date: string;
}
