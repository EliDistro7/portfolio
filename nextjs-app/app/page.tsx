'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import SearchAndFilter from './components/SearchAndFilter';
import UsersTable from './components/UserTable';
import UserModal from './components/UserModal';
import OnboardingScreen from './components/onboarding/main';
import { useDashboard } from '@/hooks/useDashboard';

const AdminDashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  
  const {
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
  } = useDashboard();

  // Show onboarding if it's the first time
  if (showOnboarding) {
    return <OnboardingScreen onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onShowOnboarding={() => setShowOnboarding(true)}
        onAddUser={handleShowAddUser}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards stats={stats} />

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

          <UsersTable
            users={filteredUsers}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        </div>
      </div>

      <UserModal
        show={showAddUser}
        editingUser={editingUser}
        newUser={newUser}
        setNewUser={setNewUser}
        onClose={handleCloseModal}
        onSubmit={editingUser ? handleUpdateUser : handleAddUser}
      />
    </div>
  );
};

export default AdminDashboard;