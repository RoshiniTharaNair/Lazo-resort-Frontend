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
import BookingSummary from "@/app/shared/resort/bookings/create-edit/product-summary";
import {
  CreateBookingInput,
  bookingFormSchema,
} from "@/utils/validators/create-booking.schema";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
import { BookingData } from "./form-utils";

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: BookingSummary,
};

interface IndexProps {
  slug?: string;
  className?: string;
  booking?: CreateBookingInput;
}

export default function CreateEditBookings({
  slug,
  booking,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const defaultValues = (booking?: CreateBookingInput): CreateBookingInput => {
    if (!booking) {
      return {
          bookingIdentifier: 0,
          resortIdentifier: { label: 'Default Resort', value: 0 }, // Assuming default selection needed
          recDate: new Date(),
          empCode: '', // Set to a default or derived from user session
          customerIdentifier: { label: 'Default Customer', value: 0 }, // Assuming default selection needed
          vendorIdentifier: { label: 'Default Vendor', value: 0 }, // Assuming default selection needed
          transactionReference: '',
          paymentMode: '',
          base: 0,
          gst: 0,
          comments: '',
          checkInDate: new Date("2023-01-02"),
          checkOutDate: new Date("2023-01-02"),
          primaryContact: '',
          primaryEmail: '',
          specialRequest: '',
      };
  }
    // Use the converted bookingIdentifier in the return statement
    return {
      ...booking,
    };
  };
  const methods = useForm<CreateBookingInput>({
    // resolver: zodResolver(bookingFormSchema),
    defaultValues: defaultValues(booking),
  });

  const onSubmit: SubmitHandler<CreateBookingInput> = async (data) => {
    setLoading(true);
    try {
      // Ensure that vendorIdentifier is always a number
      const vendorIdentifierValue = typeof data.vendorIdentifier === 'object' && data.vendorIdentifier ? data.vendorIdentifier.value : data.vendorIdentifier;
      const resortIdentifierValue = typeof data.resortIdentifier === 'object' && data.resortIdentifier ? data.resortIdentifier.value : data.resortIdentifier;
      const customerIdentifierValue = typeof data.customerIdentifier === 'object' && data.customerIdentifier ? data.customerIdentifier.value : data.customerIdentifier;

      const submitData = {
        ...data,
        vendorIdentifier: vendorIdentifierValue,  // ensure this is a number
        resortIdentifier: resortIdentifierValue,  // ensure this is a number
        customerIdentifier: customerIdentifierValue,  // ensure this is a number
        base: Number(data.base),  // Convert base to number if it is not already
        gst: Number(data.gst),    // Convert gst to number if it is not already
      };

      console.log(JSON.stringify(submitData));
      console.log(slug);
      const url = slug ? `${apiUrl}/bookings/update/${slug}` : `${apiUrl}/bookings/create`;  // Determine if updating or creating based on slug
      console.log(url);

      const method = slug ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        toast.success(`Booking ${slug ? "updated" : "created"} successfully!`);
        methods.reset();
        if (slug) window.location.reload();  // Reload the page if updating
      } else {
        toast.error("Failed to create/update booking");
      }
    } catch (error) {
      console.error("API request failed", error);
      toast.error("Failed to create/update booking");
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
            submitBtnText={slug ? "Update Booking" : "Create Booking"}
          />
        </form>
      </FormProvider>
    </div>
  );
}
