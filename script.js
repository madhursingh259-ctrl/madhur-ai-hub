/**
 * ============================================================================
 * JAVASCRIPT: Madhur AI Hub
 * Complete, Modular, Clean Vanilla JavaScript
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
   * 1. Dynamic Typing Effect (Hero Section)
   * -------------------------------------------------------------------------- */
  const typingElement = document.getElementById('typingText');
  const roles = [
    'BSc Student 🎓',
    'AI & Tech Explorer 🤖',
    'Problem Solver 💡',
    'Continuous Learner 📚'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingDelay = 90;
  const erasingDelay = 50;
  const nextRoleDelay = 1800;

  function typeEffect() {
    if (!typingElement) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = nextRoleDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }

    setTimeout(typeEffect, delay);
  }

  if (typingElement) {
    setTimeout(typeEffect, 400);
  }


  /* --------------------------------------------------------------------------
   * 2. Mobile Navigation Toggle & Auto-Close
   * -------------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when clicking on any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu on Escape key press
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }


  /* --------------------------------------------------------------------------
   * 3. Light / Dark Theme Switcher with LocalStorage
   * -------------------------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (!icon) return;

    if (theme === 'light') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }


  /* --------------------------------------------------------------------------
   * 4. Active Navigation Link on Scroll (ScrollSpy across all sections)
   * -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (correspondingLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          correspondingLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();


  /* --------------------------------------------------------------------------
   * 5. Interactive Contact Form with Validation & Feedback
   * -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      let isValid = true;

      // Validation 1: Name
      if (name.length < 2) {
        showError('nameError', 'Please enter your name (at least 2 characters).');
        isValid = false;
      }

      // Validation 2: Email format regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showError('emailError', 'Please enter a valid email address.');
        isValid = false;
      }

      // Validation 3: Subject
      if (subject.length < 3) {
        showError('subjectError', 'Please enter a subject (minimum 3 characters).');
        isValid = false;
      }

      // Validation 4: Message
      if (message.length < 10) {
        showError('messageError', 'Please write a message with at least 10 characters.');
        isValid = false;
      }

      // Success simulation
      if (isValid) {
        const submitBtn = document.getElementById('submitBtn');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;

          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            🎉 <strong>Thank you, ${escapeHTML(name)}!</strong> Your message has been received. 
            I'll get back to you at <em>${escapeHTML(email)}</em> soon!
          `;

          contactForm.reset();

          setTimeout(() => {
            if (formStatus) formStatus.style.display = 'none';
          }, 7000);
        }, 800);
      }
    });
  }

  function showError(elementId, message) {
    const errorElem = document.getElementById(elementId);
    if (errorElem) {
      errorElem.textContent = message;
    }
  }

  function clearErrors() {
    const errors = document.querySelectorAll('.form-error');
    errors.forEach(err => err.textContent = '');
    if (formStatus) {
      formStatus.style.display = 'none';
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }


  /* --------------------------------------------------------------------------
   * 6. Dynamic Year in Footer
   * -------------------------------------------------------------------------- */
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});
