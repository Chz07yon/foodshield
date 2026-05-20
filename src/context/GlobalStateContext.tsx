import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Language } from '../locales/locales';

// Database Schemas matching target structure
export interface User {
  user_id: string;
  phone: string;
  email: string;
  full_name: string;
  account_status: 'active' | 'warning' | 'suspended';
  fraud_flag_count: number;
  banned_until: string | null;
  profile_image: string;
}


export interface Restaurant {
  restaurant_id: string;
  name: string;
  owner_email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  cuisine_type: string;
  logo_url: string;
  banner_gradient: string;
  is_verified: boolean;
  quality_score: number;
  video_compliance_rate: number;
}

export interface Order {
  order_id: string;
  customer_id: string;
  restaurant_id: string;
  restaurant_name: string;
  order_number: string;
  amount: number;
  items_json: { name: string; quantity: number; price: number }[];
  delivery_address: string;
  delivered_at: string;
  created_at: string;
}

export interface VideoAnalysis {
  food_quality_score: number;
  doneness_level?: string;
  color_rating: string;
  foreign_particles_detected: { type: string; confidence: number; location: string }[];
  packaging_integrity: string;
  recommendations: string[];
}

export interface VideoRecord {
  video_id: string;
  restaurant_id: string;
  order_id: string;
  order_number: string;
  verification_code: string;
  video_url: string;
  thumbnail_url: string;
  staff_id: string;
  staff_name: string;
  duration: number;
  recording_timestamp: string;
  ai_analysis: VideoAnalysis;
  quality_score: number;
  gps_location: string;
}

export interface ClaimEvidence {
  evidence_id: string;
  claim_id: string;
  evidence_type: 'photo' | 'video';
  file_url: string;
  ai_generated_score: number; // 0 - 100
  tampering_score: number; // 0 - 100
  angle_label: 'Overhead' | 'Left Side' | 'Right Side' | 'Close-Up';
  blur_score: number; // 0 - 100 (high = blurry)
  brightness_score: number; // 0 - 100
  uploaded_at: string;
}

export interface RefundClaim {
  claim_id: string;
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  order_id: string;
  order_number: string;
  restaurant_id: string;
  restaurant_name: string;
  issue_category: string;
  description: string;
  status: 'submitted' | 'analyzing' | 'review' | 'approved' | 'rejected';
  submission_date: string;
  ai_fraud_score: number; // 0 - 100
  ai_recommendation: 'APPROVE' | 'REJECT' | 'REVIEW';
  final_decision: 'approved' | 'rejected' | null;
  admin_id: string | null;
  refund_amount: number;
  reason_for_decision: string;
  evidence: ClaimEvidence[];
  linked_video_code: string | null;
  gps_location: string;
  created_at: string;
}

export interface Appeal {
  appeal_id: string;
  customer_id: string;
  claim_id: string | null;
  reason: string;
  status: 'pending' | 'approved' | 'denied';
  admin_notes: string;
  decided_by: string | null;
  decided_at: string | null;
  created_at: string;
}

