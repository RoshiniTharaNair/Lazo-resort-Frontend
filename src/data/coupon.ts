export interface CouponType {
  couponString: string;
  discountValue: number;
  discountUnit: string;
  validity: string; // ISO date string
  minBookingValue: number;
  maxDiscountValue: number;
}
