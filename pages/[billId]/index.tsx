import WithLayout from "@/components/layouts/with-layout";
import BillPreviewTable from "@/components/tables/bill-preview-table";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api-service";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";

const BillDetails = () => {
  const router = useRouter();
  const { billId } = router.query;

  const bill = api.bills.useFetchBill(billId);

  const [isEditable, setIsEditable] = useState(false);

  if (bill.isLoading) {
    return (
      <div className="my-6">
        <Skeleton className=" h-12 w-[300px]" />
        <Skeleton className=" h-10 mt-20 w-full" />
        <Skeleton className=" h-10 mt-8 w-full" />
        <Skeleton className=" h-10 mt-8 w-full" />
        <Skeleton className=" h-28 mt-8 w-full" />
      </div>
    );
  }

  if (bill.isError) {
    return (
      <div className="w-full flex items-center h-full justify-center">
        <h2 className=" text-destructive text-2xl">Error fetching bill, please try again!</h2>
      </div>
    );
  }

  return (
    <BillPreviewTable isEditable={isEditable} setIsEditable={setIsEditable} bill={bill.data} />
  );
};

export default WithLayout(BillDetails);
