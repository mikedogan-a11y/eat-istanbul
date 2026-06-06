/* ===========================================================
   Eat Istanbul — online ordering (pick-up)
   Pure front-end. Prices in AUD. Assumptions noted in README.
   =========================================================== */
(function () {
  'use strict';

  /* -------------------- option groups (reusable) -------------------- */
  var GROUPS = {
    meat: {
      label: 'Choose your meat', type: 'single', required: true,
      options: [
        { label: 'Lamb', price: 0 },
        { label: 'Chicken', price: 0 },
        { label: 'Mixed (lamb & chicken)', price: 1.5 }
      ]
    },
    bread: {
      label: 'Bread', type: 'single', required: true,
      options: [
        { label: 'Turkish bread', price: 0 },
        { label: 'Wrap', price: 0 },
        { label: 'Pita', price: 0 }
      ]
    },
    size: {
      label: 'Size', type: 'single', required: true,
      options: [
        { label: 'Small', price: 0 },
        { label: 'Large', price: 4 }
      ]
    },
    sauces: {
      label: 'Sauces (choose any)', type: 'multi', required: false,
      options: [
        { label: 'Garlic', price: 0 },
        { label: 'Chilli', price: 0 },
        { label: 'BBQ', price: 0 },
        { label: 'Tomato', price: 0 },
        { label: 'Yoghurt', price: 0 },
        { label: 'Hummus', price: 0.5 }
      ]
    },
    meal: {
      label: 'Make it a meal', type: 'single', required: false,
      options: [
        { label: 'No thanks', price: 0 },
        { label: 'Add chips + soft drink', price: 5 }
      ]
    }
  };

  /* -------------------- the menu -------------------- */
  // Each item: key, name, desc, price (base AUD), veg?, groups[]
  var ITEMS = {
    // Kebabs & Plates
    mixed_grill:   { name: 'Mixed Grill Plate', desc: 'Shish lamb, chicken & adana over rice with salad & sauces', price: 22.90, groups: ['sauces'] },
    lamb_shish:    { name: 'Lamb Shish Kebab', desc: 'Marinated lamb, charcoal-grilled', price: 16.90, groups: ['bread', 'sauces', 'meal'] },
    chicken_shish: { name: 'Chicken Shish Kebab', desc: 'Tender chicken skewers', price: 15.90, groups: ['bread', 'sauces', 'meal'] },
    adana:         { name: 'Adana Kebab', desc: 'Hand-minced spiced lamb, flame-grilled', price: 16.90, groups: ['bread', 'sauces', 'meal'] },
    iskender:      { name: 'İskender', desc: 'Sliced doner over toasted bread, tomato & yoghurt', price: 19.90, groups: ['meat'] },
    falafel_plate: { name: 'Falafel Plate', desc: 'House-made crispy falafel, hummus & salad', price: 15.90, veg: true, groups: ['sauces'] },

    // Snack Packs & Wraps
    snack_pack:    { name: 'Loaded Snack Pack', desc: 'Hot chips topped with meat & sauces', price: 13.90, groups: ['size', 'meat', 'sauces'] },
    hsp_deluxe:    { name: 'HSP Deluxe', desc: 'The classic, loaded with cheese and the lot', price: 18.90, groups: ['meat', 'sauces'] },
    lamb_wrap:     { name: 'Lamb Doner Wrap', desc: 'Shaved lamb, salad & sauce', price: 13.90, groups: ['sauces', 'meal'] },
    chicken_wrap:  { name: 'Chicken Doner Wrap', desc: 'Shaved chicken, salad & garlic sauce', price: 13.90, groups: ['sauces', 'meal'] },
    falafel_wrap:  { name: 'Falafel Wrap', desc: 'Crispy falafel, hummus, salad & tahini', price: 12.90, veg: true, groups: ['sauces', 'meal'] },

    // Gözleme & Pide
    goz_spinach:   { name: 'Spinach & Feta Gözleme', desc: 'Hand-rolled, griddle-cooked to order', price: 12.90, veg: true, groups: [] },
    goz_lamb:      { name: 'Lamb Gözleme', desc: 'Spiced minced lamb, onion & herbs', price: 13.90, groups: [] },
    lahmacun:      { name: 'Lahmacun', desc: 'Thin flatbread, spiced lamb, herbs & lemon', price: 9.90, groups: [] },
    pide:          { name: 'Turkish Pide', desc: 'Boat-shaped flatbread', price: 14.90, groups: [] },

    // Sides
    chips:         { name: 'Chips', desc: 'Sea-salted hot chips', price: 6.90, veg: true, groups: [] },
    hummus_side:   { name: 'Hummus & Bread', desc: 'House hummus with warm Turkish bread', price: 6.90, veg: true, groups: [] },
    salad_side:    { name: 'Turkish Salad', desc: 'Tomato, cucumber, onion, parsley & sumac', price: 7.90, veg: true, groups: [] },
    rice_side:     { name: 'Rice', desc: 'Buttered Turkish pilav', price: 4.50, veg: true, groups: [] },

    // Sweets & Drinks
    baklava:       { name: 'Baklava (2 pc)', desc: 'Layered filo, pistachio & honey', price: 6.50, veg: true, groups: [] },
    turkish_delight:{ name: 'Turkish Delight', desc: 'Rosewater & pistachio', price: 3.50, veg: true, groups: [] },
    cay:           { name: 'Turkish Tea (Çay)', desc: 'Brewed strong, tulip glass', price: 3.50, veg: true, groups: [] },
    turkish_coffee:{ name: 'Turkish Coffee', desc: 'Rich, traditional, finely ground', price: 4.50, veg: true, groups: [] },
    ayran:         { name: 'Ayran', desc: 'Chilled salted yoghurt drink', price: 3.90, veg: true, groups: [] },
    soft_drink:    { name: 'Soft Drink', desc: 'Can — assorted', price: 3.50, veg: true, groups: [] },

    // Shop-specific extras
    breakfast_goz: { name: 'Breakfast Gözleme', desc: 'Egg, cheese & sucuk, griddle-cooked', price: 13.90, groups: [] },
    menemen:       { name: 'Menemen', desc: 'Turkish-style eggs with tomato, capsicum & herbs', price: 14.90, veg: true, groups: [] },
    student_combo: { name: 'Student Combo', desc: 'Any doner wrap + chips + soft drink', price: 15.90, groups: ['sauces'] }
  };

  // Category display order
  var CATEGORIES = [
    { title: 'Kebabs & Plates', keys: ['mixed_grill', 'lamb_shish', 'chicken_shish', 'adana', 'iskender', 'falafel_plate'] },
    { title: 'Snack Packs & Wraps', keys: ['snack_pack', 'hsp_deluxe', 'lamb_wrap', 'chicken_wrap', 'falafel_wrap'] },
    { title: 'Gözleme & Pide', keys: ['goz_spinach', 'goz_lamb', 'lahmacun', 'pide'] },
    { title: 'Sides', keys: ['chips', 'hummus_side', 'salad_side', 'rice_side'] },
    { title: 'Sweets & Drinks', keys: ['baklava', 'turkish_delight', 'cay', 'turkish_coffee', 'ayran', 'soft_drink'] }
  ];

  /* -------------------- the shops -------------------- */
  // open/close in 24h decimal hours. extra = items added to this shop.
  // exclude = items hidden at this shop.
  var SHOPS = {
    mlc: {
      name: 'MLC Centre', area: 'CBD · 19 Martin Place',
      open: 9, close: 16, days: 'Mon–Fri',
      extra: [], exclude: []
    },
    barangaroo: {
      name: 'Barangaroo', area: 'The Canteen · 200 Barangaroo Ave',
      open: 9, close: 16, days: 'Mon–Fri',
      // morning trade — add a breakfast section
      extra: [{ category: 'Breakfast (till 11am)', keys: ['breakfast_goz', 'menemen'] }], exclude: []
    },
    westfield: {
      name: 'Westfield Sydney', area: 'Pitt St Mall · Level 1 food court',
      open: 9, close: 18, days: 'Mon–Sun',
      extra: [], exclude: []
    },
    macquarie: {
      name: 'Macquarie', area: 'Macquarie Centre · Macquarie Park',
      open: 9, close: 18, days: 'Mon–Sun',
      // student-area special
      extra: [{ category: 'Combos', keys: ['student_combo'] }], exclude: []
    }
  };

  /* -------------------- state -------------------- */
  var state = { shopKey: null, cart: [], editing: null };

  /* -------------------- helpers -------------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function money(n) { return '$' + n.toFixed(2); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  /* -------------------- shop picker -------------------- */
  function renderShopPicker() {
    var root = $('#shopPicker');
    root.innerHTML = '';
    Object.keys(SHOPS).forEach(function (key) {
      var s = SHOPS[key];
      var btn = el('button', 'shop-btn' + (state.shopKey === key ? ' active' : ''));
      btn.type = 'button';
      btn.innerHTML =
        '<span class="shop-btn-name">' + s.name + '</span>' +
        '<span class="shop-btn-area">' + s.area + '</span>' +
        '<span class="shop-btn-hours">' + s.days + ' · ' + fmtHour(s.open) + '–' + fmtHour(s.close) + '</span>';
      btn.addEventListener('click', function () { selectShop(key); });
      root.appendChild(btn);
    });
  }

  function fmtHour(h) {
    var ap = h >= 12 ? 'pm' : 'am';
    var hr = h % 12; if (hr === 0) hr = 12;
    return hr + ap;
  }

  function selectShop(key) {
    state.shopKey = key;
    renderShopPicker();
    renderMenu();
    renderPickupTimes();
    $('#orderBody').hidden = false;
    $('#chosenShop').textContent = SHOPS[key].name;
    // smooth scroll to menu on mobile
    if (window.innerWidth < 900) $('#orderBody').scrollIntoView({ behavior: 'smooth' });
  }

  /* -------------------- menu rendering -------------------- */
  function shopCategories(shop) {
    var cats = CATEGORIES.map(function (c) {
      return { title: c.title, keys: c.keys.filter(function (k) { return shop.exclude.indexOf(k) === -1; }) };
    });
    // prepend / append shop extras
    (shop.extra || []).forEach(function (ex) { cats.unshift({ title: ex.category, keys: ex.keys }); });
    return cats.filter(function (c) { return c.keys.length; });
  }

  function renderMenu() {
    var shop = SHOPS[state.shopKey];
    var root = $('#menuRoot');
    root.innerHTML = '';
    shopCategories(shop).forEach(function (cat) {
      var section = el('section', 'omenu-cat');
      section.appendChild(el('h3', 'omenu-cat-title', cat.title));
      cat.keys.forEach(function (key) {
        var it = ITEMS[key];
        if (!it) return;
        var row = el('div', 'omenu-item');
        var hasOpts = it.groups && it.groups.length;
        row.innerHTML =
          '<div class="omenu-item-info">' +
            '<p class="omenu-item-name">' + it.name + (it.veg ? ' <em class="veg">V</em>' : '') + '</p>' +
            '<p class="omenu-item-desc">' + it.desc + '</p>' +
          '</div>' +
          '<div class="omenu-item-buy">' +
            '<span class="omenu-price">' + money(it.price) + '</span>' +
            '<button type="button" class="btn btn-sm btn-gold omenu-add">' + (hasOpts ? 'Choose' : 'Add') + '</button>' +
          '</div>';
        $('.omenu-add', row).addEventListener('click', function () {
          if (hasOpts) openOptions(key); else addToCart(key, [], it.price, 1);
        });
        section.appendChild(row);
      });
      root.appendChild(section);
    });
  }

  /* -------------------- options modal -------------------- */
  function openOptions(key, existingIndex) {
    var it = ITEMS[key];
    state.editing = { key: key, index: (existingIndex == null ? -1 : existingIndex) };
    $('#optTitle').textContent = it.name;
    $('#optDesc').textContent = it.desc;
    var body = $('#optBody');
    body.innerHTML = '';

    it.groups.forEach(function (gKey) {
      var g = GROUPS[gKey];
      var grp = el('div', 'opt-group');
      grp.appendChild(el('p', 'opt-group-label', g.label + (g.required ? ' <span class="req">*</span>' : '')));
      g.options.forEach(function (opt, i) {
        var id = 'opt_' + gKey + '_' + i;
        var wrap = el('label', 'opt-choice');
        var input = document.createElement('input');
        input.type = g.type === 'multi' ? 'checkbox' : 'radio';
        input.name = gKey;
        input.value = opt.label;
        input.dataset.price = opt.price;
        input.dataset.group = gKey;
        if (g.type === 'single' && i === 0 && g.required) input.checked = true;
        input.addEventListener('change', updateOptPrice);
        wrap.appendChild(input);
        wrap.appendChild(el('span', 'opt-choice-label', opt.label));
        if (opt.price > 0) wrap.appendChild(el('span', 'opt-choice-price', '+' + money(opt.price)));
        grp.appendChild(wrap);
      });
      body.appendChild(grp);
    });

    // qty
    $('#optQty').textContent = '1';
    state.editing.qty = 1;
    updateOptPrice();
    var modal = $('#optionModal');
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function selectedOptions() {
    var inputs = $('#optBody').querySelectorAll('input:checked');
    var opts = [];
    inputs.forEach(function (inp) {
      var price = parseFloat(inp.dataset.price) || 0;
      // hide the boring defaults from the receipt
      if (inp.value === 'No thanks' || (price === 0 && inp.dataset.group === 'meal')) return;
      opts.push({ label: inp.value, price: price });
    });
    return opts;
  }

  function unitPriceFromOptions() {
    var base = ITEMS[state.editing.key].price;
    selectedOptions().forEach(function (o) { base += o.price; });
    return base;
  }

  function updateOptPrice() {
    var unit = unitPriceFromOptions();
    $('#optAddBtn').textContent = (state.editing.index >= 0 ? 'Update' : 'Add') +
      ' · ' + money(unit * state.editing.qty);
  }

  function closeModal() {
    $('#optionModal').hidden = true;
    document.body.style.overflow = '';
    state.editing = null;
  }

  /* -------------------- cart -------------------- */
  function addToCart(key, options, unitPrice, qty) {
    state.cart.push({ key: key, name: ITEMS[key].name, options: options || [], unitPrice: unitPrice, qty: qty || 1 });
    renderCart();
    pulseCart();
  }

  function renderCart() {
    var root = $('#cartItems');
    root.innerHTML = '';
    if (!state.cart.length) {
      root.appendChild(el('p', 'cart-empty', 'Your order is empty. Add something tasty from the menu.'));
    } else {
      state.cart.forEach(function (line, idx) {
        var optsTxt = line.options.length
          ? '<p class="cart-line-opts">' + line.options.map(function (o) { return o.label; }).join(', ') + '</p>'
          : '';
        var row = el('div', 'cart-line');
        row.innerHTML =
          '<div class="cart-line-main">' +
            '<p class="cart-line-name">' + line.name + '</p>' + optsTxt +
          '</div>' +
          '<div class="cart-line-side">' +
            '<div class="qty">' +
              '<button type="button" class="qty-btn" data-act="dec" aria-label="Decrease">−</button>' +
              '<span class="qty-n">' + line.qty + '</span>' +
              '<button type="button" class="qty-btn" data-act="inc" aria-label="Increase">+</button>' +
            '</div>' +
            '<span class="cart-line-price">' + money(line.unitPrice * line.qty) + '</span>' +
          '</div>';
        $('[data-act="dec"]', row).addEventListener('click', function () { changeQty(idx, -1); });
        $('[data-act="inc"]', row).addEventListener('click', function () { changeQty(idx, 1); });
        root.appendChild(row);
      });
    }
    var total = state.cart.reduce(function (s, l) { return s + l.unitPrice * l.qty; }, 0);
    var count = state.cart.reduce(function (s, l) { return s + l.qty; }, 0);
    $('#cartTotal').textContent = money(total);
    $('#cartCount').textContent = count;
    $('#cartCount').hidden = count === 0;
    $('#placeOrderBtn').disabled = count === 0;
  }

  function changeQty(idx, delta) {
    state.cart[idx].qty += delta;
    if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
    renderCart();
  }

  function pulseCart() {
    var b = $('#cartCount');
    b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse');
  }

  /* -------------------- pickup times -------------------- */
  function renderPickupTimes() {
    var shop = SHOPS[state.shopKey];
    var sel = $('#pickupTime');
    sel.innerHTML = '';
    var now = new Date();
    var nowDec = now.getHours() + now.getMinutes() / 60;
    var openNow = nowDec >= shop.open && nowDec < shop.close;

    var asap = el('option');
    asap.value = 'ASAP';
    asap.textContent = openNow ? 'ASAP — about 15 min' : 'First thing when we open (' + fmtHour(shop.open) + ')';
    sel.appendChild(asap);

    // slots every 15 min from next quarter hour (or open) until close
    var start = openNow ? Math.ceil((nowDec + 0.25) * 4) / 4 : shop.open;
    for (var t = start; t < shop.close; t += 0.25) {
      var h = Math.floor(t);
      var m = Math.round((t - h) * 60);
      var label = (h % 12 === 0 ? 12 : h % 12) + ':' + (m < 10 ? '0' + m : m) + (h >= 12 ? 'pm' : 'am');
      var o = el('option'); o.value = label; o.textContent = label;
      sel.appendChild(o);
    }
  }

  /* -------------------- place order -------------------- */
  function orderNumber() {
    var code = state.shopKey.slice(0, 3).toUpperCase();
    var n = Math.floor(1000 + Math.random() * 9000);
    return 'EI-' + code + '-' + n;
  }

  function buildSummary(orderNo, name, phone, email, pickup, notes) {
    var shop = SHOPS[state.shopKey];
    var lines = state.cart.map(function (l) {
      var opt = l.options.length ? ' (' + l.options.map(function (o) { return o.label; }).join(', ') + ')' : '';
      return l.qty + '× ' + l.name + opt + ' — ' + money(l.unitPrice * l.qty);
    });
    var total = state.cart.reduce(function (s, l) { return s + l.unitPrice * l.qty; }, 0);
    return [
      'ORDER ' + orderNo,
      'Shop: Eat Istanbul ' + shop.name + ' (' + shop.area + ')',
      'Pick-up: ' + pickup,
      'Name: ' + name,
      'Phone: ' + phone,
      (email ? 'Email: ' + email : ''),
      (notes ? 'Notes: ' + notes : ''),
      '',
      '--- Items ---',
      lines.join('\n'),
      '',
      'TOTAL (pay on pick-up): ' + money(total)
    ].filter(Boolean).join('\n');
  }

  function placeOrder(e) {
    e.preventDefault();
    var name = $('#custName').value.trim();
    var phone = $('#custPhone').value.trim();
    var email = $('#custEmail').value.trim();
    var pickup = $('#pickupTime').value;
    var notes = $('#custNotes').value.trim();
    var note = $('#orderNote');

    if (!state.cart.length) { return; }
    if (!name || !phone) {
      note.textContent = 'Please add your name and a contact phone number.';
      note.className = 'form-note err';
      return;
    }

    var orderNo = orderNumber();
    var summary = buildSummary(orderNo, name, phone, email, pickup, notes);

    // Try Formspree if configured; otherwise fall back to email.
    var endpoint = $('#orderForm').dataset.endpoint || '';
    var configured = endpoint && endpoint.indexOf('your-form-id') === -1;

    showConfirmation(orderNo, pickup, summary);

    if (configured) {
      fetch(endpoint, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: orderNo, shop: SHOPS[state.shopKey].name, pickup: pickup, name: name, phone: phone, email: email, details: summary })
      }).catch(function () {});
    } else {
      // open email as a fallback record
      var href = 'mailto:hello@eatistanbul.com.au?subject=' +
        encodeURIComponent('Pick-up order ' + orderNo + ' — ' + SHOPS[state.shopKey].name) +
        '&body=' + encodeURIComponent(summary);
      $('#emailFallback').href = href;
      $('#emailFallbackWrap').hidden = false;
    }
  }

  function showConfirmation(orderNo, pickup, summary) {
    $('#confOrderNo').textContent = orderNo;
    $('#confShop').textContent = SHOPS[state.shopKey].name;
    $('#confPickup').textContent = pickup;
    $('#confSummary').textContent = summary;
    $('#orderLayout').hidden = true;
    $('#shopPickerWrap').hidden = true;
    $('#confirmation').hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* -------------------- init -------------------- */
  function init() {
    renderShopPicker();
    renderCart();

    // preselect shop from ?shop=
    var params = new URLSearchParams(window.location.search);
    var pre = params.get('shop');
    if (pre && SHOPS[pre]) selectShop(pre);

    // modal controls
    $('#optClose').addEventListener('click', closeModal);
    $('#optionModal').addEventListener('click', function (e) { if (e.target.id === 'optionModal') closeModal(); });
    $('#optQtyInc').addEventListener('click', function () { state.editing.qty++; $('#optQty').textContent = state.editing.qty; updateOptPrice(); });
    $('#optQtyDec').addEventListener('click', function () { if (state.editing.qty > 1) { state.editing.qty--; $('#optQty').textContent = state.editing.qty; updateOptPrice(); } });
    $('#optAddBtn').addEventListener('click', function () {
      var unit = unitPriceFromOptions();
      addToCart(state.editing.key, selectedOptions(), unit, state.editing.qty);
      closeModal();
    });

    // mobile cart toggle
    var cartToggle = $('#cartToggle');
    if (cartToggle) cartToggle.addEventListener('click', function () {
      document.body.classList.toggle('cart-open');
    });
    var cartClose = $('#cartCloseMobile');
    if (cartClose) cartClose.addEventListener('click', function () { document.body.classList.remove('cart-open'); });

    $('#orderForm').addEventListener('submit', placeOrder);

    // year
    var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
