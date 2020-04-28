const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SolicitationSchema = new Schema({
    patient: {
        name: {
            type: String,
            trim: true,
        },
        age: {
            type: Number,
            required: true
        },
        sex: {
            type: Number,
            required: true
        },
    },
    procedure: {
        cod: {
            type: String,
            trim: true,
            required: true
        },
    },
    technical_advice: [{
        agent: {
            type: String,
            trim: true,
            required: true
        },
        opinion: {
            allowed: {
                type: Boolean,
                required: true,
                default: false,
            },
            description: {
                type: String,
                trim: true,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }

    }],
});

module.exports = mongoose.model('Solicitation', SolicitationSchema);