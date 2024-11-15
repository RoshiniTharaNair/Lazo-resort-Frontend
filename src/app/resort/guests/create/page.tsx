import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import CreateEditGuest from "@/app/shared/resort/guests/create-edit";
import { routes } from "@/config/routes";

export const metadata = {
  ...metaObject("Create Guest"),
};

const pageHeader = {
  title: "Create Guest",
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
      name: "Create",
    },
  ],
};

export default function CreateGuestPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.resort.createGuests}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          {/* <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Guest
          </Button> */}
        </Link>
      </PageHeader>

      <CreateEditGuest />
    </>
  );
}
