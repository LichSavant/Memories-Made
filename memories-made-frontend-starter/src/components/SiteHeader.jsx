import { Link } from "react-router-dom";
import Brand from "./Brand";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Brand />
      <Link className="text-link" to="/availability">
        Check Availability
      </Link>
    </header>
  );
}
