import { CreateEmployeeInput } from "@/utils/validators/create-employee.schema";

export function defaultValues(employee?: CreateEmployeeInput) {
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
    geo: 0,  // Assuming a default value of 0 or replace with an appropriate default if needed
    present_address: '',
    bgv_status: '',
    pfnum: '',
    dob: '',  // Assuming this will be filled with a valid date string
    doj: '',  // Assuming this will be filled with a valid date string
    username: '',
    passcode: '',
    ...employee,
  };
}
