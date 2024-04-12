import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readPayloadJose } from "./utils/jwt";

export const middleware = async (request: NextRequest) => {
  if (request.url.includes(`/api/wishlists`)) {
    const cookiesStore = cookies();
    const token = cookiesStore.get("token");

    if (!token) {
      return NextResponse.json({
        statusCode: 401,
        error: "Unauthorized",
      });
    }

    const tokenData = await readPayloadJose<{
      id: string;
      email: string;
      username: string;
    }>(token.value);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", tokenData.id);
    requestHeaders.set("x-user-email", tokenData.email);
    requestHeaders.set("x-user-username", tokenData.username);

    return NextResponse.next({
      headers: requestHeaders,
    });
  }

  return NextResponse.next();
};
