import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('Mongoose Connected')
        })

        connection.on('error', (error) => {
            console.log('Mongoose Error', error)
            process.exit()
        })
    }
    catch(error){
        console.log('Somethign went wrong')
       console.log(error)   
    }
}