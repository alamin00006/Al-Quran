"use client";

import { Provider } from "react-redux";
import { type ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SettingsProvider } from "@/hooks/use-settings";
import { AppLayout } from "@/components/layout/AppLayout";
import { store } from "@/store";

// Composes global client providers for Redux, settings, tooltips, and layout.
export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <SettingsProvider>
        <TooltipProvider>
          <AppLayout>{children}</AppLayout>
        </TooltipProvider>
      </SettingsProvider>
    </Provider>
  );
}
