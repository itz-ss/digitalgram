import Welcome from "./Welcome";
import Services from "./Services";
import HowWeWork from "./HowWeWork";
import Contact from "./Contact";
import HeroClip from "./HeroClip";
import AppBackground from "./AppBackground";

const Home = () => {
  return (
    <>
      {/* <AppBackground /> */}
      <Welcome />
      <HeroClip />
      {/* <Services /> */}
      <HowWeWork />
      <Contact />
    </>
  );
};

export default Home;
