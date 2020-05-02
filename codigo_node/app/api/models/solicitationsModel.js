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
    result: {
        type: Boolean,
        default: false,
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

// PROCEDIMENTO	IDADE	SEXO	PERMITIDO
// 1234			10		M		SIM
// 1234			20		M		SIM
// 4567			20		M		SIM
// 4567			30		F		SIM
// 6789			10		F		NÃO
// 6789			10		M		SIM


SolicitationSchema.methods.preProcessing = function () {

    let processing = {
        agent: "Sistema",
        opinion: {
            allowed: false,
            description: "Avaliado conforme tabela padrão",
        }
    }

    switch (this.procedure.cod) {
        case '1234': {
            if (this.patient.sex === 0 && (this.patient.age === 10 || this.patient.age === 20)) {
                processing.opinion.allowed = true;
            }
        }
            break;
        case '4567': {
            if ((this.patient.sex === 0 && this.patient.age === 20) || (this.patient.sex === 1 && this.patient.age === 30)) {
                processing.opinion.allowed = true;
            }

        }
            break;
        case '6789': {
            if (this.patient.sex === 0 && this.patient.age === 10) {
                processing.opinion.allowed = true;
            }
        }
            break;
        default:
            processing.opinion.allowed = false;
    }
    this.technical_advice = processing;
};

SolicitationSchema.methods.processingResult = function () {
    if (this.technical_advice) {
        let arrayAdvice = this.technical_advice.slice();
        arrayAdvice.sort(function (advice1, advice2) {
            if (advice1.opinion.date > advice2.opinion.date) {
                return -1;
            }

            if (advice1.opinion.date > advice2.opinion.date) {
                return 1;
            }

            return 0;
        });
        console.log(arrayAdvice);

        this.result = arrayAdvice[0].opinion.allowed;
    }
};

module.exports = mongoose.model('Solicitation', SolicitationSchema);