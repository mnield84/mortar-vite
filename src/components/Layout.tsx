import React from "react";
import Logo from "../assets/mortar_io_logo_pink_and_white.webp";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="h-full w-full">
      <div className="flex">
        <div className="flex flex-col bg-slate-900 w-[20%]">
          <div className="w-full flex justify-center p-4">
            <img className="w-2/3" src={Logo} alt="logo" />
          </div>
        </div>
        <div className="flex flex-1 w-[100vw] h-[100vh] relative">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
