import { sidebarItems } from "@/constants";
import Link from "next/link";
import React from "react";

const SideNav = () => {
  return (
    <div className="col-span-1 p-6 relative  space-y-6 mt-5">
      {sidebarItems.map((item) => (
        <Link
          key={item.title}
          className={`flex space-x-2 cursor-pointer hover:opacity-80 ${
            item.title === "Logout" ? "absolute bottom-8" : ""
          }`}
          href={item.href!}
          onClick={item.handleClick}
        >
          <item.icon />
          <p>{item.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default SideNav;
