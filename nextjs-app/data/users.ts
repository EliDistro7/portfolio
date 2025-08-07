

export const sampleUsers = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      joinDate: '2024-01-15',
      subscription: {
        plan: 'Premium',
        status: 'Active' as const,
        expiryDate: '2024-12-15',
        amount: 50000
      }
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      joinDate: '2024-02-20',
      subscription: {
        plan: 'Basic',
        status: 'Active' as const,
        expiryDate: '2024-08-20',
        amount: 20000
      }
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@email.com',
      phone: '+1 (555) 456-7890',
      joinDate: '2023-12-10',
      subscription: {
        plan: 'Premium',
        status: 'Expired' as const,
        expiryDate: '2024-07-10',
        amount: 45000
      }
    }
  ]