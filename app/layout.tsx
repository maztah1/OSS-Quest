import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OSS Quest",
  description: "Gamification engine for open-source contributors",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
