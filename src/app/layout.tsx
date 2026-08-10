import type { Metadata } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { siteConfig } from "@/data/portfolio";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Data Engineer designing production-scale batch and streaming pipelines across Kafka, Spark, Flink, and Airflow, and cloud data warehouses on Snowflake, Redshift, and BigQuery.";

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.title}`,
  description,
  metadataBase: new URL("https://kabirkakkar.dev"),
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description,
    type: "website",
    locale: "en_US",
    siteName: `${siteConfig.name} Portfolio`,
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${publicSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
