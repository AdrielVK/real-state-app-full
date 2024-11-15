


import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./fonts";



export const metadata: Metadata = {
  title: "Real State App",
  description: "Manage your real state bussiness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  return (
    <html lang="es">
      <body
        className={`${inter.className} antialiased bg-gradient-to-br from-amber-200 from-10% to-white-100 to-30%  text-slate-900 sm:text-sm md:text-base lg:text-lg xl:text-xl`}
      >
        {children}
      </body>
    </html>
  );
}
