export interface MembershipType {
    membershipIdentifier?: number;
    customerIdentifier: number;
    resortIdentifier: number;
    resortAny: string; // Assuming this is stored as a string in the DB
    purchaseDate: string; // ISO date string
    purchaseMode: string;
    purchasePoints: number;
    flatDiscount: number;
    cost: number;
    validityStart: string; // ISO date string
    validityEnd: string; // ISO date string
    status: string;
  }
  