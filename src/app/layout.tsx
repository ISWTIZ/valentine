import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wants to be my Valentine ?",
  description:
    "Resolve my games to reach my proposal !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
