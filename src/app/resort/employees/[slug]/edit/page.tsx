"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import PageHeader from "@/app/shared/page-header";
import { Button } from "rizzui";
import { routes } from "@/config/routes";
import toast from "react-hot-toast";
import CreateEditEmployee from "@/app/shared/resort/employees/create-edit";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type IdentifierType = string | { label: string; value: string };

interface EmployeeData {
  emp_code: string;
  first_name: string;
  last_name: string;
  mid_name?: string;
  disp_name: string; // Ensure disp_name is not optional
  prim_contact: string;
  scnd_contact?: string;
  emgncy_contact?: string;
  prim_email: string;
  aadhar_code?: string;
  pan_code?: string;
  prmnt_address?: string;
  geo?: string;
  present_address?: string;
  bgv_status?: string;
  pfnum?: string;
  dob?: Date;
  doj?: Date;
  username: string;
  passcode: string;
}

// Default values for creating new employees or handling uninitialized states
const defaultEmployeeData: EmployeeData = {
  emp_code: '',
  first_name: '',
  last_name: '',
  disp_name: '', // Ensure disp_name is initialized with an empty string
  prim_contact: '',
  prim_email: '',
  username: '',
  passcode: '',
};

type Props = {
  params: { slug: string };
};

const metadata: Metadata = {
  title: "Employee | Lazo Resort Admin",
};

const pageHeader = {
  title: "Edit Employee",
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
      name: "Edit",
    },
  ],
};

export default function EditEmployeePage({
  params,
}: {
  params: { slug: string };
}) {
  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/employee/update/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setEmployee({
            ...defaultEmployeeData,
            ...data,
            disp_name: data.disp_name || '', // Ensure disp_name is never undefined
          });
        } else {
          console.error("Failed to fetch employee data");
        }
      } catch (error) {
        console.error("Failed to fetch employee data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);

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

      {/* {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CreateEditEmployee slug={params.slug} employee={employee ?? defaultEmployeeData} />
      )} */}
    </>
  );
}
