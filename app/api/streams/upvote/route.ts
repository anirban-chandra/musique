import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod"
import { prismaclient } from "@/app/lib/db"

const CreateUpvoteSchema = z.object({
    streamId: z.string()
})

export async function POST(req: Request) {

    //TODO: Replace this email stuff with the id,
    // the next-auth doesnot provide with the id but with the email
    const session = await getServerSession();
    const user = await prismaclient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    });
    if (user) {
        return NextResponse.json({
            message: "User is not logged in"
        }, {
            status: 401
        })
    }

    try {
        const data = CreateUpvoteSchema.parse(await req.json());
        await prismaclient.upvote.create({
            data: {
                userId: user.Id,
                streamId: data.streamId
            }
        })
    }
    catch (error) {
        return new Response(JSON.stringify({ error: "Invalid request data" }),
            { status: 400 });
    }
}