// Contact form functionality

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!window.validateForm(this)) {
                window.showErrorMessage('Please fill in all required fields correctly.');
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const contactData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                submittedAt: new Date().toISOString()
            };
            
            // Show loading state
            const submitButton = this.querySelector('.submit-btn');
            submitButton.setAttribute('data-original-text', submitButton.textContent);
            window.setLoadingState(submitButton, true);
            
            // Simulate sending message
            setTimeout(() => {
                // Reset loading state
                window.setLoadingState(submitButton, false);
                
                // Show success message
                window.showSuccessMessage('Message sent successfully! We will get back to you within 24 hours.');
                
                // Save message to localStorage (for demo purposes)
                const messages = JSON.parse(localStorage.getItem('hotelMessages') || '[]');
                contactData.id = Date.now().toString();
                messages.push(contactData);
                localStorage.setItem('hotelMessages', JSON.stringify(messages));
                
                // Reset form
                this.reset();
                
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                console.log('Contact message submitted:', contactData);
            }, 1500);
        });
    }
    
    // Add interactive enhancements to form fields
    const formFields = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    
    formFields.forEach(field => {
        // Focus effects
        field.addEventListener('focus', function() {
            this.style.borderColor = '#d4af37';
            this.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.1)';
        });
        
        field.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
            this.style.boxShadow = 'none';
        });
        
        // Character counter for message field
        if (field.tagName.toLowerCase() === 'textarea') {
            const maxLength = 500;
            field.setAttribute('maxlength', maxLength);
            
            // Create character counter
            const counter = document.createElement('div');
            counter.className = 'character-counter';
            counter.style.cssText = `
                text-align: right;
                font-size: 0.8rem;
                color: #666;
                margin-top: 5px;
            `;
            field.parentNode.appendChild(counter);
            
            function updateCounter() {
                const remaining = maxLength - field.value.length;
                counter.textContent = `${remaining} characters remaining`;
                counter.style.color = remaining < 50 ? '#dc3545' : '#666';
            }
            
            field.addEventListener('input', updateCounter);
            updateCounter();
        }
    });
    
    // Add subject-specific placeholder text for message field
    const subjectSelect = document.getElementById('subject');
    const messageField = document.getElementById('message');
    
    if (subjectSelect && messageField) {
        const placeholders = {
            'reservation': 'Please let us know your preferred dates, room type, and any special requirements...',
            'existing': 'Please provide your confirmation number and details about your request...',
            'events': 'Tell us about your event requirements, expected number of guests, and preferred dates...',
            'services': 'Which hotel services would you like to know more about?',
            'feedback': 'We value your feedback! Please share your experience with us...',
            'other': 'Please share your inquiry or message...'
        };
        
        subjectSelect.addEventListener('change', function() {
            const selectedSubject = this.value;
            if (selectedSubject && placeholders[selectedSubject]) {
                messageField.placeholder = placeholders[selectedSubject];
            } else {
                messageField.placeholder = 'Please share your inquiry or message...';
            }
        });
    }
    
    // Add click-to-call functionality for phone numbers
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if device supports tel: links
            if (!('ontouchstart' in window)) {
                e.preventDefault();
                // Copy to clipboard for desktop users
                navigator.clipboard.writeText(this.textContent).then(() => {
                    window.showSuccessMessage('Phone number copied to clipboard!');
                });
            }
        });
    });
    
    // Add interactive map functionality
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('click', function() {
            // Open in Google Maps
            const address = encodeURIComponent('123 Paradise Avenue, Malibu, CA 90265');
            window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
        });
        
        mapContainer.style.cursor = 'pointer';
        mapContainer.title = 'Click to open in Google Maps';
    }
    
    // Add emergency contact highlighting
    const emergencySection = document.querySelector('.emergency-contact');
    if (emergencySection) {
        // Add subtle pulsing animation for emergency contact
        const style = document.createElement('style');
        style.textContent = `
            .emergency-contact {
                animation: pulse 3s ease-in-out infinite;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.9; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add form validation feedback
    function addValidationFeedback() {
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                const isValid = this.checkValidity();
                
                // Remove existing feedback
                const existingFeedback = this.parentNode.querySelector('.validation-feedback');
                if (existingFeedback) {
                    existingFeedback.remove();
                }
                
                if (!isValid && this.value.trim() !== '') {
                    // Add error feedback
                    const feedback = document.createElement('div');
                    feedback.className = 'validation-feedback';
                    feedback.style.cssText = `
                        color: #dc3545;
                        font-size: 0.8rem;
                        margin-top: 5px;
                    `;
                    feedback.textContent = this.validationMessage;
                    this.parentNode.appendChild(feedback);
                    this.style.borderColor = '#dc3545';
                } else if (isValid && this.value.trim() !== '') {
                    // Add success feedback
                    this.style.borderColor = '#28a745';
                }
            });
        });
    }
    
    if (contactForm) {
        addValidationFeedback();
    }
    
    console.log('Contact form functionality initialized!');
});
