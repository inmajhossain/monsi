'use client';

import React, { useState, FormEvent, ChangeEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  FaCloudUploadAlt,
  FaTrash,
  FaCheckCircle,
  FaShieldAlt,
  FaLock,
  FaArrowRight,
  FaHome,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaTag,
} from 'react-icons/fa';

interface FormData {
  title: string;
  description: string;
  price: string;
  location: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  imageUrl: string;
}

export default function AddProperty() {
  const router = useRouter();
  const { user, isAdmin, isAuthenticated, isLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    imageUrl: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
  };

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image file size must be less than 5MB.');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
    setUploading(true);
    setError('');

    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();

      if (res.ok && data.imageUrl) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: data.imageUrl,
        }));
      } else {
        setError(data.error || 'Failed to upload image. Please try again.');
      }
    } catch {
      setError('Network error while uploading image.');
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleRemoveImage = () => {
    setPreviewImage('');
    setFormData((prev) => ({ ...prev, imageUrl: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!formData.imageUrl) {
      setError('Please upload a property photo.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/properties/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title.trim(),
          description: formData.description.trim(),
          price: Number(formData.price),
          location: formData.location.trim(),
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
          area: Number(formData.area),
          imageUrl: formData.imageUrl,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setShowSuccessModal(true);
      } else {
        setError(data.error || 'Failed to add property');
      }
    } catch {
      setError('An error occurred while saving the property listing.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      area: '',
      imageUrl: '',
    });
    setPreviewImage('');
    setShowSuccessModal(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-[#021e1f] min-h-screen text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="border-4 border-[#0C969C]/30 border-t-[#0C969C] rounded-full w-12 h-12 animate-spin" />
          <p className="text-gray-400 text-sm">Verifying Admin Permissions...</p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated / Non-Admin Access Gate
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="relative flex justify-center items-center bg-[#021e1f] px-4 py-32 min-h-screen">
        <div className="top-1/3 left-1/3 -z-0 absolute bg-[#0C969C]/15 blur-[120px] rounded-full w-96 h-96 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="z-10 bg-black/60 shadow-2xl backdrop-blur-xl p-8 sm:p-10 border border-white/10 rounded-2xl max-w-md text-center"
        >
          <div className="flex justify-center items-center bg-amber-500/10 mx-auto mb-4 border border-amber-500/20 rounded-full w-16 h-16 text-amber-400 text-2xl">
            <FaLock />
          </div>
          <h2 className="font-bold text-white text-2xl">
            Admin Access Required
          </h2>
          <p className="mt-2 text-gray-400 text-sm leading-relaxed">
            Only authenticated Monsi Engineering administrators can upload new property listings and photos.
          </p>

          <div className="flex flex-col gap-3 mt-8">
            <Link
              href="/auth/signin?callbackUrl=/add-property"
              className="flex justify-center items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] py-3 rounded-xl font-semibold text-white text-sm transition"
            >
              Sign In as Admin <FaArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/auth/signup"
              className="bg-neutral-800 hover:bg-neutral-700 py-3 rounded-xl font-medium text-gray-300 hover:text-white text-sm transition"
            >
              Create Admin Account
            </Link>

            <Link
              href="/properties"
              className="mt-2 text-gray-500 hover:text-gray-300 text-xs transition"
            >
              ← Back to View Properties
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // 3. Authenticated Admin Form
  return (
    <div className="relative bg-[#021e1f] px-4 sm:px-6 lg:px-8 pt-32 pb-24 min-h-screen">
      {/* Background ambient lighting */}
      <div className="top-20 left-10 -z-0 absolute bg-[#0C969C]/10 blur-[150px] rounded-full w-96 h-96 pointer-events-none" />
      <div className="right-10 bottom-20 -z-0 absolute bg-amber-500/10 blur-[150px] rounded-full w-96 h-96 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Top Header Bar */}
        <div className="flex sm:flex-row flex-col justify-between sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 font-semibold text-[#E3F0B6] text-xs uppercase tracking-widest">
              <FaShieldAlt className="text-amber-400" />
              Admin Portal · Logged in as {user?.profile?.firstName || user?.email}
            </div>
            <h1 className="mt-1 font-bold text-white text-3xl sm:text-4xl">
              Add New Property Listing
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-xl text-gray-200 text-sm transition"
            >
              Dashboard
            </Link>
            <Link
              href="/properties"
              className="bg-[#0C969C] hover:bg-[#0aa3aa] px-4 py-2 rounded-xl text-white text-sm transition"
            >
              View Properties
            </Link>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-500/15 mb-6 p-4 border border-red-500/30 rounded-xl text-red-300 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Main Card */}
        <div className="bg-black/50 shadow-2xl backdrop-blur-xl p-6 sm:p-10 border border-white/10 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* PHOTO UPLOAD SECTION */}
            <div>
              <label className="block mb-2 font-semibold text-gray-200 text-sm uppercase tracking-wider">
                Property Photo *
              </label>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                  isDragOver
                    ? 'border-[#0C969C] bg-[#0C969C]/10'
                    : previewImage
                    ? 'border-white/20 bg-neutral-900/40'
                    : 'border-neutral-700 hover:border-neutral-500 bg-neutral-900/60'
                }`}
              >
                {previewImage ? (
                  <div className="flex flex-col items-center">
                    <div className="relative shadow-xl rounded-xl w-full max-w-lg h-64 sm:h-80 overflow-hidden">
                      <Image
                        src={previewImage}
                        alt="Property Preview"
                        fill
                        sizes="(max-width: 640px) 100vw, 512px"
                        className="object-cover"
                      />
                      {uploading && (
                        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/60 backdrop-blur-sm text-white">
                          <div className="border-4 border-white/30 border-t-[#0C969C] mb-2 rounded-full w-10 h-10 animate-spin" />
                          <span className="font-medium text-sm">Uploading photo to server...</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-lg font-medium text-gray-200 text-xs transition"
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        disabled={uploading}
                        className="flex items-center gap-1.5 bg-red-900/40 hover:bg-red-900/60 px-4 py-2 border border-red-500/30 rounded-lg text-red-300 text-xs transition"
                      >
                        <FaTrash className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center py-8 cursor-pointer"
                  >
                    <div className="flex justify-center items-center bg-[#0C969C]/10 mb-4 rounded-full w-16 h-16 text-[#0C969C] text-3xl">
                      <FaCloudUploadAlt />
                    </div>
                    <h3 className="font-semibold text-white text-base">
                      Click to upload property photo or drag and drop
                    </h3>
                    <p className="mt-1 text-gray-400 text-xs">
                      PNG, JPG, WEBP up to 5MB (High resolution recommended)
                    </p>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* BASIC DETAILS */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium text-gray-300 text-xs uppercase tracking-wider">
                  Property Title *
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                    <FaHome className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. THE VERDANT PENTHOUSE"
                    className="bg-neutral-900/80 p-3.5 pl-10 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 font-medium text-gray-300 text-xs uppercase tracking-wider">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the architectural highlights, view, materials, and amenities..."
                  className="bg-neutral-900/80 p-3.5 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-300 text-xs uppercase tracking-wider">
                  Price (BDT) *
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                    <FaTag className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 25000000"
                    className="bg-neutral-900/80 p-3.5 pl-10 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-300 text-xs uppercase tracking-wider">
                  Location *
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                    <FaMapMarkerAlt className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Gulshan-2, Dhaka"
                    className="bg-neutral-900/80 p-3.5 pl-10 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                  />
                </div>
              </div>
            </div>

            {/* SPECIFICATIONS */}
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-3">
              <div>
                <label className="block mb-2 font-medium text-gray-300 text-xs uppercase tracking-wider">
                  Bedrooms *
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                    <FaBed className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    name="bedrooms"
                    required
                    min="0"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="e.g. 4"
                    className="bg-neutral-900/80 p-3.5 pl-10 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-300 text-xs uppercase tracking-wider">
                  Bathrooms *
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                    <FaBath className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    name="bathrooms"
                    required
                    min="0"
                    step="0.5"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="e.g. 4.5"
                    className="bg-neutral-900/80 p-3.5 pl-10 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-300 text-xs uppercase tracking-wider">
                  Area (Sq Ft) *
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
                    <FaRulerCombined className="w-4 h-4" />
                  </div>
                  <input
                    type="number"
                    name="area"
                    required
                    min="0"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="e.g. 3200"
                    className="bg-neutral-900/80 p-3.5 pl-10 border border-neutral-700 focus:border-[#0C969C] rounded-xl focus:ring-2 focus:ring-[#0C969C]/30 outline-none w-full text-white placeholder-gray-500 text-sm transition"
                  />
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || uploading}
                className="flex justify-center items-center gap-2 bg-[#0C969C] hover:bg-[#0aa3aa] disabled:opacity-50 shadow-xl shadow-[#0C969C]/20 py-4 rounded-xl w-full font-bold text-white text-base transition duration-200 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="border-2 border-white/30 border-t-white rounded-full w-5 h-5 animate-spin" />
                    Publishing Property...
                  </div>
                ) : uploading ? (
                  'Please wait, photo is uploading...'
                ) : (
                  <>
                    Publish Property Listing <FaArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* SUCCESS MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 shadow-2xl p-8 border border-white/10 rounded-2xl w-full max-w-md text-center"
            >
              <div className="flex justify-center items-center bg-emerald-500/20 mx-auto mb-4 rounded-full w-16 h-16 text-emerald-400 text-3xl">
                <FaCheckCircle />
              </div>
              <h3 className="font-bold text-white text-2xl">
                Property Published!
              </h3>
              <p className="mt-2 text-gray-300 text-sm">
                &ldquo;{formData.title}&rdquo; has been saved to the database and is now live for all visitors.
              </p>

              <div className="flex flex-col gap-3 mt-6">
                <Link
                  href="/properties"
                  className="bg-[#0C969C] hover:bg-[#0aa3aa] py-3 rounded-xl font-semibold text-white text-sm transition"
                >
                  View in Properties Gallery
                </Link>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="bg-neutral-800 hover:bg-neutral-700 py-3 rounded-xl font-medium text-gray-200 text-sm transition"
                >
                  Add Another Property
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}