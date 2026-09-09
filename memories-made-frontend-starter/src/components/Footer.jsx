import { Link } from "react-router-dom";
import Brand from "./Brand";

const groups = [
  [
    "Services",
    [
      ["Weddings", "/weddings"],
      ["Debuts", "/debuts"],
    ],
  ],
  [
    "Explore",
    [
      ["Packages", "/packages"],
      ["Gallery", "/gallery"],
      ["Our Process", "/process"],
    ],
  ],
  [
    "Plan",
    [
      ["Check Availability", "/availability"],
      ["Start Your Inquiry", "/booking"],
    ],
  ],
  ["Contact", [["Get in Touch", "/contact"]]],
];
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-intro">
        <Brand footer />
        <p>Events Organizing Services</p>
        <p>
          Thoughtful planning. Personal celebrations.
          <br />
          Memories that stay with you.
        </p>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        {groups.map(([title, links]) => (
          <div key={title}>
            <h2>{title}</h2>
            {links.map(([label, to]) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
      <p className="footer-colophon">
        © {new Date().getFullYear()} Memories Made. Weddings &amp; events,
        thoughtfully planned.
      </p>
    </footer>
  );
}
