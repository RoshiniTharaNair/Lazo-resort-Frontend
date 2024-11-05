import { z } from 'zod';

export const bookingFormSchema = z.object({
  bookingIdentifier: z.number().optional(),

  resortIdentifier: z.union([
    z.number(),
    z.object({
      label: z.string(),
      value: z.number(),
    }),
  ]),
  recDate: z.date().optional(),
  empCode: z.string().min(1, "Employee code is required"),
  customerIdentifier: z.union([
    z.number(),
    z.object({
      label: z.string(),
      value: z.number(),
    }),
  ]),
  vendorIdentifier: z.union([
    z.number(),
    z.object({
      label: z.string(),
      value: z.number(),
    }),
  ]),
  transactionReference: z.string().optional(),
  paymentMode: z.string().optional(),
  base: z.number().nonnegative(),
  gst: z.number().nonnegative(),
  comments: z.string().max(500).optional(),
  checkInDate: z.date(),
  checkOutDate: z.date(),
  primaryContact: z.string().regex(/^\+\d{10,15}$/, "Primary contact must include country code and be 10-15 digits"),
  primaryEmail: z.string().email("Invalid email format"),
  specialRequest: z.string().max(500).optional(),
  resortName: z.string().optional(),
  customerName: z.string().optional(),
  vendorName: z.string().optional(),
  status: z.string().optional(),
  membershipIdentifier: z.number().optional(),
  membershipPoints: z.number().optional(),
  discountMode: z.string().optional(),
  discountVal: z.number().optional(),
});

export type CreateBookingInput = z.infer<typeof bookingFormSchema>;
