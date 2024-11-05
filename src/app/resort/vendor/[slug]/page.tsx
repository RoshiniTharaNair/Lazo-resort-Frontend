import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import VendorDetails from '@/app/shared/resort/vendor/product-details';

export const metadata = {
  ...metaObject('Vendor Details'),
};

export default function VendorDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'Vendor Categories',
    breadcrumb: [
      {
        href: routes.resort.dashboard,
        name: 'Lazo resort Admin',
      },
      {
        href: routes.resort.createVendor,
        name: 'Vendors',
      },
      {
        name: params.slug,
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <VendorDetails />
    </>
  );
}
