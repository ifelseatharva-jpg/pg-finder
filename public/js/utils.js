// ── API BASE ──────────────────────────────────────────────────────────────
const API = '/api/rooms';

// ── TOAST NOTIFICATIONS ───────────────────────────────────────────────────
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icon = type === 'success' ? '✅' : '❌';
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(100%)'; toast.style.transition = 'all 0.3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ── AMENITY LABELS ─────────────────────────────────────────────────────────
const AMENITY_LABELS = {
  wifi: '📶 WiFi', ac: '❄️ AC', meals: '🍽️ Meals',
  laundry: '👕 Laundry', parking: '🚗 Parking', hotWater: '🚿 Hot Water'
};

// ── BUILD AMENITY PILLS ────────────────────────────────────────────────────
function buildAmenityPills(amenities) {
  return Object.entries(amenities)
    .map(([key, val]) => `<span class="pill ${val ? 'active' : ''}">${AMENITY_LABELS[key]}</span>`)
    .join('');
}

// ── FORMAT DATE ────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

// ── SET ACTIVE NAV ─────────────────────────────────────────────────────────
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === path);
  });
}
document.addEventListener('DOMContentLoaded', setActiveNav);
