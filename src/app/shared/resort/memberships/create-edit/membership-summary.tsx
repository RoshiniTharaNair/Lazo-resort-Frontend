"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "rizzui";
import cn from "@/utils/class-names";
import FormGroup from "@/app/shared/form-group";
import { DatePicker } from "@/components/ui/datepicker";
import { parseISO, isValid, formatISO } from "date-fns";

export default function MembershipSummary({
  className,
}: {
  className?: string;
}) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Add Membership"
      description="Edit your Membership details and necessary information from here"
      className={cn(className)}
    >
      <Input
        label="Customer Identifier"
        placeholder="Customer Identifier"
        {...register("customerIdentifier", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.customerIdentifier?.message as string}
      />
      <Input
        label="Resort Identifier"
        placeholder="Resort Identifier"
        {...register("resortIdentifier", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.resortIdentifier?.message as string}
      />
      <Input
        label="Purchase Points"
        placeholder="Purchase Points"
        type="number"
        {...register("purchasePoints", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.purchasePoints?.message as string}
      />
      <Input
        label="Flat Discount"
        placeholder="Flat Discount"
        type="number"
        {...register("flatDiscount", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.flatDiscount?.message as string}
      />
      <Input
        label="Cost"
        placeholder="Cost"
        type="number"
        {...register("cost", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.cost?.message as string}
      />
      <Controller
        name="validityStart"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          const validDateValue =
            typeof value === "string" && value ? parseISO(value) : value;
          const isValidDate =
            validDateValue instanceof Date && isValid(validDateValue);

          return (
            <DatePicker
              inputProps={{ label: "Validity Start" }}
              placeholderText="Validity Start"
              dateFormat="dd/MM/yyyy"
              selected={isValidDate ? validDateValue : null}
              onChange={(date) => {
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
        name="validityEnd"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          const validDateValue =
            typeof value === "string" && value ? parseISO(value) : value;
          const isValidDate =
            validDateValue instanceof Date && isValid(validDateValue);

          return (
            <DatePicker
              inputProps={{ label: "Validity End" }}
              placeholderText="Validity End"
              dateFormat="dd/MM/yyyy"
              selected={isValidDate ? validDateValue : null}
              onChange={(date) => {
                const formattedDate =
                  date instanceof Date ? formatISO(date) : "";
                onChange(formattedDate);
              }}
              onBlur={onBlur}
            />
          );
        }}
      />
    </FormGroup>
  );
}
