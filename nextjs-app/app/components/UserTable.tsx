import React from 'react';
import { Mail, Phone, Calendar, Edit3, Trash2 } from 'lucide-react';
import { User } from '@/types/main';
import { getStatusColor, getStatusIcon, getStatusSwahili, formatTZS } from '@/utils/helpers';

interface UsersTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (userId: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEditUser, onDeleteUser }) => {
  return (
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
          {users.map((user) => (
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
                    onClick={() => onEditUser(user)}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Hariri"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
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
  );
};

export default UsersTable;