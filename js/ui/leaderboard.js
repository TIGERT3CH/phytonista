const LeaderboardPage = {
  render() {
    const container = document.getElementById('page-leaderboard');
    const leaderboard = Gamification.getLeaderboard();
    const state = Store.getState();
    const level = Gamification.getLevel(state.user.totalXp);

    container.innerHTML = `
      <div class="leaderboard-container">
        <div class="leaderboard-header">
          <h1>🏆 Ranking</h1>
          <p style="color:var(--text-light);font-weight:600">Seu nível: <span style="color:${level.color}">${level.name}</span> (Nível ${level.level})</p>
        </div>

        <div class="leaderboard-tabs">
          <button class="tab-btn active" data-tab="xp">Por XP</button>
          <button class="tab-btn" data-tab="streak">Por Streak</button>
        </div>

        <div class="leaderboard-list" id="leaderboard-list"></div>
      </div>
    `;

    this.renderList('xp');

    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderList(btn.dataset.tab);
      });
    });
  },

  renderList(sortBy) {
    const list = document.getElementById('leaderboard-list');
    if (!list) return;

    let leaderboard = Gamification.getLeaderboard();

    if (sortBy === 'streak') {
      leaderboard.sort((a, b) => b.streak - a.streak);
    }

    list.innerHTML = leaderboard.map((user, index) => {
      const rank = index + 1;
      const rankClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
      const medals = ['🥇', '🥈', '🥉'];

      return `
        <div class="leaderboard-item ${user.isCurrentUser ? 'current-user' : ''}">
          <div class="rank ${rankClass}">${rank <= 3 ? medals[rank - 1] : rank}</div>
          <div class="user-avatar" style="background:${user.isCurrentUser ? 'linear-gradient(135deg,var(--primary),var(--secondary))' : 'var(--bg)'}">${user.avatar}</div>
          <div class="user-info">
            <div class="user-name">${user.name} ${user.isCurrentUser ? '(Você)' : ''}</div>
            <div class="user-level">${sortBy === 'streak' ? `🔥 ${user.streak} dias` : `⭐ ${user.xp} XP`}</div>
          </div>
          <div class="user-xp">${sortBy === 'xp' ? `${user.xp} XP` : `🔥 ${user.streak}`}</div>
        </div>
      `;
    }).join('');
  }
};

if (typeof window !== 'undefined') {
  window.LeaderboardPage = LeaderboardPage;
}
