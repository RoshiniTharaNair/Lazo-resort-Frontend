import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import MembershipDetails from '@/app/shared/resort/memberships/product-details';

export const metadata = {
  ...metaObject('Membership Details'),
};

export default function MembershipDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'Membership Details',
    breadcrumb: [
      {
        href: routes.resort.dashboard,
        name: 'Lazo Resort Admin',
      },
      {
        href: routes.resort.memberships,
        name: 'Memberships',
      },
      {
        name: params.slug,
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <MembershipDetails />
    </>
  );
}
