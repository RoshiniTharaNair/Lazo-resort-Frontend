"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import toast from "react-hot-toast";
import CreateEditVendors from "@/app/shared/resort/vendor/create-edit";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type VendorData = {
  label?: string;
  propertyKey?: string;
};

type Props = {
  params: { slug: string };
};

const metadata: Metadata = {
  title: "Vendor | Lazo Resort Admin",
};

const pageHeader = {
  title: "Edit Vendor",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo resort admin",
    },
    {
      href: routes.resort.createVendor,
      name: "Vendor",
    },
    {
      name: "Edit",
    },
  ],
};

export default function EditVendorPage({
  params,
}: {
  params: { slug: string };
}) {
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/vendors/update/${params.slug}`
        );
        if (response.ok) {
          const data = await response.json();
          setVendor(data);
          toast.success(`vendor ${params.slug} got updated successfully`);
        } else {
          console.error("Failed to fetch vendor data");
          toast.error(`Failed to update vendor ${params.slug}`);
        }
      } catch (error) {
        console.error("Failed to fetch vendor data", error);
        toast.error(`Failed to delete vendor ${params.slug}`);
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
          href={routes.resort.createVendor}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Vendor
          </Button>
        </Link>
      </PageHeader>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CreateEditVendors slug={params.slug} vendor={vendor ?? undefined} />
      )}
    </>
  );
}
