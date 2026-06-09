let cart = [];
let cartExpirationTimer = null;
const CART_TTL = 20 * 60 * 1000;

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
    if (!validateFlavorsAndMarkErrors()) {
        const firstError = document.querySelector('.flavor-error-message, .promo-general-error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }
    cartElements.step1.classList.remove('active');
    cartElements.step2.classList.add('active');
}

function backToCart() {
    cartElements.step2.classList.remove('active');
    cartElements.step1.classList.add('active');
}

function addToCart(product, quantity = 1) {
    const existing = cart.find(i => i.type === 'product' && i.product.id === product.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ type: 'product', product, quantity });
    }
    updateCart();
    showNotification(`${product.name} añadido al carrito (${quantity} unidad(es))`, 'success');
}

function addPromoToCart(promo, initialFlavors = null) {
    const existing = cart.find(i => i.type === 'promo' && i.promoKey === promo.key);
    if (existing) {
        showNotification('Esta promoción ya está en el carrito', 'error');
        return;
    }
    const makiCount = promo.makiCount || 0;
    const extras = promo.extras || [];
    const flavors = initialFlavors ? initialFlavors.slice() : new Array(makiCount).fill(null);
    cart.push({
        type: 'promo',
        promoKey: promo.key,
        title: promo.title,
        price: promo.price,
        quantity: 1,
        makiCount: makiCount,
        extras: extras,
        flavors: flavors
    });
    updateCart();
    showNotification(`${promo.title} agregada al carrito. Puedes modificar los sabores.`, 'success');
}

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
            
            let porcionTexto = '';
            if (item.product.category === 'makis') {
                porcionTexto = `por ${item.product.portion} cortes`;
            } else {
                porcionTexto = 'por unidad';
            }
            
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <div class="cart-item-info">
                    <h4>${escapeHtml(item.product.name)}</h4>
                    <p>S/${item.product.price.toFixed(2)} ${porcionTexto}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-idx="${idx}" data-type="product">-</button>
                        <span class="quantity-value" data-idx="${idx}" data-type="product">${unitsValue}</span>
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
            
            const infoDiv = document.createElement('div');
            infoDiv.className = 'cart-item-info';
            infoDiv.innerHTML = `<strong>${escapeHtml(item.title)}</strong><p>S/${item.price.toFixed(2)}</p>`;
            promoDiv.appendChild(infoDiv);
            
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'promo-details';
            detailsDiv.setAttribute('data-promo-idx', idx);
            
            if (item.makiCount > 0) {
                const titleDiv = document.createElement('div');
                titleDiv.className = 'promo-flavors-title';
                titleDiv.textContent = `Elija los sabores de ${item.makiCount} ${item.makiCount === 1 ? 'tabla' : 'tablas'} de 12 cortes:`;
                detailsDiv.appendChild(titleDiv);
                
                for (let i = 0; i < item.makiCount; i++) {
                    const selectedId = item.flavors[i] || '';
                    const options = makis12.map(m => `<option value="${m.id}" ${m.id === selectedId ? 'selected' : ''}>${escapeHtml(m.name)}</option>`).join('');
                    const selectorDiv = document.createElement('div');
                    selectorDiv.className = 'flavor-selector';
                    selectorDiv.innerHTML = `
                        <label>Maki ${i+1}: 
                            <select class="promo-flavor-select" data-idx="${idx}" data-pos="${i}">
                                <option value="">-- Seleccionar sabor --</option>
                                ${options}
                            </select>
                        </label>
                    `;
                    detailsDiv.appendChild(selectorDiv);
                }
            }
            
            if (item.extras && item.extras.length) {
                const titleLower = item.title.toLowerCase();
                const shouldShowExtras = !item.extras.some(extra => 
                    titleLower.includes(extra.toLowerCase())
                );
                if (shouldShowExtras) {
                    const extrasDiv = document.createElement('div');
                    extrasDiv.className = 'promo-extras';
                    extrasDiv.innerHTML = `<strong>Incluye además:</strong> ${item.extras.join(', ')}`;
                    detailsDiv.appendChild(extrasDiv);
                }
            }
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'promo-remove';
            removeBtn.setAttribute('data-idx', idx);
            removeBtn.innerHTML = '<i class="fas fa-trash"></i> Eliminar promoción';
            detailsDiv.appendChild(removeBtn);
            
            promoDiv.appendChild(detailsDiv);
            cartElements.items.appendChild(promoDiv);
        }
    });

    cartElements.total.textContent = `S/${total.toFixed(2)}`;
    updateCartCount();
    saveCartWithTimestamp();
    attachCartItemEvents();
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function attachCartItemEvents() {
    document.querySelectorAll('.cart-item .quantity-btn').forEach(btn => {
        btn.removeEventListener('click', handleQuantityClick);
        btn.addEventListener('click', handleQuantityClick);
    });
    document.querySelectorAll('.remove-item, .promo-remove').forEach(btn => {
        btn.removeEventListener('click', handleRemoveClick);
        btn.addEventListener('click', handleRemoveClick);
    });
    document.querySelectorAll('.promo-flavor-select').forEach(select => {
        select.removeEventListener('change', handleFlavorChange);
        select.addEventListener('change', handleFlavorChange);
        select.addEventListener('change', function() {
            this.classList.remove('invalid-flavor');
            const parentSelector = this.closest('.flavor-selector');
            const errorSpan = parentSelector?.querySelector('.flavor-error-message');
            if (errorSpan) errorSpan.remove();
            const promoDetails = this.closest('.promo-details');
            const generalError = promoDetails?.querySelector('.promo-general-error');
            if (generalError) generalError.remove();
        });
    });
}

