import { FaExternalLinkAlt } from "react-icons/fa";
import "./Footer.css";

export function Footer() {
  return (
    <footer>
      <p>
        <a href="https://abhin.dev">
          Maintained & Developed by{" "}
          <span
            style={{
              textDecoration: "underline",
            }}
          >
            Abhin Rustagi
          </span>
          . <FaExternalLinkAlt />
        </a>
      </p>
      <p>
        &copy;The Placement Cell, Sri Venkateswara College, University of Delhi,
        2021.
      </p>
    </footer>
  );
}
