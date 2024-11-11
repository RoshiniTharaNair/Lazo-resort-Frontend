import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import VoidDateDetails from '@/app/shared/resort/special-rates/product-details'; // Updated import
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Special Rates Details'),
};

export default function VoidDateDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'Special Rates Details',
    breadcrumb: [
      {
        href: routes.resort.dashboard,
        name: 'Lazo Resort Admin',
      },
      {
        href: routes.resort.voidDate,
        name: 'Special Rates',
      },
      {
        name: params.slug,
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <VoidDateDetails />
    </>
  );
}
