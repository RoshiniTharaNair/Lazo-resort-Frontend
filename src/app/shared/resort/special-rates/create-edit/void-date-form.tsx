"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Select, Button, Loader } from "rizzui";
import FormGroup from "@/app/shared/form-group";
import { CreateVoidDateInput } from "@/utils/validators/create-void-date.schema"; // Update to use the correct schema
import { DatePicker } from "@/components/ui/datepicker";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ResortOption {
  label: string;
  value: number;
}

interface VoidDateFormProps {
  voidDate?: CreateVoidDateInput;
  onSubmit: (data: CreateVoidDateInput) => void;
  isEditMode: boolean;
}

export const VoidDateForm: React.FC<VoidDateFormProps> = ({
  voidDate,
  onSubmit,
  isEditMode,
}) => {
  const formMethods = useForm<CreateVoidDateInput>({
    defaultValues: voidDate,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = formMethods;

  const [resortOptions, setResortOptions] = useState<ResortOption[]>([]);

  useEffect(() => {
    const fetchResorts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/resorts/view`);
        if (response.ok) {
          const resorts = await response.json();
          const formattedOptions: ResortOption[] = resorts.map((resort: any) => ({
            label: resort.label,
            value: resort.resortIdentifier,
          }));
          setResortOptions(formattedOptions);
        } else {
          console.error("Failed to fetch resorts");
        }
      } catch (error) {
        console.error("Error fetching resorts:", error);
      }
      setIsLoading(false);
    };

    fetchResorts();
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
            title={`${isEditMode ? "Edit" : "Add"} Special Rates`}
            description="Enter the special rates details below."
          >
            <div className="grid grid-cols-3 gap-4">
              <Controller
                name="resortIdentifier"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  const selectedOption = resortOptions.find((option) => option.value === field.value) || null;

                  return (
                    <Select
                      label="Resort"
                      placeholder="Select Resort"
                      options={resortOptions}
                      value={selectedOption}
                      onChange={(selectedOption) => field.onChange((selectedOption as ResortOption)?.value)}
                      clearable={false}
                      error={error?.message}
                      className="relative z-[9999]"
                      dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white"
                    />
                  );
                }}
              />
              <Controller
                name="voidDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    inputProps={{
                      label: "Special Date",
                      placeholder: "YYYY-MM-DD",
                    }}
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
              <Controller
                name="voidMultiplier"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Price Multiplier"
                    placeholder="Enter Price Multiplier"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
            </div>
            <Button type="submit" className="mt-4">
              {isEditMode ? "Update Special Rate" : "Create Special Rate"}
            </Button>
          </FormGroup>
        </form>
      )}
    </>
  );
};
