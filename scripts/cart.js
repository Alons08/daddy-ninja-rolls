let cart = [];
let cartExpirationTimer = null;
const CART_TTL = 20 * 60 * 1000; // 20 minutos

const cartElements = {
    btn: null, modal: null, overlay: null, items: null, total: null, count: null,
    close: null, close2: null, checkout: null, backToCart: null, cancelOrder: null,
    submitOrder: null, form: null, deliveryType: null, pickupFields: null,
    deliveryFields: null, step1: null, step2: null
};

function initCartElements() {
    cartElements.btn = document.getElementById('cart-btn');
    cartElements.modal = document.getElementById('cart-modal');
    cartElements.overlay = document.getElementById('cart-overlay');
    cartElements.items = document.getElementById('cart-items');
    cartElements.total = document.getElementById('cart-total');
    cartElements.count = document.getElementById('cart-count');
    cartElements.close = document.getElementById('close-cart');
    cartElements.close2 = document.getElementById('close-cart-2');
    cartElements.checkout = document.getElementById('checkout');
    cartElements.backToCart = document.getElementById('back-to-cart');
    cartElements.cancelOrder = document.getElementById('cancel-order');
    cartElements.submitOrder = document.getElementById('submit-order');
    cartElements.form = document.getElementById('order-form');
    cartElements.deliveryType = document.getElementById('delivery-type');
    cartElements.pickupFields = document.getElementById('pickup-fields');
    cartElements.deliveryFields = document.getElementById('delivery-fields');
    cartElements.step1 = document.getElementById('cart-step-1');
    cartElements.step2 = document.getElementById('cart-step-2');
}

function loadCartWithExpiration() {
    const cartData = localStorage.getItem('cart');
    const cartTimestamp = localStorage.getItem('cartTimestamp');
    if (cartData && cartTimestamp) {
        const now = Date.now();
        const diff = now - parseInt(cartTimestamp, 10);
        if (diff < CART_TTL) {
            try {
                cart = JSON.parse(cartData);
                return true;
            } catch(e) { cart = []; }
        }
    }
    cart = [];
    return false;
}

function saveCartWithTimestamp() {
    if (cart.length > 0) {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('cartTimestamp', Date.now().toString());
        startCartExpirationTimer(CART_TTL);
    } else {
        clearCart();
    }
}

function startCartExpirationTimer(duration) {
    if (cartExpirationTimer) clearTimeout(cartExpirationTimer);
    cartExpirationTimer = setTimeout(() => {
        clearCart();
        showNotification('El carrito expiró por inactividad', 'error');
    }, duration);
}

function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    localStorage.removeItem('cartTimestamp');
    updateCart();
    updateCartCount();
}

function updateCartCount() {
    const itemCount = cart.reduce((s, it) => s + (it.type === 'promo' ? 1 : it.quantity), 0);
    if (cartElements.count) cartElements.count.textContent = itemCount;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;
    notification.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : 'times'}"></i><span>${message}</span>`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 400);
    }, 2000);
}

function showCart(e) {
    if (e) e.preventDefault();
    cartElements.modal.classList.add('active');
    cartElements.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    cartElements.step1.classList.add('active');
    cartElements.step2.classList.remove('active');
}

function hideCart() {
    cartElements.modal.classList.remove('active');
    cartElements.overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function goToCheckout() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    for (let item of cart) {
        if (item.type === 'promo' && item.makiCount > 0 && item.flavors.some(f => f === null)) {
            showNotification('Por favor selecciona todos los sabores de los makis en las promociones', 'error');
            return;
        }
    }
    cartElements.step1.classList.remove('active');
    cartElements.step2.classList.add('active');
}

function backToCart() {
    cartElements.step2.classList.remove('active');
    cartElements.step1.classList.add('active');
}

// Agregar producto normal (sin promoción)
function addToCart(product, quantity = 1) {
    const existing = cart.find(i => i.type === 'product' && i.product.id === product.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ type: 'product', product, quantity });
    }
    updateCart();
    showNotification(`${product.name} añadido al carrito (${quantity} tabla(s))`, 'success');
}

// Agregar promoción especial
function addPromoToCart(promo) {
    const existing = cart.find(i => i.type === 'promo' && i.promoKey === promo.key);
    if (existing) {
        showNotification('Esta promoción ya está en el carrito', 'error');
        return;
    }
    const makiCount = promo.makiCount || 0;
    const extras = promo.extras || [];
    cart.push({
        type: 'promo',
        promoKey: promo.key,
        title: promo.title,
        price: promo.price,
        quantity: 1,
        makiCount: makiCount,
        extras: extras,
        flavors: new Array(makiCount).fill(null)
    });
    updateCart();
    showNotification(`${promo.title} agregada al carrito. Elige los sabores.`, 'success');
}

