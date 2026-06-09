// Array completo de productos
const products = [
    {
        id: 1,
        name: 'California',
        description: 'Maki relleno de queso crema, palta y salmón, cubierto con ajonjolí.',
        image: './images/menu/california.jpg',
        category: 'makis',
        price: 20,
        portion: 12,
        available: true
    },
    {
        id: 2,
        name: 'Acevichado',
        description: 'Arroz, nori, ebi y palta, cubierto con láminas de salmón y salsa acevichada.',
        image: './images/menu/acevichado.jpg',
        category: 'makis',
        price: 10,
        portion: 6,
        available: true
    },
    {
        id: 3,
        name: 'Furai',
        description: 'Arroz, palta, trucha y queso crema, rebozado en panko y frito.',
        image: './images/menu/furai.jpg',
        category: 'makis',
        price: 20,
        portion: 12,
        available: true
    },
    {
        id: 4,
        name: 'Parrillero',
        description: 'Arroz, nori, ebi y palta, cubierto con láminas de lomo flameado en salsa parrillero.',
        image: './images/menu/parrillero.jpg',
        category: 'makis',
        price: 20,
        portion: 12,
        available: true
    },
    {
        id: 5,
        name: 'Ninja',
        description: 'Arroz, nori, ebi y palta, forrado en queso crema y flameado en salsa chimichurri.',
        image: './images/menu/ninja.jpg',
        category: 'makis',
        price: 10,
        portion: 6,
        available: true
    },
    {
        id: 6,
        name: 'Dragon',
        description: 'Arroz, nori, ebi y queso crema, forrado en palta y flameado con salsa imperial.',
        image: './images/menu/dragon.jpg',
        category: 'makis',
        price: 20,
        portion: 12,
        available: true
    },
    {
        id: 7,
        name: 'Avocado',
        description: 'Arroz, nori, ebi y queso crema, forrado en láminas de palta flameada.',
        image: './images/menu/avocado.jpg',
        category: 'makis',
        price: 20,
        portion: 12,
        available: true
    },
    {
        id: 8,
        name: 'Lemon',
        description: 'Shari, nori, ebi y queso crema, forrado en láminas de salmón y limón.',
        image: './images/menu/lemon.jpg',
        category: 'makis',
        price: 20,
        portion: 12,
        available: true
    },
    {
        id: 9,
        name: 'Seiji',
        description: 'Arroz, nori, ebi y palta tempurizado con salsa secreta de la casa.',
        image: './images/menu/seiji.jpg',
        category: 'makis',
        price: 20,
        portion: 12,
        available: true
    },
    {
        id: 10,
        name: 'Sonrise',
        description: 'Arroz, ebi y palta envuelto en nori, cubierto con tartar de salmón.',
        image: './images/menu/sonrise.jpg',
        category: 'makis',
        price: 20,
        portion: 12,
        available: true
    },
    {
        id: 11,
        name: 'Imperial',
        description: 'Shari, ebi y palta forrado en salmón, bañado en salsa imperial y tare.',
        image: './images/menu/imperial.jpg',
        category: 'makis',
        price: 10,
        portion: 6,
        available: true
    },
    {
        id: 12,
        name: 'Passion',
        description: 'Shari, nori, ebi y queso crema, cubierto con mango brulee.',
        image: './images/menu/passion.jpg',
        category: 'makis',
        price: 10,
        portion: 6,
        available: true
    },
    {
        id: 13,
        name: 'Volcan',
        description: 'Shari, ebi, palta y queso crema, forrado en nori y flameado con salsa spicy.',
        image: './images/menu/volcan.jpg',
        category: 'makis',
        price: 10,
        portion: 6,
        available: true
    },
    {
        id: 14,
        name: 'Daddy',
        description: 'Arroz y salmón empanizado con palta, queso crema y cobertura de plátano en salsa dulce.',
        image: './images/menu/daddy.jpg',
        category: 'makis',
        price: 20,
        portion: 12,
        available: true
    },
    {
        id: 15,
        name: 'Fokin Ninja',
        description: 'Arroz, salmón, palta y queso crema, forrado en nori frito con tartar de langostino ahumado.',
        image: './images/menu/fokin-ninja.jpg',
        category: 'makis',
        price: 20,
        portion: 12,
        available: true
    },
    // Bebidas
    {
        id: 16,
        name: 'Coca Cola 500ml',
        description: 'Gaseosa Coca Cola 500ml',
        image: './images/menu/gaseosa-coca-500ml.jpg',
        category: 'bebidas',
        price: 4.5,
        portion: 1,
        available: true
    },
    {
        id: 17,
        name: 'Inca Kola 500ml',
        description: 'Gaseosa Inca Kola 500ml',
        image: './images/menu/gaseosa-inka-500ml.jpg',
        category: 'bebidas',
        price: 4.5,
        portion: 1,
        available: true
    },
    {
        id: 18,
        name: 'Agua mineral',
        description: 'Agua mineral',
        image: './images/menu/agua-mineral.jpg',
        category: 'bebidas',
        price: 3.0,
        portion: 1,
        available: true
    },
    {
        id: 23,
        name: 'Maracuyá 1L',
        description: 'Jugo de maracuyá 1 litro',
        image: './images/menu/maracuya.jpg',
        category: 'bebidas',
        price: 14.0,
        portion: 1,
        available: true
    },
    {
        id: 24,
        name: 'Chicha Morada',
        description: 'Chicha morada tradicional',
        image: './images/menu/chicha-morada.jpg',
        category: 'bebidas',
        price: 14.0,
        portion: 1,
        available: true
    },
    {
        id: 26,
        name: 'Milkis',
        description: 'Bebida Milkis',
        image: './images/menu/milkis.jpg',
        category: 'bebidas',
        price: 8.0,
        portion: 1,
        available: true
    },
    {
        id: 27,
        name: 'Soju',
        description: 'Soju',
        image: './images/menu/soju.jpg',
        category: 'bebidas',
        price: 15.0,
        portion: 1,
        available: true
    },
    {
        id: 28,
        name: 'Sake',
        description: 'Sake',
        image: './images/menu/sake.jpg',
        category: 'bebidas',
        price: 13.0,
        portion: 1,
        available: true
    },
    // Ramen
    {
        id: 29,
        name: 'Chassu',
        description: 'Chassu: 16 horas de cocción. Caldo a base de chancho, pollo y res, acompañado de láminas de cerdo.',
        image: './images/menu/chassu.jpg',
        category: 'ramen',
        price: 25.0,
        portion: 1,
        available: true
    },
    {
        id: 30,
        name: 'Tonkotsu',
        description: 'Tonkotsu: 16 horas de cocción. Caldo a base de chancho, pollo y res, acompañado de verduras y láminas de cerdo.',
        image: './images/menu/tonkotsu-ramen.jpg',
        category: 'ramen',
        price: 24.0,
        portion: 1,
        available: true
    },
    {
        id: 31,
        name: 'Shio',
        description: 'Shio: Caldo claro y dorado elaborado con pollo y algas. Sabor limpio y sutil, combina a la perfección con fideos.',
        image: './images/menu/shio.jpg',
        category: 'ramen',
        price: 20.0,
        portion: 1,
        available: true
    },
    // Platos de fondo
    {
        id: 32,
        name: 'Chicken Katsu',
        description: 'Croccante filete de pollo al panko (incluye arroz blanco y ensalada).',
        image: './images/menu/chicken-katsu.jpg',
        category: 'platos-de-fondo',
        price: 20.0,
        portion: 1,
        available: true
    },
    {
        id: 33,
        name: 'Tonkatsu',
        description: 'Croccante filete de chancho al panko (incluye arroz blanco y ensalada).',
        image: './images/menu/tonkatsu-plato.jpg',
        category: 'platos-de-fondo',
        price: 21.0,
        portion: 1,
        available: true
    },
    {
        id: 34,
        name: 'Poke Bowls',
        description: 'Arroz de makis, zanahoria, cebolla, kiuri, palta, langostinos empanizados y bañado en salsa acevichada.',
        image: './images/menu/poke-bowls.jpg',
        category: 'platos-de-fondo',
        price: 20.0,
        portion: 1,
        available: true
    },
    // Entradas
    {
        id: 35,
        name: 'Crispy Rice',
        description: '6 unidades de arroz frito en panko con tartar de salmón.',
        image: './images/menu/crispy-rice.jpg',
        category: 'entradas',
        price: 12.0,
        portion: 1,
        available: true
    },
    {
        id: 36,
        name: 'Ebi Furai',
        description: '6 unidades de langostinos fritos con panko acompañado de una salsa dulce.',
        image: './images/menu/ebi-furai.jpg',
        category: 'entradas',
        price: 18.0,
        portion: 1,
        available: true
    },
    {
        id: 37,
        name: 'Sandwich Furai',
        description: '4 unidades de sándwich de arroz empanizado y frito con relleno de queso crema, palta y salmón.',
        image: './images/menu/sandwich-furai.jpg',
        category: 'entradas',
        price: 18.0,
        portion: 1,
        available: true
    },
    {
        id: 38,
        name: 'Onigiri (Frito)',
        description: '1 unidad de Onigiri frito.',
        image: './images/menu/onigiri-frito.jpg',
        category: 'entradas',
        price: 8.0,
        portion: 1,
        available: true
    },
    {
        id: 39,
        name: 'Onigiri (Tradicional)',
        description: '1 unidad de Onigiri tradicional.',
        image: './images/menu/onigiri-tradicional.jpg',
        category: 'entradas',
        price: 7.0,
        portion: 1,
        available: true
    },
    {
        id: 40,
        name: 'Gyozas',
        description: '6 unidades de empanadillas japonesas rellenas de carne de cerdo, pollo y verduras.',
        image: './images/menu/gyozas.jpg',
        category: 'entradas',
        price: 16.0,
        portion: 1,
        available: true
    },
    {
        id: 41,
        name: 'Age Gyozas',
        description: '6 unidades de empanadillas fritas japonesas rellenas de carne de cerdo y pollo.',
        image: './images/menu/age-gyozas.jpg',
        category: 'entradas',
        price: 17.0,
        portion: 1,
        available: true
    },
    {
        id: 42,
        name: 'Alitas Acevichadas (6 unidades)',
        description: 'Alitas con crema acevichada (6 unidades).',
        image: './images/menu/alitas-acevichadas.jpg',
        category: 'alitas',
        price: 18.0,
        portion: 1,
        available: true
    },
    {
        id: 43,
        name: 'Alitas Tare (6 unidades)',
        description: 'Alitas con crema tare (6 unidades).',
        image: './images/menu/alitas-tare.jpg',
        category: 'alitas',
        price: 18.0,
        portion: 1,
        available: true
    },
    {
        id: 44,
        name: 'Alitas Ninja (6 unidades)',
        description: 'Alitas con salsa imperial semi picante (6 unidades).',
        image: './images/menu/alitas-ninja.jpg',
        category: 'alitas',
        price: 18.0,
        portion: 1,
        available: true
    },
    {
        id: 50,
        name: 'Alitas BBQ (6 unidades)',
        description: 'Alitas con salsa BBQ (6 unidades).',
        image: './images/menu/alitas-bbq.jpg',
        category: 'alitas',
        price: 18.0,
        portion: 1,
        available: true
    }
];

