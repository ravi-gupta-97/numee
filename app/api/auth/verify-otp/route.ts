import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { emailOrPhone, otp } = await req.json();

        if (!emailOrPhone || !otp) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { emailOrPhone },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (!user.otp || !user.otpExpiry) {
            return NextResponse.json({ error: "No OTP request found" }, { status: 400 });
        }

        if (new Date() > user.otpExpiry) {
            return NextResponse.json({ error: "OTP expired" }, { status: 400 });
        }

        if (user.otp !== otp) {
            return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
        }

        // OTP verified, clear it
        await prisma.user.update({
            where: { id: user.id },
            data: {
                otp: null,
                otpExpiry: null,
            },
        });

        return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
