import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { ensureAuthTables, dbErrorMessage } from "@/lib/auth-db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (String(password).length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    await ensureAuthTables();



    const [existingUsers] = await pool.execute<RowDataPacket[]>(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      await pool.execute("UPDATE users SET role = 'ADMIN' WHERE email = ?", [email]);
      return NextResponse.json({
        success: true,
        message: "Existing account promoted to admin",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, "ADMIN"]
    );

    return NextResponse.json(
      { success: true, message: "Admin registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin registration error:", error);
    return NextResponse.json({ error: dbErrorMessage(error) }, { status: 500 });
  }
}
