import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import { metaObject } from '@/config/site.config';
import EmployeeDetails from '@/app/shared/resort/employees/product-details';

export const metadata = {
  ...metaObject('Employee Details'),
};

export default function EmployeeDetailsPage({ params }: any) {
  const pageHeader = {
    title: 'Employee Details',
    breadcrumb: [
      {
        href: routes.resort.dashboard,
        name: 'Lazo Resort Admin',
      },
      {
        href: routes.resort.createEmployee,
        name: 'Employees',
      },
      {
        name: params.slug,
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <EmployeeDetails />
    </>
  );
}
