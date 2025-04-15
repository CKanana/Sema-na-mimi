document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
  });

  // Show cookie banner after a slight delay
  setTimeout(function() {
    document.querySelector('.cookie-banner').classList.add('show');
  }, 1500);

  // Handle cookie buttons
  document.getElementById('cookie-accept').addEventListener('click', function() {
    document.querySelector('.cookie-banner').classList.remove('show');
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