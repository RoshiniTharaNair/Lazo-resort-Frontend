import { CreateMembershipInput } from "@/utils/validators/create-membership.schema";

export function defaultValues(membership?: CreateMembershipInput) {
  return {
    customerIdentifier: 0,
    resortIdentifier: 0,
    resortAny: "1", // Assuming this is a boolean or integer in string form
    purchaseDate: '',
    purchaseMode: '',
    purchasePoints: 0,
    flatDiscount: 0,
    cost: 0,
    validityStart: '', // Assuming this will be filled with a valid date string
    validityEnd: '', // Assuming this will be filled with a valid date string
    status: '',
    ...membership,
  };
}
