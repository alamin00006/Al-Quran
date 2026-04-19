import { Router } from "express";

import ayahRoutes from "../modules/ayah/ayah.routes.js";
import searchRoutes from "../modules/search/search.routes.js";
import surahRoutes from "../modules/surah/surah.routes.js";

const router = Router();

router.use("/surahs", surahRoutes);
router.use("/ayahs", ayahRoutes);
router.use("/search", searchRoutes);

export default router;

