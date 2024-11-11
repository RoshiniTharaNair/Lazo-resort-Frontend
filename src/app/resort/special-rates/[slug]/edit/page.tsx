"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import toast from "react-hot-toast";
import CreateEditVoidDate from "@/app/shared/resort/special-rates/create-edit"; // Updated import
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type VoidDateData = {
  voiddateIdentifier: number;
  resortIdentifier: number;
  voidDate: string;
  voidMultiplier: number;
};

type Props = {
  params: { slug: string };
};

const metadata: Metadata = {
  title: "Special Rates | Lazo Resort Admin",
};

const pageHeader = {
  title: "Edit Void Date",
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
      name: "Edit",
    },
  ],
};

export default function EditVoidDatePage({
  params,
}: {
  params: { slug: string };
}) {
  const [voidDate, setVoidDate] = useState<VoidDateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/voidDate/update/${params.slug}`
        );
        if (response.ok) {
          const data = await response.json();
          setVoidDate(data);
          toast.success(`Void Date ${params.slug} got updated successfully`);
        } else {
          console.error("Failed to fetch void date data");
          toast.error(`Failed to update void date ${params.slug}`);
        }
      } catch (error) {
        console.error("Failed to fetch void date data", error);
        toast.error(`Failed to fetch void date ${params.slug}`);
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
          href={routes.resort.voidDate}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Void Date
          </Button>
        </Link>
      </PageHeader>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CreateEditVoidDate slug={params.slug} voidDate={voidDate ?? undefined} />
      )}
    </>
  );
}
