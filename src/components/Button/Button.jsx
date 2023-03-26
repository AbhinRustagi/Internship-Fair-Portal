import React from "react";
import { Link } from "react-router-dom";

function Button({ btnType, type, onClick, className, href, children }) {
  let btnStyles;

  switch (btnType) {
    case "dark":
      btnStyles = `bg-accent-200 hover-bg-accent text-white hover-text-white ${className}`;
      break;
    case "outline":
      btnStyles = `bg-white hover-bg-white text-accent hover-text-white hover-bg-accent border-accent ${className}`;
      break;
    case "dark-outline":
      btnStyles = `bg-white hover-bg-white text-accent-200 hover-text-white hover-bg-accent-200 border-accent-200 ${className}`;
      break;
    default:
      btnStyles = `btn bg-accent text-white hover-text-white hover-bg-accent-200`;
  }

  if (type === "btn") {
    return (
      <button
        onClick={onClick}
        className={btnStyles + " " + `btn py-xxs px-xs text-s`}
      >
        {children}
      </button>
    );
  } else {
    return (
      <Link className={btnStyles + " " + `btn py-xxs px-xs text-s`} to={href}>
        {children}
      </Link>
    );
  }
}

export default Button;
