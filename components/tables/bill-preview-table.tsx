import React, { useEffect } from "react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Icons } from "@/lib/icons";
import Confirm from "../dialogs/confirm";
import { BillResponse, EditBill, EditBillSchema } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api-service";

interface Props {
  isEditable: boolean;
  setIsEditable: any;
  bill: BillResponse | undefined;
}

const BillPreviewTable = ({ isEditable, setIsEditable, bill }: Props) => {
  const { mutate } = api.bills.useUpdateBill();

  const form = useForm<EditBill>({
    resolver: zodResolver(EditBillSchema),
    defaultValues: {
      amount: "",
      billName: "",
      isPaid: "",
      note: "",
    },
  });

  async function onSubmit(values: EditBill) {
    let data = {
      ...(values.amount !== "" && { amount: values.amount }),
      ...(values.billName !== "" && { billName: values.billName }),
      ...(values.note !== "" && { note: values.note }),
      ...(values.isPaid !== "" && { isPaid: values.isPaid == "true" }),
    };
    setIsEditable(false);
    mutate({
      billId: bill?.id,
      ...data,
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className=" text-4xl font-bold">{bill?.billName}</h2>
            <span className={` font-bold ${bill?.isPaid ? "text-green-500" : "text-red-500"} `}>
              {bill?.isPaid ? "Paid" : "Unpaid"}
            </span>
          </div>
          <div className="flex space-x-2">
            <Icons.edit className=" cursor-pointer" onClick={() => setIsEditable(true)} />
            <Confirm trigger={<Icons.trash className="text-red-500 cursor-pointer" />} />
          </div>
        </div>
        <p className="mt-2 text-muted-foreground font-bold">
          Created on: {new Date(bill?.createdAt!).toLocaleDateString()}{" "}
        </p>
        <div className="mt-6">
          <p className="font-bold mb-2">Details</p>
          <div className="border rounded-md">
            <div className="border p-4 flex justify-between items-center">
              <p className=" text-muted-foreground ">Amount</p>
              {isEditable ? (
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter new amount"
                          id="amountDue"
                          className="col-span-3"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <p className="font-bold">${bill?.amount}</p>
              )}
            </div>
            <div className="border p-4 flex justify-between items-center">
              <p className=" text-muted-foreground ">Status</p>
              {isEditable ? (
                <FormField
                  control={form.control}
                  name="isPaid"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a new status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"true"}>Paid</SelectItem>
                          <SelectItem value={"false"}>Unpaid</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <p className="font-bold">{bill?.isPaid ? "Paid" : "Unpaid"}</p>
              )}
            </div>
            <div className="border p-4 flex justify-between items-center">
              <p className=" text-muted-foreground ">Updated On</p>
              <p className="font-bold">{new Date(bill?.updatedAt!).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mt-6" />
          <p className="font-bold mb-2">Notes</p>
          {isEditable ? (
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Your new note" rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <div className=" border  h-48 rounded-md p-4">{bill?.note}</div>
          )}
          {isEditable && (
            <div className="flex w-full justify-end mt-4 space-x-4">
              <Button variant={"outline"} onClick={() => setIsEditable(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default BillPreviewTable;
