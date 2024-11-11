import { z } from "zod";

export const couponFormSchema = z.object({
  couponIdentifier:z.number().optional(),
  couponString: z.string().min(1, "Coupon String is required"),
  discountValue: z.number().min(1, "Discount Value is required"),
  discountUnit: z.string().min(1, "Discount Unit is required"),
  validity: z.string().min(1, "Validity date is required").refine(date => {
    const parsedDate = Date.parse(date);
    return !isNaN(parsedDate) && new Date(parsedDate) > new Date();
  }, "Invalid date or date is in the past"),
  minBookingValue: z.number().min(1, "Minimum Booking Value is required"),
  maxDiscountValue: z.number().min(1, "Maximum Discount Value is required"),
});

export type CreateCouponInput = z.infer<typeof couponFormSchema>;
