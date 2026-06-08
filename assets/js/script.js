const loading = document.getElementById('loading');
const openBtn = document.getElementById('openInvitation');
const cover = document.getElementById('cover');
const content = document.getElementById('content');
const bottomNav = document.getElementById('bottomNav');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

window.addEventListener('load', () => {
  setTimeout(() => {
    loading.style.opacity = '0';
    setTimeout(() => loading.style.display = 'none', 500);
  }, 700);
});

openBtn.addEventListener('click', () => {
  cover.classList.add('open');
  music.play().then(() => musicBtn.classList.add('playing')).catch(() => {});
  setTimeout(() => {
    cover.style.display = 'none';
    content.classList.remove('hidden');
    bottomNav.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    revealOnScroll();
  }, 1500);
});

musicBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    musicBtn.classList.add('playing');
  } else {
    music.pause();
    musicBtn.classList.remove('playing');
  }
});

const weddingDate = new Date('2026-09-21T08:00:00').getTime();
function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const d = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
  const h = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const m = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
  const s = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

  document.getElementById('days').textContent = String(d).padStart(2, '0');
  document.getElementById('hours').textContent = String(h).padStart(2, '0');
  document.getElementById('minutes').textContent = String(m).padStart(2, '0');
  document.getElementById('seconds').textContent = String(s).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

function createLeaf() {
  const leaf = document.createElement('div');
  leaf.className = 'leaf';
  leaf.innerHTML = Math.random() > .5 ? '❦' : '🍂';
  leaf.style.left = Math.random() * 100 + 'vw';
  leaf.style.fontSize = (14 + Math.random() * 20) + 'px';
  leaf.style.animationDuration = (5 + Math.random() * 7) + 's';
  leaf.style.opacity = .35 + Math.random() * .6;
  document.body.appendChild(leaf);
  setTimeout(() => leaf.remove(), 12000);
}
setInterval(createLeaf, 450);

const revealEls = document.querySelectorAll('section, .profile-card, .event-card, .timeline-item, .gallery-item, .bank-card');
revealEls.forEach(el => el.classList.add('reveal'));

function revealOnScroll() {
  revealEls.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 90) el.classList.add('show');
  });
}
window.addEventListener('scroll', revealOnScroll);

const wishForm = document.getElementById('wishForm');
const wishList = document.getElementById('wishList');

function loadWishes() {
  const wishes = JSON.parse(localStorage.getItem('weddingWishes') || '[]');
  wishList.innerHTML = wishes.map(w => `
    <div class="wish-card">
      <b>${escapeHTML(w.name)}</b> <small>(${escapeHTML(w.attendance)})</small>
      <p>${escapeHTML(w.message)}</p>
    </div>
  `).join('');
}
wishForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('guestName').value,
    attendance: document.getElementById('attendance').value,
    message: document.getElementById('message').value
  };
  const wishes = JSON.parse(localStorage.getItem('weddingWishes') || '[]');
  wishes.unshift(data);
  localStorage.setItem('weddingWishes', JSON.stringify(wishes.slice(0, 20)));
  wishForm.reset();
  loadWishes();
});
loadWishes();

function copyText(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert('Nomor rekening berhasil disalin: ' + text);
  });
}

function escapeHTML(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
