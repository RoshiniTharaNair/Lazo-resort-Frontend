"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bulkSmsSchema, singleSmsSchema } from "@/utils/validators/smsSchemas";
import { z } from "zod";
import { Button, Input, Tab, Textarea, FileInput, Text } from "rizzui";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import toast from "react-hot-toast";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type SingleSmsInput = z.infer<typeof singleSmsSchema>;

const SmsForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SingleSmsInput>({
    resolver: zodResolver(singleSmsSchema),
  });
  const onSubmitSingle: SubmitHandler<SingleSmsInput> = async (data) => {
    try {
      await fetch(`${apiUrl}/sendSingleSms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      toast.success(<Text as="b">Single SMS sent successfully!</Text>);
      reset(); // Reset form fields after successful submission
    } catch (error) {
      console.error("Failed to send single SMS:", error);
      toast.error("Failed to send single SMS.");
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
        complete: async (results) => {
          // Validate each message for harmful content
          const messagesAreSafe = results.data.every(
            (message: any) =>
              isContentSafe(message.Message) && isContentSafe(message.To)
          );

          if (!messagesAreSafe) {
            toast.error("CSV contains potentially harmful content.");
            return;
          }

          // Proceed with the API call if the messages are safe
          try {
            const response = await fetch(`${apiUrl}/sendBulkSms`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ messages: results.data }),
            });
            if (response.ok) {
              toast.success("Bulk SMS sent successfully!");
              reset();
            } else {
              throw new Error("Bulk SMS submission failed");
            }
          } catch (error) {
            console.error("Failed to send bulk SMS:", error);
            toast.error("Failed to send bulk SMS.");
          }
        },
        header: true, // If your CSV has header rows
        skipEmptyLines: true,
      });
    }
  };

  const downloadCsvTemplate = () => {
    const csvData = "To,Message\n1234567890,Your message here\n";
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "bulk_sms_template.csv");
  };

  return (
    <Tab>
      <Tab.List>
        <Tab.ListItem>Single SMS</Tab.ListItem>
        <Tab.ListItem>Bulk SMS</Tab.ListItem>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <form onSubmit={handleSubmit(onSubmitSingle)} className="space-y-4">
            <Controller
              name="to"
              control={control}
              render={({ field }) => (
                <Input label="To" {...field} placeholder="To" />
              )}
            />
            {errors.to && <p>{errors.to.message}</p>}

            <Controller
              name="message"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Textarea
                  label="Message"
                  placeholder="Enter your message"
                  //   helperText="This is helper text."
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            {errors.message && <p>{errors.message.message}</p>}

            <Controller
              name="from"
              control={control}
              render={({ field }) => (
                <Input label="From" {...field} placeholder="From" />
              )}
            />
            {errors.from && <p>{errors.from.message}</p>}

            <Button type="submit">Send SMS</Button>
          </form>
        </Tab.Panel>
        <Tab.Panel>
          <form onSubmit={handleBulkSubmit} className="space-y-4">
            <FileInput label="Upload File" className="mb-2" />
            <Button type="submit">Send Bulk SMS</Button>
            <br></br>
            <hr></hr>
            <Button onClick={downloadCsvTemplate}>Download CSV Template</Button>
          </form>
        </Tab.Panel>
      </Tab.Panels>
    </Tab>
  );
};

export default SmsForm;
