import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaclient } from "@/app/lib/db";

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string() // youtube inside url
});

export async function POST(req: NextRequest) {

    try {
        const YT_REGEX = new RegExp("^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|live\/)?([\w\-]{11})(?:\S+)?$")
        const data = await req.json();

        const validatedData = CreateStreamSchema.parse(data);

        const isYt = YT_REGEX.test(data.url);
        if (!isYt) {
            return NextResponse.json({ message: "please enter a valid youtube url" },
                { status: 400 });
        }
        const extractedId = data.url.split("?=v")[1];

        await prismaclient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "YouTube"
            }
        })
        return NextResponse.json({ message: "Stream created successfully" },
            { status: 200 });
    }
    catch (error) {
        return new Response(JSON.stringify({ error: "Invalid request data" }),
            { status: 400 });
    }
}


export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId")
    const streams = await prismaclient.stream.findMany({
        where: {
            userId: creatorId ?? ""
        }
    })

    return NextResponse.json({ streams }, { status: 200 });
}