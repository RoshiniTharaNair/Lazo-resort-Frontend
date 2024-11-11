"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button, Drawer } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import ExportButton from "@/app/shared/export-button";
import MembershipsTable from "@/app/shared/resort/memberships/product-list/table";
import { defaultValues } from "@/app/shared/resort/memberships/create-edit/form-utils";
import { useForm, FormProvider } from "react-hook-form";
import { MembershipForm } from "@/app/shared/resort/memberships/create-edit/membership-form";
import { CreateMembershipInput } from "@/utils/validators/create-membership.schema";
import { Loader } from "rizzui";
import toast from "react-hot-toast";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const metadata: Metadata = {
  title: "Memberships | Lazo Resort Admin",
};

const pageHeader = {
  title: "Memberships",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.memberships,
      name: "Memberships",
    },
    {
      name: "List",
    },
  ],
};

export default function MembershipPage() {
  const [selectedMembership, setSelectedMembership] = useState<
    CreateMembershipInput | undefined
  >(undefined);
  const [memberships, setMemberships] = useState([]);
  const [customerMap, setCustomerMap] = useState<Record<number, string>>({});
  const [resortMap, setResortMap] = useState<Record<number, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const methods = useForm({
    defaultValues: defaultValues(),
  });

  const toggleDrawer = (membership?: CreateMembershipInput) => {
    setIsEditMode(!!membership);
    setSelectedMembership(membership);
    setIsDrawerOpen(true);
  };

  const handleFormSubmit = async (data: CreateMembershipInput) => {
    console.log("Form Data Submitted:", data);
    try {
      const url = isEditMode
        ? `${apiUrl}/membership/update/${data.membershipIdentifier}`
        : `${apiUrl}/membership/create/`;
      const method = isEditMode ? "PUT" : "POST";

      console.log(`API URL: ${url}, Method: ${method}`);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error Response:", errorMessage);
        throw new Error("Network response was not ok");
      }

      setIsDrawerOpen(false);
      fetchMemberships(); // Refresh the memberships list
      toast.success(
        `Membership ${isEditMode ? "updated" : "created"} successfully!`
      );
    } catch (error) {
      console.error("Failed to update membership:", error);
      toast.error(`Failed to ${isEditMode ? "update" : "create"} membership.`);
    }
  };

  const fetchMemberships = async () => {
    setIsLoading(true);
    try {
      const [membershipsResponse, customersResponse, resortsResponse] =
        await Promise.all([
          fetch(`${apiUrl}/membership/view`),
          fetch(`${apiUrl}/customers/view`),
          fetch(`${apiUrl}/resorts/view`),
        ]);

      if (
        membershipsResponse.ok &&
        customersResponse.ok &&
        resortsResponse.ok
      ) {
        const membershipsData = await membershipsResponse.json();
        const customersData = await customersResponse.json();
        const resortsData = await resortsResponse.json();

        const customerMap: Record<number, string> = {};
        customersData.forEach((customer: any) => {
          customerMap[customer.customerIdentifier] =
            `${customer.firstname} ${customer.lastname}`;
        });

        const resortMap: Record<number, string> = {};
        resortsData.forEach((resort: any) => {
          resortMap[resort.resortIdentifier] = resort.label;
        });

        setMemberships(membershipsData);
        setCustomerMap(customerMap);
        setResortMap(resortMap);
      } else {
        console.error("Failed to fetch memberships, customers, or resorts");
        toast.error("Failed to load data.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={memberships}
            fileName="Memberships"
            header="membershipIdentifier,customerIdentifier,resortIdentifier,resortAny,purchaseDate,purchaseMode,purchasePoints,flatDiscount,cost,validityStart,validityEnd,status"
          />
          <Button onClick={() => toggleDrawer()} className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Membership
          </Button>
        </div>
      </PageHeader>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader variant="spinner" />
        </div>
      ) : (
        <MembershipsTable
          data={memberships}
          onEditToggle={toggleDrawer}
          customerMap={customerMap}
          resortMap={resortMap}
        />
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
              {isEditMode ? "Update" : "Create"} Membership
            </h2>
            <MembershipForm
              membership={selectedMembership}
              onSubmit={handleFormSubmit}
              isEditMode={isEditMode}
              customerMap={customerMap}
              resortMap={resortMap}
            />
          </div>
        </Drawer>
      </FormProvider>
    </>
  );
}
