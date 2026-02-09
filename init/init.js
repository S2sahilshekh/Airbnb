const mongoose = require("mongoose");
const listing = require("../models/listingModel.js");
const initData = require("./data.js");
main().then((res)=>{
    console.log("Connecting to DB");
})
.catch((err) =>{
    console.log(err);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/NewDB');
}

const initDB = async ()=>{
    await listing.deleteMany({});
    initData.data = initData.data.map(obj => ({...obj, owner: "6974514d350167f328d5313f"}));
    await listing.insertMany(initData.data);
    console.log("Data is initialized");
};

initDB();

console.log(initData);