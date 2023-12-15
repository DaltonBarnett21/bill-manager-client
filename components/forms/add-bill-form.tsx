import React, { useEffect } from "react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Bill, BillSchema } from "@/types";
import { Icons } from "@/lib/icons";
import { api } from "@/lib/api-service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";
import { useQueryClient } from "@tanstack/react-query";

const AddBillForm = () => {
  const bill = api.bills.useAddBill();
  const queryClient = useQueryClient();
  const form = useForm<Bill>({
    resolver: zodResolver(BillSchema),
    defaultValues: {
      amount: "",
      billName: "",
      note: "",
    },
  });

  async function onSubmit(values: Bill) {
    let data = {
      amount: values.amount,
      billName: values.billName,
      note: values.note,
    };
    bill.mutate(data);
    form.reset();
  }

  useEffect(() => {
    if (bill.isSuccess) {
      toast({
        description: "Your Bill was added!",
        className: " bg-green-500 font-bold ",
      });
    }
    queryClient.invalidateQueries({ queryKey: ["bills"] });
  }, [bill.data]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border rounded-xl p-4">
        <div className="py-4 space-y-2">
          <FormField
            control={form.control}
            name="billName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bill Name*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Rent" id="billName" className="col-span-3" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount Due*</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="1475.56" id="amountDue" className="col-span-3" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea placeholder="Optional" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" flex w-full justify-end">
          <Button disabled={!form.formState.isValid || bill.isPending} type="submit">
            Add New Bill{" "}
            {bill.isPending ? (
              <Icons.spinner className=" h-5 w-5 ml-2" />
            ) : (
              <Icons.add className=" h-5 w-5 ml-2" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddBillForm;
