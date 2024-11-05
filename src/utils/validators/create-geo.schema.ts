import { z } from 'zod';

export const geoLocationSchema = z.object({
  geoLocationIdentifier: z.string().optional(),
  country: z.string(), 
  postalCode: z.string(), 
  state: z.string(),
  city: z.string(),
  district: z.string().optional(),
  town: z.string().optional(),
});

export type CreateGeoLocationInput = z.infer<typeof geoLocationSchema>;