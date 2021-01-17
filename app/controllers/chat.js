const { emit } = require("../../config/server");

module.exports.iniciaChat = function(application, req, res){

    var dadosForm = req.body;

    req.assert('apelido', 'Nome ou apelido é obrigatório').notEmpty();
    req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 char').len(3, 15);

    var erros = req.validationErrors();

    if(erros){
        // res.send('Existem erros no form');
        res.render("index", {validacao: erros});
        return;
    }

    application.get('io').emit(
        'msgParaCliente',
        {apelido: dadosForm.apelido, mensagem: 'ta no chat'}
    );

    res.render("chat", {dadosForm: dadosForm});
}