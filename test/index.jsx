import React, { useEffect, useRef } from "react";

const Fireworks = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const disableAutoFireworks = useRef(false);
  const resetDisable = useRef(0);

  const loop = () => {
    if (!disableAutoFireworks.current && Math.random() < 0.02) {
      createFirework();
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.current.forEach((particle, i) => {
      particle.animate();
      particle.render();
      if (particle.y > canvas.height || particle.x < 0 || particle.x > canvas.width || particle.alpha <= 0) {
        particles.current.splice(i, 1);
      }
    });

    requestAnimationFrame(loop);
  };

  const createFirework = (x = Math.random() * 800, y = Math.random() * 600) => {
    let speed = Math.random() * 2 + 0.6;
    let maxSpeed = speed;

    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);

    red = red < 150 ? red + 150 : red;
    green = green < 150 ? green + 150 : green;
    blue = blue < 150 ? blue + 150 : blue;

    for (let i = 0; i < 150; i++) {
      let particle = new Particle(x, y, red, green, blue, speed);
      particles.current.push(particle);
      maxSpeed = speed > maxSpeed ? speed : maxSpeed;
    }

    for (let i = 0; i < 40; i++) {
      let particle = new Particle(x, y, red, green, blue, maxSpeed, true);
      particles.current.push(particle);
    }
  };

  class Particle {
    constructor(
      x = 0,
      y = 0,
      red = Math.floor(Math.random() * 255),
      green = Math.floor(Math.random() * 255),
      blue = Math.floor(Math.random() * 255),
      speed,
      isFixedSpeed
    ) {
      this.x = x;
      this.y = y;
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.alpha = 0.05;
      this.radius = 1 + Math.random();
      this.angle = Math.random() * 360;
      this.speed = Math.random() * speed + 0.1;
      this.velocityX = Math.cos(this.angle) * this.speed;
      this.velocityY = Math.sin(this.angle) * this.speed;
      this.startTime = new Date().getTime();
      this.duration = Math.random() * 300 + 600;
      this.currentDiration = 0;
      this.dampening = 30;

      this.colour = this.getColour();

      if (isFixedSpeed) {
        this.speed = speed;
        this.velocityY = Math.sin(this.angle) * this.speed;
        this.velocityX = Math.cos(this.angle) * this.speed;
      }

      this.initialVelocityX = this.velocityX;
      this.initialVelocityY = this.velocityY;
    }

    animate() {
      this.currentDuration = new Date().getTime() - this.startTime;

      if (this.currentDuration <= 200) {
        this.x += this.initialVelocityX * 4.5;
        this.y += this.initialVelocityY * 4.5;
        this.alpha += 0.01;

        this.colour = this.getColour(240, 240, 240, 0.9);
      } else {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.colour = this.getColour(this.red, this.green, this.blue, 0.4 + Math.random() * 0.3);
      }

      this.velocityY += 9.8 / 1000;

      if (this.currentDuration >= this.duration) {
        this.velocityX -= this.velocityX / this.dampening;
        this.velocityY -= this.velocityY / this.dampening;
      }

      if (this.currentDuration >= this.duration + this.duration / 1.1) {
        this.alpha -= 0.02;
        this.colour = this.getColour();
      } else {
        if (this.alpha < 1) {
          this.alpha += 0.03;
        }
      }
    }

    render() {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.lineWidth = this.lineWidth;
      ctx.fillStyle = this.colour;
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.getColour(this.red + 150, this.green + 150, this.blue + 150, 1);
      ctx.fill();
    }

    getColour(red, green, blue, alpha) {
      return `rgba(${red || this.red}, ${green || this.green}, ${blue || this.blue}, ${alpha || this.alpha})`;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleClick = (e) => {
      createFirework(e.clientX, e.clientY);
      disableAutoFireworks.current = true;
      clearTimeout(resetDisable.current);
      resetDisable.current = setTimeout(() => {
        disableAutoFireworks.current = false;
      }, 5000);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    canvas.addEventListener("click", handleClick);

    loop();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      canvas.removeEventListener("click", handleClick);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Fireworks;
