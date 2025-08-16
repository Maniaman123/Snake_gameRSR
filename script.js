// Game variables
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('highScore');
const obstacleCountElement = document.getElementById('obstacleCount');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

// Game over modal elements
const gameOverModal = document.getElementById('gameOverModal');
const finalScoreElement = document.getElementById('finalScore');
const modalHighScoreElement = document.getElementById('modalHighScore');
const playAgainBtn = document.getElementById('playAgainBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const gameOverSound = document.getElementById('gameOverSound');

// Mobile control buttons
const upBtn = document.getElementById('upBtn');
const downBtn = document.getElementById('downBtn');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const mobileControls = document.getElementById('mobileControls');

// Game settings
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Game state
let snake = [];
let food = {};
let obstacles = [];
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gamePaused = false;
let gameLoop;
let obstacleCount = 0;
let powerUp = null;
let powerUpActive = false;
let currentLevel = 1;
let specialFood = null;
let specialFoodTimer = null;

// Initialize game
function initGame() {
    // Initialize snake at center with safe position
    const centerX = Math.floor(tileCount / 2);
    const centerY = Math.floor(tileCount / 2);
    snake = [
        {x: centerX, y: centerY}
    ];
    
    // Initialize food and obstacles
    obstacles = [];
    obstacleCount = 0;
    generateInitialObstacles();
    generateFood();
    
    // Reset direction to right (safe starting direction)
    dx = 1;
    dy = 0;
    
    // Reset score
    score = 0;
    updateScore();
    
    // Update displays
    highScoreElement.textContent = highScore;
    obstacleCountElement.textContent = obstacleCount;
}

// Generate food at random position
function generateFood() {
    let newFood;
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        attempts++;
        
        if (attempts > maxAttempts) break;
        
    } while (isPositionOccupied(newFood.x, newFood.y));
    
    food = newFood;
}

// Check if position is occupied by snake or obstacles
function isPositionOccupied(x, y) {
    // Check snake
    for (let segment of snake) {
        if (segment.x === x && segment.y === y) {
            return true;
        }
    }
    
    // Check obstacles
    for (let obstacle of obstacles) {
        if (obstacle.x === x && obstacle.y === y) {
            return true;
        }
    }
    
    return false;
}

// Generate initial obstacles
function generateInitialObstacles() {
    const initialObstacleCount = 3;
    for (let i = 0; i < initialObstacleCount; i++) {
        generateObstacle();
    }
}

// Generate new obstacle
function generateObstacle() {
    let newObstacle;
    let attempts = 0;
    const maxAttempts = 100;
    
    do {
        newObstacle = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        attempts++;
        
        if (attempts > maxAttempts) break;
        
    } while (
        isPositionOccupied(newObstacle.x, newObstacle.y) ||
        (Math.abs(newObstacle.x - snake[0].x) < 3 && Math.abs(newObstacle.y - snake[0].y) < 3) ||
        (newObstacle.x === food.x && newObstacle.y === food.y)
    );
    
    obstacles.push(newObstacle);
    obstacleCount = obstacles.length;
    obstacleCountElement.textContent = obstacleCount;
}

// Generate power-up at random position
function generatePowerUp() {
    if (powerUp) return;
    
    powerUp = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
        type: Math.random() < 0.5 ? 'invincible' : 'speedBoost'
    };
}

// Activate power-up effect
function activatePowerUp(type) {
    powerUpActive = true;
    if (type === 'invincible') {
        // Implementasi invincible
        setTimeout(() => {
            powerUpActive = false;
        }, 5000);
    } else if (type === 'speedBoost') {
        // Implementasi speed boost
        clearInterval(gameLoop);
        gameLoop = setInterval(gameStep, 75);
        setTimeout(() => {
            clearInterval(gameLoop);
            gameLoop = setInterval(gameStep, 150);
            powerUpActive = false;
        }, 3000);
    }
}

// Generate special food at random position
function generateSpecialFood() {
    if (specialFood) return;
    
    specialFood = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount),
        value: 50
    };
    
    // Hilangkan makanan spesial setelah 5 detik
    specialFoodTimer = setTimeout(() => {
        specialFood = null;
    }, 5000);
}

