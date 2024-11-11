"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button, Drawer } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import VoidDatesTable from "@/app/shared/resort/special-rates/product-list/table"; // Updated import
import ExportButton from "@/app/shared/export-button";
import { Loader } from "rizzui";
import toast from "react-hot-toast";
import { CreateVoidDateInput } from "@/utils/validators/create-void-date.schema"; // Updated import
import { VoidDateForm } from "@/app/shared/resort/special-rates/create-edit/void-date-form"; // Updated import

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const metadata: Metadata = {
  title: "Special Rates | Lazo Resort Admin",
};

const pageHeader = {
  title: "Special Rates",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.voidDate,
      name: "Special Rates",
    },
    {
      name: "List",
    },
  ],
};

export default function VoidDatesPage() {
  // Explicitly typing the state with an array of expected type
  const [voidDates, setVoidDates] = useState<CreateVoidDateInput[]>([]);
  const [selectedVoidDate, setSelectedVoidDate] = useState<CreateVoidDateInput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const methods = useForm<CreateVoidDateInput>({
    defaultValues: selectedVoidDate,
  });

  useEffect(() => {
    fetchVoidDates();
  }, []);

  const fetchVoidDates = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/voidDate/view`);
      if (response.ok) {
        const data: CreateVoidDateInput[] = await response.json();
        // Enrich data with resort labels
        const enrichedData: CreateVoidDateInput[] = await Promise.all(
          data.map(async (voidDate: CreateVoidDateInput) => {
            const resortResponse = await fetch(`${apiUrl}/resorts/view/${voidDate.resortIdentifier}`);
            const resortData = await resortResponse.json();
            return {
              ...voidDate,
              resortLabel: resortData.label, // Assuming 'label' is the property for the resort name
            };
          })
        );
        setVoidDates(enrichedData);
      } else {
        console.error("Failed to fetch void dates");
        toast.error("Failed to load void dates.");
      }
    } catch (error) {
      console.error("Error fetching void dates:", error);
      toast.error("Failed to load void dates.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (data: CreateVoidDateInput) => {
    const url = isEditMode
      ? `${apiUrl}/voidDate/update/${data.voiddateIdentifier}`
      : `${apiUrl}/voidDate/create/`;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(`Special Rates ${isEditMode ? "updated" : "created"} successfully!`);
        setIsDrawerOpen(false);
        fetchVoidDates(); // Refresh the special Rates list
      } else {
        throw new Error("Failed to submit special Rates data");
      }
    } catch (error) {
      console.error(`Error submitting special Rates data: ${error}`);
      toast.error(`Failed to ${isEditMode ? "update" : "create"} special Rates.`);
    }
  };

  const toggleDrawer = (voidDate?: CreateVoidDateInput) => {
    setSelectedVoidDate(voidDate);
    setIsEditMode(!!voidDate);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={voidDates}
            fileName="Special Rates"
            header="Special Rates Identifier, Resort Identifier, Special Rates, Void Multiplier"
          />
          <Button onClick={() => toggleDrawer()} className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Special Rates
          </Button>
        </div>
      </PageHeader>
      {isLoading ? (
        <Loader variant="spinner" />
      ) : (
        <VoidDatesTable data={voidDates} onEditToggle={toggleDrawer} />
      )}
      <FormProvider {...methods}>
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          size="xl"
          overlayClassName="dark:bg-opacity-40 dark p-4 overflow-auto max-h-[calc(100vh-4rem)]"
          containerClassName="dark:bg-gray-100"
          className="z-[9999]"
        >
          <div className="p-6 overflow-auto max-h-[calc(100vh-4rem)]">
            <h2 className="text-lg font-semibold mb-4">
              {isEditMode ? "Update" : "Create"} Special Rates
            </h2>
            <VoidDateForm
              voidDate={selectedVoidDate}
              onSubmit={handleFormSubmit}
              isEditMode={isEditMode}
            />
          </div>
        </Drawer>
      </FormProvider>
    </>
  );
}
