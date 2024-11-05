import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import CreateEditBooking from "@/app/shared/resort/bookings/create-edit";

export const metadata = {
  ...metaObject("Create Bookings"),
};

const pageHeader = {
  title: "Create Bookings",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo resort admin",
    },
    {
      href: routes.resort.createBooking,
      name: "Bookings",
    },
    {
      name: "Create",
    },
  ],
};

export default function CreateBookingsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.resort.createBooking}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Bookings
          </Button>
        </Link>
      </PageHeader>

      <CreateEditBooking />
    </>
  );
}
