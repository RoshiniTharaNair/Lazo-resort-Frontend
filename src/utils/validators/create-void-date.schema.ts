import { z } from 'zod';

export const voidDateFormSchema = z.object({
  voiddateIdentifier: z.union([z.string(), z.number()]).optional(),
  resortIdentifier: z.union([z.string(), z.number()]),
  voidDate: z.string().nonempty("Void Date is required"),
  voidMultiplier: z.number().min(1, "Void Multiplier should be at least 1"),
});

export type CreateVoidDateInput = z.infer<typeof voidDateFormSchema>;
