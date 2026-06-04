// Carrito de compras con expiración
let cart = [];
let cartExpirationTimer = null;

// Cargar carrito con verificación de expiración
function loadCartWithExpiration() {
    const cartData = localStorage.getItem('cart');
    const cartTimestamp = localStorage.getItem('cartTimestamp');
    
    if (cartData && cartTimestamp) {
        const now = new Date().getTime();
        const expirationTime = 20 * 60 * 1000; // 20 minutos en milisegundos
        
        if (now - parseInt(cartTimestamp) < expirationTime) {
            cart = JSON.parse(cartData);
            startCartExpirationTimer(expirationTime - (now - parseInt(cartTimestamp)));
            updateCart(); // Actualizar la vista del carrito al cargar
            return true;
        } else {
            clearCart();
        }
    }
    return false;
}

// Guardar carrito con timestamp
function saveCartWithTimestamp() {
    if (cart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartTimestamp', new Date().getTime().toString());
        startCartExpirationTimer(20 * 60 * 1000); // 20 minutos
    } else {
        clearCart(); // Limpiar completamente si el carrito está vacío
    }
}

// Iniciar temporizador de expiración
function startCartExpirationTimer(duration) {
    if (cartExpirationTimer) clearTimeout(cartExpirationTimer);
    cartExpirationTimer = setTimeout(clearCart, duration);
}

// Limpiar carrito completamente
function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    localStorage.removeItem('cartTimestamp');
    updateCart();
    updateCartCount();
}

// Actualizar contador del carrito
function updateCartCount() {
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartElements.count) {
        cartElements.count.textContent = itemCount;
    }
}

// Elementos del DOM
const cartElements = {
    btn: document.getElementById('cart-btn'),
    modal: document.getElementById('cart-modal'),
    overlay: document.getElementById('cart-overlay'),
    items: document.getElementById('cart-items'),
    total: document.getElementById('cart-total'),
    count: document.getElementById('cart-count'),
    close: document.getElementById('close-cart'),
    close2: document.getElementById('close-cart-2'),
    checkout: document.getElementById('checkout'),
    backToCart: document.getElementById('back-to-cart'),
    cancelOrder: document.getElementById('cancel-order'),
    submitOrder: document.getElementById('submit-order'),
    form: document.getElementById('order-form'),
    deliveryType: document.getElementById('delivery-type'),
    pickupFields: document.getElementById('pickup-fields'),
    deliveryFields: document.getElementById('delivery-fields'),
    step1: document.getElementById('cart-step-1'),
    step2: document.getElementById('cart-step-2')
};

// Inicializar carrito
function initCart() {
    loadCartWithExpiration();
    setupCartEvents();
    setupDeliveryToggle();
    updateCartCount();

    // Ocultar campos de entrega al cargar
    cartElements.pickupFields.classList.remove('active');
    cartElements.deliveryFields.classList.remove('active');

    // Mostrar siempre el paso 1 al abrir el carrito
    cartElements.step1.classList.add('active');
    cartElements.step2.classList.remove('active');
}

// Configurar eventos de tipo de entrega
function setupDeliveryToggle() {
    if (cartElements.deliveryType) {
        cartElements.deliveryType.addEventListener('change', function() {
            const deliveryType = this.value;

            // Ocultar todos los campos primero
            cartElements.pickupFields.classList.remove('active');
            cartElements.deliveryFields.classList.remove('active');

            // Mostrar los campos correspondientes
            if (deliveryType === 'pickup') {
                cartElements.pickupFields.classList.add('active');
            } else if (deliveryType === 'delivery') {
                cartElements.deliveryFields.classList.add('active');
            }
        });
    }
}
    let eventsConfigured = false;

    function setupCartEvents() {
        if (eventsConfigured) return; // Evitar duplicación
        eventsConfigured = true;

        if (cartElements.btn) cartElements.btn.addEventListener('click', showCart);
        if (cartElements.close) cartElements.close.addEventListener('click', hideCart);
        if (cartElements.close2) cartElements.close2.addEventListener('click', hideCart);
        if (cartElements.overlay) cartElements.overlay.addEventListener('click', hideCart);
        if (cartElements.checkout) cartElements.checkout.addEventListener('click', goToCheckout);
        if (cartElements.backToCart) cartElements.backToCart.addEventListener('click', backToCart);
        if (cartElements.cancelOrder) cartElements.cancelOrder.addEventListener('click', backToCart);
        if (cartElements.submitOrder) cartElements.submitOrder.addEventListener('click', submitOrder);

        document.addEventListener('productAddedToCart', (e) => {
            console.log('Evento productAddedToCart disparado:', e.detail);
            addToCart(e.detail.product, e.detail.quantity);
        });
    }

