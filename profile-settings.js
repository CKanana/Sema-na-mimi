// c:\Users\Crystal Kanana\Desktop\Sema na mimi\Sema-na-mimi\profile-settings.js
document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profile-settings-form');
    const messageArea = document.getElementById('settings-message-area');

    // --- Simulate loading user data ---
    function loadUserData() {
        // In a real app, you'd fetch this from a server
        const mockUserData = {
            fullName: "Aisha Wanjala",
            username: "aishaksl",
            email: "aisha.wanjala@example.com",
            profilePicUrl: "https://via.placeholder.com/150/7e0a98/FFFFFF?Text=AW", // Example
            dailyGoal: "20",
            emailNotificationsLessons: true,
            emailNotificationsProgress: false
        };

        document.getElementById('full-name').value = mockUserData.fullName;
        document.getElementById('username').value = mockUserData.username;
        document.getElementById('email').value = mockUserData.email;
        if (mockUserData.profilePicUrl) {
            document.getElementById('profile-pic-preview').src = mockUserData.profilePicUrl;
        }
        document.getElementById('daily-goal').value = mockUserData.dailyGoal;
        document.getElementById('email-notifications-lessons').checked = mockUserData.emailNotificationsLessons;
        document.getElementById('email-notifications-progress').checked = mockUserData.emailNotificationsProgress;
    }
    loadUserData(); // Load data when page loads

    // --- Profile Picture Preview ---
    const profilePicUpload = document.getElementById('profile-picture-upload');
    const profilePicPreview = document.getElementById('profile-pic-preview');
    if (profilePicUpload && profilePicPreview) {
        profilePicUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profilePicPreview.src = e.target.result;
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // --- Password Visibility Toggles ---
    const eyeIcon = '👁️';
    const eyeSlashIcon = '👁️‍🗨️';
    document.querySelectorAll('.toggle-password-visibility').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const targetInputId = this.dataset.for;
            const passwordInput = document.getElementById(targetInputId);
            if (passwordInput) {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.textContent = type === 'password' ? eyeIcon : eyeSlashIcon;
            }
        });
    });

    // --- Helper function to show messages ---
    const showMessage = (message, type) => {
        messageArea.textContent = message;
        messageArea.className = `message-area ${type}`; // 'success' or 'error'
        messageArea.style.display = 'block';
        messageArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // --- Helper function to add/remove error class from inputs ---
    const setErrorInput = (inputElement, isError) => {
        if (isError) {
            inputElement.classList.add('error-input');
        } else {
            inputElement.classList.remove('error-input');
        }
    };

    // --- Simple email validation regex ---
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // --- Form Submission ---
    if (profileForm) {
        profileForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const saveButton = document.getElementById('save-settings-btn');
            const originalButtonText = saveButton.innerHTML;
            saveButton.disabled = true;
            saveButton.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Saving...`;

            // Clear previous messages and input errors
            messageArea.textContent = '';
            messageArea.style.display = 'none';
            document.querySelectorAll('#profile-settings-form .error-input').forEach(el => el.classList.remove('error-input'));

            const formData = new FormData(profileForm);
            const data = Object.fromEntries(formData.entries());

            // --- Validation ---
            let errors = [];
            const fullNameInput = document.getElementById('full-name');
            const emailInput = document.getElementById('email');
            const currentPasswordInput = document.getElementById('current-password');
            const newPasswordInput = document.getElementById('new-password');
            const confirmNewPasswordInput = document.getElementById('confirm-new-password');

            if (!data.fullName.trim()) {
                errors.push('Full Name is required.');
                setErrorInput(fullNameInput, true);
            }
            if (!data.email.trim()) {
                errors.push('Email is required.');
                setErrorInput(emailInput, true);
            } else if (!validateEmail(data.email.trim())) {
                errors.push('Please enter a valid email address.');
                setErrorInput(emailInput, true);
            }

            // Password change validation (only if new password is provided)
            if (data.newPassword || data.confirmNewPassword || data.currentPassword) {
                if (!data.currentPassword) {
                    errors.push('Current password is required to change your password.');
                    setErrorInput(currentPasswordInput, true);
                }
                if (!data.newPassword) {
                    errors.push('New password is required.');
                    setErrorInput(newPasswordInput, true);
                } else if (data.newPassword.length < 8) {
                    errors.push('New password must be at least 8 characters long.');
                    setErrorInput(newPasswordInput, true);
                }
                if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
                    errors.push('New passwords do not match.');
                    setErrorInput(newPasswordInput, true);
                    setErrorInput(confirmNewPasswordInput, true);
                }
            }

            if (errors.length > 0) {
                showMessage(errors.join('\n'), 'error');
                const firstErrorInput = profileForm.querySelector('.error-input');
                if (firstErrorInput) {
                    firstErrorInput.focus();
                }
                saveButton.disabled = false;
                saveButton.innerHTML = originalButtonText;
                return;
            }

            // --- Simulate API Call ---
            console.log("Submitting Profile Data:", data);
            // Replace with actual fetch API call to your backend
            setTimeout(() => {
                // Simulate success
                showMessage('Profile settings updated successfully!', 'success');
                saveButton.disabled = false;
                saveButton.innerHTML = originalButtonText;

                // Clear password fields after successful save for security
                if (currentPasswordInput) currentPasswordInput.value = '';
                if (newPasswordInput) newPasswordInput.value = '';
                if (confirmNewPasswordInput) confirmNewPasswordInput.value = '';

                // Simulate error (uncomment to test error handling)
                // showMessage('Failed to update settings. Please try again.', 'error');
            }, 1500);
        });
    }

    // --- Deactivate Account Button ---
    const deactivateBtn = document.getElementById('deactivate-account-btn');
    if (deactivateBtn) {
        deactivateBtn.addEventListener('click', () => {
            if (confirm("Are you sure you want to deactivate your account? This action cannot be undone easily.")) {
                // Simulate deactivation
                console.log("Deactivate account initiated.");
                showMessage("Account deactivation request received. You will be logged out shortly.", "success");
                // In a real app, call an API endpoint and then redirect/logout.
                setTimeout(() => {
                    // window.location.href = '/logout'; // Example
                    alert("Account deactivated (simulation). You would be logged out now.");
                }, 2000);
            }
        });
    }

}); // End DOMContentLoaded
