"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  vendorFormSchema,
  CreateVendorInput,
} from "@/utils/validators/create-vendor.schema";
import { Loader, Input, Select, Button } from "rizzui";
import dynamic from "next/dynamic";
import { parseISO, isValid, formatISO } from "date-fns";
import { DatePicker } from "@/components/ui/datepicker";
import { useFormContext } from "react-hook-form";

interface VendorFormProps {
  vendor?: CreateVendorInput;
  onSubmit: (data: CreateVendorInput) => void;
  isEditMode: boolean;
}

export const VendorForm: React.FC<VendorFormProps> = ({
  vendor,
  onSubmit,
  isEditMode,
}: {
  vendor?: CreateVendorInput;
  onSubmit: (data: CreateVendorInput) => void;
  isEditMode: boolean;
}) => {
  const formMethods = useForm<CreateVendorInput>({
    defaultValues: vendor,
  });

  const { control, handleSubmit } = formMethods;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="label"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              label="Vendor Label"
              placeholder="Vendor Label"
              {...field}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="dash_url"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              label="Dash URL"
              placeholder="Dash URL"
              {...field}
              error={error?.message}
            />
          )}
        />
      </div>
      <Button type="submit" className="mt-4">
        {isEditMode ? "Update Vendor" : "Create Vendor"}
      </Button>
    </form>
  );
};