// Mostrar notificación
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// Mostrar/ocultar carrito
function showCart(e) {
    if (e) e.preventDefault();
    cartElements.modal.classList.add('active');
    cartElements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Mostrar siempre el paso 1 al abrir el carrito
    cartElements.step1.classList.add('active');
    cartElements.step2.classList.remove('active');
}

function hideCart() {
    cartElements.modal.classList.remove('active');
    cartElements.overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Ir al formulario de checkout
function goToCheckout() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    
    cartElements.step1.classList.remove('active');
    cartElements.step2.classList.add('active');
}

// Volver al carrito desde el formulario
function backToCart() {
    cartElements.step2.classList.remove('active');
    cartElements.step1.classList.add('active');
}

// Actualizar vista del carrito
function updateCart() {
    if (!cartElements.items) return;
    
    cartElements.items.innerHTML = '';
    
    if (cart.length === 0) {
        cartElements.items.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        if (cartElements.total) cartElements.total.textContent = 'S/0.00';
        updateCartCount();
        saveCartWithTimestamp(); // Guardar estado vacío
        return;
    }
    
    let total = 0;
    let itemCount = 0;
    let discount = 0;
    
    cart.forEach(item => {
        const itemTotal = item.product.price * item.quantity;
        total += itemTotal;
        itemCount += item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        // Mostrar cantidad en UNIDADES en UI (ej. 6 o 12), pero conservar internamente item.quantity como tablas
        const unitsValue = item.quantity * item.product.portion;
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.product.name}</h4>
                <p>S/${item.product.price.toFixed(2)} por tabla</p>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button class="quantity-btn minus" data-id="${item.product.id}">-</button>
                    <input type="number" class="quantity-input" value="${unitsValue}" min="${item.product.portion}" step="${item.product.portion}" data-id="${item.product.id}">
                    <button class="quantity-btn plus" data-id="${item.product.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.product.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartElements.items.appendChild(cartItem);
    });
    
    if (cartElements.total) {
        const pricing = calculateBestPrice(cart);
        const totalAfterDiscount = pricing.bestTotal;
        cartElements.total.textContent = `S/${totalAfterDiscount.toFixed(2)}`;
        const discountNote = document.getElementById('cart-discount-note');
        if (pricing.discount > 0) {
            // Mostrar sólo el precio anterior para evitar duplicidad con el total a la izquierda
            const composed = `Promoción aplicada: Antes S/${total.toFixed(2)}`;

            if (!discountNote) {
                const note = document.createElement('div');
                note.id = 'cart-discount-note';
                note.className = 'cart-discount-note';
                note.textContent = composed;
                cartElements.total.parentElement.appendChild(note);
            } else {
                discountNote.textContent = composed;
            }
        } else if (discountNote) {
            discountNote.remove();
        }
    }
    updateCartCount();
    saveCartWithTimestamp();
    setupCartItemEvents();
}

