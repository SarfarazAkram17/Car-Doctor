import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import NextAuthProvider from "@/Providers/NextAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Car Doctor",
  description: "Generated by create next app",
  icons: {
  icon: "/assets/logo.svg",
},
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <NextAuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ToastContainer></ToastContainer>
          <Navbar></Navbar>
          {children}
        </body>
      </NextAuthProvider>
    </html>
  );
}
