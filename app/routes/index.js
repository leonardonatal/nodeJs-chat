/* application ja vem incluido do consign para obter as configuracoes do servidor */

const app = require("../../config/server")

module.exports = function(application){
    application.get('/', function(req, res){
        application.app.controllers.index.home(application, req, res);
    })
}