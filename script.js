// Shared JavaScript for menu filtering, cart, and forms
(function () {
  // Utility
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Mobile nav toggle
  const mobileBtn = $('#mobileNavBtn');
  const mobileNav = $('#mobileNav');
  if (mobileBtn && mobileNav) {
    mobileBtn.addEventListener('click', () => mobileNav.classList.toggle('hidden'));
  }

  // Menu filtering
  const filterBtns = $$('.filterBtn');
  const menuItems = $$('.menu-item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      // active styles
      filterBtns.forEach(b => b.classList.remove('bg-coffee-700', 'text-white'));
      btn.classList.add('bg-coffee-700', 'text-white');

      menuItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
          item.classList.add('animate__animated');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Cart logic
  const CART_KEY = 'wildbean_cart_v1';
  const cartBtn = $('#cartBtn');
  const cartModal = $('#cartModal');
  const cartOverlay = $('#cartOverlay');
  const closeCart = $('#closeCart');
  const cartItemsWrap = $('#cartItems');
  const cartCount = $('#cartCount');
  const cartSubtotal = $('#cartSubtotal');
  const checkoutBtn = $('#checkoutBtn');
  const clearCartBtn = $('#clearCart');

  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch (e) { return []; }
  }
  function saveCart(items) { localStorage.setItem(CART_KEY, JSON.stringify(items)); }

  function renderCart() {
    const items = loadCart();
    cartItemsWrap.innerHTML = '';
    if (!items.length) {
      cartItemsWrap.innerHTML = '<p class="text-sm text-gray-500">Your cart is empty.</p>';
      cartCount.textContent = '0';
      cartSubtotal.textContent = '$0.00';
      return;
    }
    let subtotal = 0;
    items.forEach((it, idx) => {
      subtotal += it.price * it.qty;
      const el = document.createElement('div');
      el.className = 'flex items-center justify-between';
      el.innerHTML = `
        <div>
          <div class="font-medium text-coffee-700">${it.name}</div>
          <div class="text-xs text-gray-500">$${it.price.toFixed(2)} × ${it.qty}</div>
        </div>
        <div class="flex items-center gap-2">
          <button data-idx="${idx}" class="dec text-sm px-2 py-1 rounded border">-</button>
          <button data-idx="${idx}" class="inc text-sm px-2 py-1 rounded border">+</button>
        </div>
      `;
      cartItemsWrap.appendChild(el);
    });
    cartCount.textContent = items.reduce((s,i)=>s+i.qty,0);
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;

    // attach inc/dec
    $$('.inc', cartItemsWrap).forEach(btn => btn.addEventListener('click', e => {
      const idx = +btn.dataset.idx; const items = loadCart(); items[idx].qty += 1; saveCart(items); renderCart();
    }));
    $$('.dec', cartItemsWrap).forEach(btn => btn.addEventListener('click', e => {
      const idx = +btn.dataset.idx; const items = loadCart(); items[idx].qty -= 1; if (items[idx].qty <= 0) items.splice(idx,1); saveCart(items); renderCart();
    }));
  }

  // Add to cart buttons
  const addBtns = $$('.addBtn');
  addBtns.forEach(b => {
    b.addEventListener('click', () => {
      const name = b.dataset.name;
      const price = parseFloat(b.dataset.price);
      const items = loadCart();
      const found = items.find(i=>i.name===name);
      if (found) found.qty += 1; else items.push({name, price, qty:1});
      saveCart(items);
      renderCart();
      // show the cart briefly as feedback
      if (cartModal) {
        cartModal.classList.remove('hidden');
        setTimeout(()=> cartModal.classList.add('hidden'), 1200);
      }
    });
  });

  // Cart open/close
  if (cartBtn) cartBtn.addEventListener('click', ()=>{ cartModal.classList.remove('hidden'); renderCart(); });
  if (cartOverlay) cartOverlay.addEventListener('click', ()=> cartModal.classList.add('hidden'));
  if (closeCart) closeCart.addEventListener('click', ()=> cartModal.classList.add('hidden'));

  if (clearCartBtn) clearCartBtn.addEventListener('click', ()=>{ saveCart([]); renderCart(); });

  if (checkoutBtn) checkoutBtn.addEventListener('click', ()=>{
    alert('Thanks! This demo does not process payments. Your cart will be cleared.');
    saveCart([]); renderCart(); cartModal.classList.add('hidden');
  });

  // Newsletter
  const newsletterForm = $('#newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[name="email"]').value;
      newsletterForm.reset();
      alert(`Thanks for subscribing, ${email}! We’ll keep you updated.`);
    });
  }

  // Contact form
  const contactForm = $('#contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const status = $('#contactStatus');
      status.textContent = 'Sending...';
      // simulate sending
      setTimeout(()=>{
        status.textContent = 'Message sent. We’ll get back to you soon.';
        contactForm.reset();
      }, 900);
    });
  }

  // Render initial cart count on load
  document.addEventListener('DOMContentLoaded', renderCart);
})();
