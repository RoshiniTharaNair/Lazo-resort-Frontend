import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { inter, lexendDeca } from "@/app/fonts";
import HydrogenLayout from "@/layouts/hydrogen/layout";
import GlobalDrawer from "@/app/shared/drawer-views/container";
import GlobalModal from "@/app/shared/modal-views/container";
import { cn } from "@/utils/class-names";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Lazo resort admin panel",
  description: "The Lazo Resort Admin Panel is an intuitive and powerful tool designed to simplify resort management, offering seamless control over bookings, guest services, and operational efficiency, all aimed at elevating guest satisfaction and streamlining staff workflow.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      // 💡 Prevent next-themes hydration warning
      suppressHydrationWarning
    >
      <body
        // 💡 Prevent hydration warnings caused by third-party extensions, such as Grammarly.
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, "font-inter")}
      >
        <ThemeProvider>
          <HydrogenLayout>{children}</HydrogenLayout>
          <GlobalDrawer />
          <GlobalModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
