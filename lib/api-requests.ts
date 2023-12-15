import { getAuthActions, getRefreshToken, useAuthActions } from "@/stores/authstore";
import { fetcher } from "./fetcher";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import Router from "next/router";
import { getUserActions } from "@/stores/userstore";
import { Bill, BillResponse, EditBill, Login, LoginResponse } from "@/types";

const { setAccessToken } = getAuthActions();

export const login = async (login: Login) => {
  try {
    const response = await fetcher<LoginResponse>({
      method: "POST",
      url: "/auth/login",
      data: login,
    });
    return response;
  } catch (error: unknown) {
    throw Error();
  }
};

export const refreshExpiredAccessToken = async () => {
  const refreshToken = getRefreshToken();
  try {
    const response = await fetcher<{ access_token: string }>({
      method: "POST",
      url: "/auth/refresh",
      data: {
        refresh_token: refreshToken,
      },
    });

    setAccessToken(response.access_token);
  } catch (error) {
    throw new Error();
  }
};

export type TestResponse = {
  test: string;
};

export const test = async () => {
  try {
    return await fetcher<TestResponse>({
      method: "GET",
      url: "/auth/test",
    });
  } catch (error) {
    throw new Error();
  }
};

export const addBill = async (bill: Bill) => {
  try {
    return await fetcher<{ message: string }>({
      method: "POST",
      url: "/bills",
      data: bill,
    });
  } catch (error) {
    throw new Error();
  }
};

export const getBills = async (queryParams?: string) => {
  try {
    return await fetcher<BillResponse[]>({
      method: "GET",
      url: `/bills${queryParams ? queryParams : ""}`,
    });
  } catch (error) {
    throw new Error();
  }
};

export const getBill = async (billId: string | string[] | undefined) => {
  try {
    return await fetcher<BillResponse>({
      method: "GET",
      url: `/bills/${billId}`,
    });
  } catch (error) {
    throw new Error();
  }
};

export const updateBill = async (billData?: EditBill) => {
  try {
    return await fetcher<BillResponse>({
      method: "PUT",
      url: `/bills/${billData?.billId}`,
      data: {
        ...billData,
      },
    });
  } catch (error) {
    throw new Error();
  }
};
