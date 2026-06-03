export type UserRole = 'buyer' | 'seller' | 'agent' | 'broker' | 'admin';

export interface User {
  id: number;
  fname: string;
  lname: string;
  uname: string;
  email: string;
  phone?: string;
  country_name?: string;
  user_type_id?: number;
  avatar_url?: string;
  cover_url?: string;
  about?: string;
  kyc_status?: string;
}

export interface Post {
  id: number;
  user_id: number;
  content: string;
  media_url?: string;
  media_type?: 'image' | 'video';
  privacy: 'public' | 'private' | 'friends';
  like_count: number;
  comment_count: number;
  is_liked?: boolean;
  is_saved?: boolean;
  created_at: string;
  user?: User;
}

export interface Story {
  id: number;
  user_id: number;
  media_url: string;
  media_type: 'image' | 'video';
  caption?: string;
  created_at: string;
  user?: User;
}

export interface Property {
  id: number;
  title: string;
  description?: string;
  type: 'sale' | 'rent';
  category_id: number;
  price: number;
  address?: string;
  city: string;
  state?: string;
  beds?: number;
  baths?: number;
  area?: number;
  images?: string[];
  documents?: { id: number; url: string; name: string }[];
}

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  created_at: string;
}

export interface Conversation {
  id: number;
  recipient_name: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
}

export interface Package {
  id: number;
  name: string;
  description?: string;
  price: number;
}

export interface ReferralDashboard {
  total_referrals: number;
  earnings: number;
  pending_withdrawals: number;
}

export interface ReferralItem {
  id: number;
  referee_name: string;
  status: string;
  amount: number;
}

export interface Notification {
  id: number;
  title: string;
  body: string;
  is_read: boolean;
  type: string;
  created_at: string;
}
