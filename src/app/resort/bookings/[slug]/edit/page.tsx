"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import toast from "react-hot-toast";
import CreateEditBookings from "@/app/shared/resort/bookings/create-edit";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type IdentifierType = number | { label: string; value: number };

interface BookingData {
  bookingIdentifier: number;
  resortIdentifier: IdentifierType;
  recDate: Date;
  empCode: string;
  customerIdentifier: IdentifierType;
  vendorIdentifier: IdentifierType;
  transactionReference: string;
  paymentMode: string;
  base: number;
  gst: number;
  comments: string;
  checkInDate: Date;
  checkOutDate: Date;
  primaryContact: string;
  primaryEmail: string;
  specialRequest: string;
}

// Default values for creating new bookings or handling uninitialized states
const defaultBookingData: BookingData = {
  bookingIdentifier: 0,
  resortIdentifier: { label: 'Default Resort', value: 0 }, // Default or fetched value
  recDate: new Date(),
  empCode: 'defaultCode',
  customerIdentifier: 0,
  vendorIdentifier: { label: 'Default Vendor', value: 0 },
  transactionReference: '',
  paymentMode: '',
  base: 0,
  gst: 0,
  comments: '',
  checkInDate: new Date(),
  checkOutDate: new Date(),
  primaryContact: '',
  primaryEmail: '',
  specialRequest: '',
};
type Props = {
  params: { slug: string };
};

const metadata: Metadata = {
  title: "Booking | Lazo Resort Admin",
};

const pageHeader = {
  title: "Edit Booking",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo resort admin",
    },
    {
      href: routes.resort.createBooking,
      name: "Booking",
    },
    {
      name: "Edit",
    },
  ],
};

export default function EditBookingPage({
  params,
}: {
  params: { slug: string };
}) {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/bookings/update/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setBooking({
            ...defaultBookingData,
            ...data,
          });
        } else {
          console.error("Failed to fetch booking data");
        }
      } catch (error) {
        console.error("Failed to fetch booking data", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [params.slug]);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.resort.createBooking}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Booking
          </Button>
        </Link>
      </PageHeader>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CreateEditBookings slug={params.slug} booking={booking ?? defaultBookingData} />
      )}
    </>
  );
}
