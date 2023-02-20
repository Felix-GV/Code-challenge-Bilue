import React from "react";
import $ from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // or 'secondary'
  clear = false,
}) => {
  const className =
    variant === "primary"
      ? $.primary
      : variant === "secondary"
      ? $.secondary
      : "";

  const clearClass = clear ? $.clear : "";

  return (
    <button
      className={`${$.button} ${className} ${clearClass}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
