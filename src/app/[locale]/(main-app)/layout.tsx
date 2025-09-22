import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { ReactNode } from "react";
import ClientWrapper from "../../../../components/layout/ClientWrapper";
import { ThemeProvider } from "../../../../components/layout/ThemeProvider";
import Footer from "../../../../components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
import "animate.css";
import "../globals.css";
export const metadata = {
  title: "",
  description: " ",
};

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

                <Footer />
              </div>
              {/* </SidebarProvider> */}
            </ThemeProvider>
          </ClientWrapper>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
