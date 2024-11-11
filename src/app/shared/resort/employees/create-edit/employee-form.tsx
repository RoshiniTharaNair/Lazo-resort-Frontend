"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Select, Loader } from "rizzui";
import {
  employeeFormSchema,
  CreateEmployeeInput,
} from "@/utils/validators/create-employee.schema";
import { DatePicker } from "@/components/ui/datepicker";
import FormGroup from "@/app/shared/form-group";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GeoOption {
  label: string;
  value: string;
}

interface EmployeeFormProps {
  employee?: CreateEmployeeInput;
  onSubmit: (data: CreateEmployeeInput) => void;
  isEditMode: boolean;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  onSubmit,
  isEditMode,
}) => {
  const formMethods = useForm<CreateEmployeeInput>({
    // resolver: zodResolver(employeeFormSchema),
    defaultValues: employee || {}, // Default to an empty object if no employee data is provided
  });

  const [geoOptions, setGeoOptions] = useState<GeoOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = formMethods;

  useEffect(() => {
    // Fetch geo location options
    const fetchGeoLocations = async () => {
      try {
        const response = await fetch(`${apiUrl}/geos/view`);
        if (response.ok) {
          const geos = await response.json();
          const formattedGeoOptions: GeoOption[] = geos.map((geo: any) => ({
            label: `${geo.city}, ${geo.state}, ${geo.country} (${geo.postalCode})`,
            value: geo.geoLocationIdentifier,
          }));
          setGeoOptions(formattedGeoOptions);
        } else {
          console.error("Failed to fetch geolocations.");
        }
      } catch (error) {
        console.error("Error fetching geolocations:", error);
      }
    };

    fetchGeoLocations();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader variant="spinner" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormGroup
            title={`${isEditMode ? "Edit" : "Add"} Employee`}
            description="Enter the employee details below."
          >
            <div className="grid grid-cols-3 gap-4">
              <Controller
                name="emp_code"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Employee Code"
                    placeholder="Enter Employee Code"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="first_name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="First Name"
                    placeholder="Enter First Name"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="last_name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Last Name"
                    placeholder="Enter Last Name"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="mid_name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Middle Name"
                    placeholder="Enter Middle Name"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="disp_name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Display Name"
                    placeholder="Enter Display Name"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="prim_contact"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Primary Contact"
                    placeholder="Enter Primary Contact Number"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="scnd_contact"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Secondary Contact"
                    placeholder="Enter Secondary Contact Number"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="emgncy_contact"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Emergency Contact"
                    placeholder="Enter Emergency Contact Number"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="prim_email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Primary Email"
                    placeholder="Enter Primary Email"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="aadhar_code"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Aadhar Number"
                    placeholder="Enter Aadhar Number"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="pan_code"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="PAN Number"
                    placeholder="Enter PAN Number"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="prmnt_address"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Permanent Address"
                    placeholder="Enter Permanent Address"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="present_address"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Present Address"
                    placeholder="Enter Present Address"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="dob"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    inputProps={{
                      label: "Date of Birth",
                      placeholder: "YYYY-MM-DD",
                    }}
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
              <Controller
                name="doj"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    inputProps={{
                      label: "Date of Joining",
                      placeholder: "YYYY-MM-DD",
                    }}
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
              <Controller
                name="bgv_status"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Background Verification Status"
                    placeholder="Enter BGV Status"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="pfnum"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="PF Number"
                    placeholder="Enter PF Number"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Username"
                    placeholder="Enter Username"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="passcode"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Passcode"
                    placeholder="Enter Passcode"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="geo"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  const selectedOption = geoOptions.find(option => option.value === field.value) || null;
                  return (
                    <Select
                      label="Geo Location"
                      options={geoOptions}
                      value={selectedOption}
                      placeholder="Select Geo Location"
                      onChange={(selectedOption) => field.onChange((selectedOption as GeoOption).value)}
                      clearable={false}
                      error={error?.message}
                      className="relative z-[9999]"
                      dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white"
                    />
                  );
                }}
              />
            </div>
          </FormGroup>
          <Button type="submit" className="mt-4">
            {employee ? "Update Employee" : "Create Employee"}
          </Button>
        </form>
      )}
    </>
  );
};
