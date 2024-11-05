import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Button, Title, ActionIcon, Text } from 'rizzui';
import { BookingEnquiryExtensionResponse, BookingEnquiryExtensionFormValues } from '@/types/BookingTypes';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiXBold } from 'react-icons/pi';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function BookingConfirmation({ result, data }: { result: BookingEnquiryExtensionResponse; data: BookingEnquiryExtensionFormValues }) {
  const { closeModal } = useModal();
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const methods = useForm<BookingEnquiryExtensionFormValues>({
    defaultValues: data,
  });

  const { handleSubmit } = methods;

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
      setConfirmationResult(confirmationData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handlePayment = async () => {
    if (!confirmationResult) return;

    const paymentPayload = {
      bookingIdentifier: confirmationResult.bookingIdentifier,
      recDate: "2024-09-10T00:00:00.000Z",
      checkInDate: "2024-09-15T00:00:00.000Z",
      checkOutDate: "2024-09-20T00:00:00.000Z",
      resortIdentifier: confirmationResult.resort.resort_id,
      empCode: "EMP001",
      customerIdentifier: 1,
      primaryContact: "+1234567890",
      primaryEmail: "john.doe@example.com",
      specialRequest: "NA",
      vendorIdentifier: "1",
      inventoryIdentifier: "1",
      transactionReference: "TXN20004",
      paymentMode: "Debit Card",
      base: confirmationResult.resort.totalPrice,
      gst: confirmationResult.resort.gst,
      comments: "Accessible room required",
      status: "CONFIRMED",
      membershipIdentifier: "1",
      membershipPoints: 225,
      discountMode: "percentage",
      discountVal: 15,
    };

    try {
      const response = await fetch(`${apiUrl}/bookings/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentPayload),
      });
      const paymentResult = await response.json();
      console.log("Payment Result: ", paymentResult);
      setPaymentCompleted(true);
    } catch (error) {
      console.error('Payment Error:', error);
    }
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          Booking Confirmation
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

      {confirmationResult && (
        <div className="mb-6">
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
                <td className="px-4 py-2">{new Date(confirmationResult.checkin_dt).toLocaleDateString()}</td>
                <td className="px-4 py-2 font-bold">Check-out Date:</td>
                <td className="px-4 py-2">{new Date(confirmationResult.checkout_dt).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-bold">Total Price:</td>
                <td className="px-4 py-2">{`₹${confirmationResult.resort.totalPrice.toFixed(2)}`}</td>
                <td className="px-4 py-2 font-bold">Total GST:</td>
                <td className="px-4 py-2">{`₹${confirmationResult.resort.gst.toFixed(2)}`}</td>
              </tr>
              {confirmationResult.resort.room_categories.map((category: any) => (
                <React.Fragment key={category.room_category}>
                  <tr>
                    <td className="px-4 py-2 font-bold" colSpan={4}>Room Category: {category.room_category}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-bold">Max Occupancy:</td>
                    <td className="px-4 py-2">{category.max_occupancy}</td>
                    <td className="px-4 py-2 font-bold">Base Price:</td>
                    <td className="px-4 py-2">{`₹${category.basePrice.toFixed(2)}`}</td>
                  </tr>
                  {category.dates?.map((date: any) => (
                    <tr key={date.date}>
                      <td className="px-4 py-2 font-bold">Date:</td>
                      <td className="px-4 py-2">{new Date(date.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2 font-bold">Available Rooms:</td>
                      <td className="px-4 py-2">{date.available_rooms}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {!confirmationResult ? (
            <Button type="submit" className="col-span-full w-full">
              Confirm Booking
            </Button>
          ) : !paymentCompleted ? (
            <Button type="button" className="col-span-full w-full" onClick={handlePayment}>
              Pay
            </Button>
          ) : (
            <div className="col-span-full text-center">
              <Text className="text-green-600 text-xl">Hurray! Your booking is confirmed, and payment is successful!</Text>
              {/* Add any decorative icons or images as needed */}
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
}
