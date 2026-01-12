import Welcome from "./Welcome";
import Services from "./Services";
import HowWeWork from "./HowWeWork";
import Contact from "./Contact";
import HeroClip from "./HeroClip";
import GlobalGlass from "./GlobalGlass";
import AppBackground from "./AppBackground";

const Home = () => {
  return (
    <>
      <AppBackground />
      {/* <GlobalGlass /> */}
      <Welcome />
      <HeroClip />
      <Services />
      <HowWeWork />
      <Contact />
    </>
  );
};

export default Home;
