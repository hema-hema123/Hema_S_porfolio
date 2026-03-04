import { use, useState } from "react";
import {motion} from "framer-motion";
import Particles from "../components/ParticlesBackground";
import emailjs from "@emailjs/browser";
import Astra from "../assets/music.png";

const  SERVICE_ID =  import.meta.env.VITE_SERVICE_ID;
const  TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default  function Contact() {
  const[fromData, setFormData] = useState({
    name : "",
    email : "",
    service:"",
    budget : "",
    idea : "",
  });

  const [error, setError] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const{name,value} = e.target;
    if(name === "budget" && value && !/^\d+$/.test(value)) return;
    setFormData((p) => ({...p,[name] : value}));
    if(error[name]) setError((p) => ({...p ,[name] :""}));
  }

  const validateForm = () => {
  const required = ["name", "email", "service", "idea"];
  const newErrors = {};

  required.forEach((field) => {
    if (!fromData[field] || !fromData[field].trim()) {
      newErrors[field] = "Fill this field";
    }
  });

  if (fromData.service !== "other" && !fromData.budget.trim()) {
    newErrors.budget = "Fill this field";
  }

  setError(newErrors);
  return Object.keys(newErrors).length === 0;
};
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validateForm()) return;
    setStatus("sending");
    try {
  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      ...fromData,
      from_name: fromData.name,
      reply_to: fromData.email,
    },
    PUBLIC_KEY
  );

  setStatus("success");

  // clear form
  setFormData({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });

  // ⏱️ AUTO HIDE MESSAGE AFTER 3 SECONDS
  setTimeout(() => {
    setStatus("");
  }, 3000);

} catch (error) {
  setStatus("error");

  // auto hide error too
  setTimeout(() => {
    setStatus("");
  }, 3000);
}
    }
  

  return(
    <section id="contact" className="w-full min-h-screen relative bg-black overflow-hidden text-white 
    py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
      <Particles/>
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10"
      >
        <motion.div className="w-full md:w-1/2 flex justify-center"
        initial={{opacity: 0, x: -50}}
        whileInView={{opacity:1, x:0}}
        transition={{duration:0.6}}
        >
          <motion.img src={Astra} alt="contact"
          className="w-72 md:w-140 rounded-2xl shadow-lg object-cover pointer-events-none"
          animate={{y: [0,-10,0]}}
          transition={{duration:2, repeat: Infinity,ease:"easeInOut"}}
          />

        </motion.div>
        {/* right side */}
        <motion.div className="w-full md:w-1/2 bg-white/5 p-8 rounded-2xl shadow-lg border border-white/10"
        initial={{opacity: 0 , x: 50}}
        whileInView={{opacity:1, x:0}}
        transition={{duration: 0.6}}
        >
          <h2 className="text-3xl font-bold mb-6"
          >
            Let's Work Together

          </h2>

          <form className="flex flex-col gap-5" onSubmit = {handleSubmit}
          >
            <div className="flex flex-col"
            >
              <label className="mb-1">Your Name <span className="text-red-500"
              >*</span></label>
              <input type="text"
              name="name"
              placeholder="Your Name"
              value={fromData.name}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${error.name ? "border-red-500" : "border-gray-500"} text-white 
              focus:outline-none focus:border-blue-500`}
              />
              {error.name && <p className="text-red-500 text-xs">{error.name}</p>}

            </div>
            <div className="flex flex-col" 
            >
              <label className="mb-1">Your Email <span className="text-red-500"
              >*</span></label>
              <input type="text"
              name="email"
              placeholder="Your Email"
              value={fromData.email}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${error.email ? "border-red-500" : "border-gray-500"} text-white 
              focus:outline-none focus:border-blue-500`}
                />
              {error.email && <p className="text-red-500 text-xs">{error.email}</p>}

            </div>
            <div className="flex flex-col"
            >
              <label className="mb-1">Service Needed <span className="text-red-500">*</span></label>
              <select name="service"
              value={fromData.service}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${error.service ? "border-red-500" : "border-gray-500"} text-white 
              focus:outline-none focus:border-blue-500`}
              >
                <option value="" disabled>
                    Something in mind?
                </option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Application">Mobile Application</option>
                <option value="other">Others</option>
                </select>
                {error.service && <p className="text-red-500 text-xs">{error.service}</p>}


            </div>
            {fromData.service && fromData.service !== "other" &&(
              <div className="flex flex-col"
            >
              <label className="mb-1">Budget <span className="text-red-500"
              >*</span></label>
              <input type="text"
              name="budget"
              placeholder="Your budget"
              value={fromData.budget}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${error.budget ? "border-red-500" : "border-gray-500"} text-white 
              focus:outline-none focus:border-blue-500`}
              />
              {error.budget && <p className="text-red-500 text-xs">{error.budget}</p>}

            </div>
              
            )}
            <div className="flex flex-col"
            >
              <label className="mb-1">Explain Your Idea<span className="text-red-500">*</span></label>
              <textarea name = "idea"
              rows={5}
              placeholder="Enter Your Idea"
              value={fromData.idea}
              onChange={handleChange}
              className={`p-3 rounded-md bg-white/10 border ${error.idea ?  "border-red-500" : "border-gray-500"} text-white focus:outline-none focus:border-blue-500`}
                ></textarea>
                {error.idea && <p className="text-red-500 text-xs">{error.idea}</p>}

            </div>
            {status && (
              <p className={`text-sm ${status === "success" ? "text-green-400" : status === "error" ? "text-red-400" : "text-yellow-400"}`}
              >
                {status === "sending" ? "sending..." : status === "success" ? "Message sent successfully ✅" : "Something went wrong ❌"}
              </p>
            )}
            <motion.button className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-3 rounded-md font-semibold transition"
            whileHover={{scale:1.05}}
            whileTap={{scale:0.95}}
            disabled={status === "sending"}
            type="submit"
            >
              {status == "sending"  ? "sending..." : "Send Message"}

            </motion.button>


          </form>

        </motion.div>

      </div>

    </section>
  )
}