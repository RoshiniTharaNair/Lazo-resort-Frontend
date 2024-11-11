"use client";

import React, { useEffect } from "react";
import { Input, Button } from "rizzui";
import FormGroup from "@/app/shared/form-group";
import { Controller, useForm } from "react-hook-form";
import { CreateProductInput } from "@/utils/validators/create-product.schema";

interface RoomCategoryFormProps {
  room?: CreateProductInput;
  onSubmit: (data: CreateProductInput) => void;
  isEditMode: boolean;
}

export const RoomCategoryForm: React.FC<RoomCategoryFormProps> = ({
  room,
  onSubmit,
  isEditMode,
}) => {
  const formMethods = useForm<CreateProductInput>({
    defaultValues: room || {},
  });

  const { control, handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (room) {
      console.log("Room data received in form:", room); // Log the received room data
      reset(room);  // Reset form with new room data
    }
  }, [room, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormGroup
        title={`${isEditMode ? "Edit" : "Add"} Room Type`}
        description="Fill in the details of the room type."
      >
        <div className="grid grid-cols-3 gap-4">  {/* Added grid layout for 3 elements per row */}
          <Controller
            name="roomType"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="Room Type"
                placeholder="Enter room type"
                {...field}
                error={error?.message}
              />
            )}
          />
          <Controller
            name="maxOccupancy"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="Maximum Occupancy"
                placeholder="Enter maximum occupancy"
                type="number"
                {...field}
                error={error?.message}
              />
            )}
          />
        </div>
        <Button type="submit" className="mt-4">
          {isEditMode ? "Update Room Type" : "Create Room Type"}
        </Button>
      </FormGroup>
    </form>
  );
};
