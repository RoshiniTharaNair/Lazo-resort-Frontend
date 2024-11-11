"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Select } from "rizzui";
import {
  guestFormSchema,
  CreateGuestInput,
} from "@/utils/validators/create-guest.schema";
import FormGroup from "@/app/shared/form-group";

interface GuestFormProps {
  guest?: CreateGuestInput;
  onSubmit: (data: CreateGuestInput) => void;
  isEditMode: boolean;
}

interface SelectOption {
  label: string;
  value: string | number;
}

export const GuestForm: React.FC<GuestFormProps> = ({
  guest,
  onSubmit,
  isEditMode,
}) => {
  const formMethods = useForm<CreateGuestInput>({
    // resolver: zodResolver(guestFormSchema),
    defaultValues: guest || {}, 
  });

  const { control, handleSubmit } = formMethods;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormGroup
          title={`${isEditMode ? "Edit" : "Add"} Guest`}
          description="Enter the guest details below."
        >
          <div className="grid grid-cols-3 gap-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="First Name"
                  placeholder="Enter First Name"
                  {...field}
                  error={error?.message}
                  value={field.value || ""} // Ensure value is a string
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Last Name"
                  placeholder="Enter Last Name"
                  {...field}
                  error={error?.message}
                  value={field.value || ""} // Ensure value is a string
                />
              )}
            />
            <Controller
              name="primaryGuest"
              control={control}
              render={({ field }) => (
                <Select
                  label="Primary Guest"
                  options={[
                    { label: "Yes", value: "true" },
                    { label: "No", value: "false" },
                  ]}
                  value={field.value ? "true" : "false"} // Convert boolean to string
                  onChange={(selectedOption: SelectOption) =>
                    field.onChange(selectedOption.value === "true")
                  }
                  className="relative z-[9999]"
                  dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white"
                />
              )}
            />
            <Controller
              name="age"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Age"
                  placeholder="Enter Age"
                  type="number"
                  {...field}
                  error={error?.message}
                  value={field.value || ""} // Ensure value is a string or number
                />
              )}
            />
            <Controller
              name="ageGroup"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Age Group"
                  placeholder="Enter Age Group"
                  type="number"
                  {...field}
                  error={error?.message}
                  value={field.value || ""} // Ensure value is a string or number
                />
              )}
            />
            <Controller
              name="idType"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="ID Type"
                  placeholder="Enter ID Type"
                  {...field}
                  error={error?.message}
                  value={field.value || ""} // Ensure value is a string
                />
              )}
            />
            <Controller
              name="idValue"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="ID Value"
                  placeholder="Enter ID Value"
                  {...field}
                  error={error?.message}
                  value={field.value || ""} // Ensure value is a string
                />
              )}
            />
            <Controller
              name="idImage"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="ID Image"
                  placeholder="Enter ID Image"
                  {...field}
                  error={error?.message}
                  value={field.value || ""} // Ensure value is a string
                />
              )}
            />
            <Controller
              name="comments"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Comments"
                  placeholder="Enter Comments"
                  {...field}
                  error={error?.message}
                  value={field.value || ""} // Ensure value is a string
                />
              )}
            />
          </div>
        </FormGroup>
        <Button type="submit" className="mt-4">
          {guest ? "Update Guest" : "Create Guest"}
        </Button>
      </form>
    </>
  );
};
