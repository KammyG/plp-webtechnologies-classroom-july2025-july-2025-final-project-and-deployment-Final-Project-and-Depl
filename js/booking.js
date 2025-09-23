// Booking form functionality

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    const roomTypeSelect = document.getElementById('roomType');
    const guestsSelect = document.getElementById('guests');
    const addonCheckboxes = document.querySelectorAll('input[name="addons"]');
    
    // Summary elements
    const summaryRoomType = document.getElementById('summaryRoomType');
    const summaryCheckIn = document.getElementById('summaryCheckIn');
    const summaryCheckOut = document.getElementById('summaryCheckOut');
    const summaryNights = document.getElementById('summaryNights');
    const summaryGuests = document.getElementById('summaryGuests');
    const summaryRoomTotal = document.getElementById('summaryRoomTotal');
    const summaryAddons = document.getElementById('summaryAddons');
    const summaryTaxes = document.getElementById('summaryTaxes');
    const summaryTotal = document.getElementById('summaryTotal');
    
    // Add-on prices
    const addonPrices = {
        'breakfast': 25,
        'spa': 150,
        'transport': 75,
        'late-checkout': 50
    };
    
    // Update summary when form changes
    function updateSummary() {
        const checkInDate = new Date(checkInInput.value);
        const checkOutDate = new Date(checkOutInput.value);
        const roomType = roomTypeSelect.value;
        const guests = guestsSelect.value;
        
        // Update basic info
        summaryRoomType.textContent = roomType ? roomTypeSelect.options[roomTypeSelect.selectedIndex].text.split(' - ')[0] : '-';
        summaryCheckIn.textContent = checkInInput.value ? formatDate(checkInDate) : '-';
        summaryCheckOut.textContent = checkOutInput.value ? formatDate(checkOutDate) : '-';
        summaryGuests.textContent = guests;
        
        // Calculate nights
        let nights = 0;
        if (checkInInput.value && checkOutInput.value && checkOutDate > checkInDate) {
            nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
        }
        summaryNights.textContent = nights > 0 ? nights : '-';
        
        // Calculate room total
        let roomTotal = 0;
        if (roomType && nights > 0) {
            const pricePerNight = parseInt(roomTypeSelect.options[roomTypeSelect.selectedIndex].getAttribute('data-price'));
            roomTotal = pricePerNight * nights;
        }
        summaryRoomTotal.textContent = roomTotal > 0 ? `$${roomTotal.toFixed(2)}` : '$0';
        
        // Calculate add-ons
        let addonsTotal = 0;
        addonCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const addonType = checkbox.value;
                if (addonType === 'breakfast') {
                    addonsTotal += addonPrices[addonType] * nights;
                } else if (addonType === 'transport') {
                    addonsTotal += addonPrices[addonType] * 2; // Round trip
                } else {
                    addonsTotal += addonPrices[addonType];
                }
            }
        });
        summaryAddons.textContent = `$${addonsTotal.toFixed(2)}`;
        
        // Calculate taxes (12% of subtotal)
        const subtotal = roomTotal + addonsTotal;
        const taxes = subtotal * 0.12;
        summaryTaxes.textContent = `$${taxes.toFixed(2)}`;
        
        // Calculate total
        const total = subtotal + taxes;
        summaryTotal.textContent = `$${total.toFixed(2)}`;
    }
    
    // Format date for display
    function formatDate(date) {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
    
    // Validate check-out date
    function validateCheckOutDate() {
        if (checkInInput.value && checkOutInput.value) {
            const checkInDate = new Date(checkInInput.value);
            const checkOutDate = new Date(checkOutInput.value);
            
            if (checkOutDate <= checkInDate) {
                checkOutInput.setCustomValidity('Check-out date must be after check-in date');
            } else {
                checkOutInput.setCustomValidity('');
            }
        }
    }
    
    // Set minimum check-out date
    function updateMinCheckOutDate() {
        if (checkInInput.value) {
            const checkInDate = new Date(checkInInput.value);
            checkInDate.setDate(checkInDate.getDate() + 1);
            checkOutInput.min = checkInDate.toISOString().split('T')[0];
            
            // Clear check-out if it's now invalid
            if (checkOutInput.value && new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
                checkOutInput.value = '';
            }
        }
    }
    
    // Event listeners
    if (checkInInput) {
        checkInInput.addEventListener('change', function() {
            updateMinCheckOutDate();
            updateSummary();
        });
    }
    
    if (checkOutInput) {
        checkOutInput.addEventListener('change', function() {
            validateCheckOutDate();
            updateSummary();
        });
    }
    
    if (roomTypeSelect) {
        roomTypeSelect.addEventListener('change', updateSummary);
    }
    
    if (guestsSelect) {
        guestsSelect.addEventListener('change', updateSummary);
    }
    
    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateSummary);
    });
    
    // Form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (!window.validateForm(this)) {
                window.showErrorMessage('Please fill in all required fields correctly.');
                return;
            }
            
            // Additional validation
            if (!checkInInput.value || !checkOutInput.value) {
                window.showErrorMessage('Please select both check-in and check-out dates.');
                return;
            }
            
            if (new Date(checkOutInput.value) <= new Date(checkInInput.value)) {
                window.showErrorMessage('Check-out date must be after check-in date.');
                return;
            }
            
            if (!roomTypeSelect.value) {
                window.showErrorMessage('Please select a room type.');
                return;
            }
            
            // Get form data
            const formData = new FormData(this);
            const bookingData = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                checkIn: formData.get('checkIn'),
                checkOut: formData.get('checkOut'),
                roomType: formData.get('roomType'),
                guests: formData.get('guests'),
                specialRequests: formData.get('specialRequests'),
                addons: formData.getAll('addons'),
                total: summaryTotal.textContent
            };
            
            // Show loading state
            const submitButton = this.querySelector('.submit-btn');
            submitButton.setAttribute('data-original-text', submitButton.textContent);
            window.setLoadingState(submitButton, true);
            
            // Simulate booking process
            setTimeout(() => {
                // Reset loading state
                window.setLoadingState(submitButton, false);
                
                // Show success message
                window.showSuccessMessage('Booking submitted successfully! You will receive a confirmation email shortly.');
                
                // Save booking to localStorage (for demo purposes)
                const bookings = JSON.parse(localStorage.getItem('hotelBookings') || '[]');
                bookingData.id = Date.now().toString();
                bookingData.status = 'confirmed';
                bookingData.submittedAt = new Date().toISOString();
                bookings.push(bookingData);
                localStorage.setItem('hotelBookings', JSON.stringify(bookings));
                
                // Reset form
                this.reset();
                updateSummary();
                
                // Scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                console.log('Booking submitted:', bookingData);
            }, 2000);
        });
    }
    
    // Initialize summary
    updateSummary();
    
    // Pre-populate with URL parameters if coming from room page
    const urlParams = new URLSearchParams(window.location.search);
    const roomType = urlParams.get('room');
    if (roomType && roomTypeSelect) {
        roomTypeSelect.value = roomType;
        updateSummary();
    }
    
    // Add some interactive enhancements
    
    // Highlight selected room type
    if (roomTypeSelect) {
        roomTypeSelect.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = '#d4af37';
                this.style.backgroundColor = '#fffbf0';
            } else {
                this.style.borderColor = '#ddd';
                this.style.backgroundColor = 'white';
            }
        });
    }
    
    // Add calendar icons to date inputs
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.style.position = 'relative';
        input.addEventListener('focus', function() {
            this.style.borderColor = '#d4af37';
        });
        input.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
        });
    });
    
    // Smooth scroll to booking summary on mobile
    const summaryElement = document.querySelector('.booking-summary');
    if (summaryElement && window.innerWidth <= 768) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.2)';
                    } else {
                        entry.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                    }
                });
            },
            { threshold: 0.1 }
        );
        observer.observe(summaryElement);
    }
    
    console.log('Booking form functionality initialized!');
});
