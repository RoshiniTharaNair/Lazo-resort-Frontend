"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button, Drawer } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import ExportButton from "@/app/shared/export-button";
import ProfilesTable from "@/app/shared/resort/profiles/product-list/table";
import { defaultValues } from "@/app/shared/resort/profiles/create-edit/form-utils";
import { useForm, FormProvider } from "react-hook-form";
import { ProfileForm } from "@/app/shared/resort/profiles/create-edit/profile-form";
import { CreateProfileInput } from "@/utils/validators/create-profile.schema";
import { Loader } from "rizzui";
import toast from "react-hot-toast";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const metadata: Metadata = {
  title: "Profiles | Lazo Resort Admin",
};

const pageHeader = {
  title: "Profiles",
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
      name: "List",
    },
  ],
};

export default function ProfilePage() {
  const [selectedProfile, setSelectedProfile] = useState<CreateProfileInput | undefined>(undefined);
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const methods = useForm({
    defaultValues: defaultValues(),
  });

  const toggleDrawer = (profile?: CreateProfileInput) => {
    setIsEditMode(!!profile);
    setSelectedProfile(profile);
    setIsDrawerOpen(true);
  };

  const handleFormSubmit = async (data: CreateProfileInput) => {
    console.log("Form Data Submitted:", data); // Debugging log
    try {
        const url = isEditMode
            ? `${apiUrl}/customers/update/${data.customerIdentifier}`
            : `${apiUrl}/customers/create/`;
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
        fetchProfiles(); // Refresh the profiles list
        toast.success(`Profile ${isEditMode ? "updated" : "created"} successfully!`);
    } catch (error) {
        console.error("Failed to update profile:", error);
        toast.error(`Failed to ${isEditMode ? "update" : "create"} profile.`);
    }
};

  const fetchProfiles = async () => {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/customers/view`);
    if (response.ok) {
      const data = await response.json();
      setProfiles(data);
      setIsLoading(false);
    } else {
      console.error("Failed to fetch profiles");
      toast.error("Failed to load profiles.");
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={profiles}
            fileName="Profiles"
            header="firstname,lastname,primarycontact,primaryemail,dob,geoLocationIdentifier,username,passcode"
          />
          <Button onClick={() => toggleDrawer()} className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Profile
          </Button>
        </div>
      </PageHeader>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader variant="spinner" />
        </div>
      ) : (
        <ProfilesTable data={profiles} onEditToggle={toggleDrawer} />
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
              {isEditMode ? "Update" : "Create"} Profile
            </h2>
            <ProfileForm
              profile={selectedProfile}
              onSubmit={handleFormSubmit}
              isEditMode={isEditMode}
            />
          </div>
        </Drawer>
      </FormProvider>
    </>
  );
}
