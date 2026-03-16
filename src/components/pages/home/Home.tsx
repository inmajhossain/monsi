import Header from "@/components/layout/header/Header";
import Hero from "./Hero";
import MobileHeader from "@/components/layout/header/MobileHeader";
import Footer from "@/components/layout/footer/Footer";

function Home() {
  return (
    <div>
      <MobileHeader />
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}

export default Home;
