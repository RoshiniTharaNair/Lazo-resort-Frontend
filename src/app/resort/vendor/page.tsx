"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button, Drawer } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import ExportButton from "@/app/shared/export-button";
import VendorsTable from "@/app/shared/resort/vendor/product-list/table";
import { defaultValues } from "@/app/shared/resort/vendor/create-edit/form-utils";
import { useForm, FormProvider } from "react-hook-form";
import { VendorForm } from "@/app/shared/resort/vendor/create-edit/vendor-form";
import { CreateVendorInput } from "@/utils/validators/create-vendor.schema";
import toast, { Toaster } from 'react-hot-toast';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


import { Loader } from "rizzui";

const metadata: Metadata = {
  title: "Vendors | Lazo Resort Admin",
};

const pageHeader = {
  title: "Vendors",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.vendor,
      name: "Vendors",
    },
    {
      name: "List",
    },
  ],
};

export default function VendorPage() {
  const [selectedVendor, setSelectedVendor] = useState<
    CreateVendorInput | undefined
  >(undefined);
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode
  const methods = useForm({
    defaultValues: defaultValues(),
  });

  const toggleDrawer = (vendor?: CreateVendorInput) => {
    setSelectedVendor(vendor);
    setIsEditMode(!!vendor); // Set edit mode if vendor is provided
    setIsDrawerOpen(true);
  };

  const handleFormSubmit = async (data: CreateVendorInput) => {
    try {
      console.log("Handle Form Submit");
      console.log(data);

      const url = isEditMode
        ? `${apiUrl}/vendors/update/${data.vendorIdentifier}`
        : `${apiUrl}/vendors/create/`;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      console.log(
        `Vendor ${isEditMode ? "updated" : "created"} successfully`
      );
      setIsDrawerOpen(false);
      toast.success(`Vendor ${isEditMode ? "updated" : "created"} successfully!`);
      fetchVendorRefresh();
      // Optionally, refresh your Vendors list here
    } catch (error) {
      console.error(`Failed to ${isEditMode ? "update" : "create"} Vendor:`, error);
    }
  };

  // Fetch Inventory data from API
  useEffect(() => {
    const fetchVendors = async () => {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/vendors/view`);
      if (response.ok) {
        const data = await response.json();
        setVendors(data);
        setIsLoading(false);
        console.log(data);
      } else {
        // Handle response error
        console.error("Failed to fetch Vendors");
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    fetchVendorRefresh();
  }, []);

  const fetchVendorRefresh = async () => {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/vendors/view`);
    if (response.ok) {
      const data = await response.json();
      setVendors(data);
      setIsLoading(false);
    } else {
      console.error("Failed to fetch Vendors");
      toast.error("Failed to load Vendors.");
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={vendors}
            fileName="Vendors"
            header="label, propertyKey"
          />
          <Button onClick={() => toggleDrawer()} className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Vendor
          </Button>
        </div>
      </PageHeader>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader variant="spinner" />
        </div>
      ) : (
        <VendorsTable data={vendors} onEditToggle={toggleDrawer} />
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
              {isEditMode ? "Update" : "Create"} Vendor
            </h2>
            <VendorForm
              vendor={selectedVendor}
              onSubmit={handleFormSubmit}
              isEditMode={!!selectedVendor}
            />
          </div>
        </Drawer>
      </FormProvider>
    </>
  );
}