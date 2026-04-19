import { Router } from "express";

import { getAyahs, getOne, list } from "./surah.controller.js";

const router = Router();

router.get("/", list);
router.get("/:id", getOne);
router.get("/:id/ayahs", getAyahs);

export default router;

