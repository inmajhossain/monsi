'use client';

import ContactForm from "@/components/pages/contact/ContactForm";
import Hero from "@/components/pages/home/Hero";
import Properties from "@/components/pages/home/Properties";
import ScrollStackGallery from "@/components/pages/home/ScrollStackGallery";

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <ScrollStackGallery />
      <Properties />
      <ContactForm />
    </main>
  );
}
