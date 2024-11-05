import { z } from 'zod';
import { messages } from '@/config/messages';

export const vendorFormSchema = z.object({
  vendorIdentifier: z.union([z.string(), z.number()]).optional(),
  label: z.string().optional(),
  dash_url: z.string().optional(),
});

export type CreateVendorInput = z.infer<typeof vendorFormSchema>;
