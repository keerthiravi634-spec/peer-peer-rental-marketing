const initialRentals = [
    {
        id: 1,
        title: "Sony Alpha A7 IV Mirrorless Camera",
        category: "Electronics",
        owner: "Ravi K.",
        rate: 1500,
        deposit: 5000,
        rating: 4.9,
        reviewsCount: 14,
        img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
        desc: "4K Video, 33MP Full-Frame sensor with 2 lenses included."
    },
    {
        id: 2,
        title: "DeWalt Cordless Power Drill Set",
        category: "Tools",
        owner: "Arun M.",
        rate: 450,
        deposit: 1500,
        rating: 4.7,
        reviewsCount: 8,
        img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500",
        desc: "Heavy duty battery drill with complete screw and drill bit kit."
    },
    {
        id: 3,
        title: "DJI Mini 3 Pro Drone with Controller",
        category: "Electronics",
        owner: "Priya S.",
        rate: 2200,
        deposit: 8000,
        rating: 5.0,
        reviewsCount: 22,
        img: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500",
        desc: "4K HDR video camera, obstacle sensing, 34-min flight time per battery."
    }
];


if (!localStorage.getItem('rental_items')) {
    localStorage.setItem('rental_items', JSON.stringify(initialRentals));
}

document.addEventListener('DOMContentLoaded', () => {
    updateNavCartBadge();
    checkActiveSession();
});

function getItems() {
    return JSON.parse(localStorage.getItem('rental_items')) || [];
}

function getCart() {
    return JSON.parse(localStorage.getItem('rental_cart')) || [];
}

function updateNavCartBadge() {
    const cart = getCart();
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => b.textContent = cart.length);
}


function viewItemDetails(id) {
    const items = getItems();
    const item = items.find(i => i.id === id);
    if (item) {
        localStorage.setItem('current_selected_item', JSON.stringify(item));
        window.location.href = 'listing-details.html';
    }
}


function checkActiveSession() {
    const user = JSON.parse(localStorage.getItem('rental_active_user'));
    const slot = document.getElementById('auth-slot');
    if (slot) {
        if (user) {
            slot.innerHTML = `
                <a href="dashboard.html" class="btn btn-outline-primary btn-sm"><i class="bi bi-person-fill"></i> ${user.name}</a>
                <button onclick="logout()" class="btn btn-danger btn-sm">Logout</button>
            `;
        } else {
            slot.innerHTML = `
                <a href="login.html" class="btn btn-light btn-sm">Login</a>
                <a href="register.html" class="btn btn-primary btn-sm">Register</a>
            `;
        }
    }
}

function logout() {
    localStorage.removeItem('rental_active_user');
    window.location.href = 'index.html';
}