import SurahPage from "@/components/surah/SurahPage";
import { getStaticSurahById, getStaticSurahs } from "@/lib/ssg/quran-ssg-api";

export const dynamic = "force-static";
export const dynamicParams = false;

// Generates all surah detail routes at build time.
export async function generateStaticParams() {
  const surahs = await getStaticSurahs();

  return surahs.map((surah) => ({
    id: String(surah.id),
  }));
}

// Renders a statically generated surah detail page with initial API data.
export default async function Page({ params }: { params: { id: string } }) {
  const [surah, surahs] = await Promise.all([
    getStaticSurahById(params.id),
    getStaticSurahs(),
  ]);

  return (
    <SurahPage id={params.id} initialSurah={surah} initialSurahs={surahs} />
  );
}
