// ===== PAGE NAVIGATION =====
let currentPage = 'home';

function navigateToPage(pageName) {
    // Get all pages and nav items
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');
    const bottomNav = document.getElementById('bottomNav');
    
    // Don't navigate if already on the page
    if (currentPage === pageName) return;
    
    // Hide current page
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show bottom nav when leaving home
    if (pageName !== 'home') {
        bottomNav.classList.remove('hide');
    } else {
        bottomNav.classList.add('hide');
    }
    
    // Show new page with animation
    setTimeout(() => {
        const targetPage = document.getElementById(pageName);
        targetPage.classList.add('active');
        
        // Scroll to top of new page
        targetPage.scrollTop = 0;
        
        // Update active nav item
        navItems.forEach(item => {
            if (item.getAttribute('data-page') === pageName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        currentPage = pageName;
    }, 100);
}

// ===== PROJECT TABS =====
let currentProjectTab = 'coding';

function switchProjectTab(tabName) {
    // Don't switch if already active
    if (currentProjectTab === tabName) return;
    
    // Update tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Hide current content
    const contents = document.querySelectorAll('.project-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Show new content
    setTimeout(() => {
        const targetContent = document.getElementById(tabName);
        targetContent.classList.add('active');
        currentProjectTab = tabName;
    }, 100);
}

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===== SCROLL TO TOP ON PAGE CHANGE =====
function scrollToTop() {
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        activePage.scrollTop = 0;
    }
}

// ===== HIDE NAV ON HOME =====
function checkHomePage() {
    const bottomNav = document.getElementById('bottomNav');
    if (currentPage === 'home') {
        bottomNav.classList.add('hide');
    }
}

// ===== GALLERY CLICK HANDLER =====
function handleGalleryClick(event) {
    const galleryItem = event.currentTarget;
    
    // Add a scale animation on click
    galleryItem.style.transform = 'scale(0.98)';
    setTimeout(() => {
        galleryItem.style.transform = '';
    }, 200);
    
    // You can add more functionality here, like opening a modal
    console.log('Gallery item clicked');
}

// ===== ADD CLICK LISTENERS TO GALLERY ITEMS =====
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item:not(.coming-soon)');
    galleryItems.forEach(item => {
        item.addEventListener('click', handleGalleryClick);
    });
}

// ===== KEYBOARD NAVIGATION =====
function handleKeyboardNavigation(event) {
    const pages = ['home', 'profile', 'skills', 'projects', 'certificates'];
    const currentIndex = pages.indexOf(currentPage);
    
    // Arrow keys navigation
    if (event.key === 'ArrowRight' && currentIndex < pages.length - 1) {
        navigateToPage(pages[currentIndex + 1]);
    } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
        navigateToPage(pages[currentIndex - 1]);
    }
}

// ===== SMOOTH SCROLL FOR PROFILE PAGE =====
function smoothScrollProfile() {
    const profilePage = document.getElementById('profile');
    if (profilePage) {
        profilePage.style.scrollBehavior = 'smooth';
    }
}

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    // Check if we should hide nav initially
    checkHomePage();
    
    // Initialize skill bar animations
    animateSkillBars();
    
    // Initialize gallery interactions
    initializeGallery();
    
    // Enable keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Smooth scroll for profile
    smoothScrollProfile();
    
    // Add loading animation complete
    document.body.classList.add('loaded');
    
    console.log('Portfolio initialized successfully!');
});

// ===== PREVENT SCROLL ON HOME PAGE =====
document.addEventListener('DOMContentLoaded', function() {
    const homePage = document.getElementById('home');
    
    homePage.addEventListener('wheel', function(e) {
        if (currentPage === 'home') {
            e.preventDefault();
        }
    }, { passive: false });
});

// ===== ADD CUSTOM CURSOR EFFECT (OPTIONAL) =====
function addCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .project-card, .gallery-item, .nav-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// ===== PAGE TRANSITION HELPER =====
function fadePageTransition(fromPage, toPage) {
    return new Promise((resolve) => {
        fromPage.style.opacity = '0';
        setTimeout(() => {
            fromPage.classList.remove('active');
            toPage.classList.add('active');
            setTimeout(() => {
                toPage.style.opacity = '1';
                resolve();
            }, 50);
        }, 300);
    });
}

// ===== PARALLAX EFFECT FOR PROFILE BACKGROUND =====
function initParallax() {
    const profilePage = document.getElementById('profile');
    const bgImage = document.querySelector('.bg-image');
    
    if (profilePage && bgImage) {
        profilePage.addEventListener('scroll', function() {
            const scrolled = profilePage.scrollTop;
            bgImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
    }
}

// Call parallax initialization
document.addEventListener('DOMContentLoaded', initParallax);

// ===== LAZY LOAD IMAGES =====
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== ANIMATE ON SCROLL =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .cert-card, .goal-card');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(element);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ===== EXPORT FUNCTIONS FOR EXTERNAL USE =====
window.portfolioFunctions = {
    navigateToPage,
    switchProjectTab,
    animateSkillBars,
    scrollToTop
};