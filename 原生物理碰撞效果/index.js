const canvas = document.querySelector("#gameboard");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 画布宽度和高度
let width = canvas.width;
let height = canvas.height;

// 重力
const gravity = 980;

// 绘制小球
class Circle {
  constructor(ctx, x, y, r, vx, vy, mass = 1, cor = 1) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    // 给小球添加碰撞状态
    this.colliding = false;
    // 给小球加上质量属性
    this.mass = mass;
    // 恢复系数 cor 属性
    this.cor = cor;
  }

  // 绘制小球
  draw() {
    // 根据状态判断是否碰撞了，如果碰撞了改变颜色
    this.ctx.fillStyle = this.colliding ? "hsl(300, 100%, 70%)" : "hsl(170, 100%, 50%)";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fill();
  }

  /**
   * 更新画布
   * @param {number} seconds
   */
  update(seconds) {
    this.vy += gravity * seconds; // 重力加速度
    this.x += this.vx * seconds;
    this.y += this.vy * seconds;
  }
  /**
   * 判断小球之间是否发生了碰撞 判断两个小球圆心的距离是否小于两个小球的半径之和就可以了，
   * 如果小于等于则发生了碰撞，大于则没有发生碰撞。圆心的距离即计算两个坐标点的距离，
   *
   *
   * 接收另一个小球对象作为参数，返回比较结果：
   */
  isCircleCollided(other) {
    let squareDistance = (this.x - other.x) * (this.x - other.x) + (this.y - other.y) * (this.y - other.y);
    let squareRadius = (this.r + other.r) * (this.r + other.r);
    return squareDistance <= squareRadius;
  }

  /**
   *
   * 调用 isCircleCollided(other) 判断碰撞后，把两球的碰撞状态设置为 true：
   */
  checkCollideWith(other) {
    if (this.isCircleCollided(other)) {
      this.colliding = true;
      other.colliding = true;
      this.changeVelocityAndDirection(other); // 在这里调用碰撞后
    }
  }
  // 方法来计算碰撞后的速度
  // 它接收另一个小球对象作为参数，同时计算这两个小球碰撞后的速度和方向，这个是整个引擎的核心
  changeVelocityAndDirection(other) {
    // 创建两小球的速度向量
    let velocity1 = new Vector(this.vx, this.vy);
    let velocity2 = new Vector(other.vx, other.vy);
    let vNorm = new Vector(this.x - other.x, this.y - other.y);
    let unitVNorm = vNorm.normalize();
    let unitVTan = new Vector(-unitVNorm.y, unitVNorm.x);
    let v1n = velocity1.dot(unitVNorm);
    let v1t = velocity1.dot(unitVTan);
    let v2n = velocity2.dot(unitVNorm);
    let v2t = velocity2.dot(unitVTan);
    let cor = Math.min(this.cor, other.cor);
    let v1nAfter = (this.mass * v1n + other.mass * v2n + cor * other.mass * (v2n - v1n)) / (this.mass + other.mass);

    let v2nAfter = (this.mass * v1n + other.mass * v2n + cor * this.mass * (v1n - v2n)) / (this.mass + other.mass);
    if (v1nAfter < v2nAfter) {
      return;
    }
    let v1VectorNorm = unitVNorm.multiply(v1nAfter);
    let v1VectorTan = unitVTan.multiply(v1t);

    let v2VectorNorm = unitVNorm.multiply(v2nAfter);
    let v2VectorTan = unitVTan.multiply(v2t);
    let velocity1After = v1VectorNorm.add(v1VectorTan);
    let velocity2After = v2VectorNorm.add(v2VectorTan);
    this.vx = velocity1After.x;
    this.vy = velocity1After.y;

    other.vx = velocity2After.x;
    other.vy = velocity2After.y;
  }
}

// 小球动画
class Gameboard {
  constructor() {
    this.startTime;
    this.init();
  }

