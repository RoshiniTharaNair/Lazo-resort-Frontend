"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "rizzui";
import cn from "@/utils/class-names";
import FormGroup from "@/app/shared/form-group";
import { DatePicker } from "@/components/ui/datepicker";
import { parseISO, isValid, formatISO } from "date-fns";

export default function ProfileSummary({
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
      title="Add Profile"
      description="Edit your Profile details and necessary information from here"
      className={cn(className)}
    >
      <Input
        label="First Name"
        placeholder="First Name"
        {...register("firstname", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.firstname?.message as string}
      />
      <Input
        label="Last Name"
        placeholder="Last Name"
        {...register("lastname", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.lastname?.message as string}
      />
      <Input
        label="Primary Contact"
        placeholder="Primary Contact"
        {...register("primarycontact", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.primarycontact?.message as string}
      />
      <Input
        label="Primary Email"
        placeholder="Primary Email"
        {...register("primaryemail", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.primaryemail?.message as string}
      />
      <Controller
        name="dob"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          const validDateValue =
            typeof value === "string" && value ? parseISO(value) : value;
          const isValidDate =
            validDateValue instanceof Date && isValid(validDateValue);

          return (
            <DatePicker
              inputProps={{ label: "Date of Birth" }}
              placeholderText="Date of Birth"
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
