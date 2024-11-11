"use client";

import { useState } from "react";
import toast from "react-hot-toast";
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
import CouponSummary from "@/app/shared/resort/coupons/create-edit/coupon-summary";
import {
  CreateCouponInput,
  couponFormSchema,
} from "@/utils/validators/create-coupon.schema";
import { Element as ScrollElement } from "react-scroll";  // Renaming the import to avoid conflict
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: CouponSummary,
};

interface IndexProps {
  slug?: string;
  className?: string;
  coupon?: CreateCouponInput;
}

export default function CreateEditCoupons({
  slug,
  coupon,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);

  const defaultValues = (coupon?: CreateCouponInput): CreateCouponInput => {
    return coupon
      ? { ...coupon }
      : {
          couponString: '',
          discountValue: 0,
          discountUnit: 'percentage',
          minBookingValue: 0,
          maxDiscountValue: 0,
          validity: new Date().toISOString(),
        };
  };

  const methods = useForm<CreateCouponInput>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: defaultValues(coupon),
  });

  const onSubmit: SubmitHandler<CreateCouponInput> = async (data) => {
    setLoading(true);
    try {
      const url = slug
        ? `${apiUrl}/coupon/update/${slug}`
        : `${apiUrl}/coupon/create`;

      const method = slug ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success(`Coupon ${slug ? "updated" : "created"} successfully!`);
        methods.reset();
        if (slug) window.location.reload();
      } else {
        toast.error("Failed to create/update coupon");
      }
    } catch (error) {
      console.error("API request failed", error);
      toast.error("Failed to create/update coupon");
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
              <ScrollElement
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {<Component className="pt-7 @2xl:pt9 @3xl:pt-11" />}
              </ScrollElement>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? "Update Coupon" : "Create Coupon"}
          />
        </form>
      </FormProvider>
    </div>
  );
}
