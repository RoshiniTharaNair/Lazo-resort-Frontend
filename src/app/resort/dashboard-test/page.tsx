"use client";

import { useState, useEffect } from 'react';
import { routes } from '@/config/routes';
import { Button, Select } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ChartWidgets from '@/app/shared/chart-widgets';
import { metaObject } from '@/config/site.config';
import { Resort } from '@/types/BookingTypes';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const metadata = {
  ...metaObject('Charts'),
};

const pageHeader = {
  title: 'Charts',
  breadcrumb: [
    {
      href: routes.eCommerce.dashboard,
      name: 'Home',
    },
    {
      name: 'Widgets',
    },
    {
      name: 'Charts',
    },
  ],
};

export default function ChartsPage() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [selectedResort, setSelectedResort] = useState<Resort | null>(null);
  const [selectOptions, setSelectOptions] = useState<{ label: string; value: number; }[]>([]);

  useEffect(() => {
    // Fetch the resorts from the API
    const fetchResorts = async () => {
      try {
        const response = await fetch(`${apiUrl}/resorts/view`);
        const data: Resort[] = await response.json();
        setResorts(data);

        const options = data.map((resort) => ({
          label: resort.label,
          value: resort.resortIdentifier,
        }));
        setSelectOptions(options);

        if (data.length > 0) {
          setSelectedResort(data[0]);
        }
      } catch (error) {
        console.error('Error fetching resorts:', error);
      }
    };

    fetchResorts();
  }, []);

  const handleResortChange = (option: { label: string; value: number; }) => {
    const selected = resorts.find((resort) => resort.resortIdentifier === option.value) || null;
    setSelectedResort(selected);
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <a
            target="_blank"
            href="https://recharts.org/en-US"
            rel="nofollow noopener noreferrer"
            className="inline-flex w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              Learn More
            </Button>
          </a>
        </div>
      </PageHeader>

      <div className="flex justify-center space-x-4 mb-4">
        <Select
          label="Select Resort"
          options={selectOptions}
          value={selectOptions.find((option) => option.value === selectedResort?.resortIdentifier) || null}
          onChange={handleResortChange}
          className="w-full lg:w-auto"
        />
      </div>

      <ChartWidgets selectedResort={selectedResort} />
    </>
  );
}