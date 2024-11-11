import { CreateProfileInput } from "@/utils/validators/create-profile.schema";

export function defaultValues(profile?: CreateProfileInput) {
  return {
    customerIdentifier: profile?.customerIdentifier ?? undefined,
    firstname: profile?.firstname ?? '',
    lastname: profile?.lastname ?? '',
    middlename: profile?.middlename ?? '',
    primarycontact: profile?.primarycontact ?? '',
    secondarycontact: profile?.secondarycontact ?? '',
    primaryemail: profile?.primaryemail ?? '',
    username: profile?.username ?? '',
    passcode: profile?.passcode ?? '',
    dob: profile?.dob ?? new Date().toISOString(),
    geoLocationIdentifier: profile?.geoLocationIdentifier ?? null,
  };
}
