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
import VoidDateSummary from "@/app/shared/resort/special-rates/create-edit/void-date-summary";
import FormFooter from "@/components/form-footer";
import { useLayout } from "@/hooks/use-layout";
import { LAYOUT_OPTIONS } from "@/config/enums";
import {
  CreateVoidDateInput,
  voidDateFormSchema,
} from "@/utils/validators/create-void-date.schema";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: VoidDateSummary,
};

interface IndexProps {
  slug?: string;
  className?: string;
  voidDate?: CreateVoidDateInput;
}

export default function CreateEditVoidDate({
  slug,
  voidDate,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);

  const defaultValues = (voidDate?: CreateVoidDateInput): CreateVoidDateInput => {
    if (!voidDate)
      return {
        "voiddateIdentifier": 0,
        "resortIdentifier": 0,
        "voidDate": "",
        "voidMultiplier": 0,
      };

    return {
      ...voidDate,
    };
  };

  const methods = useForm<CreateVoidDateInput>({
    resolver: zodResolver(voidDateFormSchema),
    defaultValues: defaultValues(voidDate),
  });

  const onSubmit: SubmitHandler<CreateVoidDateInput> = async (data) => {
    setLoading(true);
    try {
      const url = slug
        ? `${apiUrl}/voidDate/update/${slug}` // Update void date
        : `${apiUrl}/voidDate/create`; // Create void date

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
          <Text as="b">Void Date successfully {slug ? "updated" : "created"}</Text>
        );
        methods.reset();
        if (method === 'PUT') window.location.reload();
      } else {
        toast.error("Failed to create/update void date");
      }
    } catch (error) {
      console.error("API request failed", error);
      toast.error("Failed to create/update void date");
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
            submitBtnText={slug ? "Update Void Date" : "Create Void Date"}
          />
        </form>
      </FormProvider>
    </div>
  );
}
