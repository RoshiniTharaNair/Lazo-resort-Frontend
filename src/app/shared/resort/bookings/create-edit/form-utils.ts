import { CreateBookingInput } from "@/utils/validators/create-booking.schema";

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

export function defaultValues(booking?: CreateBookingInput) {
  return {
    // Use appropriate default values based on the schema
    bookingIdentifier: 0,
    resortIdentifier: { label: "Select Resort", value: 0 },
    recDate: new Date(),
    empCode: '', // Assuming it's required and needs to be provided by the user
    customerIdentifier: { label: "Select Customer", value: 0 },
    vendorIdentifier: { label: "Select Vendor", value: 0 },
    transactionReference: '',
    paymentMode: '',
    base: 0,
    gst: 0,
    comments: '',
    checkInDate: new Date('2023-01-02'),
    checkOutDate: new Date('2023-01-02'),
    primaryContact: '',
    primaryEmail: '',
    specialRequest: '',
    // Override with provided booking values if available
    ...booking,
  };
}

export const BookingData: CreateBookingInput = {
  bookingIdentifier: 0,
  resortIdentifier: { label: "Select Resort", value: 0 },
  recDate: new Date(),
  empCode: '',
  customerIdentifier: { label: "Select Customer", value: 0 },
  vendorIdentifier: { label: "Select Vendor", value: 0 },
  transactionReference: '',
  paymentMode: '',
  base: 0,
  gst: 0,
  comments: '',
  checkInDate: new Date('2023-01-02'),
  checkOutDate: new Date('2023-01-02'),
  primaryContact: '',
  primaryEmail: '',
  specialRequest: '',
};

export const menuItems = [
  {
    label: "Summary",
    value: "summary",
  },
];
