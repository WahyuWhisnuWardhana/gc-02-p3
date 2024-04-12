import { NextResponse } from "next/server";
import { UserType, MyResponse } from "@/types";
import {
  findAllUsers,
  findUserByEmail,
  findUserByUsername,
} from "@/db/models/user";
import { createUser } from "@/db/models/user";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().trim().min(1, { message: "Required" }).optional(),
  username: z.string().trim().min(1, { message: "Required" }),
  email: z.string().trim().min(1, { message: "Required" }).email(),
  password: z
    .string()
    .trim()
    .min(5, { message: "Password must contain at least 5 characters" }),
});

export const GET = async () => {
  const users = await findAllUsers();

  return NextResponse.json<MyResponse<UserType[]>>(
    {
      statusCode: 200,
      message: "Lists of all registered users",
      data: users,
    },

    {
      status: 200,
    }
  );
};

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    const parsedData = registerSchema.safeParse(data);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const duplicateUsername = await findUserByUsername(
      parsedData.data.username
    );
    if (duplicateUsername) {
      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: "username - Username is already taken",
        },
        {
          status: 400,
        }
      );
    }

    const duplicateMail = await findUserByEmail(parsedData.data.email);
    if (duplicateMail) {
      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: "email - Email is already taken",
        },
        {
          status: 400,
        }
      );
    }

    const newUser = await createUser(parsedData.data);

    return NextResponse.json<MyResponse<UserType>>(
      {
        statusCode: 201,
        message: "Amazing account successfully created",

        data: newUser as UserType,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      const errPath = error.issues[0].path[0];
      const errMessage = error.issues[0].message;

      return NextResponse.json<MyResponse<never>>(
        {
          statusCode: 400,
          error: `${errPath} - ${errMessage}`,
        },
        {
          status: 400,
        }
      );
    }
  }
};
