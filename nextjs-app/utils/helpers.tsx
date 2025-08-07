import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { Subscription } from '../types/main';

export const getStatusColor = (status: Subscription['status']): string => {
  switch (status) {
    case 'Active': return 'text-green-600 bg-green-100';
    case 'Expired': return 'text-red-600 bg-red-100';
    case 'Pending': return 'text-yellow-600 bg-yellow-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

export const getStatusIcon = (status: Subscription['status']): JSX.Element => {
  switch (status) {
    case 'Active': return <CheckCircle className="w-4 h-4" />;
    case 'Expired': return <XCircle className="w-4 h-4" />;
    case 'Pending': return <Clock className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

export const getStatusSwahili = (status: Subscription['status']): string => {
  switch (status) {
    case 'Active': return 'Inatumika';
    case 'Expired': return 'Imeisha';
    case 'Pending': return 'Inasubiri';
    default: return 'Haijulikani';
  }
};

export const formatTZS = (amount: number): string => {
  return new Intl.NumberFormat('sw-TZ', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};