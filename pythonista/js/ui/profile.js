const ProfilePage = {
  render() {
    const container = document.getElementById('page-profile');
    const state = Store.getState();
    const level = Gamification.getLevel(state.user.totalXp);
    const streakInfo = Gamification.getStreakInfo();
    const totalLessons = Store.getTotalLessonsCompleted();
    const totalModules = Store.getTotalModulesCompleted();
    const totalExercises = Object.keys(state.progress.lessonScores).length;

    const avatars = ['🐍', '🦅', '🦊', '🐱', '🐼', '🦄', '🐸', '🦋', '🐢', '🐙'];
    const daysSinceJoined = Math.max(1, Math.floor((Date.now() - new Date(state.user.joinedAt).getTime()) / 86400000));

    container.innerHTML = `
      <div class="profile-container">
        <div class="profile-header">
          <div class="profile-avatar">${state.user.avatar}</div>
          <div class="profile-name">${state.user.name || 'Estudante'}</div>
          <div class="profile-joined">Membro há ${daysSinceJoined} dias</div>
          <div style="margin-top:12px;display:flex;justify-content:center;gap:8px;flex-wrap:wrap">
            <span style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:${level.color}20;color:${level.color};border-radius:12px;font-size:13px;font-weight:800">
              Nível ${level.level} — ${level.name}
            </span>
            <span style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:#FF6B6B20;color:#FF6B6B;border-radius:12px;font-size:13px;font-weight:800">
              🔥 ${state.user.streak} dias
            </span>
          </div>
        </div>

        <div class="profile-stats">
          <div class="profile-stat-card">
            <div class="profile-stat-icon">⭐</div>
            <div class="profile-stat-value">${state.user.totalXp}</div>
            <div class="profile-stat-label">XP Total</div>
          </div>
          <div class="profile-stat-card">
            <div class="profile-stat-icon">💎</div>
            <div class="profile-stat-value">${state.user.gems}</div>
            <div class="profile-stat-label">Moedas</div>
          </div>
          <div class="profile-stat-card">
            <div class="profile-stat-icon">📖</div>
            <div class="profile-stat-value">${totalLessons}</div>
            <div class="profile-stat-label">Aulas</div>
          </div>
          <div class="profile-stat-card">
            <div class="profile-stat-icon">🏆</div>
            <div class="profile-stat-value">${totalModules}/${COURSE_DATA.modules.length}</div>
            <div class="profile-stat-label">Módulos</div>
          </div>
        </div>

        <div>
          <h3 class="section-title">🖼️ Avatar</h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px">
            ${avatars.map(a => `
              <button onclick="ProfilePage.changeAvatar('${a}')" style="width:48px;height:48px;font-size:24px;border:2px solid ${state.user.avatar === a ? 'var(--primary)' : 'var(--border)'};background:${state.user.avatar === a ? 'var(--primary)10' : 'var(--bg-card)'};border-radius:50%;cursor:pointer;transition:var(--transition)">${a}</button>
            `).join('')}
          </div>
        </div>

        <div>
          <h3 class="section-title">🏅 Conquistas (${state.badges.length}/${Gamification.BADGES.length})</h3>
          <div class="badges-grid">
            ${Gamification.BADGES.map(badge => {
              const earned = state.badges.includes(badge.id);
              return `
                <div class="badge-card ${earned ? 'earned' : 'locked'}">
                  <div class="badge-icon">${badge.icon}</div>
                  <div class="badge-name">${badge.name}</div>
                  <div class="badge-desc">${badge.description}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div style="margin-top:32px">
          <h3 class="section-title">⚙️ Configurações</h3>
          <div style="background:var(--bg-card);border-radius:var(--radius-sm);padding:16px;border:2px solid var(--border)">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
              <span style="font-weight:700">Meta diária de XP</span>
              <select id="daily-goal-select" onchange="ProfilePage.updateDailyGoal(this.value)" style="padding:6px 12px;border:2px solid var(--border);border-radius:var(--radius-xs);font-family:'Nunito',sans-serif;font-weight:700;font-size:14px">
                <option value="30" ${state.user.dailyGoal === 30 ? 'selected' : ''}>30 XP</option>
                <option value="50" ${state.user.dailyGoal === 50 ? 'selected' : ''}>50 XP</option>
                <option value="100" ${state.user.dailyGoal === 100 ? 'selected' : ''}>100 XP</option>
                <option value="200" ${state.user.dailyGoal === 200 ? 'selected' : ''}>200 XP</option>
              </select>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
              <span style="font-weight:700">Alterar nome</span>
              <div style="display:flex;gap:6px">
                <input id="name-input" type="text" value="${state.user.name}" placeholder="Seu nome"
                  style="padding:6px 12px;border:2px solid var(--border);border-radius:var(--radius-xs);font-family:'Nunito',sans-serif;font-weight:700;font-size:14px;width:150px">
                <button onclick="ProfilePage.updateName()" style="padding:6px 12px;background:var(--primary);color:white;border:none;border-radius:var(--radius-xs);font-weight:700;cursor:pointer">OK</button>
              </div>
            </div>
            <div style="border-top:1px solid var(--border);padding-top:12px;margin-top:8px">
              <button onclick="ProfilePage.resetProgress()" style="padding:8px 16px;background:var(--danger);color:white;border:none;border-radius:var(--radius-xs);font-weight:700;cursor:pointer;font-size:13px">
                🗑️ Resetar Progresso
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  changeAvatar(avatar) {
    Store.updateUser({ avatar });
    this.render();
    App.updateNavStats();
    showToast('Avatar atualizado!', 'success');
  },

  updateName() {
    const input = document.getElementById('name-input');
    const name = input.value.trim();
    if (name) {
      Store.updateUser({ name });
      this.render();
      App.updateNavStats();
      showToast('Nome atualizado!', 'success');
    }
  },

  updateDailyGoal(value) {
    Store.updateUser({ dailyGoal: parseInt(value) });
    showToast('Meta diária atualizada!', 'success');
  },

  resetProgress() {
    if (confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
      localStorage.removeItem(Store.KEY);
      showToast('Progresso resetado!', 'success');
      navigateTo('home');
    }
  }
};

if (typeof window !== 'undefined') {
  window.ProfilePage = ProfilePage;
}
