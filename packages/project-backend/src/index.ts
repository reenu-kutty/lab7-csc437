import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import {registerEntryRoutes} from "./routes/entries";

dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const staticDir = process.env.STATIC_DIR || "public";
setUpServer().then(r => console.log('finished running!'))

async function setUpServer() {

    const { MONGO_USER, MONGO_PWD, MONGO_CLUSTER, DB_NAME } = process.env;

    const connectionStringRedacted = `mongodb+srv://${MONGO_USER}:<password>@${MONGO_CLUSTER}/${DB_NAME}`;
    const connectionString = `mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}/${DB_NAME}`;

    console.log("Attempting Mongo connection at " + connectionStringRedacted);

    const mongoClient = await MongoClient.connect(connectionString);
    console.log("MongoClient connected");


    const db = mongoClient.db();
    console.log("Current database:", db.databaseName);
    const collectionInfos = await mongoClient.db().listCollections().toArray();
    console.log(collectionInfos.map(collectionInfo => collectionInfo.name)); // For debug only

    const app = express();

    app.use(express.static(staticDir));

    app.use(express.json());

    app.get("/hello", (req: Request, res: Response) => {
        res.send("Hello, World");
    });

    registerEntryRoutes(app, mongoClient);

    app.get("*", (req: Request, res: Response) => {
        res.sendFile("../../ivy/dist/index.html", {root: __dirname});
    });

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}
