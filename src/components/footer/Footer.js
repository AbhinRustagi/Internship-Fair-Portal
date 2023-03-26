import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <p>
        <a href="http://abhinrustagi.github.io">
          Maintained & Developed by{" "}
          <span
            style={{
              textDecoration: "underline",
            }}
          >
            Abhin Rustagi
          </span>
          . <i className="fas fa-external-link-alt"></i>
        </a>
      </p>
      <p>
        &copy;The Placement Cell, Sri Venkateswara College, University of Delhi,
        2021.
      </p>
    </footer>
  );
}
export default Footer;
