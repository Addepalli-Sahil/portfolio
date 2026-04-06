import { useEffect, useRef } from "react";


const metrics = [
  { value: "04", label: "featured builds" },
  { value: "06", label: "certifications" },
  { value: "1000+", label: "hours of learning" }
];

const navLinks = [
  { href: "#about", label: "About", id: "about" },
  { href: "#skills", label: "Skills", id: "skills" },
  { href: "#certifications", label: "Certificates", id: "certifications" },
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#contact", label: "Contact", id: "contact" }
];

const strengths = [
  "Full-stack product workflows",
  "Automation and developer tooling",
  "Responsive front-end development",
  "Practical software for real problems"
];

const aboutPoints = [
  "I am a 3rd-year BTech student focused on building software that feels useful, not just presentable.",
  "My projects lean toward automation, document workflows, recruitment systems, and developer productivity.",
  "I enjoy combining backend logic with clear interfaces so the final product feels complete.",
  "I am actively improving through certifications, hands-on builds, and consistent iteration."
];

const skillGroups = [
  {
    title: "Programming Languages",
    summary: "Core languages I use for logic, scripting, web features, and stronger fundamentals.",
    tone: "amber",
    items: ["Python", "JavaScript", "Java", "C++"]
  },
  {
    title: "Frameworks and Libraries",
    summary: "The product layer I rely on for building interfaces, backend flows, and full-stack projects.",
    tone: "teal",
    items: ["React", "Flask", "Node.js", "Express.js"]
  },
  {
    title: "Tools and Technologies",
    summary: "The workflow stack behind version control, data handling, collaboration, and daily development.",
    tone: "slate",
    items: ["Git", "GitHub", "Databases", "Command Line"]
  },
  {
    title: "Focus Areas",
    summary: "The areas where I keep pushing my learning through projects, experimentation, and certificates.",
    tone: "rose",
    items: ["Automation", "Web Development", "Data Analytics", "Cybersecurity"]
  }
];

const certifications = [
  {
    id: "accenture",
    title: "Software Engineering",
    brand: "Accenture",
    mark: "AC",
    tone: "amber",
    issuer: "Accenture via Forage",
    year: "2023",
    logo: "/images/accenture-thumbnail.jpg",
    link: "/certificates/accenture-certificate.pdf",
    description:
      "Covered software architecture, security implementation, programming best practices, testing, and agile workflows.",
    skills: ["Architecture", "Security", "Testing", "Agile"]
  },
  {
    id: "goldman",
    title: "Cybersecurity",
    brand: "Goldman Sachs",
    mark: "GS",
    tone: "slate",
    issuer: "Goldman Sachs via Forage",
    year: "2023",
    logo: "/images/goldman-thumbnail.jpg",
    link: "/certificates/goldman-certificate.pdf",
    description:
      "Focused on password security analysis, breach investigation, and vulnerability assessment with a security-first mindset.",
    skills: ["Password Security", "Risk Analysis", "Vulnerability Thinking"]
  },
  {
    id: "ibm",
    title: "Data Analytics",
    brand: "IBM",
    mark: "IBM",
    tone: "teal",
    issuer: "IBM SkillsBuild",
    year: "2023",
    logo: "/images/ibm-thumbnail.png",
    link: "/certificates/ibm-certificate.pdf",
    description:
      "Learned the foundations of data analysis, visualization, interpretation, and insight-driven decision support.",
    skills: ["Data Analysis", "Visualization", "Business Insight"]
  },
  {
    id: "meta",
    title: "Frontend Development",
    brand: "Meta",
    mark: "ME",
    tone: "rose",
    issuer: "Meta via Coursera",
    year: "2023",
    logo: "/images/coursera-thumbnail.jpg",
    link: "/certificates/coursera-frontend-certificate.pdf",
    description:
      "Covered React, modern JavaScript, responsive UI development, and front-end implementation best practices.",
    skills: ["React", "JavaScript", "Responsive UI"]
  },
  {
    id: "redbull",
    title: "Sales Analytics",
    brand: "Red Bull",
    mark: "RB",
    tone: "amber",
    issuer: "Red Bull via Forage",
    year: "2023",
    logo: "/images/redbull-thumbnail.jpg",
    link: "/certificates/redbull-certificate.pdf",
    description:
      "Worked through analytics-driven sales thinking including account analysis, objection handling, and structured strategy.",
    skills: ["Analytics", "Strategy", "Business Context"]
  },
  {
    id: "ea",
    title: "Software Engineering",
    brand: "Electronic Arts",
    mark: "EA",
    tone: "slate",
    issuer: "Electronic Arts via Forage",
    year: "2023",
    logo: "/images/ea-thumbnail.jpg",
    link: "/certificates/ea-certificate.pdf",
    description:
      "Built experience around feature proposals, object-oriented implementation, inventory systems, and production bug-fixing.",
    skills: ["Feature Design", "OOP", "Debugging"]
  }
];

