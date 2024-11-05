import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import CreateEditVendor from "@/app/shared/resort/vendor/create-edit";

export const metadata = {
  ...metaObject("Create Vendors"),
};

const pageHeader = {
  title: "Create Vendors",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo resort admin",
    },
    {
      href: routes.resort.createVendor,
      name: "Vendors",
    },
    {
      name: "Create",
    },
  ],
};

export default function CreateVendorsPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.resort.createVendor}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Vendors
          </Button>
        </Link>
      </PageHeader>

      <CreateEditVendor />
    </>
  );
}
