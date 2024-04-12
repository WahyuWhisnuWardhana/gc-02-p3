import { redirect } from "next/navigation";
import { MyResponse } from "@/types";
export const registerHandler = async (formData: FormData) => {
  "use server";
  const response = await fetch(process.env.BASE_URL + "/api/users", {
    method: "POST",
    body: JSON.stringify({
      name: formData.get("name"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson: MyResponse<unknown> = await response.json();

  if (!response.ok) {
    let message = responseJson.error ?? "Internal Server Error";

    return redirect(`/register?error=${message}`);
  }

  return redirect("/login");
};
