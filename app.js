/* importar as config do servidor */

var app = require('./config/server');

/* parametrizar a porta de escuta */

var server = app.listen(80, function(){
    console.log('SV online');
})

var io = require('socket.io').listen(server);

/* definindo uma variavel global para toda aplicacao */
app.set('io', io);

/* criar a conexao por websocket */
io.on('connection', function(socket){
    console.log('User connected');

    socket.on('disconnect', function(){
        console.log('Usuário desconectado');
    })

    socket.on('msgParaServidor', function(data){

        /*dialogo */
        socket.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        socket.broadcast.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}
        );

        /* participantes */
        if(parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            );

            socket.broadcast.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            );
        }
    });
});