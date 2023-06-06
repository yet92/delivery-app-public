import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router as apiRouter } from "./src/api";

import { tryGenerate } from "./src/utils";
import path from "path";

dotenv.config();

const main = () => {
    const app = express();
    const port = process.env.PORT;

    if (process.env.ENVIRONMENT === "production") {
        app.use("/", express.static(path.join(__dirname, "..", "..", "client", "dist")));
    }

    app.use(express.json());
    app.use(cors({
        origin: process.env.CLIENT_URL
    }));

    app.use(apiRouter);

    // app.get("/", (req, res) => {
    //     res.send("Express + TypeScript Server");
    // });

    if (process.env.ENVIRONMENT === "production") {
        app.get("/*", (_req, res) => {
            res.sendFile(path.join(__dirname, "..", "..", "client", "dist", "index.html"));
        });
    }

    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
};

tryGenerate().then(() => {
    main();
});
