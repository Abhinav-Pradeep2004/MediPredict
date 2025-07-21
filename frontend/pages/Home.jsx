import React, { useRef } from "react";
import Header from "../components/Header";
import About from "../components/About";

function Home() {
  const aboutRef = useRef(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Header onAboutClick={scrollToAbout} />
      <div ref={aboutRef}>
        <About />
      </div>
    </div>
  );
}

export default Home;
