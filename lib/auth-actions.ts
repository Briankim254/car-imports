"use server";

import { login } from "@/auth";
import prisma from "@/prisma/prisma";

export async function authenticate(formData: FormData) {
  try {
    const loginData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const payload = loginData;

    const res = await prisma.user.findFirst({
      where: {
        email: payload.email,
        password: payload.password,
      },
    });

    if (!res) {
      return { error: "Invalid credentials.PLease try again" };
    }

    await login(res);
    return { success: true };
  } catch (error) {
    if (error) {
      switch (error) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: error || "Something went wrong." };
      }
    }
  }
}
