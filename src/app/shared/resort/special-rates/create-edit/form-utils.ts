import { CreateVoidDateInput } from '@/utils/validators/create-void-date.schema';

export function defaultValues(voidDate?: CreateVoidDateInput) {
  return {
    voiddateIdentifier: voidDate?.voiddateIdentifier ?? '',
    resortIdentifier: voidDate?.resortIdentifier ?? '',
    voidDate: voidDate?.voidDate ?? '',
    voidMultiplier: voidDate?.voidMultiplier ?? '',
  };
}

export const voidDateData = {
  voiddateIdentifier: 1,
  resortIdentifier: 2,
  voidDate: "2024-06-21T00:00:00.000Z",
  voidMultiplier: 2,
};

export const menuItems = [
  {
    label: 'Summary',
    value: 'summary',
  },
];
