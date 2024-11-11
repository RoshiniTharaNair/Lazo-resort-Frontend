import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { metaObject } from "@/config/site.config";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import CreateEditProfile from "@/app/shared/resort/profiles/create-edit";
import { routes } from "@/config/routes";

export const metadata = {
  ...metaObject("Create Profile"),
};

const pageHeader = {
  title: "Create Profile",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.profiles,
      name: "Profiles",
    },
    {
      name: "Create",
    },
  ],
};

export default function CreateProfilePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.resort.createProfiles}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Profile
          </Button>
        </Link>
      </PageHeader>

      <CreateEditProfile />
    </>
  );
}
