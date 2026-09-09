import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const destinations = [
  ["Packages", "/packages"],
  ["Gallery", "/gallery"],
  ["Process", "/process"],
  ["Availability", "/availability"],
  ["Contact", "/contact"],
];
const services = [
  ["Weddings", "/weddings"],
  ["Debuts", "/debuts"],
];
const activeClass = ({ isActive }) => (isActive ? "is-active" : undefined);

export default function SiteNavigation() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const root = useRef(null);
  const menuButton = useRef(null);
  const serviceButton = useRef(null);
  const close = useCallback(() => {
    setOpen(false);
    setServicesOpen(false);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);
  useEffect(() => {
    const outside = (event) => {
      if (!root.current?.contains(event.target)) close();
    };
    document.addEventListener("pointerdown", outside);
    const query = matchMedia("(max-width: 900px)");
    query.addEventListener("change", close);
    return () => {
      document.removeEventListener("pointerdown", outside);
      query.removeEventListener("change", close);
    };
  }, [close]);

  const link = ([label, to]) => (
    <NavLink key={to} to={to} className={activeClass} onClick={close}>
      {label}
    </NavLink>
  );
  return (
    <nav
      className="bottom-nav"
      aria-label="Primary navigation"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        if (open) menuButton.current?.focus();
        else if (servicesOpen) serviceButton.current?.focus();
        close();
      }}
    >
      <div className="desktop-navigation">
        <div className="services-menu">
          <button
            ref={serviceButton}
            type="button"
            aria-expanded={servicesOpen}
            aria-controls="service-navigation"
            onClick={() => setServicesOpen(!servicesOpen)}
            className={
              services.some(([, path]) => path === pathname)
                ? "is-active"
                : undefined
            }
          >
            Services{" "}
            <span aria-hidden="true">{servicesOpen ? "-" : "+"}</span>
          </button>
          <div
            id="service-navigation"
            className="services-panel"
            hidden={!servicesOpen}
          >
            {services.map(link)}
          </div>
        </div>
        {destinations.map(link)}
        <NavLink className="nav-booking" to="/booking" onClick={close}>
          Start Your Inquiry
        </NavLink>
      </div>
      <div className="mobile-navigation">
        <NavLink to="/" end className={activeClass} onClick={close}>
          Home
        </NavLink>
        <button
          type="button"
          ref={menuButton}
          aria-expanded={open}
          aria-controls="mobile-navigation-panel"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}{" "}
          <span aria-hidden="true">{open ? "-" : "+"}</span>
        </button>
        <NavLink className="nav-booking" to="/booking" onClick={close}>
          Start Your Inquiry
        </NavLink>
      </div>
      <div
        id="mobile-navigation-panel"
        className="mobile-navigation-panel"
        hidden={!open}
      >
        <p className="section-kicker">Explore Memories Made</p>
        <div className="mobile-services">
          <span>Services</span>
          {services.map(link)}
        </div>
        {destinations.map(link)}
      </div>
    </nav>
  );
}