// Exponer funciones globalmente para que products.js las use directamente
window.addToCartGlobal = addToCart;
window.addPromoToCartGlobal = addPromoToCart;

function updateCart() {
    if (!cartElements.items) return;
    cartElements.items.innerHTML = '';
    if (cart.length === 0) {
        cartElements.items.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
        cartElements.total.textContent = 'S/0.00';
        updateCartCount();
        saveCartWithTimestamp();
        return;
    }

    let total = 0;
    const makis12 = window.restaurantProducts.filter(p => p.category === 'makis' && p.portion === 12);

    cart.forEach((item, idx) => {
        if (item.type === 'product') {
            total += item.product.price * item.quantity;
            const unitsValue = item.quantity * item.product.portion;
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.product.name}</h4>
                    <p>S/${item.product.price.toFixed(2)} por tabla</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-idx="${idx}" data-type="product">-</button>
                        <input type="number" class="quantity-input" value="${unitsValue}" min="${item.product.portion}" step="${item.product.portion}" data-idx="${idx}" data-type="product">
                        <button class="quantity-btn plus" data-idx="${idx}" data-type="product">+</button>
                    </div>
                    <button class="remove-item" data-idx="${idx}" data-type="product">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartElements.items.appendChild(cartItemDiv);
        } 
        else if (item.type === 'promo') {
            total += item.price;
            const promoDiv = document.createElement('div');
            promoDiv.className = 'cart-item promo-item';
            let promoHtml = `<div class="cart-item-info"><strong>${item.title}</strong><br>Precio: S/${item.price.toFixed(2)}<br>`;
            if (item.makiCount > 0) {
                promoHtml += `<div class="promo-flavors-title">Incluye ${item.makiCount} tabla(s) de 12 cortes. Elige los sabores:</div>`;
            }
            promoHtml += `</div>`;
            promoDiv.innerHTML = promoHtml;

            if (item.makiCount > 0) {
                for (let i = 0; i < item.makiCount; i++) {
                    const selectedId = item.flavors[i] || '';
                    const options = makis12.map(m => `<option value="${m.id}" ${m.id === selectedId ? 'selected' : ''}>${m.name}</option>`).join('');
                    const selectorDiv = document.createElement('div');
                    selectorDiv.className = 'flavor-selector';
                    selectorDiv.style.marginTop = '8px';
                    selectorDiv.innerHTML = `
                        <label>Maki ${i+1}: 
                            <select class="promo-flavor-select" data-idx="${idx}" data-pos="${i}">
                                <option value="">-- Seleccionar sabor --</option>
                                ${options}
                            </select>
                        </label>
                    `;
                    promoDiv.appendChild(selectorDiv);
                }
            }

            if (item.extras && item.extras.length) {
                const extrasDiv = document.createElement('div');
                extrasDiv.className = 'promo-extras';
                extrasDiv.style.marginTop = '8px';
                extrasDiv.style.fontSize = '0.9em';
                extrasDiv.innerHTML = `<strong>Incluye además:</strong> ${item.extras.join(', ')}`;
                promoDiv.appendChild(extrasDiv);
            }

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-item promo-remove';
            removeBtn.setAttribute('data-idx', idx);
            removeBtn.setAttribute('data-type', 'promo');
            removeBtn.style.marginTop = '12px';
            removeBtn.innerHTML = '<i class="fas fa-trash"></i> Eliminar promoción';
            promoDiv.appendChild(removeBtn);
            cartElements.items.appendChild(promoDiv);
        }
    });

    cartElements.total.textContent = `S/${total.toFixed(2)}`;
    updateCartCount();
    saveCartWithTimestamp();
    attachCartItemEvents();
}

function attachCartItemEvents() {
    document.querySelectorAll('.cart-item .quantity-btn').forEach(btn => {
        btn.removeEventListener('click', handleQuantityClick);
        btn.addEventListener('click', handleQuantityClick);
    });
    document.querySelectorAll('.cart-item .quantity-input').forEach(input => {
        input.removeEventListener('change', handleQuantityChange);
        input.addEventListener('change', handleQuantityChange);
    });
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.removeEventListener('click', handleRemoveClick);
        btn.addEventListener('click', handleRemoveClick);
    });
    document.querySelectorAll('.promo-flavor-select').forEach(select => {
        select.removeEventListener('change', handleFlavorChange);
        select.addEventListener('change', handleFlavorChange);
    });
}

