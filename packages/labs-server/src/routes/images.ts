import express, {Request, Response} from "express";
import {MongoClient} from "mongodb";
import {ImageProvider} from "../ImageProvider";

export function registerImageRoutes(app: express.Application, mongoClient: MongoClient) {
    app.get("/api/images", (req: Request, res: Response) => {
        const ip = new ImageProvider(mongoClient)

        let userId: string | undefined = undefined;
        if (typeof req.query.createdBy === "string") {
            userId = req.query.createdBy;
        }

        ip.getAllImages(userId).then(images => {
            res.send(images)
        })
    });

    app.patch("/api/images/:id", (req: Request, res: Response) => {
        const ip = new ImageProvider(mongoClient)
        if(!req.body.name) {
            res.status(400).send({
                error: "Bad request",
                message: "Missing name property"
            });
        }

        ip.updateImageName(req.params.id, req.body.name).then(r =>
            {
                if(r == 0) {
                    res.status(404).send({
                        error: "Not found",
                        message: "Image does not exist"
                    });
                }
                res.status(204).send()
            }
        )
    });
}