import { z } from 'zod';
import { messages } from '@/config/messages';

export const eventFormSchema = z.object({
  id: z.string().optional(),
  checkin_dt: z.date({ required_error: 'Check-in Date is required' }),
  checkout_dt: z.date({ required_error: 'Check-out Date is required' }),
  number_of_adults: z.number().nonnegative({ message: 'Number of adults is required' }),
  number_of_children: z.number().nonnegative({ message: 'Number of children is required' }),
  age_of_children: z.string().optional(),
  number_of_rooms: z.number().nonnegative({ message: 'Number of rooms is required' }),
  resortIdentifier: z.number().optional(), // Resort selection is optional if geo location is selected
  geoIdentifier: z.number().optional(), // Geo selection is optional if resort is selected
});

// primaryEmail: z.string().email("Invalid email address").optional(),
// generate form types from zod validation schema
export type EventFormInput = z.infer<typeof eventFormSchema>;
