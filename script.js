/* ==========================================================================
   D'CHOICE CAFE - INTERACTIVE JAVASCRIPT ENGINE
   ========================================================================== */

// 1. MENU DATABASE
const menuDatabase = [
    {
        id: 'm1',
        name: 'Dalgona Protein Coffee',
        category: 'protein-drink',
        price: 35000,
        protein: 18,
        calories: 180,
        description: 'Kopi Dalgona sehat tinggi protein dengan oat milk & rasa manis alami tanpa gula tambahan.',
        tags: ['Low Sugar', 'High Protein', 'Bestseller'],
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'm2',
        name: 'Pittaya Protein Bowl',
        category: 'smoothie-bowl',
        price: 45000,
        protein: 22,
        calories: 240,
        description: 'Smoothie bowl buah naga merah segar disajikan dengan chia seeds, kelapa parut, & buah kiwi.',
        tags: ['Antioxidant', 'High Fiber', 'Fresh'],
        image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'm3',
        name: 'Choco Dot Protein Waffle',
        category: 'waffle',
        price: 40000,
        protein: 20,
        calories: 220,
        description: 'Wafel renyah berbahan tepung protein whey premium dengan saus dark chocolate lezat rendah kalori.',
        tags: ['Low Calorie', 'Crispy', 'Kids Favorite'],
        image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'm4',
        name: 'Green Smoothie Detox',
        category: 'tea',
        price: 38000,
        protein: 15,
        calories: 150,
        description: 'Pembersih alami dengan bayam organik, apel hijau, timun segar & booster protein nabati.',
        tags: ['Detox', 'Vitamins', 'Zero Sugar'],
        image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'm5',
        name: 'Honey Ginger Tea',
        category: 'tea',
        price: 28000,
        protein: 2,
        calories: 80,
        description: 'Teh jahe merah hangat dikombinasikan dengan madu murni murni untuk meningkatkan imunitas tubuh.',
        tags: ['Immunity', 'Warm & Soothing'],
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'm6',
        name: 'Berry Blast Protein Smoothie',
        category: 'smoothie-bowl',
        price: 42000,
        protein: 21,
        calories: 210,
        description: 'Perpaduan strawberry, blueberry, yogurt rendah lemak & protein powder penyegar harimu.',
        tags: ['Vitamin C', 'Energy Boost'],
        image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'm7',
        name: 'Avocado Toast & Protein Egg',
        category: 'waffle',
        price: 48000,
        protein: 19,
        calories: 310,
        description: 'Roti gandum utuh panggang dipadu alpukat tumbuk halus dan poached egg tinggi protein.',
        tags: ['Healthy Fats', 'Breakfast'],
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'm8',
        name: 'Granola Yogurt Bowl',
        category: 'smoothie-bowl',
        price: 38000,
        protein: 14,
        calories: 200,
        description: 'Greek yogurt creamy dipadu granola panggang madu, kismis & irisan pisang organik.',
        tags: ['Probiotics', 'Crispy Granola'],
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80'
    }
];

// CART STATE
let cart = [];

// 2. DOM INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    renderMenu(menuDatabase);
    checkOperatingHours();
    initMobileNav();
    setupCategoryFilters();
});

// 3. RENDER MENU ITEMS
function renderMenu(items) {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    if (items.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
            Tidak ada menu yang sesuai dengan pencarian Anda.
        </div>`;
        return;
    }

    grid.innerHTML = items.map(item => `
        <div class="menu-card" data-category="${item.category}">
            <div class="menu-card-img-wrap">
                <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy">
                <span class="macro-badge">💪 ${item.protein}g Protein • ${item.calories} Kcal</span>
            </div>
            <div class="menu-card-body">
                <h3 class="menu-title">${item.name}</h3>
                <p class="menu-desc">${item.description}</p>
                <div class="menu-tags">
                    ${item.tags.map(tag => `<span class="tag-chip">${tag}</span>`).join('')}
                </div>
                <div class="menu-card-footer">
                    <span class="menu-price">Rp ${item.price.toLocaleString('id-ID')}</span>
                    <button class="add-cart-btn" onclick="addToCart('${item.id}')" aria-label="Tambah ${item.name}">
                        +
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// 4. CATEGORY FILTER & SEARCH
function setupCategoryFilters() {
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            if (category === 'all') {
                renderMenu(menuDatabase);
            } else {
                const filtered = menuDatabase.filter(m => m.category === category);
                renderMenu(filtered);
            }
        });
    });
}

function filterMenu() {
    const query = document.getElementById('menuSearchInput').value.toLowerCase();
    const filtered = menuDatabase.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query))
    );
    renderMenu(filtered);
}

// 5. CART SYSTEM
function addToCart(itemId) {
    const item = menuDatabase.find(m => m.id === itemId);
    if (!item) return;

    const existing = cart.find(c => c.id === itemId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }

    updateCartUI();
    openCart();
}

