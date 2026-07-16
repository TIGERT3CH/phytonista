const LessonPage = {
  currentModule: null,
  currentLesson: null,
  currentStepIndex: 0,
  correctAnswers: 0,
  totalExercises: 0,

  render(moduleId, lessonId) {
    const container = document.getElementById('page-lesson');
    Exercises.reset();

    this.currentModule = COURSE_DATA.modules.find(m => m.id === moduleId);
    this.currentLesson = this.currentModule.lessons.find(l => l.id === lessonId);
    this.currentStepIndex = 0;
    this.correctAnswers = 0;

    const theorySteps = this.currentLesson.theory ? [{ type: 'theory', content: this.currentLesson.theory }] : [];
    const exerciseSteps = this.currentLesson.exercises.map(ex => ({ type: 'exercise', exercise: ex }));
    this.steps = [...theorySteps, ...exerciseSteps];
    this.totalExercises = exerciseSteps.length;

    this.renderStep(container);
  },

  renderStep(container) {
    if (this.currentStepIndex >= this.steps.length) {
      this.renderComplete(container);
      return;
    }

    const step = this.steps[this.currentStepIndex];
    const progressPercent = Math.round((this.currentStepIndex / this.steps.length) * 100);

    container.innerHTML = `
      <div class="lesson-container">
        <div class="lesson-header">
          <button class="back-btn" onclick="navigateTo('home')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <div class="lesson-progress-bar">
            <div class="lesson-progress-fill" style="width:${progressPercent}%"></div>
          </div>
          <span class="lesson-progress-text">${this.currentStepIndex + 1}/${this.steps.length}</span>
        </div>

        <div id="lesson-step-content"></div>
      </div>
    `;

    const content = document.getElementById('lesson-step-content');

    if (step.type === 'theory') {
      this.renderTheory(content, step.content);
    } else {
      this.renderExercise(content, step.exercise);
    }
  },

  renderTheory(container, html) {
    const step = document.createElement('div');
    step.className = 'lesson-step theory';
    step.innerHTML = html;

    const nextBtn = document.createElement('button');
    nextBtn.className = 'check-btn primary';
    nextBtn.textContent = 'Continuar';
    nextBtn.addEventListener('click', () => {
      this.currentStepIndex++;
      this.renderStep(document.getElementById('page-lesson'));
    });
    step.appendChild(nextBtn);

    container.appendChild(step);
  },

  renderExercise(container, exercise) {
    const step = document.createElement('div');
    step.className = 'lesson-step';

    Exercises.render(exercise, step, (isCorrect) => {
      if (isCorrect) this.correctAnswers++;

      setTimeout(() => {
        this.currentStepIndex++;
        this.renderStep(document.getElementById('page-lesson'));
      }, 1500);
    });

    container.appendChild(step);
  },

  renderComplete(container) {
    const xpEarned = Gamification.calculateLessonXp(this.currentLesson.exercises, this.correctAnswers);
    const accuracy = this.totalExercises > 0 ? Math.round((this.correctAnswers / this.totalExercises) * 100) : 0;

    Store.completeLesson(this.currentLesson.id, accuracy, xpEarned);
    Store.updateStreak();

    const newBadges = Gamification.checkBadges();
    const allModules = COURSE_DATA.modules;
    const currentModuleIndex = allModules.findIndex(m => m.id === this.currentModule.id);
    const moduleProgress = Store.getModuleProgress(this.currentModule.id);

    if (moduleProgress.percent === 100) {
      Store.completeModule(this.currentModule.id);
    }

    const nextLessonInModule = this.currentModule.lessons.find(l =>
      !Store.isLessonCompleted(l.id) && l.id !== this.currentLesson.id
    );

    const nextModule = allModules[currentModuleIndex + 1];
    const nextLessonAcross = nextModule ? nextModule.lessons.find(l => !Store.isLessonCompleted(l.id)) : null;

    Exercises.showConfetti();

    container.innerHTML = `
      <div class="lesson-container">
        <div class="lesson-complete">
          <div class="complete-icon">🎉</div>
          <h2>Aula Completa!</h2>
          <p>${this.currentLesson.title}</p>

          <div class="xp-earned">
            ⭐ +${xpEarned} XP
          </div>

          <div class="complete-stats">
            <div class="complete-stat">
              <div class="complete-stat-value">${accuracy}%</div>
              <div class="complete-stat-label">Precisão</div>
            </div>
            <div class="complete-stat">
              <div class="complete-stat-value">${this.correctAnswers}/${this.totalExercises}</div>
              <div class="complete-stat-label">Corretas</div>
            </div>
            <div class="complete-stat">
              <div class="complete-stat-value">${Store.getState().user.streak}🔥</div>
              <div class="complete-stat-label">Streak</div>
            </div>
          </div>

          ${newBadges.length > 0 ? `
            <div style="margin-bottom:24px">
              <h3 style="font-size:16px;font-weight:800;margin-bottom:12px">🏅 Novos Badges!</h3>
              ${newBadges.map(b => `
                <div style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:linear-gradient(135deg,var(--accent),#F39C12);border-radius:20px;margin:4px;font-weight:700;color:var(--bg-dark)">
                  ${b.icon} ${b.name}
                </div>
              `).join('')}
            </div>
          ` : ''}

          <div style="display:flex;flex-direction:column;gap:12px;max-width:300px;margin:0 auto">
            ${nextLessonInModule ? `
              <button class="check-btn primary" onclick="navigateTo('lesson', '${this.currentModule.id}', '${nextLessonInModule.id}')">
                Próxima Aula
              </button>
            ` : nextLessonAcross ? `
              <button class="check-btn primary" onclick="navigateTo('lesson', '${nextModule.id}', '${nextLessonAcross.id}')">
                Próximo Módulo: ${nextModule.title}
              </button>
            ` : `
              <button class="check-btn primary" onclick="navigateTo('home')">
                🎓 Curso Completo!
              </button>
            `}
            <button class="check-btn" style="background:var(--border);color:var(--text)" onclick="navigateTo('home')">
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    `;

    App.updateNavStats();
  }
};

if (typeof window !== 'undefined') {
  window.LessonPage = LessonPage;
}
