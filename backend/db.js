const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://gofood:Sanya2003@cluster0.ipor9j7.mongodb.net/food?retryWrites=true&w=majority";
// const mongoURI=mongoose.connect('mongodb://gofood:Sanya%402112@cluster0.ipor9j7.mongodb.net/food?retryWrites=true&w=majority');

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected to MongoDB Atlas");
    
    // Retrieve and print the data
    const collection = mongoose.connection.collection("food_item");
    const foodCategory=await mongoose.connection.collection("food_category");

    const data = await collection.find({}).toArray()
    const catData = await foodCategory.find({}).toArray()

    global.food_items = data;
    global.food_category = catData
    
  } catch (err) {
    console.error(err);
  }
}

module.exports = mongoDB;
