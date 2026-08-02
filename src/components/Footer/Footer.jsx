import React from "react";
import { motion } from "framer-motion";
import { Mail, Send, Heart, ArrowUpRight } from "lucide-react";
import avatarSvg from "../../assets/avatar.svg";

function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/DIPEN-Dp",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/dipen-prajapati-497722322",
      icon: (
        <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/itz.dipen__07?igsh=MThid3Z2cjJzbnhyZA==",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      style={{
        backgroundColor: "#0B0B0B",
        borderTop: "1px solid #2B2B2B",
      }}
      className="relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-20"
        style={{
          width: "600px",
          height: "250px",
          background: "radial-gradient(ellipse at bottom, #C8FF2E 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10 relative z-10">
        {/* Main 3 Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 items-start">
          
          {/* LEFT SECTION — About Me (5 Cols on LG) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Circular profile picture frame - Large & Crisp */}
              <div className="relative group flex-shrink-0">
                <div
                  className="absolute -inset-1.5 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-300"
                  style={{ backgroundColor: "#C8FF2E" }}
                />
                <img
                  src={avatarSvg}
                  alt="Dipen Prajapati"
                  className="relative w-32 h-32 md:w-36 md:h-36 rounded-full object-cover object-top border-2 shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  style={{
                    borderColor: "#C8FF2E",
                    backgroundColor: "#171717",
                    boxShadow: "0 0 30px rgba(200, 255, 46, 0.35)",
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <h3
                  className="text-2xl font-bold tracking-tight text-white flex items-center gap-2"
                  style={{ letterSpacing: "-0.025em" }}
                >
                  Dipen Prajapati
                </h3>
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(200, 255, 46, 0.12)",
                    color: "#C8FF2E",
                    border: "1px solid rgba(200, 255, 46, 0.25)",
                  }}
                >
                  Full Stack Developer
                </span>
              </div>
            </div>

            <p
              className="text-sm leading-relaxed max-w-md font-normal"
              style={{ color: "#9CA3AF" }}
            >
              Passionate Full Stack Developer building modern web applications with
              React, Appwrite, Node.js and AI. I enjoy creating fast, beautiful
              and user-friendly digital experiences.
            </p>
          </motion.div>

          {/* CENTER SECTION — Social Links (3 Cols on LG) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 flex flex-col items-start lg:items-center space-y-4"
          >
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#FFFFFF" }}
            >
              Connect With Me
            </span>

            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, rotate: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300"
                  style={{
                    backgroundColor: "#171717",
                    border: "1px solid #2B2B2B",
                    color: "#9CA3AF",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#C8FF2E";
                    e.currentTarget.style.color = "#C8FF2E";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(200, 255, 46, 0.25)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#2B2B2B";
                    e.currentTarget.style.color = "#9CA3AF";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SECTION — Contact (4 Cols on LG) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-4"
          >
            <span
              className="text-xs font-bold uppercase tracking-widest block"
              style={{ color: "#FFFFFF" }}
            >
              Get In Touch
            </span>

            {/* Email item */}
            <a
              href="mailto:dipenprajapati@gmail.com"
              className="inline-flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group"
              style={{
                backgroundColor: "#171717",
                border: "1px solid #2B2B2B",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#C8FF2E";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#2B2B2B";
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300"
                style={{
                  backgroundColor: "rgba(200, 255, 46, 0.12)",
                  color: "#C8FF2E",
                }}
              >
                <Mail size={18} />
              </div>
              <span
                className="text-sm font-semibold transition-colors duration-300 group-hover:text-[#C8FF2E]"
                style={{ color: "#FFFFFF" }}
              >
                dipenprajapati@gmail.com
              </span>
            </a>

            <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
              Open for internships, collaborations and exciting projects.
            </p>

            {/* Let's Connect CTA Button */}
            <div>
              <motion.a
                href="mailto:dipenprajapati@gmail.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: "#C8FF2E",
                  color: "#000000",
                  boxShadow: "0 4px 20px rgba(200, 255, 46, 0.2)",
                }}
              >
                <Send size={13} />
                Let's Connect
                <ArrowUpRight size={14} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM FOOTER DIVIDER & COPYRIGHT */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium"
          style={{ borderTop: "1px solid #2B2B2B" }}
        >
          <p style={{ color: "#9CA3AF" }}>
            © 2026 Dipen Prajapati. All Rights Reserved.
          </p>

          <div className="flex items-center gap-1.5" style={{ color: "#9CA3AF" }}>
            <span>Built with</span>
            <Heart size={14} className="fill-current text-red-500 animate-pulse" />
            <span>using React + Appwrite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
