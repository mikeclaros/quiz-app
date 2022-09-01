const { MongoClient } = require("mongodb")
const dotenv = require('dotenv').config()
const uri = `mongodb+srv://shiba:${process.env.PASS}@cluster0.85jwg.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri)

export async function run() {
    try {
        const database = client.db('sample_mflix');
        const movies = database.collection('movies');
        // Query for a movie that has the title 'Back to the Future'
        const query = { title: 'Back to the Future' };
        const movie = await movies.findOne(query);
        console.log(movie);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);