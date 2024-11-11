"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import toast from "react-hot-toast";
import CreateEditGuest from "@/app/shared/resort/guests/create-edit";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type GuestData = {
  bookingIdentifier: number;
  firstName: string;
  lastName: string;
  primaryGuest: boolean;
  age: number;
  ageGroup: number;
  idType: string;
  idValue: string;
  idImage: string;
  comments: string;
};

// Default values for creating new guests or handling uninitialized states
const defaultGuestData: GuestData = {
  bookingIdentifier: 0,
  firstName: "",
  lastName: "",
  primaryGuest: false,
  age: 0,
  ageGroup: 0,
  idType: "",
  idValue: "",
  idImage: "",
  comments: "",
};

type Props = {
  params: { slug: string };
};

const metadata: Metadata = {
  title: "Guest | Lazo Resort Admin",
};

const pageHeader = {
  title: "Edit Guest",
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
      name: "Edit",
    },
  ],
};

export default function EditGuestPage({
  params,
}: {
  params: { slug: string };
}) {
  const [guest, setGuest] = useState<GuestData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/guests/view/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setGuest({
            ...defaultGuestData,
            ...data,
          });
        } else {
          console.error("Failed to fetch guest data");
        }
      } catch (error) {
        console.error("Failed to fetch guest data", error);
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
          href={routes.resort.createGuests}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          {/* <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Guest
          </Button> */}
        </Link>
      </PageHeader>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CreateEditGuest slug={params.slug} guest={guest ?? defaultGuestData} />
      )}
    </>
  );
}
