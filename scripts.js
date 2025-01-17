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

                // JavaScript Code
                document.getElementById('experience-show-more').addEventListener('click', function () {
            const experienceList = document.getElementById('experience-list');
            if (this.textContent === 'Show More') {
                experienceList.insertAdjacentHTML('beforeend', `
                    <div class="timeline-item volunteering">
                        <img src="pictures/RedCrosslogo.jpg" alt="Red Cross Logo">
                        <div class="timeline-item-content">
                            <h3 class="volunteering">Organization Team</h3>
                            <h4>International Federation of Red Cross and Red Crescent Societies</h4>
                            <p>May 2019 - Jul 2023</p>
                            <p>Organized community outreach programs focused on health education and disaster preparedness, helping communities become more aware and resilient in emergency situations.</p>
                        </div>
                    </div>
                    <div class="timeline-item">
                        <img src="pictures/Knight'sRoboticslogo.png" alt="Knights Robotics Logo">
                        <div class="timeline-item-content">
                            <h3>Electrical Engineering Team Member</h3>
                            <h4>Queen's Knights Robotics Team</h4>
                            <p>Sep 2024 - Present </p>
                            <p>Played a key role in designing and implementing electrical systems for robotics competitions, ensuring efficient integration of hardware and software components.</p>
                        </div>
                    </div>

                                <!-- Item 6: Volunteering -->
            <div class="timeline-item volunteering">
                <img src="pictures/trustprogram.jpg" alt="Trust Program Logo">
                <div class="timeline-item-content">
                    <h3 class="volunteering">Teacher</h3>
                    <h4>Trust Program</h4>
                    <p>May 2019 - Jul 2023 </p>
                    <p>Taught foundational literacy and numeracy skills to underprivileged children, using engaging lesson plans to inspire confidence and curiosity.</p>
                </div>
            </div>
    
            <!-- Item 7: Experience -->
            <div class="timeline-item">
                <img src="pictures/LOCALB.jpg" alt="Local Business Logo">
                <div class="timeline-item-content">
                    <h3>Web Developer</h3>
                    <h4>Local Businesses</h4>
                    <p>Jan 2020 - Jul 2024</p>
                    <p>Developed and maintained websites for small businesses, improving their online presence.</p>
                </div>
            </div>
    
            <div class="timeline-item volunteering">
                <img src="pictures/FGCLogo.png" alt="FIRST Global Logo">
                <div class="timeline-item-content">
                    <h3 class="volunteering">Flying Squad</h3>
                    <h4>FIRST Global (IFCA)</h4>
                    <p>Oct 2023 </p>
                    <p>Provided technical assistance at the Robot Hospital during the FIRST Global Challenge, repairing, debugging, and ensuring robots met competition standards.</p>
                </div>
            </div>
    
            <!-- Item 9: Experience -->
            <div class="timeline-item">
                <img src="pictures/FGCLogo.png" alt="FIRST Global Logo">
                <div class="timeline-item-content">
                    <h3>Mentor</h3>
                    <h4>FIRST Global (IFCA)</h4>
                    <p>Nov 2022 - Present</p>
                    <p>Mentored students in robotics design and programming, focusing on fostering teamwork, collaboration, and problem-solving skills for international competitions.</p>
                </div>
            </div>
    
            <!-- Item 10: Volunteering -->
            <div class="timeline-item volunteering">
                <img src="pictures/USAIDLOGO.png" alt="USAID Logo">
                <div class="timeline-item-content">
                    <h3 class="volunteering">Organizer and Representative</h3>
                    <h4>USAID</h4>
                    <p>May 2019 - Jul 2023</p>
                    <p>Represented the organization in human rights, education, and community development initiatives, organizing impactful workshops and community programs.</p>
                </div>
            </div>

                `);
                this.textContent = 'Show Less';
            } else {
                // Remove dynamically added items
                const additionalItems = experienceList.querySelectorAll('.timeline-item:nth-child(n+4)');
                additionalItems.forEach(item => item.remove());
                this.textContent = 'Show More';
            }
        });









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
    
    ctx.fillStyle = 'lime';
    for (let part of snake) {
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize);
    }

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
                { x: 0, y: -1 } 
            ];

            const prioritizedDirections = [];
            if (Math.abs(food.x - x) > Math.abs(food.y - y)) {
                prioritizedDirections.push(directions[0], directions[2], directions[1], directions[3]);
            } else {
                prioritizedDirections.push(directions[1], directions[3], directions[0], directions[2]);
            }

            for (let dir of prioritizedDirections) {
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

    direction = bfs();
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
