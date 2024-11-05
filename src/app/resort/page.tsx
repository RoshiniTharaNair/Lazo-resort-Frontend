import ResortDashboard from '@/app/shared/resort/dashboard';
import { metaObject } from '@/config/site.config';
import { routes } from '@/config/routes';
import { Button } from 'rizzui';
import PageHeader from '@/app/shared/page-header';
import ChartWidgets from '@/app/shared/chart-widgets';

export const metadata = {
  ...metaObject('Lazo resort admin panel'),
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

export default function resortDashboardPage() {
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

      <ChartWidgets />
    </>
  );
}
