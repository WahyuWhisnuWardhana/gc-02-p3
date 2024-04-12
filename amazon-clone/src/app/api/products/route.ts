import { NextRequest, NextResponse } from "next/server";
import { ProductType, MyResponse } from "@/types";
import { paginationProduct } from "@/db/models/product";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  const limitNum: number = Number(limit) as number;
  const search = searchParams.get("search");
  const searchName: string = search?.toString() as string;

  const products = await paginationProduct(limitNum, searchName);

  return NextResponse.json<MyResponse<ProductType[]>>(
    {
      statusCode: 200,
      message: "Lists of all products users",
      data: products,
    },

    {
      status: 200,
    }
  );
};
