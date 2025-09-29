// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Only run if elements exist on the page
    if (hamburger && navMenu) {
        // Toggle mobile menu
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Smooth scrolling for anchor links (only on index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                // Only prevent default for same-page anchors
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // Update active navigation link based on scroll position (for index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Dashboard specific functionality
    if (window.location.pathname.endsWith('dashboard.html')) {
        // Update last updated time
        const now = new Date();
        const lastUpdated = document.getElementById('last-updated');
        if (lastUpdated) {
            lastUpdated.textContent = `Today at ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
        }

        // Simulate real-time updates for dashboard stats
        setInterval(() => {
            const emergencies = document.getElementById('active-emergencies');
            if (emergencies) {
                const currentEmergencies = parseInt(emergencies.textContent) || 0;
                const change = Math.random() > 0.7 ? 1 : (Math.random() > 0.5 ? -1 : 0);
                const newCount = Math.max(0, currentEmergencies + change);
                emergencies.textContent = newCount;
                
                // Add animation class
                emergencies.classList.add('updated');
                setTimeout(() => {
                    emergencies.classList.remove('updated');
                }, 500);
            }
        }, 10000);
    }

    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Handle login/logout buttons
    const loginBtn = document.querySelector('.btn.login');
    const logoutBtn = document.querySelector('.btn-logout');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            // In a real app, this would redirect to login page
            window.location.href = 'dashboard.html';
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // In a real app, this would log the user out
            window.location.href = 'index.html';
        });
    }
});
