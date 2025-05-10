import Navigation from "../components/Navigation/Navigation";
import HeroSection from "../components/Hero/HeroSection.jsx";
import AboutSection from "../components/About/About.jsx";
import "../App.css";
import CatalogSection from "../components/Catalog/Catalog.jsx";
import WorkSteps from "../components/Steps/Steps.jsx";
import AdvantagesSection from "../components/Advantages/AvantagesSection.jsx";
import Footer from "../components/Footer/Footer.jsx";
import SecretsSection from "../components/SecretSection/SecretsSection.jsx";
import CtaBanner from "../components/CtaBanner/CtaBanner.jsx";

function HomePage() {
  return (
    <>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <CatalogSection />
      <WorkSteps />
      <AdvantagesSection />
      <SecretsSection />
      <CtaBanner />
      <Footer />
    </>
  );
}

export default HomePage;
