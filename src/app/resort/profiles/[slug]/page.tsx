import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import ProfileDetails from '@/app/shared/resort/profiles/product-details';

export const metadata = {
  ...metaObject('Profile Details'),
};

export default function ProfileDetailsPage({ params }: { params: { slug: string } }) {
  const pageHeader = {
    title: 'Profile Details',
    breadcrumb: [
      {
        href: routes.resort.dashboard,
        name: 'Lazo Resort Admin',
      },
      {
        href: routes.resort.profiles,
        name: 'Profiles',
      },
      {
        name: params.slug,
      },
    ],
  };
  
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {/* <ProfileDetails slug={params.slug} /> */}
    </>
  );
}
