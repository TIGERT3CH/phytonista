const App = {
  currentPage: 'home',

  init() {
    console.log('App.init called');
    console.log('COURSE_DATA:', typeof COURSE_DATA);
    console.log('Store:', typeof Store);

    try {
      Store.resetDailyXp();
      Store.updateStreak();
    } catch (e) {
      console.error('Store init error:', e);
    }

    const state = Store.getState();
    console.log('State:', state);

    if (!state.user.name) {
      this.showNameModal();
    } else {
      this.renderPage('home');
    }

    this.updateNavStats();
  },

  showNameModal() {
    console.log('showNameModal called');
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'name-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:10000;backdrop-filter:blur(4px)';
    modal.innerHTML = `
      <div style="background:white;border-radius:16px;padding:40px;max-width:400px;width:90%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3)">
        <div style="font-size:48px;margin-bottom:16px">🐍</div>
        <h2 style="font-size:24px;font-weight:900;margin-bottom:8px">Bem-vindo ao Pythonista!</h2>
        <p style="color:#636E72;margin-bottom:24px;font-weight:600">Como devemos te chamar?</p>
        <input type="text" id="welcome-name" placeholder="Seu nome" maxlength="20"
          style="width:100%;padding:14px 16px;border:2px solid #DFE6E9;border-radius:10px;font-size:16px;font-weight:700;text-align:center;outline:none;margin-bottom:16px;font-family:'Nunito',sans-serif">
        <button id="welcome-btn"
          style="width:100%;padding:14px;border:none;border-radius:10px;background:linear-gradient(135deg,#6C5CE7,#5A4BD1);color:white;font-size:16px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif">
          Começar a Aprender!
        </button>
      </div>
    `;

    document.body.appendChild(modal);
    console.log('Modal appended to body');

    const input = modal.querySelector('#welcome-name');
    const btn = modal.querySelector('#welcome-btn');

    const submit = () => {
      const name = input.value.trim();
      if (name) {
        Store.updateUser({ name });
        modal.remove();
        this.renderPage('home');
        this.updateNavStats();
        showToast(`Bem-vindo, ${name}! 🎉`, 'success');
      }
    };

    btn.addEventListener('click', submit);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submit();
    });

    setTimeout(() => input.focus(), 100);
  },

  renderPage(page, ...args) {
    console.log('renderPage:', page, args);
    this.currentPage = page;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    const pageEl = document.getElementById(`page-${page}`);
    if (pageEl) pageEl.classList.add('active');

    const navBtn = document.querySelector(`.nav-btn[data-page="${page}"]`);
    if (navBtn) navBtn.classList.add('active');

    try {
      switch (page) {
        case 'home':
          HomePage.render();
          break;
        case 'lesson':
          LessonPage.render(args[0], args[1]);
          break;
        case 'leaderboard':
          LeaderboardPage.render();
          break;
        case 'profile':
          ProfilePage.render();
          break;
      }
    } catch (e) {
      console.error('Render error:', e);
      const el = document.getElementById(`page-${page}`);
      if (el) {
        el.innerHTML = `
          <div style="padding:40px;text-align:center">
            <h2>Erro ao carregar</h2>
            <p style="color:#636E72">${e.message}</p>
            <button onclick="location.reload()" style="margin-top:16px;padding:10px 20px;background:#6C5CE7;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:700">Recarregar</button>
          </div>
        `;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  updateNavStats() {
    const state = Store.getState();
    const streakEl = document.getElementById('nav-streak');
    const xpEl = document.getElementById('nav-xp');
    const gemsEl = document.getElementById('nav-gems');

    if (streakEl) streakEl.textContent = state.user.streak;
    if (xpEl) xpEl.textContent = state.user.totalXp;
    if (gemsEl) gemsEl.textContent = state.user.gems;
  }
};

function navigateTo(page, ...args) {
  App.renderPage(page, ...args);
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = { success: '✅', xp: '⭐', error: '❌', streak: '🔥' };
  toast.innerHTML = `${icons[type] || ''} ${message}`;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded fired');
  App.init();
});
