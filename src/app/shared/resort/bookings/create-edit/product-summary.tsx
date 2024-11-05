"use client";

import { useState, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "rizzui";
import cn from "@/utils/class-names";
import FormGroup from "@/app/shared/form-group";
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";
import QuillLoader from "@/components/loader/quill-loader";
import { DatePicker } from "@/components/ui/datepicker";
import { parseISO, isValid, formatISO } from "date-fns";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const Select = dynamic(() => import("rizzui").then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import("@/components/ui/quill-editor"), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function BookingSummary({
  className,
  initialVendorIdentifier,
}: {
  className?: string;
  initialVendorIdentifier?: number;
}) {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  // Define a type for the vendor data
  type Vendor = {
    vendorIdentifier: number;
    label: string;
    propertyKey: string;
    createdAt: string;
    updatedAt: string;
  };

  // Use the type in your state and map function
  const [vendorOptions, setVendorOptions] = useState<
    Array<{ label: string; value: number }>
  >([]);

  useEffect(() => {
    async function getVendors() {
      try {
        const response = await fetch(`${apiUrl}/vendors/view`);
        const vendors: Vendor[] = await response.json();
        const options = vendors.map((vendor) => ({
          label: vendor.label, // Keep label as string
          value: Number(vendor.vendorIdentifier), // Convert string to number
        }));
        console.log(options);
        setVendorOptions(options);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    }
    getVendors();
  }, [initialVendorIdentifier, setValue]); // Add setValue to the dependency array if it doesn't cause re-renders

  return (
    <FormGroup
      title="Add Booking"
      description="Edit your Bookings and necessary information from here"
      className={cn(className)}
    >
      <Input
        label="Resort Identifier"
        placeholder="Resort Identifier"
        {...register("resortIdentifier", {
          valueAsNumber: true,
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.resortIdentifier?.message as string}
        readOnly
      />
      <Controller
        name="recDate"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          // Ensure the date is displayed correctly in the DatePicker
          // Check if value is a string and parse it; otherwise, use the value directly if it's a Date
          const dateValue = typeof value === "string" ? parseISO(value) : value;

          // Check if the dateValue is valid before passing to DatePicker
          const validDateValue = isValid(dateValue) ? dateValue : null;

          return (
            <DatePicker
              inputProps={{ label: "Rec Date" }}
              placeholderText="Rec Date"
              dateFormat="dd/MM/yyyy"
              selected={validDateValue}
              onChange={(date) => {
                // Ensure onChange updates form with an ISO string or clears the value
                const formattedDate =
                  date instanceof Date ? formatISO(date) : "";
                onChange(formattedDate);
              }}
              onBlur={onBlur}
            />
          );
        }}
      />
      <Input
        label="Employee code"
        placeholder="Employee Code"
        {...register("empCode", {
          valueAsNumber: true,
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.empCode?.message as string}
        readOnly
      />
      <Controller
        name="bookingDate"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          // Ensure the date is displayed correctly in the DatePicker
          // Check if value is a string and parse it; otherwise, use the value directly if it's a Date
          const dateValue = typeof value === "string" ? parseISO(value) : value;

          // Check if the dateValue is valid before passing to DatePicker
          const validDateValue = isValid(dateValue) ? dateValue : null;

          return (
            <DatePicker
              inputProps={{ label: "Booking Date" }}
              placeholderText="Booking Date"
              dateFormat="dd/MM/yyyy"
              selected={validDateValue}
              onChange={(date) => {
                // Ensure onChange updates form with an ISO string or clears the value
                const formattedDate =
                  date instanceof Date ? formatISO(date) : "";
                onChange(formattedDate);
              }}
              onBlur={onBlur}
            />
          );
        }}
      />
      <Controller
        name="checkInDate"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          // Ensure the date is displayed correctly in the DatePicker
          // Check if value is a string and parse it; otherwise, use the value directly if it's a Date
          const validDateValue =
            typeof value === "string" && value ? parseISO(value) : value;
          const isValidDate =
            validDateValue instanceof Date && isValid(validDateValue);

          return (
            <DatePicker
              inputProps={{ label: "Check-In Date" }}
              placeholderText="Check-In Date"
              dateFormat="dd/MM/yyyy"
              selected={isValidDate ? validDateValue : null}
              onChange={(date) => {
                // Ensure onChange updates form with an ISO string or clears the value
                const formattedDate =
                  date instanceof Date ? formatISO(date) : "";
                onChange(formattedDate);
              }}
              onBlur={onBlur}
            />
          );
        }}
      />

      <Controller
        name="checkOutDate"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          // Ensure the date is displayed correctly in the DatePicker
          // Check if value is a string and parse it; otherwise, use the value directly if it's a Date
          const validDateValue =
            typeof value === "string" && value ? parseISO(value) : value;
          const isValidDate =
            validDateValue instanceof Date && isValid(validDateValue);

          return (
            <DatePicker
              inputProps={{ label: "Check-Out Date" }}
              placeholderText="Check-Out Date"
              dateFormat="dd/MM/yyyy"
              selected={isValidDate ? validDateValue : null}
              onChange={(date) => {
                // Ensure onChange updates form with an ISO string or clears the value
                const formattedDate =
                  date instanceof Date ? formatISO(date) : "";
                onChange(formattedDate);
              }}
              onBlur={onBlur}
            />
          );
        }}
      />
      <Controller
        name="vendorIdentifier"
        control={control}
        render={({ field }) => (
          <Select
            options={vendorOptions}
            label="Vendor Identifier"
            placeholder="Select a Vendor"
            error={errors.vendorIdentifier?.message as string}
            {...field}
          />
        )}
      />

      <Input
        label="Vendor Booking ID"
        placeholder="Vendor Booking ID"
        {...register("vendorBookingId", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.vendorBookingId?.message as string}
      />
      <Input
        label="Transaction ID"
        placeholder="Transaction ID"
        {...register("transactionId", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.transactionId?.message as string}
      />
      <Input
        label="Payment Mode"
        placeholder="Payment Mode"
        {...register("paymentMode")}
        error={errors.paymentMode?.message as string}
      />
      <Input
        label="Base"
        placeholder="Base"
        type="number"
        {...register("base")}
        error={errors.base?.message as string}
      />
      <Input
        label="GST"
        placeholder="GST"
        type="number"
        step="0.01"
        {...register("gst")}
        error={errors.gst?.message as string}
      />
      <Controller
        control={control}
        name="comments"
        render={({ field: { onChange, value } }) => (
          <QuillEditor
            value={value}
            onChange={onChange}
            label="Comments"
            className="col-span-full [&_.ql-editor]:min-h-[100px]"
            labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
          />
        )}
      />
    </FormGroup>
  );
}
