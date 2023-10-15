import mongoose from "mongoose";

const connectDatabase = async (url) => {
    try {
        mongoose.connect(url).then((res) => {
            console.log(`MongoDb Connected Succesfully`);
        }).catch((err) => {
            console.log(`Mongo Dis hogay`);
        })
    } catch (error) {
        console.log(error.message);
    }
}

export default connectDatabase