import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🗡️ OSS Quest</h1>
      <p>Gamification engine for open-source contributors.</p>
      <nav style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Link href="/quests">Quests</Link>
        <Link href="/leaderboard">Leaderboard</Link>
      </nav>
    </main>
  );
}
