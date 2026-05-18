import { ContributionType } from "@prisma/client";

const XP_VALUES: Record<ContributionType, number> = {
  PR_MERGED: 50,
  ISSUE_RESOLVED: 30,
  PR_REVIEW: 20,
};

export function calculateXP(contributions: { type: ContributionType }[]): number {
  return contributions.reduce((xp, { type }) => xp + (XP_VALUES[type] ?? 0), 0);
}

export function xpForType(type: ContributionType): number {
  return XP_VALUES[type] ?? 0;
}

/** Level = floor(sqrt(xp / 100)) */
export function xpToLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100));
}

/** XP required to reach the next level */
export function xpToNextLevel(xp: number): number {
  const nextLevel = xpToLevel(xp) + 1;
  return nextLevel * nextLevel * 100 - xp;
}
