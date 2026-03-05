// game.js - Simple platformer with jumping bunny

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load sprite
const bunnyImg = new Image();
bunnyImg.src = '../../.gemini/antigravity/brain/33bf6734-294c-45b7-a79c-8b6f87a4743e/bunny_sprite_1772713710596.png'; // relative path from index.html

// Game constants
const GRAVITY = 0.6;
const JUMP_STRENGTH = -12;
const FLOOR_Y = canvas.height - 50; // ground line

// Player object
const player = {
    x: 100,
    y: FLOOR_Y,
    width: 48,
    height: 48,
    vy: 0,
    onGround: true,
    draw() {
        ctx.drawImage(bunnyImg, this.x, this.y, this.width, this.height);
    },
    update() {
        this.vy += GRAVITY;
        this.y += this.vy;
        if (this.y >= FLOOR_Y) {
            this.y = FLOOR_Y;
            this.vy = 0;
            this.onGround = true;
        } else {
            this.onGround = false;
        }
    },
    jump() {
        if (this.onGround) {
            this.vy = JUMP_STRENGTH;
            this.onGround = false;
        }
    }
};

// Simple platform array (scrolling left)
const platforms = [];
function spawnPlatform() {
    const width = 120 + Math.random() * 80;
    const height = 20;
    const x = canvas.width;
    const y = FLOOR_Y - (20 + Math.random() * 100);
    platforms.push({ x, y, width, height });
}
let platformTimer = 0;

function updatePlatforms() {
    for (let i = platforms.length - 1; i >= 0; i--) {
        platforms[i].x -= 4; // scroll speed
        if (platforms[i].x + platforms[i].width < 0) {
            platforms.splice(i, 1);
        }
    }
    platformTimer--;
    if (platformTimer <= 0) {
        spawnPlatform();
        platformTimer = 100 + Math.random() * 100;
    }
}

function drawPlatforms() {
    ctx.fillStyle = '#ffcc00';
    platforms.forEach(p => {
        ctx.fillRect(p.x, p.y, p.width, p.height);
    });
}

function checkCollision() {
    platforms.forEach(p => {
        if (
            player.x < p.x + p.width &&
            player.x + player.width > p.x &&
            player.y + player.height <= p.y + 5 &&
            player.y + player.height >= p.y - player.vy
        ) {
            // Land on platform
            player.y = p.y - player.height;
            player.vy = 0;
            player.onGround = true;
        }
    });
}

function gameOver() {
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '24px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over – Refresh to play again', canvas.width / 2, canvas.height / 2);
    cancelAnimationFrame(animationId);
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updatePlatforms();
    player.update();
    checkCollision();
    drawPlatforms();
    player.draw();
    // Simple fail condition: fall below canvas
    if (player.y > canvas.height) {
        gameOver();
        return;
    }
    animationId = requestAnimationFrame(loop);
}

// Input handling
window.addEventListener('keydown', e => {
    if (e.code === 'Space') {
        player.jump();
    }
});
canvas.addEventListener('click', () => {
    player.jump();
});

let animationId = requestAnimationFrame(loop);
