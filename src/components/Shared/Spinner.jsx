import React from "react";
import { PropagateLoader } from "react-spinners";
const Spinner = () => {
  return (
    <div className="flex min-h-dvh justify-center items-center">
      <PropagateLoader />
    </div>
  );
};

export default Spinner;
