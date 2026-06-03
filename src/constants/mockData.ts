import { Property, Lead, ChatRoom, Notification, Referral, User } from '../types';

export const MOCK_USER: User = {
  id: 'usr-100',
  name: 'Alex Carter',
  email: 'alex.carter@myassetshub.com',
  phone: '+1 (555) 019-2834',
  role: 'agent',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  biometricEnabled: true,
  kycStatus: 'verified',
  rewardsWallet: {
    balance: 4850,
    xp: 2450,
    level: 3,
    badge: 'Gold Consultant',
  }
};

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Skyline Heights Penthouse',
    description: 'Breathtaking duplex penthouse with panoramic views of the city skyline, featuring an open-concept kitchen, custom Italian marble countertops, and private rooftop deck.',
    type: 'buy',
    propertyType: 'apartment',
    price: 1250000,
    currency: '$',
    address: '452 Ocean Avenue, Tower A, Penthouse 2',
    city: 'San Francisco',
    state: 'CA',
    beds: 3,
    baths: 3.5,
    area: 2850,
    areaUnit: 'sq ft',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-design-39906-large.mp4',
    virtualTourUrl: 'https://my.matterport.com/show/?m=mock-tour-id',
    amenities: ['Private Pool', 'Gym', '24/7 Security', 'Valet Parking', 'Smart Home System', 'Wine Cellar'],
    isFeatured: true,
    isTrending: true,
    latitude: 37.7749,
    longitude: -122.4194,
    agentId: 'usr-100',
    agentName: 'Alex Carter',
    postedDate: '2026-05-20',
    isSaved: true,
    rating: 4.8,
    reviewsCount: 12,
    documents: [
      { name: 'Property_Brochure.pdf', url: '#', size: '4.2 MB' },
      { name: 'Floor_Plan_PH2.pdf', url: '#', size: '1.8 MB' }
    ]
  },
  {
    id: 'prop-2',
    title: 'Modernist Forest Retreat',
    description: 'Tucked away in the serene redwood valleys, this glass and timber residence offers unparalleled architectural lines and seamless indoor-outdoor living experience.',
    type: 'buy',
    propertyType: 'villa',
    price: 2450000,
    currency: '$',
    address: '108 Whiskey Springs Rd',
    city: 'Sausalito',
    state: 'CA',
    beds: 4,
    baths: 4,
    area: 4200,
    areaUnit: 'sq ft',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Fireplace', 'Heated Floors', 'Solar Panels', 'Guest House', 'Hot Tub'],
    isFeatured: true,
    isTrending: false,
    latitude: 37.8591,
    longitude: -122.4853,
    agentId: 'usr-101',
    agentName: 'Sarah Jenkins',
    postedDate: '2026-05-22',
    isSaved: false,
    rating: 4.9,
    reviewsCount: 8,
    documents: [
      { name: 'Site_Map_Forest.pdf', url: '#', size: '2.5 MB' }
    ]
  },
  {
    id: 'prop-3',
    title: 'Urban Chic Studio Loft',
    description: 'Charming open-layout loft with industrial elements, original brick walls, and double-height industrial sash windows in the heart of the arts district.',
    type: 'rent',
    propertyType: 'apartment',
    price: 3200,
    currency: '$',
    address: '812 Broadway Apt 4B',
    city: 'Oakland',
    state: 'CA',
    beds: 1,
    baths: 1.5,
    area: 950,
    areaUnit: 'sq ft',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    ],
    amenities: ['Elevator', 'Pets Allowed', 'Rooftop Access', 'Bicycle Storage', 'Air Conditioning'],
    isFeatured: false,
    isTrending: true,
    latitude: 37.8044,
    longitude: -122.2711,
    agentId: 'usr-100',
    agentName: 'Alex Carter',
    postedDate: '2026-05-28',
    isSaved: true,
    rating: 4.5,
    reviewsCount: 19,
    documents: []
  }
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    clientName: 'Robert Langdon',
    clientPhone: '+1 (555) 234-9876',
    clientEmail: 'robert.langdon@university.edu',
    propertyId: 'prop-1',
    propertyTitle: 'Skyline Heights Penthouse',
    status: 'Qualified',
    value: 1250000,
    assignedAgentId: 'usr-100',
    notes: [
      'Pre-approved for $1.5M mortgage.',
      'Extremely interested in the rooftop deck.',
      'Scheduled viewing for next Tuesday at 3:00 PM.'
    ],
    createdAt: '2026-05-24T10:15:00Z',
    lastFollowUp: '2026-05-29T14:30:00Z'
  },
  {
    id: 'lead-2',
    clientName: 'Diana Prince',
    clientPhone: '+1 (555) 765-4321',
    clientEmail: 'diana.prince@museum.org',
    propertyId: 'prop-2',
    propertyTitle: 'Modernist Forest Retreat',
    status: 'Negotiation',
    value: 2450000,
    assignedAgentId: 'usr-100',
    notes: [
      'Offered $2.35M with 20% down.',
      'Waiting on seller response.',
      'Follow up by Friday morning.'
    ],
    createdAt: '2026-05-18T09:00:00Z',
    lastFollowUp: '2026-05-30T11:00:00Z'
  },
  {
    id: 'lead-3',
    clientName: 'Peter Parker',
    clientPhone: '+1 (555) 456-7890',
    clientEmail: 'peter.parker@bugle.com',
    propertyId: 'prop-3',
    propertyTitle: 'Urban Chic Studio Loft',
    status: 'New',
    value: 3200,
    assignedAgentId: 'usr-100',
    notes: [
      'Inquired online through website link.',
      'Requested virtual tour links.'
    ],
    createdAt: '2026-05-31T08:00:00Z',
    lastFollowUp: '2026-05-31T08:15:00Z'
  }
];

