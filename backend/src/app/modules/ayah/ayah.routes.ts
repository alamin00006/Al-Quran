import { Router } from "express";

import { getOne } from "./ayah.controller.js";

const router = Router();

router.get("/:surahId/:ayahId", getOne);

export default router;

