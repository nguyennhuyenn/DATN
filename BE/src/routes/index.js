import { Router } from "express";
import authRouter from "./authRouter";

const router= Router()
router.use("/authRouter",authRouter)
export default router;