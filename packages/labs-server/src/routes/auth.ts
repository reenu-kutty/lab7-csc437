import express, {NextFunction, Request, Response} from "express";
import {MongoClient} from "mongodb";
import {CredentialsProvider} from "../CredentialsProvider";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction // Call next() to run the next middleware or request handler
) {
    const authHeader = req.get("Authorization");
    // The header should say "Bearer <token string>".  Discard the Bearer part.
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).end();
    } else { // signatureKey already declared as a module-level variable
        jwt.verify(token, signatureKey, (error, decoded) => {
            if (decoded) {
                next();
            } else {
                res.status(403).end();
            }
        });
    }
}

const signatureKey = process.env.JWT_SECRET as string;
if (!signatureKey) {
    throw new Error("Missing JWT_SECRET from env file");
}

function generateAuthToken(username: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign(
            { username: username },
            signatureKey,
            { expiresIn: "1d" },
            (error, token) => {
                if (error) reject(error);
                else resolve(token as string);
            }
        );
    });
}

export function registerAuthRoutes(app: express.Application, mongoClient: MongoClient) {
    app.post("/auth/register", (req: Request, res: Response) => {
        if(!(req.body.username && req.body.password)){
            res.status(400).send({
                error: "Bad request",
                message: "Missing username or password"
            });
        }
        const credP = new CredentialsProvider(mongoClient)

        credP.registerUser(req.body.username, req.body.password).then(available => {
            if (!available) {
                res.status(400).send({
                    error: "Bad request",
                    message: "Username already taken"
                });
            }
            const token = generateAuthToken(req.body.username)
            res.status(201).send({token: token})
        })
    });

    app.post("/auth/login", (req: Request, res: Response) => {
        const {username, password} = req.body;
        if(!(username && password)) {
            res.status(400).send({
                error: "Bad request",
                message: "Did not provide username or password"
            });
        }
        const credP = new CredentialsProvider(mongoClient)

        credP.verifyPassword(username, password).then(matches =>
        {
            if(matches) {
                const token = generateAuthToken(username)
                res.status(200).send({token: token})
            }
            else res.status(401).send({
                error: "Bad request",
                message: "Incorrect username or password"
            });
        })
    });
}
