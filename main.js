/* ============================================
   PENTEST WARRIOR - CYBERSECURITY PORTFOLIO
   Complete JavaScript
   Vanilla JS - No Libraries
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // LOADING SCREEN
    // ============================================
    const loadingScreen = document.getElementById('loading-screen');
    const loaderStatus = document.querySelector('.loader-status');
    const statusMessages = [
        'Loading modules...',
        'Initializing security protocols...',
        'Establishing secure connection...',
        'Decrypting portfolio data...',
        'System ready.'
    ];

    let statusIndex = 0;
    const statusInterval = setInterval(() => {
        statusIndex++;
        if (statusIndex < statusMessages.length) {
            loaderStatus.textContent = statusMessages[statusIndex];
        }
    }, 400);

    setTimeout(() => {
        clearInterval(statusInterval);
        loadingScreen.classList.add('hidden');
        // Initialize animations after loading
        setTimeout(initAll, 300);
    }, 2200);

    function initAll() {
        initMatrixRain();
        initTypingAnimation();
        initNavbar();
        initScrollReveal();
        initSkillBars();
        initCounters();
        initMouseGlow();
        initBackToTop();
        initSmoothScroll();
        initHamburgerMenu();
        initContactForm();
    }

    // ============================================
    // MATRIX RAIN EFFECT
    // ============================================
    function initMatrixRain() {
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');

        let width, height;
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        const charArray = chars.split('');
        const fontSize = 14;
        let columns;
        let drops = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / fontSize);
            drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.random() * -100;
            }
        }

        resize();
        window.addEventListener('resize', resize);

        function draw() {
            ctx.fillStyle = 'rgba(5, 5, 8, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#00ff88';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Vary opacity for depth effect
                const opacity = Math.random() * 0.5 + 0.3;
                ctx.globalAlpha = opacity;
                ctx.fillText(text, x, y);
                ctx.globalAlpha = 1;

                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            requestAnimationFrame(draw);
        }

        draw();
    }

    // ============================================
    // TYPING ANIMATION
    // ============================================
    function initTypingAnimation() {
        const typingText = document.getElementById('typing-text');
        const phrases = [
            'Cybersecurity Practitioner',
            'Ethical Hacking Enthusiast',
            'Cybersecurity Educator',
            'OSINT Researcher',
            'Penetration Testing Learner'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500; // Pause before next phrase
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    // ============================================
    // NAVBAR SCROLL & ACTIVE STATE
    // ============================================
    function initNavbar() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active section highlighting
        function updateActiveLink() {
            let current = '';
            const scrollPos = window.scrollY + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink();
    }

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // ============================================
    // SKILL BARS ANIMATION
    // ============================================
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const progress = bar.getAttribute('data-progress');
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                    }, 200);
                    skillObserver.unobserve(bar);
                }
            });
        }, {
            threshold: 0.5
        });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // ============================================
    // ANIMATED COUNTERS
    // ============================================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // ============================================
    // MOUSE GLOW EFFECT
    // ============================================
    function initMouseGlow() {
        const mouseGlow = document.getElementById('mouse-glow');
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        // Check if touch device
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        if (isTouchDevice) {
            mouseGlow.style.display = 'none';
            return;
        }

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateGlow() {
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;

            mouseGlow.style.left = glowX + 'px';
            mouseGlow.style.top = glowY + 'px';

            requestAnimationFrame(animateGlow);
        }

        animateGlow();
    }

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    function initBackToTop() {
        const backToTop = document.getElementById('back-to-top');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 600) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navLinks = document.getElementById('nav-links');
                    const hamburger = document.getElementById('hamburger');
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            });
        });
    }

    // ============================================
    // HAMBURGER MENU
    // ============================================
    function initHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // ============================================
    // CONTACT FORM
    // ============================================
    function initContactForm() {
        const form = document.getElementById('contact-form');

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Create mailto link
            const mailtoLink = `mailto:warriorpentest@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            )}`;

            window.location.href = mailtoLink;

            // Reset form
            form.reset();
        });
    }

    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroTerminal = document.querySelector('.hero-terminal');

        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
        }

        if (heroTerminal && scrolled < window.innerHeight) {
            heroTerminal.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroTerminal.style.opacity = 1 - (scrolled / window.innerHeight) * 0.6;
        }
    });

    // ============================================
    // TERMINAL TYPING EFFECT
    // ============================================
    const terminalLines = document.querySelectorAll('.terminal-body .terminal-line');
    terminalLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-10px)';

        setTimeout(() => {
            line.style.transition = 'all 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, 500 + (index * 400));
    });

    // ============================================
    // RANDOM GLITCH EFFECT ON LOGO
    // ============================================
    const logoText = document.querySelector('.logo-text');
    if (logoText) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                logoText.style.textShadow = '2px 0 var(--neon-green), -2px 0 var(--neon-blue)';
                setTimeout(() => {
                    logoText.style.textShadow = 'none';
                }, 100);
            }
        }, 2000);
    }

    // ============================================
    // FLOATING PARTICLES (SIMPLE DOM VERSION)
    // ============================================
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--neon-green);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            opacity: 0;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            box-shadow: 0 0 10px var(--neon-green);
            transition: all 3s ease-out;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.style.opacity = '0.6';
            particle.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
        }, 50);

        setTimeout(() => {
            particle.style.opacity = '0';
            setTimeout(() => particle.remove(), 3000);
        }, 2500);
    }

    // Create particles periodically
    setInterval(createFloatingParticle, 3000);

    // ============================================
    // KEYBOARD SHORTCUTS (EASTER EGG)
    // ============================================
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode = konamiCode.slice(-10);

        if (konamiCode.join(',') === konamiSequence.join(',')) {
            // Easter egg: Flash screen green
            const flash = document.createElement('div');
            flash.style.cssText = `
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: var(--neon-green);
                opacity: 0.3;
                z-index: 10000;
                pointer-events: none;
                transition: opacity 0.5s ease;
            `;
            document.body.appendChild(flash);

            setTimeout(() => {
                flash.style.opacity = '0';
                setTimeout(() => flash.remove(), 500);
            }, 200);

            console.log('%c🔓 ACCESS GRANTED — PENTEST WARRIOR MODE ACTIVATED', 'color: #00ff88; font-size: 20px; font-weight: bold;');
        }
    });

    // ============================================
    // CONSOLE EASTER EGG
    // ============================================
    console.log('%c⚡ PENTEST WARRIOR PORTFOLIO', 'color: #00ff88; font-size: 24px; font-weight: bold; font-family: Orbitron;');
    console.log('%cBuilt by Idris Ibrahim | Pure HTML, CSS & JavaScript', 'color: #00d4ff; font-size: 12px;');
    console.log('%cTry the Konami Code: ↑↑↓↓←→←→BA', 'color: #a855f7; font-size: 11px;');
});