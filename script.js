/* =========================================
   Custom Cursor
========================================= */
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, input, textarea');

// Initial cursor coordinates
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

// Setup a render loop for smoother follower movement
function renderCursor() {
    followerX += (cursorX - followerX) * 0.15;
    followerY += (cursorY - followerY) * 0.15;
    
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(renderCursor);
}
renderCursor();

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    // Update follower visibility if needed
    if(cursor.style.display === 'none') {
        cursor.style.display = 'block';
        follower.style.display = 'block';
    }
});

document.addEventListener('mouseout', () => {
    cursor.style.display = 'none';
    follower.style.display = 'none';
});

// Cursor active states
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        follower.classList.add('active');
    });
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        follower.classList.remove('active');
    });
});

/* =========================================
   Navigation Menu & Sticky Header
========================================= */
const navbar = document.querySelector('.navbar');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

// Sticky Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('active');
    
    // Disable text selection & scrolling when menu is open on mobile
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close Mobile Menu on Link Click
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        menuBtn.classList.remove('open');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

/* =========================================
   Active Link Highlighting on Scroll
========================================= */
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Offset for the navbar height
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* =========================================
   Typing Effect
========================================= */
const typedTextElement = document.querySelector('.typed');
const textArray = ["Embedded Developer", "C/C++ Expert", "BSP Engineer", "Tech Enthusiast"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typingSpeed = 100;
    
    if (isDeleting) {
        typingSpeed /= 2;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typingSpeed = 500; // Pause before next string
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
if (typedTextElement) {
    setTimeout(typeEffect, 1000);
}

/* =========================================
   Back to Top Button
========================================= */
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

/* =========================================
   Set Current Year in Footer
========================================= */
document.getElementById('current-year').textContent = new Date().getFullYear();

/* =========================================
   Form Submission (Prevent Default for now)
========================================= */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="bx bx-loader bx-spin"></i> Sending...';
        btn.disabled = true;
        
        // Simulate sending
        setTimeout(() => {
            btn.innerHTML = 'Message Sent <i class="bx bx-check"></i>';
            btn.style.background = '#10b981'; // Success Green
            btn.style.borderColor = '#10b981';
            
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    });
}
