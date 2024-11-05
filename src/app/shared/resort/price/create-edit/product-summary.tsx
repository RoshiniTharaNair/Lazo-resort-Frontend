import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import {
  categoryOption,
  typeOption,
} from '@/app/shared/resort/product/create-edit/form-utils';
import dynamic from 'next/dynamic';
import SelectLoader from '@/components/loader/select-loader';
import QuillLoader from '@/components/loader/quill-loader';
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function ProductSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Add Prices"
      description="Edit your Prices and necessary information from here"
      className={cn(className)}
    >
      <Input
        label="ID"
        placeholder="ID"
        {...register('id')}
        error={errors.id?.message as string}
      />
      <Input
        label="Price Identifier"
        placeholder="Price Identifier"
        {...register('pricingIdentifier')}
        error={errors.pricingIdentifier?.message as string}
        readOnly
      />
      <Input
        label="Price"
        placeholder="Price"
        {...register('price')}
        error={errors.price?.message as string}
      />
      <Input
        label="Resort Identifier"
        placeholder="Room Resort Identifier"
        {...register('resortIdentifier')}
        error={errors.resortIdentifier?.message as string}
      />
    </FormGroup>
  );
}
