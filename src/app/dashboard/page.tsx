'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import {
  FaPlus,
  FaShieldAlt,
  FaLock,
  FaArrowRight,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaTrash,
} from 'react-icons/fa';

interface ClientInfo {
  _id: string;
  propertyId: {
    _id: string;
    title: string;
    price: number;
  };
  propertyTitle: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  message: string;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  data: ClientInfo[];
  error?: string;
}

export default function Dashboard() {
  const { user, isAdmin, isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const [bookings, setBookings] = useState<ClientInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<{
    [key: string]: { text: string; type: 'success' | 'error' };
  }>({});

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [filter, isAuthenticated, isAdmin]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const url =
        filter === 'all'
          ? '/api/bookings'
          : `/api/bookings?status=${filter}`;

      const res = await fetch(url);
      const data: ApiResponse = await res.json();

      if (res.ok) {
        setBookings(data.data || []);
      } else {
        setError(data.error || 'Failed to fetch bookings');
      }
    } catch {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking._id === bookingId
          ? { ...booking, status: newStatus as any }
          : booking
      )
    );
  };

  const updateStatus = async (bookingId: string) => {
    const booking = bookings.find((b) => b._id === bookingId);
    if (!booking) return;

    setUpdatingId(bookingId);
    setStatusMessages((prev) => ({
      ...prev,
      [bookingId]: { text: '', type: 'success' },
    }));

    try {
      const url = `/api/bookings/${bookingId}`;
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: booking.status }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessages((prev) => ({
          ...prev,
          [bookingId]: {
            text: 'Status updated!',
            type: 'success',
          },
        }));

        setTimeout(() => {
          setStatusMessages((prev) => {
            const next = { ...prev };
            delete next[bookingId];
            return next;
          });
        }, 3000);
      } else {
        setStatusMessages((prev) => ({
          ...prev,
          [bookingId]: {
            text: data.error || 'Failed to update status',
            type: 'error',
          },
        }));
      }
    } catch {
      setStatusMessages((prev) => ({
        ...prev,
        [bookingId]: {
          text: 'Failed to update status',
          type: 'error',
        },
      }));
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking inquiry?')) return;

    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((booking) => booking._id !== bookingId));
      }
    } catch (err) {
      console.error('Failed to delete booking:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
      case 'contacted':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'completed':
        return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-300 border border-red-500/30';
      default:
        return 'bg-neutral-800 text-gray-300';
    }
  };

  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center bg-[#021e1f] min-h-screen text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="border-4 border-[#0C969C]/30 border-t-[#0C969C] rounded-full w-12 h-12 animate-spin" />
          <p className="text-gray-400 text-sm">Verifying Admin Permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="relative flex justify-center items-center bg-[#021e1f] px-4 py-32 min-h-screen">
        <div className="bg-black/60 shadow-2xl backdrop-blur-xl p-8 sm:p-10 border border-white/10 rounded-2xl max-w-md text-center">
          <div className="flex justify-center items-center bg-amber-500/10 mx-auto mb-4 border border-amber-500/20 rounded-full w-16 h-16 text-amber-400 text-2xl">
            <FaLock />
          </div>
          <h2 className="font-bold text-white text-2xl">
            Admin Dashboard Access
          </h2>
          <p className="mt-2 text-gray-400 text-sm leading-relaxed">
            Please sign in with your administrator credentials to view and manage client bookings.
          </p>
          <div className="flex flex-col gap-3 mt-6">
            <Link
              href="/auth/signin?callbackUrl=/dashboard"
              className="flex justify-center items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] py-3 rounded-xl font-semibold text-white text-sm transition"
            >
              Sign In as Admin <FaArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#021e1f] px-4 sm:px-6 lg:px-8 pt-32 pb-24 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 font-semibold text-[#E3F0B6] text-xs uppercase tracking-widest">
              <FaShieldAlt className="text-amber-400" />
              Admin Portal · {user?.profile?.firstName || user?.email}
            </div>
            <h1 className="mt-1 font-bold text-white text-3xl sm:text-4xl">
              Client Booking Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/add-property"
              className="flex items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] px-4 py-2.5 rounded-xl font-medium text-white text-sm transition shadow-lg shadow-[#0C969C]/20"
            >
              <FaPlus className="w-3 h-3 text-amber-400" /> Add Property
            </Link>
            <Link
              href="/properties"
              className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2.5 rounded-xl text-gray-200 text-sm transition"
            >
              View Listings
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['all', 'pending', 'contacted', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-xl capitalize text-xs font-semibold tracking-wider transition ${
                filter === status
                  ? 'bg-[#0C969C] text-white shadow-md'
                  : 'bg-black/40 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="gap-4 grid grid-cols-2 md:grid-cols-4 mb-8">
          <div className="bg-black/50 p-5 border border-white/10 rounded-2xl">
            <p className="font-medium text-gray-400 text-xs uppercase tracking-wider">Total Inquiries</p>
            <p className="mt-1 font-bold text-white text-2xl">{bookings.length}</p>
          </div>
          <div className="bg-black/50 p-5 border border-white/10 rounded-2xl">
            <p className="font-medium text-amber-400/80 text-xs uppercase tracking-wider">Pending</p>
            <p className="mt-1 font-bold text-amber-400 text-2xl">
              {bookings.filter((b) => b.status === 'pending').length}
            </p>
          </div>
          <div className="bg-black/50 p-5 border border-white/10 rounded-2xl">
            <p className="font-medium text-blue-400/80 text-xs uppercase tracking-wider">Contacted</p>
            <p className="mt-1 font-bold text-blue-400 text-2xl">
              {bookings.filter((b) => b.status === 'contacted').length}
            </p>
          </div>
          <div className="bg-black/50 p-5 border border-white/10 rounded-2xl">
            <p className="font-medium text-emerald-400/80 text-xs uppercase tracking-wider">Completed</p>
            <p className="mt-1 font-bold text-emerald-400 text-2xl">
              {bookings.filter((b) => b.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-black/50 shadow-2xl backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="py-20 text-center text-gray-400">
              <div className="border-4 border-[#0C969C]/30 border-t-[#0C969C] mx-auto mb-3 rounded-full w-8 h-8 animate-spin" />
              Loading inquiries...
            </div>
          ) : bookings.length === 0 ? (
            <div className="py-20 text-center text-gray-400">
              <p className="text-base">No booking inquiries found under &ldquo;{filter}&rdquo;.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="divide-y divide-white/10 min-w-full text-left">
                <thead className="bg-white/5 font-semibold text-gray-300 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Property</th>
                    <th className="px-6 py-4">Message</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Update</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-white/5 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 font-semibold text-white">
                          <FaUser className="w-3 h-3 text-[#0C969C]" />
                          {booking.clientName}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5 text-gray-400 text-xs">
                          <FaEnvelope className="w-2.5 h-2.5" />
                          {booking.clientEmail}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5 text-gray-400 text-xs">
                          <FaPhone className="w-2.5 h-2.5" />
                          {booking.clientPhone}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{booking.propertyTitle}</div>
                        {booking.propertyId?.price && (
                          <div className="text-emerald-400 text-xs">
                            BDT {booking.propertyId.price.toLocaleString()}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 max-w-xs text-gray-300 text-xs leading-relaxed">
                        {booking.message}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                            disabled={updatingId === booking._id}
                            className="bg-neutral-900 px-2.5 py-1.5 border border-neutral-700 focus:border-[#0C969C] rounded-lg text-white text-xs outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <button
                            onClick={() => updateStatus(booking._id)}
                            disabled={updatingId === booking._id}
                            className="bg-[#0C969C] hover:bg-[#0aa3aa] px-2.5 py-1.5 rounded-lg font-medium text-white text-xs transition disabled:opacity-50"
                          >
                            {updatingId === booking._id ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                        {statusMessages[booking._id] && (
                          <div
                            className={`mt-1 text-xs ${
                              statusMessages[booking._id].type === 'success'
                                ? 'text-emerald-400'
                                : 'text-red-400'
                            }`}
                          >
                            {statusMessages[booking._id].text}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 text-gray-400 text-xs whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="w-2.5 h-2.5" />
                          {format(new Date(booking.createdAt), 'MMM dd, yyyy')}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => deleteBooking(booking._id)}
                          className="hover:bg-red-500/20 p-2 rounded-lg text-red-400 hover:text-red-300 transition"
                          title="Delete Booking"
                        >
                          <FaTrash className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}