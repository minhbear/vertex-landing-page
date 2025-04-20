"use client";

import React, { ComponentPropsWithoutRef, FC } from "react";

import { twJoin } from "tailwind-merge";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout: FC<ComponentPropsWithoutRef<"div">> = ({
  children,
  className,
  ...otherProps
}) => {
  const pathName = usePathname();

  return (
    <>
      <Toaster />
      <div className="min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(139,92,246,0.3)_0%,transparent_30%),radial-gradient(circle_at_90%_80%,rgba(59,130,246,0.3)_0%,transparent_30%)] -z-[1]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(rgba(148,163,184,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30 -z-[1]"></div>
        <Header />

        <div
          className={twJoin(
            "z-[10]",
            "max-w-full",
            "min-h-screen",
            "overflow-x-hidden",
            "mx-auto pt-[76px]",
            "relative flex flex-col",
            pathName !== "/" && "sm:max-w-[1376px]"
          )}
        >
          {children}
        </div>
        {pathName === "/" && <Footer />}
      </div>
    </>
  );
};

export default MainLayout;
