import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import config from "../config/index.js";
import { connectDB } from "../config/db.js";
import Ayah from "../app/modules/ayah/ayah.model.js";
import Surah from "../app/modules/surah/surah.model.js";
import type { Ayah as AyahType, Surah as SurahType } from "../interface/quran.js";

interface QuranDataSurah extends SurahType {
  verses: Array<Omit<AyahType, "surahId">>;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  try {
    const surahsPath = path.join(__dirname, "..", "..", "data", "surahs.json");
    const quranPath = path.join(__dirname, "..", "..", "data", "quran.json");

    if (!fs.existsSync(surahsPath) || !fs.existsSync(quranPath)) {
      console.error("Missing data files. Put surahs.json and quran.json in ./data/");
      process.exit(1);
    }

    const surahs = JSON.parse(fs.readFileSync(surahsPath, "utf8")) as SurahType[];
    const quran = JSON.parse(fs.readFileSync(quranPath, "utf8")) as QuranDataSurah[];

    await connectDB(config.databaseUrl);

    console.log("Clearing existing collections...");
    await Promise.all([Surah.deleteMany({}), Ayah.deleteMany({})]);

    console.log(`Inserting ${surahs.length} surahs...`);
    await Surah.insertMany(surahs);

    const ayahDocs: AyahType[] = [];
    for (const surah of quran) {
      for (const verse of surah.verses) {
        ayahDocs.push({
          surahId: surah.id,
          id: verse.id,
          ar: verse.ar,
          en: verse.en || "",
          bn: verse.bn || "",
        });
      }
    }

    console.log(`Inserting ${ayahDocs.length} ayahs...`);
    const chunkSize = 1000;
    for (let index = 0; index < ayahDocs.length; index += chunkSize) {
      await Ayah.insertMany(ayahDocs.slice(index, index + chunkSize));
    }

    console.log("Seed complete");
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

void seed();
