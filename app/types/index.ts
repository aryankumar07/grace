import { User, Listings } from "@prisma/client";


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