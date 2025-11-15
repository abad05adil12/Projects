import React from "react";

const footer = () => {
  return (
    <>
      <div className="fixed h-30 bottom-0 w-screen flex  justify-center items-center gap-65 backdrop-blur-2xl bg-white/1 ">
        <div className="logo font text-white text-2xl">
          <span className="text-white">&lt;</span>
          <span>Pass-</span><span className="text-green-950">Mgmt/&gt;</span>
        </div>
        <div>
          <p className="text-white font-light">Created by Abad.</p>
        </div>
      </div>
    </>
  );
};

export default footer;
