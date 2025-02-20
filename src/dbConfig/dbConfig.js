// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error("MONGODB_URI is not defined in .env.local");
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connect() {
//   if (cached.conn) return cached.conn;

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
//       console.log("✅ MongoDB Connected");
//       return mongoose;
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connect;

import mongoose from "mongoose";

export default async function connect() {

    try{
        await mongoose.connect(process.env.MONGODB_URI)
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