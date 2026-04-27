document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // =========================================
    // LAZY LOAD VIDEO
    // =========================================
    const iframes = document.querySelectorAll('.portfolio-video iframe');

    iframes.forEach(frame => {
        const src = frame.getAttribute('src');
        if (src) {
            frame.dataset.src = src;
            frame.removeAttribute('src');
        }
    });

    const iframeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                iframe.setAttribute('src', iframe.dataset.src);
                iframeObserver.unobserve(iframe);
            }
        });
    }, { threshold: 0.2 });

    iframes.forEach(frame => iframeObserver.observe(frame));

    // =========================================
    // PRELOADER
    // =========================================
    const preloader = document.getElementById('preloader');
    
    function hidePreloader() {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }

    // Hide preloader after page loads (max 3 seconds)
    window.addEventListener('load', () => {
        setTimeout(hidePreloader, 300);
    });

    // fallback (if load event fails)
    setTimeout(hidePreloader, 2000);

    // =========================================
    // HEADER SCROLL EFFECT
    // =========================================
    const header = document.getElementById('header');
    
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    updateHeader();

    // =========================================
    // MOBILE MENU
    // =========================================
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu on link click
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // =========================================
    // HERO REVEAL ANIMATIONS
    // =========================================
    const revealTexts = document.querySelectorAll('.reveal-text');
    
    function revealHero() {
        revealTexts.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, 300 + (i * 200));
        });
    }
    
    setTimeout(revealHero, 500);

    // =========================================
    // SCROLL REVEAL (Intersection Observer)
    // =========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add scroll-reveal class to sections
    document.querySelectorAll('.section-header, .portfolio-item, .service-card, .testimonial-card, .about-content, .about-image-wrapper, .contact-info, .contact-form-wrapper, .stat-item').forEach(el => {
        el.classList.add('scroll-reveal');
        scrollObserver.observe(el);
    });

    // =========================================
    // PORTFOLIO FILTER
    // =========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.dataset.filter;

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.remove('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // =========================================
    // STATS COUNTER ANIMATION
    // =========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const el = entry.target;
                const target = parseInt(el.dataset.count);
                el.style.opacity = '0';
                el.style.transform = 'translateY(10px)';
                el.textContent = target;

                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    el.style.transition = '0.4s ease';
                }, 50);
                statsObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // =========================================
    // CONTACT FORM
    // =========================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = contactForm ? contactForm.querySelector('.btn-primary') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }

            // Simulate form submission
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }
                
                contactForm.style.opacity = '0';
                contactForm.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    if (formSuccess) {
                        formSuccess.classList.add('visible');
                    }
                }, 300);
            }, 1500);
        });
    }

    // =========================================
    // FLOATING ACTION BUTTON
    // =========================================
    const fab = document.getElementById('fab');
    
    if (fab) {
        const fabToggle = fab.querySelector('.fab-toggle');
        
        fabToggle.addEventListener('click', function() {
            fab.classList.toggle('active');
        });

        // Close FAB when clicking outside
        document.addEventListener('click', function(e) {
            if (!fab.contains(e.target)) {
                fab.classList.remove('active');
            }
        });
    }

    // =========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================
    // PHONE INPUT MASK
    // =========================================
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                
                let formatted = '+7';
                
                if (value.length > 0) {
                    formatted += ' (' + value.substring(0, 3);
                }
                if (value.length >= 3) {
                    formatted += ') ' + value.substring(3, 6);
                }
                if (value.length >= 6) {
                    formatted += '-' + value.substring(6, 8);
                }
                if (value.length >= 8) {
                    formatted += '-' + value.substring(8, 10);
                }
                
                e.target.value = formatted;
            }
        });
    }

    // =========================================
    // HIDE SCROLL-DOWN ON SCROLL
    // =========================================
    const scrollDown = document.querySelector('.scroll-down');
    
    if (scrollDown) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollDown.style.opacity = '0';
                scrollDown.style.pointerEvents = 'none';
            } else {
                scrollDown.style.opacity = '1';
                scrollDown.style.pointerEvents = 'auto';
            }
        });
    }
    // =========================================
    // THEME TOGGLE
    // =========================================
    const themeBtn = document.getElementById('themeToggle');

    if (!themeBtn) {
        const mobileThemeBtn = document.createElement('button');
        mobileThemeBtn.id = 'themeToggle';
        mobileThemeBtn.textContent = '🌙';
        mobileThemeBtn.style.position = 'fixed';
        mobileThemeBtn.style.top = '20px';
        mobileThemeBtn.style.right = '20px';
        mobileThemeBtn.style.zIndex = '999';
        mobileThemeBtn.style.background = '#fff';
        mobileThemeBtn.style.border = 'none';
        mobileThemeBtn.style.borderRadius = '50%';
        mobileThemeBtn.style.width = '40px';
        mobileThemeBtn.style.height = '40px';
        mobileThemeBtn.style.cursor = 'pointer';

        document.body.appendChild(mobileThemeBtn);
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
            document.body.classList.toggle('light');

            if (document.body.classList.contains('light')) {
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = '☀️';
            } else {
                localStorage.setItem('theme', 'dark');
                themeBtn.textContent = '🌙';
            }
        });
    }

    // LOAD SAVED THEME
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light');
        if (themeBtn) themeBtn.textContent = '☀️';
    } else {
        if (themeBtn) themeBtn.textContent = '🌙';
    }

    // =========================================
    // SCROLL TO TOP BUTTON
    // =========================================
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.id = 'scrollTopBtn';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '20px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.width = '44px';
    scrollTopBtn.style.height = '44px';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.background = '#fff';
    scrollTopBtn.style.color = '#000';
    scrollTopBtn.style.display = 'flex';
    scrollTopBtn.style.alignItems = 'center';
    scrollTopBtn.style.justifyContent = 'center';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.pointerEvents = 'none';
    scrollTopBtn.style.transition = '0.3s';
    scrollTopBtn.style.zIndex = '999';

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


});
