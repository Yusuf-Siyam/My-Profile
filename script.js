// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        document.querySelector('.preloader').style.display = 'none';
    }, 1000);

    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false
    });

    // Typed.js initialization (typing effect)
    setTimeout(function() {
        const typed = new Typed('.typing', {
            strings: ['Web Developer', 'Computer Science Student', 'Problem Solver','UI/UX Designer',"Learner"],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
        
        // Subtitle typing effect
        const typedSubtitle = new Typed('.typing-subtitle', {
            strings: [
                "Assalamu Alaikum ,Welcome to My profile Portfolio",
                'Building beautiful web experiences with passion and creativity',
                'Creating innovative digital solutions for modern problems',
                'Turning ideas into reality with code and design',
                'Making the web more beautiful, one pixel at a time'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            startDelay: 1500
        });
    }, 1500);

    // Navigation menu functionality
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Smooth scroll to section
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if(targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if(!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Change navigation background on scroll
    window.addEventListener('scroll', function() {
        if(window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active menu item based on scroll position
        updateActiveMenuItem();
        
        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if(window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if(filterValue === 'all') {
                    card.style.display = 'block';
                } else if(card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
                
                // Trigger AOS refresh
                setTimeout(() => {
                    AOS.refresh();
                }, 300);
            });
        });
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Check for saved theme preference
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if(document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Function to update active menu item based on scroll position
    function updateActiveMenuItem() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // NEW ADVANCED PARTICLE SYSTEM
    const cursorContainer = document.querySelector('.cursor-container');
    let mouseX = 0;
    let mouseY = 0;
    let lastX = 0;
    let lastY = 0;
    
    // INCREASED PARTICLE COUNTS
    const config = {
        particlesPerFrame: 8,       // Number of particles per frame
        particleCount: 300,         // Maximum particles
        particleSize: {min: 1, max: 4},  // Size range
        particleLifespan: 4000,     // Particles stay visible longer
        fadeSpeed: 0.006,           // Slower fade for longer trails
        colors: function() {
            return document.body.classList.contains('dark-theme')
                ? ['#7d8eff', '#bd7fff', '#ff6ea8', '#ff8b3d']  // Dark theme colors
                : ['#4e67ff', '#7e42ff', '#ff4e8c', '#ff6b3d']; // Light theme colors
        },
        trail: true,                // Enable trail effect
        gravity: 0.01,              // Slight gravity for better movement
        randomness: 0.5,            // Random movement factor
        dispersion: 4,              // How much particles disperse
        backgroundParticles: 200    // Static background particles
    };
    
    // Store particles
    const particles = [];
    
    // Track mouse position and create particles on movement
    document.addEventListener('mousemove', (e) => {
        lastX = mouseX;
        lastY = mouseY;
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create particles on mouse movement
        if (config.trail) {
            const distance = Math.sqrt(Math.pow(mouseX - lastX, 2) + Math.pow(mouseY - lastY, 2));
            // INCREASED: More particles for even small movements
            const particlesToCreate = Math.min(Math.ceil(distance / 2) * config.particlesPerFrame, 50);
            
            for (let i = 0; i < particlesToCreate; i++) {
                const ratio = i / particlesToCreate;
                createParticle(
                    lastX + (mouseX - lastX) * ratio,
                    lastY + (mouseY - lastY) * ratio
                );
            }
        }
    });
    
    // Create particles even when mouse is still (pulsing effect)
    setInterval(() => {
        if (mouseX !== 0 && mouseY !== 0) {
            // INCREASED: More particles when still
            for (let i = 0; i < 8; i++) {
                createParticle(
                    mouseX + (Math.random() - 0.5) * 20, 
                    mouseY + (Math.random() - 0.5) * 20
                );
            }
        }
    }, 30); // DECREASED: More frequent particle creation
    
    // ADDED: Create background particles
    function createBackgroundParticles() {
        for (let i = 0; i < config.backgroundParticles; i++) {
            const element = document.createElement('div');
            element.className = 'particle background-particle';
            
            // Random properties
            const size = Math.random() * 2 + 0.5; // Smaller background particles
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            // Set element styles
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            const colors = config.colors();
            element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            element.style.opacity = Math.random() * 0.5 + 0.1; // Varying opacity
            element.style.transform = `translate(${x}px, ${y}px)`;
            
            // Add to DOM
            cursorContainer.appendChild(element);
            
            // Add subtle animation
            const duration = Math.random() * 30 + 20;
            element.style.animation = `float ${duration}s infinite ease-in-out`;
        }
    }
    
    // Animation loop
    function animate() {
        // Update each particle
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            
            // Apply gravity and random movement
            particle.vy += config.gravity;
            particle.vx += (Math.random() - 0.5) * config.randomness;
            particle.vy += (Math.random() - 0.5) * config.randomness;
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Apply rotation for some particles
            if (particle.rotation) {
                particle.rotation += particle.rotationSpeed;
                particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px) rotate(${particle.rotation}deg)`;
            } else {
                particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
            }
            
            // Update opacity based on life
            particle.life -= 16; // Approximately 16ms per frame
            particle.opacity = (particle.life / config.particleLifespan) * particle.initialOpacity;
            particle.element.style.opacity = Math.max(0, particle.opacity);
            
            // Remove dead particles
            if (particle.life <= 0) {
                particle.element.remove();
                particles.splice(i, 1);
            }
        }
        
        // Limit particles if way too many
        while (particles.length > config.particleCount) {
            particles[0].element.remove();
            particles.shift();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Create a new particle
    function createParticle(x, y) {
        const element = document.createElement('div');
        element.className = 'particle';
        
        // Random properties
        const size = Math.random() * (config.particleSize.max - config.particleSize.min) + config.particleSize.min;
        const colors = config.colors();
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Add some dispersal from cursor position
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * config.dispersion;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        // Set element styles
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.backgroundColor = color;
        
        // Add glow effect to some particles
        if (Math.random() > 0.5) {
            element.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        }
        
        // Add to DOM
        cursorContainer.appendChild(element);
        
        // Create particle object
        const initialOpacity = Math.random() * 0.3 + 0.7; // Varying initial opacity
        element.style.opacity = initialOpacity;
        
        const particle = {
            element,
            x,
            y,
            size,
            vx,
            vy,
            life: config.particleLifespan,
            initialOpacity,
            opacity: initialOpacity
        };
        
        // Add rotation to some particles
        if (Math.random() > 0.7) {
            particle.rotation = Math.random() * 360;
            particle.rotationSpeed = (Math.random() - 0.5) * 3;
        }
        
        particles.push(particle);
    }
    
    // ADDED: Particle explosion function
    function createParticleExplosion(x, y, count = 50) {
        for (let i = 0; i < count; i++) {
            const element = document.createElement('div');
            element.className = 'particle explosion-particle';
            
            // Random properties
            const size = Math.random() * 2 + 1;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            
            // Set element styles
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
            const colors = config.colors();
            element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Add to DOM
            cursorContainer.appendChild(element);
            
            // Create particle object
            const particle = {
                element,
                x,
                y,
                size,
                vx,
                vy,
                life: Math.random() * 1000 + 500,
                initialOpacity: 1,
                opacity: 1
            };
            
            particles.push(particle);
        }
    }
    
    // Add click effect
    document.addEventListener('click', (e) => {
        createParticleExplosion(e.clientX, e.clientY, 100);
    });
    
    // ADDED: Create initial background particles
    createBackgroundParticles();
    
    // Start animation
    animate();
    
    // Update background particles with custom properties
    setTimeout(() => {
        const bgParticles = document.querySelectorAll('.background-particle');
        bgParticles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            particle.style.setProperty('--x', `${rect.left}px`);
            particle.style.setProperty('--y', `${rect.top}px`);
        });
    }, 100);

    // Initialize Google Map
    window.initMap = function() {
        // Coordinates for Dhaka, Bangladesh
        const dhaka = { lat: 23.8103, lng: 90.4125 };
        
        const map = new google.maps.Map(document.getElementById('google-map'), {
            zoom: 12,
            center: dhaka,
            styles: [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [{"saturation": 36}, {"color": "#333333"}, {"lightness": 40}]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [{"visibility": "on"}, {"color": "#ffffff"}, {"lightness": 16}]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [{"visibility": "off"}]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#fefefe"}, {"lightness": 20}]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#fefefe"}, {"lightness": 17}, {"weight": 1.2}]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f5f5f5"}, {"lightness": 21}]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{"color": "#ffffff"}, {"lightness": 29}, {"weight": 0.2}]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{"color": "#ffffff"}, {"lightness": 18}]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{"color": "#ffffff"}, {"lightness": 16}]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{"color": "#f2f2f2"}, {"lightness": 19}]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
                }
            ]
        });
        
        // Add marker
        const marker = new google.maps.Marker({
            position: dhaka,
            map: map,
            title: 'Dhaka, Bangladesh',
            animation: google.maps.Animation.DROP
        });
        
        // Info window
        const infoWindow = new google.maps.InfoWindow({
            content: '<div style="width:200px;text-align:center;padding:10px;"><b>Siyam</b><br>Web Developer<br>Dhaka, Bangladesh</div>'
        });
        
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
        });
    };
}); 