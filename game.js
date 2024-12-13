// 获取游戏画布和上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 设置画布尺寸，适应手机屏幕
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 设置背景颜色
document.body.style.margin = 0;
document.body.style.overflow = 'hidden';
canvas.style.backgroundColor = '#70c5ce'; // 背景颜色设为天蓝色

// 加载角色图片
const birdIdle = new Image();  // 静止状态
const birdFlap = new Image();  // 拍翅状态
birdIdle.src = 'bird_idle.png';  // 静止飞行的图片
birdFlap.src = 'bird_flap.png';  // 拍翅的图片

// 鸟的属性
const bird = {
  x: canvas.width / 2 - 15,  // 初始位置设置为画面中央
  y: canvas.height / 2 - 15,
  width: 30,
  height: 30,
  speed: 0,
  gravity: 0.05,  // 重力
  lift: -2,      // 跳跃力度
  isGameStarted: false,  // 游戏是否开始
  isFlapping: false      // 是否正在拍翅
};

// 触摸开始时的操作
canvas.addEventListener('touchstart', function(event) {
  event.preventDefault();  // 防止屏幕滚动

  if (!bird.isGameStarted) {
    bird.isGameStarted = true;  // 开始游戏
  } else {
    bird.speed = bird.lift;  // 控制跳跃力度
    bird.isFlapping = true;  // 开始拍翅
  }
});

// 触摸结束时的操作
canvas.addEventListener('touchend', function(event) {
  bird.isFlapping = false;  // 停止拍翅
});

// 游戏主循环
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布

  if (bird.isGameStarted) {
    // 角色物理
    bird.speed += bird.gravity;
    bird.y += bird.speed;

    // 如果鸟飞出屏幕，重置位置
    if (bird.y > canvas.height - bird.height) {
      bird.y = canvas.height - bird.height;
      bird.speed = 0;
      bird.isFlapping = false;  // 停止拍翅
    }
    if (bird.y < 0) {
      bird.y = 0;
      bird.speed = 0;
      bird.isFlapping = false;  // 停止拍翅
    }

    // 绘制鸟，根据是否拍翅来选择图片
    if (bird.isFlapping) {
      ctx.drawImage(birdFlap, bird.x, bird.y, bird.width, bird.height);
    } else {
      ctx.drawImage(birdIdle, bird.x, bird.y, bird.width, bird.height);
    }
  } else {
    // 游戏未开始时，保持角色在中央
    ctx.drawImage(birdIdle, bird.x, bird.y, bird.width, bird.height);
  }

  requestAnimationFrame(gameLoop); // 调用下一帧
}

// 等待图片加载完成后启动游戏
birdIdle.onload = birdFlap.onload = function() {
  gameLoop();
};

