import ContactForm from "@/components/pages/contact/ContactForm";
import Hero from "@/components/pages/home/Hero";
import Properties from "@/components/pages/home/Properties";
import ScrollStackGallery from "@/components/pages/home/ScrollStackGallery";

function page() {
  return (
    <div>
      <Hero />
      <ScrollStackGallery />
      <Properties />
      <ContactForm />
    </div>
  );
}

export default page;
