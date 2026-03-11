// ===== DOM Ready =====
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initStats();
  initForms();
});

// ===== Navbar =====
function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.querySelector('.navbar');

  // Hamburger toggle
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// ===== Stats Counter Animation =====
function initStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'));
          const suffix = stat.getAttribute('data-suffix') || '';
          animateCounter(stat, target, suffix);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

function animateCounter(element, target, suffix) {
  let current = 0;
  const increment = target / 60;
  const duration = 2000;
  const stepTime = duration / 60;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString('tr-TR') + suffix;
  }, stepTime);
}

// ===== Form Handling =====
function initForms() {
  // Talep formu
  const talepForm = document.getElementById('talepForm');
  if (talepForm) {
    talepForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(talepForm)) {
        showSuccess('talepSuccess');
        talepForm.reset();
      }
    });
  }

  // İletişim formu
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (validateForm(contactForm)) {
        showSuccess('contactSuccess');
        contactForm.reset();
      }
    });
  }

  // Clear error on input
  document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorMsg = input.parentElement.querySelector('.error-message');
      if (errorMsg) errorMsg.style.display = 'none';
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(field => {
    const errorMsg = field.parentElement.querySelector('.error-message');

    if (!field.value.trim()) {
      field.classList.add('error');
      if (errorMsg) {
        errorMsg.textContent = 'Bu alan zorunludur.';
        errorMsg.style.display = 'block';
      }
      isValid = false;
    } else if (field.type === 'email' && !isValidEmail(field.value)) {
      field.classList.add('error');
      if (errorMsg) {
        errorMsg.textContent = 'Geçerli bir e-posta adresi giriniz.';
        errorMsg.style.display = 'block';
      }
      isValid = false;
    } else if (field.type === 'tel' && !isValidPhone(field.value)) {
      field.classList.add('error');
      if (errorMsg) {
        errorMsg.textContent = 'Geçerli bir telefon numarası giriniz.';
        errorMsg.style.display = 'block';
      }
      isValid = false;
    } else {
      field.classList.remove('error');
      if (errorMsg) errorMsg.style.display = 'none';
    }
  });

  return isValid;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^[0-9\s\-\+\(\)]{10,15}$/.test(phone.trim());
}

function showSuccess(id) {
  const successDiv = document.getElementById(id);
  const form = successDiv.previousElementSibling || successDiv.closest('.form-section').querySelector('form');
  if (successDiv) {
    successDiv.style.display = 'block';
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      successDiv.style.display = 'none';
    }, 5000);
  }
}
