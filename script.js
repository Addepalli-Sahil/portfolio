// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }));
}

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeIcon();
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        updateThemeIcon();
        
        // Save theme preference
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
        } else {
            localStorage.removeItem('theme');
        }
    });
}

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.className = 'fa fa-sun-o';
    } else {
        icon.className = 'fa fa-moon-o';
    }
}

// Custom Cursor Effect
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .cert-card, .project-card, .skill-node');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Optimized scroll performance
let ticking = false;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    
    // Update scroll progress indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        const progress = (scrolled / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollIndicator.style.width = progress + '%';
    }
    
    // Update navbar with dark mode support
    const navbar = document.querySelector('.navbar');
    if (scrolled > 50) {
        if (body.classList.contains('dark-mode')) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    } else {
        if (body.classList.contains('dark-mode')) {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Enhanced typing effect with moving cursor
function initTypingEffect() {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.innerHTML = ''; // Clear content
        
        // Create wrapper for better positioning
        const wrapper = document.createElement('div');
        wrapper.className = 'typing-wrapper';
        
        const textSpan = document.createElement('span');
        textSpan.className = 'typing-text';
        textSpan.textContent = ''; // Start empty
        
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor-moving';
        cursor.textContent = '|';
        
        wrapper.appendChild(textSpan);
        wrapper.appendChild(cursor);
        heroName.appendChild(wrapper);
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                textSpan.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            } else {
                // Completely remove cursor after typing is complete
                setTimeout(() => {
                    cursor.style.display = 'none';
                    cursor.remove(); // Completely remove the cursor element
                }, 500);
            }
        }
        
        // Start typing after delay
        setTimeout(typeWriter, 1000);
    }
}

// Magnetic Button Effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Skill Progress Bar Animation
function initSkillProgressBars() {
    const skillNodes = document.querySelectorAll('.skill-node');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress-bar');
                if (progressBar) {
                    const width = progressBar.getAttribute('data-width');
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 500);
                }
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillNodes.forEach(node => {
        skillObserver.observe(node);
    });
}

// Text Reveal Animation
function initTextRevealAnimations() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.setProperty('--i', index);
            element.appendChild(span);
        });
    });
}

// FIXED WORKING CAROUSEL - DISPLAYS 2 CARDS AT A TIME, PROPER BUTTON DISABLING
function initCertificatesCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.indicator');
    
    console.log('Carousel elements found:', { track, prevBtn, nextBtn, indicators: indicators.length });
    
    if (!track || !prevBtn || !nextBtn) {
        console.error('Carousel elements not found!');
        return;
    }
    
    const cards = track.querySelectorAll('.cert-wrapper');
    console.log('Cards found:', cards.length);
    
    if (cards.length === 0) {
        console.error('No certificate cards found!');
        return;
    }
    
    const cardWidth = 500;
    let currentIndex = 0;
    const totalCards = cards.length;
    const maxIndex = totalCards - 2; // Show 2 cards at a time, so max index is total - 2
    let isTransitioning = false;
    
    function updateCarousel() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        
        const translateX = -currentIndex * cardWidth;
        track.style.transition = 'transform 0.6s ease-in-out';
        track.style.transform = `translateX(${translateX}px)`;
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Disable prev button at first position
        if (currentIndex === 0) {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.3';
            prevBtn.style.cursor = 'not-allowed';
            prevBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.disabled = false;
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
            prevBtn.style.pointerEvents = 'auto';
        }
        
        // Disable next button at last position (when showing last 2 cards)
        if (currentIndex >= maxIndex) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.3';
            nextBtn.style.cursor = 'not-allowed';
            nextBtn.style.pointerEvents = 'none';
        } else {
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
            nextBtn.style.pointerEvents = 'auto';
        }
        
        setTimeout(() => {
            isTransitioning = false;
        }, 600);
        
        console.log('Updated carousel - currentIndex:', currentIndex, 'maxIndex:', maxIndex, 'totalCards:', totalCards);
    }
    
    function goNext() {
        if (isTransitioning || currentIndex >= maxIndex) {
            console.log('Cannot go next - at last position or transitioning');
            return;
        }
        currentIndex++;
        updateCarousel();
    }
    
    function goPrev() {
        if (isTransitioning || currentIndex <= 0) {
            console.log('Cannot go prev - at first position or transitioning');
            return;
        }
        currentIndex--;
        updateCarousel();
    }
    
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!nextBtn.disabled && currentIndex < maxIndex) {
            goNext();
        }
        console.log('Next clicked - currentIndex:', currentIndex, 'disabled:', nextBtn.disabled);
    });
    
    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!prevBtn.disabled && currentIndex > 0) {
            goPrev();
        }
        console.log('Prev clicked - currentIndex:', currentIndex, 'disabled:', prevBtn.disabled);
    });
    
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', (e) => {
            e.preventDefault();
            if (isTransitioning || index === currentIndex) return;
            if (index <= maxIndex) {
                currentIndex = index;
                updateCarousel();
            }
        });
    });
    
    // Initialize carousel
    updateCarousel();
    console.log('Two-card carousel initialized - totalCards:', totalCards, 'maxIndex:', maxIndex);
}

// Smooth page loading
function initPageLoading() {
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// Project card animations
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });
}

