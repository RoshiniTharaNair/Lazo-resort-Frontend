import { routes } from "@/config/routes";
import PageHeader from "@/app/shared/page-header";
import { metaObject } from "@/config/site.config";
import GuestDetails from "@/app/shared/resort/guests/product-details";

export const metadata = {
  ...metaObject("Guest Details"),
};

export default function GuestDetailsPage({ params }: any) {
  const pageHeader = {
    title: "Guest Details",
    breadcrumb: [
      {
        href: routes.resort.dashboard,
        name: "Lazo Resort Admin",
      },
      {
        href: routes.resort.guests,
        name: "Guests",
      },
      {
        name: params.slug,
      },
    ],
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      {/* <GuestDetails slug={params.slug} /> */}
    </>
  );
}
