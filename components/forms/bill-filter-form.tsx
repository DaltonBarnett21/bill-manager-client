import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Icons } from "@/lib/icons";
import { Form, FormField, FormItem } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BillFilter, BillFilterSchema } from "@/types";
import { api } from "@/lib/api-service";

const BillFilterForm = () => {
  const form = useForm<BillFilter>({
    resolver: zodResolver(BillFilterSchema),
    defaultValues: {
      isPaid: "all",
    },
  });

  const isPaid = form.watch("isPaid", "all");
  const bill = api.bills.useFetchBills({
    queryParams: `?isPaid=${isPaid}`,
    enabled: form.formState.isSubmitted,
  });

  async function onSubmit(values: BillFilter) {
    bill.refetch();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-6 flex space-x-4   ">
        <FormField
          control={form.control}
          name="isPaid"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className=" w-[340px]">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="true">Paid</SelectItem>
                    <SelectItem value="false">UnPaid</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button type="submit">
          Filter Bills <Icons.send className=" w-5 h-5 ml-2" />
        </Button>
      </form>
    </Form>
  );
};

export default BillFilterForm;