window.restaurantProducts = products;

// Array de promociones
const promotions = [
    { key: 'wednesday-3x2', title: 'OFERTA MIÉRCOLES 3x2', text: '3 tablas de 12 cortes por S/40', makiCount: 3, price: 40, onlyOn: 3 },
    { key: 'bundle-48', title: '48 Makis', text: '4 tablas de 12 cortes — S/70', makiCount: 4, price: 70 },
    { key: 'bundle-36', title: '36 Makis', text: '3 tablas de 12 cortes — S/50 (S/40 los miércoles)', makiCount: 3, price: 50 },
    { key: 'bundle-24', title: '24 Makis', text: '2 tablas de 12 cortes — S/36', makiCount: 2, price: 36 },
    { key: '12+aloe', title: '12 Makis + Bebida Japonesa', text: '1 tabla de 12 cortes + Bebida Japonesa — S/23', makiCount: 1, extras: ['Bebida Japonesa'], price: 23 },
    { key: '12+poke', title: '12 Makis + Poke Bowl', text: '1 tabla de 12 cortes + Poke Bowl — S/37', makiCount: 1, extras: ['Poke Bowl'], price: 37 },
    { key: 'sandwich+12', title: 'Sandwich Furai + 12 Makis', text: 'Sandwich Furai + 1 tabla de 12 cortes — S/34', makiCount: 1, extras: ['Sandwich Furai'], price: 34 },
    { key: '12+crispy', title: '12 Makis + Crispy Rice', text: '1 tabla de 12 cortes + Crispy Rice — S/29', makiCount: 1, extras: ['Crispy Rice'], price: 29 },
    { key: 'ramen+12', title: 'Ramen + 12 Makis', text: 'Ramen + 1 tabla de 12 cortes — S/39', makiCount: 1, extras: ['Ramen'], price: 39 }
];

