import { NextResponse } from "next/server";
import { ProductType, MyResponse } from "@/types";
import { findProductBySlug } from "@/db/models/product";

export const GET = async (
  _request: Request,
  { params }: { params: { slug: string } }
) => {
  const { slug } = params;
  const product = await findProductBySlug(slug);

  return NextResponse.json<MyResponse<ProductType>>(
    {
      statusCode: 200,
      message: "Product Found",
      data: product,
    },

    {
      status: 200,
    }
  );
};
