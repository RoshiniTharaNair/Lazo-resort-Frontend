import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import CreateEditEmployee from "@/app/shared/resort/employees/create-edit";

export const metadata = {
  ...metaObject("Create Employee"),
};

const pageHeader = {
  title: "Create Employee",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.createEmployee,
      name: "Employees",
    },
    {
      name: "Create",
    },
  ],
};

export default function CreateEmployeePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.resort.createEmployee}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Employee
          </Button>
        </Link>
      </PageHeader>

      <CreateEditEmployee />
    </>
  );
}
