import mongoose from "mongoose"

export const dbConnection = async()=>{
    mongoose.connect(process.env.DB_CONN).then(()=>{
        console.log('db connected')
    }).catch((error)=>{
        console.log(error)
    })
}