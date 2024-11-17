import type { Metadata } from "next";
import "./globals.css";

import { Nunito } from "next/font/google";
import Navbar from "./components/navbar/navbar";

// import Model from "./components/modals/Modal"
// const Navbar = dynamic(()=>import('./components/navbar/navbar'),{ssr : false})
// {/* <Model actionLabel="Submit" title="Hello World" isOpen /> */}

import ClientOnly from "./components/clientonly";
import RegisterModel from "./components/modals/registerModal";
import ToasterProvider from "./Providers/ToasterProvider";
import LoginModal from "./components/modals/loginModal";
import getCurrentUser from "./actions/getCurrentuser";
import RentModel from "./components/modals/rentModal";
import SearchModel from "./components/modals/searchModal";

const font = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grace",
  description: "Set your Grace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <Navbar currentUser={currentUser} />
          <ToasterProvider />
          <SearchModel />
          <LoginModal />
          <RegisterModel />
          <RentModel />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}

export const revalidate = 0;