import { NextResponse } from "next/server";
import { pingDatabase } from "@/lib/db";
import { dbErrorMessage } from "@/lib/auth-db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await pingDatabase();
    return NextResponse.json({ ok: true, db: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, db: false, error: dbErrorMessage(error) },
      { status: 200 }
    );
  }
}