window.promotions = promotions;

let lastAddedProductId = null;
let lastAddedTime = 0;

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function renderProducts(category = 'todos', searchTerm = '') {
    const menuItemsContainer = document.getElementById('menu-items');
    if (!menuItemsContainer) return;
    menuItemsContainer.innerHTML = '';

    if (category === 'promociones') {
        const today = new Date().getDay();
        promotions.forEach(promo => {
            if (promo.onlyOn && promo.onlyOn !== today) return;

            const promoCard = document.createElement('div');
            promoCard.className = 'menu-item';
            promoCard.innerHTML = `
                <div class="item-image" style="display: flex; align-items: center; justify-content: center; background: #f5f5f5;">
                    <i class="fas fa-gift" style="font-size: 4rem; color: var(--primary-color);"></i>
                </div>
                <div class="item-info">
                    <h3>${escapeHtml(promo.title)}</h3>
                    <p class="description">${escapeHtml(promo.text)}</p>
                    <span class="price">S/ ${promo.price.toFixed(2)}</span>
                    <div class="item-actions">
                        <button class="select-promo" data-key="${promo.key}">Seleccionar promoción</button>
                    </div>
                </div>
            `;
            menuItemsContainer.appendChild(promoCard);
        });

        if (menuItemsContainer.children.length === 0) {
            menuItemsContainer.innerHTML = '<div class="no-products"><i class="fas fa-tag"></i><p>No hay promociones activas por ahora</p></div>';
        }
        return;
    }

    // Resto de categorías (productos normales)
    let filteredProducts = category === 'todos'
        ? products
        : products.filter(p => p.category === category);

    if (searchTerm.trim()) {
        const lower = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(lower));
    }

    if (filteredProducts.length === 0) {
        menuItemsContainer.innerHTML = '<div class="no-products"><i class="fas fa-utensils"></i><p>No hay productos disponibles</p></div>';
        return;
    }

    filteredProducts.forEach(product => {
        const productEl = document.createElement('div');
        productEl.className = 'menu-item';
        productEl.innerHTML = `
            <div class="item-image">
                <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy">
                ${!product.available ? '<span class="sold-out">Agotado</span>' : ''}
            </div>
            <div class="item-info">
                <h3>${escapeHtml(product.name)}</h3>
                <p class="description">${escapeHtml(product.description)}</p>
                <span class="price">S/ ${product.price.toFixed(2)} ${product.category === 'makis' ? `<span class="portion">(${product.portion} cortes)</span>` : ''}</span>
                ${product.available ? `
                <div class="item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-id="${product.id}">-</button>
                        <span class="quantity-value" data-id="${product.id}">${product.portion}</span>
                        <button class="quantity-btn plus" data-id="${product.id}">+</button>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">Añadir al carrito</button>
                </div>
                ` : ''}
            </div>
        `;
        menuItemsContainer.appendChild(productEl);
    });
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (searchInput) searchInput.value = '';
            renderProducts(this.dataset.category);
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const active = document.querySelector('.filter-btn.active');
            const cat = active ? active.dataset.category : 'todos';
            renderProducts(cat, this.value);
        });
    }
}

