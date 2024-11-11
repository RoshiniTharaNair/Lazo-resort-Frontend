"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Select, Button, Loader } from "rizzui";
import FormGroup from "@/app/shared/form-group";
import { CreatePriceInput } from "@/utils/validators/create-price.schema"; // Ensure you have a suitable schema defined
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ResortOption {
  label: string;
  value: number;
}

interface PriceFormProps {
  price?: CreatePriceInput;
  onSubmit: (data: CreatePriceInput) => void;
  isEditMode: boolean;
}

export const PriceForm: React.FC<PriceFormProps> = ({
  price,
  onSubmit,
  isEditMode,
}) => {
  const formMethods = useForm<CreatePriceInput>({
    defaultValues: price,
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
            title={`${isEditMode ? "Edit" : "Add"} Price`}
            description="Enter the price details below."
          >
            <Controller
              name="price"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Price"
                  placeholder="Enter Price"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="resortIdentifier"
              control={control}
              render={({ field, fieldState: { error } }) => {
                const selectedOption = resortOptions.find(
                  (option) => option.value === field.value
                ) || null;

                return (
                  <Select
                    label="Resort"
                    placeholder="Select Resort"
                    options={resortOptions}
                    value={selectedOption}
                    onChange={(selectedOption) =>
                      field.onChange((selectedOption as ResortOption)?.value)
                    }
                    clearable={false}
                    error={error?.message}
                    className="relative z-[9999]" // Adjusted higher z-index
                    dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white" // Ensure visibility
                  />
                );
              }}
            />
            <Button type="submit" className="mt-4">
              {isEditMode ? "Update Price" : "Create Price"}
            </Button>
          </FormGroup>
        </form>
      )}
    </>
  );
};
