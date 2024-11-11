'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import EventForm from '@/app/shared/event-calendar/event-form';
import DetailsEvents from '@/app/shared/event-calendar/details-event';
import { useModal } from '@/app/shared/modal-views/use-modal';
import useEventCalendar from '@/hooks/use-event-calendar';
import ExportButton from '@/app/shared/export-button';
import ModalButton from '@/app/shared/modal-button';
import cn from '@/utils/class-names';
import { eventData } from '@/data/event-data';
import { Select } from 'rizzui';
import { Resort } from '@/types/BookingTypes';
import { CalendarEvent } from '@/types';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const localizer = dayjsLocalizer(dayjs);

// Define the type for the options used in the Select component
interface SelectOption {
  label: string;
  value: number;  // This will hold the resortIdentifier
}

// Define the calendarToolbarClassName
const calendarToolbarClassName = `
  [&_.rbc-toolbar_.rbc-toolbar-label]:whitespace-nowrap 
  [&_.rbc-toolbar_.rbc-toolbar-label]:my-2 
  [&_.rbc-toolbar]:flex 
  [&_.rbc-toolbar]:flex-col 
  [&_.rbc-toolbar]:items-center 
  @[56rem]:[&_.rbc-toolbar]:flex-row 
  [&_.rbc-btn-group_button:hover]:bg-gray-300 
  [&_.rbc-btn-group_button]:duration-200 
  [&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-600 
  dark:[&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-300 
  [&_.rbc-btn-group_button.rbc-active:hover]:text-gray-50 
  dark:[&_.rbc-btn-group_button.rbc-active:hover]:text-gray-900 
  [@media(max-width:375px)]:[&_.rbc-btn-group:last-child_button]:!px-2.5
`;

export default function EventCalendarView() {
  const { events, setFilteredEvents } = useEventCalendar();
  const { openModal } = useModal();
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [selectedResort, setSelectedResort] = useState<Resort | null>(null);
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);
  const [filteredEvents, setFilteredEventsState] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    // Fetch the resorts from the API
    const fetchResorts = async () => {
      try {
        const response = await fetch(`${apiUrl}/resorts/view`);
        const data: Resort[] = await response.json();
        setResorts(data);

        // Convert the resorts to SelectOption format
        const options = data.map((resort) => ({
          label: resort.label,
          value: resort.resortIdentifier,
        }));
        setSelectOptions(options);

        if (data.length > 0) {
          setSelectedResort(data[0]); // Set the first resort as the default
        }

        // console.log('Fetched resorts:', data);
        // console.log('Select options:', options);
      } catch (error) {
        console.error('Error fetching resorts:', error);
      }
    };

    fetchResorts();
  }, []);

  useEffect(() => {
    // console.log('Selected resort:', selectedResort);
    // console.log('All events:', events);

    if (selectedResort) {
      const filtered = events.filter((event: CalendarEvent) => {
        // console.log('Event resortId:', event.resortId);
        // console.log('Selected resortIdentifier:', selectedResort.resortIdentifier);
        return event.resortIdentifier === selectedResort.resortIdentifier;
      });

      console.log('Filtered events:', filtered);
      setFilteredEventsState(filtered);
    } else {
      setFilteredEventsState([]);
      console.log('No resort selected, clearing events.');
    }
  }, [selectedResort, events]);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      // console.log('Slot selected:', { start, end });
      openModal({
        view: <EventForm startDate={start} endDate={end} resorts={resorts} />,
        customSize: '650px',
      });
    },
    [openModal, resorts]
  );

  const handleSelectEvent = useCallback(
    (event: CalendarEvent) => {
      // console.log('Event selected:', event);
      openModal({
        view: <DetailsEvents event={event} resorts={resorts} />,
        customSize: '500px',
      });
    },
    [openModal, resorts]
  );

  const { views, scrollToTime, formats } = useMemo(
    () => ({
      views: {
        month: true,
        week: true,
        day: true,
        agenda: true,
      },
      scrollToTime: new Date(2023, 10, 27, 6),
      formats: {
        dateFormat: 'D',
        weekdayFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'ddd', culture),
        dayFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'ddd M/D', culture),
        timeGutterFormat: (date: Date, culture: any, localizer: any) =>
          localizer.format(date, 'hh A', culture),
      },
    }),
    []
  );

  const handleResortChange = (option: SelectOption) => {
    const selected = resorts.find((resort: any) => resort.resortIdentifier === option.value) || null;
    setSelectedResort(selected);
    // console.log('Resort changed:', selected);
  };

  return (
    <div className="@container">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Select
            label="Select Resort"
            options={selectOptions}
            value={selectOptions.find((option: any) => option.value === selectedResort?.resortIdentifier) || null}
            onChange={handleResortChange}
            className="w-full lg:w-[400px]"
          />
        </div>
        <div className="flex items-center gap-3">
          <ExportButton
            data={eventData}
            fileName="event_data"
            header="ID,Title,Description,Location,Start,end"
          />
          <ModalButton
            label="Booking Enquiry"
            view={<EventForm resorts={resorts} />}
            customSize="900px"
            className="mt-0 w-full @lg:w-auto"
          />
        </div>
      </div>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        views={{ month: true, week: true, day: true, agenda: true }}
        startAccessor="start"
        endAccessor="end"
        dayLayoutAlgorithm="no-overlap"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={(event: CalendarEvent) => {
          // Check if the event status is 'confirmed' (case-insensitive)
          const backgroundColor = event.status?.toLowerCase() === 'confirmed' ? 'green' : 'default';
          return {
            style: {
              backgroundColor, // Apply green only if confirmed, else use default
              color: 'white',  // Ensure text remains visible with dark background
              borderRadius: '5px',
              border: 'none',
            },
          };
        }}
        className={cn('h-[650px] md:h-[1000px]', calendarToolbarClassName)}
      />

    </div>
  );
}