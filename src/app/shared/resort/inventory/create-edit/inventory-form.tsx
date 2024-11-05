"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Loader, Input, Select, Button } from "rizzui";
import { CreateInventoryInput } from "@/utils/validators/create-inventory.schema";
import { parseISO, isValid, formatISO } from "date-fns";
import { DatePicker } from "@/components/ui/datepicker";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ResortOption {
  label: string;
  value: number;
}

interface RoomCategoryOption {
  label: string;
  value: number; // Use number here to match the request body structure
}

interface InventoryFormProps {
  inventory?: CreateInventoryInput;
  onSubmit: (data: CreateInventoryInput) => void;
  isEditMode: boolean;
}

export const InventoryForm: React.FC<InventoryFormProps> = ({
  inventory,
  onSubmit,
  isEditMode,
}) => {
  const formMethods = useForm<CreateInventoryInput>({
    defaultValues: inventory,
  });
  const { control, handleSubmit, reset } = formMethods;
  const [roomCategoryOptions, setRoomCategoryOptions] = useState<RoomCategoryOption[]>([]);
  const [resortOptions, setResortOptions] = useState<ResortOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch resort data to populate the Select dropdown
    const fetchResorts = async () => {
      try {
        setIsLoading(true);
        // Fetch room categories
        const roomCategoryResponse = await fetch(`${apiUrl}/ResortRoomType/view`);
        if (roomCategoryResponse.ok) {
          const roomCategories = await roomCategoryResponse.json();
          setRoomCategoryOptions(roomCategories.map((cat: any) => ({
            label: cat.roomType,
            value: cat.recIdentifier,
          })));
        } else {
          console.error("Failed to fetch room categories");
        }
        // Fetch resorts
        const response = await fetch(`${apiUrl}/resorts/view`);
        if (response.ok) {
          const resorts = await response.json();
          const formattedOptions: ResortOption[] = resorts.map((resort: any) => ({
            label: resort.label,
            value: resort.resortIdentifier,
          }));
          setResortOptions(formattedOptions);
          setIsLoading(false);

          // Refresh the form with the correct value
          reset({
            ...inventory,
            resortIdentifier: inventory?.resortIdentifier ?? undefined,
          });
        } else {
          console.error("Failed to fetch resorts");
        }
      } catch (error) {
        console.error("Error fetching resorts:", error);
        setIsLoading(false);
      }
    };

    fetchResorts();
  }, [reset, inventory]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader variant="spinner" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="resortIdentifier"
              control={control}
              render={({ field, fieldState: { error } }) => {
                const selectedOption = resortOptions.find((option) => option.value === field.value) || null;

                return (
                  <Select
                    label="Resort"
                    options={resortOptions}
                    value={selectedOption}
                    onChange={(selectedOption) => field.onChange((selectedOption as ResortOption)?.value)}
                    clearable={false}
                    error={error?.message}
                    className="relative z-[9999]" // Adjusted higher z-index
                    dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white" // Ensure visibility
                  />
                );
              }}
            />
            <Controller
              name="effectiveDate"
              control={control}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => {
                // Convert the incoming value to a Date object if it's a valid ISO string
                const validDateValue =
                  value && typeof value === "string" ? parseISO(value) : null;
                const isValidDate =
                  validDateValue instanceof Date && isValid(validDateValue);

                return (
                  <DatePicker
                    inputProps={{ label: "Effective Date" }}
                    placeholderText="YYYY-MM-DD"
                    dateFormat="yyyy-MM-dd" 
                    selected={isValidDate ? validDateValue : null}
                    onChange={(date) => {
                      const formattedDate =
                        date instanceof Date
                          ? formatISO(date, { representation: "date" })
                          : "";
                      onChange(formattedDate);
                    }}
                    onBlur={onBlur} 
                  />
                );
              }}
            />
            <Controller
              name="roomClass"
              control={control}
              render={({ field, fieldState: { error } }) => {
                const selectedOption = roomCategoryOptions.find(option => option.value === field.value) || null;

                return (
                  <Select
                    label="Room Class"
                    options={roomCategoryOptions}
                    value={selectedOption}
                    onChange={(selectedOption) => field.onChange((selectedOption as RoomCategoryOption).value)}
                    clearable={false}
                    error={error?.message}
                    className="relative z-[9999]" // Adjusted higher z-index
                    dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white" // Ensure visibility
                  />
                );
              }}
            />
            <Controller
              name="avlCount"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Available Count"
                  type="number"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="maxOcc"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Maximum Occupancy"
                  type="number"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="basePrice"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Base Price"
                  type="number"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="basePoints"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Base Points"
                  type="number"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="gst"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input label="GST" {...field} error={error?.message} />
              )}
            />
            <Controller
              name="discount"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Discount"
                  placeholder="Optional"
                  {...field}
                  error={error?.message}
                />
              )}
            />
          </div>
          <Button type="submit" className="mt-4">
            {isEditMode ? "Update Inventory" : "Create Inventory"}
          </Button>
        </form>
      )}
    </>
  );
};
