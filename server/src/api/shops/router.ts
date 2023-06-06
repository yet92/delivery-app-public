import { Router } from "express";
import { getAll, getOne } from "./controller";

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);

export { router };
