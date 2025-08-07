import React from 'react';
import { XCircle } from 'lucide-react';
import { User, NewUserForm } from '@/types/main';
import { subscriptionPlans, durationOptions } from '@/data/constants';
import { formatTZS } from '@/utils/helpers';

interface UserModalProps {
  show: boolean;
  editingUser: User | null;
  newUser: NewUserForm;
  setNewUser: (user: NewUserForm) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const UserModal: React.FC<UserModalProps> = ({
  show,
  editingUser,
  newUser,
  setNewUser,
  onClose,
  onSubmit
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {editingUser ? 'Hariri Mwanachama' : 'Ongeza Mwanachama Mpya'}
            </h2>
            <button
              onClick={onClose}
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
                {durationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Ghairi
              </button>
              <button
                type="button"
                onClick={onSubmit}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                {editingUser ? 'Sasisha Mwanachama' : 'Ongeza Mwanachama'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;