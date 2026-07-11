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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-black-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <Logo width="120px" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              if (!item.active) return null;
              const isActive = location.pathname === item.slug;
              return (
                <li key={item.name} className="relative">
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all duration-150 cursor-pointer ${
                      isActive 
                        ? "text-brand-orange-600 bg-brand-orange-50/50 font-bold " 
                        : "text-neutral-black-600 hover:text-brand-orange-500 hover:bg-neutral-black-50 font-medium "
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              );
            })}
            {authStatus && (
              <li className="ml-4">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 text-neutral-black-700 hover:text-brand-orange-500 transition-colors p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <div className={`w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-neutral-black-100 py-4 px-6 flex flex-col gap-2 shadow-sm">
            {navItems.map((item) => {
              if (!item.active) return null;
              const isActive = location.pathname === item.slug;
              return (
                <button
                  key={item.name}
                  onClick={() => { navigate(item.slug); setMenuOpen(false); }}
                  className={`text-left px-4 py-3 rounded-lg text-sm transition-all duration-150 ${
                    isActive 
                      ? "text-brand-orange-600 bg-brand-orange-50 font-bold" 
                      : "text-neutral-black-600 hover:text-brand-orange-500 hover:bg-neutral-black-50 font-medium hover:font-bold"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
            {authStatus && (
              <div className="pt-3 border-t border-neutral-black-100 mt-2 px-4">
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
