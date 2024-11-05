import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import InventoryDetails from '@/app/shared/resort/inventory/product-details';

export const metadata = {
  ...metaObject('Inventory Details'),
};

export default function ProductDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'Inventory Categories',
    breadcrumb: [
      {
        href: routes.resort.createRoom,
        name: 'Lazo resort Admin',
      },
      {
        href: routes.resort.createInventory,
        name: 'Inventories',
      },
      {
        name: params.slug,
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <InventoryDetails />
    </>
  );
}
