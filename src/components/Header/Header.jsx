import React, { useState } from "react";
import Logo from "../Logo";
import LogoutBtn from "./LogoutBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, BookOpen, PenSquare, LogIn, UserPlus, X, Menu } from "lucide-react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home",      slug: "/",          active: true,        icon: Home },
    { name: "Login",     slug: "/login",     active: !authStatus, icon: LogIn },
    { name: "Sign Up",   slug: "/signup",    active: !authStatus, icon: UserPlus },
    { name: "All Posts", slug: "/all-posts", active: authStatus,  icon: BookOpen },
    { name: "Write",     slug: "/add-post",  active: authStatus,  icon: PenSquare },
  ];

  const visibleNavItems = navItems.filter((item) => item.active);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: 'rgba(11, 11, 11, 0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #1F1F1F',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
            <Logo width="130px" />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {visibleNavItems.map((item) => {
              const isActive = location.pathname === item.slug;
              const Icon = item.icon;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer"
                    style={{
                      color: isActive ? '#C8FF2E' : '#9CA3AF',
                      backgroundColor: isActive ? 'rgba(200, 255, 46, 0.08)' : 'transparent',
                      border: isActive ? '1px solid rgba(200, 255, 46, 0.2)' : '1px solid transparent',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#FFFFFF';
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.color = '#9CA3AF';
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <Icon size={14} />
                    {item.name}
                  </button>
                </li>
              );
            })}
            {authStatus && (
              <li className="ml-3">
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors duration-150"
            style={{ color: '#9CA3AF', border: '1px solid #2B2B2B', backgroundColor: '#111111' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden py-4 px-2 pb-6 space-y-1 fade-in"
            style={{ borderTop: '1px solid #1F1F1F' }}
          >
            {visibleNavItems.map((item) => {
              const isActive = location.pathname === item.slug;
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => { navigate(item.slug); setMenuOpen(false); }}
                  className="w-full flex items-center gap-2 text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150"
                  style={{
                    color: isActive ? '#C8FF2E' : '#9CA3AF',
                    backgroundColor: isActive ? 'rgba(200, 255, 46, 0.08)' : 'transparent',
                  }}
                >
                  <Icon size={15} />
                  {item.name}
                </button>
              );
            })}
            {authStatus && (
              <div className="pt-3 px-4" style={{ borderTop: '1px solid #2B2B2B', marginTop: '8px' }}>
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
