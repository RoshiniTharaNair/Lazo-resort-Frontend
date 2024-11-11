"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Select, Loader } from "rizzui";
import {
  couponFormSchema,
  CreateCouponInput,
} from "@/utils/validators/create-coupon.schema";
import { DatePicker } from "@/components/ui/datepicker";
import FormGroup from "@/app/shared/form-group";

interface CouponFormProps {
  coupon?: CreateCouponInput;
  onSubmit: (data: CreateCouponInput) => void;
  isEditMode: boolean;
}

interface SelectOption {
  label: string;
  value: string;
}

export const CouponForm: React.FC<CouponFormProps> = ({
  coupon,
  onSubmit,
  isEditMode,
}) => {
  const formMethods = useForm<CreateCouponInput>({
    // resolver: zodResolver(couponFormSchema),
    defaultValues: coupon || {}, // Default to an empty object if no coupon data is provided
  });

  const { control, handleSubmit } = formMethods;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormGroup
          title={`${isEditMode ? "Edit" : "Add"} Coupon`}
          description="Enter the coupon details below."
        >
          <div className="grid grid-cols-3 gap-4">
            <Controller
              name="couponString"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Coupon Code"
                  placeholder="Enter Coupon Code"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="discountValue"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Discount Value"
                  placeholder="Enter Discount Value"
                  type="number"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="discountUnit"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Select
                  label="Discount Unit"
                  options={[
                    { label: "Percentage", value: "percentage" },
                    { label: "Flat", value: "flat" },
                  ]}
                  value={field.value}
                  placeholder="Select Discount Unit"
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
              name="minBookingValue"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Minimum Booking Value"
                  placeholder="Enter Minimum Booking Value"
                  type="number"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="maxDiscountValue"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Maximum Discount Value"
                  placeholder="Enter Maximum Discount Value"
                  type="number"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="validity"
              control={control}
              render={({ field }) => (
                <DatePicker
                  inputProps={{
                    label: "Validity",
                    placeholder: "Enter Validity Date (YYYY-MM-DD)",
                  }}
                  selected={field.value ? new Date(field.value) : null}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd"
                />
              )}
            />
          </div>
        </FormGroup>
        <Button type="submit" className="mt-4">
          {coupon ? "Update Coupon" : "Create Coupon"}
        </Button>
      </form>
    </>
  );
};
