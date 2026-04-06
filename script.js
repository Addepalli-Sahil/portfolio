const root = document.documentElement;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const yearNode = document.getElementById("year");
const cursorGlow = document.querySelector(".cursor-glow");
const tiltElements = document.querySelectorAll(".tilt-card, .hero-tilt");
const revealElements = document.querySelectorAll(".reveal");
const canvas = document.querySelector(".particle-canvas");
const context = canvas.getContext("2d");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

let pointer = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
  motionX: 0,
  motionY: 0
};

const particleState = {
  particles: [],
  width: 0,
  height: 0,
  rafId: 0
};

function updatePointerVars() {
  root.style.setProperty("--pointer-x", `${pointer.x}px`);
  root.style.setProperty("--pointer-y", `${pointer.y}px`);
  root.style.setProperty("--motion-x", pointer.motionX.toFixed(3));
  root.style.setProperty("--motion-y", pointer.motionY.toFixed(3));

  if (cursorGlow) {
    const glowSize = prefersReducedMotion ? "0%" : "30%";
    cursorGlow.style.background = `radial-gradient(circle at ${pointer.x}px ${pointer.y}px, rgba(255, 255, 255, 0.14), transparent ${glowSize})`;
  }
}

function handlePointerMove(event) {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.motionX = (event.clientX / window.innerWidth - 0.5) * 2;
  pointer.motionY = (event.clientY / window.innerHeight - 0.5) * 2;
  updatePointerVars();
}

function resetPointer() {
  pointer.motionX = 0;
  pointer.motionY = 0;
  updatePointerVars();

  tiltElements.forEach((element) => {
    element.style.transform = "";
  });
}

function bindTilt(element) {
  if (prefersReducedMotion) {
    return;
  }

  element.addEventListener("pointermove", (event) => {
    const bounds = element.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width;
    const relativeY = (event.clientY - bounds.top) / bounds.height;
    const rotateY = (relativeX - 0.5) * 10;
    const rotateX = (0.5 - relativeY) * 10;

    element.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  element.addEventListener("pointerleave", () => {
    element.style.transform = "";
  });
}

tiltElements.forEach(bindTilt);

window.addEventListener("pointermove", handlePointerMove);
window.addEventListener("pointerleave", resetPointer);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

function createParticles() {
  const area = window.innerWidth * window.innerHeight;
  const count = Math.min(80, Math.max(32, Math.floor(area / 18000)));

  particleState.particles = Array.from({ length: count }, () => ({
    x: Math.random() * particleState.width,
    y: Math.random() * particleState.height,
    radius: Math.random() * 1.7 + 0.7,
    alpha: Math.random() * 0.45 + 0.2,
    speedX: (Math.random() - 0.5) * 0.34,
    speedY: (Math.random() - 0.5) * 0.34
  }));
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  particleState.width = window.innerWidth;
  particleState.height = window.innerHeight;
  canvas.width = particleState.width * ratio;
  canvas.height = particleState.height * ratio;
  canvas.style.width = `${particleState.width}px`;
  canvas.style.height = `${particleState.height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  createParticles();
}

function drawConnection(a, b, distance) {
  const maxDistance = 140;
  if (distance > maxDistance) {
    return;
  }

  context.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - distance / maxDistance)})`;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(a.x, a.y);
  context.lineTo(b.x, b.y);
  context.stroke();
}

function animateParticles() {
  particleState.rafId = window.requestAnimationFrame(animateParticles);

  if (prefersReducedMotion) {
    context.clearRect(0, 0, particleState.width, particleState.height);
    return;
  }

  context.clearRect(0, 0, particleState.width, particleState.height);

  const parallaxX = pointer.motionX * 18;
  const parallaxY = pointer.motionY * 18;

  particleState.particles.forEach((particle, index) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;

    if (particle.x < -20) particle.x = particleState.width + 20;
    if (particle.x > particleState.width + 20) particle.x = -20;
    if (particle.y < -20) particle.y = particleState.height + 20;
    if (particle.y > particleState.height + 20) particle.y = -20;

    const shiftedX = particle.x + parallaxX;
    const shiftedY = particle.y + parallaxY;

    context.fillStyle = `rgba(255, 237, 214, ${particle.alpha})`;
    context.beginPath();
    context.arc(shiftedX, shiftedY, particle.radius, 0, Math.PI * 2);
    context.fill();

    for (let nextIndex = index + 1; nextIndex < particleState.particles.length; nextIndex += 1) {
      const other = particleState.particles[nextIndex];
      const dx = shiftedX - (other.x + parallaxX);
      const dy = shiftedY - (other.y + parallaxY);
      drawConnection({ x: shiftedX, y: shiftedY }, { x: other.x + parallaxX, y: other.y + parallaxY }, Math.hypot(dx, dy));
    }
  });
}

resizeCanvas();
updatePointerVars();
animateParticles();

window.addEventListener("resize", resizeCanvas);
