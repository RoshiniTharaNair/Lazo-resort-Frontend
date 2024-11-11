import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, Controller, useWatch } from 'react-hook-form';
import { Button, Title, ActionIcon, Input } from 'rizzui';
import { BookingEnquiryExtensionResponse, BookingEnquiryExtensionFormValues } from '@/types/BookingTypes';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiXBold } from 'react-icons/pi';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import BookingConfirmation from './BookingConfirmation';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type ResortRoomType = {
  recIdentifier: number;
  roomType: string;
  maxOccupancy: number;
  total_inventory: number;
};

type InventoryByRoomType = {
  [key: number]: number;
};

export default function BookingEnquiryExtension({
  result,
  data,
}: {
  result: BookingEnquiryExtensionResponse;
  data: BookingEnquiryExtensionFormValues;
}) {
  const { closeModal, openModal } = useModal();
  const [roomTypes, setRoomTypes] = useState<ResortRoomType[]>([]);
  const [totalInventory, setTotalInventory] = useState<InventoryByRoomType>({});
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const methods = useForm<BookingEnquiryExtensionFormValues>({
    defaultValues: data,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = methods;

  // Watch guest fields to validate first and last names for all guests
  const watchedGuests = useWatch({ control, name: "guests" });

  useEffect(() => {
    // Check if all guests have both first and last names
    const allGuestsHaveNames = watchedGuests?.every(
      (guest) => guest?.firstName?.trim() !== "" && guest?.lastName?.trim() !== ""
    ) ?? false;

    setIsSubmitEnabled(allGuestsHaveNames);
  }, [watchedGuests]);

  useEffect(() => {
    // Fetch room types data from the API
    const fetchRoomTypes = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/ResortRoomType/getCount`
        );
        const data: ResortRoomType[] = await response.json();
        setRoomTypes(data);

        // Calculate maximum available inventory for each room type based on selected dates
        const inventoryByRoomType = data.reduce(
          (acc: InventoryByRoomType, roomType: ResortRoomType) => {
            if (!roomType.recIdentifier) return acc;

            const maxAvailableForRoomType = result.resort.room_categories
              .filter(
                (category) =>
                  parseInt(category.room_category) === roomType.recIdentifier
              )
              .reduce((maxRooms, category) => {
                const maxRoomsForDate =
                  category.dates?.reduce((maxDateRooms, date) => {
                    return Math.max(maxDateRooms, date.available_rooms);
                  }, 0) || 0;
                return Math.max(maxRooms, maxRoomsForDate);
              }, 0);

            acc[roomType.recIdentifier] = maxAvailableForRoomType;
            return acc;
          },
          {}
        );

        setTotalInventory(inventoryByRoomType);
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };

    fetchRoomTypes();
  }, [result]);

  const onSubmit = async (formData: BookingEnquiryExtensionFormValues) => {
    // Ensure default values for age
    const updatedGuests =
      formData.guests?.map((guest) => ({
        ...guest,
        firstName: guest.firstName.trim(),
        lastName: guest.lastName?.trim(),
        ageGroup: guest.ageGroup || 20, // Set age to 20 if not provided
        bookingIdentifier: result.bookingIdentifier,
      })) || [];

    const confirmationData = {
      ...result,
      resort: {
        ...result.resort,
        room_categories: result.resort.room_categories.map((category) => ({
          ...category,
          dates: category.dates?.map((date) => ({
            ...date,
            multiplier: 2,
            dayPoints: 1000,
            dayPrice: 1000,
          })),
        })),
        totalUsedMembershipPoints: "725",
        totalMembershipPurchasePoints: 2000,
        remainingMembershipPoints: 1275,
        totalPoints: 16500,
        totalPrice: 5850,
        flatDiscount: 10,
        pointsCanbeUsed: 318.75,
        remainingPointsTobePaid: 16181.25,
        gst: 175.5,
        gstPercentage: 3,
        totalPricewithGst: 6025.5,
      },
      guests: updatedGuests,
    };

    openModal({
      view: (
        <BookingConfirmation
          result={confirmationData}
          data={{ ...formData, guests: updatedGuests }}
        />
      ),
      customSize: "900px",
    });
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          Booking Enquiry Extension Result
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

      {/* Booking Details Section */}
      <div className="mb-6">
        <Title as="h4" className="text-md font-semibold">Booking Details</Title>
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
              <td className="px-4 py-2">
                {new Date(result.checkin_dt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </td>
              <td className="px-4 py-2 font-bold">Check-out Date:</td>
              <td className="px-4 py-2">
                {new Date(result.checkout_dt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Room Availability Table */}
      <div className="mb-6 overflow-x-auto">
        <Title as="h4" className="text-md font-semibold">Room Availability</Title>
        <table className="min-w-full table-auto border-collapse border-0">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-bold">Room Type</th>
              <th className="px-4 py-2 text-left font-bold">Max Occupancy</th>
              {result.resort.room_categories[0].dates?.map((date) => (
                <th key={date.date} className="px-4 py-2 text-left font-bold">
                  {new Date(date.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                </th>
              ))}
              <th className="px-4 py-2 text-left font-bold">Total Available Rooms</th>
            </tr>
          </thead>
          <tbody>
            {result.resort.room_categories.map((category) => {
              const roomType = roomTypes.find(
                (rt) => rt.recIdentifier === parseInt(category.room_category)
              );
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

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {result.resort.room_categories.map((category) => {
            const roomType = roomTypes.find(
              (rt) => rt.recIdentifier === parseInt(category.room_category)
            );

            const maxAvailableRooms = roomType
              ? totalInventory[roomType.recIdentifier]
              : 0;

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
                          type: "manual",
                          message: `You can only select up to ${maxAvailableRooms} rooms.`,
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
                          onClick={() =>
                            field.onChange(
                              Math.min(field.value + 1, maxAvailableRooms)
                            )
                          }
                        >
                          <ChevronUpIcon className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          className="rounded-[3px] bg-gray-100 py-0.5 px-1.5 hover:bg-gray-200 focus:bg-gray-200"
                          onClick={() =>
                            field.onChange(Math.max(field.value - 1, 0))
                          }
                        >
                          <ChevronDownIcon className="h-3 w-3" />
                        </button>
                      </div>
                    }
                    error={
                      errors.requested_rooms?.[category.room_category]
                        ?.message as string | undefined
                    }
                  />
                )}
              />
            );
          })}

          {/* Dynamic Guest Inputs with Vertical Scroll */}
          <div className="col-span-full max-h-60 overflow-y-auto">
            {Array.from({
              length: Number(result.requested_adults) + Number(result.requested_children),
            }).map((_, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
                >
                  <Controller
                    name={`guests.${index}.firstName`}
                    control={control}
                    rules={{ required: "First Name is required" }}
                    render={({ field }) => (
                      <Input
                        label={`Guest ${index + 1} First Name`}
                        placeholder="Enter first name"
                        {...field}
                        error={errors.guests?.[index]?.firstName?.message}
                      />
                    )}
                  />
                  <Controller
                    name={`guests.${index}.lastName`}
                    control={control}
                    rules={{ required: "Last Name is required" }}
                    render={({ field }) => (
                      <Input
                        label={`Guest ${index + 1} Last Name`}
                        placeholder="Enter last name"
                        {...field}
                        error={errors.guests?.[index]?.lastName?.message}
                      />
                    )}
                  />
                  <Controller
                    name={`guests.${index}.ageGroup`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        label={`Guest ${index + 1} Age Group`}
                        placeholder="Enter age group"
                        {...field}
                        error={errors.guests?.[index]?.ageGroup?.message}
                      />
                    )}
                  />
                </div>
              );
            })}
          </div>

          <Button type="submit" className="col-span-full w-full" disabled={!isSubmitEnabled}>
            Confirm Booking
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}