function handleQuantityClick(e) {
    const btn = e.currentTarget;
    const idx = parseInt(btn.dataset.idx);
    const type = btn.dataset.type;
    if (type !== 'product') return;
    const input = btn.parentElement.querySelector('.quantity-input');
    let units = parseInt(input.value) || 1;
    const step = parseInt(input.step) || 1;
    const min = parseInt(input.min) || step;
    if (btn.classList.contains('minus')) {
        units = Math.max(min, units - step);
    } else {
        units = units + step;
    }
    input.value = units;
    const item = cart[idx];
    if (item && item.type === 'product') {
        const tables = Math.max(1, Math.floor(units / item.product.portion));
        item.quantity = tables;
        updateCart();
    }
}

function handleQuantityChange(e) {
    const input = e.currentTarget;
    const idx = parseInt(input.dataset.idx);
    const type = input.dataset.type;
    if (type !== 'product') return;
    let units = parseInt(input.value) || 1;
    const min = parseInt(input.min) || 1;
    units = Math.max(units, min);
    input.value = units;
    const item = cart[idx];
    if (item && item.type === 'product') {
        const tables = Math.max(1, Math.floor(units / item.product.portion));
        item.quantity = tables;
        updateCart();
    }
}

function handleRemoveClick(e) {
    const btn = e.currentTarget;
    const idx = parseInt(btn.dataset.idx);
    const type = btn.dataset.type;
    if (!isNaN(idx) && type) {
        cart.splice(idx, 1);
        updateCart();
    } else {
        const promoRemove = btn.closest('.promo-remove');
        if (promoRemove && promoRemove.dataset.idx) {
            const idxPromo = parseInt(promoRemove.dataset.idx);
            if (!isNaN(idxPromo)) {
                cart.splice(idxPromo, 1);
                updateCart();
            }
        }
    }
}

function handleFlavorChange(e) {
    const select = e.currentTarget;
    const idx = parseInt(select.dataset.idx);
    const pos = parseInt(select.dataset.pos);
    const selectedMakiId = parseInt(select.value);
    if (cart[idx] && cart[idx].type === 'promo') {
        if (selectedMakiId) {
            cart[idx].flavors[pos] = selectedMakiId;
        } else {
            cart[idx].flavors[pos] = null;
        }
        saveCartWithTimestamp();
    }
}

