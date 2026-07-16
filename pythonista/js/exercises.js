const Exercises = {
  currentExercise: null,
  editorInstance: null,
  selectedChoice: null,
  dragState: { pieces: [], placed: [] },
  correctStreak: 0,

  render(exercise, container, onComplete) {
    this.currentExercise = exercise;
    this.selectedChoice = null;
    this.correctStreak = 0;

    const wrapper = document.createElement('div');
    wrapper.className = 'exercise-container';

    const label = document.createElement('div');
    label.className = `exercise-label ${exercise.type}`;
    label.textContent = this.getTypeLabel(exercise.type);
    wrapper.appendChild(label);

    const question = document.createElement('div');
    question.className = 'exercise-question';
    question.textContent = exercise.question;
    wrapper.appendChild(question);

    switch (exercise.type) {
      case 'multiple-choice':
        this.renderMultipleChoice(exercise, wrapper, onComplete);
        break;
      case 'code-challenge':
        this.renderCodeChallenge(exercise, wrapper, onComplete);
        break;
      case 'drag-drop':
        this.renderDragDrop(exercise, wrapper, onComplete);
        break;
      case 'fill-blank':
        this.renderFillBlank(exercise, wrapper, onComplete);
        break;
    }

    container.appendChild(wrapper);
  },

  getTypeLabel(type) {
    const labels = {
      'multiple-choice': 'Múltipla Escolha',
      'code-challenge': 'Desafio de Código',
      'drag-drop': 'Arrastar e Soltar',
      'fill-blank': 'Preencher Lacuna'
    };
    return labels[type] || type;
  },

  renderMultipleChoice(exercise, container, onComplete) {
    const choicesDiv = document.createElement('div');
    choicesDiv.className = 'choices';

    exercise.choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerHTML = `
        <span class="choice-number">${String.fromCharCode(65 + index)}</span>
        <span>${choice}</span>
      `;
      btn.addEventListener('click', () => {
        if (container.querySelector('.choice-btn.correct, .choice-btn.wrong')) return;
        choicesDiv.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.selectedChoice = index;
        checkBtn.disabled = false;
      });
      choicesDiv.appendChild(btn);
    });

    container.appendChild(choicesDiv);

    const checkBtn = document.createElement('button');
    checkBtn.className = 'check-btn primary';
    checkBtn.textContent = 'Verificar';
    checkBtn.disabled = true;

    checkBtn.addEventListener('click', () => {
      if (this.selectedChoice === null) return;

      const buttons = choicesDiv.querySelectorAll('.choice-btn');
      buttons.forEach(b => b.style.pointerEvents = 'none');

      const isCorrect = this.selectedChoice === exercise.correct;

      if (isCorrect) {
        buttons[this.selectedChoice].classList.add('correct');
        this.correctStreak++;
        this.showFeedback(container, true, exercise.explanation);
      } else {
        buttons[this.selectedChoice].classList.add('wrong');
        buttons[exercise.correct].classList.add('correct');
        this.correctStreak = 0;
        this.showFeedback(container, false, exercise.explanation);
      }

      checkBtn.remove();
      onComplete(isCorrect);
    });

    container.appendChild(checkBtn);
  },

  renderCodeChallenge(exercise, container, onComplete) {
    const editorContainer = document.createElement('div');
    container.appendChild(editorContainer);

    PythonEditor.init().then(() => {
      this.editorInstance = PythonEditor.createEditor(editorContainer, exercise.template);
    }).catch(() => {
      editorContainer.innerHTML = `
        <div class="code-editor-wrapper">
          <div class="code-editor-header">
            <span>🐍 Python</span>
            <span style="color:#FF6B6B;font-size:12px">Pyodide não disponível - modo offline</span>
          </div>
          <textarea class="code-textarea" spellcheck="false">${exercise.template}</textarea>
          <div class="code-output">Execute manualmente ou envie sua resposta</div>
        </div>
      `;
      this.editorInstance = {
        getCode: () => editorContainer.querySelector('.code-textarea').value,
        getOutput: () => editorContainer.querySelector('.code-output').textContent
      };
    });

    const checkBtn = document.createElement('button');
    checkBtn.className = 'check-btn primary';
    checkBtn.textContent = '▶ Rodar e Verificar';

    checkBtn.addEventListener('click', async () => {
      checkBtn.disabled = true;
      checkBtn.textContent = 'Executando...';

      try {
        let result;
        if (PythonEditor.loaded) {
          result = await PythonEditor.runCode(this.editorInstance.getCode());
        } else {
          result = { success: true, output: '(execute manualmente)' };
        }

        const output = result.output || '';
        let isCorrect = false;

        if (exercise.validate) {
          isCorrect = exercise.validate(output, null);
        } else if (exercise.expected !== null) {
          isCorrect = output.trim() === exercise.expected;
        } else {
          isCorrect = result.success && output.trim().length > 0;
        }

        if (isCorrect) {
          this.correctStreak++;
        } else {
          this.correctStreak = 0;
        }

        this.showFeedback(container, isCorrect, exercise.explanation);
        checkBtn.remove();
        onComplete(isCorrect);
      } catch (e) {
        this.showFeedback(container, false, 'Erro ao executar: ' + e.message);
        checkBtn.disabled = false;
        checkBtn.textContent = '▶ Rodar e Verificar';
      }
    });

    container.appendChild(checkBtn);
  },

  renderDragDrop(exercise, container, onComplete) {
    this.dragState = {
      pieces: [...exercise.pieces],
      placed: [],
      correctOrder: exercise.correctOrder
    };

    const dragContainer = document.createElement('div');
    dragContainer.className = 'drag-container';

    const sourceDiv = document.createElement('div');
    sourceDiv.className = 'drag-source';
    sourceDiv.id = 'drag-source';

    const targetDiv = document.createElement('div');
    targetDiv.className = 'drag-target';
    targetDiv.id = 'drag-target';
    targetDiv.innerHTML = '<span class="drag-placeholder">Arraste os blocos aqui na ordem correta</span>';

    this.dragState.pieces.forEach((piece, index) => {
      const item = this.createDragItem(piece, index);
      sourceDiv.appendChild(item);
    });

    targetDiv.addEventListener('dragover', (e) => {
      e.preventDefault();
      targetDiv.classList.add('over');
    });

    targetDiv.addEventListener('dragleave', () => {
      targetDiv.classList.remove('over');
    });

    targetDiv.addEventListener('drop', (e) => {
      e.preventDefault();
      targetDiv.classList.remove('over');
      const pieceText = e.dataTransfer.getData('text/plain');
      const pieceIndex = e.dataTransfer.getData('index');

      if (!this.dragState.placed.includes(pieceText)) {
        this.dragState.placed.push(pieceText);

        const placeholder = targetDiv.querySelector('.drag-placeholder');
        if (placeholder) placeholder.remove();

        const item = this.createDragItem(pieceText, pieceIndex, true);
        targetDiv.appendChild(item);

        const sourceItem = sourceDiv.querySelector(`[data-index="${pieceIndex}"]`);
        if (sourceItem) sourceItem.classList.add('placed');

        if (this.dragState.placed.length === this.dragState.pieces.length) {
          checkBtn.disabled = false;
        }
      }
    });

    dragContainer.appendChild(sourceDiv);
    dragContainer.appendChild(targetDiv);
    container.appendChild(dragContainer);

    const checkBtn = document.createElement('button');
    checkBtn.className = 'check-btn primary';
    checkBtn.textContent = 'Verificar Ordem';
    checkBtn.disabled = true;

    checkBtn.addEventListener('click', () => {
      const isCorrect = this.dragState.placed.every(
        (piece, i) => piece === this.dragState.correctOrder[i]
      );

      if (isCorrect) {
        this.correctStreak++;
        this.showFeedback(container, true, exercise.explanation);
      } else {
        this.correctStreak = 0;
        this.showFeedback(container, false, `Ordem correta: ${this.dragState.correctOrder.join(' → ')}`);
      }

      checkBtn.remove();
      onComplete(isCorrect);
    });

    container.appendChild(checkBtn);
  },

  createDragItem(text, index, isTarget = false) {
    const item = document.createElement('div');
    item.className = 'drag-item';
    item.textContent = text;
    item.draggable = !isTarget;
    item.dataset.index = index;
    item.dataset.piece = text;

    if (!isTarget) {
      item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', text);
        e.dataTransfer.setData('index', index);
        item.style.opacity = '0.5';
      });

      item.addEventListener('dragend', () => {
        item.style.opacity = '1';
      });
    } else {
      item.style.cursor = 'pointer';
      item.addEventListener('click', () => {
        if (container.querySelector('.feedback')) return;
        this.dragState.placed = this.dragState.placed.filter(p => p !== text);
        item.remove();

        const sourceItem = document.querySelector(`#drag-source [data-piece="${text}"]`);
        if (sourceItem) sourceItem.classList.remove('placed');

        if (this.dragState.placed.length === 0) {
          const target = document.getElementById('drag-target');
          if (target && !target.querySelector('.drag-placeholder')) {
            const placeholder = document.createElement('span');
            placeholder.className = 'drag-placeholder';
            placeholder.textContent = 'Arraste os blocos aqui na ordem correta';
            target.appendChild(placeholder);
          }
        }

        const checkBtn = container.querySelector('.check-btn');
        if (checkBtn) checkBtn.disabled = true;
      });
    }

    return item;
  },

  renderFillBlank(exercise, container, onComplete) {
    const codeDiv = document.createElement('div');
    codeDiv.className = 'fill-code';

    let html = exercise.code;
    exercise.blanks.forEach((blank, index) => {
      html = html.replace('____', `<input type="text" class="fill-blank" data-index="${index}" placeholder="${blank.placeholder || ''}" autocomplete="off">`);
    });
    codeDiv.innerHTML = html;
    container.appendChild(codeDiv);

    const inputs = codeDiv.querySelectorAll('.fill-blank');
    inputs.forEach(input => {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          checkBtn.click();
        }
      });
      input.addEventListener('input', () => {
        const allFilled = Array.from(inputs).every(i => i.value.trim().length > 0);
        checkBtn.disabled = !allFilled;
      });
    });

    setTimeout(() => inputs[0]?.focus(), 100);

    const checkBtn = document.createElement('button');
    checkBtn.className = 'check-btn primary';
    checkBtn.textContent = 'Verificar';
    checkBtn.disabled = true;

    checkBtn.addEventListener('click', () => {
      let allCorrect = true;

      inputs.forEach((input, index) => {
        const blank = exercise.blanks[index];
        const userAnswer = input.value.trim();
        const correctAnswers = Array.isArray(blank.answer) ? blank.answer : [blank.answer];
        const isCorrect = correctAnswers.some(a =>
          userAnswer.toLowerCase() === a.toLowerCase() ||
          userAnswer === a
        );

        if (isCorrect) {
          input.classList.add('correct');
        } else {
          input.classList.add('wrong');
          allCorrect = false;
          input.value = blank.answer;
        }
        input.readOnly = true;
      });

      if (allCorrect) {
        this.correctStreak++;
        this.showFeedback(container, true, exercise.explanation);
      } else {
        this.correctStreak = 0;
        this.showFeedback(container, false, exercise.explanation);
      }

      checkBtn.remove();
      onComplete(allCorrect);
    });

    container.appendChild(checkBtn);
  },

  showFeedback(container, isCorrect, explanation) {
    const existing = container.querySelector('.feedback');
    if (existing) existing.remove();

    const feedback = document.createElement('div');
    feedback.className = `feedback ${isCorrect ? 'correct' : 'wrong'}`;
    feedback.innerHTML = `
      <span class="feedback-icon">${isCorrect ? '✅' : '❌'}</span>
      <div>
        <div class="feedback-text">${isCorrect ? 'Correto!' : 'Incorreto!'}</div>
        ${explanation ? `<div class="feedback-explanation">${explanation}</div>` : ''}
      </div>
    `;

    const exerciseContainer = container.querySelector('.exercise-container');
    if (exerciseContainer) {
      exerciseContainer.appendChild(feedback);
    } else {
      container.appendChild(feedback);
    }
  },

  showConfetti() {
    const colors = ['#6C5CE7', '#00B894', '#FDCB6E', '#FF6B6B', '#A29BFE', '#55EFC4'];
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '50vh';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDuration = (1 + Math.random()) + 's';
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 2000);
    }
  },

  reset() {
    this.currentExercise = null;
    this.editorInstance = null;
    this.selectedChoice = null;
    this.dragState = { pieces: [], placed: [] };
    this.correctStreak = 0;
  }
};

if (typeof window !== 'undefined') {
  window.Exercises = Exercises;
}
