window.onload = () => {
  const startButton = document.getElementById("start-button");
  startButton.addEventListener('click', function () {
    updateAnimation()
  })

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const cWidth = canvas.width;
  const cHeight = canvas.height;

  const backgraund = new Image();
  backgraund.src = '../images/field.jpg';
  backgraund.onload = () => ctx.drawImage(backgraund, -10, -30, cWidth + 20, cHeight + 55);

  //bola
  // const bola = new Image();
  // bola.src = '../images/bola.png';
  // let bolaY = 350;

  // function drawBola(y) {
  //   ctx.drawImage(bola, 130, y, 45, 35);
  // }
  // function updateBola() {
  //   bolaY -= 1;
  // }

  //inicio


  class Bola {
    constructor(x, y, w, h) {
      this.posX = x;
      this.posY = y;
      this.width = w;
      this.height = h;
      this.imgBola = new Image();
      this.imgBola.src = '../images/bola.png';
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

    moveHeight() {
      this.posY -= 155 //velocidade da bola
    }
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

    crashWith() {
      return !(this.bottom() < 200 || this.top() > 295 || this.right() < gkeepX || this.left() > gkeepX + 75);
    }
  };

  const player = new Bola(130, 350, 45, 35);


  //Goleiro
  const gkeep = new Image();
  gkeep.src = '../images/goalkeeper1.png';

  function drawGkeep(x) {
    ctx.drawImage(gkeep, x, 200, 95, 75);
  }

  let gkeepX = 50
  let direction = "direita"

  function updateGkeep() {
    if (gkeepX > 195) {
      direction = "esquerda"

    } else if (gkeepX < 15) {
      direction = "direita"
    }
    if (direction === "direita") {
      gkeepX += 3 //velocidade do goleiro
    }
    else if (direction === "esquerda") {
      gkeepX -= 3 //Velocidade do goleiro

    }
  }
  function checkCollision() {
    if (player.crashWith()) {

    }

  }


  //Animation
  function updateAnimation() {
    ctx.clearRect(0, 0, cWidth, cHeight)
    ctx.drawImage(backgraund, -10, -30, cWidth + 20, cHeight + 55);
    updateGkeep()
    drawGkeep(gkeepX)
    player.draw()
    checkCollision()



    requestAnimationFrame(updateAnimation)

  }
  //Movimento da Bola
  document.addEventListener("keypress", function (e) {
    console.log(e.key)
    if (e.key === " ") {
      player.moveHeight()

      console.log("teste");
    }
    if (e.key === "a") {
      player.moveLeft()
    }
    if (e.key === "d") {
      player.moveRight()
    }


  });





};

