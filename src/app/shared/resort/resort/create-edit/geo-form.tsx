"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  geoLocationSchema,
  CreateGeoLocationInput,
} from "@/utils/validators/create-geo.schema";
import { Loader, Input, Select, Button } from "rizzui";
import dynamic from "next/dynamic";
import { parseISO, isValid, formatISO } from "date-fns";
import { DatePicker } from "@/components/ui/datepicker";
import { useFormContext } from "react-hook-form";
import { GeoLocationData } from "@/data/geo";

interface GeoFormProps {
  vendor?: CreateGeoLocationInput;
  onSubmit: (data: CreateGeoLocationInput) => void;
  isEditMode: boolean;
}

export const GeoForm: React.FC<GeoFormProps> = ({
  vendor,
  onSubmit,
  isEditMode,
}: {
  vendor?: CreateGeoLocationInput;
  onSubmit: (data: CreateGeoLocationInput) => void;
  isEditMode: boolean;
}) => {
  const formMethods = useForm<CreateGeoLocationInput>({
    defaultValues: vendor,
  });
  const [geoLocationData, setGeoLocationData] = useState<
    { label: string; value: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [value, setValue] = useState(null);
  

  useEffect(() => {
    setIsLoading(true);
    const transformedData = GeoLocationData.map((location) => ({
      label: location.postalCode,
      value: location.postalCode,
    }));
    setGeoLocationData(transformedData);
    // setValue(transformedData[0]); 
    setIsLoading(false);
    console.log(transformedData);
  }, []);
  // const [value, setValue] = useState(transformedData[0]);

  const { control, handleSubmit } = formMethods;

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
              name="country"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Country"
                  placeholder="Country"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            {/* <Controller
          name="postalCode"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              label="postalCode"
              placeholder="postalCode"
              {...field}
              error={error?.message}
            />
          )}
        /> */}
            <Controller
              name="postalCode"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Select // Step 3: Change to Select component
                  label="postalCode"
                  options={geoLocationData}
                  {...field}
                  error={error?.message}
                />
              )}
            />
            {/* <Controller
          name="postalCode"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Select
              label="postalCode"
              options={geoLocationData}
              value={value}
              onChange={setValue}
              clearable={value !== null}
              onClear={() => setValue(null)}
              {...field}
              error={error?.message}
            /> */}
            {/* <Controller
          name="postalCode"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Select // Step 3: Change to Select component
              label="postalCode"
              options={[
                { label: "Select...", value: "" }, // Add initial "Select..." option
                ...GeoLocationData.map(location => ({
                  label: location.postalCode,
                  value: location.postalCode,
                }))
              ]}
              {...field}
              error={error?.message}
            />
          )}
        /> */}
            <Controller
              name="state"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="State"
                  placeholder="State"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="City"
                  placeholder="City"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="district"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Dictrict"
                  placeholder="Dictrict"
                  {...field}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="town"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  label="Town"
                  placeholder="Town"
                  {...field}
                  error={error?.message}
                />
              )}
            />
          </div>
          <Button type="submit" className="mt-4">
            {isEditMode ? "Update Geo location" : "Create Geo location"}
          </Button>
        </form>
      )}
    </>
  );
};
