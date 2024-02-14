const mongoose = require('../db/conn');
const { Schema } = mongoose;

const Agenda = mongoose.model(
    'Agenda',
    new Schema(
    {
        id_imovel: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        },
        user: Object,
        info: Object
    }, 
    {timestamps: true},
    ),
)

module.exports = Agenda;
