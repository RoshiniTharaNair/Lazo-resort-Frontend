import { CreatePriceInput } from '@/utils/validators/create-price.schema';
import { CreateProductInput } from '@/utils/validators/create-product.schema';
import isEmpty from 'lodash/isEmpty';

export const customFields = [
  {
    label: '',
    value: '',
  },
];
export const locationShipping = [
  {
    name: '',
    shippingCharge: '',
  },
];
export const productVariants = [
  {
    label: '',
    value: '',
  },
];

export function defaultValues(price?: CreatePriceInput) {
  return {
    id: price?.id ?? '',
    pricingIdentifier: price?.pricingIdentifier ?? '',
    price:price?.price ?? '',
    resortIdentifier: price?.resortIdentifier ?? ''
  };
}

export const priceData = {
  id: 1,
  pricingIdentifier: 13,
  price: 222,
  resortIdentifier: 2,
};

export const menuItems = [
  {
    label: 'Summary',
    value: 'summary',
  }
];
