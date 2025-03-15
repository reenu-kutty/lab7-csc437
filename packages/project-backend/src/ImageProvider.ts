import { MongoClient } from "mongodb";

interface User {
    _id: string;
    username: string;
    email: string;
}

interface ImageDocument {
    _id: string;
    src: string;
    name: string;
    author: User; // Now fully denormalized
    likes: number;
}

export class ImageProvider {
    constructor(private readonly mongoClient: MongoClient) {}

    async getAllImages(authorFilter?: string): Promise<ImageDocument[]> {
        const imageCollectionName = process.env.IMAGES_COLLECTION_NAME;
        const authorCollectionName = process.env.USERS_COLLECTION_NAME;

        if (!imageCollectionName || !authorCollectionName) {
            throw new Error("Missing collection names in environment variables");
        }

        const collection = this.mongoClient.db().collection<ImageDocument>(imageCollectionName);

        const pipeline: any[] = [
            {
                $lookup: {
                    from: authorCollectionName, // Name of the authors collection
                    localField: "author", // The field in images (author ID)
                    foreignField: "_id", // Matching field in authors
                    as: "authorDetails", // Output array
                },
            },
            {
                $unwind: "$authorDetails", // Convert array into an object
            },
            {
                $set: { author: "$authorDetails" }, // Replace `author` ID with the full author object
            },
            {
                $unset: "authorDetails", // Remove the temporary field
            },
        ];

        // Conditionally add a match stage if authorFilter is provided
        if (authorFilter) {
            pipeline.unshift({ $match: { author: authorFilter } });
        }

        const images = await collection.aggregate<ImageDocument>(pipeline).toArray();
        return images;
    }

    async updateImageName(imageId: string, newName: string): Promise<number> {
        const imageCollectionName = process.env.IMAGES_COLLECTION_NAME;

        if (!imageCollectionName) {
            throw new Error("Missing collection names in environment variables");
        }

        const collection = this.mongoClient.db().collection<ImageDocument>(imageCollectionName);

        const result = await collection.updateOne(
            { _id: imageId },
            { $set: { name: newName } }
        );

        return result.matchedCount;
    }
}
