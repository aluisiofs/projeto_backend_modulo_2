import { Router } from "express";
import { login } from "../controllers/ExampleController";

const router = Router();

router.post("/login", login);

export default router;
