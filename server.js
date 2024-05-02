import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import cookeParser from "cookie-parser";
import cron from "node-cron";
import rootRouter from "./routes/index.js";
import connectDB from "./config/mongoose.js";
import { uploadDocument, generateFile, getLinks } from "./controllers/document.controller.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(cookeParser());

//Routes
app.use("/api", rootRouter);
app.post("/api/documentUpload", uploadDocument);
app.get("/api/generateFile", generateFile);
app.get("/api/links", getLinks);


if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

//Error handling middleware
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running at port ${port}`));

cron.schedule('45 10 * * *', async () => {
  console.log('Running a task every minute.');
  await generateFile()
});
