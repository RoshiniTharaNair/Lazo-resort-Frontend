import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import CreateEditVoidDate from "@/app/shared/resort/special-rates/create-edit"; // Updated import

export const metadata = {
  ...metaObject("Create Special Rates"),
};

const pageHeader = {
  title: "Create Special Rates",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.voidDate,
      name: "Special Rates",
    },
    {
      name: "Create",
    },
  ],
};

export default function CreateVoidDatePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.resort.voidDate}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Special Rates
          </Button>
        </Link>
      </PageHeader>

      <CreateEditVoidDate />
    </>
  );
}
