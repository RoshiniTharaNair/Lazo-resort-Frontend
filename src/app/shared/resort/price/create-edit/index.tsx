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
import ProductSummary from "@/app/shared/resort/price/create-edit/product-summary";
import FormFooter from "@/components/form-footer";
import { useLayout } from "@/hooks/use-layout";
import { LAYOUT_OPTIONS } from "@/config/enums";
import {
  CreatePriceInput,
  priceFormSchema,
} from "@/utils/validators/create-price.schema";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
};

interface IndexProps {
  slug?: string;
  className?: string;
  price?: CreatePriceInput;
}

export default function CreateEditPrice({
  slug,
  price,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const defaultValues = (price?: CreatePriceInput): CreatePriceInput => {
    if (!price)
      return {
        "id": 0,
        "pricingIdentifier": 0,
        "price": 0,
        "resortIdentifier": 0,
      };

    return {
      ...price,
    };
  };
  const methods = useForm<CreatePriceInput>({
    resolver: zodResolver(priceFormSchema),
    defaultValues: defaultValues(price),
  });

  const onSubmit: SubmitHandler<CreatePriceInput> = async (data) => {
    setLoading(true);
    try {
      console.log(JSON.stringify(data));
      console.log(slug);
      const url = slug
        ? `${apiUrl}/pricings/update/${slug}` // Update price
        : `${apiUrl}/pricings/create`; // Create price
      console.log(url);

      const method = slug ? "PUT" : "POST";
      const parsedData = {
        ...data,
        pricingIdentifier: parseInt(data.pricingIdentifier as string),
        price: parseInt(data.price as string),
        resortIdentifier: parseInt(data.resortIdentifier as string),
      };
  
      const { id, ...requestData } = parsedData;
      console.log(JSON.stringify(requestData))

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        toast.success(
          <Text as="b">price successfully {slug ? "updated" : "created"}</Text>
        );
        methods.reset();
        if (method === 'PUT') window.location.reload(); // Reload the page
      } else {
        toast.error("Failed to create/update price");
      }
    } catch (error) {
      console.error("API request failed", error);
      toast.error("Failed to create/update price");
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
            submitBtnText={slug ? "Update Price" : "Create Price"}
          />
        </form>
      </FormProvider>
    </div>
  );
}
