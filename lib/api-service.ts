import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TestResponse, addBill, getBill, getBills, login, test, updateBill } from "./api-requests";
import { AxiosError } from "axios";
import { Bill, EditBill, Login } from "@/types";
import { getAuthActions } from "@/stores/authstore";
import { getUserActions } from "@/stores/userstore";
import React from "react";
import Router from "next/router";
import { toast } from "@/components/ui/use-toast";

const { setAccessToken, setRefreshToken } = getAuthActions();
const { setUser } = getUserActions();

export const api = {
  auth: {
    useLogin: () => {
      const r = useMutation({
        mutationKey: ["login"],
        mutationFn: (loginData: Login) => login(loginData),
      });

      React.useEffect(() => {
        if (r.data) {
          setAccessToken(r.data.access_token);
          setRefreshToken(r.data.refresh_token);
          setUser({ email: r.data.email, name: r.data.name });
          Router.push("/");
        }
      }, [r.data]);

      return r;
    },
  },
  test: {
    useFetchTest: () => {
      return useQuery<TestResponse | undefined, AxiosError>({
        queryKey: ["test"],
        queryFn: test,
      });
    },
  },
  bills: {
    useAddBill: () => {
      return useMutation({
        mutationFn: (bill: Bill) => addBill(bill),
      });
    },
    useFetchBills: ({ queryParams, enabled }: { queryParams?: string; enabled?: boolean } = {}) => {
      return useQuery({
        queryKey: ["bills"],
        queryFn: () => getBills(queryParams),
        enabled: enabled,
      });
    },
    useFetchBill: (billId: string | string[] | undefined) => {
      return useQuery({
        queryKey: ["bills", { id: billId }],
        queryFn: () => getBill(billId),
        staleTime: 300000,
      });
    },
    useUpdateBill: () => {
      const queryClient = useQueryClient();
      const r = useMutation({
        mutationFn: (billData?: EditBill) => updateBill(billData),
        onSuccess: (bill) => {
          toast({
            description: "Your Bill was updated!",
            className: " bg-green-500 font-bold ",
          });
          queryClient.invalidateQueries({ queryKey: ["bills"] });
          queryClient.invalidateQueries({ queryKey: ["bills", { id: bill?.id }] });
        },
      });

      return r;
    },
  },
};
