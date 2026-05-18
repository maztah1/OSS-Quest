import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const quests = await prisma.quest.findMany({
    where: { endsAt: { gte: new Date() } },
    orderBy: { endsAt: "asc" },
  });
  return NextResponse.json(quests);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { questId } = await req.json();
  const userQuest = await prisma.userQuest.upsert({
    where: { userId_questId: { userId: session.user.id, questId } },
    create: { userId: session.user.id, questId },
    update: {},
  });
  return NextResponse.json(userQuest, { status: 201 });
}
