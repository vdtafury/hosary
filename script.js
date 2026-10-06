/* ==========================================================================
   Mohamed Ahmed — Minimalist Portfolio Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. CV Modal Handling
  const cvModal = document.getElementById('cvModal');
  const openCvBtn = document.getElementById('openCvBtn');
  const heroCvBtn = document.getElementById('heroCvBtn');
  const closeCvBtn = document.getElementById('closeCvBtn');

  function openModal() {
    if (cvModal) {
      cvModal.classList.add('active');
      cvModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (cvModal) {
      cvModal.classList.remove('active');
      cvModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (openCvBtn) openCvBtn.addEventListener('click', openModal);
  if (heroCvBtn) heroCvBtn.addEventListener('click', openModal);
  if (closeCvBtn) closeCvBtn.addEventListener('click', closeModal);

  // Close modal when clicking on backdrop
  if (cvModal) {
    cvModal.addEventListener('click', (e) => {
      if (e.target === cvModal) closeModal();
    });
  }

  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal && cvModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 3. Mobile Navigation Drawer
  const burger = document.getElementById('burger');
  const navMenu = document.getElementById('navMenu');

  if (burger && navMenu) {
    burger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }

  // 4. Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        if (formFeedback) {
          formFeedback.textContent = 'Please fill out all fields.';
          formFeedback.style.color = '#ef4444';
        }
        return;
      }

      // Generate mailto link
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
      window.location.href = `mailto:mohosary123@gmail.com?subject=${subject}&body=${body}`;

      if (formFeedback) {
        formFeedback.textContent = 'Opening your email client...';
        formFeedback.style.color = '#10b981';
      }

      setTimeout(() => {
        if (formFeedback) formFeedback.textContent = '';
        contactForm.reset();
      }, 4000);
    });
  }
});
