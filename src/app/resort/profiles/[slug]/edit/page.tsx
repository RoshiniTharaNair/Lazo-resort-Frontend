"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import toast from "react-hot-toast";
import CreateEditProfile from "@/app/shared/resort/profiles/create-edit";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type ProfileData = {
  firstname: string;
  lastname?: string;
  primarycontact: string;
  primaryemail: string;
  dob?: string; // ISO date string
  geoLocationIdentifier?: number | { value: number; label: string } | null;
  username: string;
  passcode: string;
};

// Default values for creating new profiles or handling uninitialized states
const defaultProfileData: ProfileData = {
  firstname: '',
  lastname: '',
  primarycontact: '',
  primaryemail: '',
  dob: '',
  geoLocationIdentifier: null,
  username: '',
  passcode: '',
};

type Props = {
  params: { slug: string };
};

const metadata: Metadata = {
  title: "Profile | Lazo Resort Admin",
};

const pageHeader = {
  title: "Edit Profile",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.profiles,
      name: "Profiles",
    },
    {
      name: "Edit",
    },
  ],
};

export default function EditProfilePage({ params }: { params: { slug: string } }) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/customers/view/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setProfile({
            ...defaultProfileData,
            ...data,
          });
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Failed to fetch profile data", error);
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
          href={routes.resort.createProfiles}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Profile
          </Button>
        </Link>
      </PageHeader>

      {/* {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CreateEditProfile slug={params.slug} profile={profile ?? defaultProfileData} />
      )} */}
    </>
  );
}