const projects = [
  {
    id: "01",
    title: "Recruit",
    summary:
      "A recruitment workflow product built with Python and Flask for candidate management, resume uploads, and automated email handling.",
    detail:
      "This project reflects how I think about practical systems: forms, workflow logic, files, and automation tied together into one usable application.",
    stack: ["Python", "Flask", "HTML", "CSS", "Automation"],
    link: "https://github.com/Addepalli-Sahil/Recruit",
    accent: "teal",
    label: "Flagship Project"
  },
  {
    id: "02",
    title: "Automated Resume Builder",
    summary:
      "A Python Flask application that turns structured user input into polished resume output using templates and PDF generation.",
    detail:
      "Built to solve a real workflow problem with clean forms, document generation, and professional output.",
    stack: ["Python", "Flask", "Jinja2", "PDF Generation"],
    link: "https://github.com/Addepalli-Sahil/AutomatedResumeBuilder",
    accent: "amber",
    label: "Productivity Tool"
  },
  {
    id: "03",
    title: "AI Code Reviewer",
    summary:
      "An AI-powered GitHub Action using GPT-4 to review pull requests and support developer workflows with automated feedback.",
    detail:
      "This project shows my interest in combining automation and AI in ways that directly help software teams move faster.",
    stack: ["OpenAI", "GitHub Actions", "Automation", "Code Review"],
    link: "https://github.com/Addepalli-Sahil/AiCodeReviewer",
    accent: "slate",
    label: "AI Workflow"
  },
  {
    id: "04",
    title: "Offer Letter Generator",
    summary:
      "A clean document-generation interface for producing reusable offer letters through a faster, template-based workflow.",
    detail:
      "A straightforward but useful build focused on simplifying repetitive documentation work.",
    stack: ["HTML", "CSS", "JavaScript", "Template Logic"],
    link: "https://github.com/Addepalli-Sahil/offerletter",
    accent: "rose",
    label: "Document System"
  }
];

const contactLinks = [
  {
    label: "Email",
    value: "sahiladdepalli@gmail.com",
    href: "mailto:sahiladdepalli@gmail.com",
    icon: "mail"
  },
  {
    label: "GitHub",
    value: "github.com/Addepalli-Sahil",
    href: "https://github.com/Addepalli-Sahil",
    icon: "github"
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sahil-addepalli",
    href: "https://linkedin.com/in/sahil-addepalli",
    icon: "linkedin"
  }
];

function Icon({ name }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true
  };

  if (name === "mail") {
    return (
      <svg {...common}>
        <path d="M4 6h16v12H4z" />
        <path d="m4 8 8 6 8-6" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg {...common}>
        <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-6a6 6 0 0 1 6-6Z" />
        <path d="M2 9h4v11H2z" />
        <path d="M4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
      </svg>
    );
  }

  if (name === "external") {
    return (
      <svg {...common}>
        <path d="M14 4h6v6" />
        <path d="M10 14 20 4" />
        <path d="M20 14v6H4V4h6" />
      </svg>
    );
  }

  return (
    <svg {...common} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.3 9.43 7.89 10.95.58.1.79-.25.79-.56v-1.97c-3.21.7-3.89-1.36-3.89-1.36-.53-1.35-1.29-1.7-1.29-1.7-1.06-.73.08-.71.08-.71 1.17.08 1.78 1.21 1.78 1.21 1.05 1.8 2.74 1.28 3.41.98.11-.76.41-1.28.74-1.58-2.56-.29-5.26-1.29-5.26-5.72 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 5.79 0c2.2-1.5 3.17-1.19 3.17-1.19.64 1.6.24 2.78.12 3.07.74.81 1.19 1.85 1.19 3.11 0 4.44-2.7 5.42-5.28 5.71.42.36.79 1.07.79 2.17v3.22c0 .31.21.67.8.55 4.58-1.53 7.87-5.85 7.87-10.95C23.5 5.66 18.35.5 12 .5Z" />
    </svg>
  );
}

