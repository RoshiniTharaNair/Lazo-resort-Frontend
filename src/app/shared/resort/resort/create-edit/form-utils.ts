import { CreateVendorInput } from "@/utils/validators/create-vendor.schema";

export const customFields = [
  {
    label: "",
    value: "",
  },
];
export const locationShipping = [
  {
    name: "",
    shippingCharge: "",
  },
];
export const productVariants = [
  {
    label: "",
    value: "",
  },
];

export function defaultValues(vendor?: CreateVendorInput) {
  return {
    label: vendor?.label ?? "",
    dash_url: vendor?.dash_url ?? "",
  };
}

export const VendorData = {
  label: "",
  dash_url: "",
};

export const menuItems = [
  {
    label: "Summary",
    value: "summary",
  },
];
