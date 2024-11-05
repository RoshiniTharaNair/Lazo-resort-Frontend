"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller, Control, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Button, Tab, Select } from "rizzui";
import {
  resortSchema,
  CreateResortInput,
} from "@/utils/validators/create-resort.schema";
import { ResortData } from "@/data/resort";
import { DatePicker } from "@/components/ui/datepicker";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ResortOption {
  label: string;
  value: number;
}

interface GeoOption {
  label: string;
  value: number;
}

interface ResortFormProps {
  resort?: CreateResortInput;
  onSubmitProp: (data: CreateResortInput) => void;
  isEditMode: boolean;
}

export const ResortForm: React.FC<ResortFormProps> = ({
  resort,
  onSubmitProp,
  isEditMode,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<CreateResortInput>({
    resolver: zodResolver(resortSchema),
    defaultValues: resort || {}, // Fallback to empty object if no resort is provided
  });

  const handleFormSubmit = (data: CreateResortInput) => {
    onSubmitProp(data); // Use onSubmitProp to handle form submission
  };

  const [geoOptions, setGeoOptions] = useState<GeoOption[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    // Fetch geolocation options
    const fetchGeoLocations = async () => {
      try {
        const response = await fetch(`${apiUrl}/geos/view`);
        if (response.ok) {
          const geos = await response.json();
          const formattedGeoOptions: GeoOption[] = geos.map((geo: any) => ({
            label: `${geo.postalCode}, ${geo.city}, ${geo.state}, ${geo.country}`,
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

  const handleNext = () => setActiveTab((prev) => Math.min(prev + 1, 3));
  const handlePrevious = () => setActiveTab((prev) => Math.max(prev - 1, 0));

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Tab selectedIndex={activeTab} onChange={(index) => setActiveTab(index)}>
        <Tab.List>
          <Tab.ListItem>Resort</Tab.ListItem>
          <Tab.ListItem>Document</Tab.ListItem>
          <Tab.ListItem>SPOC</Tab.ListItem>
          <Tab.ListItem>Tags</Tab.ListItem>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="grid grid-cols-2 gap-4">
              <ResortSection control={control} errors={errors} geoOptions={geoOptions} />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-2 gap-4">
              <DocumentSection control={control} errors={errors} />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-2 gap-4">
              <SpocSection control={control} errors={errors} />
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-2 gap-4">
              <TagsSection control={control} errors={errors} />
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab>
      <div className="flex justify-between">
        {activeTab > 0 && (
          <Button type="button" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {activeTab < 3 && (
          <Button type="button" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
      {activeTab === 3 && (
        <Button type="submit" className="w-full">
          {isEditMode ? "Update Resort" : "Create Resort"}
        </Button>
      )}
    </form>
  );
};

// ResortSection.tsx
const ResortSection: React.FC<{
  control: Control<CreateResortInput>;
  errors: FieldErrors<CreateResortInput>;
  geoOptions: GeoOption[];
}> = ({ control, errors, geoOptions }) => {
  return (
    <>
      <Controller
        name="label"
        control={control}
        render={({ field }) => (
          <Input
            label="Resort Label"
            placeholder="Enter resort label"
            {...field}
            error={errors.label?.message}
          />
        )}
      />
      <Controller
        name="geoLocationIdentifier"
        control={control}
        render={({ field, fieldState: { error } }) => {
          const fieldValueAsNumber = field.value ? Number(field.value) : null;
          const selectedOption = geoOptions.find((option) => option.value === fieldValueAsNumber) || null;

          return (
            <Select
              label="Geo Location"
              options={geoOptions}
              value={selectedOption}
              onChange={(selectedOption) => field.onChange((selectedOption as GeoOption)?.value)}
              error={error?.message}
              clearable={false}
              className="relative z-[9999]"
              dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white"
            />
          );
        }}
      />
      <Controller
        name="reservation_cont"
        control={control}
        render={({ field }) => (
          <Input
            label="Reservation Contact"
            placeholder="Enter reservation contact"
            {...field}
            error={errors.reservation_cont?.message}
          />
        )}
      />
      <Controller
        name="services_cont"
        control={control}
        render={({ field }) => (
          <Input
            label="Services Contact"
            placeholder="Enter services contact"
            {...field}
            error={errors.services_cont?.message}
          />
        )}
      />
      <Controller
        name="support_cont"
        control={control}
        render={({ field }) => (
          <Input
            label="Support Contact"
            placeholder="Enter support contact"
            {...field}
            error={errors.support_cont?.message}
          />
        )}
      />
      <Controller
        name="reservation_email"
        control={control}
        render={({ field }) => (
          <Input
            label="Reservation Email"
            placeholder="Enter reservation email"
            {...field}
            error={errors.reservation_email?.message}
          />
        )}
      />
      <Controller
        name="services_email"
        control={control}
        render={({ field }) => (
          <Input
            label="Services Email"
            placeholder="Enter services email"
            {...field}
            error={errors.services_email?.message}
          />
        )}
      />
      <Controller
        name="support_email"
        control={control}
        render={({ field }) => (
          <Input
            label="Support Email"
            placeholder="Enter support email"
            {...field}
            error={errors.support_email?.message}
          />
        )}
      />
      <Controller
        name="careers_email"
        control={control}
        render={({ field }) => (
          <Input
            label="Careers Email"
            placeholder="Enter careers email"
            {...field}
            error={errors.careers_email?.message}
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <Input
            label="Resort Description"
            placeholder="Enter resort description"
            {...field}
            error={errors.description?.message}
          />
        )}
      />
    </>
  );
};

// DocumentSection.tsx
const DocumentSection: React.FC<{
  control: Control<CreateResortInput>;
  errors: FieldErrors<CreateResortInput>;
}> = ({ control, errors }) => {
  return (
    <>
      <Controller
        name="Document.doc_type"
        control={control}
        render={({ field }) => (
          <Input
            label="Document Type"
            placeholder="Enter document type"
            {...field}
            error={errors.Document?.doc_type?.message}
          />
        )}
      />
      <Controller
        name="Document.doc_url"
        control={control}
        render={({ field }) => (
          <Input
            label="Document URL"
            placeholder="Enter document URL"
            {...field}
            error={errors.Document?.doc_url?.message}
          />
        )}
      />
      <Controller
        name="Document.doc_effdate"
        control={control}
        render={({ field }) => (
          <DatePicker
            selected={field.value ? new Date(field.value) : null}
            onChange={(date) => field.onChange(date)}
            dateFormat="yyyy-MM-dd"
            inputProps={{
              label: "Effective Date",
              placeholder: "Enter effective date",
            }}
          />
        )}
      />
      <Controller
        name="Document.poc_name"
        control={control}
        render={({ field }) => (
          <Input
            label="POC Name"
            placeholder="Enter POC name"
            {...field}
            error={errors.Document?.poc_name?.message}
          />
        )}
      />
      <Controller
        name="Document.poc_cont"
        control={control}
        render={({ field }) => (
          <Input
            label="POC Contact"
            placeholder="Enter POC contact number"
            {...field}
            error={errors.Document?.poc_cont?.message}
          />
        )}
      />
      <Controller
        name="Document.poc_email"
        control={control}
        render={({ field }) => (
          <Input
            label="POC Email"
            placeholder="Enter POC email"
            {...field}
            error={errors.Document?.poc_email?.message}
          />
        )}
      />
    </>
  );
};

// SpocSection.tsx
const SpocSection: React.FC<{
  control: Control<CreateResortInput>;
  errors: FieldErrors<CreateResortInput>;
}> = ({ control, errors }) => {
  return (
    <>
      <Controller
        name="SPOC.emp_code"
        control={control}
        render={({ field }) => (
          <Input
            label="Employee Code"
            placeholder="Enter employee code"
            {...field}
            error={errors.SPOC?.emp_code?.message}
          />
        )}
      />
      <Controller
        name="SPOC.spoc_role"
        control={control}
        render={({ field }) => (
          <Input
            label="SPOC Role"
            placeholder="Enter SPOC role"
            {...field}
            error={errors.SPOC?.spoc_role?.message}
          />
        )}
      />
      <Controller
        name="SPOC.status"
        control={control}
        render={({ field }) => (
          <Input
            label="Status"
            placeholder="Enter status"
            {...field}
            error={errors.SPOC?.status?.message}
          />
        )}
      />
    </>
  );
};

// TagsSection.tsx
const TagsSection: React.FC<{
  control: Control<CreateResortInput>;
  errors: FieldErrors<CreateResortInput>;
}> = ({ control, errors }) => {
  return (
    <>
      <Controller
        name="Tags.tagLabel"
        control={control}
        render={({ field }) => (
          <Input
            label="Tag Label"
            placeholder="Enter Tag Label"
            {...field}
            error={errors.Tags?.tagLabel?.message}
          />
        )}
      />
      <Controller
        name="Tags.tagClass"
        control={control}
        render={({ field }) => (
          <Input
            label="Tag Class"
            placeholder="Enter Tag Class"
            {...field}
            error={errors.Tags?.tagClass?.message}
          />
        )}
      />
      <Controller
        name="Tags.tagDesc"
        control={control}
        render={({ field }) => (
          <Input
            label="Tag Description"
            placeholder="Enter Tag Description"
            {...field}
            error={errors.Tags?.tagDesc?.message}
          />
        )}
      />
      <Controller
        name="Tags.status"
        control={control}
        render={({ field }) => (
          <Input
            label="Status"
            placeholder="Enter Status"
            {...field}
            error={errors.Tags?.status?.message}
          />
        )}
      />
    </>
  );
};
