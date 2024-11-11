"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button } from "rizzui";
import { CreateVendorInput } from "@/utils/validators/create-vendor.schema";

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
      <div className="grid grid-cols-3 gap-4">
        <Controller
          name="label"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              label="Vendor Label"
              placeholder="Enter Vendor Label"
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
              placeholder="Enter Dash URL"
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
