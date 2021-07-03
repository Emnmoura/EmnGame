window.onload = () => {
  const startButton = document.getElementById("start-button");
  startButton.addEventListener('click', function () {
    updateAnimation()
  })

  let ponto = 0
  let animation = null

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  //Audio  
  let sgoal = new Audio();
  sgoal.src = './images/goal.mp3';
  sgoal.volume = 0.3;

  let sgameover = new Audio();
  sgameover.src = './images/game over.mp3';

  //Placar
  const score = function () {

    ctx.font = "35px VT323";
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${ponto}`, 0, 50, 130);
  }

  const cWidth = canvas.width;
  const cHeight = canvas.height;

  const backgraund = new Image();
  backgraund.src = './images/field.jpg';
  backgraund.onload = () => ctx.drawImage(backgraund, -10, -30, cWidth + 20, cHeight + 55);

  class Bola {
    constructor(x, y, w, h) {
      this.posX = x;
      this.posY = y;
      this.width = w;
      this.height = h;
      this.imgBola = new Image();
      this.imgBola.src = './images/bola.png';
      this.imgBola.onload = () => this.draw()
    }

    //Posição da Bola
    draw() {
      ctx.drawImage(this.imgBola, this.posX, this.posY, this.width, this.height);
    }

    moveWidth() {
      if (this.height > 350) {
        this.posY -= this.speed;
      }
    }
    moveRight() {
      this.posX += 5
    }
    moveLeft() {
      this.posX -= 5
    }
    //Velocidade da bola
    moveHeight() {
      this.posY -= 165
    }
    //Colisão 
    left() {
      return this.posX;
    }
    right() {
      return this.posX + this.width;
    }
    top() {
      return this.posY;
    }
    bottom() {
      return this.posY + this.height;
    }

    areaDoGol() {
      return !(this.right() < 70 || this.left() > 230 || this.bottom() < 200 || this.top() > 295);
    }

    crashWith() {
      return !(this.bottom() < 200 || this.top() > 295 || this.right() < gkeepX || this.left() > gkeepX + 75);
    }
  };

  const player = new Bola(130, 350, 45, 35);


  //Goleiro
  const gkeep = new Image();
  gkeep.src = './images/goalkeeper1.png';

  function drawGkeep(x) {
    ctx.drawImage(gkeep, x, 200, 99, 75);
  }

  let gkeepX = 50
  let direction = "direita"

  function updateGkeep() {

    if (gkeepX > 180) {
      direction = "esquerda"

    } else if (gkeepX < 25) {
      direction = "direita"
    }
    //Velocidade do goleiro
    if (direction === "direita") {
      gkeepX += 3,5
    }
    else if (direction === "esquerda") {
      gkeepX -= 3,5
    }

  }
  //Colisão 
  function checkCollision() {
    if (player.crashWith()) {
      sgameover.play();
      cancelAnimationFrame(animation);
      drawOver();
      return true
    }
    if (!player.crashWith() && direction === null) {
      sgoal.play();
      ponto += 1
      cancelAnimationFrame(animation);
      setTimeout(restart, 1000);
      drawGol();
      return true
    }
    return false

  }

  function drawGol() {
    let imgG = new Image();
    imgG.src = './images/goal.png';
    imgG.onload = () => ctx.drawImage(imgG, 100, 100, 150, 150);
  }
  function drawOver() {
    let img = new Image();
    img.src = './images/gameover.png';
    img.onload = () => ctx.drawImage(img, 100, 100, 150, 150);
  }

  //Animation
  function updateAnimation() {
    ctx.clearRect(0, 0, cWidth, cHeight)
    ctx.drawImage(backgraund, -10, -30, cWidth + 20, cHeight + 55);
    updateGkeep()
    drawGkeep(gkeepX)
    player.draw()
    if (!checkCollision()) {
      animation = requestAnimationFrame(updateAnimation)
    }

    score()
  }
  //Retornar a posição
  function restart() {
    player.posX = 130;
    player.posY = 350;
    direction = "direita"
    updateAnimation()

  }
  //Movimento da Bola
  document.addEventListener("keypress", function (e) {

    if (e.code === "KeyW") {
      player.moveHeight()
      direction = null
    }
    if (e.code === "KeyA") {
      player.moveLeft()
    }
    if (e.code === "KeyD") {
      player.moveRight()
    }
  });
};

