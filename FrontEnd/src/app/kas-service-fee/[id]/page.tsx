'use client';

import React from 'react';
import AdminDashboard from '@/components/AdminDashboard';

export default function KasServiceFeeDetailPage({ params }: { params: { id: string } }) {
  const handleBack = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  return (
    <AdminDashboard 
      onBack={handleBack} 
      initialTab="kas_service_fee" 
      detailId={params.id}
    />
  );
}
