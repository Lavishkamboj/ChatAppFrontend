import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      if (window.innerWidth >= 640) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Login", path: "/login" },
    { label: "Signup", path: "/sign-up" },
    { label: "Logout", path: "/logout" },
  ];

  return (
    <nav style={s.nav}>
      <h2 style={s.logo}>ChatApp</h2>

      {/* desktop */}
      {!isMobile && (
        <div style={s.desktopLinks}>
          {links.map((l, i) => (
            <Link key={i} to={l.path} style={s.link}>
              {l.label}
            </Link>
          ))}
        </div>
      )}

      {/* hamburger - mobile only */}
      {isMobile && (
        <div style={s.hamburger} onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </div>
      )}

      {/* mobile dropdown */}
      {isMobile && open && (
        <div style={s.dropdown}>
          {links.map((l, i) => (
            <Link
              key={i}
              to={l.path}
              style={s.dropLink}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

const s = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    height: "56px",
    backgroundColor: "#141414",
    borderBottom: "1px solid #222",
    position: "relative",
  },
  logo: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "600",
    color: "#a78bfa",
    letterSpacing: "-0.5px",
  },
  desktopLinks: {
    display: "flex",
    gap: "4px",
  },
  link: {
    color: "#888",
    textDecoration: "none",
    fontSize: "14px",
    padding: "6px 12px",
    borderRadius: "5px",
  },
  hamburger: {
    fontSize: "20px",
    color: "#aaa",
    cursor: "pointer",
  },
  dropdown: {
    position: "absolute",
    top: "56px",
    right: "16px",
    left: "16px",
    backgroundColor: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "8px",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    zIndex: 100,
  },
  dropLink: {
    color: "#aaa",
    textDecoration: "none",
    fontSize: "15px",
    padding: "10px 14px",
    borderRadius: "5px",
  },
};