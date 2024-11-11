"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "rizzui";
import cn from "@/utils/class-names";
import FormGroup from "@/app/shared/form-group";
import { DatePicker } from "@/components/ui/datepicker";
import { parseISO, isValid, formatISO } from "date-fns";

export default function CouponSummary({
  className,
}: {
  className?: string;
}) {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  return (
    <FormGroup
      title="Add Coupon"
      description="Edit your Coupon details and necessary information from here"
      className={cn(className)}
    >
      <Input
        label="Coupon Code"
        placeholder="Coupon Code"
        {...register("couponString", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.couponString?.message as string}
      />
      <Input
        label="Discount Value"
        placeholder="Discount Value"
        type="number"
        {...register("discountValue", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.discountValue?.message as string}
      />
      <Input
        label="Minimum Booking Value"
        placeholder="Minimum Booking Value"
        type="number"
        {...register("minBookingValue", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.minBookingValue?.message as string}
      />
      <Input
        label="Maximum Discount Value"
        placeholder="Maximum Discount Value"
        type="number"
        {...register("maxDiscountValue", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.maxDiscountValue?.message as string}
      />
      <Controller
        name="validity"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          const validDateValue =
            typeof value === "string" && value ? parseISO(value) : value;
          const isValidDate =
            validDateValue instanceof Date && isValid(validDateValue);

          return (
            <DatePicker
              inputProps={{ label: "Validity" }}
              placeholderText="Validity"
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
