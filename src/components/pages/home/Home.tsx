import Hero from "./Hero";
import ContactForm from "../contact/ContactForm";
import ScrollStackGallery from "./ScrollStackGallery";

function Home() {
  return (
    <div>
      <Hero />
      <ScrollStackGallery />
      <ContactForm />
    </div>
  );
}

export default Home;
