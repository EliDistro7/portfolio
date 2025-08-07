export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  subscription: Subscription;
}

export interface Subscription {
  plan: string;
  status: 'Active' | 'Expired' | 'Pending';
  expiryDate: string;
  amount: number;
}

export interface SubscriptionPlan {
  name: string;
  price: number;
  duration: string;
}

export interface NewUserForm {
  name: string;
  email: string;
  phone: string;
  plan: string;
  amount: number;
  duration: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  expiredUsers: number;
  totalRevenue: number;
}