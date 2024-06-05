import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import db from "./config/Database.js";
import Akun from "./models/UserModel2.js";
dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: ['http://localhost:3000', "https://manajemen-frontend-cvbl6cy73a-et.a.run.app"] }));
app.use(cookieParser());
app.use(express.json());
app.use(UserRoute);

try {
    await db.authenticate();
    console.log('Database Connected...');
    await Akun.sync();
} catch (error) {
    console.error(error);
}

// Gunakan port dari variabel lingkungan atau default ke 8080
const port = 8080;

app.listen(port, () => console.log(`Server up and running on port ${port}...`));
