import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

// Renders a reusable search field with leading icon and clear action.
export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`h-12 min-w-0 rounded-xl pl-11 pr-11 ${className}`}
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
          aria-label="Clear"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
