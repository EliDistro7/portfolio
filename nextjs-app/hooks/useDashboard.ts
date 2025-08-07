import { useState, useMemo } from 'react';
import { User, NewUserForm, DashboardStats } from '../types/main';
import { sampleUsers } from '../data/users';

export const useDashboard = () => {
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Zote');
  
  const [newUser, setNewUser] = useState<NewUserForm>({
    name: '',
    email: '',
    phone: '',
    plan: 'Msingi',
    amount: 125000,
    duration: '6'
  });

  const resetNewUser = () => {
    setNewUser({
      name: '',
      email: '',
      phone: '',
      plan: 'Msingi',
      amount: 125000,
      duration: '6'
    });
  };

  const handleAddUser = (): void => {
    const today = new Date();
    const expiryDate = new Date(today);
    expiryDate.setMonth(today.getMonth() + parseInt(newUser.duration));

    const user: User = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      joinDate: today.toISOString().split('T')[0],
      subscription: {
        plan: newUser.plan,
        status: 'Active' as const,
        expiryDate: expiryDate.toISOString().split('T')[0],
        amount: newUser.amount
      }
    };

    setUsers([...users, user]);
    resetNewUser();
    setShowAddUser(false);
  };

  const handleDeleteUser = (userId: number): void => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleEditUser = (user: User): void => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      plan: user.subscription.plan,
      amount: user.subscription.amount,
      duration: '6'
    });
    setShowAddUser(true);
  };

  const handleUpdateUser = (): void => {
    if (!editingUser) return;
    
    const updatedUsers = users.map(user => {
      if (user.id === editingUser.id) {
        return {
          ...user,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          subscription: {
            ...user.subscription,
            plan: newUser.plan,
            amount: newUser.amount
          }
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    setEditingUser(null);
    resetNewUser();
    setShowAddUser(false);
  };

  const handleCloseModal = () => {
    setShowAddUser(false);
    setEditingUser(null);
    resetNewUser();
  };

  const handleShowAddUser = () => {
    setEditingUser(null);
    resetNewUser();
    setShowAddUser(true);
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'Zote' || user.subscription.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [users, searchTerm, filterStatus]);

  const stats: DashboardStats = useMemo(() => ({
    totalUsers: users.length,
    activeUsers: users.filter(u => u.subscription.status === 'Active').length,
    expiredUsers: users.filter(u => u.subscription.status === 'Expired').length,
    totalRevenue: users.reduce((sum, u) => u.subscription.status === 'Active' ? sum + u.subscription.amount : sum, 0)
  }), [users]);

  return {
    users,
    filteredUsers,
    stats,
    showAddUser,
    editingUser,
    newUser,
    searchTerm,
    filterStatus,
    setNewUser,
    setSearchTerm,
    setFilterStatus,
    handleAddUser,
    handleDeleteUser,
    handleEditUser,
    handleUpdateUser,
    handleCloseModal,
    handleShowAddUser
  };
};