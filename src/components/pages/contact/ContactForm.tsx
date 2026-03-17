"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactForm() {
  return (
    <section className="flex lg:flex-row flex-col w-full min-h-screen">
      {/* LEFT IMAGE */}
      <motion.div
        initial={{ scale: 0, x: 0 }}
        whileInView={{ scale: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="relative w-full lg:w-1/2 h-[300px] md:h-[500px] lg:h-auto"
      >
        <Image
          src="/image/contact/contact.webp"
          alt="Architecture"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* RIGHT FORM */}
      <motion.div
        initial={{ opacity: 0, x: 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex justify-center items-center bg-black/80 backdrop-blur-lg px-6 md:px-16 py-16 w-full lg:w-1/2"
      >
        <div className="w-full max-w-xl">
          <h2 className="mb-10 text-white text-3xl md:text-4xl">
            Ready to get started?
          </h2>

          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="flex flex-col gap-6"
          >
            {/* NAME */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Jane Smith"
                required
                className="bg-neutral-900 p-4 border border-neutral-700 focus:border-white rounded-md outline-none text-white transition"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm">Email</label>
              <input
                type="email"
                name="email"
                placeholder="jane@email.com"
                required
                className="bg-neutral-900 p-4 border border-neutral-700 focus:border-white rounded-md outline-none text-white transition"
              />
            </div>

            {/* MESSAGE */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm">Message</label>
              <textarea
                name="message"
                rows={5}
                placeholder="Write your message..."
                required
                className="bg-neutral-900 p-4 border border-neutral-700 focus:border-white rounded-md outline-none text-white transition"
              />
            </div>

            {/* BUTTON */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-white px-6 py-3 rounded-md w-fit font-semibold text-black"
            >
              Submit
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
