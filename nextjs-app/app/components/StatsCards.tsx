import React from 'react';
import { Users, CheckCircle, XCircle, DollarSign } from 'lucide-react';
import { DashboardStats } from '@/types/main';
import { formatTZS } from '@/utils/helpers';

interface StatsCardsProps {
  stats: DashboardStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
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
  );
};

export default StatsCards;