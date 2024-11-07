import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.AUTH_SECRET || "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(data: any) {
  // const user = {
  //   email: data.email,
  //   fname: data.fName,
  //   lname: data.lName,
  //   role: data.role,
  //   phone: data.phone,
  //   token: data.token
  // };

  // Create the session that expires in 1 day
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ data, expires });

  // Save the session in a cookie
  cookies().set("auth_session", session, {
    expires,
    httpOnly: true,
    secure: true,
  });
}

export async function logout() {
  // Destroy the session
  cookies().set("auth_session", "", { expires: new Date(0) });
}

export async function getSession(): Promise<any> {
  const session = cookies().get("auth_session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("auth_session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire in 1 day
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "auth_session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
    secure: true,
  });
  
  return res;
}