// Calcula el mejor precio aplicando promociones (24, 36, 48 y miércoles 3x2)
function calculateBestPrice(cartItems) {
    // Total base (suma de todos los productos sin promociones)
    const totalBase = cartItems.reduce((s, it) => s + (it.product.price * it.quantity), 0);

    // Promo especial: 2 Onigiris = S/13 (válido todos los días)
    const onigiriPrices = [];
    cartItems.forEach(item => {
        const name = (item.product.name || '').toLowerCase();
        if (name.includes('onigiri')) {
            for (let i = 0; i < item.quantity; i++) onigiriPrices.push(item.product.price);
        }
    });
    let onigiriOriginalCost = 0;
    let onigiriPromoCost = 0;
    if (onigiriPrices.length > 0) {
        onigiriPrices.sort((a,b)=>b-a);
        onigiriOriginalCost = onigiriPrices.reduce((s,p)=>s+p,0);
        const pairs = Math.floor(onigiriPrices.length / 2);
        const leftover = onigiriPrices.length % 2;
        onigiriPromoCost = pairs * 13 + (leftover ? onigiriPrices[onigiriPrices.length - 1] : 0);
    }

    // Construir sólo las tablas de makis para la lógica de bundles (24/36/48)
    const tables = [];
    cartItems.forEach(item => {
        if (item.product.category === 'makis') {
            const units = item.product.portion / 6; // 6->1, 12->2
            for (let i = 0; i < item.quantity; i++) {
                tables.push({ units, price: item.product.price, id: item.product.id, name: item.product.name });
            }
        }
    });

    if (tables.length === 0) {
        // No hay makis: precio = totalBase pero aplicando promo onigiri si existe
        const bestTotalNoMaki = totalBase - (onigiriOriginalCost - onigiriPromoCost);
        const discount = totalBase - bestTotalNoMaki;
        const description = discount > 0 ? 'Promo Onigiris 2x S/13' : '';
        return { bestTotal: bestTotalNoMaki, discount, description };
    }

    const totalUnits = tables.reduce((s, t) => s + t.units, 0);
    const today = new Date().getDay();

    // Definir precios de bundles
    const bundle36Price = (today === 3) ? 40 : 50; // miércoles 3x2 -> 40
    const bundlesCatalog = [
        { units: 8, price: 70, name: 'Bundle 48' },
        { units: 6, price: bundle36Price, name: 'Bundle 36' },
        { units: 4, price: 36, name: 'Bundle 24' }
    ];

    // base maki y no-maki para combinaciones posteriores
    const makiBase = tables.reduce((s,t)=>s+t.price,0);
    const nonMakiBase = totalBase - makiBase;
    const nonOnigiriNonMakiBase = nonMakiBase - onigiriOriginalCost;

    // Preparar estructuras para promos combinadas (12 makis + X)
    let availableMaki = tables.slice(); // maki tables available para combos
    // Map de no-maki: id -> {price, count, category}
    const nonMakiMap = {};
    cartItems.forEach(item => {
        if (item.product.category !== 'makis') {
            const id = item.product.id;
            nonMakiMap[id] = nonMakiMap[id] || { price: item.product.price, count: 0, category: item.product.category, name: item.product.name };
            nonMakiMap[id].count += item.quantity;
        }
    });

    // Promos combinadas a aplicar (unidad maki = 2 -> 12 cortes)
    const promos = [
        { key: '12+aloe', units: 2, matchType: 'id', matchValue: 25, price: 23, label: '12 makis + Bebida Japonesa' },
        { key: '12+poke', units: 2, matchType: 'id', matchValue: 34, price: 37, label: '12 makis + Poke Bowl' },
        { key: 'sandwich+12', units: 2, matchType: 'id', matchValue: 37, price: 34, label: 'Sandwich Furai + 12 makis' },
        { key: '12+crispy', units: 2, matchType: 'id', matchValue: 35, price: 29, label: '12 makis + Crispy Rice' },
        { key: 'ramen+12', units: 2, matchType: 'category', matchValue: 'ramen', price: 39, label: 'Ramen + 12 makis' }
    ];

    // Helper: elegir un item no-maki disponible que cumpla la condición
    function pickNonMakiForPromo(matchType, matchValue) {
        // devolver id o null
        if (matchType === 'id') {
            const entry = nonMakiMap[matchValue];
            if (entry && entry.count > 0) return matchValue;
            return null;
        } else if (matchType === 'category') {
            // elegir el id disponible de esa categoría con mayor precio
            let bestId = null;
            let bestPrice = -Infinity;
            for (const id in nonMakiMap) {
                const e = nonMakiMap[id];
                if (e.category === matchValue && e.count > 0 && e.price > bestPrice) {
                    bestPrice = e.price;
                    bestId = parseInt(id);
                }
            }
            return bestId;
        }
        return null;
    }

    let promoTotalApplied = 0;
    let consumedOriginalCost = 0; // suma de precios originales consumidos por promos
    const appliedPromos = [];

    // Calcular ahorro potencial y aplicar promos greedily por mayor ahorro
    // Para simplicidad aplicamos iterativamente por orden fijo (puedo ordenar por ahorro estimado si necesario)
    promos.forEach(promo => {
        while (true) {
            if (Object.keys(nonMakiMap).length === 0) break;
            // intentar seleccionar subset de makis que sumen promo.units
            const sel = selectBestSubsetForUnits(availableMaki, promo.units);
            if (!sel) break;
            const nonMakiId = pickNonMakiForPromo(promo.matchType, promo.matchValue);
            if (!nonMakiId) break;
            // calcular costo original de los elementos seleccionados
            const makiCost = sel.reduce((s, idx) => s + availableMaki[idx].price, 0);
            const nonMakiCost = nonMakiMap[nonMakiId].price;
            const originalCost = makiCost + nonMakiCost;
            // aplicar solo si hay ventaja
            if (originalCost <= promo.price) break;
            // aplicar promo: remover makis seleccionados y decrementar nonMakiMap
            // build new availableMaki removing indices in sel
            const selSet = new Set(sel);
            const newAvailable = [];
            for (let i = 0; i < availableMaki.length; i++) if (!selSet.has(i)) newAvailable.push(availableMaki[i]);
            availableMaki = newAvailable;
            nonMakiMap[nonMakiId].count -= 1;
            promoTotalApplied += promo.price;
            consumedOriginalCost += originalCost;
            appliedPromos.push(promo.label);
        }
    });

    // Reconstruir lista de precios restantes de no-maki y onigiris restantes
    const remainingNonMakiPrices = [];
    for (const idStr in nonMakiMap) {
        const id = parseInt(idStr);
        const entry = nonMakiMap[idStr];
        for (let i = 0; i < entry.count; i++) remainingNonMakiPrices.push(entry.price);
    }
    // Separar onigiris de remainingNonMakiPrices para aplicar su promo
    const remainingOnigiriPrices = remainingNonMakiPrices.filter(p => p && p === p); // placeholder
    // Instead, rebuild remainingOnigiriPrices by scanning cartItems and subtracting consumed ones
    const remainingOnigiriList = [];
    const consumedOnigiriCount = Math.max(0, onigiriPrices.length - Math.floor(onigiriPrices.length/2)*2 - 0); // not used
    // Build remaining onigiris by looking at cartItems explicitly and nonMakiMap counts for onigiri ids
    // Simpler: recompute remainingNonMakiOriginalTotal and remainingOnigiriOriginalTotal
    let remainingNonMakiOriginalTotal = 0;
    let remainingOnigiriOriginalTotal = 0;
    let remainingOnigiriCount = 0;
    cartItems.forEach(item => {
        if (item.product.category !== 'makis') {
            const id = item.product.id;
            const beforeCount = item.quantity;
            // determine how many of this id were consumed in promos
            const consumed = (nonMakiMap[id] ? 0 : 0); // we decremented nonMakiMap counts, but original map missing entries are tricky
        }
    });

    // For accuracy, compute remaining non-maki total by summing nonMakiMap counts
    let remainingNonMakiTotal = 0;
    let remainingOnigiriArr = [];
    for (const idStr in nonMakiMap) {
        const id = parseInt(idStr);
        const e = nonMakiMap[idStr];
        remainingNonMakiTotal += e.price * e.count;
        const name = (e.name || '').toLowerCase();
        if (name.includes('onigiri')) {
            for (let i = 0; i < e.count; i++) remainingOnigiriArr.push(e.price);
        }
    }

    // Aplicar promo onigiris a remainingOnigiriArr
    remainingOnigiriArr.sort((a,b)=>b-a);
    const pairsRem = Math.floor(remainingOnigiriArr.length / 2);
    const leftoverRem = remainingOnigiriArr.length % 2;
    const remainingOnigiriPromoCost = pairsRem * 13 + (leftoverRem ? remainingOnigiriArr[remainingOnigiriArr.length - 1] : 0);
    // calcular remainingNonMaki cost after onigiri promo
    const remainingNonMakiCostAfterOnigiri = remainingNonMakiTotal - remainingOnigiriArr.reduce((s,p)=>s+p,0) + remainingOnigiriPromoCost;

    // ahora ejecutar la lógica de bundles sobre availableMaki (restantes)
    const remainingTables = availableMaki.slice();
    const remainingUnits = remainingTables.reduce((s,t)=>s+t.units,0);

    // recalcular maki original sum for remainingTables
    const remainingMakiOriginalSum = remainingTables.reduce((s,t)=>s+t.price,0);

    let bestTotalCandidate = Infinity;
    let bestDescriptionCandidate = '';

    // Probar combinaciones de bundles sobre remainingUnits
    for (let k48 = 0; k48 <= Math.floor(remainingUnits / 8); k48++) {
        for (let k36 = 0; k36 <= Math.floor((remainingUnits - k48 * 8) / 6); k36++) {
            for (let k24 = 0; k24 <= Math.floor((remainingUnits - k48 * 8 - k36 * 6) / 4); k24++) {
                const bundleList = [];
                for (let i = 0; i < k48; i++) bundleList.push({ units: 8, price: 70, name: '48'});
                for (let i = 0; i < k36; i++) bundleList.push({ units: 6, price: bundle36Price, name: (today === 3 ? 'Miércoles 36' : '36')});
                for (let i = 0; i < k24; i++) bundleList.push({ units: 4, price: 36, name: '24'});
                if (bundleList.length === 0) continue;

                const orders = [bundleList.slice().sort((a,b)=>b.units-a.units), bundleList.slice().sort((a,b)=>a.units-b.units)];
                let localBest = Infinity;
                orders.forEach(order => {
                    let rem = remainingTables.slice();
                    let cost = 0;
                    let ok = true;
                    order.forEach(bundle => {
                        const selected = selectBestSubsetForUnits(rem, bundle.units);
                        if (!selected) { ok = false; return; }
                        const selectedSet = new Set(selected);
                        // sum cost of selected
                        cost += bundle.price;
                        rem = rem.filter((_, idx) => !selectedSet.has(idx));
                    });
                    if (ok) {
                        const remCost = rem.reduce((s,t)=>s+t.price,0);
                        const totalCost = promoTotalApplied + cost + remCost + remainingNonMakiCostAfterOnigiri;
                        if (totalCost < localBest) localBest = totalCost;
                    }
                });
                if (localBest < bestTotalCandidate) {
                    bestTotalCandidate = localBest;
                    const parts = [];
                    if (k48 > 0) parts.push(`${k48}×48 (S/70)`);
                    if (k36 > 0) parts.push(`${k36}×36 (S/${bundle36Price})`);
                    if (k24 > 0) parts.push(`${k24}×24 (S/36)`);
                    bestDescriptionCandidate = parts.join(', ');
                }
            }
        }
    }

    // Caso sin bundles
    const noBundleTotal = promoTotalApplied + remainingMakiOriginalSum + remainingNonMakiCostAfterOnigiri;
    if (noBundleTotal < bestTotalCandidate) {
        bestTotalCandidate = noBundleTotal;
    }

    // Si no se modificó, tomar total base con onigiri promo aplicada y promos aplicadas
    if (!isFinite(bestTotalCandidate)) {
        bestTotalCandidate = promoTotalApplied + remainingMakiOriginalSum + remainingNonMakiCostAfterOnigiri;
    }

    let bestTotal = bestTotalCandidate;
    let bestDescription = '';
    if (appliedPromos.length > 0) bestDescription += appliedPromos.join(', ');

    // Enumerar combinaciones razonables de números de bundles
    for (let k48 = 0; k48 <= Math.floor(totalUnits / 8); k48++) {
        for (let k36 = 0; k36 <= Math.floor((totalUnits - k48 * 8) / 6); k36++) {
            for (let k24 = 0; k24 <= Math.floor((totalUnits - k48 * 8 - k36 * 6) / 4); k24++) {
                const bundleList = [];
                for (let i = 0; i < k48; i++) bundleList.push({ units: 8, price: 70, name: '48'});
                for (let i = 0; i < k36; i++) bundleList.push({ units: 6, price: bundle36Price, name: (today === 3 ? 'Miércoles 36' : '36')});
                for (let i = 0; i < k24; i++) bundleList.push({ units: 4, price: 36, name: '24'});

                if (bundleList.length === 0) continue; // sin bundles

                // Intentar asignar tablas a cada bundle usando knapsack por bundle
                let remaining = tables.slice();
                let possible = true;
                let bundlesCost = 0;

                // Intentar dos órdenes: mayor a menor y menor a mayor, quedarnos con la mejor
                const orders = [bundleList.slice().sort((a,b)=>b.units-a.units), bundleList.slice().sort((a,b)=>a.units-b.units)];
                let localBest = Infinity;
                let localDesc = '';

                orders.forEach(order => {
                    let rem = remaining.slice();
                    let cost = 0;
                    let ok = true;
                    order.forEach(bundle => {
                        const selected = selectBestSubsetForUnits(rem, bundle.units);
                        if (!selected) {
                            ok = false;
                            return;
                        }
                        // Remove selected indices from rem
                        const selectedSet = new Set(selected);
                        rem = rem.filter((_, idx) => !selectedSet.has(idx));
                        cost += bundle.price;
                    });
                    if (ok) {
                        // cost (bundles) + remaining maki tables cost
                        const remCost = rem.reduce((s,t)=>s+t.price, 0);
                        // agregar costo de items no-maki (excluyendo onigiris) y el costo promo de onigiris
                        const totalCost = cost + remCost + nonOnigiriNonMakiBase + onigiriPromoCost;
                        if (totalCost < localBest) {
                            localBest = totalCost;
                        }
                    }
                });

                if (localBest < bestTotal) {
                    bestTotal = localBest;
                    // Construir descripción legible sin valores en cero
                    const parts = [];
                    if (k48 > 0) parts.push(`${k48}×48 (S/70)`);
                    if (k36 > 0) parts.push(`${k36}×36 (S/${bundle36Price})`);
                    if (k24 > 0) parts.push(`${k24}×24 (S/36)`);
                    bestDescription = parts.length ? parts.join(', ') : '';
                }
            }
        }
    }

    const discount = totalBase - bestTotal;
    let description = '';
    if (discount > 0) {
        if (bestDescription) description = bestDescription;
        else description = 'Promoción aplicada';
        // añadir nota si la promo de onigiris fue usada
        if (onigiriOriginalCost > 0 && onigiriOriginalCost - onigiriPromoCost > 0) {
            description = description ? description + ' + Onigiris' : 'Onigiris';
        }
    }
    return { bestTotal, discount, description };
}

