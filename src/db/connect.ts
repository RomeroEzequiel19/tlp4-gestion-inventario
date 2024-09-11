import { connect } from "mongoose";
import { URI } from "../config/conf";

export const dbConnect = async (): Promise<void> => {
    try {
        await connect(URI);
        console.log("Connected Database");
    } catch (error) {
        console.log("Error connecting to database", error as Error);
    }
};
