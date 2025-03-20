import {Collection, MongoClient, ObjectId} from "mongodb";

interface EntryDocument {
    username: string;
    date: string;
    entries?: [string, string][];
    mood?: number;
}

export class EntryProvider {
    private readonly collection: Collection<EntryDocument>;

    constructor(private readonly mongoClient: MongoClient) {
        const entryCollectionName = process.env.ENTRY_COLLECTION_NAME;

        if (!entryCollectionName) {
            throw new Error("Missing collection names in environment variables");
        }

        this.collection = this.mongoClient.db().collection<EntryDocument>(entryCollectionName);
    }

    async getAllEntries(): Promise<EntryDocument[]> {
        return this.collection.find().toArray();
    }

    async getEntry(username: string, date: string): Promise<EntryDocument | null> {
        const entry = await this.collection.findOne({ username: username, date: date});
        return entry;
    }

    // technically "edits" the entry column by adding another entry to the list
    async addEntry(username: string, date: string, newEntry: [string, string]): Promise<number> {
        const filter = { username: username, date: date };

        const update = { $push: { entries: newEntry } };

        const result = await this.collection.updateOne(filter, update);

        return result.modifiedCount;
    }

    async addEntryDocument(date: string, username: string, entry?: [string,string], mood?: number): Promise<boolean> {
        const result = await this.collection.insertOne(
            {date: date, username: username, entries: (entry ? [entry] : []), mood: mood },
        );

        return result.acknowledged;
    }
}
