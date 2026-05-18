import { prisma } from "@/lib/prisma";

export default async function QuestsPage() {
  const quests = await prisma.quest.findMany({
    where: { endsAt: { gte: new Date() } },
    orderBy: { endsAt: "asc" },
  });

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Active Quests</h1>
      {quests.length === 0 && <p>No active quests right now.</p>}
      <ul>
        {quests.map((q) => (
          <li key={q.id}>
            <strong>{q.title}</strong> — {q.xpReward} XP
            <br />
            <small>{q.description}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
