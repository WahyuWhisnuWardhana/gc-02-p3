import { NextResponse } from "next/server";
import { WishlistType, MyResponse } from "@/types";
import { deleteWishlist } from "@/db/models/wishlist";

export const DELETE = async (
  _request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  await deleteWishlist(id);

  return NextResponse.json<MyResponse<WishlistType>>(
    {
      statusCode: 200,
      message: "Wishlist Deleted",
    },
    {
      status: 200,
    }
  );
};
