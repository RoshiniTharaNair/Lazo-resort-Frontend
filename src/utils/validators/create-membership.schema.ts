import { z } from "zod";

export const membershipFormSchema = z.object({
  membershipIdentifier: z.number().optional(),
  customerIdentifier: z.number().min(1, "Customer Identifier is required"),
  resortIdentifier: z.number().min(1, "Resort Identifier is required"),
  resortAny: z.string().min(1, "Resort Any selection is required"),
  purchaseDate: z.string().min(1, "Purchase Date is required").refine(date => {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate);
  }, "Invalid date format"),
  purchaseMode: z.string().min(1, "Purchase Mode is required"),
  purchasePoints: z.number().min(1, "Purchase Points are required"),
  flatDiscount: z.number().min(1, "Flat Discount is required"),
  cost: z.number().min(1, "Cost is required"),
  validityStart: z.string().min(1, "Validity Start date is required").refine(date => {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate) && new Date(parsedDate) > new Date();
  }, "Invalid date or date is in the past"),
  validityEnd: z.string().min(1, "Validity End date is required").refine(date => {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate) && new Date(parsedDate) > new Date();
  }, "Invalid date or date is in the past"),
  status: z.string().min(1, "Status is required"),
});

export type CreateMembershipInput = z.infer<typeof membershipFormSchema>;