// Selecciona un subconjunto de tablas (items) cuya suma de unidades sea exactamente targetUnits
// y maximiza la suma de precios. Devuelve array de índices seleccionados o null si imposible.
function selectBestSubsetForUnits(items, targetUnits) {
    const n = items.length;
    const maxU = targetUnits;
    // DP: dp[u] = {value, mask}
    const dp = Array(maxU + 1).fill(null);
    dp[0] = { value: 0, mask: 0 };

    for (let i = 0; i < n; i++) {
        const w = items[i].units;
        const v = items[i].price;
        for (let u = maxU; u >= w; u--) {
            if (dp[u - w] && (!dp[u] || dp[u - w].value + v > dp[u].value)) {
                dp[u] = { value: dp[u - w].value + v, mask: dp[u - w].mask | (1 << i) };
            }
        }
    }

    if (!dp[maxU]) return null;
    // extraer índices del mask
    const mask = dp[maxU].mask;
    const indices = [];
    for (let i = 0; i < n; i++) if (mask & (1 << i)) indices.push(i);
    return indices;
}

// Configurar eventos de items del carrito
function setupCartItemEvents() {
    document.querySelectorAll('.cart-item .quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.dataset.id);
            const input = this.parentElement.querySelector('.quantity-input');
            let units = parseInt(input.value) || parseInt(input.min) || 1;
            const step = parseInt(input.step) || 1;
            const min = parseInt(input.min) || step;

            if (this.classList.contains('minus')) {
                units = Math.max(min, units - step);
            } else {
                units = units + step;
            }

            input.value = units;
            // convertir unidades a tablas antes de actualizar (cada tabla tiene item.product.portion unidades)
            const cartItem = cart.find(i => i.product.id === id);
            const tables = Math.max(1, Math.floor(units / (cartItem ? cartItem.product.portion : step)));
            updateCartItem(id, tables);
        });
    });
    
    document.querySelectorAll('.cart-item .quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const id = parseInt(this.dataset.id);
            const units = Math.max(parseInt(this.value) || parseInt(this.min) || 1, parseInt(this.min) || 1);
            this.value = units; // Asegurar que el valor sea válido
            const cartItem = cart.find(i => i.product.id === id);
            const tables = Math.max(1, Math.floor(units / (cartItem ? cartItem.product.portion : 1)));
            updateCartItem(id, tables);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            removeFromCart(parseInt(this.dataset.id));
        });
    });
}

