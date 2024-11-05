'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@/utils/class-names';
import FormNav, {
  formParts,
} from '@/app/shared/resort/product/create-edit/form-nav';
import ProductSummary from '@/app/shared/resort/product/create-edit/product-summary';
import { defaultValues } from '@/app/shared/resort/product/create-edit/form-utils';
import FormFooter from '@/components/form-footer';
import {
  CreateProductInput,
  productFormSchema,
} from '@/utils/validators/create-product.schema';
import { useLayout } from '@/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: ProductSummary,
};

interface IndexProps {
  slug?: string;
  className?: string;
  product?: CreateProductInput;
}

export default function CreateEditProduct({
  slug,
  product,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);

  const defaultValues = (product?: CreateProductInput): CreateProductInput => {
    if (!product)  return {
      recIdentifier: 0,
      roomType: '',
      maxOccupancy: 0,
      description: '',  // Added description field
    };
    return {
      ...product,
    };
  };
  
  const methods = useForm<CreateProductInput>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues(product),
  });
  
  const onSubmit: SubmitHandler<CreateProductInput> = async (data) => {
    setLoading(true);
    try {
      const updatedData = {
        ...data,
        recIdentifier: parseInt(data.recIdentifier ? data.recIdentifier.toString() : '0', 10),
        maxOccupancy: parseInt(data.maxOccupancy ? data.maxOccupancy.toString() : '0', 10)
      };

      const url = slug
        ? `${apiUrl}/ResortRoomType/update/${slug}` // Update room type
        : `${apiUrl}/ResortRoomType/create`; // Create room type
      
      const method = slug ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        toast.success(
          <Text as="b">Room Type successfully {slug ? 'updated' : 'created'}</Text>
        );
        methods.reset();
        if (method === 'PUT') window.location.reload(); // Reload the page
      } else {
        toast.error('Failed to create/update room type');
      }
    } catch (error) {
      console.error('API request failed', error);
      toast.error('Failed to create/update room type');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="@container">
       <FormNav
        className={cn(
          layout === LAYOUT_OPTIONS.BERYLLIUM && 'z-[999] 2xl:top-[72px]'
        )}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            'relative z-[19] [&_label.block>span]:font-medium',
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
            submitBtnText={slug ? 'Update Room Type' : 'Create Room Type'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
