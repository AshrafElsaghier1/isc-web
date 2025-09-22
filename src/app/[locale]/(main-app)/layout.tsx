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
  title: "ISC App",
  description: "Awesome Next.js app",

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },

  themeColor: "#000000",

  openGraph: {
    title: "ISC App",
    description: "Awesome Next.js app built with Next.js",
    url: "https://isc-app.vercel.app", // replace with your domain
    siteName: "ISC App",
    images: [
      {
        url: "https://isc-app.vercel.app/favicon.ico", // must be absolute URL
        width: 1200,
        height: 630,
        alt: "ISC App Preview",
      },
    ],
    locale: "en",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ISC App",
    description: "Awesome Next.js app built with Next.js",
    images: ["https://isc-app.vercel.app/favicon.ico"],
  },
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
