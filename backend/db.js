const mongoose = require("mongoose");

const mongoURL = "mongodb://localhost:27017/lovefood";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("Database connected");

    const foodItem = mongoose.model("fooditems", new mongoose.Schema({}));
    const data = await foodItem.find({}).exec();
    global.food_items = data; //by declaring a global variable now we can use/update it anywhere in our application.
     
  
    const foodCategory = mongoose.model("foodcategories", new mongoose.Schema({}));
    const catdata = await foodCategory.find({}).exec();
    global.food_categories = catdata;


  } catch (error) {
    console.log(error);
  }

  
};

module.exports = mongoDB;
