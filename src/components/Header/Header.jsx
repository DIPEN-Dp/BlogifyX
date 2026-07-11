import React, { useState, useEffect } from "react";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home",      slug: "/",          active: true },
    { name: "Login",     slug: "/login",     active: !authStatus },
    { name: "Signup",    slug: "/signup",    active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post",  slug: "/add-post",  active: authStatus },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-6xl mx-auto">
        <nav className="flex items-center justify-between px-6 py-3.5 rounded-2xl glass shadow-xl shadow-black/30 border border-white/10">
          {/* Logo */}
          <Link to="/" className="hover:opacity-90 transition-opacity">
            <Logo width="120px" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              if (!item.active) return null;
              const isActive = location.pathname === item.slug;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer relative ${
                      isActive 
                        ? "text-white bg-white/10" 
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-500 shadow-[0_0_8px_#8b5cf6]" />
                    )}
                  </button>
                </li>
              );
            })}
            {authStatus && (
              <li className="ml-2">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1 text-slate-300 hover:text-white transition-colors p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-1.5 border border-white/10 shadow-xl">
            {navItems.map((item) => {
              if (!item.active) return null;
              const isActive = location.pathname === item.slug;
              return (
                <button
                  key={item.name}
                  onClick={() => { navigate(item.slug); setMenuOpen(false); }}
                  className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-white bg-white/10" 
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
            {authStatus && (
              <div className="pt-2 border-t border-white/5 mt-1">
                <LogoutBtn />
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
