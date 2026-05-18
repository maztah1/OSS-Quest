import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Math.min(Number(searchParams.get("limit") ?? 20), 100);

  const leaders = await prisma.user.findMany({
    orderBy: { xp: "desc" },
    take: limit,
    select: { id: true, username: true, avatarUrl: true, xp: true, streak: true },
  });
  return NextResponse.json(leaders);
}
