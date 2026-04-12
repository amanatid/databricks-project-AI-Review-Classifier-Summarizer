import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import texnitesRoutes from "./routes/texnitesRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import texnitesAuthRoutes  from "./routes/texnitesAuthRoutes.js";
import texnitesImageRoutes from "./routes/texnitesImageRoutes.js";

//import texnitesAdminRoute from "./routes/texnitesAdminRoute.js"
import cookieParser from "cookie-parser";
import { storetoken } from "./middleware/cookietoken.js";
import methodOverride from "method-override";
import  cors from "cors" ;
import promClient from "prom-client";



dotenv.config();


import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Fixes the __dirname issue in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);





const app = express();
const port = process.env.PORT || 61000;

//-------Prometheus Setup---------------------//
const register = new promClient.Registry();
promClient.collectDefaultMetrics(register);

const httpRequestsCounter =   new promClient.Counter({
      name: "http_requests_total",
      help: "Total number of HTTP requests",
      labelNames: ["method", "route", "status"]
});

register.registerMetric(httpRequestsCounter);

// middleware to count requests
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestsCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status: res.statusCode,
    });
  });
  next();
});

///////////////////////////////////////////////


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
app.use("/", texnitesImageRoutes);


//Expose  metrics endpoint for prometheus
app.get("/metrics", async(req,res)=>{
    res.set("Content-Type", register.contentType);
    res.end( await register.metrics());
});

// Error middleware (must be last)
app.use(errorHandler);



app.listen(process.env.PORT || 61000, () => {
    console.log(`Listening on port ${port}`);
});