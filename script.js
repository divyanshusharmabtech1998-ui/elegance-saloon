// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all scroll fade in elements
document.querySelectorAll('.scroll-fade-in').forEach(el => {
  observer.observe(el);
});

// Form submission
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const button = form.querySelector('.form-submit');
  const originalText = button.textContent;
  
  // Show success animation
  button.textContent = '✓ Booking Confirmed!';
  button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
  
  setTimeout(() => {
    alert('Thank you for booking! We will contact you soon at the provided number.');
    form.reset();
    button.textContent = originalText;
    button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  }, 2000);
}

// Add animation to sections on load
window.addEventListener('load', () => {
  const sections = document.querySelectorAll('.section');
  sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.animation = `fadeInUp 0.8s ease-out ${0.2 + index * 0.1}s forwards`;
  });
});

// Parallax effect on hero
document.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrollY = window.scrollY;
  hero.style.backgroundPosition = `0% ${scrollY * 0.5}px`;
});

// Cursor glow effect (optional - commented out for performance)
// document.addEventListener('mousemove', (e) => {
//   const x = e.clientX;
//   const y = e.clientY;
//   document.documentElement.style.setProperty('--mouse-x', x + 'px');
//   document.documentElement.style.setProperty('--mouse-y', y + 'px');
// });
