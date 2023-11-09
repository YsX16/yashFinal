const mongoose = require("mongoose")


mongoose.set('strictQuery',false);
// mongoose.set('strictQuery',true);


const connectDatabase =( ) => {
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
      
        
    }
    
    ).then((data) =>{
        console.log(`mongodb is now connected with server: ${data.connection.host}`)
    })
}

module.exports = connectDatabase