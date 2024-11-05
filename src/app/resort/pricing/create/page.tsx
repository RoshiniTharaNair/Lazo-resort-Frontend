import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import CreateEditProduct from "@/app/shared/resort/product/create-edit";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import CreateEditPrice from "@/app/shared/resort/price/create-edit";

export const metadata = {
  ...metaObject("Create Pricing"),
};

const pageHeader = {
  title: "Create Pricing",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo resort admin",
    },
    {
      href: routes.resort.createpricing,
      name: "Pricing",
    },
    {
      name: "Create",
    },
  ],
};

export default function CreatePricingPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.resort.createRoom}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Pricing
          </Button>
        </Link>
      </PageHeader>

      <CreateEditPrice />
    </>
  );
}
