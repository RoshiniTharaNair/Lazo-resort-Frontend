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
import { useLayout } from "@/hooks/use-layout";
import { LAYOUT_OPTIONS } from "@/config/enums";
// import BookingSummary from "@/app/shared/resort/bookings/create-edit/product-summary";
import VendorSummary from "@/app/shared/resort/vendor/create-edit/product-summary";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
// import {
//   CreateBookingInput,
//   bookingFormSchema,
// } from "@/utils/validators/create-booking.schema";
import {
  CreateVendorInput,
  vendorFormSchema,
} from "@/utils/validators/create-vendor.schema";
import { VendorData } from "./form-utils";

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: VendorSummary,
};

interface IndexProps {
  slug?: string;
  className?: string;
  vendor?: CreateVendorInput;
}

export default function CreateEditVendors({
  slug,
  vendor,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const defaultValues = (vendor?: CreateVendorInput): CreateVendorInput => {
    if (!vendor)
      return {
        label: "",
        dash_url: "",
      };

    return {
      ...vendor,
    };
  };
  const methods = useForm<CreateVendorInput>({
    // resolver: zodResolver(vendorFormSchema),
    defaultValues: defaultValues(vendor),
  });

  const onSubmit: SubmitHandler<CreateVendorInput> = async (data) => {
    setLoading(true);
    try {
      console.log(JSON.stringify(data));
      console.log(slug);
      const url = slug
        ? `${apiUrl}/vendors/update/${slug}` // Update Vendor
        : `${apiUrl}/vendors/create/`; // Create Vendor
      console.log(url);

      const method = slug ? "PUT" : "POST";
      console.log(JSON.stringify(data));

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(
          <Text as="b">
            Vendor added successfully {slug ? "updated" : "created"}
          </Text>
        );
        methods.reset();
        if (method === "PUT") window.location.reload(); // Reload the page
      } else {
        toast.error("Failed to create/update Vendor");
      }
    } catch (error) {
      console.error("API request failed", error);
      toast.error("Failed to create/update Vendor");
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
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? "Update Vendor" : "Create Vendor"}
          />
        </form>
      </FormProvider>
    </div>
  );
}
