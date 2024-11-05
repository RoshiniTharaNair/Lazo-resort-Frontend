"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import toast from "react-hot-toast";
import CreateEditPrice from "@/app/shared/resort/price/create-edit";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type PriceData = {
  id: number;
  pricingIdentifier: number;
  price: number;
  resortIdentifier: number;
};

type Props = {
  params: { slug: string };
};

const metadata: Metadata = {
  title: "Room Types | Lazo Resort Admin",
};

const pageHeader = {
  title: "Edit Price",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo resort admin",
    },
    {
      href: routes.resort.createpricing,
      name: "Pricing",
    },
    {
      name: "Edit",
    },
  ],
};

export default function EditPricePage({
  params,
}: {
  params: { slug: string };
}) {
  const [price, setPrice] = useState<PriceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/pricings/update/${params.slug}`
        );
        if (response.ok) {
          const data = await response.json();
          setPrice(data);
          toast.success(`Price ${params.slug} got updated successfully`);
        } else {
          console.error("Failed to fetch price data");
          toast.error(`Failed to update price ${params.slug}`);
        }
      } catch (error) {
        console.error("Failed to fetch price data", error);
        toast.error(`Failed to delete price ${params.slug}`);
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
          href={routes.resort.createpricing}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Price
          </Button>
        </Link>
      </PageHeader>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CreateEditPrice slug={params.slug} price={price ?? undefined} />
      )}
    </>
  );
}
