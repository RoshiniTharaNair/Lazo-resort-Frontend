"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button, Drawer } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import ExportButton from "@/app/shared/export-button";
import CouponsTable from "@/app/shared/resort/coupons/product-list/table";
import { defaultValues } from "@/app/shared/resort/coupons/create-edit/form-utils";
import { useForm, FormProvider } from "react-hook-form";
import { CouponForm } from "@/app/shared/resort/coupons/create-edit/coupon-form";
import { CreateCouponInput } from "@/utils/validators/create-coupon.schema";
import { Loader } from "rizzui";
import toast from "react-hot-toast";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const metadata: Metadata = {
  title: "Coupons | Lazo Resort Admin",
};

const pageHeader = {
  title: "Coupons",
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
      name: "List",
    },
  ],
};

export default function CouponPage() {
  const [selectedCoupon, setSelectedCoupon] = useState<
    CreateCouponInput | undefined
  >(undefined);
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const methods = useForm({
    defaultValues: defaultValues(),
  });

  const toggleDrawer = (coupon?: CreateCouponInput) => {
    setIsEditMode(!!coupon);
    setSelectedCoupon(coupon);
    setIsDrawerOpen(true);
  };

  const handleFormSubmit = async (data: CreateCouponInput) => {
    console.log("Form Data Submitted:", data); // Debugging log
    try {
        const url = isEditMode
            ? `${apiUrl}/coupon/update/${data.couponIdentifier}`
            : `${apiUrl}/coupon/create/`;
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
        fetchCoupons(); // Refresh the coupons list
        toast.success(`Coupon ${isEditMode ? "updated" : "created"} successfully!`);
    } catch (error) {
        console.error("Failed to update coupon:", error);
        toast.error(`Failed to ${isEditMode ? "update" : "create"} coupon.`);
    }
};

  const fetchCoupons = async () => {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/coupon/view`);
    if (response.ok) {
      const data = await response.json();
      setCoupons(data);
      setIsLoading(false);
    } else {
      console.error("Failed to fetch coupons");
      toast.error("Failed to load coupons.");
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={coupons}
            fileName="Coupons"
            header="couponString,discountValue,discountUnit,validity,minBookingValue,maxDiscountValue"
          />
          <Button onClick={() => toggleDrawer()} className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Coupon
          </Button>
        </div>
      </PageHeader>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader variant="spinner" />
        </div>
      ) : (
        <CouponsTable data={coupons} onEditToggle={toggleDrawer} />
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
              {isEditMode ? "Update" : "Create"} Coupon
            </h2>
            <CouponForm
              coupon={selectedCoupon}
              onSubmit={handleFormSubmit}
              isEditMode={isEditMode}
            />
          </div>
        </Drawer>
      </FormProvider>
    </>
  );
}