// Enhanced contact form handling with Formspree
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e74c3c';
                input.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
            } else {
                input.style.borderColor = 'var(--primary-color)';
                input.style.boxShadow = '0 0 5px rgba(102, 126, 234, 0.3)';
            }
        });
        
        // Email validation
        const emailInput = contactForm.querySelector('input[type="email"]');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput && !emailRegex.test(emailInput.value)) {
            isValid = false;
            emailInput.style.borderColor = '#e74c3c';
            emailInput.style.boxShadow = '0 0 5px rgba(231, 76, 60, 0.3)';
        }
        
        if (isValid) {
            const button = contactForm.querySelector('.btn');
            const originalText = button.innerHTML;
            
            // Show sending state
            button.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
            button.disabled = true;
            
            try {
                // Submit to Formspree
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    button.innerHTML = '<i class="fa fa-check"></i> Message Sent!';
                    button.style.background = '#28a745';
                    
                    setTimeout(() => {
                        button.innerHTML = originalText;
                        button.style.background = '';
                        button.disabled = false;
                        contactForm.reset();
                        
                        // Reset input styles
                        inputs.forEach(input => {
                            input.style.borderColor = '';
                            input.style.boxShadow = '';
                        });
                    }, 3000);
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                // Error
                button.innerHTML = '<i class="fa fa-exclamation-triangle"></i> Failed to send. Try again.';
                button.style.background = '#e74c3c';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                    button.disabled = false;
                }, 3000);
            }
        } else {
            // Show validation error
            const button = contactForm.querySelector('.btn');
            const originalText = button.innerHTML;
            
            button.innerHTML = '<i class="fa fa-exclamation-triangle"></i> Please fill all fields correctly';
            button.style.background = '#e74c3c';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
            }, 3000);
        }
    });
}

// Add loading animation for better UX
function showLoading() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading Portfolio...</p>
        </div>
    `;
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1000);
}

// Enhanced stats animation with counting effect
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 50);
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                aboutObserver.unobserve(entry.target);
            }
        });
    });
    
    aboutObserver.observe(aboutSection);
}

// Parallax scrolling effect for elements
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Enhanced skill node interactions
function initSkillNodeInteractions() {
    const skillNodes = document.querySelectorAll('.skill-node');
    
    skillNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            // Add glow effect
            node.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.4)';
            
            // Animate skill items
            const skillItems = node.querySelectorAll('.skill-list span');
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transform = 'translateY(-5px)';
                    item.style.background = 'var(--gradient-primary)';
                    item.style.color = 'white';
                }, index * 100);
            });
        });
        
        node.addEventListener('mouseleave', () => {
            // Remove glow effect
            node.style.boxShadow = '';
            
            // Reset skill items
            const skillItems = node.querySelectorAll('.skill-list span');
            skillItems.forEach(item => {
                item.style.transform = '';
                item.style.background = '';
                item.style.color = '';
            });
        });
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
    
    // Carousel keyboard navigation
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById('prevBtn');
        if (prevBtn && !prevBtn.disabled) {
            prevBtn.click();
        }
    }
    
    if (e.key === 'ArrowRight') {
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn && !nextBtn.disabled) {
            nextBtn.click();
        }
    }
});

// Enhanced focus management for accessibility
function initAccessibilityFeatures() {
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-color)';
            element.style.outlineOffset = '2px';
            element.style.borderRadius = '4px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Performance monitoring
function initPerformanceMonitoring() {
    // Monitor page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Page loaded in ${Math.round(loadTime)}ms`);
        
        // Log to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                value: Math.round(loadTime),
                event_category: 'Performance'
            });
        }
    });
    
    // Monitor scroll performance
    let scrollStartTime = 0;
    window.addEventListener('scroll', () => {
        if (scrollStartTime === 0) {
            scrollStartTime = performance.now();
        }
    }, { once: true });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll('section, .project-card, .skill-category, .contact-item, .stat-item, .cert-card');
    elementsToObserve.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Initialize all functions
    initCustomCursor();
    initTypingEffect();
    initPageLoading();
    initProjectAnimations();
    initCertificatesCarousel();
    initMagneticButtons();
    initSkillProgressBars();
    initTextRevealAnimations();
    initParallax();
    initSkillNodeInteractions();
    initAccessibilityFeatures();
    initPerformanceMonitoring();
    
    console.log('Enhanced portfolio initialized successfully! 🚀');
});

// Initialize loading on page start
if (document.readyState === 'loading') {
    showLoading();
}

// Add smooth page transitions
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});

// Error handling for better user experience
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        z-index: 10000;
        max-width: 300px;
    `;
    errorDiv.textContent = 'Something went wrong, but the portfolio is still functional!';
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
});

// Certificate card flip functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Certificate flip functionality loading...');
    
    const certCards = document.querySelectorAll('.cert-card');
    console.log('Found certificate cards:', certCards.length);
    
    certCards.forEach((card, index) => {
        console.log(`Setting up card ${index + 1}`);
        
        // Add click event to flip card manually
        card.addEventListener('click', function(e) {
            console.log('Card clicked!', e.target);
            
            // Don't flip if clicking on scrollable content or button
            if (!e.target.closest('.cert-details') && !e.target.closest('.cert-btn')) {
                console.log('Flipping card...');
                this.classList.toggle('flipped');
                
                if (this.classList.contains('flipped')) {
                    console.log('Card is now flipped (showing skills)');
                } else {
                    console.log('Card is now front (showing description)');
                }
            } else {
                console.log('Clicked on description area or button - not flipping');
            }
        });
        
        // Prevent flipping when scrolling in description
        const certDetails = card.querySelector('.cert-details');
        if (certDetails) {
            certDetails.addEventListener('scroll', function(e) {
                e.stopPropagation();
                console.log('Scrolling in description area');
            });
            
            certDetails.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('Clicked inside description area');
            });
        }

        // Prevent flipping when clicking on certificate button
        const certBtn = card.querySelector('.cert-btn');
        if (certBtn) {
            certBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                console.log('Clicked on certificate button');
            });
        }
    });
    
    console.log('Certificate flip functionality setup complete!');
});
