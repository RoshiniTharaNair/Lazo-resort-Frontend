import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { Button, Title, ActionIcon, Input, Text } from 'rizzui';
import { BookingEnquiryExtensionResponse, BookingEnquiryExtensionFormValues } from '@/types/BookingTypes';
import { useModal } from '@/app/shared/modal-views/use-modal';
import BookingConfirmation from './BookingConfirmation';
import { PiXBold } from 'react-icons/pi';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

type ResortRoomType = {
  recIdentifier: number;
  roomType: string;
  maxOccupancy: number;
  total_inventory: number;
};

export default function BookingEnquiryExtension({ result, data }: { result: BookingEnquiryExtensionResponse; data: BookingEnquiryExtensionFormValues }) {
  const { closeModal, openModal } = useModal();
  const [roomTypes, setRoomTypes] = useState<ResortRoomType[]>([]);

  const methods = useForm<BookingEnquiryExtensionFormValues>({
    defaultValues: data,
  });

  const { handleSubmit, control, formState: { errors } } = methods;

  useEffect(() => {
    // Fetch room types data from the API
    const fetchRoomTypes = async () => {
      try {
        const response = await fetch('http://localhost:3005/ResortRoomType/getCount');
        const data = await response.json();
        setRoomTypes(data);
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };

    fetchRoomTypes();
  }, []);

  const onSubmit = async (formData: BookingEnquiryExtensionFormValues) => {
    // Ensure booking_identifier is included for each guest
    const updatedGuests = formData.guests?.map((guest) => ({
      ...guest,
      bookingIdentifier: result.bookingIdentifier,
    }));

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
      view: <BookingConfirmation result={confirmationData} data={{ ...formData, guests: updatedGuests }} />,
      customSize: '900px',
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
              <td className="px-4 py-2" colSpan={3}>{result.resort.room_categories.length}</td>
            </tr>
            {result.resort.room_categories.map((category) => {
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
          {result.resort.room_categories.map((category) => {
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

          {/* Dynamic Guest Inputs */}
          {Array.from({ length: result.requested_adults + result.requested_children }).map((_, index) => (
            <div key={index} className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <Controller
                name={`guests.${index}.firstName`}
                control={control}
                render={({ field }) => (
                  <Input
                    label={`Guest ${index + 1} First Name`}
                    {...field}
                    error={errors.guests?.[index]?.firstName?.message}
                  />
                )}
              />
              <Controller
                name={`guests.${index}.lastName`}
                control={control}
                render={({ field }) => (
                  <Input
                    label={`Guest ${index + 1} Last Name`}
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
                    {...field}
                    error={errors.guests?.[index]?.ageGroup?.message}
                  />
                )}
              />
            </div>
          ))}

          <Button type="submit" className="col-span-full w-full">
            Confirm Booking
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
