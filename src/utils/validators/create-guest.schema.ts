import { z } from "zod";

export const guestFormSchema = z.object({
  bookingIdentifier: z.number().min(1, "Booking Identifier is required"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().nullable(), // lastName can be null
  primaryGuest: z.boolean().nullable(), // primaryGuest can be null
  age: z.number().nullable(), // age can be null
  ageGroup: z.number().min(0, "Age Group is required"),
  idType: z.string().nullable(), // idType can be null
  idValue: z.string().nullable(), // idValue can be null
  idImage: z.string().nullable(), // idImage can be null
  comments: z.string().nullable(), // comments can be null
});

export type CreateGuestInput = z.infer<typeof guestFormSchema>;
