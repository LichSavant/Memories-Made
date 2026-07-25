import { useState } from "react";
import { NavLink } from "react-router-dom";
import Brand from "./Brand";

const links = [
  ["Weddings", "/weddings"],
  ["Debuts", "/debuts"],
  ["Packages", "/packages"],
  ["Process", "/process"],
  ["Gallery", "/gallery"],
  ["Booking", "/booking"],
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <Brand />
      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
      <nav
        id="site-navigation"
        className={`site-navigation${open ? " is-open" : ""}`}
        aria-label="Primary navigation"
      >
        {links.map(([label, to]) => (
          <NavLink
            key={to}
            to={to}
            onClick={close}
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
          >
            {label}
          </NavLink>
        ))}
        <NavLink className="header-cta" to="/availability" onClick={close}>
          Book Your Date
        </NavLink>
      </nav>
    </header>
  );
}
