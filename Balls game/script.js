        var canvas = document.getElementById("gameCanvas");
        var ctx = canvas.getContext("2d");

        var ball_R = 20,
            x = canvas.width / 2,
            y = canvas.height - 30,
            dx = 3,
            dy = -3,
            pongH = 15,
            pongW = 200,
            pongX = (canvas.width - pongW) / 2,
            rightKey = false,
            leftKey = false,
            score = 0,
            life = 5,

            Balls = new Array(6)

        function ball() {
            Balls = Balls.fill(0).map(_ => ({
                x: Math.random() * (canvas.width - 2 * ball_R) + ball_R,
                y: ball_R + 1,
                dx: Math.random() * 2 - 1,
                dy: -(Math.random() + 0.1),
            }))

        }

        ball()


        function drawBall() {
            Balls.forEach(c => {
                ctx.beginPath();
                ctx.arc(c.x, c.y, ball_R, 0, Math.PI * 2);
                ctx.fillStyle = "#333";
                ctx.fill();
                ctx.closePath();
            });

        }

        function drawText() {
            ctx.fillStyle = "#333";
            ctx.font = "20px consolas";
            ctx.fillText("- Score: " + score + "    - Life: " + life, 10, 30);
        }

        function drawPong() {
            if (rightKey) pongX += 10
            if (leftKey) pongX -= 10
            ctx.beginPath();
            ctx.rect(pongX, canvas.height - pongH, pongW, pongH);
            ctx.fillStyle = "#f00";
            ctx.fill();
            ctx.closePath();
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBall();
            drawPong();
            drawText()

            Balls.forEach(c => {

                if (hitSideWall())
                    c.dx = -c.dx - 0.01;

                if (hitPong()) {
                    c.dy = -c.dy - 0.01;
                    score++;
                }

                if (hitTop())
                    c.dy = -c.dy - 0.01;

                if (hitBottom()) {
                    life--;
                    c.x = Math.random() * (canvas.width - 2 * ball_R) + ball_R;
                    c.y = ball_R + 1;
                }


                if (gameOver()) {
                    ctx.fillStyle = "#f00";
                    ctx.font = "50px Verdana";
                    ctx.fillText("Game Over !", (canvas.width / 2) - 75, (canvas.height / 2));
                    return;
                }

                function hitPong() {
                    return hitBottom() && ballOverPong();
                }

                function ballOverPong() {
                    return c.x > pongX && c.x < pongX + pongW;
                }

                function hitBottom() {
                    return c.y + c.dy > canvas.height - ball_R;
                }

                function gameOver() {
                    return life == 0;
                }

                function hitSideWall() {
                    return c.x + c.dx > canvas.width - ball_R || c.x + c.dx < ball_R;
                }

                function hitTop() {
                    return c.y + c.dy < ball_R;
                }

                function xOutOfBounds() {
                    return c.x + c.dx > canvas.width - ball_R || c.c.x + c.dx < ball_R;
                }

                function rightPressed(e) {
                    return e.key == 'ArrowRight';
                }

                function leftPressed(e) {
                    return e.key == 'ArrowLeft';
                }

                function keyDown(e) {
                    rightKey = rightPressed(e);
                    leftKey = leftPressed(e);
                }

                function keyUp(e) {
                    rightKey = rightPressed(e) ? false : rightKey;
                    leftKey = leftPressed(e) ? false : leftKey;
                }

                document.addEventListener("keydown", keyDown, false);
                document.addEventListener("keyup", keyUp, false);

                var maxX = canvas.width - pongW,
                    minX = 0,
                    pongDelta = rightKey ? 0.5 : leftKey ? -0.5 : 0;

                pongX = pongX + pongDelta;
                pongX = Math.min(pongX, maxX);
                pongX = Math.max(pongX, minX);

                c.x += c.dx;
                c.y += c.dy;
            });

        }

        setInterval(draw, 10);