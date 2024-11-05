import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProductDetails from '@/app/shared/resort/product/product-details';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Product Details'),
};

export default function ProductDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'Room Categories',
    breadcrumb: [
      {
        href: routes.resort.createRoom,
        name: 'Lazo resort Admin',
      },
      {
        href: routes.resort.createRoom,
        name: 'Rooms',
      },
      {
        name: params.slug,
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProductDetails />
    </>
  );
}
