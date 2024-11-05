import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import BookingDetails from '@/app/shared/resort/bookings/product-details';

export const metadata = {
  ...metaObject('Booking Details'),
};

export default function BookingDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'Booking Categories',
    breadcrumb: [
      {
        href: routes.resort.dashboard,
        name: 'Lazo resort Admin',
      },
      {
        href: routes.resort.createBooking,
        name: 'Bookings',
      },
      {
        name: params.slug,
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <BookingDetails />
    </>
  );
}