  init() {
    this.circles = [
      new Circle(ctx, 5, 20, 90, -100, 390, 30, 0.7),
      new Circle(ctx, 10, 30, 120, -100, 390, 30, 0.7),
      new Circle(ctx, 20, 40, 110, -100, 390, 30, 0.7),
      new Circle(ctx, 30, 50, 100, -100, 390, 30, 0.7),
      new Circle(ctx, 60, 180, 20, 180, -275, 20, 0.7),
      new Circle(ctx, 120, 100, 60, 120, 262, 100, 0.3),
      new Circle(ctx, 150, 180, 10, -130, 138, 10, 0.7),
      new Circle(ctx, 190, 210, 10, 138, -280, 10, 0.7),
      new Circle(ctx, 220, 240, 10, 142, 350, 10, 0.7),
      new Circle(ctx, 100, 260, 10, 135, -460, 10, 0.7),
      new Circle(ctx, 120, 285, 10, -165, 370, 10, 0.7),
      new Circle(ctx, 140, 290, 10, 125, 230, 10, 0.7),
      new Circle(ctx, 160, 380, 10, -175, -180, 10, 0.7),
      new Circle(ctx, 180, 310, 10, 115, 440, 10, 0.7),
      new Circle(ctx, 100, 310, 10, -195, -325, 10, 0.7),
      new Circle(ctx, 60, 150, 10, -138, 420, 10, 0.7),
      new Circle(ctx, 70, 430, 45, 135, -230, 45, 0.7),
      new Circle(ctx, 250, 290, 40, -140, 335, 40, 0.7),
    ];
    window.requestAnimationFrame(this.process.bind(this));
  }

  process(now) {
    if (!this.startTime) {
      this.startTime = now;
    }
    let seconds = (now - this.startTime) / 1000;
    this.startTime = now;

    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].update(seconds);
    }
    // 执行碰撞检测，注意检测应该发生在使用 for 循环更新小球位置的后边才准确
    this.checkEdgeCollision();
    // 边界碰撞的检测
    this.checkCollision();
    // 清除上一次画图
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < this.circles.length; i++) {
      this.circles[i].draw(ctx);
    }

    window.requestAnimationFrame(this.process.bind(this));
  }

  /**
   * 使用双循环两两比对小球是否发生了碰撞，设置状态
   */
  checkCollision() {
    // 重置碰撞状态
    this.circles.forEach((circle) => (circle.colliding = false));

    for (let i = 0; i < this.circles.length; i++) {
      for (let j = i + 1; j < this.circles.length; j++) {
        this.circles[i].checkCollideWith(this.circles[j]);
      }
    }
  }

  /**
   * 边界碰撞:
   * 检测边界碰撞需要把四个面全部都处理到，
   * 根据圆心坐标和半径来判断是否和边界发生了碰撞。
   * 例如跟左边界发生碰撞时，圆心的 x 坐标是小于或等于半径长度的，
   * 而跟右边界发生碰撞时，圆心 x 坐标应该大于或等于画布最右侧坐标（即宽度值）减去半径的长度。
   * 上边界和下边界类似，只是使用圆心 y 坐标和画布的高度值。在水平方向上（即左右边界）发生碰撞时，
   * 小球的运动方向发生改变，只需要把垂直方向上的速度 vy 值取反即可，在垂直方向上碰撞则把 vx 取反。
   */
  checkEdgeCollision() {
    const cor = 0.8; // 设置恢复系统
    this.circles.forEach((circle) => {
      // 左右墙壁碰撞
      if (circle.x < circle.r) {
        circle.vx = -circle.vx * cor; // 加上恢复系数
        circle.x = circle.r;
      } else if (circle.x > width - circle.r) {
        circle.vx = -circle.vx * cor; // 加上恢复系数
        circle.x = width - circle.r;
      }

      // 上下墙壁碰撞
      if (circle.y < circle.r) {
        circle.vy = -circle.vy * cor; // 加上恢复系数
        circle.y = circle.r;
      } else if (circle.y > height - circle.r) {
        circle.vy = -circle.vy * cor; // 加上恢复系数
        circle.y = height - circle.r;
      }
    });
  }
}

// 碰撞处理工具类
class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * 向量加法
   * @param {Vector} v
   */
  add(v) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  /**
   * 向量减法
   * @param {Vector} v
   */
  substract(v) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  /**
   * 向量与标量乘法
   * @param {Vector} s
   */
  multiply(s) {
    return new Vector(this.x * s, this.y * s);
  }

  /**
   * 向量与向量点乘（投影）
   * @param {Vector} v
   */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }

  /**
   * 向量标准化（除去长度）
   * @param {number} distance
   */
  normalize() {
    let distance = Math.sqrt(this.x * this.x + this.y * this.y);
    return new Vector(this.x / distance, this.y / distance);
  }
}

new Gameboard();
