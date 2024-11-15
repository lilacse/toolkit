import type { Metadata } from "next";
import "./globals.css";
import Switcher from "./switcher";

export const metadata: Metadata = {
  title: "Toolkit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="m-0 p-0">
        <Switcher />
        <div className="mt-40 mx-4 md:mx-12">{children}</div>
      </body>
    </html>
  );
}
