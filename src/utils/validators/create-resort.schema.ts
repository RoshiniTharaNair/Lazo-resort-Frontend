  import { z } from 'zod';

  export const resortSchema = z.object({
    resortIdentifier: z.string().optional(),
    label: z.string().optional(),
    geoLocationIdentifier: z.string().optional(),
    docId: z.string().optional(),
    reservation_cont: z.string().optional(),
    services_cont: z.string().optional(),
    support_cont: z.string().optional(),
    reservation_email: z.string().email(),
    services_email: z.string().email(),
    support_email: z.string().email(),
    careers_email: z.string().email(),
    description: z.string(),
    Document: z.object({
      docId: z.string().optional(),
      doc_type: z.string().optional(),
      doc_url: z.string().optional(),
      doc_effdate: z.string().optional(),
      poc_name: z.string().optional(),
      poc_cont: z.string().optional(),
      poc_email: z.string().email().optional(),
    }).optional(),
    SPOC: z.object({
      spocId: z.number().optional(),
      resortIdentifier: z.string().optional(),
      restaurantIdentifier: z.string().optional(),
      emp_code: z.string().optional(),
      spoc_role: z.string().optional(),
      status: z.enum(['Active', 'Inactive']).optional(),
    }).optional(),
    Tags: z.object({
      tagId: z.number().optional(),
      resortIdentifier: z.string().optional(),
      tagLabel: z.string().optional(),
      tagClass: z.string().optional(),
      tagDesc: z.string().optional(),
      status: z.enum(['Active', 'Inactive']).optional(),
    }).optional(),
  });

  export type CreateResortInput = z.infer<typeof resortSchema>;