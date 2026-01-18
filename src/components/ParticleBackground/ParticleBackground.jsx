import React, { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    let animationId;

    const dpr = window.devicePixelRatio || 1;

    let particleCount =
      window.innerWidth > 1800
        ? 150
        : window.innerWidth > 1200
        ? 120
        : window.innerWidth > 768
        ? 90
        : 60;

    const mouse = {
      x: null,
      y: null,
      radius: 140,
    };

    /* ================= CANVAS RESIZE ================= */
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    /* ================= PARTICLE CLASS ================= */
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.smoothFactor = 0.05;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width / dpr) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height / dpr) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          let dx = this.x - mouse.x;
          let dy = this.y - mouse.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            let force = (mouse.radius - dist) / mouse.radius;
            this.x += dx * force * this.smoothFactor * 4;
            this.y += dy * force * this.smoothFactor * 4;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = "rgba(225, 0, 255, 0.6)";
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* ================= INIT ================= */
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(
          new Particle(
            Math.random() * canvas.width / dpr,
            Math.random() * canvas.height / dpr
          )
        );
      }
    };

    /* ================= CONNECT ================= */
    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let dist = dx * dx + dy * dy;

          if (dist < 9000) {
            let opacity = 1 - dist / 9000;
            ctx.strokeStyle = `rgba(255,255,255,${opacity * 0.8})`;
            ctx.lineWidth = 0.6;

            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    /* ================= ANIMATE ================= */
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      connectParticles();
      animationId = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    /* ================= CLEANUP ================= */
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
