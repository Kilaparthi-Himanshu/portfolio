import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/misc/CustomCursor";
import Navbar from "./components/Navbar";
import LoaderWrapper from "./components/misc/LoaderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Himanshu Kilaparthi",
  description: "Himanshu Kilaparthi's Portfolio",
  icons: {
    icon: "/my_photo.ico",
    apple: "/my_photo.ico",
  },
  openGraph: {
    title: "Himanshu Kilaparthi",
    description: "Full Stack Developer — building digital experiences that feel alive.",
    url: "https://himanshu-kilaparthi.vercel.app",
    siteName: "Himanshu Kilaparthi",
    images: [
      {
        url: "/og-image.png",
        width: 512,
        height: 512,
        alt: "Himanshu Kilaparthi Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Himanshu Kilaparthi",
    description: "Full Stack Developer — building digital experiences that feel alive.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <CustomCursor />
        {/* <Navbar /> */}
        <LoaderWrapper>
          {children}
        </LoaderWrapper>
      </body>
    </html>
  );
}
