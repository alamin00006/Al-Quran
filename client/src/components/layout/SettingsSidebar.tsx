import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useSettings } from "@/hooks/use-settings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Moon, RotateCcw, Settings as SettingsIcon, Sun } from "lucide-react";
import type { ArabicFont, Translation } from "@/types/quran";

// Renders reader preferences for theme, translation, typography, and reset.
export function SettingsSidebar() {
  const {
    settings,
    setArabicFont,
    setArabicSize,
    setTranslationSize,
    setTranslation,
    toggleTheme,
    reset,
  } = useSettings();

  return (
    <Sidebar side="right" collapsible="offcanvas">
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-3">
          <SettingsIcon className="h-5 w-5 text-primary" />
          <span className="font-semibold">Settings</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Theme</SidebarGroupLabel>
          <SidebarGroupContent>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={toggleTheme}
            >
              {settings.theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" /> Switch to Light
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" /> Switch to Dark
                </>
              )}
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Translation</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={settings.translation}
              onValueChange={(value) => setTranslation(value as Translation)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (Sahih)</SelectItem>
                <SelectItem value="bn">Bangla (Muhiuddin Khan)</SelectItem>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Arabic Font</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={settings.arabicFont}
              onValueChange={(value) => setArabicFont(value as ArabicFont)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amiri">Amiri</SelectItem>
                <SelectItem value="scheherazade">Scheherazade New</SelectItem>
                <SelectItem value="naskh">Noto Naskh Arabic</SelectItem>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            Arabic Size - {settings.arabicSize}px
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2 pt-2">
            <Slider
              value={[settings.arabicSize]}
              min={20}
              max={56}
              step={1}
              onValueChange={(value) => setArabicSize(value[0])}
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>
            Translation Size - {settings.translationSize}px
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2 pt-2">
            <Slider
              value={[settings.translationSize]}
              min={12}
              max={28}
              step={1}
              onValueChange={(value) => setTranslationSize(value[0])}
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-2"
              onClick={reset}
            >
              <RotateCcw className="h-4 w-4" /> Reset to defaults
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
