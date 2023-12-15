import React from "react";
import { ScrollArea } from "../ui/scroll-area";
import { BillResponse } from "@/types";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

interface Props {
  bills: BillResponse[] | undefined;
  isLoading: boolean;
}

const BillList = ({ bills, isLoading }: Props) => {
  if (isLoading) {
    return <BillListSkeleton />;
  }

  return (
    <ScrollArea className=" w-full  border h-[800px]  rounded-md ">
      {bills?.map((bill, index) => {
        return (
          <Link href={`/${bill.id}`}>
            <div
              key={index}
              className={`p-6 border space-y-1 flex justify-between items-center cursor-pointer hover:bg-primary/10 ${
                bill.isPaid ? "opacity-40" : ""
              }`}
            >
              <div>
                <h4 className=" font-bold text-xl">{bill.billName}</h4>
                <div className="flex space-x-2">
                  <p className=" text-muted-foreground font-bold">status: </p>
                  <p
                    className={`font-bold 
                    ${bill.isPaid ? " text-green-500" : "text-red-500"}
             
                text-gray-400
              `}
                  >
                    {bill.isPaid ? "Paid" : "Unpaid"}
                  </p>
                </div>
              </div>
              <h2 className=" text-2xl font-semibold">${bill.amount}</h2>
            </div>
          </Link>
        );
      })}
    </ScrollArea>
  );
};

export default BillList;

const BillListSkeleton = () => {
  return (
    <ScrollArea className=" w-full h-[800px] border  rounded-md ">
      {Array(10)
        .fill(10)
        .map((_, index) => {
          return (
            <div
              key={index}
              className={`p-6 border space-y-1 flex justify-between items-center cursor-pointer hover:bg-primary/40 `}
            >
              <div>
                <Skeleton className=" h-5 w-[150px]" />
                <div className="flex space-x-1 mt-2">
                  <Skeleton className=" h-5 w-[60px]" />
                </div>
              </div>
              <Skeleton className=" h-8 w-[70px]" />
            </div>
          );
        })}
    </ScrollArea>
  );
};
