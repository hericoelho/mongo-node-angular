const solicitationModel = require('../models/solicitationsModel');
module.exports = {
   create: function (req, res) {
      console.log(req.body);
      const solicitation = new solicitationModel(req.body.solicitation);

      solicitation.save()
         .then(data => {
            res.send(data);
         }).catch(err => {
            res.status(500).send({
               message: err.message || "Ocorreu um erro ao registrar a solicitação."
            });
         });
   },
   findAll: function (req, res) {
      solicitationModel.find({})
         .then(data => {
            res.send(data);
         }).catch(err => {
            res.status(500).send({
               message: err.message || "Ocorreu um erro ao acessar a lista de solicitações"
            });
         });
   },
   findOne: function (req, res) {
      solicitationModel.findById(req.params.id)
         .then(data => {
            if (!data) {
               return res.status(404).send({
                  message: "Nenhuma solicitação encontrada para o  id  : " + req.params.id
               });
            }
            res.send(data);
         }).catch(err => {
            if (err.kind === 'ObjectId') {
               return res.status(404).send({
                  message: "Nenhuma solicitação encontrada para o  id  : " + req.params.id
               });
            }
            res.status(500).send({
               message: err.message || "Ocorreu um erro ao acessar os dados da solicitação id : " + req.params.id
            });
         });
   },
   update: function (req, res) {

      solicitationModel.findByIdAndUpdate(req.params.id,
         req.body.solicitation, { new: true })
         .then(data => {
            if (!data) {
               return res.status(404).send({
                  message: "Nenhuma solicitação encontrada para o  id : " + req.params.id
               });
            }
            res.send(data);
         }).catch(err => {
            if (err.kind === 'ObjectId') {
               return res.status(404).send({
                  message: "Nenhuma solicitação encontrada para o  id : " + req.params.id
               });
            }
            res.status(500).send({
               message: err.message || "Ocorreu um erro ao acessar os dados da solicitação id : " + req.params.id
            });
         });
   },
   delete: function (req, res) {
      solicitationModel.findByIdAndRemove(req.params.id)
         .then(data => {
            if (!data) {
               return res.status(404).send({
                  message: "Nenhuma solicitação encontrada para o  id : " + req.params.id
               });
            }
            res.send(data);
         }).catch(err => {
            if (err.kind === 'ObjectId') {
               return res.status(404).send({
                  message: "Nenhuma solicitação encontrada para o  id : " + req.params.id
               });
            }
            res.status(500).send({
               message: err.message || "Ocorreu um erro ao acessar os dados da solicitação id : " + req.params.id
            });
         });
   }

}