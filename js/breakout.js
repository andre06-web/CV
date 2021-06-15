    $(document).ready(function() {
  $("#playButton").click(function() {
    $("#bomainMenu").hide();
    $("#gameCanvas").show();

    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");

    var paddleHeight = 10;
    var paddleWidth = 75;

    var paddleX = (canvas.width - paddleWidth) / 2;

    var x = canvas.width / 2;
    var y = canvas.height - 30;
    var ballRadius = 10;

    var dx = 2;
    var dy = -2;

    var rightPressed = false;
    var leftPressed = false;

    var brickRowCount = 3;
    var brickColumnCount = 5;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var score = 0;
    var reset = new Boolean(true);
    var lives = 2;

    var bricks = [];

    function loadbricks() {
      if (reset == true) {
        for (c = 0; c < brickColumnCount; c++) {
          bricks[c] = [];
          for (r = 0; r < brickRowCount; r++) {
            bricks[c][r] = {
              x: 0,
              y: 0,
              status: 1
            };
          }
        }
        reset = false;
      }
    }

    function drawBricks() {
      for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status == 1) {
            var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            if (r == 2) {
              ctx.fillStyle = "#0000FF"; //"#0095DD";
            } else if (r == 0) {
              ctx.fillStyle = "#00FF00";
            } else {
              //ctx.fillStyle = "0095DD";
              ctx.fillStyle = "#FF0000";
            }
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }

    function drawScore() {
      ctx.font = "16px, Arial";
      ctx.fillStyle = "#000";
      ctx.fillText("Score:" + score, 8, 20);
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }

    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(
        paddleX,
        canvas.height - paddleHeight,
        paddleWidth,
        paddleHeight
      );
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }

    function collisionDetection() {
      for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
          var b = bricks[c][r];
          if (b.status == 1) {
            if (
              x > b.x &&
              x < b.x + brickWidth &&
              y > b.y &&
              y < b.y + brickHeight
            ) {
              dy = -dy;
              b.status = 0;
              score++;
              //reset = score / reset;
              if (score % 15 == 0) {
                reset = true;
                //loadBricks()
              }
            }
          }
        }
      }
    }

    function drawLives() {
      ctx.font = "Arial";
      ctx.fillStyle = "#0095DD";
      ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }

    function draw() {
      loadbricks();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddle();
      drawBricks();
      collisionDetection();
      drawScore();
      drawLives();
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        } else {
          if (!lives) {
            //Puts ball in set position so window can reload
            x = -20;
            y = -20;
            alert("Game Over, Score is: " + score);
            window.location.reload(true);
          } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 2;
            dy = -2;
            //paddleX = (canvas.width - paddleWidth)/2;
            lives--;
          }
        }
      }

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }
      x += dx;
      y += dy;
    }

    setInterval(draw, 10);

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e) {
      if (e.keyCode == 39) {
        rightPressed = true;
      } else if (e.keyCode == 37) {
        leftPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.keyCode == 39) {
        rightPressed = false;
      } else if (e.keyCode == 37) {
        leftPressed = false;
      }
    }
  });
});
    