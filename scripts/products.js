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

// Exponer productos globalmente
window.restaurantProducts = products;

window.restaurantProducts = products;

// Promociones disponibles (igual que antes)
const promotions = [
    { key: 'wednesday-3x2', title: 'OFERTA MIÉRCOLES 3x2', text: '3 tablas de 12 cortes por S/40', makiCount: 3, price: 40, onlyOn: 3 },
    { key: 'bundle-48', title: 'Bundle 48', text: '48 cortes — S/70', makiCount: 4, price: 70 },
    { key: 'bundle-36', title: 'Bundle 36', text: '36 cortes — S/50 (S/40 los miércoles)', makiCount: 3, price: 50 },
    { key: 'bundle-24', title: 'Bundle 24', text: '24 cortes — S/36', makiCount: 2, price: 36 },
    { key: '12+aloe', title: '12 makis + Bebida Japonesa', text: '12 makis + Bebida Japonesa por S/23', makiCount: 1, extras: ['Bebida Japonesa'], price: 23 },
    { key: '12+poke', title: '12 makis + Poke Bowl', text: '12 makis + Poke Bowl por S/37', makiCount: 1, extras: ['Poke Bowl'], price: 37 },
    { key: 'sandwich+12', title: 'Sandwich Furai + 12 makis', text: 'Sandwich Furai + 12 makis por S/34', makiCount: 1, extras: ['Sandwich Furai'], price: 34 },
    { key: '12+crispy', title: '12 makis + Crispy Rice', text: '12 makis + Crispy Rice por S/29', makiCount: 1, extras: ['Crispy Rice'], price: 29 },
    { key: 'ramen+12', title: 'Ramen + 12 makis', text: 'Ramen + 12 makis por S/39', makiCount: 1, extras: ['Ramen'], price: 39 }
];

window.promotions = promotions;

// Control anti-doble-clic
let lastAddedProductId = null;
let lastAddedTime = 0;

// Renderizar productos según categoría y búsqueda
function renderProducts(category = 'todos', searchTerm = '') {
    const menuItemsContainer = document.getElementById('menu-items');
    if (!menuItemsContainer) return;
    menuItemsContainer.innerHTML = '';

    // === CATEGORÍA PROMOCIONES (con el mismo diseño que los productos) ===
    if (category === 'promociones') {
        const isWednesday = new Date().getDay() === 3;
        promotions.forEach(promo => {
            if (promo.onlyOn && promo.onlyOn !== new Date().getDay()) return;

            // Creamos una tarjeta con la misma clase "menu-item"
            const promoCard = document.createElement('div');
            promoCard.className = 'menu-item';

            // Imagen genérica (ícono de regalo)
            const imageHtml = `
                <div class="item-image" style="display: flex; align-items: center; justify-content: center; background: #f5f5f5;">
                    <i class="fas fa-tag" style="font-size: 4rem; color: var(--primary-color);"></i>
                </div>
            `;

            // Contenido de la tarjeta
            promoCard.innerHTML = `
                ${imageHtml}
                <div class="item-info">
                    <h3>${promo.title}</h3>
                    <p class="description">${promo.text}</p>
                    <span class="price">S/ ${promo.price.toFixed(2)}</span>
                    <div class="item-actions">
                        <button class="select-promo" data-key="${promo.key}" style="width:100%; background: var(--primary-color); color:white; border:none; padding:10px; border-radius:30px; cursor:pointer;">
                            Seleccionar promoción
                        </button>
                    </div>
                </div>
            `;
            menuItemsContainer.appendChild(promoCard);
        });

        if (!menuItemsContainer.innerHTML.trim()) {
            menuItemsContainer.innerHTML = `<div class="no-products"><i class="fas fa-tag"></i><p>No hay promociones activas por ahora</p></div>`;
        }
        return;
    }

    // === RESTO DE CATEGORÍAS (productos normales) ===
    let filteredProducts = category === 'todos' 
        ? products 
        : products.filter(product => product.category === category);
    
    if (searchTerm.trim()) {
        const lowerSearch = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(lowerSearch)
        );
    }

    if (filteredProducts.length === 0) {
        menuItemsContainer.innerHTML = `<div class="no-products"><i class="fas fa-utensils"></i><p>No hay productos disponibles</p></div>`;
        return;
    }

    filteredProducts.forEach(product => {
        const price = product.price;
        const productElement = document.createElement('div');
        productElement.className = 'menu-item';
        productElement.innerHTML = `
            <div class="item-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${!product.available ? '<span class="sold-out">Agotado</span>' : ''}
            </div>
            <div class="item-info">
                <h3>${product.name}</h3>
                <p class="description">${product.description}</p>
                <span class="price">S/ ${price.toFixed(2)} ${product.category === 'makis' ? `<span class="portion">(${product.portion} cortes)</span>` : ''}</span>
                ${product.available ? `
                <div class="item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-id="${product.id}">-</button>
                        <input type="number" class="quantity-input" value="${product.portion}" min="${product.portion}" step="${product.portion}" data-id="${product.id}">
                        <button class="quantity-btn plus" data-id="${product.id}">+</button>
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">
                        Añadir al carrito
                    </button>
                </div>
                ` : ''}
            </div>
        `;
        menuItemsContainer.appendChild(productElement);
    });
}

// Configurar filtros (igual que antes)
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            if (searchInput) searchInput.value = '';
            renderProducts(this.dataset.category);
        });
    });
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const activeFilter = document.querySelector('.filter-btn.active');
            const category = activeFilter ? activeFilter.dataset.category : 'todos';
            renderProducts(category, this.value);
        });
    }
}

// Eventos de productos (incluye anti-doble-clic)
function setupProductEvents() {
    document.addEventListener('click', function(e) {
        // Control de cantidad (productos normales)
        const quantityBtn = e.target.closest('.quantity-btn');
        if (quantityBtn) {
            const input = quantityBtn.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value) || parseInt(input.min) || 1;
            const step = parseInt(input.step) || 1;
            const min = parseInt(input.min) || step;
            if (quantityBtn.classList.contains('minus')) {
                value = Math.max(min, value - step);
            } else {
                value = value + step;
            }
            input.value = value;
            return;
        }

        // Botón "Añadir al carrito" (productos normales)
        const addToCartBtn = e.target.closest('.add-to-cart');
        if (addToCartBtn) {
            e.preventDefault();
            const now = Date.now();
            const productId = parseInt(addToCartBtn.dataset.id);
            if (lastAddedProductId === productId && (now - lastAddedTime) < 500) {
                console.log('Ignorando doble clic rápido');
                return;
            }
            lastAddedProductId = productId;
            lastAddedTime = now;

            const product = window.restaurantProducts.find(p => p.id === productId);
            if (product) {
                const quantityInput = addToCartBtn.closest('.item-actions').querySelector('.quantity-input');
                const units = parseInt(quantityInput.value) || product.portion;
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
        }

        // Botón "Seleccionar promoción" (dentro de las tarjetas de promociones)
        const selectPromoBtn = e.target.closest('.select-promo');
        if (selectPromoBtn) {
            const key = selectPromoBtn.dataset.key;
            const promo = promotions.find(p => p.key === key);
            if (promo) {
                if (window.addPromoToCartGlobal) {
                    window.addPromoToCartGlobal(promo);
                } else {
                    const event = new CustomEvent('promoSelected', { detail: { promo } });
                    document.dispatchEvent(event);
                }
            }
        }
    });
}

// Inicializar
function initProducts() {
    renderProducts('todos');
    setupFilters();
    setupProductEvents();
}

document.addEventListener('DOMContentLoaded', initProducts);