import mongoose from "mongoose";

export const connectToDataBase = async (MongoURI) => {
    try {
        const connection = await mongoose.connect(MongoURI);
        if(connection){console.log("DB Connected :)")}
    } catch (error) {
        console.log("Connection Refused : " , error);
    }
}