function submitOrder() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    for (let item of cart) {
        if (item.type === 'promo' && item.makiCount > 0 && item.flavors.some(f => f === null)) {
            showNotification('Por favor selecciona todos los sabores de los makis en las promociones', 'error');
            return;
        }
    }
    if (!validateForm()) return;

    const form = cartElements.form;
    const deliveryType = cartElements.deliveryType.value;
    const customerName = form['customer-name'].value.trim();
    const customerPhone = form['customer-phone'].value.trim();
    const paymentMethod = form.querySelector('input[name="delivery-payment"]:checked').value;

    let deliveryInfo = '';
    if (deliveryType === 'pickup') {
        const pickupTime = form['pickup-time'].value;
        const notes = form['pickup-notes'].value.trim();
        deliveryInfo = `🏠 *Recoger en el Local*\n⏳ *Tiempo estimado:* ${pickupTime} minutos\n${notes ? `📝 *Observaciones:* ${notes}\n` : ''}`;
    } else if (deliveryType === 'delivery') {
        const address = form['delivery-address'].value.trim();
        const notes = form['delivery-notes'].value.trim();
        deliveryInfo = `🚚 *Delivery*\n🗺️ *Dirección:* ${address}\n${notes ? `📝 *Observaciones:* ${notes}\n` : ''}`;
    }

    let message = `¡Hola Daddy Ninja Rolls! Quiero realizar el siguiente pedido:\n\n`;
    message += `*DATOS DEL CLIENTE*\n🙍‍♂️ *Nombre:* ${customerName}\n📞 *Teléfono:* ${customerPhone}\n💳 *Método de Pago:* ${paymentMethod}\n\n`;
    message += `*DETALLES DE ENTREGA*\n${deliveryInfo}\n`;
    message += `🍽️ *PEDIDO*\n`;

    let total = 0;
    const makis12 = window.restaurantProducts.filter(p => p.category === 'makis' && p.portion === 12);

    for (let item of cart) {
        if (item.type === 'product') {
            const subtotal = item.product.price * item.quantity;
            total += subtotal;
            message += `- ${item.product.name} (x${item.quantity}): S/${subtotal.toFixed(2)}\n`;
        } else if (item.type === 'promo') {
            total += item.price;
            message += `- ${item.title} (S/${item.price.toFixed(2)})\n`;
            if (item.makiCount > 0) {
                message += `  *Makis incluidos:*\n`;
                for (let i = 0; i < item.flavors.length; i++) {
                    const flavorId = item.flavors[i];
                    const flavor = makis12.find(m => m.id === flavorId);
                    if (flavor) message += `    • Maki ${i+1}: ${flavor.name}\n`;
                }
            }
            if (item.extras && item.extras.length) {
                message += `  *Además:* ${item.extras.join(', ')}\n`;
            }
        }
    }
    message += `\n*Total a pagar: S/${total.toFixed(2)}*\n\nPor favor, confirmen mi pedido. ¡Gracias!`;

    const whatsappUrl = `https://wa.me/51910089308?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    hideCart();
    showNotification('Enviando pedido por WhatsApp', 'success');
    clearCart();
    resetForm();
}

function validateForm() {
    let valid = true;
    document.querySelectorAll('.form-group').forEach(g => {
        g.classList.remove('invalid');
        const em = g.querySelector('.error-message');
        if (em) em.remove();
    });
    const form = cartElements.form;
    if (!form['customer-name'].value.trim()) {
        markFieldInvalid(form['customer-name'], 'Por favor ingresa tu nombre');
        valid = false;
    }
    if (!form['customer-phone'].value.trim()) {
        markFieldInvalid(form['customer-phone'], 'Por favor ingresa tu teléfono');
        valid = false;
    }
    const payment = form.querySelector('input[name="delivery-payment"]:checked');
    if (!payment) {
        const pg = document.querySelector('.form-group:nth-child(3)');
        if (pg) {
            pg.classList.add('invalid');
            const err = document.createElement('div');
            err.className = 'error-message';
            err.textContent = 'Selecciona método de pago';
            pg.appendChild(err);
        }
        valid = false;
    }
    const deliveryType = cartElements.deliveryType.value;
    if (deliveryType === 'delivery') {
        if (!form['delivery-address'].value.trim()) {
            markFieldInvalid(form['delivery-address'], 'Ingresa la dirección de entrega');
            valid = false;
        }
    } else if (deliveryType === 'pickup') {
        if (!form['pickup-time'].value) {
            markFieldInvalid(form['pickup-time'], 'Selecciona el tiempo estimado');
            valid = false;
        }
    } else {
        const dg = document.querySelector('.form-group:nth-child(4)');
        if (dg) {
            dg.classList.add('invalid');
            const err = document.createElement('div');
            err.className = 'error-message';
            err.textContent = 'Selecciona tipo de entrega';
            dg.appendChild(err);
        }
        valid = false;
    }
    if (!valid) {
        const firstError = document.querySelector('.invalid');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return valid;
}

function markFieldInvalid(field, message) {
    const g = field.closest('.form-group');
    if (!g) return;
    g.classList.add('invalid');
    const err = document.createElement('div');
    err.className = 'error-message';
    err.textContent = message;
    g.appendChild(err);
}

function resetForm() {
    if (cartElements.form) cartElements.form.reset();
    const pickNotes = document.getElementById('pickup-notes');
    if (pickNotes) pickNotes.value = '';
    const pickTime = document.getElementById('pickup-time');
    if (pickTime) pickTime.value = '';
    const delAddr = document.getElementById('delivery-address');
    if (delAddr) delAddr.value = '';
    const delNotes = document.getElementById('delivery-notes');
    if (delNotes) delNotes.value = '';
    cartElements.pickupFields.classList.remove('active');
    cartElements.deliveryFields.classList.remove('active');
}

function setupDeliveryToggle() {
    if (!cartElements.deliveryType) return;
    cartElements.deliveryType.addEventListener('change', function() {
        cartElements.pickupFields.classList.remove('active');
        cartElements.deliveryFields.classList.remove('active');
        if (this.value === 'pickup') cartElements.pickupFields.classList.add('active');
        if (this.value === 'delivery') cartElements.deliveryFields.classList.add('active');
    });
}

function setupCartEvents() {
    cartElements.btn.addEventListener('click', showCart);
    cartElements.close.addEventListener('click', hideCart);
    cartElements.close2.addEventListener('click', hideCart);
    cartElements.overlay.addEventListener('click', hideCart);
    cartElements.checkout.addEventListener('click', goToCheckout);
    cartElements.backToCart.addEventListener('click', backToCart);
    cartElements.cancelOrder.addEventListener('click', backToCart);
    cartElements.submitOrder.addEventListener('click', submitOrder);

    document.addEventListener('productAddedToCart', (e) => {
        if (e.detail && e.detail.product) {
            addToCart(e.detail.product, e.detail.quantity || 1);
        }
    });
    document.addEventListener('promoSelected', (e) => {
        if (e.detail && e.detail.promo) {
            addPromoToCart(e.detail.promo);
        }
    });
}

function initCart() {
    initCartElements();
    loadCartWithExpiration();
    setupCartEvents();
    setupDeliveryToggle();
    updateCartCount();
    updateCart();
    cartElements.pickupFields.classList.remove('active');
    cartElements.deliveryFields.classList.remove('active');
    cartElements.step1.classList.add('active');
    cartElements.step2.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', initCart);