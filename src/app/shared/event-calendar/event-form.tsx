import React, { useState, useEffect } from 'react';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { FormProvider, useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button, Input, Select, Title, ActionIcon } from 'rizzui';
import { DatePicker } from '@/components/ui/datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BookingEnquiryResponse, CreateEventProps, EventFormInput } from '@/types/BookingTypes';
import toast from 'react-hot-toast';
import { PiXBold } from 'react-icons/pi';
import BookingEnquiry from './BookingEnquiry';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GeoLocation {
  geoLocationIdentifier: number;
  country: string;
  postalCode: string;
  city: string;
  state: string;
  district: string;
  town: string;
  createdAt: string;
  updatedAt: string;
}

interface Resort {
  resortIdentifier: number;
  label: string;
}

export default function EventForm({ startDate, endDate, event, resorts }: CreateEventProps) {
  const { closeModal, openModal } = useModal();
  const [geoLocations, setGeoLocations] = useState<{ value: number; label: string }[]>([]);
  const [resortOptions, setResortOptions] = useState<{ value: number; label: string }[]>(resorts.map((resort) => ({ value: resort.resortIdentifier, label: resort.label })));
  const [selectedType, setSelectedType] = useState('Resort');
  const [selectedOption, setSelectedOption] = useState<{ value: number; label: string } | null>(null);

  useEffect(() => {
    if (selectedType === 'Geo Location') {
      setSelectedOption(null);
      fetch(`${apiUrl}/geos/view`)
        .then((res) => res.json())
        .then((data) => setGeoLocations(data.map((geo: GeoLocation) => ({
          value: geo.geoLocationIdentifier,
          label: `${geo.town}, ${geo.city}, ${geo.state}`,
        }))));
    } else {
      setSelectedOption(null);
      fetch(`${apiUrl}/resorts/view`)
        .then((res) => res.json())
        .then((data) => setResortOptions(data.map((resort: Resort) => ({
          value: resort.resortIdentifier,
          label: resort.label,
        }))));
    }
  }, [selectedType]);

  const methods = useForm<EventFormInput>({
    defaultValues: {
      checkin_dt: startDate ?? new Date(),
      checkout_dt: endDate ?? new Date(),
      number_of_adults: 1,
      number_of_children: 0,
      number_of_rooms: 1,
      age_of_children: '',
      resortIdentifier: selectedType === 'Resort' ? selectedOption?.value : undefined,
      geoIdentifier: selectedType === 'Geo Location' ? selectedOption?.value : undefined,
    },
  });

  const { register, control, handleSubmit, setError, formState: { errors } } = methods;

  const onSubmit: SubmitHandler<EventFormInput> = async (data) => {
    if (!selectedOption) {
      setError(selectedType === 'Resort' ? 'resortIdentifier' : 'geoIdentifier', {
        type: 'manual',
        message: `Please select a ${selectedType.toLowerCase()}.`,
      });
      return;
    }

    const apiUrl1 = `${apiUrl}/bookings/balance-enquiry`;

    const payload: any = {
      checkin_dt: data.checkin_dt.toISOString().split('T')[0],
      checkout_dt: data.checkout_dt.toISOString().split('T')[0],
      number_of_adults: data.number_of_adults,
      number_of_children: data.number_of_children,
      age_of_children: Array(data.number_of_children).fill(7),
      number_of_rooms: data.number_of_rooms,
    };

    if (selectedType === 'Resort' && selectedOption) {
      payload.resort_id = [selectedOption.value];
    } else if (selectedType === 'Geo Location' && selectedOption) {
      payload.geo_id = [selectedOption.value];
    }

    try {
      const response = await fetch(apiUrl1, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as BookingEnquiryResponse;
      toast.success('Booking enquiry submitted successfully');

      openModal({
        view: <BookingEnquiry result={result} />,
        customSize: '900px',
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to submit booking enquiry');
    }
  };

  return (
    <div className="m-auto p-4 md:px-7 md:py-10">
      <div className="mb-6 flex items-center justify-between">
        <Title as="h3" className="text-lg">
          {event ? 'Update Event' : 'Create a new event'}
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

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Select
            label="Type"
            options={[{ value: 'Resort', label: 'Resort' }, { value: 'Geo Location', label: 'Geo Location' }]}
            value={selectedType}
            onChange={(option: { value: string; label: string }) => {
              setSelectedType(option.value);
              setSelectedOption(null);
            }}
            className="relative z-[9999]"
            dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white"
          />
          <Controller
            name={selectedType === 'Resort' ? 'resortIdentifier' : 'geoIdentifier'}
            control={control}
            render={({ field }) => (
              <Select
                label={selectedType === 'Resort' ? 'Select Resort' : 'Select Geo Location'}
                options={selectedType === 'Resort' ? resortOptions : geoLocations}
                value={selectedOption}
                onChange={(option: { value: number; label: string }) => {
                  setSelectedOption(option);
                  field.onChange(option.value);
                }}
                className="relative z-[9999]"
                dropdownClassName="absolute z-[9999] max-h-60 overflow-auto shadow-lg bg-white"
                displayValue={(option: { value: number; label: string }) => option.label}
                error={errors[selectedType === 'Resort' ? 'resortIdentifier' : 'geoIdentifier']?.message}
              />
            )}
          />
          <Controller
            name="checkin_dt"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                popperPlacement="top-start"
                selected={value}
                onChange={onChange}
                selectsStart
                startDate={value}
                endDate={endDate}
                minDate={new Date()}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="date-picker-event-calendar"
                placeholderText="Event Start Date"
              />
            )}
          />
          <Controller
            name="checkout_dt"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                popperPlacement="top-start"
                selected={value}
                onChange={onChange}
                selectsEnd
                minDate={startDate}
                startDate={startDate}
                endDate={value}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="date-picker-event-calendar"
                placeholderText="Event End Date"
              />
            )}
          />
          <Input
            label="Number of Adults"
            {...register('number_of_adults')}
            className="mb-4 col-span-full"
            error={errors.number_of_adults?.message}
          />
          <Input
            label="Number of Children (ages below 10 will be automatically set to 7)"
            {...register('number_of_children')}
            className="mb-4 col-span-full"
            error={errors.number_of_children?.message}
          />
          <Input
            label="Number of Rooms"
            {...register('number_of_rooms')}
            className="mb-4 col-span-full"
            error={errors.number_of_rooms?.message}
          />
          <Button type="submit" className="col-span-full w-full">
            Booking Enquiry
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
