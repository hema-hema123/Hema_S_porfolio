import Navbar from "./components/Navbar";
import Home from"./sections/Home";
import About from"./sections/About";
import Project from"./sections/Projects";
import Skills from"./sections/Skills";
import Contact from"./sections/Contact";
import Footer from"./sections/Footer";
import ParticlesBackground from"./components/ParticlesBackground";
import CustomCursor from"./components/CustomCursor";
import React from "react";
import IntroAnimation from "./components/introAnimation";
import PracticalExperience from"./sections/Experience"





export default function App(){
  const [introDone,setIntroDone]=React.useState(false);
  return(
    <>
    {!introDone && <IntroAnimation 
       onFinish={() => setIntroDone(true)}/>}
      {introDone &&(
    <div className="relative gradient text-white">
      {/* <ParticlesBackground/> */}
      <CustomCursor/>

      <Navbar/>
      <Home/>
      <About/>
      <Project/>
      <Skills/>
      <PracticalExperience/>
      <Contact/>
      <Footer/>

    </div>
    )}
    </>
  )
}
