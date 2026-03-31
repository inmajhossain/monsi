"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IProperty } from "@/models/Property";
import BookingModal from "@/components/pages/home/BookingModal";
import { motion } from "framer-motion";

interface ApiResponse {
  success: boolean;
  data: IProperty[];
  error?: string;
}

export default function Properties() {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (): Promise<void> => {
    try {
      const res = await fetch("/api/properties");
      const data: ApiResponse = await res.json();

      if (res.ok) {
        setProperties(data.data);
      } else {
        setError(data.error || "Failed to fetch properties");
      }
    } catch {
      setError("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (propertyId: string, propertyTitle: string) => {
    setSelectedProperty({ id: propertyId, title: propertyTitle });
    setIsModalOpen(true);
    setBookingSuccess(false);
  };

  const handleBookingSuccess = () => {
    setBookingSuccess(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
    setBookingSuccess(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="border-4 border-gray-200 border-t-green-700 rounded-full w-10 h-10 animate-spin" />
          <p className="text-gray-500 text-sm">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="font-medium text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#033030] lg:py-22 min-h-screen">
      <div className="mx-auto px-4 py-10 max-w-425">
        {/* Page Title */}
        <div className="mb-10 text-center">
          <h2 className="font-bold text-white text-3xl">Find Your Space</h2>
          <p className="opacity-60 mt-2 text-amber-50 text-md uppercase tracking-wide">
            Premium Properties{" "}
            <span className="font-extrabold text-amber-500 animate-pulse">
              |
            </span>{" "}
            Dhaka
          </p>
          <p className="mt-2 text-gray-100 text-sm">
            {properties.length} propert
            {properties.length !== 1 ? "ies" : "y"} available
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-gray-400 text-lg">No properties found.</p>
          </div>
        ) : (
          /* GRID */
          <motion.div
            className="flex flex-row flex-wrap justify-center gap-8"
            initial={{ y: 300, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {properties.map(property => (
              <div
                key={property._id as unknown as string}
                className="bg-[#eeeeee] shadow-sm hover:shadow-lg border rounded-xl w-80 overflow-hidden transition duration-300"
              >
                {/* BODY */}
                <div className="flex flex-col items-center p-2">
                  <Image
                    src={property.imageUrl || "/default-property.jpg"}
                    alt={property.title}
                    width={500}
                    height={500}
                    className="bg-cover rounded-t-lg w-full h-50 object-top hover:scale-106 transition duration-500"
                  />
                  <h3 className="mt-2 font-lobster text-[24px] text-gray-900">
                    {property.title}
                  </h3>

                  <p className="mt-1 text-gray-400 text-sm">
                    📍 {property.location}
                  </p>

                  <p className="mt-2 font-lobster text-gray-500 text-sm line-clamp-2">
                    {property.description}
                  </p>

                  {/* PRICE */}
                  <p className="mt-4 font-bold text-green-700 text-xl">
                    BDT {property.price.toLocaleString()}
                  </p>

                  {/* FEATURES */}
                  <div className="flex gap-4 mt-3 text-gray-500 text-sm">
                    <span>🛏 {property.bedrooms}</span>
                    <span>🚿 {property.bathrooms}</span>
                    <span>📏 {property.area} sqft</span>
                  </div>

                  {/* DATE */}
                  <p className="mt-2 text-gray-400 text-xs">
                    Listed{" "}
                    {new Date(property.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  {/* BUTTON */}
                  <button
                    onClick={() =>
                      handleBookNow(
                        property._id as unknown as string,
                        property.title
                      )
                    }
                    className="bg-[#023030] mt-5 py-2 rounded-lg w-full font-medium text-white text-sm transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* BOOKING MODAL */}
      {selectedProperty && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          propertyId={selectedProperty.id}
          propertyTitle={selectedProperty.title}
          onSuccess={handleBookingSuccess}
        />
      )}

      {/* SUCCESS TOAST */}
      {bookingSuccess && (
        <div className="right-5 bottom-5 z-50 fixed flex items-center gap-2 bg-green-700 shadow-lg px-5 py-3 rounded-lg text-white text-sm">
          <span className="font-bold text-base">✓</span>
          Booking request sent successfully!
        </div>
      )}
    </div>
  );
}