function handleQuantityClick(e) {
    const btn = e.currentTarget;
    const idx = parseInt(btn.dataset.idx);
    const type = btn.dataset.type;
    if (type !== 'product') return;
    const valueSpan = btn.parentElement.querySelector('.quantity-value');
    let units = parseInt(valueSpan.textContent) || 1;
    const item = cart[idx];
    if (!item || item.type !== 'product') return;
    const step = item.product.portion;
    const min = step;
    if (btn.classList.contains('minus')) {
        units = Math.max(min, units - step);
    } else {
        units = units + step;
    }
    valueSpan.textContent = units;
    const tables = Math.max(1, Math.floor(units / item.product.portion));
    item.quantity = tables;
    updateCart();
}

function handleRemoveClick(e) {
    const btn = e.currentTarget;
    let idx = btn.getAttribute('data-idx');
    if (idx !== null) {
        idx = parseInt(idx);
        if (!isNaN(idx)) {
            cart.splice(idx, 1);
            updateCart();
        }
    }
}

function handleFlavorChange(e) {
    const select = e.currentTarget;
    const idx = parseInt(select.dataset.idx);
    const pos = parseInt(select.dataset.pos);
    const selectedMakiId = parseInt(select.value);
    if (cart[idx] && cart[idx].type === 'promo') {
        cart[idx].flavors[pos] = selectedMakiId || null;
        saveCartWithTimestamp();
    }
}

function validateFlavorsAndMarkErrors() {
    let hasMissing = false;
    document.querySelectorAll('.flavor-error-message, .promo-general-error').forEach(el => el.remove());
    document.querySelectorAll('.promo-flavor-select').forEach(select => {
        select.classList.remove('invalid-flavor');
    });
    
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        if (item.type === 'promo' && item.makiCount > 0) {
            let missingInThisPromo = false;
            for (let j = 0; j < item.flavors.length; j++) {
                if (item.flavors[j] === null) {
                    hasMissing = true;
                    missingInThisPromo = true;
                    const selector = document.querySelector(`.promo-flavor-select[data-idx="${i}"][data-pos="${j}"]`);
                    if (selector) {
                        selector.classList.add('invalid-flavor');
                        const parentSelector = selector.closest('.flavor-selector');
                        if (parentSelector && !parentSelector.querySelector('.flavor-error-message')) {
                            const errorSpan = document.createElement('span');
                            errorSpan.className = 'flavor-error-message';
                            errorSpan.style.display = 'block';
                            errorSpan.style.color = 'var(--danger-color)';
                            errorSpan.style.fontSize = '0.75rem';
                            errorSpan.style.marginTop = '4px';
                            errorSpan.style.marginLeft = '8px';
                            errorSpan.textContent = 'Por favor selecciona un sabor';
                            parentSelector.appendChild(errorSpan);
                        }
                    }
                }
            }
            if (missingInThisPromo) {
                const promoDetails = document.querySelector(`.promo-details[data-promo-idx="${i}"]`);
                if (promoDetails && !promoDetails.querySelector('.promo-general-error')) {
                    const generalError = document.createElement('div');
                    generalError.className = 'promo-general-error';
                    generalError.style.color = 'var(--danger-color)';
                    generalError.style.fontSize = '0.8rem';
                    generalError.style.marginTop = '8px';
                    generalError.style.padding = '4px 8px';
                    generalError.style.backgroundColor = 'rgba(231, 76, 60, 0.1)';
                    generalError.style.borderRadius = '8px';
                    generalError.innerHTML = '<i class="fas fa-exclamation-circle"></i> Debes elegir todos los sabores para esta promoción';
                    promoDetails.appendChild(generalError);
                }
            }
        }
    }
    return !hasMissing;
}

function submitOrder() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    if (!validateFlavorsAndMarkErrors()) {
        const firstError = document.querySelector('.flavor-error-message, .promo-general-error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
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
            const cortesText = item.product.category === 'makis' ? ` (${item.product.portion} cortes)` : '';
            message += `- ${item.product.name}${cortesText} x${item.quantity}: S/${subtotal.toFixed(2)}\n`;
        } 
        else if (item.type === 'promo') {
            total += item.price;
            const tablaTexto = item.makiCount === 1 ? '1 tabla' : `${item.makiCount} tablas`;
            message += `- ${item.title} (Promoción) - ${tablaTexto} de 12 cortes: S/${item.price.toFixed(2)}\n`;
            if (item.makiCount > 0) {
                const sabores = [];
                for (let i = 0; i < item.flavors.length; i++) {
                    const flavorId = item.flavors[i];
                    const flavor = makis12.find(m => m.id === flavorId);
                    if (flavor) sabores.push(flavor.name);
                }
                if (sabores.length > 0) {
                    message += `  Sabores: ${sabores.join(', ')}\n`;
                }
            }
            if (item.extras && item.extras.length) {
                const titleLower = item.title.toLowerCase();
                const shouldShowExtras = !item.extras.some(extra => 
                    titleLower.includes(extra.toLowerCase())
                );
                if (shouldShowExtras) {
                    message += `  *Además:* ${item.extras.join(', ')}\n`;
                }
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