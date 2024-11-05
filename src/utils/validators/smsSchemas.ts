import { z } from "zod";

export const singleSmsSchema = z.object({
  to: z.string().min(1, "Recipient's phone number is required"),
  message: z.string().min(1, "Message content is required"),
  from: z.string().min(1, "Sender ID or phone number is required"),
});

export const bulkSmsSchema = z.object({
  bulkMessageId: z.string(),
  messages: z.array(singleSmsSchema),
});
