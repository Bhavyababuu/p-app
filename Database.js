const mongoose=require("mongoose")

const connectDB=async()=>{
try{
    const connection=await mongoose.connect("mongodb+srv://todo:JVfnDGgwDQg5ocrY@cluster0.fwvnr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

    console.log("Database is connected");
}
catch(error){
console.log(error)
}
}
module.exports=connectDB

