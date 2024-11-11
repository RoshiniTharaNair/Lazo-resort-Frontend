export interface GuestType {
  bookingIdentifier: number;
  firstName: string;
  lastName: string | null;
  primaryGuest: boolean | null;
  age: number | null;
  ageGroup: number;
  idType: string | null;
  idValue: string | null;
  idImage: string | null;
  comments: string | null;
}
