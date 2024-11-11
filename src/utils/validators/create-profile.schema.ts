import { z } from 'zod';

export const profileFormSchema = z.object({
  customerIdentifier: z.number().optional(),
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().optional(),
  middlename: z.string().optional(),
  primarycontact: z.string().min(1, "Primary contact is required"),
  secondarycontact: z.string().optional(),
  primaryemail: z.string().email("Invalid email format"),
  username: z.string().min(1, "Username is required"),
  passcode: z.string().min(1, "Passcode is required"),
  dob: z.string().optional(),
  geoLocationIdentifier: z.union([
    z.number(),
    z.object({
      label: z.string(),
      value: z.number(),
    }),
  ]).nullable(),
});

export type CreateProfileInput = z.infer<typeof profileFormSchema>;
