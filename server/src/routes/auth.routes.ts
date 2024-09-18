import { Router } from "express"
import { ctrlAuthLogin, ctrlAuthRegister, validateToken } from "../controllers/auth.controllers";

const authRoutes: Router = Router();

authRoutes.post("/auth/register", ctrlAuthRegister)
authRoutes.post("/auth/login", ctrlAuthLogin)
authRoutes.get("/auth/validate-token", validateToken)

export default authRoutes