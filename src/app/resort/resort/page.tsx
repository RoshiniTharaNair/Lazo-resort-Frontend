"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button, Drawer } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import ExportButton from "@/app/shared/export-button";
import ResortTable from "@/app/shared/resort/resort/product-list/table";
import { defaultValues } from "@/app/shared/resort/resort/create-edit/form-utils";
import { useForm, FormProvider } from "react-hook-form";
import { ResortForm } from "@/app/shared/resort/resort/create-edit/resort-form";
import { CreateResortInput } from "@/utils/validators/create-resort.schema";
import { ResortData } from "@/data/resort";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

import { Loader } from "rizzui";

const metadata: Metadata = {
  title: "Resort | Lazo Resort Admin",
};

const pageHeader = {
  title: "Resort",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.resort,
      name: "Resort",
    },
    {
      name: "List",
    },
  ],
};

export default function ResortPage() {
  const [selectedResort, setSelectedResort] = useState<
    CreateResortInput | undefined
  >(undefined);
  // const [geo, setGeo] = useState([]);
  const [resort, setResort] = useState(ResortData);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode
  const methods = useForm({
    defaultValues: defaultValues(),
  });

  const toggleDrawer = (resort?: CreateResortInput) => {
    setSelectedResort(resort);
    setIsEditMode(!!resort); // Set edit mode if vendor is provided
    setIsDrawerOpen(true);
  };

  const handleFormSubmit = async (data: CreateResortInput) => {
    try {
      console.log("Handle Form Submit");
      console.log(data);

      const url = isEditMode
        ? `${apiUrl}/resorts/update/${data.resortIdentifier}`
        : `${apiUrl}/resorts/create`;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      console.log(`Resort ${isEditMode ? "updated" : "created"} successfully`);
      // setIsDrawerOpen(false);
      // Optionally, refresh your Resort list here
    } catch (error) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} Resort:`,
        error
      );
    }
  };

  // Fetch Resorts data from API
  useEffect(() => {
    const fetchResorts = async () => {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/resorts/view`);
      if (response.ok) {
        const data = await response.json();
        console.log("resorts data >>", data);
        
        setResort([...data]); // Ensure a new reference is set
        setIsLoading(false);
      } else {
        console.error("Failed to fetch Resorts");
      }
    };
    fetchResorts();
  }, []);
 
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton data={resort} fileName="Resort" header="rst_lbl, reservation_cont,services_cont, support_cont, reservation_email, services_email, support_email, rst_desc " />
          <Button onClick={() => toggleDrawer()} className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Resort
          </Button>
        </div>
      </PageHeader>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader variant="spinner" />
        </div>
      ) : (
      <ResortTable data={resort} onEditToggle={toggleDrawer} />
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
              {isEditMode ? "Update" : "Create"} Resort
            </h2>
            <ResortForm
              resort={selectedResort}
              onSubmitProp={handleFormSubmit}
              isEditMode={!!selectedResort}
            />
          </div>
        </Drawer>
      </FormProvider>
    </>
  );
}
