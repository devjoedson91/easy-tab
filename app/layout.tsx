"use client";

import { M_PLUS_1 } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import store from "@/store";
import AuthProvider from "@/providers/auth";

const m_plus = M_PLUS_1({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Easy Tab</title>
      </head>
      <body className={m_plus.className}>
        <AuthProvider>
          <Provider store={store}>
            <div className="flex h-full flex-col">
              <div>
                <div className="flex-1">{children}</div>
              </div>
            </div>
          </Provider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
