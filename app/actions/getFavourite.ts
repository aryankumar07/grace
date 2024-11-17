"use server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentuser";
import { Listings } from "@prisma/client";

export default async function getFavourite() {
  try {
    const currentuser = await getCurrentUser();

    if (!currentuser) {
      return [];
    }

    const favourites = await prisma.listings.findMany({
      where: {
        id: {
          in: [...(currentuser.favouriteIds || [])],
        },
      },
    });

    const safeFav = favourites.map((favourite: Listings) => {
      return {
        ...favourite,
        createdAt: favourite.createdAt.toISOString(),
      };
    });

    return safeFav;
  } catch (error) {
    console.log(error);
  }
}
