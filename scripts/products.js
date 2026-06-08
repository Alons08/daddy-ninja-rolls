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
    // Bebidas (unidad mínima 1)
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
        id: 19,
        name: 'Té Verde (Tetera)',
        description: 'Té verde en tetera',
        image: './images/menu/te-verde-tetera.jpg',
        category: 'bebidas',
        price: 8.0,
        portion: 1,
        available: true
    },
    {
        id: 20,
        name: 'Té Verde (Taza)',
        description: 'Té verde por taza',
        image: './images/menu/te-verde-taza.jpg',
        category: 'bebidas',
        price: 2.0,
        portion: 1,
        available: true
    },
    {
        id: 21,
        name: 'Té de Jazmín (Tetera)',
        description: 'Té de jazmín en tetera',
        image: './images/menu/te-jazmin-tetera.jpg',
        category: 'bebidas',
        price: 8.0,
        portion: 1,
        available: true
    },
    {
        id: 22,
        name: 'Té de Jazmín (Taza)',
        description: 'Té de jazmín por taza',
        image: './images/menu/te-jazmin-taza.jpg',
        category: 'bebidas',
        price: 2.0,
        portion: 1,
        available: true
    },
    {
        id: 23,
        name: 'Maracuyá 1L',
        description: 'Jugo de maracuyá 1 litro',
        image: './images/menu/maracuya-1l.jpg',
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
        id: 25,
        name: 'Bebida Japonesa de Aloe',
        description: 'Bebida japonesa de aloe',
        image: './images/menu/bebida-japonesa-aloe.jpg',
        category: 'bebidas',
        price: 3.0,
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
        description: 'Tonkotsu: 16 horas de cocción. Caldo a base de chancho, pollo y res, acompañado de verduras and láminas de cerdo.',
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
    }    ,
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

// Hacer el array accesible globalmente
window.restaurantProducts = products;

function getProductPrice(product) {
    return product.price;
}

function getNoResultsMessage(category, searchTerm) {
    const hasSearchText = Boolean(searchTerm.trim());

    if (hasSearchText) {
        return category === 'todos'
            ? 'No se encontraron productos con ese nombre'
            : 'No se encontraron productos con ese nombre en esta categoría';
    }

    return 'No hay productos disponibles en esta categoría';
}

function renderProducts(category = 'todos', searchTerm = '') {
    const menuItemsContainer = document.getElementById('menu-items');
    if (!menuItemsContainer) return;

    menuItemsContainer.innerHTML = '';

    // Filtrar por categoría (si es 'todos', mostrar todas)
    let filteredProducts = category === 'todos' 
        ? products 
        : products.filter(product => product.category === category);
    
    // Filtrar por búsqueda (solo en nombre, case-insensitive)
    if (searchTerm.trim()) {
        const lowerSearch = searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(lowerSearch)
        );
    }

    if (filteredProducts.length === 0) {
        const noResultsMessage = getNoResultsMessage(category, searchTerm);
        menuItemsContainer.innerHTML = `
            <div class="no-products">
                <i class="fas fa-utensils"></i>
                <p>${noResultsMessage}</p>
            </div>
        `;
        return;
    }

    const isWednesday = new Date().getDay() === 3;
    filteredProducts.forEach(product => {
        const price = getProductPrice(product);
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

    if (category === 'makis' && isWednesday) {
        const promoBanner = document.createElement('div');
        promoBanner.className = 'menu-promo-banner';
        promoBanner.innerHTML = '<strong>OFERTA MIÉRCOLES 3x2:</strong> 3 tablas de 12 cortes por S/40';
        menuItemsContainer.insertBefore(promoBanner, menuItemsContainer.firstChild);
    }
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            if (searchInput) {
                searchInput.value = '';
            }
            renderProducts(this.dataset.category);
        });
    });
}

function setupProductEvents() {
    // Evento delegado para controles de cantidad y añadir al carrito
    document.addEventListener('click', function(e) {
        // Control de cantidad (usa unidades en UI)
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
            return; // Salir para no procesar el clic como add-to-cart
        }

        // Evento para añadir al carrito
        const addToCartBtn = e.target.closest('.add-to-cart');
        if (addToCartBtn) {
            const productId = parseInt(addToCartBtn.dataset.id);
            const product = window.restaurantProducts.find(p => p.id === productId);
            if (product) {
                const quantityInput = addToCartBtn.closest('.item-actions').querySelector('.quantity-input');
                const units = parseInt(quantityInput.value) || product.portion;
                const tables = Math.max(1, Math.floor(units / product.portion));
                // Usar el precio correcto según el día
                const price = getProductPrice(product);
                // Disparar evento personalizado con la cantidad en tablas y precio correcto
                const event = new CustomEvent('productAddedToCart', {
                    detail: { product: { ...product, price }, quantity: tables }
                });
                document.dispatchEvent(event);
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
