module.exports = io => {

    var pos_history = [];

    io.on('connection', socket => {

        for(let pos of pos_history) {
            
            io.emit('drawing', { line: pos });
        }
        
        socket.on('drawing', data => {

            pos_history.push(data.line);
            io.emit('drawing', data);
        })
    })
}