function TiltCard({ as: Tag = "article", className = "", children, ...props }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const node = cardRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!node || reduceMotion) {
      return undefined;
    }

    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let spotX = 50;
    let spotY = 50;

    function animate() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      const lift = Math.max(Math.abs(currentX), Math.abs(currentY)) * 0.45;

      node.style.setProperty("--spot-x", `${spotX}%`);
      node.style.setProperty("--spot-y", `${spotY}%`);
      node.style.transform = `perspective(1200px) rotateX(${currentX}deg) rotateY(${currentY}deg) translateY(-${lift.toFixed(2)}px)`;

      if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
        frame = window.requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    }

    function handleMove(event) {
      const bounds = node.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      targetY = (x - 0.5) * 6.2;
      targetX = (0.5 - y) * 6.2;
      spotX = x * 100;
      spotY = y * 100;

      if (!frame) {
        frame = window.requestAnimationFrame(animate);
      }
    }

    function handleLeave() {
      targetX = 0;
      targetY = 0;
      spotX = 50;
      spotY = 50;

      if (!frame) {
        frame = window.requestAnimationFrame(animate);
      }
    }

    node.addEventListener("pointermove", handleMove);
    node.addEventListener("pointerleave", handleLeave);

    return () => {
      window.cancelAnimationFrame(frame);
      node.removeEventListener("pointermove", handleMove);
      node.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <Tag ref={cardRef} className={`tilt-card ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}

function AmbientCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canvas || !context) {
      return undefined;
    }

    let width = 0;
    let height = 0;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let currentPointerX = pointerX;
    let currentPointerY = pointerY;
    let animationFrame = 0;
    let particles = [];

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const particleCount = Math.min(72, Math.max(30, Math.floor((width * height) / 25000)));
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.6,
        alpha: Math.random() * 0.35 + 0.12,
        speedX: (Math.random() - 0.5) * 0.22,
        speedY: (Math.random() - 0.5) * 0.22
      }));
    }

    function handlePointerMove(event) {
      pointerX = event.clientX;
      pointerY = event.clientY;
    }

    function drawConnection(a, b, distance) {
      const maxDistance = 128;
      if (distance > maxDistance) {
        return;
      }

      context.strokeStyle = `rgba(245, 235, 221, ${0.07 * (1 - distance / maxDistance)})`;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
    }

    function draw() {
      animationFrame = window.requestAnimationFrame(draw);
      context.clearRect(0, 0, width, height);

      if (reduceMotion) {
        return;
      }

      currentPointerX += (pointerX - currentPointerX) * 0.06;
      currentPointerY += (pointerY - currentPointerY) * 0.06;

      const influenceX = (currentPointerX / width - 0.5) * 26;
      const influenceY = (currentPointerY / height - 0.5) * 18;

      particles.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        const shiftedX = particle.x + influenceX;
        const shiftedY = particle.y + influenceY;

        context.fillStyle = `rgba(255, 220, 186, ${particle.alpha})`;
        context.beginPath();
        context.arc(shiftedX, shiftedY, particle.radius, 0, Math.PI * 2);
        context.fill();

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const otherX = other.x + influenceX;
          const otherY = other.y + influenceY;
          drawConnection(
            { x: shiftedX, y: shiftedY },
            { x: otherX, y: otherY },
            Math.hypot(shiftedX - otherX, shiftedY - otherY)
          );
        }
      });
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />;
}

export default function App() {
  const headerRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    function render() {
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;

      const xRatio = currentX / window.innerWidth - 0.5;
      const yRatio = currentY / window.innerHeight - 0.5;

      root.style.setProperty("--pointer-x", `${currentX}px`);
      root.style.setProperty("--pointer-y", `${currentY}px`);
      root.style.setProperty("--shift-x", `${xRatio.toFixed(4)}`);
      root.style.setProperty("--shift-y", `${yRatio.toFixed(4)}`);

      frame = window.requestAnimationFrame(render);
    }

    function handlePointerMove(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    }

    function handlePointerLeave() {
      mouseX = window.innerWidth / 2;
      mouseY = window.innerHeight / 2;
    }

    function handleResize() {
      if (reduceMotion) {
        root.style.setProperty("--pointer-x", `${window.innerWidth / 2}px`);
        root.style.setProperty("--pointer-y", `${window.innerHeight / 2}px`);
        root.style.setProperty("--shift-x", "0");
        root.style.setProperty("--shift-y", "0");
      }
    }

    handleResize();

    if (!reduceMotion) {
      frame = window.requestAnimationFrame(render);
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerleave", handlePointerLeave);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  function handleNavClick(event, sectionId) {
    const target = document.getElementById(sectionId);

    if (!target) {
      return;
    }

    event.preventDefault();

    const headerHeight = headerRef.current?.offsetHeight ?? 0;
    const gap = window.innerWidth < 720 ? 18 : 26;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - gap;

    window.history.replaceState(null, "", `#${sectionId}`);
    window.scrollTo({
      top: Math.max(top, 0),
      behavior: "smooth"
    });
  }

  const featuredProject = projects[0];
  const secondaryProjects = projects.slice(1);

  return (
    <div className="site-shell">
      <div className="ambient-stage" aria-hidden="true">
        <AmbientCanvas />
        <div className="ambient-grid" />
        <div className="orb orb-one" />
        <div className="orb orb-two" />
        <div className="orb orb-three" />
        <div className="pointer-glow" />
      </div>

      <header className="topbar" ref={headerRef}>
        <a className="brand" href="#home">
          <span className="brand-mark">SA</span>
          <span className="brand-copy">
            <strong>Sahil Addepalli</strong>
            <span>Software Developer</span>
          </span>
        </a>

        <nav className="nav">
          {navLinks.map((link) => (
            <a href={link.href} key={link.id} onClick={(event) => handleNavClick(event, link.id)}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Sahil Addepalli • BTech 3rd Year Student</p>
            <h1>Building useful products with a student mindset and real-world intent.</h1>
            <p className="hero-role">Full-stack development, workflow automation, and cleaner interfaces that feel built with purpose.</p>
            <p className="hero-text">
              I am currently in my 3rd year of BTech and I enjoy building software that solves a real problem instead
              of only looking polished on a landing page. Most of my work sits around Python, React, Flask, document
              workflows, automation, and cleaner product interfaces.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View Projects
              </a>
              <a className="button button-secondary" href="#contact">
                Contact Me
              </a>
            </div>

            <ul className="hero-strengths">
              {strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <ul className="metrics">
              {metrics.map((item) => (
                <li key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-stage" data-reveal>
            <TiltCard className="portrait-card portrait-card-clean">
              <div className="portrait-shell">
                <img className="portrait-image" src="/images/sahil.png" alt="Sahil Addepalli portrait" />
              </div>
              <div className="portrait-meta">
                <div>
                  <p className="card-kicker">Profile</p>
                  <h2>Sahil Addepalli</h2>
                </div>
                <p>
                  Student developer building practical software, cleaner workflows, and portfolio-worthy products with
                  real use behind them.
                </p>
                <div className="hero-mini-tags">
                  <span>Open to internships</span>
                  <span>Python • React • Flask</span>
                </div>
              </div>
            </TiltCard>

            <div className="hero-note-card">
              <p className="card-kicker">Current direction</p>
              <p>
                Sharper front-end execution, stronger backend thinking, and projects that feel mature enough for real
                internship and engineering opportunities.
              </p>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">About</p>
            <h2>A student portfolio with real work behind it.</h2>
          </div>

          <div className="about-grid">
            <TiltCard className="about-card about-story" data-reveal>
              <p>
                I am a 3rd-year BTech student who enjoys creating software that actually does something useful. My
                interest in technology has grown into hands-on work across web development, automation, software
                engineering, and analytics-focused learning.
              </p>
              <p>
                I am especially interested in full-stack development and building products that simplify real workflows.
                Whether it is recruitment, document generation, or developer tooling, I like software that saves time
                and feels practical.
              </p>
            </TiltCard>

            <TiltCard className="about-card about-points" data-reveal>
              <p className="card-kicker">What defines my work</p>
              <ul className="point-list">
                {aboutPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </TiltCard>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Skills</p>
            <h2>The stack I keep sharpening through real project work.</h2>
            <p className="section-subtext">
              I care less about listing every tool and more about using the right stack to build something that works
              well, feels clear, and solves a real problem.
            </p>
          </div>

          <div className="skills-layout">
            <TiltCard className="skills-intro-card" data-reveal>
              <p className="card-kicker">Working stack</p>
              <h3>Built through projects, not just course lists.</h3>
              <p>
                Most of the tools below are things I keep returning to while building recruitment systems, document
                workflows, automation utilities, and full-stack interfaces that need both clean logic and clear UI.
              </p>

              <div className="skills-summary-grid">
                <div>
                  <strong>04</strong>
                  <span>project types explored</span>
                </div>
                <div>
                  <strong>06</strong>
                  <span>certificate-backed learning tracks</span>
                </div>
              </div>
            </TiltCard>

            <div className="skills-grid">
              {skillGroups.map((group, index) => (
                <TiltCard className={`skill-card skill-card-${group.tone}`} data-reveal key={group.title}>
                  <div className="skill-card-top">
                    <span className="skill-index">{String(index + 1).padStart(2, "0")}</span>
                    <div className="skill-card-headings">
                      <h3>{group.title}</h3>
                      <p className="skill-summary">{group.summary}</p>
                    </div>
                  </div>

                  <div className="skill-chip-grid">
                    {group.items.map((item) => (
                      <span className="skill-chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section certifications-section" id="certifications">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Certificates</p>
            <h2>Learning backed by industry programs and practical simulations.</h2>
          </div>

          <div className="cert-grid">
            {certifications.map((cert) => (
              <TiltCard
                as="a"
                className="cert-card cert-link-card"
                data-reveal
                href={cert.link}
                key={cert.id}
                rel="noreferrer"
                target="_blank"
              >
                <div className="cert-top">
                  <div className="cert-brand">
                    <span className={`cert-mark cert-mark-${cert.tone}`}>{cert.mark}</span>
                    <div className="cert-brand-copy">
                      <span className="cert-brand-name">{cert.brand}</span>
                      <p className="cert-issuer">{cert.issuer}</p>
                    </div>
                  </div>
                  <div className="cert-heading">
                    <p className="cert-year">{cert.year}</p>
                    <h3>{cert.title}</h3>
                  </div>
                </div>

                <p className="cert-description">{cert.description}</p>

                <div className="cert-skill-row">
                  {cert.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <span className="cert-link-inline">
                  <span>Open certificate</span>
                  <Icon name="external" />
                </span>
              </TiltCard>
            ))}
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">Projects</p>
            <h2>Projects that show how I think, build, and improve.</h2>
          </div>

          <TiltCard className={`featured-project accent-${featuredProject.accent}`} data-reveal>
            <div className="featured-copy">
              <span className="project-label">{featuredProject.label}</span>
              <h3>{featuredProject.title}</h3>
              <p>{featuredProject.summary}</p>
              <p>{featuredProject.detail}</p>
              <ul className="tag-row">
                {featuredProject.stack.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>

            <div className="featured-side">
              <div className="featured-index">{featuredProject.id}</div>
              <a className="project-link" href={featuredProject.link} rel="noreferrer" target="_blank">
                Open GitHub Project
              </a>
            </div>
          </TiltCard>

          <div className="projects-grid">
            {secondaryProjects.map((project) => (
              <TiltCard className={`project-card accent-${project.accent}`} data-reveal key={project.id}>
                <div className="project-topline">
                  <span className="project-index">{project.id}</span>
                  <span className="project-chip">{project.label}</span>
                </div>

                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <p>{project.detail}</p>
                </div>

                <div className="project-footer">
                  <ul className="tag-row">
                    {project.stack.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <a className="project-link" href={project.link} rel="noreferrer" target="_blank">
                    View on GitHub
                  </a>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <TiltCard as="article" className="contact-card" data-reveal>
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Available for internships, collaboration, and good engineering conversations.</h2>
              <p>
                If you are building something interesting or looking for someone who is serious about learning and
                shipping, I would love to connect.
              </p>
            </div>

            <div className="contact-links">
              {contactLinks.map((item) => (
                <a href={item.href} key={item.label} rel="noreferrer" target={item.href.startsWith("mailto:") ? undefined : "_blank"}>
                  <span className="contact-icon-wrap">
                    <Icon name={item.icon} />
                  </span>
                  <span className="contact-copy">
                    <strong>{item.label}</strong>
                    <span>{item.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </TiltCard>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Sahil Addepalli</p>
        <div className="footer-links footer-links-rich">
          {contactLinks.map((item) => (
            <a href={item.href} key={item.label} rel="noreferrer" target={item.href.startsWith("mailto:") ? undefined : "_blank"}>
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}


