"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Select } from "rizzui";
import {
  profileFormSchema,
  CreateProfileInput,
} from "@/utils/validators/create-profile.schema";
import FormGroup from "@/app/shared/form-group";
import toast from "react-hot-toast";

interface ProfileFormProps {
  profile?: CreateProfileInput;
  onSubmit: (data: CreateProfileInput) => void;
  isEditMode: boolean;
}

interface SelectOption {
  label: string;
  value: number;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onSubmit,
  isEditMode,
}) => {
  const formMethods = useForm<CreateProfileInput>({
    // resolver: zodResolver(profileFormSchema),
    defaultValues: profile || {}, // Default to an empty object if no profile data is provided
  });

  const { control, handleSubmit } = formMethods;

  const [geoOptions, setGeoOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Geo Locations on Component Mount
  useEffect(() => {
    const fetchGeoLocations = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/geos/view`);
        if (response.ok) {
          const data = await response.json();
          const options = data.map((geo: any) => ({
            label: `${geo.postalCode}, ${geo.city}, ${geo.state}, ${geo.country}`, // Format the label with geo details
            value: geo.geoLocationIdentifier, // Use the geo location identifier as the value
          }));
          setGeoOptions(options);
        } else {
          toast.error("Failed to load geo locations.");
        }
      } catch (error) {
        console.error("Error fetching geo locations:", error);
        toast.error("Failed to load geo locations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeoLocations();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormGroup title={`${isEditMode ? "Edit" : "Add"} Profile`} description="Enter the profile details below.">
        <div className="grid grid-cols-3 gap-4">
          <Controller
            name="firstname"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input label="First Name" placeholder="Enter First Name" {...field} error={error?.message} />
            )}
          />
          <Controller
            name="lastname"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input label="Last Name" placeholder="Enter Last Name" {...field} error={error?.message} />
            )}
          />
          <Controller
            name="middlename"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input label="Middle Name" placeholder="Enter Middle Name" {...field} error={error?.message} />
            )}
          />
          <Controller
            name="primarycontact"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input label="Primary Contact" placeholder="Enter Primary Contact" {...field} error={error?.message} />
            )}
          />
          <Controller
            name="secondarycontact"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input label="Secondary Contact" placeholder="Enter Secondary Contact" {...field} error={error?.message} />
            )}
          />
          <Controller
            name="primaryemail"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input label="Primary Email" placeholder="Enter Primary Email" {...field} error={error?.message} />
            )}
          />
          <Controller
            name="geoLocationIdentifier"
            control={control}
            render={({ field, fieldState: { error } }) => {
              const selectedOption = geoOptions.find((option) => option.value === field.value) || null;
              return (
                <Select
                  label="Geo Location"
                  options={geoOptions}
                  placeholder="Select Geo Location"
                  value={selectedOption}
                  onChange={(selectedOption) => field.onChange((selectedOption as SelectOption)?.value)}
                  error={error?.message}
                  className="relative z-[9999]"
                  dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white"
                />
              );
            }}
          />
          <Controller
            name="dob"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input label="Date of Birth" placeholder="Enter Date of Birth" type="date" {...field} error={error?.message} />
            )}
          />
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input label="Username" placeholder="Enter Username" {...field} error={error?.message} />
            )}
          />
          <Controller
            name="passcode"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input label="Passcode" placeholder="Enter Passcode" {...field} error={error?.message} />
            )}
          />
        </div>
      </FormGroup>
      <Button type="submit" className="mt-4">{profile ? "Update Profile" : "Create Profile"}</Button>
    </form>
  );
};
