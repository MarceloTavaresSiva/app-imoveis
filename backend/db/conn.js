const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/appmoveis');
    console.log("Conexão ao mongo!");
}

main().catch((err) => console.log(err))
module.exports = mongoose;

