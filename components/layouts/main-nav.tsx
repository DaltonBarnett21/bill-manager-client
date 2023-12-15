import { useUser } from "@/stores/userstore";
import React from "react";
import { ThemeToggle } from "../theme-toggle";

const MainNav = () => {
  const { name } = useUser();

  return (
    <nav className="p-6 flex  items-center justify-between">
      <h2 className=" font-semibold text-2xl">Bill Manager</h2>
      <div className="flex items-center space-x-4">
        <span className="font-bold">Welcome, {name}!</span>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default MainNav;
