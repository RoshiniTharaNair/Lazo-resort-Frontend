"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button, Drawer } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import ExportButton from "@/app/shared/export-button";
import GuestsTable from "@/app/shared/resort/guests/product-list/table";
import { defaultValues } from "@/app/shared/resort/guests/create-edit/form-utils";
import { useForm, FormProvider } from "react-hook-form";
import { GuestForm } from "@/app/shared/resort/guests/create-edit/guest-form";
import { CreateGuestInput } from "@/utils/validators/create-guest.schema";
import { Loader } from "rizzui";
import toast from "react-hot-toast";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const metadata: Metadata = {
  title: "Guests | Lazo Resort Admin",
};

const pageHeader = {
  title: "Guests",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.guests,
      name: "Guests",
    },
    {
      name: "List",
    },
  ],
};

export default function GuestsPage() {
  const [selectedGuest, setSelectedGuest] = useState<
    CreateGuestInput | undefined
  >(undefined);
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const methods = useForm({
    defaultValues: defaultValues(),
  });

  const toggleDrawer = (guest?: CreateGuestInput) => {
    setIsEditMode(!!guest);
    setSelectedGuest(guest);
    setIsDrawerOpen(true);
  };

  const handleFormSubmit = async (data: CreateGuestInput) => {
    console.log("Form Data Submitted:", data); // Debugging log
    try {
      const url = isEditMode
        ? `${apiUrl}/guests/update/${data.bookingIdentifier}`
        : `${apiUrl}/guests/create/`;
      const method = isEditMode ? "PUT" : "POST";

      console.log(`API URL: ${url}, Method: ${method}`); // Debugging log

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error Response:", errorMessage); // Log the error response
        throw new Error("Network response was not ok");
      }

      setIsDrawerOpen(false);
      fetchGuests(); // Refresh the guests list
      toast.success(
        `Guest ${isEditMode ? "updated" : "created"} successfully!`
      );
    } catch (error) {
      console.error("Failed to update guest:", error);
      toast.error(`Failed to ${isEditMode ? "update" : "create"} guest.`);
    }
  };

  const fetchGuests = async () => {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/guests/view`);
    if (response.ok) {
      const data = await response.json();
      setGuests(data);
      setIsLoading(false);
    } else {
      console.error("Failed to fetch guests");
      toast.error("Failed to load guests.");
    }
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={guests}
            fileName="Guests"
            header="bookingIdentifier,firstName,lastName,primaryGuest,age,ageGroup,idType,idValue,idImage,comments"
          />
          {/* <Button onClick={() => toggleDrawer()} className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Guest
          </Button> */}
        </div>
      </PageHeader>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader variant="spinner" />
        </div>
      ) : (
        <GuestsTable data={guests} onEditToggle={toggleDrawer} />
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
              {isEditMode ? "Update" : "Create"} Guest
            </h2>
            <GuestForm
              guest={selectedGuest}
              onSubmit={handleFormSubmit}
              isEditMode={isEditMode}
            />
          </div>
        </Drawer>
      </FormProvider>
    </>
  );
}
