import { NextResponse } from "next/server";
import { UserType, MyResponse } from "@/types";
import { findUserById } from "@/db/models/user";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const user = await findUserById(id);

  return NextResponse.json<MyResponse<UserType>>(
    {
      statusCode: 200,
      message: "User found",
      data: user,
    },

    {
      status: 200,
    }
  );
};
