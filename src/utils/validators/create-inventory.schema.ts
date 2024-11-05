import { z } from 'zod';

export const inventoryFormSchema = z.object({
  inventoryIdentifier: z.number().optional(),
  resortIdentifier: z.number(),
  effectiveDate: z.string(),
  roomClass: z.number(), // Adjusted to reflect the numeric value required by the backend
  avlCount: z.number(),
  maxOcc: z.number(),
  basePrice: z.number(),
  basePoints: z.number(),
  gst: z.string(),
  discount: z.string().optional(),
  resortName: z.string().optional(),
});

export type CreateInventoryInput = z.infer<typeof inventoryFormSchema>;
