"use client";

import { useEffect, useState } from "react";
import { Metadata } from "next";
import { useForm, FormProvider } from "react-hook-form";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button, Drawer } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import ExportButton from "@/app/shared/export-button";
import { InventoriesTable } from "@/app/shared/resort/inventory/product-list/table";
import { InventoryForm } from "@/app/shared/resort/inventory/create-edit/inventory-form";
import { CreateInventoryInput } from "@/utils/validators/create-inventory.schema";
import { Loader } from "rizzui";
import toast from "react-hot-toast";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const metadata: Metadata = {
  title: "Inventories | Lazo Resort Admin",
};

const pageHeader = {
  title: "Inventories",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.inventories,
      name: "Inventories",
    },
    {
      name: "List",
    },
  ],
};

export default function InventoriesPage() {
  const [inventories, setInventories] = useState<CreateInventoryInput[]>([]);
  const [selectedInventory, setSelectedInventory] = useState<
    CreateInventoryInput | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const methods = useForm<CreateInventoryInput>({
    defaultValues: selectedInventory,
  });

  useEffect(() => {
    const fetchInventories = async () => {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/inventories/view`);
      if (response.ok) {
        const data = await response.json();
        setInventories(data);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch Inventories");
      }
    };
    fetchInventories();
  }, []);

  const toggleDrawer = (inventory?: CreateInventoryInput) => {
    setSelectedInventory(inventory ?? {
      resortIdentifier: 0,
      effectiveDate: "",
      roomClass: 0,
      avlCount: 0,
      basePrice: 0,
      gst: "",
      maxOcc: 0,
      basePoints: 0,
    });
    setIsEditMode(!!inventory);
    setIsDrawerOpen(true);
  };

  const handleFormSubmit = async (data: CreateInventoryInput) => {
    console.log("Handle Form Submit", data);
    const url = isEditMode
      ? `${apiUrl}/inventories/update/${data.inventoryIdentifier}`
      : `${apiUrl}/inventories/create/`;
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(`${isEditMode ? 'Updated' : 'Created'} Inventory:`, responseData);
        toast.success(`Inventory ${isEditMode ? 'updated' : 'created'} successfully!`);
        setIsDrawerOpen(false);
        fetchInventories(); // Refresh the inventories list
      } else {
        throw new Error('Failed to submit inventory data');
      }
    } catch (error) {
      console.error(`Error submitting inventory data: ${error}`);
      toast.error(`Failed to ${isEditMode ? 'update' : 'create'} inventory.`);
    }
  };

  const fetchInventories = async () => {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/inventories/view`);
    if (response.ok) {
      const data = await response.json();
      setInventories(data);
      setIsLoading(false);
    } else {
      console.error("Failed to fetch Inventories");
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={inventories}
            fileName="Inventory"
            header="inventoryIdentifier,resortIdentifier,effectiveDate,roomClass,avlCount,maxOcc,basePrice,basePoints,gst,discount"
          />
          <Button onClick={() => toggleDrawer()} className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Inventory
          </Button>
        </div>
      </PageHeader>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader variant="spinner" />
        </div>
      ) : (
        <InventoriesTable data={inventories} onEditToggle={toggleDrawer} />
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
              {isEditMode ? "Update" : "Create"} Inventory
            </h2>
            <InventoryForm
              inventory={selectedInventory}
              onSubmit={handleFormSubmit}
              isEditMode={isEditMode}
            />
          </div>
        </Drawer>
      </FormProvider>
    </>
  );
}
