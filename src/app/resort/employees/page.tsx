"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Metadata } from "next";
import { PiPlusBold } from "react-icons/pi";
import { routes } from "@/config/routes";
import { Button, Drawer } from "rizzui";
import PageHeader from "@/app/shared/page-header";
import ExportButton from "@/app/shared/export-button";
import EmployeesTable from "@/app/shared/resort/employees/product-list/table";
import { defaultValues } from "@/app/shared/resort/employees/create-edit/form-utils";
import { useForm, FormProvider } from "react-hook-form";
import { EmployeeForm } from "@/app/shared/resort/employees/create-edit/employee-form";
import { CreateEmployeeInput } from "@/utils/validators/create-employee.schema";
import { Loader } from "rizzui";
import toast from "react-hot-toast";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const metadata: Metadata = {
  title: "Employees | Lazo Resort Admin",
};

const pageHeader = {
  title: "Employees",
  breadcrumb: [
    {
      href: routes.resort.dashboard,
      name: "Lazo Resort Admin",
    },
    {
      href: routes.resort.employees,
      name: "Employees",
    },
    {
      name: "List",
    },
  ],
};

export default function EmployeePage() {
  const [selectedEmployee, setSelectedEmployee] = useState<
    CreateEmployeeInput | undefined
  >(undefined);
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const methods = useForm({
    defaultValues: defaultValues(),
  });

  const toggleDrawer = (employee?: CreateEmployeeInput) => {
    setIsEditMode(!!employee);
    setSelectedEmployee(employee);
    setIsDrawerOpen(true);
  };

  const handleFormSubmit = async (data: CreateEmployeeInput) => {
    console.log("Form Data Submitted:", data); // Debugging log
    try {
        const url = isEditMode
            ? `${apiUrl}/employee/update/${data.emp_code}`
            : `${apiUrl}/employee/create/`;
        const method = isEditMode ? "PUT" : "POST";
        
        console.log(`API URL: ${url}, Method: ${method}`); // Debugging log

        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error("Error Response:", errorMessage); // Log the error response
            throw new Error("Network response was not ok");
        }

        setIsDrawerOpen(false);
        fetchEmployees(); // Refresh the employees list
        toast.success(`Employee ${isEditMode ? "updated" : "created"} successfully!`);
    } catch (error) {
        console.error("Failed to update employee:", error);
        toast.error(`Failed to ${isEditMode ? "update" : "create"} employee.`);
    }
};

  const fetchEmployees = async () => {
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/employee/view`);
    if (response.ok) {
      const data = await response.json();
      setEmployees(data);
      setIsLoading(false);
    } else {
      console.error("Failed to fetch employees");
      toast.error("Failed to load employees.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <ExportButton
            data={employees}
            fileName="Employees"
            header="emp_code,first_name,last_name,mid_name,disp_name,prim_contact,prim_email,geo,username"
          />
          <Button onClick={() => toggleDrawer()} className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Employee
          </Button>
        </div>
      </PageHeader>
      {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <Loader variant="spinner" />
        </div>
      ) : (
        <EmployeesTable data={employees} onEditToggle={toggleDrawer} />
      )}
      <FormProvider {...methods}>
        <Drawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          size="xl"
          overlayClassName="dark:bg-opacity-40 dark p-4 overflow-auto max-h-[calc(100vh-4rem)]"
          containerClassName="dark:bg-gray-100"
          className="z-[9999]"
        >
          <div className="p-6 overflow-auto max-h-[calc(100vh-4rem)]">
            <h2 className="text-lg font-semibold mb-4">
              {isEditMode ? "Update" : "Create"} Employee
            </h2>
            <EmployeeForm
              employee={selectedEmployee}
              onSubmit={handleFormSubmit}
              isEditMode={isEditMode}
            />
          </div>
        </Drawer>
      </FormProvider>
    </>
  );
}
