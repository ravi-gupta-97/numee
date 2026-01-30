
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("session")?.value;
        const session = (token ? await verifySession(token) : null) as any;

        if (!session || !session.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.id },
            select: { currentQuestionIndex: true, questionnaireAnswers: true } as any,
        }) as any;

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            stepIndex: user.currentQuestionIndex ?? 0,
            answers: user.questionnaireAnswers || {},
        });
    } catch (error) {
        console.error("Progress error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
