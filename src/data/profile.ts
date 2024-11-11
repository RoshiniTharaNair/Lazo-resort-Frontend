export interface ProfileType {
  firstname: string;
  lastname: string;
  middlename?: string;
  primarycontact: string;
  secondarycontact?: string;
  primaryemail: string;
  dob?: string;
  geoLocationIdentifier?: number | { value: number; label: string } | null;
  username: string;
  passcode: string;
  customerIdentifier?: number;
}
