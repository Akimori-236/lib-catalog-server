const { MongoClient, ServerApiVersion } = require("mongodb");

const URI = process.env.MONGO_URL;
const DATABASE = "sheetmusic";
const COLLECTION = "windBand";
const MAX_POOL_SIZE = 5;
const MIN_POOL_SIZE = 2;

const CLIENT = new MongoClient(URI, {
    maxPoolSize: MAX_POOL_SIZE,
    minPoolSize: MIN_POOL_SIZE,
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connectToDatabase() {
    try {
        await CLIENT.connect();
        console.log("Connected to MongoDB");
        const db = CLIENT.db(DATABASE);
        return db;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

const mongodb = {
    isUp: async (callback) => {
        try {
            // does not seem to work with callbacks
            const db = await connectToDatabase();
            await db.command({ ping: 1 });
            console.log(
                "Pinged your deployment. You successfully connected to MongoDB!"
            );
            callback(true);
        } catch (e) {
            callback(false);
        } finally {
            await CLIENT.close();
        }
    },

    getPaginated: async (limit, offset, callback) => {
        try {
            const db = await connectToDatabase();
            const collection = db.collection(COLLECTION);
            const total = await collection.countDocuments();
            const data = await collection
                .find({})
                .sort({ releaseDate: 1 })
                .skip(offset)
                .limit(limit)
                .toArray();
            const result = { total, data };
            callback(null, result);
        } catch (e) {
            console.error(e);
            callback(e.message, null);
        } finally {
            await CLIENT.close();
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
