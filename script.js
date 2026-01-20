// Wine Products Data
const wines = [
    {
        id: 1,
        name: "Château Margaux 2015",
        type: "red",
        price: 299.99,
        icon: "🍷",
        description: "A prestigious Bordeaux wine with complex flavors of dark berries, cedar, and tobacco. Perfectly balanced with silky tannins.",
        badge: "Premium"
    },
    {
        id: 2,
        name: "Domaine de la Romanée-Conti",
        type: "red",
        price: 599.99,
        icon: "🍷",
        description: "One of the world's most sought-after wines. Rich, elegant, with notes of dark cherry, rose petals, and spice.",
        badge: "Luxury"
    },
    {
        id: 3,
        name: "Cloudy Bay Sauvignon Blanc",
        type: "white",
        price: 34.99,
        icon: "🥂",
        description: "Fresh and vibrant New Zealand white wine with tropical fruit flavors and crisp acidity.",
        badge: ""
    },
    {
        id: 4,
        name: "Moët & Chandon Champagne",
        type: "sparkling",
        price: 54.99,
        icon: "🍾",
        description: "Classic French champagne with fine bubbles, notes of citrus, and white flowers. Perfect for celebrations.",
        badge: "Popular"
    },
    {
        id: 5,
        name: "Caymus Cabernet Sauvignon",
        type: "red",
        price: 89.99,
        icon: "🍷",
        description: "Bold California Cabernet with rich flavors of blackberry, cassis, and vanilla. Full-bodied and smooth.",
        badge: ""
    },
    {
        id: 6,
        name: "Whispering Angel Rosé",
        type: "rosé",
        price: 24.99,
        icon: "🌸",
        description: "Elegant Provence rosé with delicate flavors of strawberry, citrus, and melon. Light and refreshing.",
        badge: "Best Seller"
    },
    {
        id: 7,
        name: "Kendall-Jackson Chardonnay",
        type: "white",
        price: 18.99,
        icon: "🥂",
        description: "Popular California Chardonnay with notes of tropical fruit, vanilla, and toasted oak.",
        badge: ""
    },
    {
        id: 8,
        name: "Veuve Clicquot Yellow Label",
        type: "sparkling",
        price: 59.99,
        icon: "🍾",
        description: "Iconic champagne with a perfect balance of finesse and power. Notes of apple, pear, and brioche.",
        badge: "Premium"
    },
    {
        id: 9,
        name: "Meiomi Pinot Noir",
        type: "red",
        price: 22.99,
        icon: "🍷",
        description: "Smooth California Pinot Noir with flavors of dark cherry, mocha, and vanilla. Easy drinking.",
        badge: ""
    },
    {
        id: 10,
        name: "Kim Crawford Sauvignon Blanc",
        type: "white",
        price: 16.99,
        icon: "🥂",
        description: "Crisp and refreshing with vibrant flavors of passion fruit, grapefruit, and fresh herbs.",
        badge: ""
    },
    {
        id: 11,
        name: "Miraval Rosé",
        type: "rosé",
        price: 29.99,
        icon: "🌸",
        description: "Premium Provence rosé with notes of peach, strawberry, and white flowers. Smooth and elegant.",
        badge: "Popular"
    },
    {
        id: 12,
        name: "Barolo Riserva",
        type: "red",
        price: 79.99,
        icon: "🍷",
        description: "Prestigious Italian red wine with complex flavors of cherry, rose, tar, and truffle. Aged to perfection.",
        badge: ""
    }
];

// Shopping Cart
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const productModal = document.getElementById('productModal');
const closeCart = document.getElementById('closeCart');
const closeProduct = document.getElementById('closeProduct');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const priceFilter = document.getElementById('priceFilter');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(wines);
    loadCart();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Cart Modal
    cartIcon.addEventListener('click', openCartModal);
    closeCart.addEventListener('click', closeCartModal);
    
    // Product Modal
    closeProduct.addEventListener('click', closeProductModal);
    
    // Close modals on outside click
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) closeCartModal();
    });
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) closeProductModal();
    });
    
    // Filters
    searchInput.addEventListener('input', filterProducts);
    typeFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);
    
    // Mobile Menu
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Toggle Mobile Menu
function toggleMobileMenu() {
    navLinks.classList.toggle('active');
}

// Display Products
function displayProducts(productsToDisplay) {
    productsGrid.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 2rem;">No wines found matching your criteria.</p>';
        return;
    }
    
    productsToDisplay.forEach(wine => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <span>${wine.icon}</span>
                ${wine.badge ? `<span class="product-badge">${wine.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${wine.name}</h3>
                <p class="product-type">${capitalizeFirstLetter(wine.type)} Wine</p>
                <p class="product-description">${wine.description.substring(0, 80)}...</p>
                <div class="product-footer">
                    <span class="product-price">$${wine.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${wine.id})">Add to Cart</button>
                </div>
            </div>
        `;
        
        // Click on card to view details
        productCard.addEventListener('click', (e) => {
            if (!e.target.classList.contains('add-to-cart-btn')) {
                openProductModal(wine.id);
            }
        });
        
        productsGrid.appendChild(productCard);
    });
}

// Filter Products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedType = typeFilter.value;
    const selectedPrice = priceFilter.value;
    
    let filtered = wines.filter(wine => {
        // Search filter
        const matchesSearch = wine.name.toLowerCase().includes(searchTerm) ||
                            wine.description.toLowerCase().includes(searchTerm);
        
        // Type filter
        const matchesType = selectedType === 'all' || wine.type === selectedType;
        
        // Price filter
        let matchesPrice = true;
        if (selectedPrice === 'budget') {
            matchesPrice = wine.price < 20;
        } else if (selectedPrice === 'mid') {
            matchesPrice = wine.price >= 20 && wine.price <= 50;
        } else if (selectedPrice === 'premium') {
            matchesPrice = wine.price > 50;
        }
        
        return matchesSearch && matchesType && matchesPrice;
    });
    
    displayProducts(filtered);
}

// Add to Cart
function addToCart(productId) {
    const wine = wines.find(w => w.id === productId);
    if (!wine) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...wine,
            quantity: 1
        });
    }
    
    updateCart();
    saveCart();
    
    // Show feedback
    showNotification('Added to cart!');
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    saveCart();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCart();
        saveCart();
    }
}

// Update Cart Display
function updateCart() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-icon">${item.icon}</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('aynWineCart', JSON.stringify(cart));
}

// Load Cart from LocalStorage
function loadCart() {
    const savedCart = localStorage.getItem('aynWineCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Open Cart Modal
function openCartModal() {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Cart Modal
function closeCartModal() {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Open Product Modal
function openProductModal(productId) {
    const wine = wines.find(w => w.id === productId);
    if (!wine) return;
    
    const productDetail = document.getElementById('productDetail');
    productDetail.innerHTML = `
        <div class="product-detail-header">
            <div class="product-detail-icon">${wine.icon}</div>
            <h2 class="product-detail-name">${wine.name}</h2>
            <p class="product-detail-type">${capitalizeFirstLetter(wine.type)} Wine</p>
        </div>
        <div class="product-detail-description">
            <p>${wine.description}</p>
        </div>
        <div class="product-detail-footer">
            <span class="product-detail-price">$${wine.price.toFixed(2)}</span>
            <button class="btn btn-primary" onclick="addToCart(${wine.id}); closeProductModal();">Add to Cart</button>
        </div>
    `;
    
    productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Product Modal
function closeProductModal() {
    productModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Show Notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #8b2f97 0%, #c41e3a 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        z-index: 3000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Utility Functions
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
