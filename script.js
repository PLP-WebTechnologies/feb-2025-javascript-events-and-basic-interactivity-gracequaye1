// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // EVENT HANDLING SECTION
    // ======================
    
    // Button click event
    const clickButton = document.getElementById('click-button');
    const clickOutput = document.getElementById('click-output');
    
    clickButton.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked! 🎉';
        clickOutput.style.color = '#2ecc71';
        
        // Reset after 2 seconds
        setTimeout(() => {
            clickOutput.textContent = 'Button not clicked yet';
            clickOutput.style.color = '';
        }, 2000);
    });
    
    // Hover event
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Hover detected! ✨';
        hoverOutput.style.color = '#3498db';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Waiting for hover...';
        hoverOutput.style.color = '';
    });
    
    // Keypress event
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You pressed: ${e.key} (Key code: ${e.keyCode})`;
        
        // Change color based on key type
        if (e.keyCode >= 48 && e.keyCode <= 57) {
            keypressOutput.style.color = '#e74c3c'; // Number - red
        } else if (e.keyCode >= 65 && e.keyCode <= 90) {
            keypressOutput.style.color = '#2ecc71'; // Letter - green
        } else {
            keypressOutput.style.color = '#3498db'; // Other - blue
        }
    });
    
    // Secret event (double click or long press)
    const secretBox = document.querySelector('.secret-box');
    let pressTimer;
    
    // Double click
    secretBox.addEventListener('dblclick', revealSecret);
    
    // Long press
    secretBox.addEventListener('mousedown', function() {
        pressTimer = setTimeout(revealSecret, 1000); // 1 second hold
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(pressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(pressTimer);
    });
    
    function revealSecret() {
        secretBox.classList.add('revealed');
        secretBox.innerHTML = '<p>🎉 You found the secret! JavaScript is awesome! 🎉</p>';
        
        // Add confetti effect
        setTimeout(() => {
            secretBox.innerHTML += '<div class="confetti">✨</div>';
        }, 300);
    }
    
    // ===========================
    // INTERACTIVE ELEMENTS SECTION
    // ===========================
    
    // Color changing button
    const colorChanger = document.getElementById('color-changer');
    const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        this.style.backgroundColor = colors[colorIndex];
        this.textContent = `Color Changed! (${colorIndex + 1}/${colors.length})`;
        
        // Reset text after 1 second
        setTimeout(() => {
            this.textContent = 'Change My Color!';
        }, 1000);
    });
    
    // Image gallery
    const galleryImages = document.querySelectorAll('.image-gallery img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentImageIndex = 0;
    
    // Show first image initially
    galleryImages[currentImageIndex].classList.add('active');
    
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryImages[index].classList.add('active');
        currentImageIndex = index;
    }
    
    nextBtn.addEventListener('click', function() {
        let nextIndex = (currentImageIndex + 1) % galleryImages.length;
        showImage(nextIndex);
    });
    
    prevBtn.addEventListener('click', function() {
        let prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        showImage(prevIndex);
    });
    
    // Keyboard navigation for gallery
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') {
            let nextIndex = (currentImageIndex + 1) % galleryImages.length;
            showImage(nextIndex);
        } else if (e.key === 'ArrowLeft') {
            let prevIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(prevIndex);
        }
    });
    
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // ======================
    // FORM VALIDATION SECTION
    // ======================
    
    const form = document.getElementById('validation-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            alert('Form submitted successfully! 🎉');
            form.reset();
            strengthBar.style.width = '0';
            strengthText.textContent = 'Password strength';
        } else {
            alert('Please fix the errors before submitting.');
        }
    });
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
            return false;
        } else if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameError.style.display = 'block';
            return false;
        } else {
            nameError.style.display = 'none';
            return true;
        }
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            emailError.style.display = 'block';
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email';
            emailError.style.display = 'block';
            return false;
        } else {
            emailError.style.display = 'none';
            return true;
        }
    }
    
    function validatePassword() {
        const password = passwordInput.value;
        
        if (password === '') {
            passwordError.textContent = 'Password is required';
            passwordError.style.display = 'block';
            return false;
        } else if (password.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordError.style.display = 'block';
            return false;
        } else {
            passwordError.style.display = 'none';
            
            // Calculate password strength
            let strength = 0;
            
            // Length check
            if (password.length >= 8) strength += 1;
            if (password.length >= 12) strength += 1;
            
            // Complexity checks
            if (/[A-Z]/.test(password)) strength += 1;
            if (/[0-9]/.test(password)) strength += 1;
            if (/[^A-Za-z0-9]/.test(password)) strength += 1;
            
            // Update strength bar and text
            const width = (strength / 5) * 100;
            strengthBar.style.width = `${width}%`;
            
            // Change color based on strength
            if (strength <= 2) {
                strengthBar.style.backgroundColor = '#e74c3c';
                strengthText.textContent = 'Weak';
            } else if (strength <= 4) {
                strengthBar.style.backgroundColor = '#f39c12';
                strengthText.textContent = 'Medium';
            } else {
                strengthBar.style.backgroundColor = '#2ecc71';
                strengthText.textContent = 'Strong';
            }
            
            return true;
        }
    }
});