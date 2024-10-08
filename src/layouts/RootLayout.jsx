import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <div className="h-screen">
      <Navbar />
      <div className=" h-[calc(100vh-4rem)] overflow-y-auto  text-base-content bg-base-100 px-[3%] py-10">
        <Outlet />
      </div>
    </div>
  );
}
