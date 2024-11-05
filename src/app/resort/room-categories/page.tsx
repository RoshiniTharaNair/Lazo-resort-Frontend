"use client";

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button, Drawer } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import ResortRoomTypesTable from "@/app/shared/resort/product/product-list/table";
import ExportButton from "@/app/shared/export-button";
import { Loader } from "rizzui";
import toast from "react-hot-toast";
import { RoomCategoryForm } from "@/app/shared/resort/product/create-edit/roomcategory-form";
import { CreateProductInput } from "@/utils/validators/create-product.schema";
import { ResortRoomType } from "@/data/resort-room-types";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const metadata: Metadata = {
  title: "Resort Room Types | Lazo Resort Admin",
};

const pageHeader = {
  title: "Resort Room Types",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.roomCategories,
      name: "Resort Room Types",
    },
    {
      name: "List",
    },
  ],
};

export default function ResortRoomTypesPage() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState<CreateProductInput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const methods = useForm<CreateProductInput>({
    defaultValues: selectedRoomType,
  });

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = async () => {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/ResortRoomType/view`);
    if (response.ok) {
      const data = await response.json();
      setRoomTypes(data);
      setIsLoading(false);
    } else {
      console.error("Failed to fetch room types");
    }
  };

  const handleFormSubmit = async (data: CreateProductInput) => {
    const url = isEditMode
      ? `${apiUrl}/ResortRoomType/update/${data.recIdentifier}`
      : `${apiUrl}/ResortRoomType/create/`;
    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(`Room Type ${isEditMode ? "updated" : "created"} successfully!`);
        setIsDrawerOpen(false);
        fetchRoomTypes(); // Refresh the room types list
      } else {
        throw new Error("Failed to submit room type data");
      }
    } catch (error) {
      console.error(`Error submitting room type data: ${error}`);
      toast.error(`Failed to ${isEditMode ? "update" : "create"} room type.`);
    }
  };

  const toggleDrawer = (roomType?: ResortRoomType) => {
    console.log("Editing row:", roomType);
    setSelectedRoomType(roomType);
    setIsEditMode(!!roomType);
    setIsDrawerOpen(true);
  };
  

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={roomTypes}
            fileName="Resort Room Types"
            header="ID, Room Type, Maximum Occupancy"
          />
          <Button onClick={() => toggleDrawer()} className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Room Type
          </Button>
        </div>
      </PageHeader>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader variant="spinner" />
        </div>
      ) : (
        <ResortRoomTypesTable data={roomTypes} onEditToggle={toggleDrawer} />
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
              {isEditMode ? "Update" : "Create"} Room Type
            </h2>
            <RoomCategoryForm
              room={selectedRoomType}
              onSubmit={handleFormSubmit}
              isEditMode={isEditMode}
            />
          </div>
        </Drawer>
      </FormProvider>
    </>
  );
}
