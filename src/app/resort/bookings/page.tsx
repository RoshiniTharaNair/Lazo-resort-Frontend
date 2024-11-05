"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button, Drawer } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import ExportButton from "@/app/shared/export-button";
import BookingsTable from "@/app/shared/resort/bookings/product-list/table";
import { defaultValues } from "@/app/shared/resort/bookings/create-edit/form-utils";
import { useForm, FormProvider } from "react-hook-form";
import { BookingForm } from "@/app/shared/resort/bookings/create-edit/booking-form";
import { CreateBookingInput } from "@/utils/validators/create-booking.schema";
import { Loader } from "rizzui";
import toast from "react-hot-toast";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const metadata: Metadata = {
  title: "Bookings | Lazo Resort Admin",
};

const pageHeader = {
  title: "Bookings",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.booking,
      name: "Bookings",
    },
    {
      name: "List",
    },
  ],
};

export default function BookingPage() {
  const [selectedBooking, setSelectedBooking] = useState<
    CreateBookingInput | undefined
  >(undefined);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const methods = useForm({
    defaultValues: defaultValues(),
  });

  const toggleDrawer = (booking?: CreateBookingInput) => {
    setIsEditMode(!!booking);
    setSelectedBooking(booking);
    setIsDrawerOpen(true);
  };

  const handleFormSubmit = async (data: CreateBookingInput) => {
    try {
      console.log("Handle Form Submit");
      console.log(data);
      // Set status to 'CONFIRMED' before sending the request
      data.status = "CONFIRMED";
      data.membershipIdentifier = 1; // Set membership_identifier to 1
      const url = isEditMode
        ? `${apiUrl}/bookings/update/${data.bookingIdentifier}`
        : `${apiUrl}/bookings/create/`;
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      console.log("Booking updated successfully");
      setIsDrawerOpen(false);
      fetchBooking(); // Refresh the bookings list
      toast.success(`Booking ${isEditMode ? "updated" : "created"} successfully!`);
    } catch (error) {
      console.error("Failed to update booking:", error);
      toast.error(`Failed to ${isEditMode ? "update" : "create"} booking.`);
    }
  };

  const fetchBooking = async () => {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/bookings/view`);
    if (response.ok) {
      const data = await response.json();
      setBookings(data);
      setIsLoading(false);
    } else {
      console.error("Failed to fetch bookings");
      toast.error("Failed to load bookings.");
    }
  };

  // Fetch Booking data from API
  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={bookings}
            fileName="Bookings"
            header="id,bookingIdentifier,bookingDate,checkInDate,checkOutDate,description,vendorIdentifier,vendorBookingId,transactionId,paymentMode,base,gst,comments,createdAt,updatedAt"
          />
          <Button onClick={() => toggleDrawer()} className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Booking
          </Button>
        </div>
      </PageHeader>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader variant="spinner" />
        </div>
      ) : (
        <BookingsTable data={bookings} onEditToggle={toggleDrawer} />
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
              {isEditMode ? "Update" : "Create"} Booking
            </h2>
            <BookingForm
              booking={selectedBooking}
              onSubmit={handleFormSubmit}
              isEditMode={isEditMode}
            />
          </div>
        </Drawer>
      </FormProvider>
    </>
  );
}
