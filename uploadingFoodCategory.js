const { MongoClient } = require('mongodb');
const fs = require('fs');

// Connection URI for MongoDB Atlas
const uri = 'mongodb+srv://gofood:Sanya%402112@cluster0.ipor9j7.mongodb.net/?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function uploadJSONFile() {
  try {
    // Connect to the MongoDB Atlas cluster
    await client.connect();

    // Specify the database and collection names
    const databaseName = 'food';
    const collectionName = 'food_category';

    // Read the JSON file
    const jsonData = fs.readFileSync('foodCategory.json');

    // Parse the JSON data
    const data = JSON.parse(jsonData);

    // Access the database and collection
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    // Insert the data into the collection
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted successfully.`);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Call the uploadJSONFile function
uploadJSONFile();
