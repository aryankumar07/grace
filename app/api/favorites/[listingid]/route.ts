import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentuser";
import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request,
  { params }: { params: { listingid: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { listingid } = params;

    if (!listingid || typeof listingid !== "string") {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    const favouriteIds = [...(currentUser.favouriteIds || [])];
    favouriteIds.push(listingid);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favouriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[FAVORITES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { listingid: string } }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { listingid } = params;

    if (!listingid || typeof listingid !== "string") {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    let favouriteIds = [...(currentUser.favouriteIds || [])];
    favouriteIds = favouriteIds.filter((id) => id !== listingid);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favouriteIds,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[FAVORITES_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
