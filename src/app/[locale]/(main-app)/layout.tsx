import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import Header from "@/components/layout/Header";
// import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { getLocale } from "next-intl/server";

import "../globals.css";
// import { Toaster } from "@/components/ui/sonner";
// import ClientWrapper from "@/components/layout/ClientWrapper";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
import "animate.css";

export const metadata = {
  title: "",
  description: " ",
};

import { ReactNode } from "react";
import ClientWrapper from "../../../../components/layout/ClientWrapper";
import { ThemeProvider } from "../../../../components/layout/ThemeProvider";
import { Toaster } from "../../../../components/ui/sonner";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentLocale = await getLocale();

  return (
    <NextIntlClientProvider locale={currentLocale}>
      <html
        lang={currentLocale}
        dir={currentLocale == "ar" ? "rtl" : "ltr"}
        suppressHydrationWarning
        className="dark"
      >
        <body className={`${inter.className} antialiased`}>
          <ClientWrapper>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {/* <SidebarProvider> */}
              {/* <AppSidebar /> */}
              <div className="w-full">
                {/* <Header /> */}
                <main className="">{children}</main>
                <Toaster position="top-center" richColors duration={1500} />
              </div>
              {/* </SidebarProvider> */}
            </ThemeProvider>
          </ClientWrapper>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
