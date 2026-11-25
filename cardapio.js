const $ = s => document.querySelector(s);
const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
let activeCategory = 'tradicionais', limit = 8, selectedItem = null;
let cart = [], nextCartId = 1, toastTimer;
const dialog = $('#order-dialog');
const quantityInput = $('#item-quantity');
for (const [id, label] of categories) {
  const b = document.createElement('button'); b.type = 'button'; b.textContent = label; b.dataset.category = id;
  b.setAttribute('aria-pressed', String(id === activeCategory)); b.classList.toggle('active', id === activeCategory);
  b.addEventListener('click', () => {
    activeCategory = id; limit = 8;
    document.querySelectorAll('.tabs button').forEach(t => {const selected = t.dataset.category === id; t.classList.toggle('active', selected); t.setAttribute('aria-pressed', String(selected));});
    renderMenu();
  }); $('.tabs').append(b);
}
function renderMenu() {
  const query = normalize($('#search').value.trim());
  const items = menu.filter(item => item.category === activeCategory && normalize(`${item.name} ${item.description} ${item.id}`).includes(query));
  $('#menu-grid').replaceChildren();
  for (const item of items.slice(0, limit)) {
    const article = document.createElement('article'); article.className = 'menu-card';
    const content = document.createElement('div');
    const number = document.createElement('span'); number.className = 'menu-number'; number.textContent = `${item.id.padStart(2,'0')} / ${categories.find(c => c[0] === item.category)[1].toUpperCase()}`;
    const h = document.createElement('h3'); h.textContent = item.name;
    const p = document.createElement('p'); p.textContent = item.description || (item.category === 'esfihas' ? 'Esfiha tradicional da Bonna.' : 'Escolha o tamanho e adicione ao pedido.');
    const price = document.createElement('div'); price.className = 'price';
    const caption = document.createElement('small'); caption.textContent = item.small ? 'A PARTIR DE' : 'VALOR';
    price.append(caption, document.createTextNode(Order.money(item.small ?? item.normal)));
    content.append(number, h, p, price);
    const b = document.createElement('button'); b.className = 'pick'; b.type = 'button'; b.textContent = '+';
    b.setAttribute('aria-label', `Escolher ${Order.label(item)} e adicionar ao pedido`); b.addEventListener('click', () => openItem(item));
    article.append(content, b); $('#menu-grid').append(article);
  }
  $('#result-count').textContent = `${items.length} opções · ${categories.find(c => c[0] === activeCategory)[1]}`;
  $('#empty').hidden = items.length !== 0; $('#load-more').hidden = items.length <= limit; $('#clear-search').hidden = !query;
}
$('#search').addEventListener('input', () => {limit = 8; renderMenu();});
$('#clear-search').addEventListener('click', () => {$('#search').value = ''; limit = 8; renderMenu(); $('#search').focus();});
$('#load-more').addEventListener('click', () => {limit += 8; renderMenu();});
function updateItemPrice() {
  const input = document.querySelector('input[name="size"]:checked');
  if (!input) return;
  const q = Number(quantityInput.value);
  $('#item-price').textContent = Number.isInteger(q) && q >= 1 && q <= 20 ? Order.money(Number(input.dataset.price) * q) : '';
}
function openItem(item) {
  selectedItem = item;
  $('#dialog-category').textContent = categories.find(c => c[0] === item.category)[1];
  $('#dialog-name').textContent = Order.label(item);
  $('#dialog-description').textContent = item.description || 'Escolha a quantidade e adicione ao seu pedido.';
  $('#size-options').replaceChildren(); quantityInput.value = '1'; $('#item-notes').value = '';
  const sizes = item.small ? [['Brotinho', item.small], ['Normal', item.normal]] : [[item.category === 'esfihas' ? 'Unidade' : 'Normal', item.normal]];
  sizes.forEach(([size, price], i) => {
    const label = document.createElement('label'); label.className = 'size-option';
    const input = document.createElement('input'); input.type = 'radio'; input.name = 'size'; input.value = size; input.dataset.price = price; input.checked = i === 0; input.required = true;
    input.addEventListener('change', updateItemPrice);
    const text = document.createElement('span'); text.textContent = size;
    const strong = document.createElement('strong'); strong.textContent = Order.money(price); text.append(strong);
    label.append(input, text); $('#size-options').append(label);
  }); updateItemPrice(); dialog.showModal();
}
$('#quantity-less').addEventListener('click', () => {quantityInput.value = Math.max(1, (Number(quantityInput.value) || 1) - 1); updateItemPrice();});
$('#quantity-more').addEventListener('click', () => {quantityInput.value = Math.min(20, (Number(quantityInput.value) || 1) + 1); updateItemPrice();});
quantityInput.addEventListener('input', updateItemPrice);
$('#item-form').addEventListener('submit', e => {
  e.preventDefault(); if (!selectedItem || !$('#item-form').reportValidity()) return;
  const size = document.querySelector('input[name="size"]:checked');
  const notes = $('#item-notes').value.trim();
  const item = {key: nextCartId++, id: selectedItem.id, name: selectedItem.name, category: selectedItem.category, size: size.value, price: Number(size.dataset.price), quantity: Number(quantityInput.value), notes};
  const existing = cart.find(i => i.id === item.id && i.size === item.size && i.notes === notes && i.quantity + item.quantity <= 20);
  if (existing) existing.quantity += item.quantity; else cart.push(item);
  renderCart(); dialog.close();
  clearTimeout(toastTimer); $('#cart-toast').textContent = `${Order.label(item)} adicionado ao pedido`; $('#cart-toast').classList.add('show');
  toastTimer = setTimeout(() => {$('#cart-toast').classList.remove('show');}, 3000);
});
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => {if (e.target !== dialog) return; const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();});
function renderCart() {
  $('#cart-items').replaceChildren();
  for (const item of cart) {
    const li = document.createElement('li'); li.className = 'cart-item';
    const head = document.createElement('div'); head.className = 'cart-item-head';
    const name = document.createElement('strong'); name.textContent = Order.label(item);
    const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'remove-item'; remove.textContent = '×'; remove.setAttribute('aria-label', `Remover ${Order.label(item)}`);
    remove.addEventListener('click', () => {cart = cart.filter(i => i.key !== item.key); renderCart();}); head.append(name, remove);
    const detail = document.createElement('small'); detail.textContent = `${item.size} · ${Order.money(item.price)} / ${item.category === 'esfihas' ? 'unidade' : 'item'}`;
    li.append(head, detail);
    if (item.notes) {const note = document.createElement('p'); note.className = 'cart-item-note'; note.textContent = item.notes; li.append(note);}
    const bottom = document.createElement('div'); bottom.className = 'cart-item-bottom';
    const qty = document.createElement('div'); qty.className = 'cart-quantity';
    for (const [text, delta] of [['−', -1], ['+', 1]]) {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = text;
      b.setAttribute('aria-label', `${delta > 0 ? 'Aumentar' : 'Diminuir'} quantidade de ${Order.label(item)}`); b.disabled = delta > 0 ? item.quantity >= 20 : item.quantity <= 1;
      b.addEventListener('click', () => {item.quantity += delta; renderCart();});
      if (delta === 1) {const count = document.createElement('span'); count.textContent = item.quantity; qty.append(count);} qty.append(b);
    }
    const subtotal = document.createElement('strong'); subtotal.textContent = Order.money(item.price * item.quantity); bottom.append(qty, subtotal); li.append(bottom); $('#cart-items').append(li);
  }
  const count = cart.reduce((n, item) => n + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(e => e.textContent = count);
  $('#cart-empty').hidden = cart.length > 0; $('#cart-subtotal').hidden = cart.length === 0;
  $('#cart-total').textContent = Order.money(Order.total(cart));
  $('#mobile-total').textContent = count ? `${Order.money(Order.total(cart))} · referência` : 'Escolha seus sabores';
  $('#send-order').disabled = !cart.length;
  $('#checkout-error').hidden = true;
}
function updateFulfillment() {
  const pickup = document.querySelector('input[name="fulfillment"]:checked').value === 'pickup';
  $('#delivery-fields').hidden = pickup; $('#delivery-fields').disabled = pickup; $('#pickup-note').hidden = !pickup; $('#checkout-error').hidden = true;
}
document.querySelectorAll('input[name="fulfillment"]').forEach(input => input.addEventListener('change', updateFulfillment));
$('#zip').addEventListener('input', e => {const digits = e.target.value.replace(/\D/g, '').slice(0, 8); e.target.value = digits.length > 5 ? `${digits.slice(0,5)}-${digits.slice(5)}` : digits;});
$('#checkout-form').addEventListener('input', () => {$('#checkout-error').hidden = true;});
$('#checkout-form').addEventListener('submit', e => {
  e.preventDefault();
  const customer = Object.fromEntries(new FormData(e.currentTarget));
  const error = Order.validate(cart, customer);
  if (error) {$('#checkout-error').textContent = error; $('#checkout-error').hidden = false; return;}
  if (!e.currentTarget.reportValidity()) return;
  window.location.assign(makeWhatsAppUrl(Order.message(cart, customer)));
});
renderMenu(); renderCart(); updateFulfillment();
