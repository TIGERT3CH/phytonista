const HomePage = {
  render() {
    console.log('HomePage.render called');
    console.log('COURSE_DATA available:', typeof COURSE_DATA !== 'undefined');
    const container = document.getElementById('page-home');
    if (!container) return;
    const state = Store.getState();
    const dailyProgress = Gamification.getDailyProgress();
    const streakInfo = Gamification.getStreakInfo();
    let nextLesson = null;
    try {
      nextLesson = Store.getNextLesson();
    } catch (e) {
      console.error('getNextLesson error:', e);
    }

    container.innerHTML = `
      <div class="home-header">
        <h1>Olá, ${state.user.name || 'Estudante'}! 👋</h1>
        <p>${streakInfo.message}</p>
      </div>

      <div class="daily-goal">
        <div class="daily-goal-info">
          <h3>Meta Diária</h3>
          <p>${dailyProgress.current} / ${dailyProgress.goal} XP hoje</p>
        </div>
        <div class="daily-goal-progress">
          <div class="progress-ring">
            <svg width="60" height="60">
              <circle class="bg" cx="30" cy="30" r="24" />
              <circle class="fill" cx="30" cy="30" r="24"
                stroke-dasharray="${2 * Math.PI * 24}"
                stroke-dashoffset="${2 * Math.PI * 24 * (1 - dailyProgress.percent / 100)}" />
            </svg>
            <span class="text">${dailyProgress.percent}%</span>
          </div>
        </div>
      </div>

      <div class="modules-grid" id="modules-grid"></div>

      ${nextLesson ? `
        <button class="check-btn primary" style="margin-top:24px;max-width:400px;margin-left:auto;margin-right:auto;display:block"
          onclick="navigateTo('lesson', '${nextLesson.module.id}', '${nextLesson.lesson.id}')">
          ▶ Continuar: ${nextLesson.lesson.title}
        </button>
      ` : `
        <div style="text-align:center;margin-top:32px;padding:40px;background:var(--bg-card);border-radius:var(--radius);border:2px solid var(--border)">
          <div style="font-size:60px;margin-bottom:16px">🎉</div>
          <h2 style="font-size:24px;font-weight:900;margin-bottom:8px;background:linear-gradient(135deg,var(--primary),var(--secondary));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">
            Parabéns! Curso Completo!
          </h2>
          <p style="color:var(--text-light);font-weight:600">Você completou todas as aulas. Continue revisando para manter seu streak!</p>
        </div>
      `}
    `;

    this.renderModules();
  },

  renderModules() {
    const grid = document.getElementById('modules-grid');
    if (!grid) return;

    if (typeof COURSE_DATA === 'undefined') {
      grid.innerHTML = '<p style="text-align:center;color:var(--text-light)">Erro: dados do curso não carregados.</p>';
      return;
    }

    const state = Store.getState();

    COURSE_DATA.modules.forEach((module, index) => {
      const isUnlocked = Store.isModuleUnlocked(index);
      const progress = Store.getModuleProgress(module.id);
      const isCompleted = progress.percent === 100;

      const card = document.createElement('div');
      card.className = `module-card ${!isUnlocked ? 'locked' : ''}`;

      card.innerHTML = `
        <div class="module-header">
          <div class="module-icon" style="background:${module.color}20;color:${module.color}">
            ${module.icon}
          </div>
          <div class="module-info">
            <h3>${module.title}</h3>
            <p>${module.description}</p>
          </div>
          ${!isUnlocked ? '<span style="font-size:20px">🔒</span>' : ''}
          ${isCompleted ? '<span style="font-size:20px">✅</span>' : ''}
        </div>
        <div class="module-progress">
          <div class="progress-bar">
            <div class="progress-bar-fill" style="width:${progress.percent}%;background:linear-gradient(90deg,${module.color},${module.color}88)"></div>
          </div>
          <div class="progress-text">
            <span>${progress.completed}/${progress.total} aulas</span>
            <span>${progress.percent}%</span>
          </div>
        </div>
      `;

      if (isUnlocked) {
        card.addEventListener('click', () => {
          const firstIncomplete = module.lessons.find(l =>
            !state.progress.completedLessons.includes(l.id)
          );
          const lessonId = firstIncomplete ? firstIncomplete.id : module.lessons[0].id;
          navigateTo('lesson', module.id, lessonId);
        });
      }

      grid.appendChild(card);
    });
  }
};

if (typeof window !== 'undefined') {
  window.HomePage = HomePage;
}
