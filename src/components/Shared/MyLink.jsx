import React from "react";
import { NavLink } from "react-router-dom";

const MyLink = ({ path, children }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `px-4 py-2 rounded-md transition-all font-medium text-white ${
          isActive
            ? "bg-(--color-secondary)"
            : "hover:bg-(--color-secondary-hover)"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default MyLink;
