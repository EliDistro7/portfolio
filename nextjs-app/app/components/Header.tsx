import React from 'react';
import { UserPlus } from 'lucide-react';

interface HeaderProps {
  onShowOnboarding: () => void;
  onAddUser: () => void;
}

const Header: React.FC<HeaderProps> = ({ onShowOnboarding, onAddUser }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashibodi ya Msimamizi wa Klabu</h1>
            <p className="text-gray-600">Simamia wanachama na michango ya klabu yako</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onShowOnboarding}
              className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg border border-gray-300 hover:border-blue-300 transition-colors"
            >
              Ona Utangulizi
            </button>
            <button
              onClick={onAddUser}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
            >
              <UserPlus className="w-5 h-5" />
              Ongeza Mwanachama Mpya
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;