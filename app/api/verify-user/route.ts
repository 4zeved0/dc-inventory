import searchUser from "@/app/lib/searchUser";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ exists: false }, { status: 400 });
  }

  try {
    const user = await searchUser(email);

    if (!user?.name) {
      return NextResponse.json({ exists: false }, { status: 200 });
    }

    return NextResponse.json({ exists: true }, { status: 200 });

  } catch (err) {
    console.error("Erro no searchUser:", err);
    return NextResponse.json({ exists: false }, { status: 500 });
  }
}
