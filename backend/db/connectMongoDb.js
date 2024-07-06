import mongoose from "mongoose";


const ConnectMongoDb = async (req, res) => {
    try {
    
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        
    } catch (error) {
        
        console.log(`error connecting to mongodb: ${error.message}`)
        process.exit(1);
    }
}


export default ConnectMongoDb;