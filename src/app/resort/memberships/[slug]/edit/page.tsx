"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import toast from "react-hot-toast";
import CreateEditMembership from "@/app/shared/resort/memberships/create-edit";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type MembershipData = {
  membershipIdentifier: number;
  customerIdentifier: number;
  resortIdentifier: number;
  resortAny: number;
  purchaseDate: string; // ISO date string
  purchaseMode: string;
  purchasePoints: number;
  flatDiscount: number;
  cost: number;
  validityStart: string; // ISO date string
  validityEnd: string; // ISO date string
  status: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

// Default values for creating new memberships or handling uninitialized states
const defaultMembershipData: MembershipData = {
  membershipIdentifier: 0,
  customerIdentifier: 0,
  resortIdentifier: 0,
  resortAny: 0,
  purchaseDate: '',
  purchaseMode: 'Online',
  purchasePoints: 0,
  flatDiscount: 0,
  cost: 0,
  validityStart: '',
  validityEnd: '',
  status: 'ACTIVE',
  createdAt: '',
  updatedAt: '',
};

type Props = {
  params: { slug: string };
};

const metadata: Metadata = {
  title: "Membership | Lazo Resort Admin",
};

const pageHeader = {
  title: "Edit Membership",
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
      name: "Edit",
    },
  ],
};

export default function EditMembershipPage({
  params,
}: {
  params: { slug: string };
}) {
  const [membership, setMembership] = useState<MembershipData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/membership/update/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setMembership({
            ...defaultMembershipData,
            ...data,
          });
        } else {
          console.error("Failed to fetch membership data");
        }
      } catch (error) {
        console.error("Failed to fetch membership data", error);
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
          href={routes.resort.createMemberships}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Membership
          </Button>
        </Link>
      </PageHeader>

      {/* {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CreateEditMembership slug={params.slug} membership={membership ?? defaultMembershipData} />
      )} */}
    </>
  );
}
