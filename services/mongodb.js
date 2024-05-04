const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

const mongodb = {
    isUp: async (callback) => {
        try {
            // does not seem to work with callbacks
            await client.connect();
            const db = client.db("sheetmusic");
            await db.command({ ping: 1 });
            console.log(
                "Pinged your deployment. You successfully connected to MongoDB!"
            );
            callback(true);
        } catch (e) {
            callback(false);
        } finally {
            await client.close();
        }
    },

    getLimited: async (limit, offset, callback) => {
        try {
            await client.connect();
            const db = client.db("sheetmusic");
            const collection = db.collection("windBand");
            const result = await collection.find({}).skip(offset).limit(limit).toArray();
            console.log(result);
            callback(null, result);
        } catch (e) {
            console.error(e);
            callback(e.message, null);
        } finally {
            await client.close();
        }
    },

    search: (searchTerm, callback) => {
        // TODO: search function
    },

    addYoutubeLink: (link, callback) => {
        // TODO: add link based on title/id
    },
};

module.exports = mongodb;
