// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // User profile dropdown toggle
    const userAvatar = document.querySelector('.user-avatar');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (userAvatar && userDropdown) {
      userAvatar.addEventListener('click', function(event) {
        event.stopPropagation();
        userDropdown.classList.toggle('active');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function(event) {
        if (!event.target.closest('.user-menu')) {
          userDropdown.classList.remove('active');
        }
      });
    }
    
    // Progress circle animation
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    progressCircles.forEach(circle => {
      const progress = circle.getAttribute('data-progress');
      const circleElement = circle.querySelector('.circle');
      
      if (circleElement) {
        setTimeout(() => {
          circleElement.setAttribute('stroke-dasharray', `${progress}, 100`);
        }, 300);
      }
    });
    
    // Video player functionality for sign videos
    const playIcons = document.querySelectorAll('.play-icon');
    
    playIcons.forEach(icon => {
      icon.addEventListener('click', function() {
        const signVideo = this.closest('.sign-video');
        if (!signVideo) return;
        
        // Check if a video element already exists
        let video = signVideo.querySelector('video');
        
        if (!video) {
          // Create video element
          video = document.createElement('video');
          video.src = signVideo.querySelector('img').src.replace('/api/placeholder', '/videos'); // Assuming video path
          video.controls = true;
          video.autoplay = true;
          video.style.width = '100%';
          video.style.borderRadius = '8px';
          
          // Replace image with video
          signVideo.innerHTML = '';
          signVideo.appendChild(video);
          
          // Change icon to pause
          this.innerHTML = '<i class="fas fa-pause-circle"></i>';
          
          // Listen for video end
          video.addEventListener('ended', () => {
            // Restore image and play icon
            signVideo.innerHTML = `
              <img src="${video.src.replace('/videos', '/api/placeholder')}" alt="Sign video">
              <div class="play-icon"><i class="fas fa-play-circle"></i></div>
            `;
            
            // Mark sign-item as completed if active
            const signItem = signVideo.closest('.sign-item');
            if (signItem && signItem.classList.contains('active')) {
              signItem.classList.add('completed');
              updateChallengeProgress();
            }
          });
        } else {
          if (video.paused) {
            video.play();
            this.innerHTML = '<i class="fas fa-pause-circle"></i>';
          } else {
            video.pause();
            this.innerHTML = '<i class="fas fa-play-circle"></i>';
          }
        }
      });
    });
    
    // Function to update challenge progress
    function updateChallengeProgress() {
      const completedSigns = document.querySelectorAll('.sign-item.completed').length;
      const totalSigns = document.querySelectorAll('.sign-item').length;
      const progressText = document.querySelector('.challenge-action p');
      
      if (progressText) {
        progressText.textContent = `${completedSigns}/${totalSigns} Completed`;
        
        // If all completed, show celebration
        if (completedSigns === totalSigns) {
          showCelebration();
        }
      }
    }
    
    // Function to show celebration when challenge is completed
    function showCelebration() {
      // Create celebration element
      const celebration = document.createElement('div');
      celebration.className = 'celebration';
      celebration.innerHTML = `
        <div class="celebration-content">
          <h3>Challenge Completed! 🎉</h3>
          <p>You've earned 50 XP points!</p>
          <button class="btn btn-accent close-celebration">Continue</button>
        </div>
      `;
      
      // Style the celebration
      celebration.style.position = 'fixed';
      celebration.style.top = '0';
      celebration.style.left = '0';
      celebration.style.width = '100%';
      celebration.style.height = '100%';
      celebration.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      celebration.style.display = 'flex';
      celebration.style.justifyContent = 'center';
      celebration.style.alignItems = 'center';
      celebration.style.zIndex = '1000';
      celebration.style.opacity = '0';
      celebration.style.transition = 'opacity 0.3s ease';
      
      // Style the content
      const content = celebration.querySelector('.celebration-content');
      content.style.backgroundColor = 'var(--white)';
      content.style.borderRadius = 'var(--border-radius)';
      content.style.padding = '2rem';
      content.style.textAlign = 'center';
      content.style.maxWidth = '400px';
      content.style.transform = 'translateY(20px)';
      content.style.transition = 'transform 0.3s ease';
      
      // Add to DOM
      document.body.appendChild(celebration);
      
      // Trigger animation
      setTimeout(() => {
        celebration.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      }, 10);
      
      // Add close handler
      celebration.querySelector('.close-celebration').addEventListener('click', function() {
        celebration.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          celebration.remove();
          
          // Update XP counter
          const xpCounter = document.querySelector('.xp-number');
          if (xpCounter) {
            const currentXP = parseInt(xpCounter.textContent);
            xpCounter.textContent = currentXP + 50;
            
            // Show XP animation
            xpCounter.style.transform = 'scale(1.2)';
            xpCounter.style.color = 'var(--accent)';
            
            setTimeout(() => {
              xpCounter.style.transform = '';
              xpCounter.style.color = '';
            }, 1000);
          }
        }, 300);
      });
    }
    
    // SOS Button functionality
    const sosButton = document.querySelector('.sos-button');
    
    if (sosButton) {
      sosButton.addEventListener('click', function() {
        // Show SOS modal
        showSOSModal();
      });
    }
    
    // Function to show SOS modal
    function showSOSModal() {
      // Create modal element
      const modal = document.createElement('div');
      modal.className = 'sos-modal';
      modal.innerHTML = `
        <div class="sos-modal-content">
          <div class="sos-header">
            <h3>Silent SOS Activated</h3>
            <button class="close-modal">&times;</button>
          </div>
          <p>Emergency assistance has been notified. Stay calm.</p>
          <div class="sos-options">
            <button class="btn btn-primary sos-option">
              <i class="fas fa-phone"></i> Call Emergency
            </button>
            <button class="btn btn-outline sos-option">
              <i class="fas fa-comment"></i> Text Message
            </button>
            <button class="btn btn-accent sos-option">
              <i class="fas fa-video"></i> Video Interpreter
            </button>
          </div>
          <div class="sos-status">
            <div class="status-indicator pulsing"></div>
            <span>Help is on the way</span>
          </div>
        </div>
      `;
      
      // Style the modal
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      modal.style.display = 'flex';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      modal.style.zIndex = '1000';
      
      // Style the content
      const content = modal.querySelector('.sos-modal-content');
      content.style.backgroundColor = 'var(--white)';
      content.style.borderRadius = 'var(--border-radius)';
      content.style.padding = '1.5rem';
      content.style.width = '90%';
      content.style.maxWidth = '500px';
      
      // Style the header
      const header = modal.querySelector('.sos-header');
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.style.marginBottom = '1rem';
      header.style.color = 'var(--red)';
      
      // Style close button
      const closeBtn = modal.querySelector('.close-modal');
      closeBtn.style.background = 'none';
      closeBtn.style.border = 'none';
      closeBtn.style.fontSize = '1.5rem';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.color = 'var(--dark)';
      
      // Style options
      const options = modal.querySelector('.sos-options');
      options.style.display = 'flex';
      options.style.flexDirection = 'column';
      options.style.gap = '1rem';
      options.style.margin = '1.5rem 0';
      
      // Style status
      const status = modal.querySelector('.sos-status');
      status.style.display = 'flex';
      status.style.alignItems = 'center';
      status.style.gap = '0.5rem';
      status.style.justifyContent = 'center';
      status.style.marginTop = '1rem';
      
      // Style indicator
      const indicator = modal.querySelector('.status-indicator');
      indicator.style.width = '12px';
      indicator.style.height = '12px';
      indicator.style.borderRadius = '50%';
      indicator.style.backgroundColor = 'var(--red)';
      indicator.style.animation = 'pulse 1s infinite';
      
      // Add keyframes for pulsing
      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
      
      // Add to DOM
      document.body.appendChild(modal);
      
      // Add close handler
      closeBtn.addEventListener('click', function() {
        modal.remove();
      });
      
      // Add option handlers
      const sosOptions = modal.querySelectorAll('.sos-option');
      sosOptions.forEach(option => {
        option.addEventListener('click', function() {
          alert('This feature would connect to emergency services or interpreters in a real application.');
        });
      });
    }
    
    // Search functionality for dictionary
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
      searchBtn.addEventListener('click', function() {
        searchDictionary(searchInput.value);
      });
      
      searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
          searchDictionary(searchInput.value);
        }
      });
    }
    
    // Function to simulate dictionary search
    function searchDictionary(term) {
      if (!term.trim()) return;
      
      // Create and show search result modal
      const modal = document.createElement('div');
      modal.className = 'search-modal';
      modal.innerHTML = `
        <div class="search-modal-content">
          <div class="search-header">
            <h3>Search Results for "${term}"</h3>
            <button class="close-modal">&times;</button>
          </div>
          <div class="search-results">
            <div class="search-loader">
              <div class="loader-spinner"></div>
              <p>Searching the KSL dictionary...</p>
            </div>
          </div>
        </div>
      `;
      
      // Style the modal
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      modal.style.display = 'flex';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      modal.style.zIndex = '1000';
      
      // Style the content
      const content = modal.querySelector('.search-modal-content');
      content.style.backgroundColor = 'var(--white)';
      content.style.borderRadius = 'var(--border-radius)';
      content.style.padding = '1.5rem';
      content.style.width = '90%';
      content.style.maxWidth = '600px';
      
      // Style the header
      const header = modal.querySelector('.search-header');
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.style.marginBottom = '1.5rem';
      
      // Style close button
      const closeBtn = modal.querySelector('.close-modal');
      closeBtn.style.background = 'none';
      closeBtn.style.border = 'none';
      closeBtn.style.fontSize = '1.5rem';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.color = 'var(--dark)';
      
      // Style loader
      const loader = modal.querySelector('.search-loader');
      loader.style.display = 'flex';
      loader.style.flexDirection = 'column';
      loader.style.alignItems = 'center';
      loader.style.gap = '1rem';
      loader.style.padding = '2rem';
      
      const spinner = modal.querySelector('.loader-spinner');
      spinner.style.width = '40px';
      spinner.style.height = '40px';
      spinner.style.border = '4px solid rgba(0, 0, 0, 0.1)';
      spinner.style.borderRadius = '50%';
      spinner.style.borderTop = '4px solid var(--primary)';
      spinner.style.animation = 'spin 1s linear infinite';
      
      // Add keyframes for spinner
      const style = document.createElement('style');
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
      
      // Add to DOM
      document.body.appendChild(modal);
      
      // Add close handler
      closeBtn.addEventListener('click', function() {
        modal.remove();
      });
      
      // Simulate search results after delay
      setTimeout(() => {
        const resultsContainer = modal.querySelector('.search-results');
        resultsContainer.innerHTML = `
          <div class="sign-result">
            <div class="sign-video-large">
              <img src="/api/placeholder/250/200" alt="Sign for ${term}">
              <div class="play-icon play-large"><i class="fas fa-play-circle"></i></div>
            </div>
            <div class="sign-info">
              <h3>${term}</h3>
              <p class="sign-definition">The KSL sign for "${term}" involves [simulated description]</p>
              <div class="sign-actions">
                <button class="btn btn-small btn-primary">Add to Saved</button>
                <button class="btn btn-small btn-outline">Practice this Sign</button>
              </div>
              <div class="sign-related">
                <h4>Related Signs:</h4>
                <div class="related-signs">
                  <span class="related-tag">Similar Word 1</span>
                  <span class="related-tag">Similar Word 2</span>
                  <span class="related-tag">Similar Word 3</span>
                </div>
              </div>
            </div>
          </div>
        `;
        
        // Style the results
        const signResult = resultsContainer.querySelector('.sign-result');
        signResult.style.display = 'flex';
        signResult.style.gap = '1.5rem';
        signResult.style.flexWrap = 'wrap';
        
        const signVideo = resultsContainer.querySelector('.sign-video-large');
        signVideo.style.position = 'relative';
        signVideo.style.borderRadius = '8px';
        signVideo.style.overflow = 'hidden';
        signVideo.style.maxWidth = '250px';
        
        const playLarge = resultsContainer.querySelector('.play-large');
        playLarge.style.position = 'absolute';
        playLarge.style.top = '50%';
        playLarge.style.left = '50%';
        playLarge.style.transform = 'translate(-50%, -50%)';
        playLarge.style.color = 'var(--white)';
        playLarge.style.fontSize = '3rem';
        playLarge.style.cursor = 'pointer';
        
        const signInfo = resultsContainer.querySelector('.sign-info');
        signInfo.style.flex = '1';
        signInfo.style.minWidth = '250px';
        
        const signActions = resultsContainer.querySelector('.sign-actions');
        signActions.style.display = 'flex';
        signActions.style.gap = '0.5rem';
        signActions.style.margin = '1rem 0';
        
        const signRelated = resultsContainer.querySelector('.sign-related');
        signRelated.style.marginTop = '1rem';
        
        const relatedSigns = resultsContainer.querySelector('.related-signs');
        relatedSigns.style.display = 'flex';
        relatedSigns.style.flexWrap = 'wrap';
        relatedSigns.style.gap = '0.5rem';
        relatedSigns.style.marginTop = '0.5rem';
        
        const relatedTags = resultsContainer.querySelectorAll('.related-tag');
        relatedTags.forEach(tag => {
          tag.style.backgroundColor = 'var(--light-alt)';
          tag.style.padding = '0.3rem 0.8rem';
          tag.style.borderRadius = '20px';
          tag.style.fontSize = '0.9rem';
          tag.style.cursor = 'pointer';
        });
        
        // Add the search term to recent searches
        addToRecentSearches(term);
        
        // Add play functionality
        const playIcon = resultsContainer.querySelector('.play-icon');
        playIcon.addEventListener('click', function() {
          if (this.innerHTML.includes('play')) {
            this.innerHTML = '<i class="fas fa-pause-circle"></i>';
            setTimeout(() => {
              this.innerHTML = '<i class="fas fa-play-circle"></i>';
            }, 3000);
          } else {
            this.innerHTML = '<i class="fas fa-play-circle"></i>';
          }
        });
      }, 1500);
    }
    
    // Function to add term to recent searches
    function addToRecentSearches(term) {
      const recentSigns = document.querySelector('.recent-signs');
      if (!recentSigns) return;
      
      // Create new chip
      const newChip = document.createElement('div');
      newChip.className = 'sign-chip';
      newChip.innerHTML = `
        <span>${term}</span>
        <img src="/api/placeholder/30/30" alt="${term} sign">
      `;
      
      // Add to beginning and limit to 4
      recentSigns.prepend(newChip);
      
      const allChips = recentSigns.querySelectorAll('.sign-chip');
      if (allChips.length > 4) {
        allChips[allChips.length - 1].remove();
      }
      
      // Add click event
      newChip.addEventListener('click', function() {
        searchDictionary(term);
      });
    }
    
    // Initialize category clicks
    const categories = document.querySelectorAll('.category-item');
    categories.forEach(category => {
      category.addEventListener('click', function() {
        const categoryName = this.querySelector('span').textContent;
        alert(`You clicked on the ${categoryName} category. This would show all signs in this category.`);
      });
    });
    
    // Countdown timer for daily challenge
    const dailyReset = document.querySelector('.daily-reset');
    if (dailyReset) {
      let hours = 8;
      let minutes = 24;
      let seconds = 0;
      
      const resetInterval = setInterval(() => {
        seconds--;
        
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        
        if (hours < 0) {
          clearInterval(resetInterval);
          dailyReset.textContent = "Challenge has reset!";
          setTimeout(() => {
            location.reload();
          }, 2000);
          return;
        }
        
        dailyReset.textContent = `Resets in: ${hours}h ${minutes}m ${seconds}s`;
      }, 1000);
    }
    
    // Initialize community post actions
    const postButtons = document.querySelectorAll('.post-actions button');
    postButtons.forEach(button => {
      button.addEventListener('click', function() {
        const icon = this.querySelector('i');
        const countElem = this.textContent.trim().split(' ')[1];
        let count = parseInt(countElem);
        
        if (icon.classList.contains('fa-heart')) {
          if (this.classList.contains('liked')) {
            count--;
            this.innerHTML = `<i class="fas fa-heart"></i> ${count}`;
            this.classList.remove('liked');
            this.style.fontWeight = 'normal';
          } else {
            count++;
            this.innerHTML = `<i class="fas fa-heart"></i> ${count}`;
            this.classList.add('liked');
            this.style.fontWeight = 'bold';
            this.style.color = '#e74c3c';
          }
        } else if (icon.classList.contains('fa-comment')) {
          const commentText = prompt('Add a comment:');
          if (commentText && commentText.trim()) {
            alert('Comment added! In a full application, this would be displayed in the thread.');
          }
        }
      });
    });
  });