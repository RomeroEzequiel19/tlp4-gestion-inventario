import express, {Application} from "express"
import morgan from "morgan"
import cors from "cors"
import { PORT } from "../config/conf";
import { dbConnect } from "../db/connect";
import authRoutes from "../routes/auth.routes";

class Server {
    private app: Application;
    public port: string

    constructor() {
        this.app = express()
        this.port = PORT;

        this.dbConnection()
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
    }

    listen():void {
        this.app.listen(this.port, () => {
            console.log(`Server running in port http://localhost:${this.port}`)
        })
    }
}

export default Server