export const MOCK_CHATS: ChatRoom[] = [
  {
    id: 'chat-1',
    recipientName: 'Robert Langdon',
    recipientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    recipientRole: 'buyer',
    lastMessage: 'Let’s confirm the appointment for Tuesday.',
    lastMessageTime: '10:32 AM',
    unreadCount: 2,
    online: true,
    messages: [
      { id: 'm1', senderId: 'usr-100', senderName: 'Alex Carter', text: 'Hi Robert, did you review the floor plans?', timestamp: '09:15 AM' },
      { id: 'm2', senderId: 'client', senderName: 'Robert Langdon', text: 'Yes! They look perfect. Let’s confirm the appointment for Tuesday.', timestamp: '10:32 AM' }
    ]
  },
  {
    id: 'chat-2',
    recipientName: 'Diana Prince',
    recipientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    recipientRole: 'buyer',
    lastMessage: 'Will send the updated offer copy.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    online: false,
    messages: [
      { id: 'm3', senderId: 'client', senderName: 'Diana Prince', text: 'Did the seller respond to the 2.35M bid?', timestamp: 'Yesterday' },
      { id: 'm4', senderId: 'usr-100', senderName: 'Alex Carter', text: 'They are reviewing it tonight. I will update you first thing in the morning.', timestamp: 'Yesterday' },
      { id: 'm5', senderId: 'client', senderName: 'Diana Prince', text: 'Will send the updated offer copy.', timestamp: 'Yesterday' }
    ]
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    title: 'New Lead Assigned',
    body: 'Peter Parker submitted an inquiry for Urban Chic Studio Loft.',
    timestamp: '2 hours ago',
    isRead: false,
    type: 'lead'
  },
  {
    id: 'notif-2',
    title: 'Booking Confirmed',
    body: 'Your viewing with Robert Langdon is scheduled for Tuesday at 3:00 PM.',
    timestamp: '1 day ago',
    isRead: true,
    type: 'booking'
  },
  {
    id: 'notif-3',
    title: 'Referral Reward Credited',
    body: 'You earned $250 for inviting Sarah Vance (Deal closed!).',
    timestamp: '3 days ago',
    isRead: true,
    type: 'referral'
  }
];

export const MOCK_REFERRALS: Referral[] = [
  { id: 'ref-1', refereeName: 'Sarah Vance', refereeEmail: 'sarah.v@mail.com', status: 'deal_closed', rewardAmount: 250, date: '2026-05-15' },
  { id: 'ref-2', refereeName: 'James Murdock', refereeEmail: 'james.m@mail.com', status: 'kyc_verified', rewardAmount: 50, date: '2026-05-28' },
  { id: 'ref-3', refereeName: 'Clara Oswald', refereeEmail: 'clara.o@mail.com', status: 'registered', rewardAmount: 0, date: '2026-05-30' }
];
