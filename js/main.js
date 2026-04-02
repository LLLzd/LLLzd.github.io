document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeLightbox = document.getElementById('close-lightbox');
    const prevImage = document.getElementById('prev-image');
    const nextImage = document.getElementById('next-image');
    const workItems = document.querySelectorAll('.work-item');
    const exhibitionItems = document.querySelectorAll('.exhibition-item');
    const header = document.querySelector('header');
    
    let currentImages = [];
    let currentIndex = 0;

    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('bg-stone-900');
            header.classList.remove('bg-gradient-to-b', 'from-stone-900', 'to-transparent');
        } else {
            header.classList.remove('bg-stone-900');
            header.classList.add('bg-gradient-to-b', 'from-stone-900', 'to-transparent');
        }
    });

    const allImageItems = [...workItems, ...exhibitionItems];
    
    allImageItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const src = img.getAttribute('src');
            
            currentImages = Array.from(allImageItems).map(item => item.querySelector('img').getAttribute('src'));
            currentIndex = currentImages.indexOf(src);
            
            lightboxImage.src = src;
            lightbox.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    closeLightbox.addEventListener('click', closeLightboxHandler);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightboxHandler();
        }
    });

    function closeLightboxHandler() {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    prevImage.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        lightboxImage.src = currentImages[currentIndex];
    });

    nextImage.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentImages.length;
        lightboxImage.src = currentImages[currentIndex];
    });

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') {
                closeLightboxHandler();
            } else if (e.key === 'ArrowLeft') {
                currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
                lightboxImage.src = currentImages[currentIndex];
            } else if (e.key === 'ArrowRight') {
                currentIndex = (currentIndex + 1) % currentImages.length;
                lightboxImage.src = currentImages[currentIndex];
            }
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});