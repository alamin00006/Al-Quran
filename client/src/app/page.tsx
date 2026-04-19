import SurahListPage from "@/components/home/SurahListPage";
import { getStaticSurahs } from "@/lib/ssg/quran-ssg-api";

export const dynamic = "force-static";

// Renders the statically generated home page with surah metadata from the API.
export default async function Home() {
  const surahs = await getStaticSurahs();

  return <SurahListPage initialSurahs={surahs} />;
}
