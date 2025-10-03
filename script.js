// DOM Elements
const header = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const navLinksItems = document.querySelectorAll('.nav-links li');
// const themeToggle, moonIcon, sunIcon dihapus

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('header-scroll');
  } else {
    header.classList.remove('header-scroll');
  }
});

// Mobile Navigation
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('nav-active');
  hamburger.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

// Close mobile menu on link click
navLinksItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('nav-active');
    hamburger.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });
});

// Theme toggle logic (dihapus)

// Load sections animation on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Animate sections on scroll
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-animate');
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(sec => observer.observe(sec));
});

// Smooth scroll (Menangani <a> dengan href dan <button> dengan data-target)
document.querySelectorAll('a[href^="#"], button[data-target^="#"]').forEach(element => {
  element.addEventListener('click', function (e) {
    // Cek apakah ini adalah tombol "View Certificate" (berkas eksternal), jika ya, biarkan default action (membuka link)
    // Tautan Sertifikasi menggunakan <a>, jadi biarkan mereka membuka link baru (jika href bukan '#')
    if (this.tagName === 'A' && this.getAttribute('href') !== '#' && this.getAttribute('target') === '_blank') {
        return; 
    }
    
    e.preventDefault();
    
    // Tentukan target, apakah dari href (untuk a) atau data-target (untuk button)
    const targetId = this.getAttribute('href') || this.getAttribute('data-target');
    
    if (targetId && targetId !== '#') {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Scroll ke elemen target dengan offset untuk navbar tetap (fixed)
        window.scrollTo({ top: targetElement.offsetTop - 70, behavior: 'smooth' });
      }
    }
    
    // Khusus untuk menu mobile, tutup menu setelah klik
    if (navLinks.classList.contains('nav-active')) {
        navLinks.classList.remove('nav-active');
        hamburger.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
  });
});