// Draw game elements
function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#f9f9f9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake
    ctx.fillStyle = '#4CAF50';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 2, gridSize - 2);
        
        // Draw eyes on head
        if (i === 0) {
            ctx.fillStyle = '#2E7D32';
            ctx.fillRect(snake[i].x * gridSize + 4, snake[i].y * gridSize + 4, 4, 4);
            ctx.fillRect(snake[i].x * gridSize + 12, snake[i].y * gridSize + 4, 4, 4);
            ctx.fillStyle = '#4CAF50';
        }
    }
    
    // Draw food
    ctx.fillStyle = '#FF5722';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    
    // Add food shine effect
    ctx.fillStyle = '#FF8A65';
    ctx.fillRect(food.x * gridSize + 3, food.y * gridSize + 3, 4, 4);
    
    // Draw obstacles
    ctx.fillStyle = '#757575';
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x * gridSize, obstacle.y * gridSize, gridSize - 2, gridSize - 2);
        
        // Add obstacle detail
        ctx.fillStyle = '#9E9E9E';
        ctx.fillRect(obstacle.x * gridSize + 2, obstacle.y * gridSize + 2, gridSize - 6, gridSize - 6);
        ctx.fillStyle = '#757575';
    }
    
    // Draw power-up if available
    if (powerUp) {
        ctx.fillStyle = powerUp.type === 'invincible' ? '#FFD600' : '#00BCD4';
        ctx.fillRect(powerUp.x * gridSize, powerUp.y * gridSize, gridSize - 2, gridSize - 2);
    }
    
    // Draw special food
    if (specialFood) {
        ctx.fillStyle = '#FFD700'; // Gold color
        ctx.fillRect(specialFood.x * gridSize, specialFood.y * gridSize, gridSize - 2, gridSize - 2);
    }
}

// Update game state
function updateGame() {
    if (gamePaused) return;
    
    // Calculate new head position
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    
    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
        return;
    }
    
    // Check self collision
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    
    // Check obstacle collision
    for (let obstacle of obstacles) {
        if (head.x === obstacle.x && head.y === obstacle.y) {
            gameOver();
            return;
        }
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        const bonus = calculateBonus();
        score += 10 + bonus;
        updateScore();
        generateFood();
        
        // Add new obstacle every 50 points
        if (score % 50 === 0 && score > 0) {
            generateObstacle();
        }
        
        // Generate power-up every 100 points
        if (score % 100 === 0 && score > 0) {
            generatePowerUp();
        }
        
        // Increase speed slightly
        if (score % 30 === 0 && score > 0) {
            clearInterval(gameLoop);
            gameLoop = setInterval(gameStep, Math.max(50, 150 - score / 5));
        }
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }
    
    // Check power-up collision
    if (powerUp && head.x === powerUp.x && head.y === powerUp.y) {
        const powerUpType = powerUp.type;
        powerUp = null; // Remove power-up after collection
        activatePowerUp(powerUpType);
    }
    
    // Check special food collision
    if (specialFood && head.x === specialFood.x && head.y === specialFood.y) {
        score += specialFood.value;
        clearTimeout(specialFoodTimer);
        specialFood = null;
        updateScore();
    }
    
    updateLevel();
}

// Game step
function gameStep() {
    updateGame();
    drawGame();
}

// Update score display
function updateScore() {
    scoreElement.textContent = score;
    if (score > highScore) {
        highScore = score;
        highScoreElement.textContent = highScore;
        localStorage.setItem('snakeHighScore', highScore);
    }
}

// Update level based on score
function updateLevel() {
    const newLevel = Math.floor(score / 100) + 1;
    if (newLevel !== currentLevel) {
        currentLevel = newLevel;
        // Tambah rintangan setiap naik level
        generateObstacle();
        // Tingkatkan kecepatan
        clearInterval(gameLoop);
        gameLoop = setInterval(gameStep, Math.max(50, 150 - (currentLevel * 10)));
    }
}

// Game over
function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);
    
    // Stop background music
    if (typeof musicManager !== 'undefined') {
        musicManager.pause();
    }
    
    // Play game over sound
    try {
        gameOverSound.play().catch(e => console.log('Audio play failed:', e));
    } catch (e) {
        console.log('Audio not supported');
    }
    
    // Update modal content
    finalScoreElement.textContent = score;
    modalHighScoreElement.textContent = highScore;
    
    // Show game over modal
    gameOverModal.style.display = 'block';
    
    // Update buttons
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
}

// Hide game over modal
function hideGameOverModal() {
    gameOverModal.style.display = 'none';
}

// Play again function
function playAgain() {
    hideGameOverModal();
    resetGame();
    startGame();
}

// Start game
function startGame() {
    if (!gameRunning) {
        initGame();
        gameRunning = true;
        gamePaused = false;

        // Show countdown overlay
        const countdownOverlay = document.getElementById('countdownOverlay');
        const countdownNumber = document.getElementById('countdownNumber');
        countdownOverlay.style.display = 'block';
        
        let count = 3;
        countdownNumber.textContent = count;
        
        // Play background music immediately when countdown starts
        if (typeof musicManager !== 'undefined') {
            musicManager.play();
        }
        
        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownNumber.textContent = count;
            } else {
                clearInterval(countdownInterval);
                countdownOverlay.style.display = 'none';
                
                // Start the actual game
                gameLoop = setInterval(gameStep, 150);
            }
        }, 1000);
        
        // Update buttons
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'inline-block';
    } else if (gamePaused) {
        gamePaused = false;
        pauseBtn.textContent = 'Pause';
        
        // Resume background music
        if (typeof musicManager !== 'undefined') {
            musicManager.play();
        }
    }
}

