import { Button, Title, ActionIcon, Text } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { BookingConfirmationResponse } from '@/types/BookingTypes';

export default function BookingConfirmationResult({ result }: { result: BookingConfirmationResponse }) {
  const { closeModal } = useModal();

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <Title as="h3" className="text-lg">
        Booking Confirmation Result
      </Title>
      <div className="mb-6">
        <Text><strong>Total Price with GST:</strong> {result.resort.totalPricewithGst}</Text>
        {/* Additional details as needed */}
      </div>
      <Button onClick={() => closeModal()} className="w-full">
        Close
      </Button>
    </div>
  );
}
