import { useEffect } from "react";
import { useRef } from "react";

class Particle {
  constructor(canvas, ctx, colors) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedx = (Math.random() - 0.5) * 0.5;
    this.speedy = (Math.random() - 0.5) * 0.5;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.shadowBlur = 10;
    this.ctx.shadowColor = this.color;
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
  update() {
    this.x += this.speedx;
    this.y += this.speedy;
    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
    this.draw();
  }
}

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 50;
    const colors = ["rgba(255,255,255,0.7)"];

    function createParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas, ctx, colors));
      }
    }

    function handleResize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    }
    handleResize();
    window.addEventListener("resize", handleResize);

    let animationId;
    function animate(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update());
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize)
    }
  },[])
  return(
    <canvas 
    ref = {canvasRef}
    className="absolute top-0 left-0 w-full pointer-events-none z-0">
      
    </canvas>
  )
}