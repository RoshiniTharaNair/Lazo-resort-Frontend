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
      title="Add Room Categories"
      description="Edit your Room cateogiries and necessary information from here"
      className={cn(className)}
    >
      <Input
        label="Room Category Identifier"
        placeholder="Room Category Identifier"
        {...register('roomCategoryIdentifier')}
        error={errors.roomCategoryIdentifier?.message as string}
        readOnly
      />
      <Input
        label="Type"
        placeholder="Room type"
        {...register('type')}
        error={errors.type?.message as string}
      />
      <Input
        label="Description"
        placeholder="Room description"
        {...register('description')}
        error={errors.description?.message as string}
      />
      <Input
        label="Minimum Occupancy"
        placeholder="Room minimum occupancy"
        {...register('minOccupancy')}
        error={errors.minOccupancy?.message as string}
      />
    </FormGroup>
  );
}
