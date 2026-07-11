'use client';

import React from 'react';
import AdminDashboard from '@/components/AdminDashboard';

export default function Page() {
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
      initialTab="log_ai_blast" 
    />
  );
}
