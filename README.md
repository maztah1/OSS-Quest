# 🗡️ OSS Quest

**OSS Quest** is a gamification engine for open-source contributors that transforms GitHub contributions into an engaging RPG-like experience. Earn XP, complete quests, unlock achievements, and climb the leaderboard as you contribute to open-source projects.

## 🎮 Overview

OSS Quest tracks your open-source contributions across GitHub and rewards you with experience points (XP), achievements, and quest completions. The platform encourages consistent contribution through daily streaks, time-limited quests, and a competitive leaderboard system.

### Key Features

- **🎯 Quest System**: Daily, weekly, and seasonal quests with XP rewards
- **⚡ XP & Leveling**: Earn experience points for contributions and level up
- **🏆 Achievements**: Unlock badges for reaching milestones
- **📊 Leaderboard**: Compete with other contributors globally
- **🔥 Streak Tracking**: Maintain daily contribution streaks
- **🔐 GitHub OAuth**: Seamless authentication via GitHub

## 🏗️ Architecture

OSS Quest is built with a modern, scalable tech stack:

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend Layer                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Next.js 14 (App Router) + React 18              │  │
│  │  - Server Components                              │  │
│  │  - Client Components for interactivity           │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    API Layer (Next.js)                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │  /api/auth/[...nextauth]  - Authentication       │  │
│  │  /api/quests              - Quest management     │  │
│  │  /api/leaderboards        - Rankings             │  │
│  │  /api/profiles/[username] - User profiles        │  │
│  │  /api/rewards             - Achievement system   │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Business Logic Layer                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │  XP Calculation Engine (lib/xp.ts)               │  │
│  │  - PR Merged: 50 XP                              │  │
│  │  - Issue Resolved: 30 XP                         │  │
│  │  - PR Review: 20 XP                              │  │
│  │  - Level Formula: floor(sqrt(xp / 100))          │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                    Data Access Layer                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Prisma ORM (lib/prisma.ts)                      │  │
│  │  - Type-safe database queries                    │  │
│  │  - Migration management                          │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                     Database Layer                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │  PostgreSQL                                       │  │
│  │  - Users & Contributions                         │  │
│  │  - Quests & Achievements                         │  │
│  │  - Sessions & Auth                               │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## 📊 Data Model

The application uses a relational database with the following core entities:

- **User**: GitHub user profile with XP, streak, and contribution history
- **Contribution**: Individual contributions (PR merged, issue resolved, PR review)
- **Quest**: Time-limited challenges (daily, weekly, seasonal)
- **UserQuest**: User progress on specific quests
- **Achievement**: Unlockable badges and rewards
- **UserAchievement**: Achievements earned by users

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- GitHub OAuth App credentials

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/oss-quest.git
   cd oss-quest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and configure:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/ossquest"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"
   GITHUB_CLIENT_ID="your-github-oauth-client-id"
   GITHUB_CLIENT_SECRET="your-github-oauth-client-secret"
   ```

4. **Initialize the database**
   ```bash
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💻 Code Examples

### XP Calculation System

The XP system rewards different types of contributions:

```typescript
import { ContributionType } from "@prisma/client";

const XP_VALUES: Record<ContributionType, number> = {
  PR_MERGED: 50,
  ISSUE_RESOLVED: 30,
  PR_REVIEW: 20,
};

// Calculate total XP from contributions
export function calculateXP(contributions: { type: ContributionType }[]): number {
  return contributions.reduce((xp, { type }) => xp + (XP_VALUES[type] ?? 0), 0);
}

// Level calculation: Level = floor(sqrt(xp / 100))
export function xpToLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100));
}

// XP required to reach the next level
export function xpToNextLevel(xp: number): number {
  const nextLevel = xpToLevel(xp) + 1;
  return nextLevel * nextLevel * 100 - xp;
}
```

### Fetching Active Quests

```typescript
import { prisma } from "@/lib/prisma";

// Get all active quests
const activeQuests = await prisma.quest.findMany({
  where: { 
    endsAt: { gte: new Date() } 
  },
  orderBy: { endsAt: "asc" },
});
```

### Leaderboard Query

```typescript
import { prisma } from "@/lib/prisma";

// Get top contributors
const leaders = await prisma.user.findMany({
  orderBy: { xp: "desc" },
  take: 20,
  select: { 
    id: true, 
    username: true, 
    avatarUrl: true, 
    xp: true, 
    streak: true 
  },
});
```

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 14 (App Router) |
| **Frontend** | React 18, TypeScript |
| **Authentication** | NextAuth.js 4 with GitHub OAuth |
| **Database** | PostgreSQL |
| **ORM** | Prisma 5 |
| **Styling** | CSS (inline styles, can be extended) |
| **Deployment** | Vercel-ready |

## 📁 Project Structure

```
oss-quest/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/    # NextAuth configuration
│   │   ├── leaderboards/          # Leaderboard endpoints
│   │   ├── profiles/[username]/   # User profile API
│   │   ├── quests/                # Quest management
│   │   └── rewards/               # Achievement system
│   ├── leaderboard/               # Leaderboard page
│   ├── quests/                    # Quests page
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home page
├── lib/
│   ├── prisma.ts                  # Prisma client singleton
│   └── xp.ts                      # XP calculation logic
├── prisma/
│   └── schema.prisma              # Database schema
├── .env.example                   # Environment variables template
├── package.json                   # Dependencies
└── tsconfig.json                  # TypeScript configuration
```

## 🎯 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth authentication |
| `/api/quests` | GET | Fetch active quests |
| `/api/quests` | POST | Accept a quest |
| `/api/leaderboards` | GET | Get top contributors |
| `/api/profiles/[username]` | GET | Get user profile |
| `/api/rewards` | GET/POST | Manage achievements |

## 🔧 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run db:push    # Push Prisma schema to database
npm run db:studio  # Open Prisma Studio (database GUI)
```

## 🎮 How It Works

1. **Sign in with GitHub**: Users authenticate using their GitHub account
2. **Sync Contributions**: The system tracks PRs, issues, and reviews
3. **Earn XP**: Each contribution type awards specific XP amounts
4. **Level Up**: XP accumulates and users level up based on the formula
5. **Complete Quests**: Time-limited challenges provide bonus XP
6. **Unlock Achievements**: Reach milestones to earn badges
7. **Climb the Leaderboard**: Compete with other contributors

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Authentication by [NextAuth.js](https://next-auth.js.org/)
- Database ORM by [Prisma](https://www.prisma.io/)
- Inspired by the amazing open-source community

---

**Made with ❤️ for the open-source community**
