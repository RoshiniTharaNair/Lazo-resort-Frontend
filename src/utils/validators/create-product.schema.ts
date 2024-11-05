import { z } from 'zod';

export const productFormSchema = z.object({
  recIdentifier: z.number().optional(),
  roomType: z.string().optional(),
  maxOccupancy: z.number().optional(),
  description: z.string().optional(),
});

export type CreateProductInput = z.infer<typeof productFormSchema>;
