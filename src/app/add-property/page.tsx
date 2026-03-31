// app/add-property/page.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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

interface ApiResponse {
  success?: boolean;
  error?: string;
  data?: any;
}

export default function AddProperty() {
  const router = useRouter();
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
  const [message, setMessage] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    // Upload file
    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();

      if (res.ok) {
        setFormData(prev => ({
          ...prev,
          imageUrl: data.imageUrl,
        }));
        setMessage('Image uploaded successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(data.error || 'Upload failed');
      }
    } catch (error) {
      setMessage('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/properties/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
          area: Number(formData.area),
        }),
      });

      const data: ApiResponse = await res.json();

      if (res.ok) {
        setMessage('Property added successfully!');
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
        setTimeout(() => {
          router.push('/properties');
        }, 2000);
      } else {
        setMessage(data.error || 'Something went wrong');
      }
    } catch (error) {
      setMessage('Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="mx-auto max-w-2xl">
        <div className='flex flex-row justify-end items-end mb-10'>
          <Link
            href="/#"
            className="bg-white hover:bg-amber-100 px-6 py-2 rounded-md text-black transition duration-200"
          >
            View Properties
          </Link>
        </div>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="mb-8 font-bold text-gray-900 text-3xl text-center">
              Add New Property
            </h2>

            {message && (
              <div className={`mb-4 p-3 rounded ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload Section */}
              <div className="p-6 border-2 border-gray-300 border-dashed rounded-lg">
                <label className="block mb-2 font-medium text-gray-700 text-sm">
                  Property Image
                </label>
                
                {/* Preview */}
                {previewImage && (
                  <div className="mb-4">
                    <Image
                      src={previewImage}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="block hover:file:bg-blue-100 file:bg-blue-50 disabled:opacity-50 file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded-full w-full file:font-semibold text-gray-500 file:text-blue-700 text-sm file:text-sm disabled:cursor-not-allowed"
                  />
                  {uploading && (
                    <span className="text-blue-600">Uploading...</span>
                  )}
                </div>
              </div>

              {/* Hidden input for imageUrl */}
              <input type="hidden" name="imageUrl" value={formData.imageUrl} />

              <div>
                <label htmlFor="title" className="block mb-2 font-medium text-gray-700 text-sm">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>

              <div>
                <label htmlFor="description" className="block mb-2 font-medium text-gray-700 text-sm">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>

              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <div>
                  <label htmlFor="price" className="block mb-2 font-medium text-gray-700 text-sm">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block mb-2 font-medium text-gray-700 text-sm">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
              </div>

              <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                <div>
                  <label htmlFor="bedrooms" className="block mb-2 font-medium text-gray-700 text-sm">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    required
                    min="0"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>

                <div>
                  <label htmlFor="bathrooms" className="block mb-2 font-medium text-gray-700 text-sm">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.5"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>

                <div>
                  <label htmlFor="area" className="block mb-2 font-medium text-gray-700 text-sm">
                    Area (sq ft)
                  </label>
                  <input
                    type="number"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    required
                    min="0"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    loading || uploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Adding Property...' : uploading ? 'Uploading Image...' : 'Add Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
}