import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "IIOT Motor Control",
  description: "by Hanan gantenx",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full bg-gray-100 p-4 sm:p-6">
          <div className="mx-auto max-w-6xl space-x-2 ">
            <Link href={"/"}>
              <Button variant={"outline"}>Control</Button>
            </Link>
            <Link href={"/history"}>
              <Button variant={"outline"}>History</Button>
            </Link>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
