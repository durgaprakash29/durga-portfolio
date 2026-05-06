"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  FaGithub,
  FaDownload,
  FaEye,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaPython,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiMongodb,
  SiMysql,
  SiFlask,
} from "react-icons/si";

import {
  Sparkles,
  Brain,
} from "lucide-react";

type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  fork?: boolean;
  updated_at?: string;
};

type Particle = {
  id: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  size: number;
};

const roles = [
  "Full Stack Developer",
  "AI & Data Science Student",
  "Modern UI Builder",
  "Problem Solver",
];

export default function Home() {

  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const particles: Particle[] = useMemo(() => {

    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${(i * 7) % 100}%`,
      top: `${(i * 13) % 100}%`,
      duration: 10 + (i % 10),
      delay: i * 0.2,
      size: 2 + (i % 4),
    }));

  }, []);

  /* LOADING */
  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => clearTimeout(timer);

  }, []);

  /* CURSOR */
  useEffect(() => {

    const mouseMove = (e: MouseEvent) => {

      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });

    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };

  }, []);

  /* TYPING */
  useEffect(() => {

    const currentRole = roles[roleIndex];

    const timeout = setTimeout(() => {

      setText((prev) =>
        isDeleting
          ? currentRole.substring(0, prev.length - 1)
          : currentRole.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === currentRole) {

        setTimeout(() => {
          setIsDeleting(true);
        }, 1000);

      } else if (isDeleting && text === "") {

        setIsDeleting(false);

        setRoleIndex((prev) =>
          (prev + 1) % roles.length
        );

      }

    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);

  }, [text, isDeleting, roleIndex]);

  /* GITHUB */
  useEffect(() => {

    fetch("https://api.github.com/users/durgaprakash29/repos")
      .then((res) => res.json())
      .then((data: Repo[]) => {

        const filtered = data
          .filter((repo) => !repo.fork)
          .sort(
            (a, b) =>
              new Date(b.updated_at || "").getTime() -
              new Date(a.updated_at || "").getTime()
          );

        setRepos(filtered);

      })
      .catch((err) => {
        console.error(err);
      });

  }, []);

  /* LOADER */
  if (loading) {

    return (

      <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">

        <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />

        <div className="relative z-10 flex flex-col items-center">

          <div className="relative w-28 h-28">

            <div className="absolute inset-0 rounded-full border-4 border-purple-500/20" />

            <div className="absolute inset-0 rounded-full border-t-4 border-purple-500 animate-spin" />

            <div className="absolute inset-3 rounded-full border-b-4 border-blue-500 animate-spin" />

          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-10 text-5xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
          >
            Durga Prakash
          </motion.h1>

          <p className="text-gray-500 mt-4 tracking-[0.3em] uppercase text-sm">
            Loading Portfolio
          </p>

        </div>

      </div>

    );

  }

  return (

    <main className="relative bg-[#030303] text-white min-h-screen overflow-hidden px-6 md:px-24">

      {/* CURSOR */}
      <motion.div
        animate={{
          x: mousePosition.x - 120,
          y: mousePosition.y - 120,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
        className="pointer-events-none fixed top-0 left-0 z-30 w-[240px] h-[240px] rounded-full bg-purple-500/20 blur-3xl"
      />

      {/* PARTICLES */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        {particles.map((particle) => (

          <motion.div
            key={particle.id}
            initial={{
              y: 0,
              opacity: 0,
            }}
            animate={{
              y: [-20, -1000],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
            className="absolute bg-white/20 rounded-full"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
            }}
          />

        ))}

      </div>

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-20 overflow-hidden">

        <div className="absolute top-[-250px] left-[-150px] w-[700px] h-[700px] bg-purple-600/20 blur-3xl rounded-full animate-pulse" />

        <div className="absolute bottom-[-250px] right-[-100px] w-[700px] h-[700px] bg-blue-600/20 blur-3xl rounded-full animate-pulse" />

      </div>

      {/* GRID */}
      <div className="fixed inset-0 -z-10 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* NAVBAR */}
      <nav className="sticky top-4 z-50 flex justify-between items-center py-4 px-6 rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-2xl mt-4">

        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
        >
          Durga Prakash
        </motion.h1>

        <motion.a
          whileHover={{ scale: 1.08 }}
          href="#contact"
          className="border border-white/10 px-5 py-2 rounded-full hover:bg-purple-500 transition"
        >
          Contact
        </motion.a>

      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center max-w-6xl">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="flex items-center gap-2 mb-6 text-purple-400">

            <Sparkles size={18} />

            <p className="tracking-[0.25em] uppercase text-sm">
              Portfolio 2026
            </p>

          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tight">

            Crafting{" "}

            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              premium
            </span>

            <br />

            AI-powered experiences

          </h1>

          {/* TYPING */}
          <div className="mt-8 h-[40px]">

            <h2 className="text-2xl md:text-3xl font-semibold text-purple-400">

              {text}

              <span className="animate-pulse">
                |
              </span>

            </h2>

          </div>

          <p className="mt-6 text-xl text-gray-400 max-w-3xl leading-relaxed">
            Passionate about building intelligent systems,
            modern web applications,
            and immersive digital experiences.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-5 mt-10 flex-wrap">

            <motion.a
              whileHover={{
                scale: 1.06,
                y: -3,
              }}
              whileTap={{ scale: 0.96 }}
              href="/resume.pdf"
              download="Durga_Resume.pdf"
              className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 px-7 py-4 rounded-2xl font-medium shadow-[0_10px_40px_rgba(168,85,247,0.35)]"
            >
              <FaDownload />
              Download Resume
            </motion.a>

            <motion.a
              whileHover={{
                scale: 1.06,
                y: -3,
              }}
              whileTap={{ scale: 0.96 }}
              href="/resume.pdf"
              target="_blank"
              className="flex items-center gap-3 border border-white/10 bg-white/[0.03] px-7 py-4 rounded-2xl hover:bg-white/[0.05]"
            >
              <FaEye />
              View Resume
            </motion.a>

          </div>

        </motion.div>

      </section>

      {/* SKILLS */}
      <section className="py-24 border-t border-white/10">

        <h2 className="text-4xl font-bold mb-12">
          Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-14">

          <div>

            <h3 className="text-2xl text-purple-400 mb-8 font-semibold">
              Technical Skills
            </h3>

            <div className="flex flex-wrap gap-4">

              {[
                { name: "HTML", icon: <FaHtml5 /> },
                { name: "CSS", icon: <FaCss3Alt /> },
                { name: "JavaScript", icon: <FaJs /> },
                { name: "React", icon: <FaReact /> },
                { name: "Node.js", icon: <FaNodeJs /> },
                { name: "Python", icon: <FaPython /> },
                { name: "MongoDB", icon: <SiMongodb /> },
                { name: "MySQL", icon: <SiMysql /> },
                { name: "Flask", icon: <SiFlask /> },
                { name: "Git", icon: <FaGitAlt /> },
                { name: "Machine Learning", icon: <Brain size={16} /> },
              ].map((skill, i) => (

                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.08,
                    y: -2,
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-purple-500 hover:text-white transition"
                >
                  {skill.icon}
                  {skill.name}
                </motion.div>

              ))}

            </div>

          </div>

          <div>

            <h3 className="text-2xl text-purple-400 mb-8 font-semibold">
              Soft Skills
            </h3>

            <div className="flex flex-wrap gap-4">

              {[
                "Communication",
                "Leadership",
                "Teamwork",
                "Problem Solving",
                "Adaptability",
              ].map((skill, i) => (

                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.08,
                    y: -2,
                  }}
                  className="px-5 py-3 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-purple-500 hover:text-white transition"
                >
                  {skill}
                </motion.div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* PROJECTS */}
      <section className="py-24 border-t border-white/10">

        <h2 className="text-4xl font-bold mb-12">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">

          {repos.map((repo) => (

            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              whileHover={{
                rotateX: 6,
                rotateY: -6,
                scale: 1.03,
              }}
              transition={{
                duration: 0.3,
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
              className="group p-8 rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl hover:border-purple-500 transition"
            >

              <div className="flex justify-between items-center">

                <h3 className="text-2xl font-semibold">
                  {repo.name}
                </h3>

                <FaGithub className="text-gray-500 group-hover:text-purple-400 transition" />

              </div>

              <p className="text-gray-400 mt-5 leading-relaxed">
                {repo.description || "GitHub Project"}
              </p>

              <p className="text-purple-400 mt-8 text-sm">
                View Project →
              </p>

            </motion.a>

          ))}

        </div>

      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-28 border-t border-white/10"
      >

        <h2 className="text-5xl font-bold text-center">
          Let&apos;s Connect
        </h2>

        <p className="text-center text-gray-400 mt-5 mb-14 text-lg">
          📧 durgaprakash0205@gmail.com
        </p>

        <div className="flex justify-center">

          <form
            action="https://formspree.io/f/xnjwvkyk"
            method="POST"
            className="w-full max-w-2xl flex flex-col gap-6"
          >

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 outline-none focus:border-purple-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 outline-none focus:border-purple-500"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 outline-none focus:border-purple-500 min-h-[180px]"
            />

            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-blue-600 py-5 rounded-2xl text-lg font-medium shadow-[0_10px_40px_rgba(168,85,247,0.35)]"
            >
              Send Message
            </motion.button>

          </form>

        </div>

      </section>

    </main>

  );

}