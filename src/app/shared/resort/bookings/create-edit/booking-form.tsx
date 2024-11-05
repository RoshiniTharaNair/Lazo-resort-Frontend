"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  bookingFormSchema,
  CreateBookingInput,
} from "@/utils/validators/create-booking.schema";
import { Loader, Input, Select, Button } from "rizzui";
import dynamic from "next/dynamic";
import { DatePicker } from "@/components/ui/datepicker";
import FormGroup from "@/app/shared/form-group";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const QuillEditor = dynamic(() => import("@/components/ui/quill-editor"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-full">
      <Loader variant="spinner" />
    </div>
  ),
});

interface Resort {
  label: string;
  resortIdentifier: number;
}

interface Customer {
  firstname: string;
  lastname: string;
  customerIdentifier: number;
}

interface Vendor {
  label: string;
  vendorIdentifier: number;
}

interface Employee {
  emp_code: string;
  first_name: string;
  last_name: string;
}

interface ResortOption {
  label: string;
  value: number;
}

interface CustomerOption {
  label: string;
  value: number;
}

interface VendorOption {
  label: string;
  value: number;
}

interface EmployeeOption {
  label: string;
  value: string;
}

interface BookingFormProps {
  booking?: CreateBookingInput;
  onSubmit: (data: CreateBookingInput) => void;
  isEditMode: boolean;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  booking,
  onSubmit,
  isEditMode,
}) => {
  const formMethods = useForm<CreateBookingInput>({
    // resolver: zodResolver(bookingFormSchema),
    defaultValues: booking,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = formMethods;
  const [resortOptions, setResortOptions] = useState<ResortOption[]>([]);
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [vendorOptions, setVendorOptions] = useState<VendorOption[]>([]);
  const [employeeOptions, setEmployeeOptions] = useState<EmployeeOption[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const resortResponse = await fetch(`${apiUrl}/resorts/view`);
        const customerResponse = await fetch(`${apiUrl}/customers/view`);
        const vendorResponse = await fetch(`${apiUrl}/vendors/view`);
        const employeeResponse = await fetch(`${apiUrl}/employee/getEmployee`);

        const [resorts, customers, vendors, employees]: [Resort[], Customer[], Vendor[], Employee[]] = await Promise.all([
          resortResponse.ok ? resortResponse.json() : Promise.reject("Failed to fetch resorts"),
          customerResponse.ok ? customerResponse.json() : Promise.reject("Failed to fetch customers"),
          vendorResponse.ok ? vendorResponse.json() : Promise.reject("Failed to fetch vendors"),
          employeeResponse.ok ? employeeResponse.json() : Promise.reject("Failed to fetch employees"),
        ]);

        setResortOptions(resorts.map((resort: Resort) => ({
          label: resort.label,
          value: resort.resortIdentifier,
        })));

        setCustomerOptions(customers.map((customer: Customer) => ({
          label: `${customer.firstname} ${customer.lastname}`,
          value: customer.customerIdentifier,
        })));

        setVendorOptions(vendors.map((vendor: Vendor) => ({
          label: vendor.label,
          value: vendor.vendorIdentifier,
        })));

        setEmployeeOptions(employees.map((employee: Employee) => ({
          label: `${employee.first_name} ${employee.last_name}`,
          value: employee.emp_code,
        })));

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
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
            title={`${isEditMode ? "Edit" : "Add"} Booking`}
            description="Enter the Bookings below."
          >
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="recDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    inputProps={{
                      label: "Record Date",
                      placeholder: "YYYY-MM-DD",
                    }}
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
              <Controller
                name="checkInDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    inputProps={{ label: "Check-In Date" }}
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
              <Controller
                name="checkOutDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    inputProps={{ label: "Check-Out Date" }}
                    selected={field.value ? new Date(field.value) : null}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="yyyy-MM-dd"
                  />
                )}
              />
              <Controller
                name="transactionReference"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Transaction Reference"
                    placeholder="Transaction Reference"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="paymentMode"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Payment Mode"
                    placeholder="Payment Mode"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="base"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Base Price"
                    placeholder="Base Price"
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
                  <Input
                    label="GST"
                    placeholder="GST (%)"
                    type="number"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="primaryContact"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Primary Contact"
                    placeholder="Primary Contact"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="primaryEmail"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Primary Email"
                    placeholder="Primary Email"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
              <Controller
                name="specialRequest"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    label="Special Request"
                    placeholder="Special Request"
                    {...field}
                    error={error?.message}
                  />
                )}
              />
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
                      className="relative z-[9999]"
                      dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white"
                    />
                  );
                }}
              />
              <Controller
                name="customerIdentifier"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  const selectedOption = customerOptions.find((option) => option.value === field.value) || null;
                  return (
                    <Select
                      label="Customer"
                      options={customerOptions}
                      value={selectedOption}
                      onChange={(selectedOption) => field.onChange((selectedOption as CustomerOption)?.value)}
                      clearable={false}
                      error={error?.message}
                      className="relative z-[9999]"
                      dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white"
                    />
                  );
                }}
              />
              <Controller
                name="vendorIdentifier"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  const selectedOption = vendorOptions.find((option) => option.value === field.value) || null;
                  return (
                    <Select
                      label="Vendor"
                      options={vendorOptions}
                      value={selectedOption}
                      onChange={(selectedOption) => field.onChange((selectedOption as VendorOption)?.value)}
                      clearable={false}
                      error={error?.message}
                      className="relative z-[9999]"
                      dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white"
                    />
                  );
                }}
              />
              <Controller
                name="empCode"
                control={control}
                render={({ field, fieldState: { error } }) => {
                  const selectedOption = employeeOptions.find(option => option.value === field.value) || null;
                  return (
                    <Select
                      label="Employee"
                      options={employeeOptions}
                      value={selectedOption}
                      onChange={(selectedOption) => field.onChange((selectedOption as EmployeeOption).value)}
                      clearable={false}
                      error={error?.message}
                      className="relative z-[9999]"
                      dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white"
                    />
                  );
                }}
              />
            </div>
            <Controller
              name="comments"
              control={control}
              render={({ field }) => (
                <QuillEditor
                  value={field.value}
                  onChange={field.onChange}
                  label="Comments"
                />
              )}
            />
          </FormGroup>
          <Button type="submit" className="mt-4">
            {booking ? "Update Booking" : "Create Booking"}
          </Button>
        </form>
      )}
    </>
  );
};