// Funciones del carrito
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.product.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    
    updateCart();
    showNotification(`${product.name} añadido al carrito (${quantity})`, 'success');
}

function updateCartItem(id, quantity) {
    const item = cart.find(item => item.product.id === id);
    if (item) {
        item.quantity = quantity;
        updateCart();
    }
}

function removeFromCart(id) {
    cart = cart.filter(item => item.product.id !== id);
    updateCart();
}

// Validar formulario
function validateForm() {
    const form = cartElements.form;
    const deliveryType = cartElements.deliveryType.value;
    let isValid = true;

    // Limpiar estados previos de validación
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('invalid');
        const errorMsg = group.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
    });

    // Validar campos obligatorios comunes
    if (!form['customer-name'].value.trim()) {
        markFieldInvalid(form['customer-name'], 'Por favor ingresa tu nombre');
        isValid = false;
    }

    if (!form['customer-phone'].value.trim()) {
        markFieldInvalid(form['customer-phone'], 'Por favor ingresa tu teléfono');
        isValid = false;
    }

    // Validar método de pago
    const paymentSelected = form.querySelector('input[name="delivery-payment"]:checked');
    if (!paymentSelected) {
        const paymentGroup = document.querySelector('.form-group:nth-child(3)');
        paymentGroup.classList.add('invalid');
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'Por favor selecciona el método de pago';
        paymentGroup.appendChild(errorMsg);
        isValid = false;
    }

    // Validar campos específicos según el tipo de entrega
    if (deliveryType === 'delivery') {
        if (!form['delivery-address'].value.trim()) {
            markFieldInvalid(form['delivery-address'], 'Por favor ingresa la dirección de entrega');
            isValid = false;
        }
    } else if (deliveryType === 'pickup') {
        if (!form['pickup-time'].value) {
            markFieldInvalid(form['pickup-time'], 'Por favor selecciona el tiempo estimado para recoger');
            isValid = false;
        }
    } else {
        // Si no ha seleccionado tipo de entrega
        const deliveryGroup = document.querySelector('.form-group:nth-child(4)');
        deliveryGroup.classList.add('invalid');
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = 'Por favor selecciona el tipo de entrega';
        deliveryGroup.appendChild(errorMsg);
        isValid = false;
    }

    if (!isValid) {
        // Hacer scroll al primer error
        const firstError = document.querySelector('.invalid');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    return isValid;
}

