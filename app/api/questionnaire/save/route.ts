
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

        const { stepIndex, answers } = await req.json();

        await prisma.user.update({
            where: { id: session.id },
            data: {
                currentQuestionIndex: stepIndex,
                questionnaireAnswers: answers ?? {},
            } as any,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Save error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
