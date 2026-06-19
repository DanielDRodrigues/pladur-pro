import type { Metadata } from "next";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pladur Pro",
    template: "%s | Pladur Pro",
  },
  description:
    "App para criar clientes, obras, medições e orçamentos de pladur.",
  applicationName: "Pladur Pro",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pladur Pro",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/app-icon.svg",
    apple: "/app-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
