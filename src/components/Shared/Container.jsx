import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`${className} container mx-auto px-3 py-3  lg:px-4`}>
      {children}
    </div>
  );
};

export default Container;
