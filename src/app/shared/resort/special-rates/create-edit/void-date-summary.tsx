import { Controller, useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@/utils/class-names';
import FormGroup from '@/app/shared/form-group';

export default function VoidDateSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Add Void Date"
      description="Edit your void date and necessary information from here"
      className={cn(className)}
    >
      <Input
        label="Void Date Identifier"
        placeholder="Void Date Identifier"
        {...register('voiddateIdentifier')}
        error={errors.voiddateIdentifier?.message as string}
        readOnly
      />
      <Input
        label="Void Date"
        placeholder="Void Date"
        type="date"
        {...register('voidDate')}
        error={errors.voidDate?.message as string}
      />
      <Input
        label="Void Multiplier"
        placeholder="Void Multiplier"
        {...register('voidMultiplier')}
        error={errors.voidMultiplier?.message as string}
      />
      <Input
        label="Resort Identifier"
        placeholder="Resort Identifier"
        {...register('resortIdentifier')}
        error={errors.resortIdentifier?.message as string}
      />
    </FormGroup>
  );
}
