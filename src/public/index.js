function init() {
    
    let mouse = {
        clic: false,
        move: false,
        pos: { x: 0, y: 0 },
        pos_prev: false
    }

    // sizes
    const width = window.innerWidth;
    const height = window.innerHeight;

    const socket = io();

    // canvas
    let canvas = document.getElementById('drawing');
    let context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    canvas.addEventListener('mousedown', (e) => {
        mouse.clic = !mouse.clic;
    });

    canvas.addEventListener('mouseup', (e) => {
        mouse.clic = !mouse.clic;
    });

    canvas.addEventListener('mousemove', (e) => {
        mouse.pos.x = e.clientX / width;
        mouse.pos.y = e.clientY / height;
        mouse.move = !mouse.move;
    });

    socket.on('drawing', data => {
        let line = data.line;
        context.beginPath();
        context.lineWidth = 2;
        context.moveTo(line[0].x * width, line[0].y * height);
        context.lineTo(line[1].x * width, line[1].y * height)
        context.stroke();
    });

    function mainLoop() {
        if(mouse.clic && mouse.move && mouse.pos_prev) {
            socket.emit('drawing', {
                line: [mouse.pos, mouse.pos_prev]
            });
            mouse.move = !mouse.move;
        }
        mouse.pos_prev = { x: mouse.pos.x, y: mouse.pos.y };
        setTimeout(mainLoop, 10);
    }

    mainLoop();
}

document.addEventListener('DOMContentLoaded', init);