export interface AuditLog {
  log_id: string;
  admin_name: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface SystemSettings {
  autoApprovalThreshold: number; // Max fraud score for auto-approve (e.g. 15%)
  autoRejectionThreshold: number; // Min fraud score for auto-reject (e.g. 70%)
  videoRequired: boolean;
  verificationCodeRequired: boolean;
  blockchainEnabled: boolean;
  minPhotoResolution: string;
}

interface GlobalStateContextType {
  activeRole: 'restaurant' | 'customer' | 'admin';
  language: Language;
  theme: 'light' | 'dark';
  currentUser: User;
  restaurants: Restaurant[];
  orders: Order[];
  videos: VideoRecord[];
  claims: RefundClaim[];
  appeals: Appeal[];
  auditLogs: AuditLog[];
  settings: SystemSettings;
  setRole: (role: 'restaurant' | 'customer' | 'admin') => void;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  addVideo: (video: VideoRecord) => void;
  addClaim: (claim: Omit<RefundClaim, 'claim_id' | 'created_at' | 'evidence'>, evidence: Omit<ClaimEvidence, 'evidence_id' | 'claim_id'>[]) => RefundClaim;
  submitAppeal: (reason: string) => void;
  resolveDispute: (claimId: string, decision: 'approved' | 'rejected', refundAmount: number, notes: string) => void;
  updateSettings: (settings: Partial<SystemSettings>) => void;
  resetDatabase: () => void;
  triggerSystemWarning: (flagCount: number) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// Initial Mock Data to seed localStorage
const initialRestaurants: Restaurant[] = [
  {
    restaurant_id: "REST-739",
    name: "Burger & Co.",
    owner_email: "manager@burgerco.com",
    phone: "+91 98765 43210",
    address: "12/A, Park Street, Sector 5",
    city: "Mumbai",
    pincode: "400001",
    cuisine_type: "Fast Food",
    logo_url: "🍔",
    banner_gradient: "from-orange-500 to-amber-600",
    is_verified: true,
    quality_score: 94,
    video_compliance_rate: 98
  },
  {
    restaurant_id: "REST-402",
    name: "Sushi Zen",
    owner_email: "orders@sushizen.com",
    phone: "+91 87654 32109",
    address: "G-4, Galleria Mall, Hiranandani",
    city: "Mumbai",
    pincode: "400076",
    cuisine_type: "Japanese / Pan-Asian",
    logo_url: "🍣",
    banner_gradient: "from-red-500 to-rose-600",
    is_verified: true,
    quality_score: 87,
    video_compliance_rate: 92
  },
  {
    restaurant_id: "REST-118",
    name: "Tandoori Flames",
    owner_email: "support@tandooriflames.in",
    phone: "+91 76543 21098",
    address: "Block B, Connaught Place",
    city: "New Delhi",
    pincode: "110001",
    cuisine_type: "North Indian",
    logo_url: "🍗",
    banner_gradient: "from-yellow-600 to-red-600",
    is_verified: false,
    quality_score: 79,
    video_compliance_rate: 65
  }
];

const initialOrders: Order[] = [
  {
    order_id: "ORD-9921",
    customer_id: "CUST-501",
    restaurant_id: "REST-739",
    restaurant_name: "Burger & Co.",
    order_number: "BC-9921",
    amount: 520,
    items_json: [
      { name: "Double Cheese Whopper", quantity: 1, price: 280 },
      { name: "Large Salted Fries", quantity: 1, price: 140 },
      { name: "Chocolate Milkshake", quantity: 1, price: 100 }
    ],
    delivery_address: "Flat 402, Sunset Heights, Bandra West, Mumbai",
    delivered_at: "2026-05-20T19:30:00Z",
    created_at: "2026-05-20T18:45:00Z"
  },
  {
    order_id: "ORD-9922",
    customer_id: "CUST-501",
    restaurant_id: "REST-402",
    restaurant_name: "Sushi Zen",
    order_number: "SZ-9922",
    amount: 1450,
    items_json: [
      { name: "Salmon Deluxe Platter (12pcs)", quantity: 1, price: 1200 },
      { name: "Spicy Tuna Temaki", quantity: 1, price: 250 }
    ],
    delivery_address: "Flat 402, Sunset Heights, Bandra West, Mumbai",
    delivered_at: "2026-05-20T14:15:00Z",
    created_at: "2026-05-20T13:20:00Z"
  },
  {
    order_id: "ORD-9923",
    customer_id: "CUST-501",
    restaurant_id: "REST-118",
    restaurant_name: "Tandoori Flames",
    order_number: "TF-9923",
    amount: 780,
    items_json: [
      { name: "Paneer Butter Masala", quantity: 1, price: 340 },
      { name: "Butter Naan", quantity: 3, price: 180 },
      { name: "Chicken Biryani", quantity: 1, price: 260 }
    ],
    delivery_address: "Flat 402, Sunset Heights, Bandra West, Mumbai",
    delivered_at: "2026-05-18T21:00:00Z",
    created_at: "2026-05-18T20:15:00Z"
  }
];

const initialVideos: VideoRecord[] = [
  {
    video_id: "VID-8810",
    restaurant_id: "REST-739",
    order_id: "ORD-9921",
    order_number: "BC-9921",
    verification_code: "VER-REST-739-20260520-F7A2",
    video_url: "recorded_video_1.mp4",
    thumbnail_url: "🍔",
    staff_id: "STF-02",
    staff_name: "Ramesh Kumar",
    duration: 35,
    recording_timestamp: "2026-05-20T19:00:00Z",
    ai_analysis: {
      food_quality_score: 95,
      doneness_level: "Well-done",
      color_rating: "Golden Brown",
      foreign_particles_detected: [],
      packaging_integrity: "Perfectly Sealed (Double Tape)",
      recommendations: ["Ensure thermal bag is pre-heated"]
    },
    quality_score: 96,
    gps_location: "19.0760° N, 72.8777° E"
  },
  {
    video_id: "VID-8811",
    restaurant_id: "REST-402",
    order_id: "ORD-9922",
    order_number: "SZ-9922",
    verification_code: "VER-REST-402-20260520-X89B",
    video_url: "recorded_video_2.mp4",
    thumbnail_url: "🍣",
    staff_id: "STF-18",
    staff_name: "Mei Ling",
    duration: 48,
    recording_timestamp: "2026-05-20T13:40:00Z",
    ai_analysis: {
      food_quality_score: 89,
      color_rating: "Fresh Pink/Red",
      foreign_particles_detected: [],
      packaging_integrity: "Sealed with QR Code sticker",
      recommendations: ["Add extra ice pack for sashimi preservation"]
    },
    quality_score: 90,
    gps_location: "19.1176° N, 72.9060° E"
  }
];

const initialClaims: RefundClaim[] = [
  {
    claim_id: "CLA-2281",
    customer_id: "CUST-501",
    customer_name: "Rahul Verma",
    customer_phone: "+91 99009 90099",
    order_id: "ORD-9923",
    order_number: "TF-9923",
    restaurant_id: "REST-118",
    restaurant_name: "Tandoori Flames",
    issue_category: "Foreign Particles (hair, insects, nails)",
    description: "I found a long black strand of hair in my Paneer Butter Masala. This is absolutely unacceptable and unhygienic!",
    status: "review",
    submission_date: "2026-05-19T09:45:00Z",
    ai_fraud_score: 78,
    ai_recommendation: "REJECT",
    final_decision: null,
    admin_id: null,
    refund_amount: 520,
    reason_for_decision: "",
    evidence: [
      {
        evidence_id: "EV-1",
        claim_id: "CLA-2281",
        evidence_type: "photo",
        file_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400", // Paneer butter masala
        ai_generated_score: 84, // Suspiciously generated!
        tampering_score: 62,
        angle_label: "Overhead",
        blur_score: 10,
        brightness_score: 55,
        uploaded_at: "2026-05-19T09:40:00Z"
      },
      {
        evidence_id: "EV-2",
        claim_id: "CLA-2281",
        evidence_type: "photo",
        file_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
        ai_generated_score: 75,
        tampering_score: 48,
        angle_label: "Close-Up",
        blur_score: 15,
        brightness_score: 60,
        uploaded_at: "2026-05-19T09:41:00Z"
      },
      {
        evidence_id: "EV-3",
        claim_id: "CLA-2281",
        evidence_type: "photo",
        file_url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
        ai_generated_score: 92,
        tampering_score: 75,
        angle_label: "Left Side",
        blur_score: 8,
        brightness_score: 50,
        uploaded_at: "2026-05-19T09:42:00Z"
      },
      {
        evidence_id: "EV-4",
        claim_id: "CLA-2281",
        evidence_type: "photo",
        file_url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400",
        ai_generated_score: 88,
        tampering_score: 69,
        angle_label: "Right Side",
        blur_score: 12,
        brightness_score: 48,
        uploaded_at: "2026-05-19T09:42:00Z"
      }
    ],
    linked_video_code: null, // No video linked, restaurant has low compliance!
    gps_location: "19.0760° N, 72.8777° E",
    created_at: "2026-05-19T09:45:00Z"
  },
  {
    claim_id: "CLA-2282",
    customer_id: "CUST-501",
    customer_name: "Rahul Verma",
    customer_phone: "+91 99009 90099",
    order_id: "ORD-9921",
    order_number: "BC-9921",
    restaurant_id: "REST-739",
    restaurant_name: "Burger & Co.",
    issue_category: "Poor Packaging (damaged, leaked)",
    description: "The milkshake lid was completely loose and spilled all over the burger and fries. The bag was soaked when delivered.",
    status: "approved",
    submission_date: "2026-05-20T20:10:00Z",
    ai_fraud_score: 8,
    ai_recommendation: "APPROVE",
    final_decision: "approved",
    admin_id: "ADM-001",
    refund_amount: 520,
    reason_for_decision: "Verified from restaurant video that the lid was not taped down properly. Photos clearly demonstrate structural spilling.",
    evidence: [
      {
        evidence_id: "EV-5",
        claim_id: "CLA-2282",
        evidence_type: "photo",
        file_url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
        ai_generated_score: 4,
        tampering_score: 3,
        angle_label: "Overhead",
        blur_score: 5,
        brightness_score: 72,
        uploaded_at: "2026-05-20T20:05:00Z"
      },
      {
        evidence_id: "EV-6",
        claim_id: "CLA-2282",
        evidence_type: "photo",
        file_url: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400",
        ai_generated_score: 5,
        tampering_score: 2,
        angle_label: "Close-Up",
        blur_score: 8,
        brightness_score: 68,
        uploaded_at: "2026-05-20T20:06:00Z"
      },
      {
        evidence_id: "EV-7",
        claim_id: "CLA-2282",
        evidence_type: "photo",
        file_url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400",
        ai_generated_score: 2,
        tampering_score: 5,
        angle_label: "Left Side",
        blur_score: 6,
        brightness_score: 64,
        uploaded_at: "2026-05-20T20:07:00Z"
      },
      {
        evidence_id: "EV-8",
        claim_id: "CLA-2282",
        evidence_type: "photo",
        file_url: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=400",
        ai_generated_score: 3,
        tampering_score: 1,
        angle_label: "Right Side",
        blur_score: 4,
        brightness_score: 70,
        uploaded_at: "2026-05-20T20:07:00Z"
      }
    ],
    linked_video_code: "VER-REST-739-20260520-F7A2",
    gps_location: "19.0760° N, 72.8777° E",
    created_at: "2026-05-20T20:10:00Z"
  }
];

const initialAuditLogs: AuditLog[] = [
  {
    log_id: "LOG-01",
    admin_name: "Officer Vikram",
    action: "Dispute Resolved",
    details: "Approved dispute #CLA-2282 for ₹520. Autopaid via Razorpay.",
    timestamp: "2026-05-20T20:25:00Z"
  },
  {
    log_id: "LOG-02",
    admin_name: "System Guard",
    action: "Fraud Warning Triggered",
    details: "Flagged user Rahul Verma for suspicious claims on Order #TF-9923 (AI model: 78% fraud risk).",
    timestamp: "2026-05-19T09:50:00Z"
  }
];

const defaultSettings: SystemSettings = {
  autoApprovalThreshold: 15,
  autoRejectionThreshold: 75,
  videoRequired: true,
  verificationCodeRequired: false,
  blockchainEnabled: true,
  minPhotoResolution: "1280x720"
};

const initialUser: User = {
  user_id: "CUST-501",
  phone: "+91 99009 90099",
  email: "rahul.verma@gmail.com",
  full_name: "Rahul Verma",
  account_status: "warning", // Preloaded with a warning from CLA-2281
  fraud_flag_count: 1,
  banned_until: null,
  profile_image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"
};

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setRole] = useState<'restaurant' | 'customer' | 'admin'>('restaurant');
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Database States
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('fs_user');
    return saved ? JSON.parse(saved) : initialUser;
  });

  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => {
    const saved = localStorage.getItem('fs_restaurants');
    return saved ? JSON.parse(saved) : initialRestaurants;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('fs_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [videos, setVideos] = useState<VideoRecord[]>(() => {
    const saved = localStorage.getItem('fs_videos');
    return saved ? JSON.parse(saved) : initialVideos;
  });

  const [claims, setClaims] = useState<RefundClaim[]>(() => {
    const saved = localStorage.getItem('fs_claims');
    return saved ? JSON.parse(saved) : initialClaims;
  });

  const [appeals, setAppeals] = useState<Appeal[]>(() => {
    const saved = localStorage.getItem('fs_appeals');
    return saved ? JSON.parse(saved) : [];
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('fs_audit_logs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
  });

  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem('fs_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('fs_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('fs_restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  useEffect(() => {
    localStorage.setItem('fs_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('fs_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('fs_claims', JSON.stringify(claims));
  }, [claims]);

  useEffect(() => {
    localStorage.setItem('fs_appeals', JSON.stringify(appeals));
  }, [appeals]);

  useEffect(() => {
    localStorage.setItem('fs_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('fs_settings', JSON.stringify(settings));
  }, [settings]);

  // Actions
  const addVideo = (video: VideoRecord) => {
    setVideos(prev => [video, ...prev]);

    // Record system audit log
    const newLog: AuditLog = {
      log_id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      admin_name: "Kitchen Guard AI",
      action: "Video Verified & Hash Written",
      details: `Order #${video.order_number} packed by ${video.staff_name}. Blockchain SHA-256 written: ${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addClaim = (
    claimData: Omit<RefundClaim, 'claim_id' | 'created_at' | 'evidence'>,
    evidenceData: Omit<ClaimEvidence, 'evidence_id' | 'claim_id'>[]
  ) => {
    const claim_id = `CLA-${Math.floor(1000 + Math.random() * 9000)}`;
    const created_at = new Date().toISOString();

    const formattedEvidence: ClaimEvidence[] = evidenceData.map((ev, index) => ({
      ...ev,
      evidence_id: `EV-${claim_id}-${index}`,
      claim_id: claim_id
    }));

    const newClaim: RefundClaim = {
      ...claimData,
      claim_id,
      created_at,
      evidence: formattedEvidence
    };

    setClaims(prev => [newClaim, ...prev]);

    // Update corresponding order status (simulated link)
    setOrders(prev => prev.map(o => o.order_id === claimData.order_id ? { ...o, status: 'disputed' } : o));

    // Handle warning/ban triggers based on AI detection of AI images in evidence
    const maxAiScore = Math.max(...formattedEvidence.map(e => e.ai_generated_score));
    if (maxAiScore > 50) {
      // Trigger warning flag increments
      const nextFlags = currentUser.fraud_flag_count + 1;
      let status: 'active' | 'warning' | 'suspended' = 'warning';
      let banned_until = null;

      if (nextFlags >= 2) {
        status = 'suspended';
        // Ban for 30 days
        const date = new Date();
        date.setDate(date.getDate() + 30);
        banned_until = date.toISOString();
      }

      setCurrentUser(prev => ({
        ...prev,
        fraud_flag_count: nextFlags,
        account_status: status,
        banned_until
      }));

      // Log the warning/suspension in audit logs
      const alertLog: AuditLog = {
        log_id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
        admin_name: "Forensics Guard",
        action: status === 'suspended' ? "Account Suspended" : "Fraud Warning Registered",
        details: `${currentUser.full_name} flagged for uploading AI-generated image (Confidence: ${maxAiScore}%). Flags count: ${nextFlags}.`,
        timestamp: new Date().toISOString()
      };
      setAuditLogs(prev => [alertLog, ...prev]);
    }

    return newClaim;
  };

  const submitAppeal = (reason: string) => {
    const newAppeal: Appeal = {
      appeal_id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      customer_id: currentUser.user_id,
      claim_id: null,
      reason,
      status: 'pending',
      admin_notes: '',
      decided_by: null,
      decided_at: null,
      created_at: new Date().toISOString()
    };
    setAppeals(prev => [newAppeal, ...prev]);

    // Create Audit Log
    const newLog: AuditLog = {
      log_id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      admin_name: "System",
      action: "Appeal Submitted",
      details: `${currentUser.full_name} submitted a ban appeal: "${reason.substring(0, 40)}..."`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const resolveDispute = (
    claimId: string,
    decision: 'approved' | 'rejected',
    refundAmount: number,
    notes: string
  ) => {
    setClaims(prev => prev.map(c => {
      if (c.claim_id === claimId) {
        return {
          ...c,
          status: decision === 'approved' ? 'approved' : 'rejected',
          final_decision: decision,
          refund_amount: refundAmount,
          reason_for_decision: notes,
          admin_id: 'ADM-101'
        };
      }
      return c;
    }));

    // Record system audit log
    const targetClaim = claims.find(c => c.claim_id === claimId);
    const newLog: AuditLog = {
      log_id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      admin_name: "Security Admin (You)",
      action: decision === 'approved' ? "Claim Approved" : "Claim Rejected",
      details: `${decision === 'approved' ? 'Approved refund of ₹' + refundAmount : 'Rejected dispute'} for Claim #${claimId} (${targetClaim?.customer_name}). Notes: ${notes}`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const triggerSystemWarning = (flagCount: number) => {
    let status: 'active' | 'warning' | 'suspended' = 'active';
    let banned_until = null;

    if (flagCount === 1) {
      status = 'warning';
    } else if (flagCount >= 2) {
      status = 'suspended';
      const date = new Date();
      date.setDate(date.getDate() + 30);
      banned_until = date.toISOString();
    }

    setCurrentUser(prev => ({
      ...prev,
      fraud_flag_count: flagCount,
      account_status: status,
      banned_until
    }));
  };

  const resetDatabase = () => {
    localStorage.removeItem('fs_user');
    localStorage.removeItem('fs_restaurants');
    localStorage.removeItem('fs_orders');
    localStorage.removeItem('fs_videos');
    localStorage.removeItem('fs_claims');
    localStorage.removeItem('fs_appeals');
    localStorage.removeItem('fs_audit_logs');
    localStorage.removeItem('fs_settings');

    setCurrentUser(initialUser);
    setRestaurants(initialRestaurants);
    setOrders(initialOrders);
    setVideos(initialVideos);
    setClaims(initialClaims);
    setAppeals([]);
    setAuditLogs(initialAuditLogs);
    setSettings(defaultSettings);
  };

  return (
    <GlobalStateContext.Provider value={{
      activeRole,
      language,
      theme,
      currentUser,
      restaurants,
      orders,
      videos,
      claims,
      appeals,
      auditLogs,
      settings,
      setRole,
      setLanguage,
      setTheme,
      addVideo,
      addClaim,
      submitAppeal,
      resolveDispute,
      updateSettings,
      resetDatabase,
      triggerSystemWarning
    }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (context === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