function changeQty(itemId, delta) {
    const existing = cart.find(c => c.id === itemId);
    if (!existing) return;

    existing.qty += delta;
    if (existing.qty <= 0) {
        cart = cart.filter(c => c.id !== itemId);
    }

    updateCartUI();
}

function updateCartUI() {
    const badge = document.getElementById('cartBadgeCount');
    const itemsList = document.getElementById('cartItemsList');
    const totalAmount = document.getElementById('cartTotalAmount');
    const totalProteinSum = document.getElementById('totalProteinSum');
    const totalCalorieSum = document.getElementById('totalCalorieSum');

    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const totalProtein = cart.reduce((sum, item) => sum + (item.protein * item.qty), 0);
    const totalCalories = cart.reduce((sum, item) => sum + (item.calories * item.qty), 0);

    if (badge) badge.textContent = totalQty;
    if (totalAmount) totalAmount.textContent = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    if (totalProteinSum) totalProteinSum.textContent = `${totalProtein} g`;
    if (totalCalorieSum) totalCalorieSum.textContent = `${totalCalories} Kcal`;

    if (itemsList) {
        if (cart.length === 0) {
            itemsList.innerHTML = `
                <div class="cart-empty">
                    <span class="empty-icon">🥗</span>
                    <p>Keranjang pesanan Anda masih kosong.</p>
                    <small>Silakan pilih menu sehat favorit Anda!</small>
                </div>`;
        } else {
            itemsList.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">Rp ${(item.price * item.qty).toLocaleString('id-ID')}</div>
                        <small style="color: var(--text-muted);">${item.protein * item.qty}g protein</small>
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
                    </div>
                </div>
            `).join('');
        }
    }
}

function updateCartSummary() {
    updateCartUI();
}

function openCart() {
    document.getElementById('cartDrawer')?.classList.add('active');
    document.getElementById('cartBackdrop')?.classList.add('active');
}

function closeCart() {
    document.getElementById('cartDrawer')?.classList.remove('active');
    document.getElementById('cartBackdrop')?.classList.remove('active');
}

// 6. WHATSAPP DIRECT CHECKOUT
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert('Keranjang Anda masih kosong. Silakan pilih menu terlebih dahulu!');
        return;
    }

    const name = document.getElementById('custName').value.trim();
    if (!name) {
        alert('Mohon masukkan nama Anda terlebih dahulu.');
        document.getElementById('custName').focus();
        return;
    }

    const serviceType = document.querySelector('input[name="orderServiceType"]:checked')?.value || 'Makan di tempat';
    const notes = document.getElementById('custNotes').value.trim();

    let message = `Halo D'Choice Cafe! 🌿\nSaya ingin memesan menu sehat berikut:\n\n`;
    message += `👤 *Nama Pemesan:* ${name}\n`;
    message += `🍽️ *Jenis Pesanan:* ${serviceType}\n`;
    if (notes) message += `📝 *Catatan:* ${notes}\n`;
    message += `-----------------------------------\n`;

    let totalPrice = 0;
    let totalProtein = 0;
    let totalCalories = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        totalPrice += itemTotal;
        totalProtein += item.protein * item.qty;
        totalCalories += item.calories * item.qty;
        message += `${index + 1}. *${item.name}* (${item.qty}x) - Rp ${itemTotal.toLocaleString('id-ID')}\n`;
    });

    message += `-----------------------------------\n`;
    message += `💪 *Total Protein:* ${totalProtein}g\n`;
    message += `🔥 *Est. Total Kalori:* ${totalCalories} Kcal\n`;
    message += `💰 *TOTAL BIAYA:* Rp ${totalPrice.toLocaleString('id-ID')}\n\n`;
    message += `Mohon diproses ya kak. Terima kasih! 💚`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/6281338736063?text=${encoded}`;
    window.open(waUrl, '_blank');
}

// 7. PROTEIN & MENU RECOMMENDATION CALCULATOR
function calculateProtein() {
    const weight = parseFloat(document.getElementById('userWeight').value);
    const goal = document.getElementById('userGoal').value;
    const activity = document.getElementById('userActivity').value;

    if (!weight || isNaN(weight)) return;

    let multiplier = 1.4;
    if (goal === 'weightloss') multiplier = 1.6;
    if (goal === 'musclegain') multiplier = 2.0;

    if (activity === 'active') multiplier += 0.2;

    const dailyProtein = Math.round(weight * multiplier);

    document.getElementById('calcPlaceholder')?.classList.add('hidden');
    const calcOutput = document.getElementById('calcOutput');
    calcOutput?.classList.remove('hidden');

    document.getElementById('targetProteinVal').textContent = `${dailyProtein} g / hari`;

    // Recommend Menu Combo
    let item1, item2;
    if (goal === 'weightloss') {
        item1 = menuDatabase.find(m => m.id === 'm2'); // Pittaya Bowl
        item2 = menuDatabase.find(m => m.id === 'm4'); // Green Smoothie
    } else if (goal === 'musclegain') {
        item1 = menuDatabase.find(m => m.id === 'm3'); // Waffle
        item2 = menuDatabase.find(m => m.id === 'm1'); // Dalgona
    } else {
        item1 = menuDatabase.find(m => m.id === 'm1'); // Dalgona
        item2 = menuDatabase.find(m => m.id === 'm8'); // Granola Yogurt
    }

    const recContainer = document.getElementById('recMenuItem');
    const comboPrice = item1.price + item2.price;
    const comboProtein = item1.protein + item2.protein;
    const comboCal = item1.calories + item2.calories;

    recContainer.innerHTML = `
        <div class="rec-item-card">
            <img src="${item1.image}" class="rec-img" alt="${item1.name}">
            <div>
                <strong>${item1.name} + ${item2.name}</strong>
                <p style="font-size:0.85rem; color:var(--text-muted);">Total: ${comboProtein}g Protein • ${comboCal} Kcal</p>
                <div style="font-weight:700; color:var(--primary); font-size:0.95rem;">Rp ${comboPrice.toLocaleString('id-ID')}</div>
            </div>
        </div>
    `;

    const btn = document.getElementById('addRecToCartBtn');
    btn.onclick = () => {
        addToCart(item1.id);
        addToCart(item2.id);
        alert(`Berhasil menambahkan ${item1.name} & ${item2.name} ke keranjang!`);
    };
}

// 8. REVIEWS FILTER TAGS
function filterReviews(tag) {
    const buttons = document.querySelectorAll('.review-tags-container .tag-btn');
    buttons.forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    const cards = document.querySelectorAll('.review-card');
    cards.forEach(card => {
        const tags = card.dataset.tags || '';
        if (tag === 'all' || tags.includes(tag)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// 9. GALLERY FILTER
function filterGallery(category) {
    const tabs = document.querySelectorAll('.g-tab');
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(`g-${category}`)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// 10. REVIEW MODAL
function openReviewModal() {
    document.getElementById('reviewModal')?.classList.add('active');
}

function closeReviewModal(e) {
    document.getElementById('reviewModal')?.classList.remove('active');
}

function setRating(val) {
    document.getElementById('revRating').value = val;
    const stars = document.querySelectorAll('#starPicker span');
    stars.forEach((s, i) => {
        if (i < val) s.classList.add('active');
        else s.classList.remove('active');
    });
}

function submitUserReview(e) {
    e.preventDefault();
    const name = document.getElementById('revName').value.trim();
    const rating = document.getElementById('revRating').value;
    const comment = document.getElementById('revComment').value.trim();

    const reviewsGrid = document.getElementById('reviewsGrid');
    const newCard = document.createElement('div');
    newCard.className = 'review-card';
    newCard.dataset.tags = 'gaya hidup,protein';
    newCard.innerHTML = `
        <div class="reviewer-header">
            <div class="avatar avatar-1">${name.charAt(0).toUpperCase()}</div>
            <div class="reviewer-meta">
                <h4 class="reviewer-name">${name}</h4>
                <span class="reviewer-sub">1 ulasan · Baru saja</span>
            </div>
            <span class="google-badge">G</span>
        </div>
        <div class="review-stars">${'⭐'.repeat(rating)}</div>
        <p class="review-text">"${comment}"</p>
        <div class="review-meta-chips">
            <span class="chip">Pengunjung Terverifikasi</span>
        </div>
    `;

    reviewsGrid.prepend(newCard);
    closeReviewModal();
    alert('Terima kasih atas ulasan Anda! Ulasan Anda berhasil ditampilkan.');
    document.getElementById('newReviewForm').reset();
}

// 11. OPERATING HOURS STATUS CHECK
function checkOperatingHours() {
    const statusText = document.getElementById('liveStatusText');
    const badge = document.getElementById('hoursBadge');

    const now = new Date();
    const hour = now.getHours();

    // D'Choice Cafe: Open 08:00 to 00:00 (24:00)
    const isOpen = hour >= 8 || hour === 0;

    if (isOpen) {
        if (statusText) statusText.textContent = '🟢 Buka Hari Ini · 08.00 - 00.00 WITA';
        if (badge) {
            badge.textContent = '🟢 Buka Sekarang · Tutup Jam 00.00 WITA';
            badge.className = 'badge-status open';
        }
    } else {
        if (statusText) statusText.textContent = '🔴 Tutup Sekarang · Buka Jam 08.00 WITA';
        if (badge) {
            badge.textContent = '🔴 Tutup Sekarang · Buka Jam 08.00 WITA';
            badge.className = 'badge-status closed';
        }
    }
}

// 12. MOBILE NAVIGATION TOGGLE
function initMobileNav() {
    const toggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
}
