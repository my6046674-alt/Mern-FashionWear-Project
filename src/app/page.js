import Benefits from "@/components/home/Benefits";
import BestSeller from "@/components/home/BestSeller";
import CallToAction from "@/components/home/CallToAction";
import Contact from "@/components/home/Contact";
import Featured from "@/components/home/Featured";
import Hero from "@/components/home/Hero";

const Home = () => {
  return (
    <main>
      <Hero />
      <Benefits />
      <CallToAction />
      <Featured />
      <BestSeller />
      <Contact />
    </main>
  );
};

export default Home;