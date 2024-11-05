import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Tab, Textarea, FileInput, Text } from "rizzui";
import { saveAs } from "file-saver";
import {
  bulkNotificationSchema,
  singleNotificationSchema,
} from "@/utils/validators/notificationSchema";
import Papa from "papaparse";
import toast from "react-hot-toast";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type SingleNotificationInput = z.infer<typeof singleNotificationSchema>;
type BulkNotificationInput = z.infer<typeof bulkNotificationSchema>;

const NotificationForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SingleNotificationInput>({
    resolver: zodResolver(singleNotificationSchema),
  });

  // Handler for single notification
  const onSubmitSingle: SubmitHandler<SingleNotificationInput> = async (
    data
  ) => {
    try {
      await fetch( `${apiUrl}/singleNotification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success(<Text as="b">Notification Sent Successfully</Text>);
      reset();
    } catch (error) {
      console.error("Failed to send notification:", error);
      toast.error("Failed to send notification.");
    }
  };

  // Utility function to validate each message field for harmful content
  const isContentSafe = (content: string): boolean => {
    // Example regex that checks for script tags - this can be extended based on your needs
    const harmfulContentRegex = /<script.*?>.*?<\/script>/i;
    return !harmfulContentRegex.test(content);
  };

  const handleBulkSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    const fileInput = event.currentTarget.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (file) {
      Papa.parse(file, {
        header: true, // CSV file has a header row
        complete: async (results) => {
          // Validate each notification for harmful content
          const notificationsAreSafe = results.data.every(
            (notification: any) =>
              isContentSafe(notification.Message) &&
              isContentSafe(notification.To)
          );

          if (!notificationsAreSafe) {
            toast.error("CSV contains potentially harmful content.");
            return;
          }

          // Proceed with the API call if the notifications are safe
          try {
            const response = await fetch(
              `${apiUrl}/bulkNotification`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ notifications: results.data }), // Format this according to your backend requirements
              }
            );
            if (response.ok) {
              toast.success("Bulk notifications sent successfully!");
              reset(); 
            } else {
              throw new Error("Bulk notification submission failed");
            }
          } catch (error) {
            console.error("Failed to send bulk notifications:", error);
            toast.error("Failed to send bulk notifications.");
          }
        },
        skipEmptyLines: true,
      });
    }
  };

  const downloadCsvTemplate = () => {
    const csvData = "To,Message\n1234567890,Your message here\n";
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "bulk_notification_template.csv");
  };

  return (
    // Tab structure with form for single and bulk notification submission
    <Tab>
      <Tab.List>
        <Tab.ListItem>Single Notification</Tab.ListItem>
        <Tab.ListItem>Bulk Notifications</Tab.ListItem>
      </Tab.List>
      <Tab.Panels>
        {/* Single Notification Form */}
        <Tab.Panel>
          <form onSubmit={handleSubmit(onSubmitSingle)} className="space-y-4">
            <Controller
              name="to"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="To (Device Token or Subscription ID)"
                  placeholder="Device Token or Subscription ID"
                />
              )}
            />
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Title"
                  placeholder="Notification Title"
                />
              )}
            />
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  label="Body"
                  placeholder="Notification Body"
                />
              )}
            />
            {/* Add other input fields like 'icon', 'click_action', etc. */}
            <Button type="submit">Send Notification</Button>
          </form>
        </Tab.Panel>

        {/* Bulk Notifications Form */}
        <Tab.Panel>
          <form onSubmit={handleBulkSubmit} className="space-y-4">
            <FileInput label="Upload CSV File" className="mb-2" />
            <Button type="submit">Send Bulk Notifications</Button>
            <br></br>
            <hr></hr>
            <Button onClick={downloadCsvTemplate}>Download CSV Template</Button>
          </form>
        </Tab.Panel>
      </Tab.Panels>
    </Tab>
  );
};

export default NotificationForm;
