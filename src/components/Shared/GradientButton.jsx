import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const GradientButton = ({ children, to, className }) => {
  return (
    <Link
      to={to}
      className={`font-bold btn rounded-lg shadow-lg  transition-all duration-300 
        hover:scale-105 hover:shadow-xl 
        active:scale-95 ${className}`}
      style={{
        background:
          "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
        color: "var(--color-text-light)",
      }}
    >
      <span className="text-sm sm:text-base">{children}</span>
      <FaArrowRight className="text-sm sm:text-base" />
    </Link>
  );
};

export default GradientButton;
