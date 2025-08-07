import { SubscriptionPlan } from '../types/main';

export const subscriptionPlans: SubscriptionPlan[] = [
  { name: 'Msingi', price: 125000, duration: 'miezi 6' },
  { name: 'Kuu', price: 250000, duration: 'mwaka 1' },
  { name: 'VIP', price: 500000, duration: 'mwaka 1' }
];

export const durationOptions = [
  { value: '1', label: 'Mwezi 1' },
  { value: '3', label: 'Miezi 3' },
  { value: '6', label: 'Miezi 6' },
  { value: '12', label: 'Miezi 12' }
];

export const filterStatusOptions = [
  { value: 'Zote', label: 'Hali Zote' },
  { value: 'Active', label: 'Inatumika' },
  { value: 'Expired', label: 'Imeisha' },
  { value: 'Pending', label: 'Inasubiri' }
];