import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import prisma from "@/lib/db";
import { signSession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { emailOrPhone: email },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const passwordValid = await compare(password, user.passwordHash);

        if (!passwordValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const session = await signSession({ id: user.id, email: user.emailOrPhone });

        // Set cookie
        (await cookies()).set("session", session, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        });

        return NextResponse.json({ message: "Login successful" }, { status: 200 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
