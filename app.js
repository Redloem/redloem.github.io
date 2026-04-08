function toggleTheme() {
  const html = document.documentElement;
  const btn = document.querySelector('.island-toggle');

  html.classList.add('theme-transition');

  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    btn.innerText = '🌙';
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    btn.innerText = '☀️';
  }

  setTimeout(() => {
    html.classList.remove('theme-transition');
  }, 300);

  updateIcons();
}

function updateIcons() {
  const isDark = document.documentElement.classList.contains('dark');

  const appstore = document.querySelector('.tabbar img:nth-child(1)');
  const app1 = document.querySelector('.tabbar img:nth-child(2)');
  const app2 = document.querySelector('.tabbar img:nth-child(3)');
  const app3 = document.querySelector('.tabbar img:nth-child(4)');

  appstore.src = isDark ? 'images/appstore-dark.png' : 'images/appstore.png';
  app1.src = isDark ? 'images/app1-dark.png' : 'images/app1.png';
  app2.src = isDark ? 'images/app2-dark.png' : 'images/app2.png';
  app3.src = isDark ? 'images/app3-dark.png' : 'images/app3.png';

  const downloadIcon = document.getElementById('downloadIcon');
  if (downloadIcon) {
    // always use light App Store icon (no dark variant)
    downloadIcon.src = 'images/appstore.png';
  }
}

function openApp(name) {
  let currentScreens = [];
  window._currentScreens = currentScreens;
  window._currentIndex = 0;

  const tabs = document.querySelectorAll('.tabbar img');
  tabs.forEach(tab => tab.classList.remove('active'));

  if (name === 'app1') tabs[1].classList.add('active');
  if (name === 'app2') tabs[2].classList.add('active');
  if (name === 'app3') tabs[3].classList.add('active');

  const home = document.getElementById('home');
  const appView = document.getElementById('appView');

  home.classList.add('hidden');
  appView.classList.remove('hidden');

  const content = document.querySelector('.content');
  if (content) content.scrollTop = 0;

  setTimeout(() => {
    appView.classList.add('active');
  }, 10);

  const detailTitle = document.getElementById('detailTitle');
  const screens = document.getElementById('screens');
  const desc = document.getElementById('detailDesc');
  const shortDesc = document.getElementById('shortDesc');
  const icon = document.getElementById('appIcon');
  const downloadBtn = document.getElementById('downloadBtn');
  const policies = document.getElementById('policies');
  const reviews = document.getElementById('reviewsText');

  downloadBtn.style.display = 'inline-block';

  if (name === 'app1') {
    detailTitle.innerText = 'Спидвей РФ';
    shortDesc.innerText = 'Результаты и составы';
    desc.innerText = 'Результаты гонок, составы команд, турнирные таблицы и подробная статистика по спидвею в России. Удобный интерфейс и быстрый доступ к актуальной информации.';
    icon.src = 'images/app1.png';
    downloadBtn.href = 'https://apps.apple.com/app/id6761015838';

    currentScreens = [
      'screens/app1-1.webp',
      'screens/app1-2.webp',
      'screens/app1-3.webp'
    ];
    window._currentScreens = currentScreens;

    screens.innerHTML = currentScreens.map((src, i) =>
      `<img src="${src}" loading="lazy" style="touch-action:auto;" onclick="openPreview(${i})">`
    ).join('');
    screens.style.touchAction = 'auto';

    policies.innerHTML = `
      <a href="https://redloem.github.io/speedway/privacy.html" target="_blank">Политика конфиденциальности</a>
      <a href="https://redloem.github.io/speedway/terms.html" target="_blank">Условия использования</a>
    `;

    reviews.innerText = 'Оставьте отзыв в App Store.';
  }

  if (name === 'app2') {
    detailTitle.innerText = 'Служебный календарь';
    shortDesc.innerText = 'Смены и караулы';
    desc.innerText = 'Служебный календарь для удобного отображения смен, караулов и гидрантов. Быстрый доступ к информации и простой интерфейс для ежедневного использования.';
    icon.src = 'images/app2.png';
    downloadBtn.href = 'https://apps.apple.com/app/id6760973182';

    currentScreens = [
      'screens/app2-1.webp',
      'screens/app2-2.webp',
      'screens/app2-3.webp'
    ];
    window._currentScreens = currentScreens;

    screens.innerHTML = currentScreens.map((src, i) =>
      `<img src="${src}" loading="lazy" style="touch-action:auto;" onclick="openPreview(${i})">`
    ).join('');
    screens.style.touchAction = 'auto';

    policies.innerHTML = `
      <a href="https://redloem.github.io/fire-calendar/privacy.html" target="_blank">Политика конфиденциальности</a>
      <a href="https://redloem.github.io/fire-calendar/terms.html" target="_blank">Условия использования</a>
    `;

    reviews.innerText = 'Приложение бесплатное. Поддержите проект — оставьте отзыв в App Store. Это помогает улучшать приложение.';
  }

  if (name === 'app3') {
    detailTitle.innerText = 'Скоро';
    shortDesc.innerText = 'В разработке';
    desc.innerText = 'Приложение для проверки скорости, пинга и локации';
    icon.src = 'images/app3.png';
    downloadBtn.style.display = 'none';
    screens.innerHTML = '';
    window._currentScreens = [];
    policies.innerHTML = '';
    reviews.innerText = '';
  }
}

function goHome() {
  const tabs = document.querySelectorAll('.tabbar img');
  tabs.forEach(tab => tab.classList.remove('active'));
  tabs[0].classList.add('active');

  document.getElementById('appView').classList.remove('active');

  setTimeout(() => {
    document.getElementById('appView').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
  }, 200);
}

function openPreview(index) {
  const modal = document.getElementById('previewModal');
  const img = document.getElementById('previewImg');

  window._currentIndex = index;
  img.src = window._currentScreens[index];

  modal.classList.remove('hidden');
  renderDots();

  document.onkeydown = (e) => {
    if (e.key === 'Escape') closePreview();
    if (e.key === 'ArrowRight') nextPreview();
    if (e.key === 'ArrowLeft') prevPreview();
  };
}

function closePreview() {
  document.getElementById('previewModal').classList.add('hidden');
}

function renderDots() {
  const container = document.getElementById('previewDots');
  const list = window._currentScreens || [];
  const index = window._currentIndex;

  if (!container) return;

  container.innerHTML = list.map((_, i) =>
    `<span class="${i === index ? 'active' : ''}"></span>`
  ).join('');
}

function nextPreview() {
  const img = document.getElementById('previewImg');
  const list = window._currentScreens || [];

  if (!list.length) return;

  window._currentIndex = (window._currentIndex + 1) % list.length;
  img.src = list[window._currentIndex];
  renderDots();
}

function prevPreview() {
  const img = document.getElementById('previewImg');
  const list = window._currentScreens || [];

  if (!list.length) return;

  window._currentIndex = (window._currentIndex - 1 + list.length) % list.length;
  img.src = list[window._currentIndex];
  renderDots();
}

window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  updateIcons();

  const tabs = document.querySelectorAll('.tabbar img');
  tabs[0].classList.add('active');

  const btn = document.querySelector('.island-toggle');
  btn.innerText = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
});

document.getElementById('previewModal').onclick = (e) => {
  const img = document.getElementById('previewImg');

  if (e.target.id === 'previewModal') {
    closePreview();
    return;
  }

  if (e.target.id === 'previewImg') {
    const rect = img.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width / 2) {
      prevPreview();
    } else {
      nextPreview();
    }
  }
};
