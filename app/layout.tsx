import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";

import { Nunito } from 'next/font/google'
import Navbar from "./components/navbar/navbar";
// import Model from "./components/modals/Modal"
// const Navbar = dynamic(()=>import('./components/navbar/navbar'),{ssr : false})

import ClientOnly from "./components/clientonly";
import RegisterModel from "./components/modals/registerModal";

const font = Nunito({
  subsets : ["latin"],
})


export const metadata: Metadata = {
  title: "Grace",
  description: "Set your Grace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className = {font.className}>
        <ClientOnly>
          <RegisterModel/>
          {/* <Model actionLabel="Submit" title="Hello World" isOpen /> */}
          <Navbar/>
        </ClientOnly>
        {/* <Navbar/> */}
        {children}
      </body>
    </html>
  );
}
