import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentuser";
import prisma from "@/app/libs/prismadb"


interface Iparams {
    listingid : string
}

export async function POST(
    request : Request,
    {params} : {params : Iparams}
){

    const currentUser = await getCurrentUser();

    const { listingid } = params;

    if(!listingid || typeof listingid !== 'string'){
        throw new Error('Invalid ID')
    }

    const favouriteIds = [...(currentUser?.favouriteIds || [])];

    favouriteIds.push(listingid);

    const user = await prisma.user.update({
        where : {
            id : currentUser?.id
        },
        data : {
            favouriteIds
        }
    })

    return NextResponse.json(user)
}


export async function DELETE(
    request: Request,
    { params }: { params: Iparams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingid } = params;

  if (!listingid || typeof listingid !== "string") {
    throw new Error("Invalid ID");
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
}