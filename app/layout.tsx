import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Akash Pandya | Fintech Software Engineering Portfolio",
  description:
    "Fintech-focused software engineering portfolio featuring enterprise trade workflow experience, automation projects, and full-stack development work.",
  openGraph: {
    title: "Akash Pandya | Fintech Software Engineering Portfolio",
    description:
      "Enterprise workflow engineering, automation, and full-stack project delivery for financial technology applications.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akash Pandya | Fintech Software Engineering Portfolio",
    description:
      "Enterprise workflow engineering, automation, and full-stack project delivery for financial technology applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
