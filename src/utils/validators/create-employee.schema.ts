import { z } from "zod";

export const employeeFormSchema = z.object({
  emp_code: z.string().min(1, "Employee Code is required"),
  first_name: z.string().min(1, "First Name is required"),
  mid_name: z.string().min(1, "Middle Name is required").optional(), // Updated to optional if it's not always required
  last_name: z.string().min(1, "Last Name is required"),
  disp_name: z.string().min(1, "Display Name is required"),
  prim_contact: z.string().min(1, "Primary Contact is required"),
  scnd_contact: z.string().optional(), // Optional if not always required
  emgncy_contact: z.string().optional(), // Optional if not always required
  prim_email: z.string().min(1, "Primary Email is required").email("Invalid email address"),
  aadhar_code: z.string().optional(), // Optional if not always required
  pan_code: z.string().optional(), // Optional if not always required
  prmnt_address: z.string().optional(), // Optional if not always required
  present_address: z.string().optional(), // Optional if not always required
  geo: z.string().optional(), // Optional if not always required
  bgv_status: z.string().optional(), // Optional if not always required
  pfnum: z.string().optional(), // Optional if not always required
  dob: z.string().optional(), // Optional if the date of birth is not always required
  doj: z.string().optional(), // Optional if the date of joining is not always required
  username: z.string().min(1, "Username is required"),
  passcode: z.string().min(1, "Passcode is required"),
});

export type CreateEmployeeInput = z.infer<typeof employeeFormSchema>;
