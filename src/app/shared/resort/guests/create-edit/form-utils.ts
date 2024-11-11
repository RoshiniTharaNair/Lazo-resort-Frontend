import { CreateGuestInput } from "@/utils/validators/create-guest.schema";

export function defaultValues(guest?: CreateGuestInput) {
  return {
    bookingIdentifier: 0,
    firstName: '',
    lastName: '',
    primaryGuest: false,
    age: null,
    ageGroup: 0,
    idType: '',
    idValue: '',
    idImage: '',
    comments: '',
    ...guest,
  };
}
