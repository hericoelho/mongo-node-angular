const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
   create: function (req, res) {
      var cpfSomenteNumeros;
      if (req.body.cpf) {
         cpfSomenteNumeros = req.body.cpf.replace(/[^\d]+/g, '');
      }
      User.create({
         name: req.body.name,
         cpf: cpfSomenteNumeros,
         email: req.body.email,
         password: req.body.password,
         birth_date: req.body.birth_date
      }).then(data => {
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

      if (req.body.email) {
         email = req.body.email;
         password = req.body.password;
      } else {
         email = req.query.email;
         password = req.query.password;
      }
      console.log(req.body.password);
      User.findOne({ where: { email: email } }, 'name email cpf password')
         .then(user => {
            if (user) {
               if (bcrypt.compareSync(password, user.password)) {                  
                  const token = jwt.sign({ id: user.id }, req.app.get('secretKey'), { expiresIn: '1h' });
                  res.setHeader('Access-Control-Allow-Headers', 'Authorization,content-type');
                  res.setHeader('Access-Control-Expose-Headers', 'Authorization');
                  res.header('Authorization', 'Bearer ' + token);
                  res.json({ status: "success", message: "Usuario autenticado com sucesso!!!", data: { user: user, token: token } });
               } else {
                  res.status(500).json({ status: "error", message: "Não foi possivel autenticar o usuario. Por favor verifique os dados de email e password!!!", data: null });
               }
               res.send(user);
            } else {
               res.status(500).send({
                  message: "Não foi possivel autenticar o usuario, verifique o email e senha."
               });
            }
         }).catch(err => {
            res.status(500).send({
               message: err.message || "Ocorreu um erro ao autenticar o usuario."
            });
         });
   },
   findAll: function (req, res) {
      User.findAll()
         .then(users => {
            res.send(users);
         }).catch(err => {
            res.status(500).send({
               message: err.message || "Ocorreu um erro ao acessar a lista de usuarios"
            });
         });
   },
   findOne: function (req, res) {
      User.findByPk(req.params.id)
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
      User.findOrCreate({ where: { id: req.params.id } ,
         defaults: {
         name: req.body.name,
         cpf: cpfSomenteNumeros,
         email: req.body.email,
         password: req.body.password,
         data_de_nascimento: req.body.data_de_nascimento,
         data_de_cadastro: req.body.data_de_cadastro
      }})
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
      User.findByPk(req.params.id)
         .then(user => {
            if (!user) {
               return res.status(404).send({
                  message: "Nenhum usuario encontrado para o  id : " + req.params.id
               });
            }
            res.send(User.User.destroy());
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
   }, fetch: function (req, res) {
      User.findByPk(req.body.userId)
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