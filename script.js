document.addEventListener('DOMContentLoaded', () => {
    
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Dark/Light Mode Toggle ---
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        const htmlElement = document.documentElement;
        const themeIcon = themeToggleBtn.querySelector('i');

        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                htmlElement.setAttribute('data-theme', 'dark');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                htmlElement.setAttribute('data-theme', 'light');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        });
    }

    // --- RTL/LTR Direction Toggle ---
    // User requested: "Display only the active mode in the RTL/LTR toggle 
    // — show 'LTR' when in LTR mode and 'RTL' when in RTL mode"
    // Handle both 'dirToggle' and 'directionToggle' IDs
    const dirToggleBtn = document.getElementById('dirToggle') || document.getElementById('directionToggle');
    
    if (dirToggleBtn) {
        const htmlElement = document.documentElement;
        dirToggleBtn.addEventListener('click', () => {
            const currentDir = htmlElement.getAttribute('dir');
            
            if (currentDir === 'ltr') {
                // Switch to RTL
                htmlElement.setAttribute('dir', 'rtl');
                if (dirToggleBtn.id === 'dirToggle') {
                    dirToggleBtn.textContent = 'RTL';
                } else {
                    dirToggleBtn.innerHTML = '<i class="fa-solid fa-left-right"></i> <span id="dirIndicator">RTL</span>';
                }
            } else {
                // Switch to LTR
                htmlElement.setAttribute('dir', 'ltr');
                if (dirToggleBtn.id === 'dirToggle') {
                    dirToggleBtn.textContent = 'LTR';
                } else {
                    dirToggleBtn.innerHTML = '<i class="fa-solid fa-left-right"></i> <span id="dirIndicator">LTR</span>';
                }
            }
        });
    }

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    // Trigger once on load
    revealOnScroll();
    
    // Trigger on scroll
    window.addEventListener('scroll', revealOnScroll);

    // --- Mobile Navigation Menu Logic ---
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        // Create overlay dynamically if it doesn't exist
        let overlay = document.querySelector('.mobile-menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            document.body.appendChild(overlay);
        }

        const toggleMenu = () => {
            navMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        };

        const closeMenu = () => {
            navMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        };

        mobileToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', closeMenu);

        // Close menu when pressing Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        // Handle dropdowns on mobile (and tablets)
        const dropdownToggles = navMenu.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle.parentElement.classList.toggle('active');
            });
        });

        // Close menu when clicking any regular nav link
        const navLinks = navMenu.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
});
