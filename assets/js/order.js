/* ===========================================================
   Eat Istanbul — online ordering (pick-up)
   Real menu, descriptions & photos sourced from
   eatistanbulsydney.com. Prices in AUD — informed by the
   Eat Istanbul listing; confirm against the Square dashboard.
   =========================================================== */
(function () {
  'use strict';

  /* -------------------- option groups (reusable) -------------------- */
  var GROUPS = {
    meat_kebab: {
      label: 'Choose your kebab meat', type: 'single', required: true,
      options: [
        { label: 'Gourmet Beef', price: 0 },
        { label: 'Chicken', price: 0 },
        { label: 'Mixed (beef & chicken)', price: 1.5 }
      ]
    },
    meat_skewer: {
      label: 'Choose your skewer', type: 'single', required: true,
      options: [
        { label: 'Chicken', price: 0 },
        { label: 'Lamb', price: 0 }
      ]
    },
    sauces: {
      label: 'Sauces (up to 2 included)', type: 'multi', required: false,
      options: [
        { label: 'Garlic', price: 0 },
        { label: 'Chilli', price: 0 },
        { label: 'BBQ', price: 0 },
        { label: 'Tomato', price: 0 },
        { label: 'Yoghurt', price: 0 },
        { label: 'Hummus', price: 0 },
        { label: 'Tahini', price: 0 }
      ]
    },
    sides2: {
      label: 'Choose your sides (up to 2)', type: 'multi', required: false,
      options: [
        { label: 'Tabouli', price: 0 },
        { label: 'Leafy green salad', price: 0 },
        { label: 'Turkish rice', price: 0 },
        { label: 'Hummus', price: 0 },
        { label: 'Chips', price: 0 }
      ]
    },
    sides3: {
      label: 'Choose your sides (up to 3)', type: 'multi', required: false,
      options: [
        { label: 'Tabouli', price: 0 },
        { label: 'Leafy green salad', price: 0 },
        { label: 'Turkish rice', price: 0 },
        { label: 'Hummus', price: 0 },
        { label: 'Chips', price: 0 }
      ]
    },
    chip_size: {
      label: 'Size', type: 'single', required: true,
      options: [
        { label: 'Small', price: 0 },
        { label: 'Regular', price: 1.5 },
        { label: 'Large', price: 3 }
      ]
    },
    drink_size: {
      label: 'Size', type: 'single', required: true,
      options: [
        { label: 'Small', price: 0 },
        { label: 'Large', price: 1.5 }
      ]
    }
  };

  /* -------------------- the menu (real items) -------------------- */
  // img paths relative to site root. Prices indicative — confirm in Square.
  var ITEMS = {
    // KEBAB
    kebab_wrap: { name: 'Kebab Wrap', desc: 'Gourmet beef, chicken or mixed with leafy green salad, tomato, Spanish onion & up to 2 sauces', price: 14.95, img: 'assets/img/menu/kebab-box.jpg', groups: ['meat_kebab', 'sauces'] },
    kebab_box:  { name: 'Kebab Box', desc: 'Kebab in a box with up to 2 sides & 2 sauces', price: 18.95, img: 'assets/img/menu/kebab-box.jpg', groups: ['meat_kebab', 'sides2', 'sauces'] },

    // SKEWERS (wood-fired shish)
    skewer_wrap: { name: 'Skewer Wrap', desc: 'Grilled chicken or lamb in a wrap with leafy green salad, tomato, Spanish onion & up to 2 sauces', price: 14.95, img: 'assets/img/menu/skewer.jpg', groups: ['meat_skewer', 'sauces'] },
    skewer_box:  { name: 'Skewer Box', desc: 'Grilled chicken or lamb skewer in a box with up to 2 sides & 2 sauces', price: 18.95, img: 'assets/img/menu/skewer.jpg', groups: ['meat_skewer', 'sides2', 'sauces'] },
    single_skewer: { name: 'Single Skewer', desc: 'Grilled chicken or lamb skewer, single serve', price: 9.99, img: 'assets/img/menu/single-skewer.jpg', groups: ['meat_skewer'] },

    // FALAFEL (veg)
    falafel_wrap: { name: 'Falafel Wrap', desc: 'With tabouli, leafy green salad, tomato, Spanish onion & up to 2 sauces', price: 13.95, img: 'assets/img/menu/falafel.jpg', veg: true, groups: ['sauces'] },
    falafel_box:  { name: 'Falafel Box', desc: 'Falafel in a box with 3 sides & up to 2 sauces', price: 17.95, img: 'assets/img/menu/falafel.jpg', veg: true, groups: ['sides3', 'sauces'] },

    // GOZLEME (hand-rolled)
    gozleme_beef:    { name: 'Gözleme — Beef', desc: 'Ground beef, mushroom, mozzarella & feta', price: 13.95, img: 'assets/img/menu/gozleme2.jpg', groups: [] },
    gozleme_chicken: { name: 'Gözleme — Chicken', desc: 'Chicken, mushroom, mozzarella & feta', price: 13.95, img: 'assets/img/menu/gozleme.jpg', groups: [] },
    gozleme_veg:     { name: 'Gözleme — Vegetarian', desc: 'Spinach, mozzarella & feta', price: 13.95, img: 'assets/img/menu/gozleme.jpg', veg: true, groups: [] },

    // SNACK PACK
    snack_pack: { name: 'Snack Pack', desc: 'Chips loaded with your choice of meat & up to 2 sauces', price: 17.95, img: 'assets/img/menu/snack-pack.jpg', groups: ['meat_kebab', 'sauces'] },

    // SIDES
    hot_chips: { name: 'Hot Chips', desc: 'Sea-salted, small / regular / large', price: 5.00, img: 'assets/img/menu/hot-chips.jpg', veg: true, groups: ['chip_size'] },

    // SWEETS
    baklava: { name: 'Baklava', desc: 'Layered filo with pistachio & honey', price: 4.50, img: 'assets/img/menu/baklava.jpg', veg: true, groups: [] },

    // DRINKS
    drink: { name: 'Soft Drink', desc: 'Assorted cans & bottles', price: 3.00, veg: true, groups: ['drink_size'] }
  };

  var CATEGORIES = [
    { title: 'Kebab', keys: ['kebab_wrap', 'kebab_box'] },
    { title: 'Skewers', keys: ['skewer_wrap', 'skewer_box', 'single_skewer'] },
    { title: 'Falafel', keys: ['falafel_wrap', 'falafel_box'] },
    { title: 'Gözleme', keys: ['gozleme_beef', 'gozleme_chicken', 'gozleme_veg'] },
    { title: 'Snack Pack', keys: ['snack_pack'] },
    { title: 'Sides & Sweets', keys: ['hot_chips', 'baklava', 'drink'] }
  ];

  /* -------------------- the shops -------------------- */
  // hours in 24h decimal. Barangaroo hours are the real online-store hours.
  var SHOPS = {
    barangaroo: {
      name: 'Barangaroo', area: 'The Canteen · 200 Barangaroo Ave',
      open: 9, close: 17, days: 'Mon–Sat', closedSun: true,
      extra: [], exclude: []
    },
    mlc: {
      name: 'MLC Centre', area: 'CBD · 19 Martin Place',
      open: 9, close: 16, days: 'Mon–Fri', closedSun: true,
      extra: [], exclude: []
    },
    westfield: {
      name: 'Westfield Sydney', area: 'Pitt St Mall · Level 1 food court',
      open: 9, close: 18, days: 'Mon–Sun', closedSun: false,
      extra: [], exclude: []
    },
    macquarie: {
      name: 'Macquarie', area: 'Macquarie Centre · Macquarie Park',
      open: 9, close: 18, days: 'Mon–Sun', closedSun: false,
      extra: [], exclude: []
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
    if (window.innerWidth < 900) $('#orderBody').scrollIntoView({ behavior: 'smooth' });
  }

  /* -------------------- menu rendering -------------------- */
  function shopCategories(shop) {
    var cats = CATEGORIES.map(function (c) {
      return { title: c.title, keys: c.keys.filter(function (k) { return shop.exclude.indexOf(k) === -1; }) };
    });
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
        var thumb = it.img ? '<div class="omenu-thumb" style="background-image:url(\'' + it.img + '\')"></div>' : '<div class="omenu-thumb omenu-thumb--none"></div>';
        row.innerHTML =
          thumb +
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

    $('#optQty').textContent = '1';
    state.editing.qty = 1;
    updateOptPrice();
    $('#optionModal').hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function selectedOptions() {
    var inputs = $('#optBody').querySelectorAll('input:checked');
    var opts = [];
    inputs.forEach(function (inp) {
      var price = parseFloat(inp.dataset.price) || 0;
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
    var isSun = now.getDay() === 0;
    var openToday = !(isSun && shop.closedSun);
    var openNow = openToday && nowDec >= shop.open && nowDec < shop.close;

    var asap = el('option');
    asap.value = 'ASAP';
    if (openNow) asap.textContent = 'ASAP — about 15 min';
    else if (!openToday) asap.textContent = 'Next trading day, from ' + fmtHour(shop.open);
    else asap.textContent = 'When we open (' + fmtHour(shop.open) + ')';
    sel.appendChild(asap);

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

    var params = new URLSearchParams(window.location.search);
    var pre = params.get('shop');
    if (pre && SHOPS[pre]) selectShop(pre);

    $('#optClose').addEventListener('click', closeModal);
    $('#optionModal').addEventListener('click', function (e) { if (e.target.id === 'optionModal') closeModal(); });
    $('#optQtyInc').addEventListener('click', function () { state.editing.qty++; $('#optQty').textContent = state.editing.qty; updateOptPrice(); });
    $('#optQtyDec').addEventListener('click', function () { if (state.editing.qty > 1) { state.editing.qty--; $('#optQty').textContent = state.editing.qty; updateOptPrice(); } });
    $('#optAddBtn').addEventListener('click', function () {
      var unit = unitPriceFromOptions();
      addToCart(state.editing.key, selectedOptions(), unit, state.editing.qty);
      closeModal();
    });

    var cartToggle = $('#cartToggle');
    if (cartToggle) cartToggle.addEventListener('click', function () { document.body.classList.toggle('cart-open'); });
    var cartClose = $('#cartCloseMobile');
    if (cartClose) cartClose.addEventListener('click', function () { document.body.classList.remove('cart-open'); });

    $('#orderForm').addEventListener('submit', placeOrder);

    var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
