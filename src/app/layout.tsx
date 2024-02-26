import type { Metadata } from "next";
import "./globals.css";
import SpotifyNowPlay from "@/components/spotifyNowPlay";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Tokuzou",
  description: "this is tokuzou",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="w-full h-full">
      <body className={" w-full h-full"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SpotifyNowPlay />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
