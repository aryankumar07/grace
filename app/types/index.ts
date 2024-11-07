import { User, Listings, Reservations } from "@prisma/client";


export type SafeUser = Omit<
User,
'createdAt' | 'updatedAt' | 'emailVerified'
> & {
    createdAt : string;
    updatedAt : string;
    emailVerified : string | null;
}

export type SafeListing = Omit<
Listings,
'createdAt'
> & {
    createdAt : string
}

export type SafeReservations = Omit<
  Reservations,
  "createdAt" | "startDate" | "endDate" | "listings"
> & {
  createdAt: string;
  startDate: string;
  endDate : string,
  listings : SafeListing
};