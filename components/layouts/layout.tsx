import React from "react";
import MainNav from "./main-nav";
import BillFilterForm from "../forms/bill-filter-form";
import BillContainer from "../containers/bill-container";
import SideNav from "./side-nav";
import { ProgressCircle } from "@tremor/react";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <MainNav />
      <div className="grid grid-cols-12 h-[calc(100vh-150px)]">
        <SideNav />
        <div className="col-span-3 p-6 ">
          <BillFilterForm />
          <BillContainer />
        </div>
        <main className=" col-span-5 p-6">{children}</main>
        <div className="col-span-3 p-6">
          <div className="">
            <h2 className=" text-2xl font-bold">Bill Progress</h2>
            <div className="mt-10">
              <ProgressCircle value={75} size="xl">
                <span className=" font-bold text-xl">75%</span>
              </ProgressCircle>
            </div>
            <h2 className=" text-2xl font-bold mt-6">Overview</h2>
            <div className=" grid grid-cols-2 mt-6 gap-4">
              <div className=" bg-primary h-[100px] rounded-md flex items-center justify-center font-bold">
                Total Bills: 50
              </div>
              <div className=" bg-blue-600 h-[100px] rounded-md flex items-center justify-center font-bold">
                Paid: 20
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex items-center mt-6 space-x-4 mb-6">
              <h2 className=" text-xl font-bold ">Recent History</h2>
              <Link href={"/history"}>
                <p className=" font-bold text-primary cursor-pointer">See All</p>
              </Link>
            </div>
            <div className=" border  p-6 rounded-md font-bold flex justify-between my-1">
              <p>Best Buy</p>
              <p>$35</p>
            </div>
            <div className=" border  p-6 rounded-md font-bold flex justify-between my-1">
              <p>My Bill</p>
              <p>$500</p>
            </div>
            <div className=" border  p-6 rounded-md font-bold flex justify-between my-1">
              <p>Car Payment</p>
              <p>$350</p>
            </div>
            <div className=" border  p-6 rounded-md font-bold flex justify-between my-1">
              <p>Lowes</p>
              <p>$35</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
