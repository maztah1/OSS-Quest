import { prisma } from "@/lib/prisma";
import { xpToLevel } from "@/lib/xp";

export default async function LeaderboardPage() {
  const leaders = await prisma.user.findMany({
    orderBy: { xp: "desc" },
    take: 20,
    select: { id: true, username: true, avatarUrl: true, xp: true, streak: true },
  });

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🏆 Leaderboard</h1>
      <ol>
        {leaders.map((u) => (
          <li key={u.id}>
            <strong>{u.username}</strong> — Level {xpToLevel(u.xp)} ({u.xp} XP) 🔥 {u.streak}
          </li>
        ))}
      </ol>
    </main>
  );
}
