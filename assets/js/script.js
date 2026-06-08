AOS.init({ duration: 1000, once: false, offset: 80 });

const cover = document.getElementById('cover');
const openBtn = document.getElementById('openInvitation');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

openBtn.addEventListener('click', () => {
  cover.classList.add('open');
  setTimeout(() => cover.classList.add('hide'), 1200);
  music.play().then(() => musicBtn.classList.add('playing')).catch(() => {});
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

function createLeaf(){
  const leaf = document.createElement('span');
  leaf.className = 'leaf';
  leaf.textContent = Math.random() > 0.5 ? '❦' : '🍂';
  leaf.style.left = Math.random() * 100 + 'vw';
  leaf.style.animationDuration = 6 + Math.random() * 7 + 's';
  leaf.style.fontSize = 14 + Math.random() * 18 + 'px';
  leaf.style.opacity = 0.35 + Math.random() * 0.55;
  document.body.appendChild(leaf);
  setTimeout(() => leaf.remove(), 14000);
}
setInterval(createLeaf, 550);

// Ganti tanggal acara di sini: format Tahun-Bulan-Tanggal Jam:Menit:Detik
const weddingDate = new Date('2026-12-28T08:00:00').getTime();
function updateCountdown(){
  const now = new Date().getTime();
  const distance = weddingDate - now;
  const d = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
  const h = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const m = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
  const s = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));
  document.getElementById('days').textContent = String(d).padStart(2,'0');
  document.getElementById('hours').textContent = String(h).padStart(2,'0');
  document.getElementById('minutes').textContent = String(m).padStart(2,'0');
  document.getElementById('seconds').textContent = String(s).padStart(2,'0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

const wishForm = document.getElementById('wishForm');
const wishList = document.getElementById('wishList');
const savedWishes = JSON.parse(localStorage.getItem('weddingWishes') || '[]');
function renderWishes(){
  wishList.innerHTML = savedWishes.map(item => `
    <div class="wish-item"><strong>${item.name}</strong><p>${item.text}</p></div>
  `).join('');
}
wishForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('guestName').value.trim();
  const text = document.getElementById('guestWish').value.trim();
  if(!name || !text) return;
  savedWishes.unshift({name, text});
  localStorage.setItem('weddingWishes', JSON.stringify(savedWishes));
  wishForm.reset();
  renderWishes();
});
renderWishes();
