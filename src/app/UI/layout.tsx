/* src/app/layout.tsx */
import "@/styles/globals.css";        // Tailwind base + Flowbite styles
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Da Box",
  description: "ESP32 control & admin portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased">
        {children}
      </body>
    </html>
  );
}
