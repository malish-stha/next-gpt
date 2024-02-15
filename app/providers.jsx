"use client";

import { Toaster } from "react-hot-toast";

const Providers = ({ children }) => {
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  );
};

export default Providers;
