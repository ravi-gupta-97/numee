import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

const SALT_ROUNDS = 10;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      emailOrPhone,
      dateOfBirth,
      gender,
      password,
    } = body as {
      firstName?: string;
      lastName?: string;
      emailOrPhone?: string;
      dateOfBirth?: string;
      gender?: string;
      password?: string;
    };

    if (!firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json(
        { error: "First name and last name are required" },
        { status: 400 }
      );
    }
    if (!emailOrPhone?.trim()) {
      return NextResponse.json(
        { error: "Email or phone number is required" },
        { status: 400 }
      );
    }
    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        emailOrPhone: emailOrPhone.trim(),
        dateOfBirth: dateOfBirth?.trim() || null,
        gender: gender?.trim() || null,
        passwordHash,
      },
    });

    return NextResponse.json(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailOrPhone: user.emailOrPhone,
      },
      { status: 201 }
    );
  } catch (error) {
    const prismaError = error as { code?: string };
    if (prismaError.code === "P2002") {
      return NextResponse.json(
        { error: "An account with this email or phone already exists" },
        { status: 409 }
      );
    }
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
