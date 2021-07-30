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
        //taille du pinceau
        let brush = 2;
        ctx.lineTo(x,y);
        ctx.strokeStyle = "#222222";//couleur noire par défaut
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
    //button pour tester la recuperation de l'image a partir du canvas
    var link = document.getElementById('save');
    link.addEventListener('click', async function(ev) {
        //condition de verification avant de creer l'image
        if(isCanvasBlank(canvas)){
            alert('vide')
        }else{
            alert('rempli');
            link.href = await canvas.toDataURL();
        link.download = "mypainting.png";
        }
        
    }, false);
})



// function qui verifi que le canvas est vide
function isCanvasBlank(canvas) {
    const context = canvas.getContext('2d');
  
    const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
  
    return !pixelBuffer.some(color => color !== 0);
  }
