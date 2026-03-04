import { useEffect, useRef, useMemo, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub } from "react-icons/fa";

import img1 from "../assets/dpi.png";
import img2 from "../assets/story.png";
import img3 from "../assets/verdantimage.png";
import img4 from "../assets/insta.png";
import img5 from "../assets/task.png";
import photo1 from "../assets/dpi.png";
import photo2 from "../assets/story.png";
import photo3 from "../assets/verdantimage.png";
import photo4 from "../assets/insta.png";
import photo5 from "../assets/task.png";

/* -------------------- MOBILE DETECTOR -------------------- */
const useIsMobile = (query = "(max-width: 768px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

/* -------------------- PROJECT CARD -------------------- */
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="bg-white/80 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] relative">
        
        {/* IMAGE */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* CONTENT */}
        <div className="p-4 md:p-6 relative">
          
          {/* TITLE */}
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
            className="text-2xl md:text-3xl font-bold mb-3 text-gray-800"
          >
            {project.title}
          </motion.h3>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
            className="text-gray-800 text-sm md:text-base leading-relaxed mb-4"
          >
            {project.description}
          </motion.p>

          {/* BUTTON */}
         <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
  className="flex items-center gap-4 flex-wrap"
>
  {/* Visit Website */}
  {project.showWebsite && (
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 px-6 py-3
    bg-gradient-to-r from-blue-600 to-purple-600 text-white
    font-semibold rounded-full hover:from-blue-700 hover:to-purple-700
    transition-all duration-300 shadow-lg hover:shadow-xl"
  >
    Visit Website
  </a>
)}

  {/* GitHub */}
  <a
    href={project.github}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="View source code on GitHub"
    className="inline-flex items-center gap-2 px-5 py-3
    bg-gray-900 text-white rounded-full
    hover:bg-gray-800 transition-all duration-300
    shadow-lg hover:shadow-xl"
  >
    <FaGithub className="text-xl" />
    <span className="font-medium">GitHub</span>
  </a>
</motion.div>

          {/* DECORATIVE BLUR */}
          <div
            className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"
            style={{ backgroundColor: project.bgColor }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/* -------------------- PROJECTS SECTION -------------------- */
export default function Projects() {
  const isMobile = useIsMobile();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

 const projects = useMemo(
  () => [
    {
      title: "Packet_analyzer",
      link: "",
      github: "https://github.com/hema-hema123/Deep-Packet-Inspection-System.git",
      showWebsite: false,
      bgColor: "#0d4d3d",
      image: isMobile ? photo1 : img1,
      description:
        "Built a high-performance C++ Deep Packet Inspection engine to classify and block network traffic using TLS SNI extraction and multi-threaded processing.",
    },
    {
      title: "Storyverse",
      link: "https://storycrater-3e997.web.app",
      github: "https://github.com/hema-hema123/-storyverse_creator.git",
      showWebsite: true,
      bgColor: "#3884d3",
      image: isMobile ? photo2 : img2,
      description:
        "StoryVerse is a Netflix-style platform for planning and managing content as episode-based workflows.It uses AI insights and collaboration tools to streamline content creation and growth."
    },
    {
      title: "Climora",
      link: "https://climora-dashboard.vercel.app",
      github: "https://github.com/hema-hema123/climora-dashboard.git",
      showWebsite: true,
      bgColor: "#dc9317",
      image: isMobile ? photo3 : img3,
      description:
        "Built Climora, an AI-powered dashboard that maps urban heat islands and predicts cooling impacts to guide climate-smart city planning decisions effectively.",
    },
    // duplicates/extra cards to make 6 items (adjust titles/descriptions later)
    {
      title: "InstaPersona",
      link: "",
      github: "https://github.com/hema-hema123/instagram-Audience-Persona-Analyzer.git",
      showWebsite: false,
      bgColor: "#2c3e50",
      image: isMobile ? photo4 : img4,
      description: "Built a FastAPI tool to classify Instagram audience personas from bios and comments.Generated visual insights dashboards using privacy-compliant, consent-based data."
    },
    {
      title: "TaskPilot",
      link: "",
      github: "https://github.com/hema-hema123/TaskPilot.git",
      showWebsite: false,
      bgColor: "#6c5ce7",
      image: isMobile ? photo5 : img5,
      description: "TaskPilot is a security-first AI agent framework that executes tasks while blocking dangerous commands and enforcing approval workflows safely and reliably.",
    },
  ],
  [isMobile]
);

  return (
    <section id="projects" className="py-20 px-4 md:px-8 bg-black  min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: -40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold  bg-gradient-to-r from-[#8880e1] via-[#d5c7d9] to-[#1cd8d2] bg-clip-text text-transparent mb-4">
            My Projects
          </h2>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            Explore my latest work and creative endeavors
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}