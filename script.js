$('document').ready(function(){
    
    let canvas = document.getElementById('paint');
    let ctx = canvas.getContext('2d');
    let draw = false;
    let start = true;
    

    function getPosition(canvas, e) {
        let rect = canvas.getBoundingClientRect(),
            scaleX = canvas.width / rect.width,
            scaleY = canvas.height / rect.height;
        return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
        };
    }

    function startDraw(e) {
        let position = getPosition(canvas, e);
        draw = true;
        x = position.x;
        y = position.y;
        
    }

    function stopDraw() {
        draw = false;
        start = false;
    }

    function move(e) {
        if(draw) {
            let position = getPosition(canvas, e);
            x = position.x;
            y = position.y;
            drawLine();
        }
    }

    function drawLine() {
        if (!start) {
            ctx.beginPath();
            ctx.moveTo(x,y);
            start = true;
        } else {
        //size of brush
        let brush = 2;
        //let brush = document.getElementById('brush').value;
        //let color = document.getElementById('color_hexa').value;
        ctx.lineTo(x,y);
        ctx.strokeStyle = "#222222";
        ctx.lineWidth = brush;
        ctx.stroke();
        }
    }
    $('canvas').mouseout(function(){
        draw = false;
        stopDraw();
    })

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mousemove', move);


    $('#new').click(function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    })

    let link = document.getElementById('save');
    link.addEventListener('click', function(ev) {
        link.href = canvas.toDataURL();
        link.download = "mypainting.png";
    }, false);
    
})
