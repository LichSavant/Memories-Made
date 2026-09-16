import { Link } from "react-router-dom";

export default function Brand({ footer = false }) {
  return (
    <Link
      className={`brand${footer ? " brand--footer" : ""}`}
      to="/"
      aria-label="MemoriesMade home"
    >
      {!footer && (
        <span className="brand__ornament" aria-hidden="true">
          <i />
          <b>✦</b>
          <i />
        </span>
      )}
      <strong>MemoriesMade</strong>
      <small>WEDDINGS &amp; EVENTS</small>
    </Link>
  );
}
