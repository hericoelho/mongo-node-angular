const userModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
   create: function (req, res) {
      var cpfSomenteNumeros;
      if (req.body.cpf) {
         cpfSomenteNumeros = req.body.cpf.replace(/[^\d]+/g, '');
      }
      const user = new userModel({
         nome: req.body.nome,
         cpf: cpfSomenteNumeros,
         email: req.body.email,
         password: req.body.password,
         data_de_nascimento: req.body.data_de_nascimento,
         data_de_cadastro: req.body.data_de_cadastro
      });

      user.save()
         .then(data => {
            res.send(data);
         }).catch(err => {
            res.status(500).send({
               message: err.message || "Ocorreu um erro ao cadastrar o usuario."
            });
         });
   },
   authenticate: function (req, res) {
      var email;
      var password;

      console.log(req.query);
      if (req.body.email) {
         email = req.body.email;
         password = req.body.password;
      } else {
         email = req.query.email;
         password = req.query.password;
      }

      userModel.findOne({ email: email }, 'nome email cpf password')
         .then(user => {
            if (bcrypt.compareSync(password, user.password)) {
               const token = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn: '1h' });
               res.setHeader('Access-Control-Allow-Headers', 'Authorization,content-type');
               res.setHeader('Access-Control-Expose-Headers', 'Authorization');
               res.header('Authorization', 'Bearer ' + token);
               res.json({ status: "success", message: "Usuario autenticado com sucesso!!!", data: { user: user, token: token } });
            } else {
               res.json({ status: "error", message: "Não foi possivel autenticar o usuario. Por favor verifique os dados de email e password!!!", data: null });
            }
            res.send(user);
         }).catch(err => {
            res.status(500).send({
               message: err.message || "Ocorreu um erro ao autenticar o usuario."
            });
         });
   },
   findAll: function (req, res) {
      userModel.find({}, '_id nome email cpf')
         .then(users => {
            res.send(users);
         }).catch(err => {
            res.status(500).send({
               message: err.message || "Ocorreu um erro ao acessar a lista de usuarios"
            });
         });
   },
   findOne: function (req, res) {
      userModel.findById(req.params.id)
         .then(user => {
            if (!user) {
               return res.status(404).send({
                  message: "Nenhum usuario encontrado para o  id : " + req.params.id
               });
            }
            res.send(user);
         }).catch(err => {
            if (err.kind === 'ObjectId') {
               return res.status(404).send({
                  message: "Nenhum usuario encontrado para o  id : " + req.params.id
               });
            }
            res.status(500).send({
               message: err.message || "Ocorreu um erro ao acessar os dados do usuario id : " + req.params.id
            });
         });
   },
   update: function (req, res) {
      var cpfSomenteNumeros;
      if (req.body.cpf) {
         cpfSomenteNumeros = req.body.cpf.replace(/[^\d]+/g, '');
      }
      userModel.findByIdAndUpdate(req.params.id,
         {
            nome: req.body.nome,
            cpf: cpfSomenteNumeros,
            email: req.body.email,
            password: req.body.password,
            data_de_nascimento: req.body.data_de_nascimento,
            data_de_cadastro: req.body.data_de_cadastro
         }, { new: true })
         .then(user => {
            if (!user) {
               return res.status(404).send({
                  message: "Nenhum usuario encontrado para o  id : " + req.params.id
               });
            }
            res.send(user);
         }).catch(err => {
            if (err.kind === 'ObjectId') {
               return res.status(404).send({
                  message: "Nenhum usuario encontrado para o  id : " + req.params.id
               });
            }
            res.status(500).send({
               message: err.message || "Ocorreu um erro ao acessar os dados do usuario id : " + req.params.id
            });
         });
   },
   delete: function (req, res) {
      userModel.findByIdAndRemove(req.params.id)
         .then(user => {
            if (!user) {
               return res.status(404).send({
                  message: "Nenhum usuario encontrado para o  id : " + req.params.id
               });
            }
            res.send(user);
         }).catch(err => {
            if (err.kind === 'ObjectId') {
               return res.status(404).send({
                  message: "Nenhum usuario encontrado para o  id : " + req.params.id
               });
            }
            res.status(500).send({
               message: err.message || "Ocorreu um erro ao acessar os dados do usuario id : " + req.params.id
            });
         });
   }, refresh: function (req, res) {
      res.status(200).send({
         message: "Validade do token atualizada" 
      });  
   },fetch: function (req, res) {
      userModel.findById(req.body.userId)
      .then(user => {
         if (!user) {
            return res.status(404).send({
               message: "Nenhum usuario encontrado para o  id : " + req.params.id
            });
         }
         res.send(user);
      }).catch(err => {
         if (err.kind === 'ObjectId') {
            return res.status(404).send({
               message: "Nenhum usuario encontrado para o  id : " + req.params.id
            });
         }
         res.status(500).send({
            message: err.message || "Ocorreu um erro ao acessar os dados do usuario id : " + req.params.id
         });
      });
   },


}