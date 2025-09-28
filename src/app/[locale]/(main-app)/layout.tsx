import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { ReactNode } from "react";
import ClientWrapper from "../../../../components/layout/ClientWrapper";
import Footer from "../../../../components/layout/Footer";

import "animate.css";
import "../globals.css";
import FullScreenNav from "../../../../components/layout/FullScreenNav";
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
        <body className={`  antialiased`}>
          <ClientWrapper>
            {/* <FullScreenNav
              brand="ATTAL PROPERTIES"
              phoneLabel="19431"
              // Optionally override items:
              // leftItems={[...]} rightItems={[...]}
            /> */}
            <main className="w-full">
              {children}
              <Footer />
            </main>
          </ClientWrapper>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
