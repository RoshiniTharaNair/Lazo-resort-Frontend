"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Element } from "react-scroll";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { Text } from "rizzui";
import cn from "@/utils/class-names";
import FormNav, {
  formParts,
} from "@/app/shared/resort/product/create-edit/form-nav";
import FormFooter from "@/components/form-footer";
import { useLayout } from "@/hooks/use-layout";
import { LAYOUT_OPTIONS } from "@/config/enums";
import EmployeeSummary from "@/app/shared/resort/employees/create-edit/employee-summary";
import {
  CreateEmployeeInput,
  employeeFormSchema,
} from "@/utils/validators/create-employee.schema";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
// import { EmployeeData } from "./form-utils";

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: EmployeeSummary,
};

interface IndexProps {
  slug?: string;
  className?: string;
  employee?: CreateEmployeeInput;
}

export default function CreateEditEmployees({
  slug,
  employee,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);

  const defaultValues = (employee?: CreateEmployeeInput): CreateEmployeeInput => {
    if (!employee) {
      return {
        emp_code: '',
        first_name: '',
        last_name: '',
        mid_name: '',
        disp_name: '',
        prim_contact: '',
        scnd_contact: '',
        emgncy_contact: '',
        prim_email: '',
        aadhar_code: '',
        pan_code: '',
        prmnt_address: '',
        geo: '',
        present_address: '',
        bgv_status: '',
        pfnum: '',
        dob: new Date().toISOString(),
        doj: new Date().toISOString(),
        username: '',
        passcode: '',
      };
    }

    return {
      ...employee,
    };
  };

  const methods = useForm<CreateEmployeeInput>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: defaultValues(employee),
  });

  const onSubmit: SubmitHandler<CreateEmployeeInput> = async (data) => {
    setLoading(true);
    try {
      const submitData = {
        ...data,
        geo: Number(data.geo),
      };

      const url = slug
        ? `${apiUrl}/employee/update/${slug}`
        : `${apiUrl}/employee/create`;

      const method = slug ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        toast.success(`Employee ${slug ? "updated" : "created"} successfully!`);
        methods.reset();
        if (slug) window.location.reload();
      } else {
        toast.error("Failed to create/update employee");
      }
    } catch (error) {
      console.error("API request failed", error);
      toast.error("Failed to create/update employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="@container">
      <FormNav
        className={cn(
          layout === LAYOUT_OPTIONS.BERYLLIUM && "z-[999] 2xl:top-[72px]"
        )}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            "relative z-[19] [&_label.block>span]:font-medium",
            className
          )}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? "Update Employee" : "Create Employee"}
          />
        </form>
      </FormProvider>
    </div>
  );
}
