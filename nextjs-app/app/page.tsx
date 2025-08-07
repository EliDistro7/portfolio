'use client';

import React, { useState, useEffect } from 'react';
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
  Clock,
  ArrowRight,
  Star,
  Target,
  TrendingUp,
  Shield,
  Zap,
  ChevronRight
} from 'lucide-react';

// Sample Tanzanian users data
const sampleUsers = [
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

const OnboardingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Simamia Wanachama",
      description: "Ongoza na fuatilia wanachama wote wa klabu yako kwa urahisi",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Michango na Mapato",
      description: "Simamia michango ya kila mwezi na pata ripoti za mapato",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Takwimu za Wakati Halisi",
      description: "Ona takwimu za uongozaji wa klabu yako kwa muda halisi",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Usalama wa Hali ya Juu",
      description: "Data yako na ya wanachama iko salama na imehifadhiwa vizuri",
      color: "from-red-500 to-red-600"
    }
  ];

  const steps = [
    {
      title: "Karibu kwenye Mfumo wa Klabu!",
      subtitle: "Mfumo kamili wa kusimamia klabu yako",
      content: (
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-8 mx-auto w-32 h-32 flex items-center justify-center">
              <Users className="w-16 h-16 text-white" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Dashibodi ya Klabu
            </h2>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              Simamia wanachama, michango na takwimu za klabu yako kwa urahisi na ufanisi
            </p>
          </div>
        </div>
      )
    },
    {
      title: "Huduma Zetu Kuu",
      subtitle: "Vipengele vya kipekee vya mfumo wetu",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl p-6 bg-white border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100'}`}
              style={{
                animationDelay: `${index * 200}ms`,
                animation: isAnimating ? 'none' : 'fadeInUp 0.8s ease-out forwards'
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              <div className="relative">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ChevronRight className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Uko Tayari Kuanza!",
      subtitle: "Hebu tuanze kusimamia klabu yako",
      content: (
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-green-500 to-blue-500 rounded-full p-8 mx-auto w-32 h-32 flex items-center justify-center">
              <Zap className="w-16 h-16 text-white animate-bounce" />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Tumia Mfumo Sasa!
            </h2>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              Unaweza kuanza kuongeza wanachama, kusimamia michango na kupata takwimu za klabu yako
            </p>
            <div className="flex justify-center space-x-8 pt-4">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                  <UserPlus className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">Ongeza Wanachama</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">Simamia Michango</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">Ona Takwimu</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 z-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-400 to-blue-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full blur-2xl opacity-10 animate-bounce"></div>
      </div>

      <div className="relative h-full flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Progress bar */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index <= currentStep 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-12' 
                        : 'bg-gray-200 w-8'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-500">
                {currentStep + 1} / {steps.length}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {steps[currentStep].title}
              </h1>
              <p className="text-xl text-gray-600">
                {steps[currentStep].subtitle}
              </p>
            </div>

            <div className="mb-12">
              {steps[currentStep].content}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Nyuma
              </button>

              <div className="flex space-x-3">
                <button
                  onClick={onComplete}
                  className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  Ruka
                </button>
                <button
                  onClick={nextStep}
                  className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-2"
                >
                  <span>{currentStep === steps.length - 1 ? 'Anza Kutumia' : 'Endelea'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const AdminDashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
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

  const subscriptionPlans: SubscriptionPlan[] = [
    { name: 'Msingi', price: 125000, duration: 'miezi 6' },
    { name: 'Kuu', price: 250000, duration: 'mwaka 1' },
    { name: 'VIP', price: 500000, duration: 'mwaka 1' }
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
      plan: 'Msingi',
      amount: 125000,
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
      plan: 'Msingi',
      amount: 125000,
      duration: '6'
    });
    setShowAddUser(false);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'Zote' || user.subscription.status === filterStatus;
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

  const getStatusSwahili = (status: Subscription['status']): string => {
    switch (status) {
      case 'Active': return 'Inatumika';
      case 'Expired': return 'Imeisha';
      case 'Pending': return 'Inasubiri';
      default: return 'Haijulikani';
    }
  };

  const formatTZS = (amount: number): string => {
    return new Intl.NumberFormat('sw-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.subscription.status === 'Active').length,
    expiredUsers: users.filter(u => u.subscription.status === 'Expired').length,
    totalRevenue: users.reduce((sum, u) => u.subscription.status === 'Active' ? sum + u.subscription.amount : sum, 0)
  };

  // Show onboarding if it's the first time
  if (showOnboarding) {
    return <OnboardingScreen onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashibodi ya Msimamizi wa Klabu</h1>
              <p className="text-gray-600">Simamia wanachama na michango ya klabu yako</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowOnboarding(true)}
                className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg border border-gray-300 hover:border-blue-300 transition-colors"
              >
                Ona Utangulizi
              </button>
              <button
                onClick={() => {
                  setEditingUser(null);
                  setNewUser({
                    name: '',
                    email: '',
                    phone: '',
                    plan: 'Msingi',
                    amount: 125000,
                    duration: '6'
                  });
                  setShowAddUser(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                <UserPlus className="w-5 h-5" />
                Ongeza Mwanachama Mpya
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wanachama Wote</p>
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
                <p className="text-sm font-medium text-gray-600">Wanachama Hai</p>
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
                <p className="text-sm font-medium text-gray-600">Zilizo Isha</p>
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
                <p className="text-sm font-medium text-gray-600">Mapato ya Mwezi</p>
                <p className="text-3xl font-bold text-green-600">{formatTZS(stats.totalRevenue)}</p>
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
                  placeholder="Tafuta wanachama..."
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
                    <option value="Zote">Hali Zote</option>
                    <option value="Active">Inatumika</option>
                    <option value="Expired">Imeisha</option>
                    <option value="Pending">Inasubiri</option>
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
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Mwanachama</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Mawasiliano</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Mpango</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Hali</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Mwisho</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Vitendo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">Alijiunga {user.joinDate}</p>
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
                        <p className="text-sm text-gray-500">{formatTZS(user.subscription.amount)}/mwezi</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.subscription.status)}`}>
                        {getStatusIcon(user.subscription.status)}
                        {getStatusSwahili(user.subscription.status)}
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
                          title="Hariri"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Futa"
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
                  {editingUser ? 'Hariri Mwanachama' : 'Ongeza Mwanachama Mpya'}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jina Kamili</label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ingiza jina kamili"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Barua Pepe</label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ingiza anwani ya barua pepe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nambari ya Simu</label>
                  <input
                    type="tel"
                    value={newUser.phone}
                    onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+255 xxx xxx xxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mpango wa Michango</label>
                  <select
                    value={newUser.plan}
                    onChange={(e) => {
                      const plan = subscriptionPlans.find(p => p.name === e.target.value);
                      setNewUser({
                        ...newUser, 
                        plan: e.target.value,
                        amount: plan ? plan.price : 125000
                      });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {subscriptionPlans.map(plan => (
                      <option key={plan.name} value={plan.name}>
                        {plan.name} - {formatTZS(plan.price)} ({plan.duration})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Muda</label>
                  <select
                    value={newUser.duration}
                    onChange={(e) => setNewUser({...newUser, duration: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="1">Mwezi 1</option>
                    <option value="3">Miezi 3</option>
                    <option value="6">Miezi 6</option>
                    <option value="12">Miezi 12</option>
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
                    Ghairi
                  </button>
                  <button
                    type="button"
                    onClick={editingUser ? handleUpdateUser : handleAddUser}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    {editingUser ? 'Sasisha Mwanachama' : 'Ongeza Mwanachama'}
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