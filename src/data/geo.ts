export type GeoLocationType = {
    geoLocationIdentifier: string;
    country: string;
    postalCode: string;
    state: string;
    city: string;
    district?: string;
    town?: string;
  };
  
  export const GeoLocationData: GeoLocationType[] = [
    {
      geoLocationIdentifier: "GEO001",
      country: "India",
      postalCode: "110001",
      state: "Delhi",
      city: "New Delhi",
      district: "Central Delhi",
      town: "Connaught Place"
    },
    {
      geoLocationIdentifier: "GEO002",
      country: "India",
      postalCode: "400001",
      state: "Maharashtra",
      city: "Mumbai",
      district: "South Mumbai",
      town: "Colaba"
    },
    {
      geoLocationIdentifier: "GEO003",
      country: "India",
      postalCode: "560001",
      state: "Karnataka",
      city: "Bangalore",
      district: "Bangalore South",
      town: "MG Road"
    },
    {
      geoLocationIdentifier: "GEO004",
      country: "India",
      postalCode: "600001",
      state: "Tamil Nadu",
      city: "Chennai",
      district: "Central Chennai",
      town: "Parry’s Corner"
    },
    {
      geoLocationIdentifier: "GEO005",
      country: "India",
      postalCode: "500001",
      state: "Telangana",
      city: "Hyderabad",
      district: "Central Hyderabad",
      town: "Abids"
    },
    {
      geoLocationIdentifier: "GEO006",
      country: "India",
      postalCode: "700001",
      state: "West Bengal",
      city: "Kolkata",
      district: "Central Kolkata",
      town: "B.B.D. Bagh"
    },
    {
      geoLocationIdentifier: "GEO007",
      country: "India",
      postalCode: "380001",
      state: "Gujarat",
      city: "Ahmedabad",
      district: "Central Ahmedabad",
      town: "Ellisbridge"
    },
    {
      geoLocationIdentifier: "GEO008",
      country: "India",
      postalCode: "110020",
      state: "Delhi",
      city: "New Delhi",
      district: "South Delhi",
      town: "Saket"
    },
    {
      geoLocationIdentifier: "GEO009",
      country: "India",
      postalCode: "462001",
      state: "Madhya Pradesh",
      city: "Bhopal",
      district: "Bhopal District",
      town: "Arera Colony"
    },
    {
      geoLocationIdentifier: "GEO010",
      country: "India",
      postalCode: "302001",
      state: "Rajasthan",
      city: "Jaipur",
      district: "Jaipur District",
      town: "C Scheme"
    }
  ];
  