function setupProductEvents() {
    document.addEventListener('click', function(e) {
        // Controles de cantidad
        const btn = e.target.closest('.quantity-btn');
        if (btn) {
            const container = btn.closest('.quantity-control');
            const valueSpan = container.querySelector('.quantity-value');
            let val = parseInt(valueSpan.textContent) || 1;
            const productId = parseInt(btn.dataset.id);
            const product = products.find(p => p.id === productId);
            if (!product) return;
            const step = product.portion;
            const min = step;
            if (btn.classList.contains('minus')) {
                val = Math.max(min, val - step);
            } else {
                val = val + step;
            }
            valueSpan.textContent = val;
            return;
        }

        // Añadir producto normal al carrito
        const addBtn = e.target.closest('.add-to-cart');
        if (addBtn) {
            const productId = parseInt(addBtn.dataset.id);
            const product = products.find(p => p.id === productId);
            if (!product) return;

            const container = addBtn.closest('.item-actions').querySelector('.quantity-control');
            const valueSpan = container.querySelector('.quantity-value');
            let units = parseInt(valueSpan.textContent) || product.portion;
            const tables = Math.max(1, Math.floor(units / product.portion));

            if (window.addToCartGlobal) {
                window.addToCartGlobal({ ...product, price: product.price }, tables);
            } else {
                const event = new CustomEvent('productAddedToCart', {
                    detail: { product: { ...product, price: product.price }, quantity: tables }
                });
                document.dispatchEvent(event);
            }
        }

        // Seleccionar promoción
        const selectPromoBtn = e.target.closest('.select-promo');
        if (selectPromoBtn) {
            const key = selectPromoBtn.dataset.key;
            const promo = promotions.find(p => p.key === key);
            if (promo && window.addPromoToCartGlobal) {
                window.addPromoToCartGlobal(promo);
            }
        }
    });
}

function initProducts() {
    renderProducts('todos');
    setupFilters();
    setupProductEvents();
}

document.addEventListener('DOMContentLoaded', initProducts);