const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Move = mongoose.model(
    'Move',
    new Schema(
        {
            name: {
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
            cep: {
                type: String,
                required: true
            },
            rua: {
                type: String,
                required: true
            },
            numero: {
                type: String,  
                required: true
            },
            complemento: {
                type: String
            },
            bairro: {
                type: String,
                required: true
            },
            cidade: {
                type: String,
                required: true
            },
            estado: {
                type: String,
                required: true
            },
            available: {
                type: Boolean
            },
            user: Object,
            renter: Object
        },
        { timestamps: true },
    ),
);

module.exports = Move;
