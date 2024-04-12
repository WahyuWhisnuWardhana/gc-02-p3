"use server";
import { findUserByEmail } from "@/db/models/user";
import { comparePassword } from "@/utils/bcrypt";
import { createToken } from "@/utils/jwt";
import { redirect } from "next/navigation";
import { z } from "zod";
import { cookies } from "next/headers";

export const loginHandler = async (formData: FormData) => {
  const loginInputSchema = z.object({
    email: z.string().trim().min(1, { message: "Required" }).email(),
    password: z.string().trim().min(1, { message: "Required" }),
  });

  const email = formData.get("email");
  const password = formData.get("password");

  const parsedData = loginInputSchema.safeParse({
    email,
    password,
  });

  if (!parsedData.success) {
    const errPath = parsedData.error.issues[0].path[0];
    const errMessage = parsedData.error.issues[0].message;
    const errFinalMessage = `${errPath} - ${errMessage}`;

    return redirect(`http://localhost:3000/login?error=${errFinalMessage}`);
  }

  const user = await findUserByEmail(parsedData.data.email);

  if (!user || !comparePassword(parsedData.data.password, user.password)) {
    const errFinalMessage = `Invalid email/password`;

    return redirect(`http://localhost:3000/login?error=${errFinalMessage}`);
  }

  const payload = {
    id: user._id,
    username: user.username,
    email: user.email,
  };

  const token = createToken(payload);

  cookies().set("token", token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 24 * 1000 * 60 * 60),
    sameSite: "strict",
  });

  return redirect(`http://localhost:3000`);
};
