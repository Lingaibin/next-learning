import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            throw new Error(
                "Please define the MONGODB_URI environment variable"
            );
        }

        const client = await MongoClient.connect(uri);
        const db = client.db();

        const meetupsCollection = db.collection("meetups");

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: "Meetup inserted!" });
    }
}

export default handler;
