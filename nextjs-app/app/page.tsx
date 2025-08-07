'use client';

import React, { useState, useEffect } from 'react';
import {sampleUsers} from '@/data/users';
import { 
  Users, 
  UserPlus, 
  CreditCard, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  Plus,
  Calendar,
  Mail,
  Phone,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

// Type definitions
interface Subscription {
  plan: string;
  status: 'Active' | 'Expired' | 'Pending';
  expiryDate: string;
  amount: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  subscription: Subscription;
}

interface NewUserForm {
  name: string;
  email: string;
  phone: string;
  plan: string;
  amount: number;
  duration: string;
}

interface SubscriptionPlan {
  name: string;
  price: number;
  duration: string;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>(sampleUsers);

  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [newUser, setNewUser] = useState<NewUserForm>({
    name: '',
    email: '',
    phone: '',
    plan: 'Basic',
    amount: 49.99,
    duration: '6'
  });

  const subscriptionPlans: SubscriptionPlan[] = [
    { name: 'Basic', price: 49.99, duration: '6 months' },
    { name: 'Premium', price: 99.99, duration: '12 months' },
    { name: 'VIP', price: 199.99, duration: '12 months' }
  ];

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
    setNewUser({
      name: '',
      email: '',
      phone: '',
      plan: 'Basic',
      amount: 49.99,
      duration: '6'
    });
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
    setNewUser({
      name: '',
      email: '',
      phone: '',
      plan: 'Basic',
      amount: 49.99,
      duration: '6'
    });
    setShowAddUser(false);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || user.subscription.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Subscription['status']): string => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Expired': return 'text-red-600 bg-red-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: Subscription['status']): JSX.Element => {
    switch (status) {
      case 'Active': return <CheckCircle className="w-4 h-4" />;
      case 'Expired': return <XCircle className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.subscription.status === 'Active').length,
    expiredUsers: users.filter(u => u.subscription.status === 'Expired').length,
    totalRevenue: users.reduce((sum, u) => u.subscription.status === 'Active' ? sum + u.subscription.amount : sum, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Club Admin Dashboard</h1>
              <p className="text-gray-600">Manage your club members and subscriptions</p>
            </div>
            <button
              onClick={() => {
                setEditingUser(null);
                setNewUser({
                  name: '',
                  email: '',
                  phone: '',
                  plan: 'Basic',
                  amount: 49.99,
                  duration: '6'
                });
                setShowAddUser(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              Add New Member
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Members</p>
                <p className="text-3xl font-bold text-green-600">{stats.activeUsers}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-3xl font-bold text-red-600">{stats.expiredUsers}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-3xl font-bold text-green-600">${stats.totalRevenue.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Search and Filter Bar */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Member</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Contact</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Subscription</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Expiry</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">Joined {user.joinDate}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          {user.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{user.subscription.plan}</p>
                        <p className="text-sm text-gray-500">${user.subscription.amount}/month</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.subscription.status)}`}>
                        {getStatusIcon(user.subscription.status)}
                        {user.subscription.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {user.subscription.expiryDate}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingUser ? 'Edit Member' : 'Add New Member'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddUser(false);
                    setEditingUser(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Plan</label>
                  <select
                    value={newUser.plan}
                    onChange={(e) => {
                      const plan = subscriptionPlans.find(p => p.name === e.target.value);
                      setNewUser({
                        ...newUser, 
                        plan: e.target.value,
                        amount: plan ? plan.price : 49.99
                      });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {subscriptionPlans.map(plan => (
                      <option key={plan.name} value={plan.name}>
                        {plan.name} - ${plan.price} ({plan.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                  <select
                    value={newUser.duration}
                    onChange={(e) => setNewUser({...newUser, duration: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddUser(false);
                      setEditingUser(null);
                    }}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={editingUser ? handleUpdateUser : handleAddUser}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    {editingUser ? 'Update Member' : 'Add Member'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;