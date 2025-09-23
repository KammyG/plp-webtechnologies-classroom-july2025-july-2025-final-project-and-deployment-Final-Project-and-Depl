// Room gallery and modal functionality

document.addEventListener('DOMContentLoaded', function() {
    // Room gallery filtering
    const galleryButtons = document.querySelectorAll('.gallery-btn');
    const roomItems = document.querySelectorAll('.room-gallery-item');
    
    galleryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            galleryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter rooms
            roomItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Room modal functionality
    const modal = document.getElementById('roomModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close');
    
    // Room data
    const roomData = {
        'deluxe-ocean': {
            title: 'Deluxe Ocean Suite',
            price: 299,
            description: 'Indulge in breathtaking panoramic ocean views from this luxurious suite featuring a private balcony, marble bathroom with soaking tub, and premium amenities.',
            features: [
                'King-size bed with premium linens',
                'Private balcony with ocean views',
                'Marble bathroom with soaking tub',
                'Separate living area',
                'Mini-bar and coffee station',
                'Complimentary WiFi',
                'Daily housekeeping',
                '24/7 room service'
            ],
            amenities: [
                'Ocean View',
                'Balcony',
                'Marble Bath',
                'Living Area',
                'Mini Bar',
                'Room Service'
            ],
            images: [
                'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
                'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
            ]
        },
        'garden-villa': {
            title: 'Garden Villa',
            price: 199,
            description: 'Escape to your own private oasis in this charming villa surrounded by lush tropical gardens, featuring a private pool and outdoor dining area.',
            features: [
                'Private villa with garden views',
                'Private swimming pool',
                'Outdoor dining area',
                'Full kitchen facilities',
                'Separate bedroom and living room',
                'Private garden terrace',
                'Complimentary WiFi',
                'Daily housekeeping'
            ],
            amenities: [
                'Private Pool',
                'Garden View',
                'Full Kitchen',
                'Terrace',
                'Dining Area',
                'Privacy'
            ],
            images: [
                'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
                'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
            ]
        },
        'presidential': {
            title: 'Presidential Suite',
            price: 499,
            description: 'Experience the ultimate in luxury with our Presidential Suite, featuring panoramic city views, butler service, and the finest amenities.',
            features: [
                'Spacious master bedroom with city views',
                'Separate living and dining areas',
                'Private butler service',
                'Premium marble bathroom with jacuzzi',
                'Private office space',
                'Complimentary champagne service',
                'Priority restaurant reservations',
                'Limousine airport transfer'
            ],
            amenities: [
                'Butler Service',
                'City Views',
                'Jacuzzi',
                'Office Space',
                'Champagne',
                'Limousine'
            ],
            images: [
                'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
                'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
            ]
        },
        'standard': {
            title: 'Standard Room',
            price: 149,
            description: 'Comfortable and elegantly appointed room featuring modern amenities and tasteful décor for a relaxing stay.',
            features: [
                'Queen-size bed with quality linens',
                'Modern bathroom with shower',
                'Work desk and seating area',
                'Smart TV with cable channels',
                'Coffee maker and mini-fridge',
                'Complimentary WiFi',
                'Daily housekeeping',
                'Air conditioning'
            ],
            amenities: [
                'Queen Bed',
                'Smart TV',
                'Work Desk',
                'Mini Fridge',
                'Coffee Maker',
                'Air Conditioning'
            ],
            images: [
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
                'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
            ]
        },
        'family': {
            title: 'Family Suite',
            price: 349,
            description: 'Spacious family-friendly suite with separate bedrooms and a kitchenette, perfect for families seeking comfort and convenience.',
            features: [
                'Two separate bedrooms',
                'Kitchenette with dining area',
                'Separate living room',
                'Two full bathrooms',
                'Connecting rooms available',
                'Child-friendly amenities',
                'Complimentary WiFi',
                'Daily housekeeping'
            ],
            amenities: [
                'Two Bedrooms',
                'Kitchenette',
                'Living Room',
                'Two Bathrooms',
                'Child Friendly',
                'Connecting Rooms'
            ],
            images: [
                'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
                'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
            ]
        },
        'honeymoon': {
            title: 'Honeymoon Villa',
            price: 399,
            description: 'Romance awaits in this intimate villa designed for couples, featuring direct beach access, a private jacuzzi, and sunset views.',
            features: [
                'King-size bed with romantic décor',
                'Private jacuzzi with ocean views',
                'Direct beach access',
                'Champagne and rose petal service',
                'Private dining on the terrace',
                'Couples spa treatments available',
                'Sunset viewing deck',
                'Butler service'
            ],
            amenities: [
                'Beach Access',
                'Private Jacuzzi',
                'Romantic Décor',
                'Champagne Service',
                'Sunset Deck',
                'Butler Service'
            ],
            images: [
                'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
                'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80'
            ]
        }
    };
    
    // Open room modal
    window.openRoomModal = function(roomId) {
        const room = roomData[roomId];
        if (!room) return;
        
        modalContent.innerHTML = `
            <div class="room-modal-header">
                <img src="${room.images[0]}" alt="${room.title}" style="width: 100%; height: 300px; object-fit: cover;">
                <div style="padding: 2rem;">
                    <h2 style="color: #d4af37; margin-bottom: 0.5rem;">${room.title}</h2>
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                        <span style="font-size: 1.5rem; font-weight: bold; color: #d4af37;">$${room.price}</span>
                        <span style="color: #666;">/night</span>
                    </div>
                    <p style="color: #666; line-height: 1.8; margin-bottom: 2rem;">${room.description}</p>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                        <div>
                            <h3 style="color: #333; margin-bottom: 1rem;">Room Features</h3>
                            <ul style="list-style: none; padding: 0;">
                                ${room.features.map(feature => `
                                    <li style="padding: 0.5rem 0; border-bottom: 1px solid #eee; color: #666;">
                                        <span style="color: #d4af37; margin-right: 8px;">✓</span>
                                        ${feature}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div>
                            <h3 style="color: #333; margin-bottom: 1rem;">Amenities</h3>
                            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                                ${room.amenities.map(amenity => `
                                    <span style="background: #f0f0f0; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; color: #666;">
                                        ${amenity}
                                    </span>
                                `).join('')}
                            </div>
                            
                            <div style="margin-top: 2rem;">
                                <a href="booking.html" style="
                                    display: inline-block;
                                    background: #d4af37;
                                    color: white;
                                    padding: 12px 24px;
                                    text-decoration: none;
                                    border-radius: 5px;
                                    font-weight: bold;
                                    transition: background 0.3s ease;
                                " onmouseover="this.style.background='#b8941f'" onmouseout="this.style.background='#d4af37'">
                                    Book This Room
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Image gallery in modal
    function createImageGallery(images) {
        let currentIndex = 0;
        
        return `
            <div class="image-gallery" style="position: relative;">
                <img id="galleryImage" src="${images[0]}" alt="Room image" style="width: 100%; height: 300px; object-fit: cover;">
                ${images.length > 1 ? `
                    <button onclick="changeImage(-1)" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; padding: 10px; cursor: pointer; border-radius: 5px;">❮</button>
                    <button onclick="changeImage(1)" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.5); color: white; border: none; padding: 10px; cursor: pointer; border-radius: 5px;">❯</button>
                    <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 5px;">
                        ${images.map((_, index) => `
                            <div onclick="setImage(${index})" style="width: 10px; height: 10px; border-radius: 50%; background: ${index === 0 ? '#d4af37' : 'rgba(255,255,255,0.5)'}; cursor: pointer;"></div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    // Add room hover effects
    roomItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('Room gallery functionality initialized!');
});
