// Highlights the first matching substring in a block of text.
export function HighlightedText({
  text,
  searchTerm,
}: {
  text: string;
  searchTerm: string;
}) {
  if (!searchTerm) return text;

  const matchIndex = text.toLowerCase().indexOf(searchTerm.toLowerCase());
  if (matchIndex === -1) return text;

  return (
    <>
      {text.slice(0, matchIndex)}
      <mark className="rounded bg-accent/30 px-1 py-0.5 font-semibold text-foreground">
        {text.slice(matchIndex, matchIndex + searchTerm.length)}
      </mark>
      {text.slice(matchIndex + searchTerm.length)}
    </>
  );
}
