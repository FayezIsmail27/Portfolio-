const themeToggle = document.getElementById('themeToggle');

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                themeToggle.classList.replace('fa-moon', 'fa-sun');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeToggle.classList.replace('fa-sun', 'fa-moon');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').slice(1);
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            });
        });

                const experienceBtn = document.getElementById('experience-show-more');
const experienceList = document.getElementById('experience-list');




const expBtn = document.getElementById('experience-show-more');
if (expBtn) {
  expBtn.addEventListener('click', function () {
    // (old show more logic)
  });
}








const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20; 

function resizeCanvas() {
    const availableWidth = window.innerWidth;
    const availableHeight = window.innerHeight;

    canvas.width = Math.floor(availableWidth / gridSize) * gridSize;
    canvas.height = Math.floor(availableHeight / gridSize) * gridSize;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
let gridCountX = canvas.width / gridSize;
let gridCountY = canvas.height / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 1, y: 0 };
let gameInterval;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake with border
    for (let part of snake) {
        // Fill the body of the snake
        ctx.fillStyle = 'lime';
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);

        // Add a border to the snake's body
        ctx.strokeStyle = 'darkgreen'; // Border color
        ctx.lineWidth = 2; // Border thickness
        ctx.strokeRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    }

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}


function update() {
    const newHead = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
    };


    if (newHead.x < 0 || newHead.y < 0 || newHead.x >= gridCountX || newHead.y >= gridCountY) {
        resetGame();
        return;
    }


    for (let part of snake) {
        if (newHead.x === part.x && newHead.y === part.y) {
            resetGame();
            return;
        }
    }

    snake.unshift(newHead);
    if (newHead.x === food.x && newHead.y === food.y) {
        placeFood(); 
    } else {
        snake.pop(); 
    }

    aimForFood(); 
}

function placeFood() {
    const headerHeight = 60; 
    const headerGridRows = Math.ceil(headerHeight / gridSize);

    do {
        food.x = Math.floor(Math.random() * gridCountX);
        food.y = Math.floor(Math.random() * (gridCountY - headerGridRows)) + headerGridRows;
    } while (snake.some(part => part.x === food.x && part.y === food.y));
}



function aimForFood() {
    const head = snake[0];
    const visited = new Set();

    function isValid(x, y) {
        return (
            x >= 0 &&
            y >= 0 &&
            x < gridCountX &&
            y < gridCountY &&
            !snake.some(part => part.x === x && part.y === y)
        );
    }

    function calculateAccessibleArea(x, y) {
        const areaVisited = new Set();
        const queue = [{ x, y }];
        let accessibleCount = 0;

        while (queue.length > 0) {
            const { x: cx, y: cy } = queue.shift();
            const key = `${cx},${cy}`;

            if (areaVisited.has(key) || !isValid(cx, cy)) continue;

            areaVisited.add(key);
            accessibleCount++;

            const directions = [
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: -1, y: 0 },
                { x: 0, y: -1 },
            ];

            for (const dir of directions) {
                queue.push({ x: cx + dir.x, y: cy + dir.y });
            }
        }

        return (accessibleCount / ((gridCountX * gridCountY) - snake.length)) >= 0.8;
    }

    function bfs() {
        const queue = [{ x: head.x, y: head.y, path: [] }];
        visited.add(`${head.x},${head.y}`);

        while (queue.length > 0) {
            const { x, y, path } = queue.shift();

            if (x === food.x && y === food.y) {
                return path[0] || direction;
            }

            const directions = [
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: -1, y: 0 },
                { x: 0, y: -1 },
            ];

            const prioritizedDirections = [];
            if (Math.abs(food.x - x) > Math.abs(food.y - y)) {
                prioritizedDirections.push(directions[0], directions[2], directions[1], directions[3]);
            } else {
                prioritizedDirections.push(directions[1], directions[3], directions[0], directions[2]);
            }

            for (const dir of prioritizedDirections) {
                const nx = x + dir.x;
                const ny = y + dir.y;

                if (isValid(nx, ny) && !visited.has(`${nx},${ny}`)) {
                    visited.add(`${nx},${ny}`);
                    queue.push({ x: nx, y: ny, path: [...path, dir] });
                }
            }
        }

        return direction;
    }

    let optimalDirection = bfs();

    // Check if moving in the chosen direction maintains 80% accessibility
    const newHead = {
        x: head.x + optimalDirection.x,
        y: head.y + optimalDirection.y,
    };

    if (!calculateAccessibleArea(newHead.x, newHead.y)) {
        console.warn('Stalling: Unsafe move detected, recalculating.');
        optimalDirection = direction; // Stall or choose current direction
    }

    direction = optimalDirection;
}


function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 1, y: 0 };
    gridCountX = canvas.width / gridSize;
    gridCountY = canvas.height / gridSize;
    placeFood();
}

function gameLoop() {
    update();
    draw();
}

function startGame() {
    resetGame();
    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 100);
}
startGame();

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
