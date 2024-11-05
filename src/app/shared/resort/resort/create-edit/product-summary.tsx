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
      title="Add Vendor"
      description="Edit your Bookings and necessary information from here"
      className={cn(className)}
    >
      
      <Input
        label="Vendor Label"
        placeholder="Vendor Label"
        {...register("label")}
        error={errors.label?.message as string}
      />
      <Input
        label="Vendor Property Key"
        placeholder="Vendor Property Key"
        {...register("propertyKey")}
        error={errors.propertyKey?.message as string}
      />
      
    </FormGroup>
  );
}
