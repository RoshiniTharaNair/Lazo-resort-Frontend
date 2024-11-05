import { Controller, useFormContext } from "react-hook-form";
import { Input } from "rizzui";
import cn from "@/utils/class-names";
import FormGroup from "@/app/shared/form-group";
import dynamic from "next/dynamic";
import SelectLoader from "@/components/loader/select-loader";
import QuillLoader from "@/components/loader/quill-loader";
const Select = dynamic(() => import("rizzui").then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});
const QuillEditor = dynamic(() => import("@/components/ui/quill-editor"), {
  ssr: false,
  loading: () => <QuillLoader className="col-span-full h-[143px]" />,
});

export default function InventorySummary({
  className,
}: {
  className?: string;
}) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Add Inventory"
      description="Edit your Inventory and necessary information from here"
      className={cn(className)}
    >
      {/* <Input
        label="ID"
        placeholder="ID"
        {...register('id')}
        error={errors.id?.message as string}
      /> */}
      <Input
        label="Inventory Identifier"
        placeholder="Inventory Identifier"
        {...register("inventoryIdentifier")}
        error={errors.inventoryIdentifier?.message as string}
        readOnly
      />
      <Input
        label="Resort Identifier"
        placeholder="Resort Identifier"
        {...register("resortIdentifier")}
        error={errors.resortIdentifier?.message as string}
      />
      <Input
        label="Effective Date"
        placeholder="YYYY-MM-DD"
        type="date" // Adjust input type for date
        {...register("effectiveDate")}
        error={errors.effectiveDate?.message as string}
      />
      <Input
        label="Room Class"
        placeholder="Room Class"
        {...register("roomClass")}
        error={errors.roomClass?.message as string}
      />
      <Input
        label="Available Count"
        placeholder="Available Count"
        type="number" // Input type for numerical value
        {...register("avlCount")}
        error={errors.avlCount?.message as string}
      />
      <Input
        label="Minimum Occupancy"
        placeholder="Minimum Occupancy"
        type="number" // Input type for numerical value
        {...register("minOcc")}
        error={errors.minOcc?.message as string}
      />
      <Input
        label="Base Price"
        placeholder="Base Price"
        type="number" // Input type for numerical values, adjust if currency input is needed
        {...register("basePrice")}
        error={errors.basePrice?.message as string}
      />
      <Input
        label="GST"
        placeholder="GST"
        {...register("gst")}
        error={errors.gst?.message as string}
      />
      <Input
        label="Discount"
        placeholder="Discount (optional)"
        {...register("discount")}
        error={errors.discount?.message as string}
      />
    </FormGroup>
  );
}
