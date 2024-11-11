"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Input } from "rizzui";
import cn from "@/utils/class-names";
import FormGroup from "@/app/shared/form-group";

export default function GuestSummary({
  className,
}: {
  className?: string;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Add Guest"
      description="Edit your Guest details and necessary information from here"
      className={cn(className)}
    >
      <Input
        label="First Name"
        placeholder="First Name"
        {...register("firstName", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.firstName?.message as string}
      />
      <Input
        label="Last Name"
        placeholder="Last Name"
        {...register("lastName", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.lastName?.message as string}
      />
      <Input
        label="Age"
        placeholder="Age"
        type="number"
        {...register("age", {
          setValueAs: (v) => (typeof v === "number" ? v : parseInt(v, 10)),
        })}
        error={errors.age?.message as string}
      />
      <Input
        label="ID Type"
        placeholder="ID Type"
        {...register("idType", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.idType?.message as string}
      />
      <Input
        label="ID Value"
        placeholder="ID Value"
        {...register("idValue", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.idValue?.message as string}
      />
      <Input
        label="Comments"
        placeholder="Comments"
        {...register("comments", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.comments?.message as string}
      />
    </FormGroup>
  );
}
