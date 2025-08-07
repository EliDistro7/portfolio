// Sample Tanzanian users data
export const sampleUsers = [
  {
    id: 1,
    name: 'Amina Hassan Mwalimu',
    email: 'amina.hassan@gmail.com',
    phone: '+255 712 345 678',
    joinDate: '2024-01-15',
    subscription: {
      plan: 'Msingi',
      status: 'Active' as const,
      expiryDate: '2024-07-15',
      amount: 125000
    }
  },
  {
    id: 2,
    name: 'Joseph Mkuu Kigoma',
    email: 'joseph.mkuu@yahoo.com',
    phone: '+255 754 987 321',
    joinDate: '2024-02-20',
    subscription: {
      plan: 'Kuu',
      status: 'Active' as const,
      expiryDate: '2025-02-20',
      amount: 250000
    }
  },
  {
    id: 3,
    name: 'Fatuma Said Kibwana',
    email: 'fatuma.said@hotmail.com',
    phone: '+255 689 654 987',
    joinDate: '2023-11-10',
    subscription: {
      plan: 'Msingi',
      status: 'Expired' as const,
      expiryDate: '2024-05-10',
      amount: 125000
    }
  },
  {
    id: 4,
    name: 'Emmanuel Mwanga Dar',
    email: 'emmanuel.mwanga@gmail.com',
    phone: '+255 765 432 109',
    joinDate: '2024-03-05',
    subscription: {
      plan: 'VIP',
      status: 'Active' as const,
      expiryDate: '2025-03-05',
      amount: 500000
    }
  },
  {
    id: 5,
    name: 'Rehema Juma Msimbazi',
    email: 'rehema.juma@outlook.com',
    phone: '+255 743 876 543',
    joinDate: '2024-04-12',
    subscription: {
      plan: 'Kuu',
      status: 'Pending' as const,
      expiryDate: '2024-10-12',
      amount: 250000
    }
  }
];
