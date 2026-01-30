
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("session")?.value;
        const session = (token ? await verifySession(token) : null) as any;

        if (!session || !session.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { answers } = await req.json();

        // Save the final response
        await prisma.questionnaireResponse.create({
            data: {
                userId: session.id,
                answers: answers ?? {},
            },
        });

        // Optional: We could clear the draft from User model, but keeping it for now in case they want to review later.

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Submit error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
