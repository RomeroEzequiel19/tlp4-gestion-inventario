import { Router } from "express"
import { ctrlAuthRegister } from "../controllers/auth.controllers";

const authRoutes: Router = Router();

authRoutes.post("/auth/register", ctrlAuthRegister)

export default authRoutes