'use client';

import { useAuth } from '@/context/AuthContext';

export default function AuthWrapper() {
  const { isAuthenticated, user, login, logout, isAdmin } = useAuth();
  return { isAuthenticated, user, login, logout, isAdmin };
}
