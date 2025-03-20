import express, {Request, Response} from "express";
import {MongoClient} from "mongodb";
import {EntryProvider} from "../EntryProvider";

export function registerEntryRoutes(app: express.Application, mongoClient: MongoClient) {

    // get all entries
    app.get("/api/entries", (req: Request, res: Response) => {
        const ep = new EntryProvider(mongoClient)
        ep.getAllEntries().then(entries => {
            res.send(entries)
        })
    });

    // get specific entry
    app.get("/api/entries/:username/:date", (req: Request, res: Response) => {
        const ep = new EntryProvider(mongoClient)
        const {username, date} = req.params

        ep.getEntry(username, date).then(entry => {
            res.send(entry)
        })
    });

    // add entries to an entry document
    app.patch("/api/entries/:username/:date", (req: Request, res: Response) => {
        const ep = new EntryProvider(mongoClient)
        const {username, date} = req.params
        const {entry, mood} = req.body

        if(!req.body.entry) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing entry property"
            });
        }

        ep.addEntry(username, date, entry).then(r =>
            {
                if(r == 0) {
                    res.status(404).send({
                        error: "Not found",
                        message: "Entry does not exist"
                    });
                }
                res.status(204).send()
            }
        )
    });

    // add entry document
    app.post("/api/entries/:username/:date", (req: Request, res: Response) => {
        const ep = new EntryProvider(mongoClient)

        const {username, date} = req.params
        const { entry = [], mood = null } = req.body ?? {};

        if(!(username && date)) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing entry property"
            });
        }

        ep.addEntryDocument(date, username, entry, mood).then(r =>
            {
                if(!r) {
                    res.status(400).send({
                        error: "Creation Failed",
                        message: "Entry could not be created"
                    });
                }
                res.status(201).send()
            }
        )
    });
}