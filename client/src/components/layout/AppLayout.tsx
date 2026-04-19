import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SettingsSidebar } from "./SettingsSidebar";
import { AppHeader } from "./AppHeader";

// Provides the persistent application shell around every page.
export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="relative flex min-h-screen w-full min-w-0 overflow-x-hidden bg-background">
        <div className="pointer-events-none fixed inset-0 -z-10 gradient-subtle" />
        <div className="pointer-events-none fixed inset-0 -z-10 gradient-mesh" />
        <div className="pointer-events-none fixed -top-40 -left-40 -z-10 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl animate-float-slow" />
        <div
          className="pointer-events-none fixed -bottom-40 -right-40 -z-10 h-[600px] w-[600px] rounded-full bg-accent/10 blur-3xl animate-float-slow"
          style={{ animationDelay: "5s" }}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader />
          <main className="container flex-1 min-w-0 py-20 sm:py-24 animate-fade-in">
            {children}
          </main>
          <footer className="footer-surface border-t border-primary/20 py-5 text-center text-sm text-primary-foreground shadow-soft">
            <div className="container">
              <p className="font-display text-base font-semibold">Al-Qur'an al-Karim</p>
              <p className="mt-1 text-xs tracking-wide text-primary-foreground/75">
                Read &middot; Reflect &middot; Remember
              </p>
            </div>
          </footer>
        </div>
        <SettingsSidebar />
      </div>
    </SidebarProvider>
  );
}
