const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://gofood:Sanya2003@cluster0.ipor9j7.mongodb.net/food?retryWrites=true&w=majority";
// const mongoURI=mongoose.connect('mongodb://gofood:Sanya%402112@cluster0.ipor9j7.mongodb.net/food?retryWrites=true&w=majority');

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected to MongoDB Atlas");
    
    // Retrieve and print the data
    const collection = mongoose.connection.db.collection("food_item");
    const data = await collection.find({}).toArray(async function(err,data){
      const foodCategory=await mongoose.connection.db.collection("food_category")
      foodCategory.find({}).toArray(function(err,catData){
        if(err) console.log(err);
        else{
          global.food_items=data;
          global.foodCategory=catData;
        }
      })
    });
  //   global.food_items=data;
  //   // console.log(global.food_items);
  // } catch (error) {
  //   console.error("An error occurred while connecting to MongoDB:", error);
  } 
  finally {
    // Close the connection
    mongoose.connection.close();
  }
};

module.exports = mongoDB;
