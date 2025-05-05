document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
  });

  // Show cookie banner after a slight delay
  setTimeout(function() {
    const cookieBanner = document.querySelector('.cookie-banner');
    cookieBanner.classList.add('show');
    cookieBanner.setAttribute('role', 'region');
    cookieBanner.setAttribute('aria-live', 'polite');
  }, 1500);

  // Handle cookie buttons
  document.getElementById('cookie-accept').addEventListener('click', function() {
    const cookieBanner = document.querySelector('.cookie-banner');
    cookieBanner.classList.remove('show');
    cookieBanner.setAttribute('aria-live', 'off');
  });

  document.getElementById('cookie-settings').addEventListener('click', function() {
    alert('Cookie settings would open here');
  });

  // Back to top button visibility
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      document.querySelector('.back-to-top').classList.add('visible');
    } else {
      document.querySelector('.back-to-top').classList.remove('visible');
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,

          behavior: 'smooth'
        });
      }
    });
  });

  // Modal functionality for login and signup
  const openLoginBtn = document.getElementById('open-login');
  const openSignupBtn = document.getElementById('open-signup');
  const loginModal = document.getElementById('login-modal');
  const signupModal = document.getElementById('signup-modal');
  const modalCloses = document.querySelectorAll('.modal-close');

  function openModal(modal) {
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    modal.querySelector('input, button, textarea, select').focus();
  }

  function closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore scroll
  }

  openLoginBtn.addEventListener('click', () => openModal(loginModal));
  openSignupBtn.addEventListener('click', () => openModal(signupModal));

  modalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal');
      closeModal(modal);
    });
  });

  // Close modal on clicking outside modal content
  [loginModal, signupModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close modal on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [loginModal, signupModal].forEach(modal => {
        if (modal.getAttribute('aria-hidden') === 'false') {
          closeModal(modal);
        }
      });
    }
  });

  // Password toggle for login
  const toggleLoginPassword = document.getElementById('toggleLoginPassword');
  const loginPasswordInput = document.getElementById('login-password');
  toggleLoginPassword.addEventListener('click', () => {
    const type = loginPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPasswordInput.setAttribute('type', type);
    toggleLoginPassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
  });

  // Password toggles for signup
  const togglePassword = document.getElementById('togglePassword');
  const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
  const signupPasswordInput = document.getElementById('password');
  const signupConfirmPasswordInput = document.getElementById('confirm-password');

  function setupPasswordToggle(toggleElement, inputElement) {
    toggleElement.addEventListener('click', () => {
      const type = inputElement.getAttribute('type') === 'password' ? 'text' : 'password';
      inputElement.setAttribute('type', type);
      toggleElement.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });
  }

  setupPasswordToggle(togglePassword, signupPasswordInput);
  setupPasswordToggle(toggleConfirmPassword, signupConfirmPasswordInput);

  // Login form submission handling
  const loginForm = document.getElementById('login-form');
  const loginMessageArea = document.getElementById('login-message-area');
  const loginUsernameInput = document.getElementById('login-username');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    loginMessageArea.textContent = '';
    loginMessageArea.className = '';
    loginMessageArea.style.display = 'none';

    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value;

    let errors = [];
    if (!username) {
      errors.push('Username or Email is required.');
      loginUsernameInput.classList.add('error-input');
    } else {
      loginUsernameInput.classList.remove('error-input');
    }
    if (!password) {
      errors.push('Password is required.');
      loginPasswordInput.classList.add('error-input');
    } else {
      loginPasswordInput.classList.remove('error-input');
    }

    if (errors.length > 0) {
      loginMessageArea.textContent = errors[0];
      loginMessageArea.className = 'error';
      loginMessageArea.style.display = 'block';
      const firstErrorInput = loginForm.querySelector('.error-input');
      if (firstErrorInput) firstErrorInput.focus();
    } else {
      loginMessageArea.textContent = 'Login successful! Redirecting...';
      loginMessageArea.className = 'success';
      loginMessageArea.style.display = 'block';
      const submitButton = loginForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = 'Logging in...';
      setTimeout(() => {
        // Simulate redirect or reset
        console.log('Simulated login complete.');
      }, 2000);
    }
  });

  // Signup form submission handling
  const signupForm = document.getElementById('signup-form');
  const signupMessageArea = document.getElementById('signup-message-area');
  const fullnameInput = document.getElementById('fullname');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = signupPasswordInput;
  const confirmPasswordInput = signupConfirmPasswordInput;
  const termsCheckbox = document.getElementById('terms');

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    signupMessageArea.textContent = '';
    signupMessageArea.className = '';
    signupMessageArea.style.display = 'none';

    let errors = [];

    if (!fullnameInput.value.trim()) {
      errors.push('Full Name is required.');
      fullnameInput.classList.add('error-input');
    } else {
      fullnameInput.classList.remove('error-input');
    }

    if (!usernameInput.value.trim()) {
      errors.push('Username is required.');
      usernameInput.classList.add('error-input');
    } else if (/\s/.test(usernameInput.value)) {
      errors.push('Username cannot contain spaces.');
      usernameInput.classList.add('error-input');
    } else {
      usernameInput.classList.remove('error-input');
    }

    if (!emailInput.value.trim()) {
      errors.push('Email is required.');
      emailInput.classList.add('error-input');
    } else if (!validateEmail(emailInput.value)) {
      errors.push('Please enter a valid email address.');
      emailInput.classList.add('error-input');
    } else {
      emailInput.classList.remove('error-input');
    }

    if (!passwordInput.value) {
      errors.push('Password is required.');
      passwordInput.classList.add('error-input');
    } else if (passwordInput.value.length < 8) {
      errors.push('Password must be at least 8 characters long.');
      passwordInput.classList.add('error-input');
    } else {
      passwordInput.classList.remove('error-input');
    }

    if (!confirmPasswordInput.value) {
      errors.push('Please confirm your password.');
      confirmPasswordInput.classList.add('error-input');
    } else if (passwordInput.value !== confirmPasswordInput.value) {
      errors.push('Passwords do not match.');
      passwordInput.classList.add('error-input');
      confirmPasswordInput.classList.add('error-input');
    } else {
      confirmPasswordInput.classList.remove('error-input');
    }

    if (!termsCheckbox.checked) {
      errors.push('You must agree to the Terms and Privacy Policy.');
    }

    if (errors.length > 0) {
      signupMessageArea.textContent = errors[0];
      signupMessageArea.className = 'error';
      signupMessageArea.style.display = 'block';
      const firstErrorInput = signupForm.querySelector('.error-input');
      if (firstErrorInput) firstErrorInput.focus();
    } else {
      signupMessageArea.textContent = 'Signup successful! Welcome to Sema na Mimi.';
      signupMessageArea.className = 'success';
      signupMessageArea.style.display = 'block';
      const submitButton = signupForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = 'Signing Up...';
      setTimeout(() => {
        // Simulate redirect or reset
        console.log('Simulated signup complete.');
      }, 2000);
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('cookie-consent-banner');
    const acceptButton = document.getElementById('cookie-accept');
    // const rejectButton = document.getElementById('cookie-reject'); // Uncomment if using reject
  
    const COOKIE_CONSENT_KEY = 'semaNaMimiCookieConsent';
  
    // Check if consent has already been given
    if (!localStorage.getItem(COOKIE_CONSENT_KEY)) {
      banner.style.display = 'flex'; // Show the banner if no consent stored
    }
  
    // Handle Accept button click
    acceptButton.addEventListener('click', () => {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted'); // Store consent
      banner.style.display = 'none'; // Hide banner
      // You might want to initialize analytics or other cookie-dependent scripts here
      console.log('Cookie consent accepted.');
    });
  
    // Optional: Handle Reject button click
    /*
    if (rejectButton) {
      rejectButton.addEventListener('click', () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected'); // Store rejection
        banner.style.display = 'none'; // Hide banner
        // Disable non-essential cookies/scripts here if applicable
        console.log('Cookie consent rejected.');
      });
    }
    */
  
    // --- Add other script.js functionality below ---
    // e.g., Testimonial slider, back-to-top button logic, etc.
  
  }); // End DOMContentLoaded
  
