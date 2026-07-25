import { Link } from "react-router-dom";

export default function PrimaryButton({ to, children }) {
  return (
    <Link className="primary-button" to={to}>
      {children}
    </Link>
  );
}
