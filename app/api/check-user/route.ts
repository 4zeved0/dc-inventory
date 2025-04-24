// app/api/check-user/route.ts
import searchUser from "@/app/lib/searchUser";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ exists: false }, { status: 400 });
  }
  const user = await searchUser(email)
  return NextResponse.json({ exists: !!user });
}
