const mongoose = require('mongoose')

require('dotenv').config();

async function main() {
    //await mongoose.connect('mongodb://localhost:27017/appmoveis');
   // console.log("Conexão ao mongo!");

   await mongoose.connect(process.env.DATABASE_URI);
   console.log("Conexão ao mongo!");

}


main().catch((err) => console.log(err))
module.exports = mongoose;

