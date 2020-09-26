const mongoose = require('mongoose');


const connectDB =async ()=>{
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/bookLog',{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false

        });
        console.log(` mongodb connected to ${conn.connection.host}`.cyan.underline.bold)
    } catch (error) {
        console.log(`Error messages : ${error.message}`)
        process.exit(1)
        
    }
}


module.exports = connectDB;


