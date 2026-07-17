const PythonEditor = {
  pyodide: null,
  loading: false,
  loaded: false,

  async init() {
    if (this.loaded) return;
    if (this.loading) return;

    this.loading = true;
    try {
      if (typeof loadPyodide === 'undefined') {
        await this.loadScript('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js');
      }
      this.pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/'
      });
      this.loaded = true;
    } catch (e) {
      console.error('Failed to load Pyodide:', e);
      throw e;
    } finally {
      this.loading = false;
    }
  },

  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  },

  async runCode(code, stdin = '') {
    if (!this.loaded) {
      await this.init();
    }

    try {
      this.pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`);

      if (stdin) {
        this.pyodide.runPython(`
import sys
from io import StringIO
sys.stdin = StringIO(${JSON.stringify(stdin)})
`);
      }

      this.pyodide.runPython(code);

      const stdout = this.pyodide.runPython('sys.stdout.getvalue()');
      const stderr = this.pyodide.runPython('sys.stderr.getvalue()');

      this.pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

      if (stderr && stderr.trim()) {
        return { success: false, output: stderr.trim(), error: true };
      }

      return { success: true, output: stdout.trim(), error: false };
    } catch (e) {
      const errorMsg = e.message
        .replace(/PythonError: Traceback \(most recent call last\):\n\s+File "<exec>", line \d+, in <module>\n/, '')
        .trim();
      return { success: false, output: errorMsg, error: true };
    }
  },

  createEditor(container, initialCode = '# Escreva seu código aqui\n') {
    const wrapper = document.createElement('div');
    wrapper.className = 'code-editor-wrapper';

    wrapper.innerHTML = `
      <div class="code-editor-header">
        <span>🐍 Python</span>
        <button class="run-btn" id="run-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
          Rodar
        </button>
      </div>
      <textarea class="code-textarea" spellcheck="false">${initialCode}</textarea>
      <div class="code-output" id="code-output">Clique em "Rodar" para executar</div>
    `;

    container.appendChild(wrapper);

    const textarea = wrapper.querySelector('.code-textarea');
    const runBtn = wrapper.querySelector('.run-btn');
    const output = wrapper.querySelector('.code-output');

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }
    });

    runBtn.addEventListener('click', async () => {
      runBtn.disabled = true;
      runBtn.innerHTML = '<svg class="loading-spinner" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10"></circle></svg> Rodando...';
      output.className = 'code-output';
      output.textContent = 'Executando...';

      try {
        const result = await this.runCode(textarea.value);
        output.textContent = result.output || '(sem saída)';
        if (result.error) {
          output.className = 'code-output error';
        }
      } catch (e) {
        output.textContent = 'Erro ao executar: ' + e.message;
        output.className = 'code-output error';
      } finally {
        runBtn.disabled = false;
        runBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> Rodar';
      }
    });

    return {
      getCode: () => textarea.value,
      setCode: (code) => { textarea.value = code; },
      getOutput: () => output.textContent,
      clearOutput: () => { output.textContent = ''; output.className = 'code-output'; },
      run: () => runBtn.click()
    };
  }
};

if (typeof window !== 'undefined') {
  window.PythonEditor = PythonEditor;
}
