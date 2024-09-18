import express, {Application} from "express"
import morgan from "morgan"
import cors from "cors"
import { PORT } from "../config/conf";
import { dbConnect } from "../db/connect";
import authRoutes from "../routes/auth.routes";
import userRoutes from "../routes/user.routes";
import deviceRoutes from "../routes/device.routes";
import maintenanceRoutes from "../routes/maintenance.routes";

class Server {
    private app: Application;
    public port: string

    constructor() {
        this.app = express()
        this.port = PORT;
        this.dbConnection()
        this.middlewares()
        this.routes()
    }

    async dbConnection() {
        await dbConnect()
    }

    middlewares(): void {
        this.app.use(cors())
        this.app.use(morgan("dev"))
        this.app.use(express.json())
    }

    routes(): void {
        this.app.use("/api", authRoutes)
        this.app.use("/api", userRoutes)
        this.app.use("/api", deviceRoutes)
        this.app.use("/api", maintenanceRoutes)
    }

    listen():void {
        this.app.listen(this.port, () => {
            console.log(`Server running in port http://localhost:${this.port}`)
        })
    }
}

export default Server