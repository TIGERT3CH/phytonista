const Gamification = {
  XP_PER_EXERCISE: 10,
  XP_STREAK_BONUS: 5,
  XP_PERFECT_BONUS: 20,

  BADGES: [
    { id: 'first_lesson', name: 'Primeiros Passos', icon: '🎓', description: 'Complete sua primeira aula' },
    { id: 'streak_3', name: 'Foguete', icon: '🚀', description: 'Sequência de 3 dias' },
    { id: 'streak_7', name: 'Em Chamas', icon: '🔥', description: 'Sequência de 7 dias' },
    { id: 'streak_30', name: 'Lenda', icon: '👑', description: 'Sequência de 30 dias' },
    { id: 'xp_100', name: 'Centenário', icon: '💯', description: 'Ganhe 100 XP' },
    { id: 'xp_500', name: 'Guerreiro', icon: '⚔️', description: 'Ganhe 500 XP' },
    { id: 'xp_1000', name: 'Mestre', icon: '🏆', description: 'Ganhe 1000 XP' },
    { id: 'xp_5000', name: 'Lenda Suprema', icon: '🌟', description: 'Ganhe 5000 XP' },
    { id: 'module_1', name: 'Iniciante', icon: '🌱', description: 'Complete o Módulo 1' },
    { id: 'module_3', name: 'Programador', icon: '💻', description: 'Complete 3 módulos' },
    { id: 'module_5', name: 'Pythonista', icon: '🐍', description: 'Complete 5 módulos' },
    { id: 'module_all', name: 'Graduado', icon: '🎓', description: 'Complete todos os módulos' },
    { id: 'perfect_10', name: 'Perfeccionista', icon: '✨', description: 'Acerte 10 exercícios seguidos' },
    { id: 'first_code', name: 'Code Runner', icon: '▶️', description: 'Execute seu primeiro código' },
    { id: 'daily_goal', name: 'Focado', icon: '🎯', description: 'Atinja a meta diária de XP' },
  ],

  calculateXpForExercise(exerciseType) {
    const base = this.XP_PER_EXERCISE;
    if (exerciseType === 'code-challenge') return base + 5;
    if (exerciseType === 'drag-drop') return base + 3;
    return base;
  },

  calculateLessonXp(exercises, correctCount) {
    let total = 0;
    exercises.forEach(ex => {
      total += this.calculateXpForExercise(ex.type);
    });
    if (correctCount === exercises.length) {
      total += this.XP_PERFECT_BONUS;
    }
    return total;
  },

  getStreakInfo() {
    const state = Store.getState();
    const streak = state.user.streak;
    return {
      current: streak,
      message: this.getStreakMessage(streak),
      multiplier: this.getStreakMultiplier(streak)
    };
  },

  getStreakMessage(streak) {
    if (streak === 0) return 'Comece sua sequência hoje!';
    if (streak === 1) return '1 dia seguidos! Continue assim!';
    if (streak < 7) return `${streak} dias seguidos! 🔥`;
    if (streak < 30) return `${streak} dias! Você está em chamas! 🔥🔥`;
    return `${streak} dias! Uma lenda! 👑`;
  },

  getStreakMultiplier(streak) {
    if (streak >= 30) return 2.0;
    if (streak >= 14) return 1.5;
    if (streak >= 7) return 1.25;
    if (streak >= 3) return 1.1;
    return 1.0;
  },

  checkBadges() {
    const state = Store.getState();
    const newBadges = [];

    const totalXp = state.user.totalXp;
    const streak = state.user.streak;
    const completedLessons = state.progress.completedLessons.length;
    const completedModules = state.progress.completedModules.length;

    if (completedLessons >= 1) this.tryBadge('first_lesson', newBadges);
    if (streak >= 3) this.tryBadge('streak_3', newBadges);
    if (streak >= 7) this.tryBadge('streak_7', newBadges);
    if (streak >= 30) this.tryBadge('streak_30', newBadges);
    if (totalXp >= 100) this.tryBadge('xp_100', newBadges);
    if (totalXp >= 500) this.tryBadge('xp_500', newBadges);
    if (totalXp >= 1000) this.tryBadge('xp_1000', newBadges);
    if (totalXp >= 5000) this.tryBadge('xp_5000', newBadges);
    if (completedModules >= 1) this.tryBadge('module_1', newBadges);
    if (completedModules >= 3) this.tryBadge('module_3', newBadges);
    if (completedModules >= 5) this.tryBadge('module_5', newBadges);
    if (completedModules >= COURSE_DATA.modules.length) this.tryBadge('module_all', newBadges);

    if (state.user.dailyXp >= state.user.dailyGoal) {
      this.tryBadge('daily_goal', newBadges);
    }

    return newBadges;
  },

  tryBadge(badgeId, newBadges) {
    if (!Store.hasBadge(badgeId)) {
      Store.addBadge(badgeId);
      const badge = this.BADGES.find(b => b.id === badgeId);
      if (badge) newBadges.push(badge);
    }
  },

  getLeaderboard() {
    const state = Store.getState();
    const users = [
      {
        name: state.user.name || 'Você',
        xp: state.user.totalXp,
        avatar: state.user.avatar,
        isCurrentUser: true,
        streak: state.user.streak
      }
    ];

    const botUsers = [
      { name: 'PythonPro', xp: 2450, avatar: '🦅', streak: 15 },
      { name: 'CodeNinja', xp: 1890, avatar: '🥷', streak: 8 },
      { name: 'DevJúnior', xp: 1200, avatar: '👨‍💻', streak: 5 },
      { name: 'AlunaDedicada', xp: 980, avatar: '📚', streak: 12 },
      { name: 'BugHunter', xp: 750, avatar: '🐛', streak: 3 },
      { name: 'ByteExplorer', xp: 520, avatar: '🧭', streak: 2 },
      { name: 'CodeNewbie', xp: 300, avatar: '🌱', streak: 1 },
    ];

    users.push(...botUsers);
    users.sort((a, b) => b.xp - a.xp);
    return users;
  },

  getDailyProgress() {
    const state = Store.getState();
    return {
      current: state.user.dailyXp,
      goal: state.user.dailyGoal,
      percent: Math.min(100, Math.round((state.user.dailyXp / state.user.dailyGoal) * 100))
    };
  },

  getLevel(xp) {
    if (xp >= 5000) return { level: 10, name: 'Lenda Suprema', color: '#FFD700' };
    if (xp >= 3000) return { level: 9, name: 'Mestre Python', color: '#FF6B6B' };
    if (xp >= 2000) return { level: 8, name: 'Pythonista', color: '#E17055' };
    if (xp >= 1500) return { level: 7, name: 'Desenvolvedor', color: '#00B894' };
    if (xp >= 1000) return { level: 6, name: 'Programador', color: '#0984E3' };
    if (xp >= 700) return { level: 5, name: 'Explorador', color: '#6C5CE7' };
    if (xp >= 400) return { level: 4, name: 'Aprendiz', color: '#00CEC9' };
    if (xp >= 200) return { level: 3, name: 'Estudante', color: '#FDCB6E' };
    if (xp >= 50) return { level: 2, name: 'Iniciante', color: '#A29BFE' };
    return { level: 1, name: 'Novato', color: '#636E72' };
  }
};

if (typeof window !== 'undefined') {
  window.Gamification = Gamification;
}
