// components/BookingModal.tsx
'use client';

import { useState, FormEvent } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
  onSuccess: () => void;
}

interface FormData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  message: string;
}

export default function BookingModal({ isOpen, onClose, propertyId, propertyTitle, onSuccess }: BookingModalProps) {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          propertyId,
          propertyTitle,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setFormData({
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          message: '',
        });
        onSuccess();
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Failed to submit booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-50 fixed inset-0 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex justify-center items-center p-4 min-h-full">
        <div className="relative bg-white shadow-xl rounded-lg w-full max-w-md transition-all transform">
          {/* Close button */}
          <button
            onClick={onClose}
            className="top-4 right-4 absolute text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>

          {/* Modal content */}
          <div className="p-6">
            <h3 className="mb-2 font-bold text-gray-900 text-2xl">
              Book This Property
            </h3>
            <p className="mb-6 text-gray-600">
              {propertyTitle}
            </p>

            {error && (
              <div className="bg-red-100 mb-4 p-3 rounded text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="clientName" className="block mb-1 font-medium text-gray-700 text-sm">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="clientEmail" className="block mb-1 font-medium text-gray-700 text-sm">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="clientEmail"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="clientPhone" className="block mb-1 font-medium text-gray-700 text-sm">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="clientPhone"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-1 font-medium text-gray-700 text-sm">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholder="I'm interested in this property. Please contact me for more details..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}