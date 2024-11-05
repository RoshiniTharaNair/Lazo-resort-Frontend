"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button, Drawer } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import ProductsTable from "@/app/shared/resort/price/product-list/table";
import ExportButton from "@/app/shared/export-button";
import { Loader } from "rizzui";
import toast from "react-hot-toast";
import { CreatePriceInput } from "@/utils/validators/create-price.schema"; // Ensure you have a suitable schema
import { PriceForm } from "@/app/shared/resort/price/create-edit/price-form";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const metadata: Metadata = {
  title: "Pricing Types | Lazo Resort Admin",
};

const pageHeader = {
  title: "Prices",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.pricing,
      name: "Prices",
    },
    {
      name: "List",
    },
  ],
};

export default function PricesPage() {
  const [pricing, setPricing] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState<CreatePriceInput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const methods = useForm<CreatePriceInput>({
    defaultValues: selectedPrice,
  });

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/pricings/view`);
    if (response.ok) {
      const data = await response.json();
      setPricing(data);
      setIsLoading(false);
    } else {
      console.error("Failed to fetch prices");
      toast.error("Failed to load prices.");
    }
  };

  const handleFormSubmit = async (data: CreatePriceInput) => {
    const url = isEditMode
      ? `${apiUrl}/pricings/update/${data.pricingIdentifier}`
      : `${apiUrl}/pricings/create/`;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(`Price ${isEditMode ? "updated" : "created"} successfully!`);
        setIsDrawerOpen(false);
        fetchPricing(); // Refresh the pricing list
      } else {
        throw new Error("Failed to submit price data");
      }
    } catch (error) {
      console.error(`Error submitting price data: ${error}`);
      toast.error(`Failed to ${isEditMode ? "update" : "create"} price.`);
    }
  };

  const toggleDrawer = (price?: CreatePriceInput) => {
    setSelectedPrice(price);
    setIsEditMode(!!price);
    setIsDrawerOpen(true);
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={pricing}
            fileName="Pricing"
            header="ID, Price Identifier, Price, Resort Identifier"
          />
          <Button onClick={() => toggleDrawer()} className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Price
          </Button>
        </div>
      </PageHeader>
      {isLoading ? (
        <Loader variant="spinner" />
      ) : (
        <ProductsTable data={pricing} onEditToggle={toggleDrawer} />
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
              {isEditMode ? "Update" : "Create"} Price
            </h2>
            <PriceForm
              price={selectedPrice}
              onSubmit={handleFormSubmit}
              isEditMode={isEditMode}
            />
          </div>
        </Drawer>
      </FormProvider>
    </>
  );
}
