import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="content-wrapper px-[3%] py-10">
        <Outlet />
      </div>
    </div>
  );
}
