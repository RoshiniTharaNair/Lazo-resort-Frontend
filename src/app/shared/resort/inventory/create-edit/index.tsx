"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Element } from "react-scroll";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Text } from "rizzui";
import cn from "@/utils/class-names";
import FormNav, {
  formParts,
} from "@/app/shared/resort/product/create-edit/form-nav";
import FormFooter from "@/components/form-footer";
import { CreateInventoryInput, inventoryFormSchema } from "@/utils/validators/create-inventory.schema";
import { inventoryData } from "./form-utils";
import InventorySummary from "./product-summary";
import { LAYOUT_OPTIONS } from "@/config/enums";
import { useLayout } from "@/hooks/use-layout";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: InventorySummary,
};

interface IndexProps {
  slug?: string;
  className?: string;
  inventory?: CreateInventoryInput;
}

export default function CreateEditInventory({
  slug,
  inventory,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);

  const defaultValues = (inventory?: CreateInventoryInput): CreateInventoryInput => {
    if (!inventory)
      return {
        "inventoryIdentifier": 1,
        "resortIdentifier": 10,
        "effectiveDate": "2024-04-30",  // Set as a string in YYYY-MM-DD format
        "roomClass": 1,  // Ensure roomClass is a number, matching an ID or key for the room type
        "avlCount": 15,
        "maxOcc": 1,
        "basePrice": 100.00,
        "basePoints": 100.00,
        "gst": "12%",
        "discount": "10%"
      };

    return {
      ...inventory,
      effectiveDate: inventory.effectiveDate.slice(0, 10),  // Ensure effectiveDate is a string in YYYY-MM-DD format
      roomClass: Number(inventory.roomClass), // Ensure roomClass is a number
    };
  };

  const methods = useForm<CreateInventoryInput>({
    resolver: zodResolver(inventoryFormSchema),
    defaultValues: defaultValues(inventory),
  });

  const onSubmit: SubmitHandler<CreateInventoryInput> = async (data) => {
    setLoading(true);
    try {
      console.log(JSON.stringify(data));
      console.log(slug);
      const url = slug
        ? `${apiUrl}/inventories/update/${slug}` // Update inventory
        : `${apiUrl}/inventories/create`; // Create inventory
      console.log(url);

      const method = slug ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(
          <Text as="b">Inventory successfully {slug ? "updated" : "created"}</Text>
        );
        methods.reset();
        if (method === 'PUT') window.location.reload(); // Reload the page
      } else {
        toast.error("Failed to create/update inventory");
      }
    } catch (error) {
      console.error("API request failed", error);
      toast.error("Failed to create/update inventory");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="@container">
      <FormNav
        className={cn(
          layout === LAYOUT_OPTIONS.BERYLLIUM && "z-[999] 2xl:top-[72px]"
        )}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            "relative z-[19] [&_label.block>span]:font-medium",
            className
          )}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {<Component className="pt-7 @2xl:pt9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? "Update Inventory" : "Create Inventory"}
          />
        </form>
      </FormProvider>
    </div>
  );
}
