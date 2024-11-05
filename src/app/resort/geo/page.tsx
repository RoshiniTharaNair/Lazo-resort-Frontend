"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button, Drawer } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import ExportButton from "@/app/shared/export-button";
import toast, { Toaster } from 'react-hot-toast';
import GeoTable from "@/app/shared/resort/geo/product-list/table";
import { defaultValues } from "@/app/shared/resort/geo/create-edit/form-utils";
import { useForm, FormProvider } from "react-hook-form";
import { GeoForm } from "@/app/shared/resort/geo/create-edit/geo-form";
import { CreateGeoLocationInput } from "@/utils/validators/create-geo.schema";
import { GeoLocationData } from "@/data/geo";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import { Loader } from "rizzui";

const metadata: Metadata = {
  title: "Geo | Lazo Resort Admin",
};

const pageHeader = {
  title: "Geo",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.vendor,
      name: "Geo",
    },
    {
      name: "List",
    },
  ],
};

export default function GeoPage() {
  const [selectedGeo, setSelectedGeo] = useState<
    CreateGeoLocationInput | undefined
  >(undefined);
  // const [geo, setGeo] = useState([]);
  const [geo, setGeo] = useState(GeoLocationData);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode
  const methods = useForm({
    defaultValues: defaultValues(),
  });

  const toggleDrawer = (vendor?: CreateGeoLocationInput) => {
    setSelectedGeo(vendor);
    setIsEditMode(!!vendor); // Set edit mode if vendor is provided
    setIsDrawerOpen(true);
  };

  const handleFormSubmit = async (data: CreateGeoLocationInput) => {
    try {
      console.log("Handle Form Submit");
      console.log(data);

      const url = isEditMode
        ? `${apiUrl}/geos/update/${data.geoLocationIdentifier}`
        : `${apiUrl}/geos/create`;

      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      console.log(`Geo ${isEditMode ? "updated" : "created"} successfully`);
      setIsDrawerOpen(false);
      toast.success(`Geolocation ${isEditMode ? "updated" : "created"} successfully!`);
      fetchGeoRefresh(); // Refresh the pricing list
      // Optionally, refresh your Geo list here
    } catch (error) {
      console.error(
        `Failed to ${isEditMode ? "update" : "create"} Geo:`,
        error
      );
    }
  };

  // Fetch Inventory data from API
  useEffect(() => {
    const fetchGeos = async () => {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/geos/view`);
      if (response.ok) {
        const data = await response.json();
        setGeo(data);
        setIsLoading(false);
        console.log(data);
      } else {
        // Handle response error
        console.error("Failed to fetch Geo");
      }
    };

    fetchGeos();
  }, []);

  useEffect(() => {
    fetchGeoRefresh();
  }, []);

  const fetchGeoRefresh = async () => {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/geos/view`);
    if (response.ok) {
      const data = await response.json();
      setGeo(data);
      setIsLoading(false);
    } else {
      console.error("Failed to fetch Geo");
      toast.error("Failed to load Geo.");
    }
  };
 
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton data={geo} fileName="Geo" header="geoLocationIdentifier, country,pincode, state, city, district, town " />
          <Button onClick={() => toggleDrawer()} className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Geo
          </Button>
        </div>
      </PageHeader>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader variant="spinner" />
        </div>
      ) : (
        <GeoTable data={geo} onEditToggle={toggleDrawer}/>
      )}
      {/* <GeoTable data={geo} onEditToggle={toggleDrawer} /> */}
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
              {isEditMode ? "Update" : "Create"} Geo
            </h2>
            <GeoForm
              vendor={selectedGeo}
              onSubmit={handleFormSubmit}
              isEditMode={!!selectedGeo}
            />
          </div>
        </Drawer>
      </FormProvider>
    </>
  );
}
