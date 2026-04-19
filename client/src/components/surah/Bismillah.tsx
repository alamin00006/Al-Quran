const bismillahText =
  "\u0628\u0650\u0633\u0652\u0645\u0650 \u0671\u0644\u0644\u064e\u0651\u0647\u0650 \u0671\u0644\u0631\u064e\u0651\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0671\u0644\u0631\u064e\u0651\u062d\u0650\u064a\u0645\u0650";

// Displays the Bismillah line before eligible surahs.
export function Bismillah({
  arabicClass,
  arabicSize,
}: {
  arabicClass: string;
  arabicSize: number;
}) {
  return (
    <div className="flex items-center gap-4 ornament">
      <p
        className={`text-center text-primary ${arabicClass}`}
        dir="rtl"
        style={{ fontSize: `clamp(1.4rem, 7vw, ${arabicSize + 4}px)` }}
      >
        {bismillahText}
      </p>
    </div>
  );
}
