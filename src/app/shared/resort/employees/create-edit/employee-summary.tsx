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

export default function EmployeeSummary({
  className,
  initialGeo,
}: {
  className?: string;
  initialGeo?: number;
}) {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext();

  type GeoOption = {
    geo: number;
    label: string;
    propertyKey: string;
    createdAt: string;
    updatedAt: string;
  };

  const [geoOptions, setGeoOptions] = useState<
    Array<{ label: string; value: number }>
  >([]);

  useEffect(() => {
    async function getGeos() {
      try {
        const response = await fetch(`${apiUrl}/geos/view`);
        const geos: GeoOption[] = await response.json();
        const options = geos.map((geo) => ({
          label: geo.label,
          value: Number(geo.geo),
        }));
        console.log(options);
        setGeoOptions(options);
      } catch (error) {
        console.error("Error fetching geos:", error);
      }
    }
    getGeos();
  }, [initialGeo, setValue]);

  return (
    <FormGroup
      title="Add Employee"
      description="Edit your Employee details and necessary information from here"
      className={cn(className)}
    >
      <Input
        label="Employee Code"
        placeholder="Employee Code"
        {...register("emp_code", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.emp_code?.message as string}
      />
      <Input
        label="First Name"
        placeholder="First Name"
        {...register("first_name", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.first_name?.message as string}
      />
      <Input
        label="Last Name"
        placeholder="Last Name"
        {...register("last_name", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.last_name?.message as string}
      />
      <Input
        label="Middle Name"
        placeholder="Middle Name"
        {...register("mid_name", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.mid_name?.message as string}
      />
      <Input
        label="Display Name"
        placeholder="Display Name"
        {...register("disp_name", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.disp_name?.message as string}
      />
      <Input
        label="Primary Contact"
        placeholder="Primary Contact"
        {...register("prim_contact", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.prim_contact?.message as string}
      />
      <Input
        label="Secondary Contact"
        placeholder="Secondary Contact"
        {...register("scnd_contact", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.scnd_contact?.message as string}
      />
      <Input
        label="Emergency Contact"
        placeholder="Emergency Contact"
        {...register("emgncy_contact", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.emgncy_contact?.message as string}
      />
      <Input
        label="Primary Email"
        placeholder="Primary Email"
        {...register("prim_email", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.prim_email?.message as string}
      />
      <Input
        label="Aadhar Code"
        placeholder="Aadhar Code"
        {...register("aadhar_code", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.aadhar_code?.message as string}
      />
      <Input
        label="PAN Code"
        placeholder="PAN Code"
        {...register("pan_code", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.pan_code?.message as string}
      />
      <Input
        label="Permanent Address"
        placeholder="Permanent Address"
        {...register("prmnt_address", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.prmnt_address?.message as string}
      />
      <Controller
        name="geo"
        control={control}
        render={({ field }) => (
          <Select
            options={geoOptions}
            label="Geolocation"
            placeholder="Select a Geolocation"
            error={errors.geo?.message as string}
            {...field}
          />
        )}
      />
      <Input
        label="Present Address"
        placeholder="Present Address"
        {...register("present_address", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.present_address?.message as string}
      />
      <Input
        label="Background Verification Status"
        placeholder="BGV Status"
        {...register("bgv_status", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.bgv_status?.message as string}
      />
      <Input
        label="PF Number"
        placeholder="PF Number"
        {...register("pfnum", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.pfnum?.message as string}
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
      <Controller
        name="doj"
        control={control}
        render={({ field: { value, onChange, onBlur } }) => {
          const validDateValue =
            typeof value === "string" && value ? parseISO(value) : value;
          const isValidDate =
            validDateValue instanceof Date && isValid(validDateValue);

          return (
            <DatePicker
              inputProps={{ label: "Date of Joining" }}
              placeholderText="Date of Joining"
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
      <Input
        label="Username"
        placeholder="Username"
        {...register("username", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.username?.message as string}
      />
      <Input
        label="Passcode"
        placeholder="Passcode"
        {...register("passcode", {
          setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
        })}
        error={errors.passcode?.message as string}
      />
    </FormGroup>
  );
}
