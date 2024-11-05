import { CreateInventoryInput } from "@/utils/validators/create-inventory.schema";
import isEmpty from "lodash/isEmpty";

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

export function defaultValues(inventory?: CreateInventoryInput) {
  return {
    inventoryIdentifier: inventory?.inventoryIdentifier ?? "",
    resortIdentifier: inventory?.resortIdentifier ?? "",
    effectiveDate: inventory?.effectiveDate ?? new Date().toISOString().slice(0, 10), // Defaults to today's date in YYYY-MM-DD format
    roomClass: inventory?.roomClass ?? "",
    avlCount: inventory?.avlCount ?? 0,
    maxOcc: inventory?.maxOcc ?? 1,
    basePrice: inventory?.basePrice ?? 0.00,
    basePoints: inventory?.basePoints ?? 0.00,
    gst: inventory?.gst ?? "",
    discount: inventory?.discount ?? ""
  };
}

export const inventoryData = {
  inventoryIdentifier: 1,
  resortIdentifier: 1,
  effectiveDate: "2024-01-01",
  roomClass: "Standard",
  avlCount: 10,
  maxOcc: 2,
  basePrice: 120.00,
  basePoints: 100.00,
  gst: "10%",
  discount: "5%"
};

export const menuItems = [
  {
    label: "Summary",
    value: "summary",
  },
];
