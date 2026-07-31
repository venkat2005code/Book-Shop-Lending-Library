document.addEventListener('DOMContentLoaded', () => {
    // Mobile Sidebar Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const sidebar = document.getElementById('dashboardSidebar');
    
    if (mobileToggle && sidebar) {
        // Create overlay dynamically if it doesn't exist
        let overlay = document.querySelector('.dashboard-menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'dashboard-menu-overlay';
            document.body.appendChild(overlay);
        }

        const toggleSidebar = () => {
            sidebar.classList.toggle('show');
            overlay.classList.toggle('show');
            document.body.classList.toggle('no-scroll');
        };

        const closeSidebar = () => {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
            document.body.classList.remove('no-scroll');
        };

        mobileToggle.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', closeSidebar);

        // Close when pressing escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('show')) {
                closeSidebar();
            }
        });
    }

    // ScrollSpy Logic
    const sections = document.querySelectorAll('.dashboard-section');
    const navLinks = document.querySelectorAll('.sidebar-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            // Adjust offset for sticky header height
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth Scrolling for Sidebar Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').split('#')[1];
            if (targetId) {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetSection.offsetTop - 80, // Offset for sticky header
                        behavior: 'smooth'
                    });
                    
                    // Close sidebar on mobile after clicking
                    if (window.innerWidth <= 768 && sidebar) {
                        sidebar.classList.remove('show');
                        const overlay = document.querySelector('.dashboard-menu-overlay');
                        if (overlay) overlay.classList.remove('show');
                        document.body.classList.remove('no-scroll');
                    }
                }
            }
        });
    });
});
