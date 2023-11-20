$(document).ready(function () {
  var canvas = document.querySelector('.snake')
  var canvas2d = canvas.getContext('2d')

  canvas.width = 700
  canvas.height = 600

  var snakeParts = []
  var snakeLength = 1

  var snakeX = 0
  var snakeY = 0

  var directionX = 10
  var directionY = 0


  var food = []
  

  var score = 0
  var highestScore = 0

  function move() {
    snakeX += directionX;
    snakeY += directionY;
  
    if (snakeX >= canvas.width) {
      snakeX = 0;
    } else if (snakeX < 0) {
      snakeX = canvas.width - 10
    }
  
    if (snakeY >= canvas.height) {
      snakeY = 0;
    } else if (snakeY < 0) {
      snakeY = canvas.height - 10
    }
  
    snakeParts.unshift({
      x: snakeX,
      y: snakeY
    })
  
    while (snakeParts.length > snakeLength) {
      snakeParts.pop();
    }
  }

  function drawSnake() {
    canvas2d.clearRect(0, 0, canvas.width, canvas.height)
    canvas2d.fillStyle = "yellow";
    for (let i = 0; i < snakeParts.length; i++) {
      canvas2d.fillRect(snakeParts[i].x, snakeParts[i].y, 10, 10)

    }
  }


  function gameLoop() {
    move()
    drawSnake()
    spawnmekla()
    checkCollision()
    if (!gameEnded) {
      setTimeout(gameLoop, 100)
    }
  }

  gameInterval = setInterval(gameLoop, 100)

  // KeyboardEvent.code
  document.onkeydown = function (event) {
    switch (event.keyCode) {
      case 37: //left
        directionX = -10
        directionY = 0
        break
      case 38: //up
        directionX = 0
        directionY = -10
        break
      case 39: //right
        directionX = 10
        directionY = 0
        break
      case 40: //down
        directionX = 0
        directionY = 10
        break
    }
  }


  function spawnmekla() {
    if (food.length < 10) {
      var meklaX = Math.floor(Math.random() * canvas.width);
      var meklaY = Math.floor(Math.random() * canvas.height);
      food.push({ x: meklaX, y: meklaY })
    }
    for (var i = 0; i < food.length; i++) {
      canvas2d.fillStyle = "red"
      canvas2d.fillRect(food[i].x, food[i].y, 10, 10)
    }
  }

  function checkCollision() {
    for (var i = 0; i < food.length; i++) {
      if (snakeX < food[i].x + 10 && snakeX + 10 > food[i].x && snakeY < food[i].y + 10 && snakeY + 10 > food[i].y) {
        snakeLength++;
        food.splice(i, 1);
        score++;
        if (score > highestScore) {
          highestScore = score;
        }
        $(".score").text("Score: " + score);
        $(".highestscore").text("Highest Score: " + highestScore);
      }
    }

    for (var i = 1; i < snakeParts.length; i++) {
      if (snakeX === snakeParts[i].x && snakeY === snakeParts[i].y) {
        gameOver();
      }
    }
  }




  function gameOver() {
    if (score > highestScore) {
      highestScore = score;
    }
    $(".highestscore").text("Highest Score: " + highestScore);
    setTimeout(function () {
      alert("Game over!");
      // Reset the score
      score = 0;
      $(".score").text("Score: " + score);
    }, 500);
  
    gameEnded = true;
  }

})