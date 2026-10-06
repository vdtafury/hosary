/**
 * Mohamed Ahmed — Portfolio Client Runtime
 * Features:
 * - Accessible Modal Dialog (WAI-ARIA Focus Trap & Escape handling)
 * - Accessible Mobile Navigation Drawer
 * - 1-Click Clipboard Copy Utility with Toast Feedback
 * - Client-Side Constraint Validation & Form Dispatch
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // 1. Toast Notification Manager
  // ---------------------------------------------------------------------------
  const toastBox = document.getElementById('toastBox');

  function showToast(message, duration = 2600) {
    if (!toastBox) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastBox.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'opacity 0.2s, transform 0.2s';
      setTimeout(() => toast.remove(), 200);
    }, duration);
  }

  // ---------------------------------------------------------------------------
  // 2. Clipboard Copy Utility
  // ---------------------------------------------------------------------------
  document.querySelectorAll('.copy-btn[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const textToCopy = button.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          // Fallback for non-https or older browsers
          const tempInput = document.createElement('textarea');
          tempInput.value = textToCopy;
          tempInput.style.position = 'fixed';
          tempInput.style.opacity = '0';
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          tempInput.remove();
        }
        showToast(`Copied to clipboard: ${textToCopy}`);
      } catch (err) {
        showToast('Unable to copy automatically. Please select text manually.');
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Accessible Modal Dialog (CV Preview)
  // ---------------------------------------------------------------------------
  const cvModal = document.getElementById('cvModal');
  const openCvBtn = document.getElementById('openCvBtn');
  const closeCvBtn = document.getElementById('closeCvBtn');
  const modalScrim = document.getElementById('modalScrim');
  let lastFocusedElement = null;

  function openCvModal(trigger) {
    if (!cvModal) return;
    lastFocusedElement = trigger || document.activeElement;
    cvModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    // Focus on close button or first interactive element
    if (closeCvBtn) {
      closeCvBtn.focus();
    }
  }

  function closeCvModal() {
    if (!cvModal || cvModal.hasAttribute('hidden')) return;
    cvModal.setAttribute('hidden', '');
    document.body.style.overflow = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  if (openCvBtn) {
    openCvBtn.addEventListener('click', () => openCvModal(openCvBtn));
  }
  if (closeCvBtn) {
    closeCvBtn.addEventListener('click', closeCvModal);
  }
  if (modalScrim) {
    modalScrim.addEventListener('click', closeCvModal);
  }

  // Focus trap inside modal
  if (cvModal) {
    cvModal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCvModal();
        return;
      }

      if (e.key === 'Tab') {
        const focusable = cvModal.querySelectorAll('a[href], button:not([disabled])');
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 4. Mobile Navigation Drawer
  // ---------------------------------------------------------------------------
  const burgerBtn = document.getElementById('burgerBtn');
  const mainNav = document.getElementById('mainNav');

  function setMobileMenu(isOpen) {
    if (!mainNav || !burgerBtn) return;
    mainNav.classList.toggle('open', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
    burgerBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  }

  if (burgerBtn && mainNav) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.contains('open');
      setMobileMenu(!isOpen);
    });

    // Close when clicking nav items
    mainNav.querySelectorAll('.nav-item').forEach((link) => {
      link.addEventListener('click', () => setMobileMenu(false));
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !burgerBtn.contains(e.target)) {
        setMobileMenu(false);
      }
    });

    // Close on Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        setMobileMenu(false);
        burgerBtn.focus();
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 5. Contact Form Validation & Dispatch
  // ---------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('userName');
  const emailInput = document.getElementById('userEmail');
  const messageInput = document.getElementById('userMessage');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formFeedback = document.getElementById('formFeedback');

  function clearError(errorEl) {
    if (errorEl) errorEl.textContent = '';
  }

  if (nameInput) nameInput.addEventListener('input', () => clearError(nameError));
  if (emailInput) emailInput.addEventListener('input', () => clearError(emailError));
  if (messageInput) messageInput.addEventListener('input', () => clearError(messageError));

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name) {
        if (nameError) nameError.textContent = 'Please provide your name.';
        hasError = true;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        if (emailError) emailError.textContent = 'Please enter a valid email address.';
        hasError = true;
      }

      if (!message || message.length < 10) {
        if (messageError) messageError.textContent = 'Please enter a message with at least 10 characters.';
        hasError = true;
      }

      if (hasError) return;

      // Compose mailto
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\nSender: ${name}\nContact: ${email}`);
      const mailtoUrl = `mailto:mohosary123@gmail.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;

      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.textContent = 'Redirecting to your email client to dispatch the message...';
      }

      setTimeout(() => {
        if (formFeedback) {
          formFeedback.textContent = '';
          formFeedback.className = 'form-feedback';
        }
        contactForm.reset();
      }, 5000);
    });
  }

  // ---------------------------------------------------------------------------
  // 6. Dynamic Year in Footer
  // ---------------------------------------------------------------------------
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

})();
