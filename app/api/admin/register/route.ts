import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";
import pool from "@/lib/db";

async function adminCount() {
  const [rows] = await pool.execute<RowDataPacket[]>(
    "SELECT COUNT(*) AS total FROM users WHERE role = 'ADMIN'"
  );
  return Number(rows[0]?.total ?? 0);
}

export async function GET() {
  try {
    const total = await adminCount();
    return NextResponse.json({
      bootstrap: total === 0,
      requiresSetupKey: total > 0 && Boolean(process.env.ADMIN_REGISTER_SECRET),
    });
  } catch (error) {
    console.error("Admin register status error:", error);
    return NextResponse.json({ error: "Unable to check admin status" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email, password, setupKey } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
    }

    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const totalAdmins = await adminCount();
    const secret = process.env.ADMIN_REGISTER_SECRET;

    if (totalAdmins > 0) {
      if (!secret) {
        return NextResponse.json(
          { error: "Admin registration is closed. Ask an existing admin to add you." },
          { status: 403 }
        );
      }
      if (!setupKey || setupKey !== secret) {
        return NextResponse.json({ error: "Invalid setup key" }, { status: 403 });
      }
    }

    const [existingUsers] = await pool.execute<RowDataPacket[]>(
      "SELECT id, role FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'ADMIN')",
      [name, email, hashedPassword]
    );

    return NextResponse.json(
      { success: true, message: "Admin registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
