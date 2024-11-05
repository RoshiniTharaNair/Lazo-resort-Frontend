import { z } from 'zod';
import { messages } from '@/config/messages';

export const priceFormSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  pricingIdentifier: z.union([z.string(), z.number()]).optional(),
  price: z.union([z.string(), z.number()]).optional(),
  resortIdentifier: z.union([z.string(), z.number()]).optional(),
  resortName: z.string().optional(),
});

export type CreatePriceInput = z.infer<typeof priceFormSchema>;
