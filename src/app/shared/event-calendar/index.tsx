'use client';

import type { CalendarEvent } from '@/types';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import EventForm from '@/app/shared/event-calendar/event-form';
import DetailsEvents from '@/app/shared/event-calendar/details-event';
import { useModal } from '@/app/shared/modal-views/use-modal';
import useEventCalendar from '@/hooks/use-event-calendar';
import ExportButton from '@/app/shared/export-button';
import ModalButton from '@/app/shared/modal-button';
import { Select } from 'rizzui';
import cn from '@/utils/class-names';
import { eventData } from '@/data/event-data';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const localizer = dayjsLocalizer(dayjs);

const calendarToolbarClassName =
  '[&_.rbc-toolbar_.rbc-toolbar-label]:whitespace-nowrap [&_.rbc-toolbar_.rbc-toolbar-label]:my-2 [&_.rbc-toolbar]:flex [&_.rbc-toolbar]:flex-col [&_.rbc-toolbar]:items-center @[56rem]:[&_.rbc-toolbar]:flex-row [&_.rbc-btn-group_button:hover]:bg-gray-300 [&_.rbc-btn-group_button]:duration-200 [&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-600 dark:[&_.rbc-btn-group_button.rbc-active:hover]:bg-gray-300 [&_.rbc-btn-group_button.rbc-active:hover]:text-gray-50 dark:[&_.rbc-btn-group_button.rbc-active:hover]:text-gray-900 [@media(max-width:375px)]:[&_.rbc-btn-group:last-child_button]:!px-2.5';

interface ResortOption {
  resortIdentifier: number;
  label: string;
}

export default function EventCalendarView() {
  const { events } = useEventCalendar();
  const { openModal } = useModal();
  const [resorts, setResorts] = useState<ResortOption[]>([]);
  const [selectedResort, setSelectedResort] = useState<ResortOption | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<CalendarEvent[]>(events);

  useEffect(() => {
    fetch(`${apiUrl}/resorts/view`)
      .then((res) => res.json())
      .then((data) => {
        const formattedResorts = data.map((resort: any) => ({
          value: resort.resortIdentifier,
          label: resort.label,
        }));
        setResorts(formattedResorts);
        if (formattedResorts.length > 0) {
          setSelectedResort(formattedResorts[0]);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedResort) {
      const newFilteredEvents = events.filter(event => event.resortIdentifier === selectedResort.resortIdentifier);
      setFilteredEvents(newFilteredEvents);
    } else {
      setFilteredEvents(events);
    }
  }, [selectedResort, events]);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      openModal({
        view: <EventForm startDate={start} endDate={end} resorts={resorts} />,
        customSize: '650px',
      });
    },
    [openModal, resorts]
  );

  const handleSelectEvent = useCallback(
    (event: CalendarEvent) => {
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

  return (
    <div className="@container">
      <div className="flex items-center justify-between mb-4">
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
      <div className="flex items-center gap-3 mb-4">
        <button className="rbc-btn">Today</button>
        <button className="rbc-btn">Back</button>
        <button className="rbc-btn">Next</button>
      </div>
      <Calendar
        localizer={localizer}
        events={filteredEvents}
        views={views}
        formats={formats}
        startAccessor="start"
        endAccessor="end"
        dayLayoutAlgorithm="no-overlap"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        className={cn('h-[650px] md:h-[1000px]', calendarToolbarClassName)}
      />
    </div>
  );
}
