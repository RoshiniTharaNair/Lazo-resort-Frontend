import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { Button, Title, ActionIcon } from 'rizzui';
import { BookingEnquiryResponse, BookingEnquiryFormValues, BookingEnquiryExtensionResponse } from '@/types/BookingTypes';
import { useModal } from '@/app/shared/modal-views/use-modal';
import BookingEnquiryExtension from './BookingEnquiryExtension';
import { PiXBold } from 'react-icons/pi';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Input } from 'rizzui';
import { ResortRoomType } from '@/data/resort-room-types';

export default function BookingEnquiry({ result }: { result: BookingEnquiryResponse }) {
  const { closeModal, openModal } = useModal();
  const [roomTypes, setRoomTypes] = useState<ResortRoomType[]>([]);

  const methods = useForm<BookingEnquiryFormValues>({
    defaultValues: {
      requested_adults: result.requested_adults,
      requested_children: result.requested_children,
      age_of_children: result.age_of_children,
      checkin_dt: result.checkin_dt,
      checkout_dt: result.checkout_dt,
      resort_id: result.resorts[0].resort_id,
      requested_rooms: {},
    },
  });

  const { handleSubmit, control, setValue, setError, formState: { errors } } = methods;

  useEffect(() => {
    // Fetch room types data from the API
    const fetchRoomTypes = async () => {
      try {
        const response = await fetch('http://localhost:3005/ResortRoomType/getCount');
        const data: ResortRoomType[] = await response.json();
        setRoomTypes(data);

        // Automatically select the first room type by default
        if (data.length > 0) {
          data.forEach(roomType => {
            setValue(`requested_rooms.${roomType.recIdentifier}`, 0);
          });
        }
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };

    fetchRoomTypes();
  }, [setValue]);

  const onSubmit = async (formData: BookingEnquiryFormValues) => {
    let hasError = false;

    // Validate that at least one room has been selected
    roomTypes.forEach(roomType => {
      const roomCategoryValue = formData.requested_rooms[roomType.recIdentifier];
      if (roomCategoryValue === undefined || roomCategoryValue === null || roomCategoryValue <= 0) {
        setError(`requested_rooms.${roomType.recIdentifier}`, {
          type: 'manual',
          message: 'Please select at least one room of this type.',
        });
        hasError = true;
      }
    });

    if (hasError) {
      return; // Prevent submission if there's an error
    }

    const mappedResort = {
      ...result.resorts[0],
      room_categories: result.resorts[0].room_categories.map((category) => ({
        ...category,
        requested_rooms: 0,
        allocated_adults: 0,
        remaining_adults: 0,
        extraRoom: false,
        bookingRoomIdentifier: 0,
        inventoryIdentifier: 0,
        numberOfRooms: 0,
        basePoints: 0,
        basePrice: 0,
      })),
    };

    const extensionResult: BookingEnquiryExtensionResponse = {
      ...result,
      resort: mappedResort,
      canBook: true,
      bookingIdentifier: 1,
    };

    openModal({
      view: <BookingEnquiryExtension result={extensionResult} data={{ ...formData, guests: [] }} />,
      customSize: '900px',
    });
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          Booking Enquiry Result
        </Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon>
      </div>

      <div className="mb-6">
        <Title as="h4" className="text-md font-semibold">
          Booking Details
        </Title>
        <table className="min-w-full table-auto border-collapse border-0">
          <tbody>
            <tr>
              <td className="px-4 py-2 font-bold">Requested Adults:</td>
              <td className="px-4 py-2">{result.requested_adults}</td>
              <td className="px-4 py-2 font-bold">Requested Children:</td>
              <td className="px-4 py-2">{result.requested_children}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold">Check-in Date:</td>
              <td className="px-4 py-2">{new Date(result.checkin_dt).toLocaleDateString()}</td>
              <td className="px-4 py-2 font-bold">Check-out Date:</td>
              <td className="px-4 py-2">{new Date(result.checkout_dt).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold">Number of Rooms:</td>
              <td className="px-4 py-2" colSpan={3}>{result.resorts[0].room_categories.length}</td>
            </tr>
            {result.resorts[0].room_categories.map((category) => {
              const roomType = roomTypes.find(rt => rt.recIdentifier === parseInt(category.room_category));
              return (
                <React.Fragment key={category.room_category}>
                  <tr>
                    <td className="px-4 py-2 font-bold" colSpan={4}>Room Type: {roomType?.roomType || "Unknown"}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-bold">Max Occupancy:</td>
                    <td className="px-4 py-2">{roomType?.maxOccupancy || category.max_occ}</td>
                    <td className="px-4 py-2 font-bold">Total Inventory:</td>
                    <td className="px-4 py-2">{roomType?.total_inventory}</td>
                  </tr>
                  {category.dates?.map((date) => (
                    <tr key={date.date}>
                      <td className="px-4 py-2 font-bold">Date:</td>
                      <td className="px-4 py-2">{new Date(date.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2 font-bold">Available Rooms:</td>
                      <td className="px-4 py-2">{date.available_rooms}</td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {result.resorts[0].room_categories.map((category) => {
            const roomType = roomTypes.find(rt => rt.recIdentifier === parseInt(category.room_category));
            return (
              <Controller
                key={category.room_category}
                name={`requested_rooms.${category.room_category}`}
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Input
                    label={`Room Type: ${roomType?.roomType || "Unknown"}`}
                    type="number"
                    min={0}
                    step={1}
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="mb-4"
                    suffix={
                      <div className="-mr-3.5 grid gap-[2px] p-0.5 rtl:-ml-3.5 rtl:-mr-0">
                        <button
                          type="button"
                          className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                          onClick={() => field.onChange(field.value + 1)}
                        >
                          <ChevronUpIcon className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                          onClick={() => field.onChange(field.value - 1)}
                        >
                          <ChevronDownIcon className="h-3 w-3" />
                        </button>
                      </div>
                    }
                    error={errors.requested_rooms?.[category.room_category]?.message as string | undefined}
                  />
                )}
              />
            );
          })}
          <Button type="submit" className="col-span-full w-full">
            Submit Booking Enquiry Extension
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
