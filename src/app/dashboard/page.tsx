
// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

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
  const [bookings, setBookings] = useState<ClientInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<{[key: string]: {text: string, type: 'success' | 'error'}}>({});

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const url = filter === 'all' 
        ? '/api/bookings' 
        : `/api/bookings?status=${filter}`;
      
      const res = await fetch(url);
      const data: ApiResponse = await res.json();
      
      if (res.ok) {
        setBookings(data.data);
      } else {
        setError(data.error || 'Failed to fetch bookings');
      }
    } catch (error) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    // Update local state for the selected status
    setBookings(prev =>
      prev.map(booking =>
        booking._id === bookingId
          ? { ...booking, status: newStatus as unknown as any }
          : booking
      )
    );
  };

  const updateStatus = async (bookingId: string) => {
  const booking = bookings.find(b => b._id === bookingId);
  if (!booking) {
    console.error('Booking not found in state:', bookingId);
    return;
  }

  console.log('Booking ID from state:', bookingId);
  console.log('Full booking object:', booking);
  console.log('Status to update:', booking.status);

  setUpdatingId(bookingId);
  setStatusMessages(prev => ({ ...prev, [bookingId]: { text: '', type: 'success' } }));

  try {
    // Log the exact URL being called
    const url = `/api/bookings/${bookingId}`;
    console.log('Calling URL:', url);
    
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: booking.status }),
    });

    const data = await res.json();
    console.log('Response status:', res.status);
    console.log('Response data:', data);

    if (res.ok) {
      setStatusMessages(prev => ({ 
        ...prev, 
        [bookingId]: { 
          text: 'Status updated successfully!', 
          type: 'success' 
        }
      }));
      
      await fetchBookings();
      
      setTimeout(() => {
        setStatusMessages(prev => {
          const newMessages = { ...prev };
          delete newMessages[bookingId];
          return newMessages;
        });
      }, 3000);
    } else {
      setStatusMessages(prev => ({ 
        ...prev, 
        [bookingId]: { 
          text: data.error || 'Failed to update status', 
          type: 'error' 
        }
      }));
    }
  } catch (error) {
    console.error('Update error:', error);
    setStatusMessages(prev => ({ 
      ...prev, 
      [bookingId]: { 
        text: 'Failed to update status', 
        type: 'error' 
      }
    }));
  } finally {
    setUpdatingId(null);
  }
};
  const deleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBookings(prev => prev.filter(booking => booking._id !== bookingId));
      }
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div className="text-center">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-bold text-gray-900 text-3xl">Client Dashboard</h1>
          <Link
            href="/#"
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md text-white transition duration-200"
          >
            View Properties
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 space-x-2 mb-6">
          {['all', 'pending', 'contacted', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md capitalize ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="gap-4 grid grid-cols-1 md:grid-cols-4 mb-8">
          <div className="bg-white shadow p-6 rounded-lg">
            <p className="text-gray-600 text-sm">Total Bookings</p>
            <p className="font-bold text-2xl">{bookings.length}</p>
          </div>
          <div className="bg-white shadow p-6 rounded-lg">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="font-bold text-yellow-600 text-2xl">
              {bookings.filter(b => b.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white shadow p-6 rounded-lg">
            <p className="text-gray-600 text-sm">Contacted</p>
            <p className="font-bold text-blue-600 text-2xl">
              {bookings.filter(b => b.status === 'contacted').length}
            </p>
          </div>
          <div className="bg-white shadow p-6 rounded-lg">
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="font-bold text-green-600 text-2xl">
              {bookings.filter(b => b.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="divide-y divide-gray-200 min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                    Client Info
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                    Current Status
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                    Update Status
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 text-sm">
                        {booking.clientName}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {booking.clientEmail}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {booking.clientPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 text-sm">
                        {booking.propertyTitle}
                      </div>
                      <div className="text-gray-500 text-sm">
                        ${booking.propertyId?.price?.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs text-gray-900 text-sm">
                        {booking.message}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          disabled={updatingId === booking._id}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        
                        <button
                          onClick={() => updateStatus(booking._id)}
                          disabled={updatingId === booking._id}
                          className={`px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            updatingId === booking._id ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {updatingId === booking._id ? 'Updating...' : 'Update'}
                        </button>
                      </div>
                      {statusMessages[booking._id] && (
                        <div className={`mt-1 text-xs ${
                          statusMessages[booking._id].type === 'success' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {statusMessages[booking._id].text}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {format(new Date(booking.createdAt), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 font-medium text-sm">
                      <button
                        onClick={() => deleteBooking(booking._id)}
                        className="text-red-600 hover:text-red-900"
                        disabled={updatingId === booking._id}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {bookings.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500">No bookings found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}