import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const DATABASE_URL = process.env.DATABASE_URL;
export const connectToDatabase = async () => {
    try {
        const options = {
        // only include the properties defined in ConnectOptions
        };
        const mongooseOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        mongoose.connect(DATABASE_URL, { ...options, ...mongooseOptions });
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};
//# sourceMappingURL=db.js.map