window.onload = () => {
    

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');




    
    const cWidth = canvas.width;
    const cHeight = canvas.height;

    const backgraund = new Image(); 
    backgraund.src = '../images/field.jpg'; 
    backgraund.onload  = () => ctx.drawImage(backgraund, -10, -30, cWidth + 20, cHeight +55);
    
    const bol = new Image();
    bol.src = '../images/bola.png';
    bol.onload = () => ctx.drawImage(bol, 130, 345, 45, 35);

    const gkeep = new Image();
    gkeep.src = '../images/goalkeeper1.png';
    
    function drawGkeep(x) {
    
     ctx.drawImage(gkeep, x, 200, 95, 75);
}
   let startPos = 50
    //gkeep.onload = () => ctx.drawImage(gkeep, cWidth /2, cHeight /2, 95, 75);

    //const player = new Image();
    //player.src ='../images/player1.png';
    //player.onload = () => ctx.drawImage(player, 140, 280, 140, 115);

    //mover goleiro 

    
    function updateCanvas() {
           
             
        if (startPos += 1) 
            
            ctx.clearRect(0, 0, cWidth, cHeight)

            

            drawGkeep(startPos)           
           
            requestAnimationFrame(updateCanvas);
            
            //alteração
            



          }
           
          updateCanvas();

      
    



};

