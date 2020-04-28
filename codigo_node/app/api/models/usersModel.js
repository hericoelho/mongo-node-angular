const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const Schema = mongoose.Schema;
const UserSchema = new Schema({
    nome: {
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
            validator: function(cpf) {
                var Soma;
                var Resto;
                Soma = 0;
              if (cpf == "00000000000") return false;
                 
              for (i=1; i<=9; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
              Resto = (Soma * 10) % 11;
               
                if ((Resto == 10) || (Resto == 11))  Resto = 0;
                if (Resto != parseInt(cpf.substring(9, 10)) ) return false;
               
              Soma = 0;
                for (i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
                Resto = (Soma * 10) % 11;
               
                if ((Resto == 10) || (Resto == 11))  Resto = 0;
                if (Resto != parseInt(cpf.substring(10, 11) ) ) return false;
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
    data_de_nascimento: {
        type: Date
    },
    data_de_cadastro: {
        type: Date,
        default: Date.now
    },
    lista_enderecos: [{
        Logradouro: {
            type: String,
        },
        CEP: {
            type: String,
            trim: true,
            minlength: [8, "Informe um CEP valido"],
            maxlength: [8, "Informe um CEP valido"],
        },
        Bairro: {
            type: String,
        },
        Cidade: {
            type: String,
        },
        UF: {
            type: String,
            trim: true,
            minlength: [2, "Informe um UF valido"],
            maxlength: [2, "Informe um UF valido"],
        }
    }],
    lista_telefones: [{
        telefone: {
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