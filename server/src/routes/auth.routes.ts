import { Router } from "express"
import { ctrlAuthLogin, ctrlAuthRegister } from "../controllers/auth.controllers";

const authRoutes: Router = Router();

authRoutes.post("/auth/register", ctrlAuthRegister)
authRoutes.post("/auth/login", ctrlAuthLogin)

export default authRoutes