const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Move = mongoose.model(
    'Move',
    new Schema(
    {
        imovel: {
            type: String,
            required: true
        },
        tipo: {
            type: String,
            required: true
        },
        preco: {
            type: Number,
            required: true
        },
        descricao: {
            type: String,
            required: true
        },
        images: {
            type: Array,
            required: true
        },
        available: {
            type: Boolean
        },
        user: Object,
        info: Object
    }, 
    {timestamps: true},
    ),
)


module.exports = Move;


