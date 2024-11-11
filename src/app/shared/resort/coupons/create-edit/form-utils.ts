import { CreateCouponInput } from "@/utils/validators/create-coupon.schema";

export function defaultValues(coupon?: CreateCouponInput) {
  return {
    couponString: '',
    discountValue: 0,
    discountUnit: 'percentage',
    minBookingValue: 0,
    maxDiscountValue: 0,
    validity: '', // Assuming this will be filled with a valid date string
    ...coupon,
  };
}
