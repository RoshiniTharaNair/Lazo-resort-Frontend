import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import CreateEditInventory from "@/app/shared/resort/inventory/create-edit";

export const metadata = {
  ...metaObject("Create Inventories"),
};

const pageHeader = {
  title: "Create Inventories",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo resort admin",
    },
    {
      href: routes.resort.createInventory,
      name: "Inventories",
    },
    {
      name: "Create",
    },
  ],
};

export default function CreateInventoriesPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.resort.createInventory}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Inventories
          </Button>
        </Link>
      </PageHeader>

      <CreateEditInventory />
    </>
  );
}