// Función auxiliar para marcar campos inválidos
function markFieldInvalid(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('invalid');
    
    const errorMsg = document.createElement('div');
    errorMsg.className = 'error-message';
    errorMsg.textContent = message;
    formGroup.appendChild(errorMsg);
}

// Enviar pedido
function submitOrder() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    
    if (!validateForm()) {
        return;
    }
    
    const form = cartElements.form;
    const deliveryType = cartElements.deliveryType.value;
    
    // Obtener datos del formulario
    const customerName = form['customer-name'].value.trim();
    const customerPhone = form['customer-phone'].value.trim();
    const paymentMethod = form.querySelector('input[name="delivery-payment"]:checked').value; // Asignación común

    let deliveryInfo = ''; //ESTO SE AGREGO AL FINALLLLL
    
    if (deliveryType === 'pickup') {
        const pickupTime = form['pickup-time'].value;
        const notes = form['pickup-notes'].value.trim();

        // Construir mensaje para recoger en el local
        deliveryInfo = `🏠 *Recoger en el Local*\n` +
                       `⏳ *Tiempo estimado:* ${pickupTime} minutos\n` +
                      (notes ? `📝 *Observaciones:* ${notes}\n` : '');
    } else if (deliveryType === 'delivery') {
        const address = form['delivery-address'].value.trim();
        const notes = form['delivery-notes'].value.trim();

        // Construir mensaje para delivery
        deliveryInfo = `🚚 *Delivery*\n` +
                    `🗺️ *Dirección:* ${address}\n` +
                    (notes ? `📝 *Observaciones:* ${notes}\n` : '');
    }

    // Construir mensaje para WhatsApp
    let message = `¡Hola Daddy Ninja Rolls! Quiero realizar el siguiente pedido:\n\n`;
    message += `*DATOS DEL CLIENTE*\n`;
    message += `🙍‍♂️ *Nombre:* ${customerName}\n`;
    message += `📞 *Teléfono:* ${customerPhone}\n`;
    message += `💳 *Método de Pago:* ${paymentMethod}\n\n`; // Método de pago solo aquí

    message += `*DETALLES DE ENTREGA*\n`;
    message += deliveryInfo + '\n';

    message += `🍽️ *PEDIDO*\n`;
    cart.forEach(item => {
        message += `- ${item.product.name} (x${item.quantity}): S/${(item.product.price * item.quantity).toFixed(2)}\n`;
    });

    const baseTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const pricing = calculateBestPrice(cart);
    if (pricing.discount > 0) {
        message += `\nTotal a pagar: S/${pricing.bestTotal.toFixed(2)} (Antes S/${baseTotal.toFixed(2)}, ahorras S/${pricing.discount.toFixed(2)})\n`;
        if (pricing.description) message += `Promoción aplicada: ${pricing.description}\n`;
    } else {
        message += `\nTotal a pagar: S/${baseTotal.toFixed(2)}\n`;
    }
    message += `\nPor favor, confirmen mi pedido. ¡Gracias!`;
            
    // Abrir WhatsApp 931088900 mio
    const whatsappUrl = `https://wa.me/51910089308?text=${encodeURIComponent(message)}`; /*AQUI EL NUMERO*/
    window.open(whatsappUrl, '_blank');
    
    hideCart(); //ocultar el carrito
    showNotification('Enviando pedido correctamente por WhatsApp', 'success'); // Notificación en pantalla de éxito
    clearCart(); // Limpiar carrito
    resetForm(); // Resetear formulario
 
}

// Resetear formulario
function resetForm() {
    if (cartElements.form) {
        cartElements.form.reset(); // Limpia los valores del formulario estándar

        // Limpia los campos dinámicos manualmente
        document.getElementById('pickup-notes').value = ''; // Observaciones para recoger en el local
        document.getElementById('pickup-time').value = ''; // Tiempo estimado para recoger
        document.getElementById('delivery-address').value = ''; // Dirección de entrega
        document.getElementById('delivery-notes').value = ''; // Observaciones para delivery

        // Oculta los campos específicos
        cartElements.pickupFields.classList.remove('active');
        cartElements.deliveryFields.classList.remove('active');
    }
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', initCart);
