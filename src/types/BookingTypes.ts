import { CalendarEvent } from ".";

export interface ResortResponse {
  resort_id: number;
  room_categories: {
    room_category: string;
    max_occ: number;
    available_rooms: number;
    requested_rooms?: number;
    allocated_adults?: number;
    remaining_adults?: number;
    extraRoom?: boolean;
    bookingRoomIdentifier?: number;
    inventoryIdentifier?: number;
    numberOfRooms?: number;
    basePoints?: number;
    basePrice?: number;
    dates?: {
      date: string;
      available_rooms: number;
    }[];
  }[];
}

export interface RoomCategory {
  room_category: string;
  max_occ: number;
  dates: RoomDate[];
}

export interface RoomDate {
  date: string;
  available_rooms: number;
}

export interface GuestInfo {
    firstName: string;
    lastName: string;
    ageGroup: number;
    bookingIdentifier: number; // Ensure bookingIdentifier is included
  }

  export interface BookingEnquiryFormValues {
    requested_adults: number;
    requested_children: number;
    age_of_children: number[];
    checkin_dt: string;
    checkout_dt: string;
    resort_id?: number;
    geo_id?: number;
    requested_rooms: Record<string, number>; // Keyed by room category
    guests?: GuestInfo[]; // Include guests for extension form
  }

export interface BookingConfirmationResponse {
  resort: {
    totalPricewithGst: number;
    room_categories: RoomCategoryConfirmation[];
  };
}

export interface RoomCategoryConfirmation {
  room_category: string;
  max_occupancy: number;
  requested_rooms: number;
  available_rooms: number;
  basePrice: number;
  basePoints: number;
  inventoryIdentifier: number;
  dates: RoomDateConfirmation[];
}

export interface RoomDateConfirmation {
  date: string;
  available_rooms: number;
  multiplier: number;
  dayPoints: number;
  dayPrice: number;
}

export interface BookingEnquiryResponse {
  requested_adults: number;
  requested_children: number;
  age_of_children: number[];
  number_of_rooms: number;
  checkin_dt: string;
  checkout_dt: string;
  resorts: {
    resort_id: number;
    room_categories: {
      room_category: string;
      max_occ: number;
      available_rooms: number;
      dates?: {
        date: string;
        available_rooms: number;
      }[];
    }[];
  }[];
}

export interface BookingEnquiryExtensionResponse {
  requested_adults: number;
  requested_children: number;
  age_of_children: number[];
  checkin_dt: string;
  checkout_dt: string;
  resort: {
    resort_id: number;
    room_categories: {
      room_category: string;
      max_occ: number;
      requested_rooms: number;
      available_rooms: number;
      allocated_adults: number;
      remaining_adults: number;
      extraRoom: boolean;
      bookingRoomIdentifier: number;
      inventoryIdentifier: number;
      numberOfRooms: number;
      basePoints: number;
      basePrice: number;
      dates?: {
        date: string;
        available_rooms: number;
        multiplier?: number;
        dayPoints?: number;
        dayPrice?: number;
      }[];
    }[];
  };
  canBook: boolean;
  bookingIdentifier: number;
}

export interface BookingEnquiryFormValues {
  requested_adults: number;
  requested_children: number;
  age_of_children: number[];
  checkin_dt: string;
  checkout_dt: string;
  resort_id?: number;
  geo_id?: number;
  requested_rooms: Record<string, number>; // Keyed by room category
}

export interface BookingEnquiryExtensionFormValues
  extends BookingEnquiryFormValues {
  guests?: GuestInfo[]; // Include guests for extension form
}

export interface CreateEventProps {
  startDate?: Date;
  endDate?: Date;
  event?: CalendarEvent;
  resorts: { resortIdentifier: number; label: string }[];
}

export interface GeoLocation {
  geoLocationIdentifier: number;
  country: string;
  postalCode: string;
  city: string;
  state: string;
  district: string;
  town: string;
  createdAt: string;
  updatedAt: string;
}

export interface Resort {
  resortIdentifier: number;
  label: string;
}

export interface EventFormInput {
  checkin_dt: Date;
  checkout_dt: Date;
  number_of_adults: number;
  number_of_children: number;
  number_of_rooms: number;
  age_of_children: string;
  resortIdentifier?: number;
  geoIdentifier?: number;
}

export interface BookingEnquiryFormValuesWithoutGuests
  extends Omit<BookingEnquiryFormValues, "guests"> {}
