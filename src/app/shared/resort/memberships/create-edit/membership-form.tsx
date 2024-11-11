"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Select, Loader } from "rizzui";
import {
  membershipFormSchema,
  CreateMembershipInput,
} from "@/utils/validators/create-membership.schema";
import { DatePicker } from "@/components/ui/datepicker";
import FormGroup from "@/app/shared/form-group";

interface MembershipFormProps {
  membership?: CreateMembershipInput;
  onSubmit: (data: CreateMembershipInput) => void;
  isEditMode: boolean;
  customerMap: Record<number, string>;
  resortMap: Record<number, string>;
}

interface SelectOption {
  label: string;
  value: string | number;
}

export const MembershipForm: React.FC<MembershipFormProps> = ({
  membership,
  onSubmit,
  isEditMode,
  customerMap,
  resortMap,
}) => {
  const formMethods = useForm<CreateMembershipInput>({
    // resolver: zodResolver(membershipFormSchema),
    defaultValues: membership || {}, // Default to an empty object if no membership data is provided
  });

  const { control, handleSubmit } = formMethods;

  const [customerOptions, setCustomerOptions] = useState<SelectOption[]>([]);
  const [resortOptions, setResortOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    const customerOpts = Object.entries(customerMap).map(([id, name]) => ({
      label: name,
      value: Number(id),
    }));

    const resortOpts = Object.entries(resortMap).map(([id, name]) => ({
      label: name,
      value: Number(id),
    }));

    setCustomerOptions(customerOpts);
    setResortOptions(resortOpts);
  }, [customerMap, resortMap]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormGroup
          title={`${isEditMode ? "Edit" : "Add"} Membership`}
          description="Enter the membership details below."
        >
          <div className="grid grid-cols-3 gap-4">
            <Controller
              name="customerIdentifier"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Select
                  label="Customer"
                  options={customerOptions}
                  placeholder="Select Customer"
                  value={customerOptions.find(
                    (option) => option.value === field.value
                  )}
                  onChange={(selectedOption) =>
                    field.onChange((selectedOption as SelectOption).value)
                  }
                  error={error?.message}
                  className="relative z-[9999]"
                  dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white"
                />
              )}
            />
            <Controller
              name="resortIdentifier"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Select
                  label="Resort"
                  options={resortOptions}
                  placeholder="Select Resort"
                  value={resortOptions.find(
                    (option) => option.value === field.value
                  )}
                  onChange={(selectedOption) =>
                    field.onChange((selectedOption as SelectOption).value)
                  }
                  error={error?.message}
                  className="relative z-[9999]"
                  dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white"
                />
              )}
            />
            <Controller
              name="resortAny"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Select
                  label="Resort Any"
                  options={[
                    { label: "Yes", value: "1" },
                    { label: "No", value: "0" },
                  ]}
                  placeholder="Select Yes or No"
                  value={field.value}
                  onChange={(selectedOption: SelectOption) =>
                    field.onChange(selectedOption.value)
                  }
                  error={error?.message}
                  className="relative z-[9999]"
                  dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white"
                />
              )}
            />
            <Controller
              name="purchaseDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  inputProps={{
                    label: "Purchase Date",
                    placeholder: "YYYY-MM-DD",
                  }}
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd"
                />
              )}
            />
            <Controller
              name="purchaseMode"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Purchase Mode"
                  placeholder="Enter Purchase Mode"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="purchasePoints"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Purchase Points"
                  placeholder="Enter Purchase Points"
                  type="number"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="flatDiscount"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Flat Discount"
                  placeholder="Enter Flat Discount"
                  type="number"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="cost"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Cost"
                  placeholder="Enter Cost"
                  type="number"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="validityStart"
              control={control}
              render={({ field }) => (
                <DatePicker
                  inputProps={{
                    label: "Validity Start",
                    placeholder: "YYYY-MM-DD",
                  }}
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd"
                />
              )}
            />
            <Controller
              name="validityEnd"
              control={control}
              render={({ field }) => (
                <DatePicker
                  inputProps={{
                    label: "Validity End",
                    placeholder: "YYYY-MM-DD",
                  }}
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd"
                />
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Status"
                  placeholder="Enter Status"
                  {...field}
                  error={error?.message}
                />
              )}
            />
          </div>
        </FormGroup>
        <Button type="submit" className="mt-4">
          {membership ? "Update Membership" : "Create Membership"}
        </Button>
      </form>
    </>
  );
};
