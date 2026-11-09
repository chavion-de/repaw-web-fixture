const params = new URLSearchParams(window.location.search);
const requestedVariant = params.get('variant') || 'good';
const variant = ['good', 'broken', 'jserror'].includes(requestedVariant)
  ? requestedVariant
  : 'good';

const fixture = {
  good: {
    label: 'GOOD · v1.0.0',
    className: 'variant-good',
    version: 'Version 1.0.0-good',
  },
  broken: {
    label: 'BROKEN · v1.0.1',
    className: 'variant-broken',
    version: 'Version 1.0.1-broken-cart-count',
  },
  jserror: {
    label: 'JS ERROR · v1.0.2',
    className: 'variant-error',
    version: 'Version 1.0.2-cart-runtime-error',
  },
}[variant];

document.documentElement.dataset.variant = variant;
document.title = `Repaw Fixture · ${fixture.label}`;

const byId = (id) => document.getElementById(id);
const catalogView = byId('catalog-view');
const cartView = byId('cart-view');
const cartBadge = byId('cart-badge');
const cartQuantity = byId('cart-quantity');
const cartTotal = byId('cart-total');
const emptyMessage = byId('empty-message');
const cartLine = byId('cart-line');
const checkoutButton = byId('checkout-button');
const confirmation = byId('confirmation');

byId('variant-pill').textContent = fixture.label;
byId('variant-pill').classList.add(fixture.className);
byId('version-label').textContent = fixture.version;

let quantity = 0;

function render() {
  // Intentional regression: the broken build never exposes the actual count.
  const visibleCount = variant === 'broken' ? 0 : quantity;
  cartBadge.textContent = String(visibleCount);
  cartBadge.setAttribute('aria-label', `Cart item count ${visibleCount}`);
  cartQuantity.textContent = String(quantity);
  cartTotal.textContent = `€${(quantity * 12).toFixed(2)}`;
  emptyMessage.hidden = quantity > 0;
  cartLine.hidden = quantity === 0;
  checkoutButton.disabled = quantity === 0;
}

byId('add-button').addEventListener('click', () => {
  quantity += 1;
  confirmation.hidden = true;
  render();
});

byId('open-cart-button').addEventListener('click', () => {
  if (variant === 'jserror') {
    // Intentional uncaught error for Repaw's automatic browser-error finding.
    const cartState = undefined;
    cartState.items.map((item) => item.id);
  }
  catalogView.hidden = true;
  cartView.hidden = false;
  byId('cart-title').focus();
});

byId('back-button').addEventListener('click', () => {
  cartView.hidden = true;
  catalogView.hidden = false;
  byId('add-button').focus();
});

checkoutButton.addEventListener('click', () => {
  confirmation.hidden = false;
});

render();
