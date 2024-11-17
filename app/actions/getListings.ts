import prisma from "db";

export interface IListingParams {
  userId?: string | undefined;
  guestCount?: number | undefined;
  roomCount?: number | undefined;
  bathroomCount?: number | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
  locationValue?: string | undefined;
  category?: string | undefined;
}

export default async function getListings(params: any) {
  try {
    console.log(` in the getlisting ${params.category}`);

    const {
      userId,
      guestCount,
      roomCount,
      bathroomCount,
      startDate,
      endDate,
      locationValue,
      category,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      query.loactionValue = locationValue;
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const listing = await prisma.listings.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeListing = listing.map((listing) => {
      return {
        ...listing,
        createdAt: listing.createdAt.toISOString(),
      };
    });
    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
