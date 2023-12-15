import React from "react";
import BillList from "../lists/bill-list";
import { api } from "@/lib/api-service";

const BillContainer = () => {
  const bills = api.bills.useFetchBills();
  return <BillList bills={bills.data} isLoading={bills.isLoading} />;
};

export default BillContainer;