// Pause game
function pauseGame() {
    if (gameRunning) {
        gamePaused = !gamePaused;
        pauseBtn.textContent = gamePaused ? 'Resume' : 'Pause';
        
        // Sync background music with game state
        if (typeof musicManager !== 'undefined') {
            if (gamePaused) {
                musicManager.pause();
            } else {
                musicManager.play();
            }
        }
    }
}

// Reset game
function resetGame() {
    gameRunning = false;
    gamePaused = false;
    clearInterval(gameLoop);
    
    // Stop background music
    if (typeof musicManager !== 'undefined') {
        musicManager.stop();
    }
    
    initGame();
    drawGame();
    
    // Update buttons
    startBtn.style.display = 'inline-block';
    pauseBtn.style.display = 'none';
    pauseBtn.textContent = 'Pause';
}

// Handle keyboard input
function handleKeyPress(e) {
    if (!gameRunning && e.key !== ' ') return;
    
    const key = e.key.toLowerCase();
    
    // Handle spacebar for pause/resume
    if (key === ' ') {
        e.preventDefault();
        if (gameRunning) {
            pauseGame();
        } else if (!gameRunning && score > 0) {
            startGame();
        }
        return;
    }
    
    if (!gameRunning || gamePaused) return;
    
    // Prevent reverse direction
    switch(key) {
        case 'arrowup':
        case 'w':
            if (dy !== 1) {
                dx = 0;
                dy = -1;
            }
            break;
        case 'arrowdown':
        case 's':
            if (dy !== -1) {
                dx = 0;
                dy = 1;
            }
            break;
        case 'arrowleft':
        case 'a':
            if (dx !== 1) {
                dx = -1;
                dy = 0;
            }
            break;
        case 'arrowright':
        case 'd':
            if (dx !== -1) {
                dx = 1;
                dy = 0;
            }
            break;
    }
}

// Handle mobile touch controls
function handleMobileControls() {
    upBtn.addEventListener('click', () => {
        if (gameRunning && !gamePaused && dy !== 1) {
            dx = 0;
            dy = -1;
        }
    });
    
    downBtn.addEventListener('click', () => {
        if (gameRunning && !gamePaused && dy !== -1) {
            dx = 0;
            dy = 1;
        }
    });
    
    leftBtn.addEventListener('click', () => {
        if (gameRunning && !gamePaused && dx !== 1) {
            dx = -1;
            dy = 0;
        }
    });
    
    rightBtn.addEventListener('click', () => {
        if (gameRunning && !gamePaused && dx !== -1) {
            dx = 1;
            dy = 0;
        }
    });
    
    // Touch events for better mobile experience
    [upBtn, downBtn, leftBtn, rightBtn].forEach(btn => {
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            btn.style.transform = 'scale(0.9)';
        });
        
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            btn.style.transform = 'scale(1)';
        });
    });
}

// Check if device is mobile
function isMobileDevice() {
    return window.innerWidth <= 500 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Initialize mobile controls visibility
function initMobileControls() {
    if (isMobileDevice()) {
        mobileControls.style.display = 'block';
    } else {
        mobileControls.style.display = 'none';
    }
}

// Event listeners
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);
resetBtn.addEventListener('click', resetGame);
playAgainBtn.addEventListener('click', playAgain);
closeModalBtn.addEventListener('click', hideGameOverModal);
document.addEventListener('keydown', handleKeyPress);

// Close modal when clicking outside
gameOverModal.addEventListener('click', function(e) {
    if (e.target === gameOverModal) {
        hideGameOverModal();
    }
});

// Prevent arrow keys from scrolling the page
window.addEventListener('keydown', function(e) {
    if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].indexOf(e.key) > -1) {
        e.preventDefault();
    }
});

// Handle window resize
window.addEventListener('resize', initMobileControls);

// Initialize
initGame();
drawGame();
handleMobileControls();
initMobileControls();

// Auto start game when page loads
window.addEventListener('load', function() {
    setTimeout(startGame, 500); // Delay 500ms untuk memastikan semua elemen ter-load
});

// Tambahkan di script.js
function showScoreAnimation(x, y, points) {
    const scoreText = document.createElement('div');
    scoreText.textContent = `+${points}`;
    scoreText.style.position = 'absolute';
    scoreText.style.left = `${x}px`;
    scoreText.style.top = `${y}px`;
    scoreText.style.color = '#4CAF50';
    scoreText.style.fontSize = '20px';
    scoreText.style.fontWeight = 'bold';
    scoreText.style.animation = 'fadeUp 1s ease-out';
    
    document.body.appendChild(scoreText);
    setTimeout(() => {
        document.body.removeChild(scoreText);
    }, 1000);
}

// Tambahkan di script.js setelah fungsi updateGame()
function calculateBonus() {
    // Bonus berdasarkan panjang ular
    let lengthBonus = Math.floor(snake.length / 5) * 5;
    
    // Bonus berdasarkan kecepatan
    let speedBonus = Math.floor((150 - gameLoop) / 10);
    
    return lengthBonus + speedBonus;
}