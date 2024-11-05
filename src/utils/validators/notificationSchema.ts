import { z } from "zod";

export const singleNotificationSchema = z.object({
  to: z.string(),
  title: z.string(),
  body: z.string(),
  icon: z.string().optional(),
  click_action: z.string().optional(),
  status: z.string().optional(),
  created_at: z.date().optional(),
  sent_at: z.date().optional(),
});

export const bulkNotificationSchema = z.object({
  bulk_notification_id: z.string(),
  topic: z.string(),
  status: z.string().optional(),
  created_at: z.date().optional(),
  sent_at: z.date().optional(),
  // messages: z.array(singleNotificationSchema),
});
