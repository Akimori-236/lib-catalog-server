const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URL;

const mongodb = {
    test: (callback) => {
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        client.connect((err) => {
            if (err) {
                callback(err);
                return;
            }
            client.db("admin").command({ ping: 1 }, (err) => {
                if (err) {
                    callback(err);
                    return;
                }
                console.log(
                    "Pinged your deployment. You successfully connected to MongoDB!"
                );
                client.close();
                callback(null);
            });
        });
    },
    getLimited: (limit, offset, callback) => {
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        client.connect((err) => {
            if (err) {
                callback(err, null);
                return;
            }
            client
                .db("sheetmusic")
                .collection("sheetmusic")
                .find({})
                .skip(offset)
                .limit(limit)
                .toArray((err, result) => {
                    client.close();
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, result);
                    }
                });
        });
    },
};

module.exports = mongodb;
