const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    cpf: {
        type: String,
        trim: true,
        required: true,
        minlength: [11, "Informe um CPF valido"],
        maxlength: [11, "Informe um CPF valido"],
        unique: true,
        validate: {
            validator: function (cpf) {
                var sum;
                var rest;
                sum = 0;
                if (cpf == "00000000000") return false;

                for (i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
                rest = (sum * 10) % 11;

                if ((rest == 10) || (rest == 11)) rest = 0;
                if (rest != parseInt(cpf.substring(9, 10))) return false;

                sum = 0;
                for (i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
                rest = (sum * 10) % 11;

                if ((rest == 10) || (rest == 11)) rest = 0;
                if (rest != parseInt(cpf.substring(10, 11))) return false;
                return true;
            },
            message: props => `${props.value} não é um cpf valido!`
        },
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    birth_date: {
        type: Date
    },
    registration_date: {
        type: Date,
        default: Date.now
    },
    address_list: [{
        Street: {
            type: String,
        },
        CEP: {
            type: String,
            trim: true,
            minlength: [8, "Informe um CEP valido"],
            maxlength: [8, "Informe um CEP valido"],
        },
        District: {
            type: String,
        },
        City: {
            type: String,
        },
        UF: {
            type: String,
            trim: true,
            minlength: [2, "Informe um UF valido"],
            maxlength: [2, "Informe um UF valido"],
        }
    }],
    phone_list: [{
        phone: {
            type: String,
            minlength: [10, "Informe um numero de telefone valido"],
            maxlength: [11, "Informe um numero de telefone valido"],
        }
    }]
});

// gerando o salt antes de salvar o usuario 
UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});
module.exports = mongoose.model('User', UserSchema);