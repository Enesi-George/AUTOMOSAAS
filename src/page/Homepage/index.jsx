import { useState, useEffect } from "react";
import Hero from "../../components/Hero";
import About from "../../components/About";
import VisionMission from "../../components/VisionMission";
import Services from "../../components/Services";
import WhyChooseUs from "../../components/WhyChooseUs";
import ContactFooter from "../../components/ContactFooter";
import ScholarshipModal from "../Scholarship/components/ScholarshipModal";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      <ScholarshipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Hero />
      <About />
      <VisionMission />
      <Services />
      <WhyChooseUs />
      <ContactFooter />
    </div>
  );
};

export default HomePage;
