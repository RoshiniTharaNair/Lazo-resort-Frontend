import { z } from "zod";

export const singleEmailSchema = z.object({
  to: z.string().email("Enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Email body is required"),
  from: z.string().email("Enter a valid email address"),
});

export const bulkEmailSchema = z.object({
  bulkEmailId: z.string(),
  emails: z.array(singleEmailSchema),
});

export const templateSchema = z.object({
  templateId: z.number(),
  templateTitle: z.string().min(1, "Template title is required"),
  templateContent: z.any(),
});