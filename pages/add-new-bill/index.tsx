import AddBillForm from "@/components/forms/add-bill-form";
import WithLayout from "@/components/layouts/with-layout";
import React from "react";

const AddNewBill = () => {
  return <AddBillForm />;
};

export default WithLayout(AddNewBill);
