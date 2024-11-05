'use client';

import ExportButton from '@/app/shared/export-button';
import ModalButton from '@/app/shared/modal-button';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import { eventData } from '@/data/event-data';
import EventForm from '@/app/shared/event-calendar/event-form';
import { useState, useEffect } from 'react';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const pageHeader = {
  title: 'Event Calendar',
  breadcrumb: [
    {
      href: routes.file.dashboard,
      name: 'Home',
    },
    {
      href: routes.eventCalendar,
      name: 'Event Calendar',
    },
  ],
};

function EventPageHeader() {
  const [resorts, setResorts] = useState<{ resortIdentifier: number; label: string }[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/resorts/view`)
      .then((res) => res.json())
      .then((data) => {
        const formattedResorts = data.map((resort: any) => ({
          value: resort.resortIdentifier,
          label: resort.label,
        }));
        setResorts(formattedResorts);
      });
  }, []);

  return (
    <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
      <div className="mt-4 flex items-center gap-3 @lg:mt-0">
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
    </PageHeader>
  );
}

export default EventPageHeader;
