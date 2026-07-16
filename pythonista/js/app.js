const App = {
  currentPage: 'home',

  init() {
    Store.resetDailyXp();
    Store.updateStreak();

    const state = Store.getState();
    if (!state.user.name) {
      this.showNameModal();
    } else {
      this.renderPage('home');
    }

    this.updateNavStats();
  },

  showNameModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'name-modal';
    modal.innerHTML = `
      <div class="modal">
        <div style="font-size:48px;margin-bottom:16px">🐍</div>
        <h2>Bem-vindo ao Pythonista!</h2>
        <p>Como devemos te chamar?</p>
        <input type="text" id="welcome-name" placeholder="Seu nome" maxlength="20" autofocus>
        <button id="welcome-btn">Começar a Aprender!</button>
      </div>
    `;

    document.body.appendChild(modal);

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
    this.currentPage = page;

    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

    const pageEl = document.getElementById(`page-${page}`);
    if (pageEl) pageEl.classList.add('active');

    const navBtn = document.querySelector(`.nav-btn[data-page="${page}"]`);
    if (navBtn) navBtn.classList.add('active');

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
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;

  const icons = { success: '✅', xp: '⭐', error: '❌', streak: '🔥' };
  toast.innerHTML = `${icons[type] || ''} ${message}`;

  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
