import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/themes"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Low Bar Brawlers",
  description: "A history of the Low Bar Brawlers. A Dungeons and Dragons 5e Campaign spanning 3 years.",
  keywords: "dungeons and dragons, dnd, 5e, campaign, low bar brawlers, history, story, characters, players, dm, dungeon master, matthew ciolino",
  viewport: "width=device-width, initial-scale=1"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/dragon.svg" />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
