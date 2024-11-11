import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, Controller, useWatch } from 'react-hook-form';
import { Button, Title, ActionIcon } from 'rizzui';
import { BookingEnquiryResponse, BookingEnquiryFormValues, BookingEnquiryExtensionResponse } from '@/types/BookingTypes';
import { useModal } from '@/app/shared/modal-views/use-modal';
import BookingEnquiryExtension from './BookingEnquiryExtension';
import { PiXBold } from 'react-icons/pi';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Input } from 'rizzui';
import { ResortRoomType } from '@/data/resort-room-types';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function BookingEnquiry({ result }: { result: BookingEnquiryResponse }) {
  const { closeModal, openModal } = useModal();
  const [roomTypes, setRoomTypes] = useState<ResortRoomType[]>([]);
  const [totalInventory, setTotalInventory] = useState<{ [key: number]: number }>({});

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

  // Use useWatch to monitor the "requested_rooms" field and update state on changes
  const watchedRequestedRooms = useWatch({ control, name: 'requested_rooms' });

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    // Fetch room types data from the API
    const fetchRoomTypes = async () => {
      try {
        const response = await fetch(`${apiUrl}/ResortRoomType/getCount`);
        const data: ResortRoomType[] = await response.json();
        setRoomTypes(data);

        // Calculate total inventory for each room type based on the selected dates
        const inventoryByRoomType = data.reduce((acc: { [key: number]: number }, roomType: ResortRoomType) => {
          if (!roomType.recIdentifier) return acc;

          const minAvailableForRoomType = result.resorts[0].room_categories
            .filter(category => parseInt(category.room_category) === roomType.recIdentifier)
            .reduce((minRooms, category) => {
              const minRoomsForDate = category.dates?.reduce((minDateRooms, date) => {
                return Math.min(minDateRooms, date.available_rooms);
              }, Infinity) || 0;
              return Math.min(minRooms, minRoomsForDate);
            }, Infinity);

          acc[roomType.recIdentifier] = minAvailableForRoomType;
          return acc;
        }, {});

        setTotalInventory(inventoryByRoomType);

        // Automatically set 0 for all room types initially
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
  }, [result, setValue]);

  useEffect(() => {
    // Check if any room type has a value greater than 0 to enable the submit button
    const hasRoomsSelected = Object.values(watchedRequestedRooms || {}).some((value) => value > 0);
    setIsSubmitEnabled(hasRoomsSelected);
  }, [watchedRequestedRooms]);

  const onSubmit = async (formData: BookingEnquiryFormValues) => {
    let hasError = false;

    // Validate that the number of rooms requested does not exceed total inventory
    roomTypes.forEach(roomType => {
      const roomCategoryValue = formData.requested_rooms[roomType.recIdentifier];
      const maxAvailableRooms = totalInventory[roomType.recIdentifier];
      if (roomCategoryValue > maxAvailableRooms) {
        setError(`requested_rooms.${roomType.recIdentifier}`, {
          type: 'manual',
          message: `You can only select up to ${maxAvailableRooms} rooms of this type.`,
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
      {/* Modal Header */}
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

      {/* Booking Details */}
      <div className="mb-6">
        <Title as="h4" className="text-md font-semibold">
          Booking Details
        </Title>
        <table className="min-w-full table-auto border-collapse border-0 mb-4">
          <tbody>
            <tr>
              <td className="px-4 py-2 font-bold">Requested Adults:</td>
              <td className="px-4 py-2">{result.requested_adults}</td>
              <td className="px-4 py-2 font-bold">Requested Children:</td>
              <td className="px-4 py-2">{result.requested_children}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-bold">Check-in Date:</td>
              <td className="px-4 py-2">{new Date(result.checkin_dt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
              <td className="px-4 py-2 font-bold">Check-out Date:</td>
              <td className="px-4 py-2">{new Date(result.checkout_dt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Room Availability Table */}
      <div className="mb-6 overflow-x-auto">
        <Title as="h4" className="text-md font-semibold">
          Room Availability
        </Title>
        <table className="min-w-full table-auto border-collapse border-0">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-bold">Room Type</th>
              <th className="px-4 py-2 text-left font-bold">Max Occupancy</th>
              {result.resorts[0].room_categories[0].dates?.map((date) => (
                <th key={date.date} className="px-4 py-2 text-left font-bold">
                  {new Date(date.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </th>
              ))}
              <th className="px-4 py-2 text-left font-bold">Total Available Rooms</th>
            </tr>
          </thead>
          <tbody>
            {result.resorts[0].room_categories.map((category) => {
              const roomType = roomTypes.find(rt => rt.recIdentifier === parseInt(category.room_category));
              const maxOccupancy = roomType?.maxOccupancy || category.max_occ;
              const totalAvailable = totalInventory[roomType?.recIdentifier || 0];
              return (
                <tr key={category.room_category}>
                  <td className="px-4 py-2 font-bold">{roomType?.roomType || "Unknown"}</td>
                  <td className="px-4 py-2">{maxOccupancy}</td>
                  {category.dates?.map((date) => (
                    <td
                      key={date.date}
                      className={`px-4 py-2 ${date.available_rooms > 0 ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {date.available_rooms > 0 ? date.available_rooms : 'Unavailable'}
                    </td>
                  ))}
                  <td className="px-4 py-2 font-bold">{totalAvailable}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Submit Form */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {result.resorts[0].room_categories.map((category) => {
            const roomType = roomTypes.find(rt => rt.recIdentifier === parseInt(category.room_category));
            const maxAvailableRooms = roomType ? totalInventory[roomType.recIdentifier] : 0;
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
                    max={maxAvailableRooms}
                    step={1}
                    value={field.value}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value > maxAvailableRooms) {
                        setError(`requested_rooms.${category.room_category}`, {
                          type: 'manual',
                          message: `You can only select up to ${maxAvailableRooms} rooms of this type.`,
                        });
                      } else {
                        field.onChange(value);
                      }
                    }}
                    className="mb-4"
                    suffix={
                      <div className="-mr-3.5 grid gap-[2px] p-0.5 rtl:-ml-3.5 rtl:-mr-0">
                        <button
                          type="button"
                          className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                          onClick={() => field.onChange(Math.min(field.value + 1, maxAvailableRooms))}
                        >
                          <ChevronUpIcon className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                          onClick={() => field.onChange(Math.max(field.value - 1, 0))}
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
          <Button type="submit" className="col-span-full w-full" disabled={!isSubmitEnabled}>
            Submit Booking Enquiry Extension
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
