"use client";

import { useEffect, useState, useRef} from "react";

import { motion } from "framer-motion";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });

  const [particles, setParticles] = useState([]);
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_2pugzs4",
      "template_xyz789",
      form.current,
      "pQwErTy123456"
    ).then(() => {
      alert("Email sent successfully!");
      form.current.reset();
    });
  };

  useEffect(() => {
    let frame;

    const animate = () => {
      setSmoothMouse((prev) => ({
        x: prev.x + (mouse.x - prev.x) * 0.08,
        y: prev.y + (mouse.y - prev.y) * 0.08,
      }));

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, [mouse]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
      }))
    );
  }, []);

  const clearForm = () => {
    form.current.reset();
  };

  return (
  <main className="relative z-10 scroll-smooth min-h-screen text-white overflow-x-hidden">
  {/* BACKGROUND */}
  <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
    {/* base dark gradient */}
    <div className="absolute inset-0 bg-[#05060a]" />

    {/* aurora layer 1 */}
    <div
      className="absolute w-[900px] h-[900px] rounded-full blur-[120px]"
      style={{
        background:
          "radial-gradient(circle, rgba(120,119,198,0.22), transparent 60%)",
        transform: `translate(${smoothMouse.x * 140}px, ${smoothMouse.y * 140}px)`,
        top: "-20%",
        left: "-20%",
      }}
    />

    {/* aurora layer 2 */}
    <div
      className="absolute w-[800px] h-[800px] rounded-full blur-[140px]"
      style={{
        background:
          "radial-gradient(circle, rgba(56,189,248,0.14), transparent 60%)",
        transform: `translate(${smoothMouse.x * -120}px, ${smoothMouse.y * -120}px)`,
        bottom: "-20%",
        right: "-20%",
      }}
    />

    {/* particles */}
    {particles.map((p, i) => {
      const moveX = smoothMouse.x * (12 + (i % 5) * 2);
      const moveY = smoothMouse.y * (12 + (i % 5) * 2);

      return (
        <div
          key={i}
          className="absolute rounded-full bg-white/40 z-0"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,

            // 👇 ensure visibility (minimum size + slightly brighter)
            width: `${Math.max(p.size, 1.5)}px`,
            height: `${Math.max(p.size, 1.5)}px`,

            opacity: 0.35 + (i % 3) * 0.15,

            // 👇 smoother movement (less extreme drift)
            transform: `translate(${moveX}px, ${moveY}px)`,
            boxShadow: "0 0 6px rgba(255,255,255,0.3)",
          }}
        />
      );
    })}
  </div>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-10 py-6 bg-white/5 border-b border-white/10 backdrop-blur-md z-50">

        {/* LOGO */}

        <h1 className="text-2xl font-bold tracking-wide">
          JC
        </h1>

        {/* NAV LINKS */}

        <div className="hidden md:flex items-center gap-10 text-sm md:text-base font-medium">

          <a
            href="#about"
            className="hover:text-purple-400 transition-all duration-300"
          >
            About
          </a>

          <a
            href="#projects"
            className="hover:text-purple-400 transition-all duration-300"
          >
            Projects
          </a>

          <a
            href="#contact"
            className="hover:text-purple-400 transition-all duration-300"
          >
            Contact
          </a>

          <a
            href="/JanhaviChitreResume.pdf"
            download
            className="
              px-5 py-2
              border border-purple-500/40
              rounded-full
              hover:bg-purple-500
              transition-all duration-300
            "
          >
            Resume
          </a>

        </div>
      </nav>

      {/* HERO SECTION */}

      <section className="relative z-20 min-h-screen flex flex-col justify-center items-center text-center px-6">
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full"></div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold relative z-20"
        >
          Janhavi Chitre
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-gray-300 text-lg md:text-2xl max-w-2xl relative z-20"
        >
          Artificial Intelligence & Data Science Student | Full-Stack Developer
        </motion.p>

        {/* SOCIAL ICON BUTTONS */}
        <div className="flex gap-6 mt-10 relative z-10">
          <a
            href="https://github.com/JanhaviChitre"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-purple-500/20 hover:border-purple-400 hover:scale-110 transition-all duration-300 cursor-pointer"
            aria-label="GitHub"
          >
            <FaGithub className="text-2xl" />
          </a>

          <a
            href="https://www.linkedin.com/in/janhavi-chitre-aba085371/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-purple-500/20 hover:border-purple-400 hover:scale-110 transition-all duration-300 cursor-pointer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="text-2xl" />
          </a>

          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=janhavichitre@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-purple-500/20 hover:border-purple-400 hover:scale-110 transition-all duration-300 cursor-pointer"
            aria-label="Email"
          >
            <FaEnvelope className="text-2xl" />
          </a>

        </div>

        {/* BUTTONS */}

        <div className="flex gap-4 mt-10">

          <a
            href="#projects"
            className="px-6 py-3 bg-white text-black rounded-2xl font-semibold hover:scale-105 transition"
          >
            View Projects
          </a>

          <a
            href="#contact"
            className="px-6 py-3 border border-white rounded-2xl hover:bg-white hover:text-black transition"
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}

      <section
        id="about"
        className="scroll-mt-24 min-h-screen flex flex-col justify-start pt-32 px-10 md:px-24"
      >

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-8"
        >
          About Me
        </motion.h2>

        <motion.p
          whileInView={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="text-gray-400 text-lg leading-8 max-w-4xl"
        >
          I am an AI & Data Science student with a strong interest in full-stack development, passionate about designing and building scalable, user-centric applications.
          I focus on transforming data into meaningful, efficient, and real-world solutions using a data-driven approach.
        </motion.p>
      </section>

      {/* SKILLS SECTION */}

      <section className="min-h-screen px-10 md:px-24 py-24">

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-20"
        >
          Skills
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            staggerChildren: 0.15,
          }}
        >

          {[
            "React",
            "Next.js",
            "Node.js",
            "MongoDB",
            "Python",
            "JavaScript",
            "HTML",
            "CSS",
          ].map((skill, index) => (

            <motion.div
              key={index}
              whileHover={{
                scale: 1.08,
                y: -10,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="
                relative
                overflow-hidden
                bg-white/5
                border border-white/10
                backdrop-blur-lg
                p-8
                rounded-3xl
                shadow-lg
                transition-all duration-300

                flex flex-col items-center justify-center
                min-h-[120px]
                text-center

                hover:shadow-purple-500/30
                hover:border-purple-400
                hover:bg-white/10
              "
            >

              {/* BACKGROUND GLOW */}

              <div className="absolute inset-0 bg-purple-500/5" />

              {/* CONTENT */}

              <div className="relative z-10">

                <div className="w-3 h-3 bg-purple-400 rounded-full mx-auto mb-4"></div>

                <p className="text-xl font-semibold tracking-wide">
                  {skill}
                </p>

              </div>

            </motion.div>

          ))}
        </motion.div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="px-10 md:px-24 pt-16 pb-24"
      >

        <h2 className="text-4xl md:text-6xl font-bold mb-16">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          {/* PROJECT CARD */}

          <motion.div
            whileHover={{scale: 1.03, y: -5}}
            className="bg-[#111] border border-gray-800 p-8 rounded-3xl"
          >

            <h3 className="text-3xl font-bold">
              RoadPulse
            </h3>

            <p className="mt-6 text-gray-400 leading-8">
              A crowdsourced system that detects potholes and
              road anomalies using smartphone sensors and
              FastAPI backend processing.
            </p>

            <div className="flex gap-3 mt-8 flex-wrap">
              <span className="bg-gray-800 px-4 py-2 rounded-full">
                FastAPI
              </span>

              <span className="bg-gray-800 px-4 py-2 rounded-full">
                Python
              </span>

              <span className="bg-gray-800 px-4 py-2 rounded-full">
                AI
              </span>
            </div>
          </motion.div>

          {/* SECOND PROJECT */}

          <motion.div
            whileHover={{scale: 1.03, y: -5}}
            className="bg-[#111] border border-gray-800 p-8 rounded-3xl"
          >

            <h3 className="text-3xl font-bold">
              VCET EduPortal
            </h3>

            <p className="mt-6 text-gray-400 leading-8">
              Full-stack college website built using Next.js
              and MongoDB with responsive UI and backend integration.
            </p>

            <div className="flex gap-3 mt-8 flex-wrap">
              <span className="bg-gray-800 px-4 py-2 rounded-full">
                Next.js
              </span>

              <span className="bg-gray-800 px-4 py-2 rounded-full">
                MongoDB
              </span>

              <span className="bg-gray-800 px-4 py-2 rounded-full">
                React
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}

      <section
        id="contact"
        className="scroll-mt-24 min-h-screen flex flex-col justify-start items-center text-center pt-32 px-6"
      >

        <h2 className="text-5xl font-bold">
          Contact Me
        </h2>

        <p className="mt-6 text-gray-400 text-lg">
          Let’s build something amazing together.
        </p>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="mt-10 flex flex-col gap-5 w-full max-w-md mx-auto"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-3 rounded-xl text-white bg-white/5 border border-white/10 backdrop-blur-md outline-none focus:border-purple-400 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-3 rounded-xl text-white bg-white/5 border border-white/10 backdrop-blur-md outline-none focus:border-purple-400 transition"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            className="w-full p-3 rounded-xl text-white bg-white/5 border border-white/10 backdrop-blur-md outline-none focus:border-purple-400 transition"
          ></textarea>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-2xl font-semibold text-white
            bg-gradient-to-r from-purple-500/70 via-blue-500/60 to-cyan-500/60
            hover:scale-105 transition shadow-lg shadow-purple-500/20"
          >
            Send Message
          </button>
        </form>
      </section>

    <footer className="border-t border-white/10 py-10 text-center text-gray-500">
      <p>
        © 2026 Janhavi Chitre. Built with Next.js & Tailwind CSS.
      </p>
    </footer>
    </main>
  );
}