import React from "react";

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-mytext size-16 animate-spin rounded-full border-4 border-t-white"></div>
    </div>
  );
};

export default Loader;
