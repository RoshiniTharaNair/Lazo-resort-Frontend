"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import toast from "react-hot-toast";
import CreateEditCoupon from "@/app/shared/resort/coupons/create-edit";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type CouponData = {
  couponString: string;
  discountValue: number;
  discountUnit: string;
  validity: string; // ISO date string
  minBookingValue: number;
  maxDiscountValue: number;
};

// Default values for creating new coupons or handling uninitialized states
const defaultCouponData: CouponData = {
  couponString: '',
  discountValue: 0,
  discountUnit: 'percentage',
  validity: '',
  minBookingValue: 0,
  maxDiscountValue: 0,
};

type Props = {
  params: { slug: string };
};

const metadata: Metadata = {
  title: "Coupon | Lazo Resort Admin",
};

const pageHeader = {
  title: "Edit Coupon",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.coupons,
      name: "Coupons",
    },
    {
      name: "Edit",
    },
  ],
};

export default function EditCouponPage({
  params,
}: {
  params: { slug: string };
}) {
  const [coupon, setCoupon] = useState<CouponData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/coupon/update/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setCoupon({
            ...defaultCouponData,
            ...data,
          });
        } else {
          console.error("Failed to fetch coupon data");
        }
      } catch (error) {
        console.error("Failed to fetch coupon data", error);
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
          href={routes.resort.createCoupons}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Coupon
          </Button>
        </Link>
      </PageHeader>

      {/* {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CreateEditCoupon slug={params.slug} coupon={coupon ?? defaultCouponData} />
      )} */}
    </>
  );
}
