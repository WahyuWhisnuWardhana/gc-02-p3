import { NextRequest, NextResponse } from "next/server";
import { WishlistType, MyResponse } from "@/types";
import {
  PayloadAddWishlist,
  addWishlist,
  findDuplicateWish,
  findWishlistsById,
} from "@/db/models/wishlist";
import { ObjectId } from "mongodb";

export const GET = async (request: NextRequest) => {
  const id = request.headers.get("x-user-id") as string;
  const userId = new ObjectId(id);
  const wishlists = await findWishlistsById(userId);

  return NextResponse.json<MyResponse<WishlistType[]>>(
    {
      statusCode: 200,
      message:
        wishlists.length > 0
          ? "Lists of all Wishlisted Products"
          : "There are no Wishlisted Products yet",
      data: wishlists,
    },

    {
      status: 200,
    }
  );
};

export const POST = async (request: NextRequest) => {
  const id = request.headers.get("x-user-id") as string;
  const data = await request.json();

  const payload: PayloadAddWishlist = {
    ...data,
    userId: new ObjectId(id),
    productId: new ObjectId(data.productId),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const duplicate = await findDuplicateWish(id, data.productId);
  if (duplicate) {
    return NextResponse.json<MyResponse<never>>(
      {
        statusCode: 400,
        error: "You already wishlist this item",
      },
      {
        status: 400,
      }
    );
  }
  const newUser = await addWishlist(payload);

  return NextResponse.json<MyResponse<WishlistType>>(
    {
      statusCode: 201,
      message: "Wishlist Added",

      data: newUser as WishlistType,
    },
    {
      status: 201,
    }
  );
};
