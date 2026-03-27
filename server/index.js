import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import texnitesRoutes from "./routes/texnitesRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import texnitesAuthRoutes  from "./routes/texnitesAuthRoutes.js";
//import texnitesEditInfoRoutes from "./routes/texnitisEditInfoRoutes.js"
import cookieParser from "cookie-parser";
import { storetoken } from "./middleware/cookietoken.js";
import methodOverride from "method-override";
import  cors from "cors" ;
//import jwt from "jsonwebtoken";

dotenv.config();


import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fixes the __dirname issue in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);





const app = express();
const port = process.env.PORT || 61000;

// Ensure Express uses EJS for rendering views
app.set("view engine", "ejs");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(cookieParser());
app.use(storetoken);

app.use(methodOverride("_method"));


// Routes
app.use("/", texnitesRoutes);
app.use("/", texnitesAuthRoutes);
//app.use("/", texnitesEditInfoRoutes);


// Error middleware (must be last)
app.use(errorHandler);




app.listen(process.env.PORT || 61000, () => {
    console.log(`Listening on port ${port}`);
});