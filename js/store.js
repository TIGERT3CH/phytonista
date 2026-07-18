const Store = {
  KEY: 'pythonista_data',

  getDefaultState() {
    return {
      user: {
        name: '',
        avatar: '🐍',
        joinedAt: new Date().toISOString(),
        totalXp: 0,
        gems: 0,
        streak: 0,
        lastActiveDate: null,
        dailyXp: 0,
        dailyGoal: 50,
      },
      progress: {
        completedLessons: [],
        completedModules: [],
        lessonScores: {},
      },
      badges: [],
      settings: {
        sound: true,
      }
    };
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return this.getDefaultState();
      const data = JSON.parse(raw);
      const defaults = this.getDefaultState();
      return {
        user: { ...defaults.user, ...data.user },
        progress: { ...defaults.progress, ...data.progress },
        badges: data.badges || [],
        settings: { ...defaults.settings, ...(data.settings || {}) }
      };
    } catch (e) {
      console.error('Error loading store:', e);
      return this.getDefaultState();
    }
  },

  save(state) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving store:', e);
    }
  },

  getState() {
    return this.load();
  },

  updateUser(updates) {
    const state = this.load();
    state.user = { ...state.user, ...updates };
    this.save(state);
    return state.user;
  },

  completeLesson(lessonId, score, xpEarned) {
    const state = this.load();
    if (!state.progress.completedLessons.includes(lessonId)) {
      state.progress.completedLessons.push(lessonId);
    }
    state.progress.lessonScores[lessonId] = {
      score,
      completedAt: new Date().toISOString()
    };
    state.user.totalXp += xpEarned;
    state.user.dailyXp += xpEarned;
    state.user.gems += Math.floor(xpEarned / 10);
    this.save(state);
    return state;
  },

  isLessonCompleted(lessonId) {
    const state = this.load();
    return state.progress.completedLessons.includes(lessonId);
  },

  isModuleCompleted(moduleId) {
    const state = this.load();
    return state.progress.completedModules.includes(moduleId);
  },

  completeModule(moduleId) {
    const state = this.load();
    if (!state.progress.completedModules.includes(moduleId)) {
      state.progress.completedModules.push(moduleId);
    }
    this.save(state);
    return state;
  },

  isModuleUnlocked(moduleIndex) {
    if (moduleIndex === 0) return true;
    const state = this.load();
    const modules = COURSE_DATA.modules;
    const prevModule = modules[moduleIndex - 1];
    return state.progress.completedModules.includes(prevModule.id);
  },

  getModuleProgress(moduleId) {
    const state = this.load();
    const module = COURSE_DATA.modules.find(m => m.id === moduleId);
    if (!module) return { completed: 0, total: 0, percent: 0 };
    const total = module.lessons.length;
    const completed = module.lessons.filter(l =>
      state.progress.completedLessons.includes(l.id)
    ).length;
    return { completed, total, percent: Math.round((completed / total) * 100) };
  },

  getLessonScore(lessonId) {
    const state = this.load();
    return state.progress.lessonScores[lessonId] || null;
  },

  addBadge(badgeId) {
    const state = this.load();
    if (!state.badges.includes(badgeId)) {
      state.badges.push(badgeId);
      this.save(state);
    }
    return state;
  },

  hasBadge(badgeId) {
    const state = this.load();
    return state.badges.includes(badgeId);
  },

  resetDailyXp() {
    const state = this.load();
    const today = new Date().toDateString();
    if (state.user.lastActiveDate !== today) {
      state.user.dailyXp = 0;
      this.save(state);
    }
    return state;
  },

  updateStreak() {
    const state = this.load();
    const today = new Date().toDateString();
    const lastActive = state.user.lastActiveDate;

    if (lastActive === today) return state.user.streak;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastActive === yesterdayStr) {
      state.user.streak += 1;
    } else if (lastActive !== today) {
      state.user.streak = 1;
    }

    state.user.lastActiveDate = today;
    this.save(state);
    return state.user.streak;
  },

  getTotalLessonsCompleted() {
    const state = this.load();
    return state.progress.completedLessons.length;
  },

  getTotalModulesCompleted() {
    const state = this.load();
    return state.progress.completedModules.length;
  },

  getNextLesson() {
    const state = this.load();
    for (const module of COURSE_DATA.modules) {
      for (const lesson of module.lessons) {
        if (!state.progress.completedLessons.includes(lesson.id)) {
          return { module, lesson };
        }
      }
    }
    return null;
  }
};

if (typeof window !== 'undefined') {
  window.Store = Store;
}
