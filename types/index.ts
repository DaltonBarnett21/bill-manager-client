import { z } from "zod";

export const LoginResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  name: z.string(),
  email: z.string(),
});

export const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type Login = z.infer<typeof LoginSchema>;

export const BillSchema = z.object({
  billName: z.string().min(1, { message: "Bill Name is Required." }),
  amount: z.string().min(1, { message: "Amount Due is Required." }),
  isPaid: z.any(),
  note: z.string().optional(),
});
export type Bill = z.infer<typeof BillSchema>;

export const BillResponseSchema = z.object({
  id: z.string(),
  billName: z.string(),
  amount: z.string(),
  isPaid: z.boolean(),
  note: z.string(),
  userId: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
});
export type BillResponse = z.infer<typeof BillResponseSchema>;

export const EditBillSchema = z.object({
  billId: z.string().optional(),
  billName: z.string().optional(),
  amount: z.string().optional(),
  note: z.string().optional(),
  isPaid: z.any().optional(),
});

export type EditBill = z.infer<typeof EditBillSchema>;

export const BillFilterSchema = z.object({
  isPaid: z.string().optional(),
});

export type BillFilter = z.infer<typeof BillFilterSchema>;
