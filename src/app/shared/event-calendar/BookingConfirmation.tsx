import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Title, ActionIcon, Text } from 'rizzui';
import { BookingEnquiryExtensionResponse, BookingEnquiryExtensionFormValues } from '@/types/BookingTypes';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiXBold } from 'react-icons/pi';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type ResortRoomType = {
  recIdentifier: number;
  roomType: string;
  maxOccupancy: number;
};

export default function BookingConfirmation({
  result,
  data,
}: {
  result: BookingEnquiryExtensionResponse;
  data: BookingEnquiryExtensionFormValues;
}) {
  const { closeModal } = useModal();
  const [confirmationResult, setConfirmationResult] = useState<any>(result);
  const [bookingConfirmed, setBookingConfirmed] = useState(false); // Track booking confirmation state
  const [roomTypes, setRoomTypes] = useState<ResortRoomType[]>([]);
  const [totalInventory, setTotalInventory] = useState<{ [key: number]: number }>({});

  const methods = useForm<BookingEnquiryExtensionFormValues>({
    defaultValues: data,
  });

  useEffect(() => {
    // Fetch room types from the API, similar to BookingEnquiry.tsx
    const fetchRoomTypes = async () => {
      try {
        const response = await fetch(`${apiUrl}/ResortRoomType/getCount`);
        const data: ResortRoomType[] = await response.json();
        setRoomTypes(data);

        // Calculate total inventory for each room type based on the selected dates
        const inventoryByRoomType = data.reduce((acc: { [key: number]: number }, roomType) => {
          if (!roomType.recIdentifier) return acc;

          const minAvailableForRoomType = result.resort.room_categories
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
      } catch (error) {
        console.error('Error fetching room types:', error);
      }
    };

    fetchRoomTypes();
  }, [result]);

  const { handleSubmit } = methods;

  // Trigger /bookings/confirmation API and update the state
  const onSubmit = async (formData: BookingEnquiryExtensionFormValues) => {
    const payload = {
      ...formData,
      bookingIdentifier: result.bookingIdentifier,
      guests: formData.guests?.map((guest) => ({
        ...guest,
        bookingIdentifier: result.bookingIdentifier,
      })),
      resort: result.resort,
    };

    try {
      const response = await fetch(`${apiUrl}/bookings/confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const confirmationData = await response.json();
      setConfirmationResult(confirmationData); // Set confirmation result
      setBookingConfirmed(true); // Set the booking confirmation state to true
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">Booking Confirmation</Title>
        <ActionIcon
          size="sm"
          variant="text"
          onClick={() => closeModal()}
          className="p-0 text-gray-500 hover:!text-gray-900"
        >
          <PiXBold className="h-[18px] w-[18px]" />
        </ActionIcon>
      </div>

      {/* Booking Confirmation Message */}
      {bookingConfirmed ? (
        <div className="col-span-full text-center">
          <Text className="text-green-600 text-xl">
            Hurray! Your booking is confirmed!
          </Text>
        </div>
      ) : (
        <>
          {/* Modal with Booking Details */}
          {confirmationResult && (
            <div className="mb-6">
              <Title as="h4" className="text-md font-semibold">Booking Details</Title>

              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border-0 mb-4">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left font-bold">Room Type</th>
                      {confirmationResult.resort.room_categories[0].dates?.map((date: any) => (
                        <th key={date.date} className="px-4 py-2 text-left font-bold">
                          {new Date(date.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </th>
                      ))}
                      <th className="px-4 py-2 text-left font-bold">Total Available Rooms</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmationResult.resort.room_categories.map((category: any) => {
                      const roomType = roomTypes.find(
                        (rt) => rt.recIdentifier === parseInt(category.room_category)
                      );
                      const totalAvailableRooms = totalInventory[roomType?.recIdentifier || 0];

                      return (
                        <tr key={category.room_category} className="border-b">
                          <td className="px-4 py-2 font-bold">{roomType?.roomType || "Unknown"}</td>
                          {category.dates?.map((date: any) => (
                            <td key={date.date} className={`px-4 py-2 ${date.available_rooms > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {date.available_rooms > 0 ? date.available_rooms : 'Unavailable'}
                            </td>
                          ))}
                          <td className="px-4 py-2 font-bold">{totalAvailableRooms}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <hr className="my-4" />

              {/* Additional Booking Details */}
              <table className="min-w-full table-auto border-collapse border-0">
                <tbody>
                  <tr>
                    <td className="px-4 py-2 font-bold">Requested Adults:</td>
                    <td className="px-4 py-2">{confirmationResult.requested_adults}</td>
                    <td className="px-4 py-2 font-bold">Requested Children:</td>
                    <td className="px-4 py-2">{confirmationResult.requested_children}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-bold">Check-in Date:</td>
                    <td className="px-4 py-2">
                      {new Date(confirmationResult.checkin_dt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-2 font-bold">Check-out Date:</td>
                    <td className="px-4 py-2">
                      {new Date(confirmationResult.checkout_dt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-bold">Total Price:</td>
                    <td className="px-4 py-2">{`₹${confirmationResult.resort.totalPrice.toFixed(2)}`}</td>
                    <td className="px-4 py-2 font-bold">Total GST:</td>
                    <td className="px-4 py-2">{`₹${confirmationResult.resort.gst.toFixed(2)}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Button type="submit" className="col-span-full w-full">
                Confirm Booking
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
}
