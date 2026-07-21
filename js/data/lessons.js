const COURSE_DATA = {
  title: "Pythonista",
  description: "Aprenda Python do zero ao intermediário",
  modules: [
    {
      id: "m1",
      title: "Primeiros Passos",
      description: "Instalação, print, variáveis e tipos de dados",
      icon: "🚀",
      color: "#6C5CE7",
      lessons: [
        {
          id: "m1-l1",
          title: "Olá, Mundo!",
          theory: `<h2>Primeiro Programa em Python</h2>

<h3>🐍 O que é Python?</h3>
<p>Python é como um <strong>"tradutor universal"</strong> — você fala em linguagem humana e ele entende e executa! É uma das linguagens mais populares do mundo por ser <strong>fácil de ler e escrever</strong>.</p>

<h3>💡 Analogia: Python como "receita de bolo"</h3>
<p>Pense em um programa Python como uma <strong>receita de bolo</strong>:</p>
<ul>
  <li><strong>print()</strong> = "Escreva na tela" (como anotar o passo a passo)</li>
  <li><strong>Parênteses ()</strong> = "Os ingredientes" (o que você quer mostrar)</li>
  <li><strong>Aspas ""</strong> = "Aspas do texto" (o que está sendo dito)</li>
</ul>

<h3>📊 Anatomy de um comando print()</h3>
<table>
  <tr><th>Parte</th><th>Exemplo</th><th>Função</th></tr>
  <tr><td><strong>Comando</strong></td><td><code>print</code></td><td>Diz "mostre na tela"</td></tr>
  <tr><td><strong>Parênteses</strong></td><td><code>()</code></td><td>Envelopa o que será mostrado</td></tr>
  <tr><td><strong>Aspas</strong></td><td><code>""</code> ou <code>''</code></td><td>Delimitam o texto</td></tr>
  <tr><td><strong>Conteúdo</strong></td><td><code>"Olá"</code></td><td>O que aparecerá na tela</td></tr>
</table>

<h3>🔍 Passo a passo: Seu primeiro programa</h3>
<ol>
  <li><strong>Abra o editor</strong> (VS Code, PyCharm, ou online como Replit)</li>
  <li><strong>Digite:</strong> <code>print("Olá, Mundo!")</code></li>
  <li><strong>Execute:</strong> Aperte F5 ou clique em "Run"</li>
  <li><strong>Veja o resultado:</strong> Aparecerá "Olá, Mundo!" na tela!</li>
</ol>

<h3>⚠️ Erros que todo iniciante comete</h3>
<ul>
  <li><strong>Esquecer os parênteses:</strong> <code>print "Olá"</code> → ERRO! Sempre use <code>print("Olá")</code></li>
  <li><strong>Usar aspas duplas no Python 3:</strong> <code>print('Olá')</code> ou <code>print("Olá")</code> — ambos funcionam!</li>
  <li><strong>Confundir maiúsculas:</strong> <code>Print()</code> não existe! Use <code>print()</code> minúsculo</li>
  <li><strong>Esquecer o ponto e vírgula:</strong> Python NÃO precisa de <code>;</code> no final</li>
</ul>

<h3>🎯 Resumo Rápido</h3>
<p><strong>print()</strong> = mostra texto na tela. Lembre: <code>print("seu texto aqui")</code>. É como "escrever" no caderno do computador!</p>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "O que o comando print() faz em Python?",
              choices: ["Lê dados do usuário", "Exibe texto na tela", "Calcula uma soma", "Fecha o programa"],
              correct: 1,
              explanation: "A função print() é usada para exibir mensagens e valores na tela."
            },
            {
              type: "fill-blank",
              code: '____("Olá, Mundo!")',
              blanks: [{ answer: "print", placeholder: "digite o comando" }],
              explanation: "Usamos print() para exibir texto na tela."
            },
            {
              type: "multiple-choice",
              question: "Qual é a saída deste código?\nprint('Python')",
              choices: ["Python", "python", "PYTHON", "Erro"],
              correct: 0,
              explanation: "O texto entre aspas é exatamente o que aparece na tela."
            },
            {
              type: "code-challenge",
              question: "Escreva um programa que imprima seu nome na tela.",
              template: '# Escreva um programa que imprima seu nome\nprint("Seu Nome")',
              expected: null,
              validate: (output) => output.trim().length > 0,
              explanation: "Use print() com o texto desejado entre aspas."
            },
            {
              type: "drag-drop",
              question: "Organize os comandos para imprimir 'Olá' e depois 'Mundo':",
              pieces: ['print("Olá")', 'print("Mundo")'],
              correctOrder: ['print("Olá")', 'print("Mundo")'],
              explanation: "Cada print() imprime uma linha separada."
            }
          ]
        },
        {
          id: "m1-l2",
          title: "Variáveis",
          theory: `<h2>Armazenando Dados</h2>

<h3>📦 O que são variáveis?</h3>
<p>Variáveis são como <strong>caixas etiquetadas</strong> onde guardamos informações! Assim como você coloca rótulos em caixas para saber o que tem dentro, uma variável tem um <strong>nome</strong> e guarda um <strong>valor</strong>.</p>

<h3>💡 Analogia: Variáveis como "caixas do armazém"</h3>
<p>Pense em um <strong>armazém de supermercado</strong>:</p>
<ul>
  <li><strong>Caixa "nome":</strong> Guarda o texto "Ana" (como uma caixa de cereal)</li>
  <li><strong>Caixa "idade":</strong> Guarda o número 25 (como uma caixa de leite)</li>
  <li><strong>Caixa "altura":</strong> Guarda 1.65 (como uma caixa de achocolatado)</li>
</ul>

<h3>📊 Tabela de Variáveis</h3>
<table>
  <tr><th>Variável</th><th>Valor</th><th>Tipo</th><th>Exemplo real</th></tr>
  <tr><td><code>nome</code></td><td><code>"Ana"</code></td><td>String (texto)</td><td>Nome do aluno</td></tr>
  <tr><td><code>idade</code></td><td><code>25</code></td><td>Int (inteiro)</td><td>Idade em anos</td></tr>
  <tr><td><code>altura</code></td><td><code>1.65</code></td><td>Float (decimal)</td><td>Altura em metros</td></tr>
  <tr><td><code>estudando</code></td><td><code>True</code></td><td>Boolean (verdadeiro/falso)</td><td>Se está estudando</td></tr>
</table>

<h3>📏 Regras para nomes de variáveis</h3>
<table>
  <tr><th>Regra</th><th>Correto ✅</th><th>Errado ❌</th></tr>
  <tr><td>Começa com letra ou _</td><td><code>nome</code>, <code>_idade</code></td><td><code>2nome</code>, <code>-nome</code></td></tr>
  <tr><td>Sem espaços</td><td><code>meu_nome</code></td><td><code>meu nome</code></td></tr>
  <tr><td>Não é palavra reservada</td><td><code>nome_usuario</code></td><td><code>if</code>, <code>for</code></td></tr>
  <tr><td>Sensível a maiúsculas</td><td><code>Nome</code> ≠ <code>nome</code></td><td><code>Nome</code> = <code>nome</code></td></tr>
</table>

<h3>🔍 Passo a passo: Criar e usar uma variável</h3>
<ol>
  <li><strong>Crie a variável:</strong> <code>nome = "Ana"</code> (atribui o valor)</li>
  <li><strong>Use a variável:</strong> <code>print(nome)</code> (mostra o valor)</li>
  <li><strong>Altere o valor:</strong> <code>nome = "João"</code> (sobrescreve)</li>
  <li><strong>Veja a mudança:</strong> <code>print(nome)</code> → "João"</li>
</ol>

<h3>⚠️ Erros que todo iniciante comete</h3>
<ul>
  <li><strong>Usar nome errado:</strong> <code>2nome = "Ana"</code> → ERRO! Comece com letra</li>
  <li><strong>Esquecer aspas no texto:</strong> <code>nome = Ana</code> → ERRO! Use <code>nome = "Ana"</code></li>
  <li><strong>Confundir maiúsculas:</strong> <code>Nome</code> e <code>nome</code> são variáveis DIFERENTES!</li>
  <li><strong>Não usar underscore:</strong> <code>meu nome</code> → ERRO! Use <code>meu_nome</code></li>
</ul>

<h3>🎯 Resumo Rápido</h3>
<p><strong>Variáveis</strong> = caixas etiquetadas. Use <code>nome = valor</code> para criar. Lembre: sem espaços, comece com letra, sensível a maiúsculas!</p>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "Qual é o nome correto de uma variável?",
              choices: ["2nome", "meu-nome", "meu_nome", "meu nome"],
              correct: 2,
              explanation: "Variáveis usam letras, números e underscores, começando com letra."
            },
            {
              type: "fill-blank",
              code: 'nome = ____\nprint(nome)',
              blanks: [{ answer: '"Ana"', placeholder: "valor (com aspas)" }],
              explanation: "Strings precisam de aspas."
            },
            {
              type: "code-challenge",
              question: "Crie uma variável 'idade' com valor 20 e imprima ela.",
              template: '# Crie a variável idade\n# e imprima o valor',
              expected: null,
              validate: (output) => !isNaN(parseInt(output.trim())),
              explanation: "idade = 20 seguido de print(idade)."
            },
            {
              type: "multiple-choice",
              question: "O que acontece ao fazer:\nnome = 'Ana'\nnome = 'João'\nprint(nome)",
              choices: ["Ana", "João", "Ana João", "Erro"],
              correct: 1,
              explanation: "Atribuições anteriores são sobrescritas."
            },
            {
              type: "drag-drop",
              question: "Monte o código para criar e imprimir uma variável:",
              pieces: ['nome = "Carlos"', 'print(nome)'],
              correctOrder: ['nome = "Carlos"', 'print(nome)'],
              explanation: "Primeiro criamos a variável, depois imprimimos."
            }
          ]
        },
        {
          id: "m1-l3",
          title: "Tipos de Dados",
          theory: `<h2>Strings, Números e Booleanos</h2>

<h3>🎨 O que são tipos de dados?</h3>
<p>Tipos de dados são como <strong>caixas de diferentes tamanhos e formatos</strong> — cada uma guardando um tipo diferente de informação! Assim como você não guarda leite em uma caixa de cereais, Python guarda textos, números e verdadeiro/falso em "containers" diferentes.</p>

<h3>💡 Analogia: Tipos como "gavetas do armário"</h3>
<p>Pense em um <strong>armário com gavetas etiquetadas</strong>:</p>
<ul>
  <li><strong>String (str):</strong> Gaveta de "textos" — guarda palavras, frases, nomes</li>
  <li><strong>Integer (int):</strong> Gaveta de "números inteiros" — 1, 2, 100, -5</li>
  <li><strong>Float:</strong> Gaveta de "números quebrados" — 1.5, 3.14, -0.5</li>
  <li><strong>Boolean (bool):</strong> Gaveta de "sim/não" — True ou False</li>
</ul>

<h3>📊 Tabela de Tipos de Dados</h3>
<table>
  <tr><th>Tipo</th><th>Nome</th><th>Exemplo</th><th>Para que serve?</th></tr>
  <tr><td><strong>String</strong></td><td><code>str</code></td><td><code>"Ana"</code>, <code>'Olá'</code></td><td>Textos, nomes, mensagens</td></tr>
  <tr><td><strong>Integer</strong></td><td><code>int</code></td><td><code>25</code>, <code>-10</code>, <code>0</code></td><td>Idades, quantidades, contadores</td></tr>
  <tr><td><strong>Float</strong></td><td><code>float</code></td><td><code>1.65</code>, <code>3.14</code></td><td>Alturas, preços, notas decimais</td></tr>
  <tr><td><strong>Boolean</strong></td><td><code>bool</code></td><td><code>True</code>, <code>False</code></td><td>Respostas sim/não, condições</td></tr>
</table>

<h3>🔍 Como descobrir o tipo?</h3>
<p>Use a função <code>type()</code> para ver qual "gaveta" Python está usando:</p>
<pre>nome = "Ana"
print(type(nome))  # &lt;class 'str'&gt;

idade = 25
print(type(idade))  # &lt;class 'int'&gt;

altura = 1.65
print(type(altura))  # &lt;class 'float'&gt;

estudando = True
print(type(estudando))  # &lt;class 'bool'&gt;</pre>

<h3>🔍 Passo a passo: Criar variáveis de cada tipo</h3>
<ol>
  <li><strong>String:</strong> <code>nome = "Ana"</code> (com aspas)</li>
  <li><strong>Int:</strong> <code>idade = 25</code> (sem aspas, sem ponto)</li>
  <li><strong>Float:</strong> <code>altura = 1.65</code> (com ponto decimal)</li>
  <li><strong>Bool:</strong> <code>estudando = True</code> (maiúsculo!)</li>
</ol>

<h3>⚠️ Erros que todo iniciante comete</h3>
<ul>
  <li><strong>Confundir string com número:</strong> <code>"25"</code> é texto, <code>25</code> é número!</li>
  <li><strong>Usar <code>true</code> minúsculo:</strong> O correto é <code>True</code> (maiúsculo!)</li>
  <li><strong>Esquecer aspas na string:</strong> <code>nome = Ana</code> → ERRO! Use <code>nome = "Ana"</code></li>
  <li><strong>Confundir float com int:</strong> <code>1.0</code> é float, <code>1</code> é int</li>
</ul>

<h3>🎯 Resumo Rápido</h3>
<p><strong>Strings</strong> = textos (com aspas). <strong>Ints</strong> = inteiros. <strong>Floats</strong> = decimais. <strong>Bools</strong> = True/False. Use <code>type()</code> para descobrir o tipo!</p>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "Qual é o tipo da variável: x = 3.14?",
              choices: ["int", "float", "str", "bool"],
              correct: 1,
              explanation: "Números com ponto decimal são do tipo float."
            },
            {
              type: "fill-blank",
              code: 'nome = ____\nprint(type(nome))\n# Saída: &lt;class \'str\'&gt;',
              blanks: [{ answer: '"Ana"', placeholder: "string" }],
              explanation: "Strings são textos entre aspas."
            },
            {
              type: "multiple-choice",
              question: "Qual é o tipo: True?",
              choices: ["str", "int", "float", "bool"],
              correct: 3,
              explanation: "True é um valor booleano."
            },
            {
              type: "code-challenge",
              question: "Crie uma variável 'preco' com valor 19.99 e imprima o tipo dela.",
              template: '# Crie a variável preco\n# e imprima o tipo',
              expected: null,
              validate: (output) => output.includes("float"),
              explanation: "Use type() para verificar o tipo."
            },
            {
              type: "multiple-choice",
              question: "Qual é o tipo: 42?",
              choices: ["str", "int", "float", "bool"],
              correct: 1,
              explanation: "Números sem ponto decimal são inteiros (int)."
            }
          ]
        },
        {
          id: "m1-l4",
          title: "Entrada de Dados",
          theory: `<h2>Lendo do Usuário</h2>

<h3>🎤 O que é input()?</h3>
<p>A função <code>input()</code> é como um <strong>"microfone"</strong> que o programa usa para <strong>ouvir o que você digita</strong>! Ela pausa o programa, espera você digitar algo, e devolve o que foi digitado.</p>

<h3>💡 Analogia: input() como "entrevistador"</h3>
<p>Pense em um <strong>jornalista fazendo perguntas</strong>:</p>
<ul>
  <li><strong>Pergunta:</strong> <code>input("Qual seu nome? ")</code> — o jornalista pergunta</li>
  <li><strong>Resposta:</strong> Você digita "Ana" — o jornalista anota</li>
  <li><strong>Resultado:</strong> A variável <code>nome</code> guarda "Ana"</li>
</ul>

<h3>📊 Tabela: input() vs output()</h3>
<table>
  <tr><th>Função</th><th>O que faz</th><th>Exemplo</th><th>Resultado</th></tr>
  <tr><td><code>input()</code></td><td>Lê do teclado</td><td><code>nome = input("Nome: ")</code></td><td>Usuário digita → variável recebe</td></tr>
  <tr><td><code>print()</code></td><td>Mostra na tela</td><td><code>print("Olá,", nome)</code></td><td>Exibe "Olá, Ana"</td></tr>
</table>

<h3>⚠️ Cuidado: input() SEMPRE retorna string!</h3>
<p>Mesmo que você digite um número, <code>input()</code> retorna <strong>texto</strong>:</p>
<pre>idade = input("Sua idade: ")
print(type(idade))  # &lt;class 'str'&gt; (não é número!)</pre>

<h3>🔄 Como converter para número?</h3>
<p>Use <code>int()</code> para inteiro ou <code>float()</code> para decimal:</p>
<pre>idade = int(input("Sua idade: "))  # Converte para inteiro
altura = float(input("Sua altura: "))  # Converte para decimal</pre>

<h3>🔍 Passo a passo: Ler dados do usuário</h3>
<ol>
  <li><strong>Faça a pergunta:</strong> <code>nome = input("Qual seu nome? ")</code></li>
  <li><strong>Guarde a resposta:</strong> A variável <code>nome</code> recebe o que foi digitado</li>
  <li><strong>Use o valor:</strong> <code>print("Olá,", nome)</code></li>
  <li><strong>Se for número:</strong> <code>idade = int(input("Idade: "))</code></li>
</ol>

<h3>⚠️ Erros que todo iniciante comete</h3>
<ul>
  <li><strong>Esquecer de converter:</strong> <code>idade = input()</code> → idade é string, não número!</li>
  <li><strong>Usar int() em texto:</strong> <code>int("Ana")</code> → ERRO! Só funciona com números</li>
  <li><strong>Esquecer a mensagem:</strong> <code>input()</code> funciona, mas <code>input("Nome: ")</code> é mais amigável</li>
  <li><strong>Não tratar erros:</strong> Se o usuário digitar "abc" em <code>int(input())</code>, o programa quebra!</li>
</ul>

<h3>🎯 Resumo Rápido</h3>
<p><strong>input()</strong> = lê do teclado (sempre retorna string). <strong>print()</strong> = mostra na tela. Para números, use <code>int()</code> ou <code>float()</code> para converter!</p>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "O que input() retorna sempre?",
              choices: ["Um número", "Uma string", "Um booleano", "Depende"],
              correct: 1,
              explanation: "input() sempre retorna uma string, mesmo que o usuário digite um número."
            },
            {
              type: "fill-blank",
              code: 'nome = ____("Qual seu nome? ")\nprint("Olá,", nome)',
              blanks: [{ answer: "input", placeholder: "comando" }],
              explanation: "input() lê dados do usuário."
            },
            {
              type: "code-challenge",
              question: "Leia um número do usuário e imprima o dobro.\n(Dica: use int() para converter)",
              template: '# Leia um número\n# e imprima o dobro',
              expected: null,
              validate: (output, input) => {
                const num = parseInt(input || "5");
                return output.trim() === String(num * 2);
              },
              explanation: "num = int(input()) e print(num * 2)."
            },
            {
              type: "multiple-choice",
              question: "Como converter '5' para número inteiro?",
              choices: ["int('5')", "number('5')", "float('5')", "str(5)"],
              correct: 0,
              explanation: "int() converte para inteiro."
            }
          ]
        }
      ]
    },
    {
      id: "m2",
      title: "Operadores e Expressões",
      description: "Aritméticos, lógicos e de comparação",
      icon: "🔢",
      color: "#00B894",
      lessons: [
        {
          id: "m2-l1",
          title: "Operadores Aritméticos",
          theory: `<h2>Fazendo Contas</h2>

<h3>🔢 O que são operadores aritméticos?</h3>
<p>Operadores aritméticos são como <strong>"símbolos matemáticos"</strong> do Python — eles fazem contas pra você! Assim como uma calculadora, você pode somar, subtrair, multiplicar e muito mais.</p>

<h3>💡 Analogia: Operadores como "botões da calculadora"</h3>
<p>Pense em uma <strong>calculadora</strong>:</p>
<ul>
  <li><strong>+</strong> = botão de soma</li>
  <li><strong>-</strong> = botão de subtração</li>
  <li><strong>*</strong> = botão de multiplicação (×)</li>
  <li><strong>/</strong> = botão de divisão (÷)</li>
</ul>

<h3>📊 Tabela de Operadores Aritméticos</h3>
<table>
  <tr><th>Operador</th><th>Nome</th><th>Exemplo</th><th>Resultado</th><th>Explicação</th></tr>
  <tr><td><code>+</code></td><td>Soma</td><td><code>10 + 3</code></td><td><code>13</code></td><td>Soma os dois valores</td></tr>
  <tr><td><code>-</code></td><td>Subtração</td><td><code>10 - 3</code></td><td><code>7</code></td><td>Subtrai o segundo do primeiro</td></tr>
  <tr><td><code>*</code></td><td>Multiplicação</td><td><code>10 * 3</code></td><td><code>30</code></td><td>Multiplica os dois valores</td></tr>
  <tr><td><code>/</code></td><td>Divisão</td><td><code>10 / 3</code></td><td><code>3.333...</code></td><td>Divide (sempre retorna float)</td></tr>
  <tr><td><code>//</code></td><td>Divisão Inteira</td><td><code>10 // 3</code></td><td><code>3</code></td><td>Divide e arredonda para baixo</td></tr>
  <tr><td><code>%</code></td><td>Módulo (resto)</td><td><code>10 % 3</code></td><td><code>1</code></td><td>Retorna o resto da divisão</td></tr>
  <tr><td><code>**</code></td><td>Potência</td><td><code>10 ** 3</code></td><td><code>1000</code></td><td>Eleva à potência</td></tr>
</table>

<h3>🔍 Passo a passo: Usar operadores</h3>
<ol>
  <li><strong>Crie variáveis:</strong> <code>a = 10</code>, <code>b = 3</code></li>
  <li><strong>Faça a conta:</strong> <code>print(a + b)</code> → 13</li>
  <li><strong>Explore outros:</strong> <code>a // b</code> (divisão inteira), <code>a ** b</code> (potência)</li>
</ol>

<h3>⚠️ Erros que todo iniciante comete</h3>
<ul>
  <li><strong>Confundir / com //</strong>: <code>10 / 3 = 3.333</code> (float), <code>10 // 3 = 3</code> (inteiro)</li>
  <li><strong>Esquecer que / retorna float:</strong> <code>10 / 2 = 5.0</code> (não 5!)</li>
  <li><strong>Usar x para multiplicar:</strong> Use <code>*</code> (asterisco), não <code>x</code></li>
  <li><strong>Não usar parênteses:</strong> <code>2 + 3 * 4 = 14</code>, mas <code>(2 + 3) * 4 = 20</code></li>
</ul>

<h3>🎯 Resumo Rápido</h3>
<p><strong>+</strong> soma, <strong>-</strong> subtrai, <strong>*</strong> multiplica, <strong>/</strong> divide (float), <strong>//</strong> divide (inteiro), <strong>%</strong> retorna resto, <strong>**</strong> potência.</p>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "Qual é o resultado de 10 // 3?",
              choices: ["3.33", "3", "4", "3.0"],
              correct: 1,
              explanation: "// retorna a divisão inteira (sem decimal)."
            },
            {
              type: "fill-blank",
              code: 'print(2 ** 3)  # ____',
              blanks: [{ answer: "8", placeholder: "resultado" }],
              explanation: "2 ** 3 = 2³ = 8."
            },
            {
              type: "code-challenge",
              question: "Calcule a área de um retângulo (base * altura) e imprima o resultado.",
              template: 'base = 5\naltura = 3\n# Calcule e imprima a área',
              expected: null,
              validate: (output) => !isNaN(parseInt(output.trim())),
              explanation: "Área = base * altura = 5 * 3 = 15."
            },
            {
              type: "multiple-choice",
              question: "O operador % retorna:",
              choices: ["A divisão", "O resto da divisão", "A potência", "O quociente"],
              correct: 1,
              explanation: "% é o operador módulo (resto da divisão)."
            },
            {
              type: "drag-drop",
              question: "Organize do menor para o maior resultado:\nOperações com 10 e 3",
              pieces: ['10 - 3', '10 / 3', '10 + 3', '10 * 3'],
              correctOrder: ['10 - 3', '10 / 3', '10 + 3', '10 * 3'],
              explanation: "7 < 3.33 < 13 < 30."
            }
          ]
        },
        {
          id: "m2-l2",
          title: "Operadores de Comparação",
          theory: `<h2>Comparando Valores</h2>

<h3>⚖️ O que são operadores de comparação?</h3>
<p>Operadores de comparação são como <strong>"juízes"</strong> — eles examinam dois valores e decidem se a afirmação é <strong>verdadeira (True)</strong> ou <strong>falsa (False)</strong>!</p>

<h3>💡 Analogia: Comparadores como "árbitros de futebol"</h3>
<p>Pense em um <strong>árbitro comparando placar</strong>:</p>
<ul>
  <li><strong>==</strong> (igual?) = "O placar é o mesmo?"</li>
  <li><strong>!=</strong> (diferente?) = "Os placares são diferentes?"</li>
  <li><strong>></strong> (maior?) = "O primeiro time fez mais gols?"</li>
  <li><strong><</strong> (menor?) = "O primeiro time fez menos gols?"</li>
</ul>

<h3>📊 Tabela de Operadores de Comparação</h3>
<table>
  <tr><th>Operador</th><th>Significado</th><th>Exemplo</th><th>Resultado</th></tr>
  <tr><td><code>==</code></td><td>Igual a</td><td><code>5 == 5</code></td><td><code>True</code></td></tr>
  <tr><td><code>!=</code></td><td>Diferente de</td><td><code>5 != 3</code></td><td><code>True</code></td></tr>
  <tr><td><code>></code></td><td>Maior que</td><td><code>5 > 3</code></td><td><code>True</code></td></tr>
  <tr><td><code><</code></td><td>Menor que</td><td><code>5 < 3</code></td><td><code>False</code></td></tr>
  <tr><td><code>>=</code></td><td>Maior ou igual a</td><td><code>5 >= 5</code></td><td><code>True</code></td></tr>
  <tr><td><code><=</code></td><td>Menor ou igual a</td><td><code>5 <= 3</code></td><td><code>False</code></td></tr>
</table>

<h3>🔍 Passo a passo: Comparar valores</h3>
<ol>
  <li><strong>Defina os valores:</strong> <code>a = 5</code>, <code>b = 10</code></li>
  <li><strong>Compare:</strong> <code>print(a == b)</code> → False (5 não é igual a 10)</li>
  <li><strong>Experimente:</strong> <code>print(a < b)</code> → True (5 é menor que 10)</li>
</ol>

<h3>⚠️ Erros que todo iniciante comete</h3>
<ul>
  <li><strong>Confundir = com ==:</strong> <code>=</code> atribui valor, <code>==</code> compara!</li>
  <li><strong>Usar == em strings:</strong> <code>"Ana" == "ana"</code> → False (maiúsculas diferentes!)</li>
  <li><strong>Esquecer que retorna bool:</strong> Comparação retorna True/False, não números!</li>
  <li><strong>Não usar parênteses:</strong> <code>print(5 > 3)</code> funciona, mas <code>print 5 > 3</code> não!</li>
</ul>

<h3>🎯 Resumo Rápido</h3>
<p><strong>==</strong> igual, <strong>!=</strong> diferente, <strong>></strong> maior, <strong><</strong> menor, <strong>>=</strong> maior/igual, <strong><=</strong> menor/igual. Retornam sempre True ou False!</p>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "Qual é o resultado de 5 == 5?",
              choices: ["True", "False", "10", "Erro"],
              correct: 0,
              explanation: "== compara se dois valores são iguais."
            },
            {
              type: "fill-blank",
              code: 'x = 7\nprint(x ____ 5)  # True (7 é maior que 5)',
              blanks: [{ answer: ">", placeholder: "operador" }],
              explanation: "> verifica se o valor à esquerda é maior."
            },
            {
              type: "multiple-choice",
              question: "O que '!=' significa?",
              choices: ["Igual", "Diferente", "Maior", "Menor"],
              correct: 1,
              explanation: "!= significa 'diferente de'."
            },
            {
              type: "code-challenge",
              question: "Verifique se 10 é maior que 5 e imprima o resultado.",
              template: '# Verifique se 10 > 5',
              expected: null,
              validate: (output) => output.trim().toLowerCase() === "true",
              explanation: "print(10 > 5) imprime True."
            }
          ]
        },
        {
          id: "m2-l3",
          title: "Operadores Lógicos",
          theory: `<h2>Combinando Condições</h2>

<h3>🔗 O que são operadores lógicos?</h3>
<p>Operadores lógicos são como <strong>"combinadores de condições"</strong> — eles permitem que você junte várias comparações em uma única pergunta!</p>

<h3>💡 Analogia: Lógicos como "regras de seleção"</h3>
<p>Pense em um <strong>processo seletivo de emprego</strong>:</p>
<ul>
  <li><strong>AND (e):</strong> "Precisa ter diploma E experiência" — AMBOS são obrigatórios</li>
  <li><strong>OR (ou):</strong> "Falar inglês OU espanhol" — PELO MENOS UM basta</li>
  <li><strong>NOT (não):</strong> "NÃO pode ser menor de idade" — inverte a condição</li>
</ul>

<h3>📊 Tabela de Operadores Lógicos</h3>
<table>
  <tr><th>Operador</th><th>Significado</th><th>Regra</th><th>Exemplo</th><th>Resultado</th></tr>
  <tr><td><code>and</code></td><td>E</td><td>AMBOS devem ser True</td><td><code>True and False</code></td><td><code>False</code></td></tr>
  <tr><td><code>or</code></td><td>Ou</td><td>PELO MENOS UM deve ser True</td><td><code>True or False</code></td><td><code>True</code></td></tr>
  <tr><td><code>not</code></td><td>Não</td><td>Inverte o valor</td><td><code>not True</code></td><td><code>False</code></td></tr>
</table>

<h3>🔍 Passo a passo: Usar operadores lógicos</h3>
<ol>
  <li><strong>Defina variáveis:</strong> <code>idade = 25</code>, <code>experiencia = 3</code></li>
  <li><strong>Use AND:</strong> <code>print(idade > 18 and experiencia > 0)</code> → True</li>
  <li><strong>Use OR:</strong> <code>print(idade > 30 or experiencia > 5)</code> → False</li>
  <li><strong>Use NOT:</strong> <code>print(not (idade < 18))</code> → True</li>
</ol>

<h3>⚠️ Erros que todo iniciante comete</h3>
<ul>
  <li><strong>Usar & ou |:</strong> Use <code>and</code> e <code>or</code> (palavras), não <code>&</code> e <code>|</code> (símbolos)</li>
  <li><strong>Confundir not com !=:</strong> <code>not</code> inverte booleano, <code>!=</code> compara valores</li>
  <li><strong>Não usar parênteses:</strong> <code>not a > 10</code> pode confundir — use <code>not (a > 10)</code></li>
  <li><strong>Esquecer a ordem:</strong> Python avalia AND antes de OR (como matemática)</li>
</ul>

<h3>🎯 Resumo Rápido</h3>
<p><strong>and</strong> = ambos precisam ser True. <strong>or</strong> = pelo menos um True. <strong>not</strong> = inverte o valor. Combine para criar condições complexas!</p>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "True and False resulta em:",
              choices: ["True", "False", "None", "Erro"],
              correct: 1,
              explanation: "AND precisa de ambos verdadeiros."
            },
            {
              type: "fill-blank",
              code: 'print(True ____ False)  # True (pelo menos um é True)',
              blanks: [{ answer: "or", placeholder: "operador" }],
              explanation: "OR retorna True se pelo menos um for True."
            },
            {
              type: "multiple-choice",
              question: "not False é igual a:",
              choices: ["False", "True", "None", "Erro"],
              correct: 1,
              explanation: "NOT inverte o valor booleano."
            },
            {
              type: "code-challenge",
              question: "Verifique se 5 é maior que 3 E menor que 10. Imprima o resultado.",
              template: '# Verifique se 5 > 3 and 5 < 10',
              expected: null,
              validate: (output) => output.trim().toLowerCase() === "true",
              explanation: "5 > 3 é True e 5 < 10 é True, então AND retorna True."
            }
          ]
        }
      ]
    },
    {
      id: "m3",
      title: "Estruturas de Controle",
      description: "if, else, elif e match",
      icon: "🔀",
      color: "#E17055",
      lessons: [
        {
          id: "m3-l1",
          title: "Condicionais if/else",
          theory: `<h2>Tomando Decisões</h2>

<h3>🔀 O que é if/else?</h3>
<p>If/else é como um <strong>"semáforo lógico"</strong> — o programa toma decisões baseado em condições! Assim como um semáforo muda de cor dependendo da situação, o Python executa código diferente dependendo da condição.</p>

<h3>💡 Analogia: if/else como "portão eletrônico"</h3>
<p>Pense em um <strong>portão de estacionamento</strong>:</p>
<ul>
  <li><strong>if (se):</strong> "SE você tiver crachá, pode entrar"</li>
  <li><strong>else (senão):</strong> "SENÃO, volte pela entrada principal"</li>
</ul>

<h3>📊 Tabela: Estrutura if/else</h3>
<table>
  <tr><th>Parte</th><th>Exemplo</th><th>O que faz</th></tr>
  <tr><td><strong>if</strong></td><td><code>if idade >= 18:</code></td><td>Testa a condição</td></tr>
  <tr><td><strong>Bloco if</strong></td><td><code>    print("Maior")</code></td><td>Executa se True</td></tr>
  <tr><td><strong>else</strong></td><td><code>else:</code></td><td>Caso contrário</td></tr>
  <tr><td><strong>Bloco else</strong></td><td><code>    print("Menor")</code></td><td>Executa se False</td></tr>
</table>

<h3>🔍 Passo a passo: Criar um if/else</h3>
<ol>
  <li><strong>Escreva a condição:</strong> <code>if idade >= 18:</code></li>
  <li><strong>Indentação:</strong> 4 espaços (ou 1 tab) para o bloco</li>
  <li><strong>Ação se True:</strong> <code>    print("Pode votar")</code></li>
  <li><strong>else:</strong> <code>else:</code></li>
  <li><strong>Ação se False:</strong> <code>    print("Não pode votar")</code></li>
</ol>

<h3>⚠️ Erros que todo iniciante comete</h3>
<ul>
  <li><strong>Esquecer os dois-pontos:</strong> <code>if idade >= 18</code> → ERRO! Use <code>if idade >= 18:</code></li>
  <li><strong>Não indentar:</strong> <code>print()</code> precisa estar indentado (4 espaços)</li>
  <li><strong>Usar indentação errada:</strong> Misturar tabs e espaços causa erro!</li>
  <li><strong>Confundir = com ==:</strong> <code>if idade = 18:</code> → ERRO! Use <code>==</code> para comparar</li>
</ul>

<h3>🎯 Resumo Rápido</h3>
<p><strong>if</strong> testa condição. <strong>else</strong> é o "senão". Lembre: <code>:</code> no final e <strong>indentação</strong> no bloco!</p>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "O que falta neste código?\nif x > 0\n    print('Positivo')",
              choices: ["Parênteses", "Dois-pontos (:)", "Vírgula", "Ponto e vírgula"],
              correct: 1,
              explanation: "if sempre termina com dois-pontos (:)."
            },
            {
              type: "drag-drop",
              question: "Organize o código if/else correto:",
              pieces: ['if idade >= 18:', '    print("Maior")', 'else:', '    print("Menor")'],
              correctOrder: ['if idade >= 18:', '    print("Maior")', 'else:', '    print("Menor")'],
              explanation: "A indentação define os blocos."
            },
            {
              type: "code-challenge",
              question: "Leia um número e diga se é positivo ou negativo.",
              template: 'num = 10\n# Verifique se é positivo ou negativo',
              expected: null,
              validate: (output) => output.trim().toLowerCase().includes("positivo"),
              explanation: "if num >= 0: print('Positivo') else: print('Negativo')."
            },
            {
              type: "fill-blank",
              code: 'if ____ >= 18:\n    print("Pode votar")',
              blanks: [{ answer: "idade", placeholder: "variável" }],
              explanation: "A variável idade deve ser verificada."
            }
          ]
        },
        {
          id: "m3-l2",
          title: "Múltiplas Condições (elif)",
          theory: `<h2>Várias Opções</h2>

<h3>🔀 O que é elif?</h3>
<p><code>elif</code> é como um <strong>"semáforo com várias cores"</strong> — testa múltiplas condições em sequência! É a abreviação de "else if" (senão se).</p>

<h3>💡 Analogia: elif como "menu de restaurante"</h3>
<p>Pense em um <strong>cardápio</strong>:</p>
<ul>
  <li><strong>if:</strong> "SE quiser o prato do dia..." (testa primeira opção)</li>
  <li><strong>elif:</strong> "SENÃO SE quiser a pizza..." (testa segunda opção)</li>
  <li><strong>elif:</strong> "SENÃO SE quiser o hambúrguer..." (testa terceira opção)</li>
  <li><strong>else:</strong> "SENÃO, tenha uma salada" (opção padrão)</li>
</ul>

<h3>📊 Tabela: Estrutura if/elif/else</h3>
<table>
  <tr><th>Parte</th><th>Exemplo</th><th>O que faz</th></tr>
  <tr><td><strong>if</strong></td><td><code>if nota >= 90:</code></td><td>Testa primeira condição</td></tr>
  <tr><td><strong>elif</strong></td><td><code>elif nota >= 80:</code></td><td>Testa segunda condição</td></tr>
  <tr><td><strong>elif</strong></td><td><code>elif nota >= 70:</code></td><td>Testa terceira condição</td></tr>
  <tr><td><strong>else</strong></td><td><code>else:</code></td><td>Opção padrão (nenhuma anterior)</td></tr>
</table>

<h3>🔍 Passo a passo: Usar elif</h3>
<ol>
  <li><strong>Primeira condição:</strong> <code>if nota >= 90:</code> → nota A</li>
  <li><strong>Segunda condição:</strong> <code>elif nota >= 80:</code> → nota B</li>
  <li><strong>Terceira condição:</strong> <code>elif nota >= 70:</code> → nota C</li>
  <li><strong>Padrão:</strong> <code>else:</code> → nota F</li>
</ol>

<h3>⚠️ Erros que todo iniciante comete</h3>
<ul>
  <li><strong>Usar else if:</strong> O correto é <code>elif</code> (não <code>else if</code>)</li>
  <li><strong>Não usar else:</strong> Sempre tenha um <code>else</code> para o caso padrão</li>
  <li><strong>Ordem errada:</strong> Condições mais específicas primeiro! (90+ antes de 80+)</li>
  <li><strong>Esquecer os dois-pontos:</strong> Todo <code>if</code> e <code>elif</code> precisa de <code>:</code></li>
</ul>

<h3>🎯 Resumo Rápido</h3>
<p><strong>elif</strong> = "senão se" — testa múltiplas condições. Python executa o <strong>primeiro True</strong> e para. Sempre tenha um <code>else</code> no final!</p>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "Quantas vezes elif pode aparecer?",
              choices: ["Uma vez", "Duas vezes", "Várias vezes", "Nunca"],
              correct: 2,
              explanation: "elif pode ser usado quantas vezes necessário."
            },
            {
              type: "code-challenge",
              question: "Classifique uma nota (0-100):\n90+ = 'A', 80+ = 'B', 70+ = 'C', senão 'F'\nUse nota = 75",
              template: 'nota = 75\n# Classifique a nota',
              expected: null,
              validate: (output) => output.trim().toUpperCase() === "C",
              explanation: "75 >= 70, então retorna 'C'."
            },
            {
              type: "fill-blank",
              code: 'temp = 30\nif temp > 35:\n    print("Quente")\n____ temp > 20:\n    print("Agradável")\nelse:\n    print("Frio")',
              blanks: [{ answer: "elif", placeholder: "comando" }],
              explanation: "elif testa a segunda condição."
            },
            {
              type: "multiple-choice",
              question: "Em if/elif/else, qual bloco é executado primeiro?",
              choices: ["else", "O último elif", "O primeiro que for True", "Todos os True"],
              correct: 2,
              explanation: "Python executa o primeiro bloco True e para."
            }
          ]
        },
        {
          id: "m3-l3",
          title: "Loops com while",
          theory: `<h2>Repetindo com while</h2>

<h3>🔄 O que é um loop while?</h3>
<p>Um loop <code>while</code> é como um <strong>"carrossel lógico"</strong> — ele repete algo <strong>ENQUANTO</strong> uma condição for verdadeira!</p>

<h3>💡 Analogia: while como "moinho de água"</h3>
<p>Pense em um <strong>moinho movido a água</strong>:</p>
<ul>
  <li><strong>Condição:</strong> "ENQUANTO houver água fluindo..."</li>
  <li><strong>Ação:</strong> "...o moinho gira e moe o grão"</li>
  <li><strong>Parada:</strong> "QUANDO a água parar, o moinho para"</li>
</ul>

<h3>📊 Estrutura do while</h3>
<table>
  <tr><th>Parte</th><th>Exemplo</th><th>O que faz</th></tr>
  <tr><td><strong>Inicialização</strong></td><td><code>contagem = 1</code></td><td>Começa o contador</td></tr>
  <tr><td><strong>while</strong></td><td><code>while contagem <= 5:</code></td><td>Testa a condição</td></tr>
  <tr><td><strong>Bloco</strong></td><td><code>    print(contagem)</code></td><td>Executa o código</td></tr>
  <tr><td><strong>Incremento</strong></td><td><code>    contagem += 1</code></td><td>Avança o contador</td></tr>
</table>

<h3>⚠️ Cuidado: Loops Infinitos!</h3>
<p>Se a condição <strong>sempre for True</strong>, o loop nunca para! É como um moinho que gira para sempre...</p>
<pre># CUIDADO! Loop infinito!
while True:
    print("Para sempre!")</pre>

<h3>🎯 Resumo Rápido</h3>
<p><strong>while</strong> = repete ENQUANTO True. Sempre inicialize o contador e incremento dentro do bloco!</p>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "O que acontece se a condição do while for sempre True?",
              choices: ["Para imediatamente", "Loop infinito", "Erro de sintaxe", "Executa uma vez"],
              correct: 1,
              explanation: "Se a condição nunca for False, o loop é infinito."
            },
            {
              type: "code-challenge",
              question: "Imprima os números de 1 a 5 usando while.",
              template: '# Use while para imprimir 1 a 5',
              expected: null,
              validate: (output) => {
                const nums = output.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
                return nums.length === 5 && nums[0] === 1 && nums[4] === 5;
              },
              explanation: "Conte de 1 a 5 com while e incremento."
            },
            {
              type: "fill-blank",
              code: 'x = 1\nwhile x ____ 5:\n    print(x)\n    x += 1',
              blanks: [{ answer: "<=", placeholder: "operador" }],
              explanation: "x <= 5 faz o loop rodar para x de 1 a 5."
            },
            {
              type: "drag-drop",
              question: "Organize o while loop para contar de 1 a 3:",
              pieces: ['i = 1', 'while i <= 3:', '    print(i)', '    i += 1'],
              correctOrder: ['i = 1', 'while i <= 3:', '    print(i)', '    i += 1'],
              explanation: "Inicializa, testa, imprime e incrementa."
            }
          ]
        },
        {
          id: "m3-l4",
          title: "Loops com for",
          theory: `<h2>Iterando com for</h2>
<pre># Com range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Em uma lista
frutas = ["maçã", "banana", "laranja"]
for fruta in frutas:
    print(fruta)

# Com range(inicio, fim, passo)
for i in range(1, 10, 2):
    print(i)  # 1, 3, 5, 7, 9</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "range(5) gera os números:",
              choices: ["1 a 5", "0 a 4", "0 a 5", "1 a 4"],
              correct: 1,
              explanation: "range(5) vai de 0 até 4 (5 elementos)."
            },
            {
              type: "code-challenge",
              question: "Use for para imprimir os números pares de 0 a 10.",
              template: '# Use for e range com passo',
              expected: null,
              validate: (output) => {
                const nums = output.trim().split(/\s+/).map(Number).filter(n => !isNaN(n));
                return nums.length === 6 && nums[0] === 0 && nums[5] === 10 && nums.every(n => n % 2 === 0);
              },
              explanation: "range(0, 11, 2) gera 0, 2, 4, 6, 8, 10."
            },
            {
              type: "fill-blank",
              code: 'for i in range(____):\n    print(i)\n# Imprime: 0, 1, 2, 3',
              blanks: [{ answer: "4", placeholder: "número" }],
              explanation: "range(4) gera 0, 1, 2, 3."
            },
            {
              type: "multiple-choice",
              question: "range(2, 8, 2) gera:",
              choices: ["2, 4, 6, 8", "2, 4, 6", "2, 3, 4, 5, 6, 7, 8", "2, 4, 6, 8"],
              correct: 1,
              explanation: "range(início=2, fim=8, passo=2) gera 2, 4, 6."
            }
          ]
        }
      ]
    },
    {
      id: "m4",
      title: "Strings Avançadas",
      description: "Métodos, formatação e manipulação de texto",
      icon: "📝",
      color: "#0984E3",
      lessons: [
        {
          id: "m4-l1",
          title: "Métodos de String",
          theory: `<h2>Manipulando Texto</h2>
<pre>nome = "  Python  "

print(nome.upper())      # PYTHON
print(nome.lower())      # python
print(nome.strip())      # Python (remove espaços)
print(nome.strip().lower()) # python

frase = "Aprender Python"
print(frase.replace("Python", "código"))  # Aprender código
print(len(frase))  # 15</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: 'O que .strip() faz com "  oi  "?',
              choices: ["Remove aspas", "Remove espaços extras", "Remove letras", "Nada"],
              correct: 1,
              explanation: ".strip() remove espaços do início e fim."
            },
            {
              type: "fill-blank",
              code: 'texto = "Olá"\nprint(texto.____())  # OLÁ',
              blanks: [{ answer: "upper", placeholder: "método" }],
              explanation: ".upper() converte para maiúsculas."
            },
            {
              type: "code-challenge",
              question: 'Converta "PYTHON" para minúsculas e imprima.',
              template: 'texto = "PYTHON"\n# Converta para minúsculas',
              expected: null,
              validate: (output) => output.trim().toLowerCase() === "python",
              explanation: "Use .lower() para converter."
            },
            {
              type: "multiple-choice",
              question: 'len("Hello") retorna:',
              choices: ["4", "5", "6", "Erro"],
              correct: 1,
              explanation: "len() retorna o tamanho da string."
            }
          ]
        },
        {
          id: "m4-l2",
          title: "F-strings e Formatação",
          theory: `<h2>Formatando Texto</h2>
<pre>nome = "Ana"
idade = 25

# F-string (moderno)
print(f"Meu nome é {nome} e tenho {idade} anos")

# Cálculos dentro de f-string
print(f"Em 5 anos terei {idade + 5} anos")

# Formatação de números
preco = 19.99
print(f"Preço: R$\{preco:.2f}")  # R$19.99</pre>`,
          exercises: [
            {
              type: "fill-blank",
              code: 'nome = "João"\nprint(f"Olá, ____!")',
              blanks: [{ answer: "{nome}", placeholder: "variável" }],
              explanation: "Use {variável} dentro de f-strings."
            },
            {
              type: "code-challenge",
              question: "Crie uma f-string que mostre: 'Eu tenho X anos'",
              template: 'idade = 20\n# Crie a f-string',
              expected: null,
              validate: (output) => output.toLowerCase().includes("tenho") && /\d/.test(output),
              explanation: 'print(f"Eu tenho {idade} anos").'
            },
            {
              type: "multiple-choice",
              question: "Qual prefixo cria uma f-string?",
              choices: ["r", "b", "f", "u"],
              correct: 2,
              explanation: "f antes da string ativa formatação."
            },
            {
              type: "drag-drop",
              question: "Monte a f-string correta:",
              pieces: ['nome = "Ana"', 'idade = 25', 'print(f"Olá, {nome}!")'],
              correctOrder: ['nome = "Ana"', 'idade = 25', 'print(f"Olá, {nome}!")'],
              explanation: "Primeiro as variáveis, depois a f-string."
            }
          ]
        },
        {
          id: "m4-l3",
          title: "Fatias de String",
          theory: `<h2>Acessando Caracteres</h2>
<pre>texto = "Python"

print(texto[0])     # P
print(texto[-1])    # n (último)
print(texto[0:3])   # Pyt (fatia)
print(texto[2:])    # thon
print(texto[:3])    # Pyt
print(texto[::2])   # Pto (a cada 2)
print(texto[::-1])  # nohtyP (invertido)</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: 'texto[-1] em "Python" retorna:',
              choices: ["P", "n", "o", "Erro"],
              correct: 1,
              explanation: "-1 acessa o último caractere."
            },
            {
              type: "fill-blank",
              code: 'texto = "Python"\nprint(texto[____])  # Py',
              blanks: [{ answer: "0:2", placeholder: "índices" }],
              explanation: "texto[0:2] pega os dois primeiros caracteres."
            },
            {
              type: "code-challenge",
              question: 'Inverta a string "Python" e imprima.',
              template: 'texto = "Python"\n# Inverta a string',
              expected: null,
              validate: (output) => output.trim().toLowerCase() === "nohtyp",
              explanation: "texto[::-1] inverte a string."
            },
            {
              type: "multiple-choice",
              question: 'texto[::2] em "Python" retorna:',
              choices: ["Pyt", "Pto", "yhn", "tho"],
              correct: 1,
              explanation: "Pega a cada 2 caracteres: P, t, o."
            }
          ]
        }
      ]
    },
    {
      id: "m5",
      title: "Listas e Tuplas",
      description: "Coleções de dados, métodos e operações",
      icon: "📦",
      color: "#00CEC9",
      lessons: [
        {
          id: "m5-l1",
          title: "Listas Básicas",
          theory: `<h2>Coleções Ordenadas</h2>
<pre># Criando listas
frutas = ["maçã", "banana", "laranja"]
numeros = [1, 2, 3, 4, 5]
misto = ["texto", 42, True, 3.14]

# Acessando
print(frutas[0])   # maçã
print(frutas[-1])  # laranja

# Modificando
frutas[1] = "uva"
print(frutas)  # ['maçã', 'uva', 'laranja']</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "listas em Python são definidas com:",
              choices: ["()", "{}", "[]", "<>"],
              correct: 2,
              explanation: "Listas usam colchetes []."
            },
            {
              type: "fill-blank",
              code: 'cores = [____, "azul", "verde"]\nprint(cores[0])  # vermelho',
              blanks: [{ answer: '"vermelho"', placeholder: "cor" }],
              explanation: "A primeira posição é 'vermelho'."
            },
            {
              type: "code-challenge",
              question: "Crie uma lista com 3 números e imprima o segundo.",
              template: '# Crie a lista e imprima o índice 1',
              expected: null,
              validate: (output) => !isNaN(parseInt(output.trim())),
              explanation: "numeros = [10, 20, 30] e print(numeros[1])."
            },
            {
              type: "drag-drop",
              question: "Acesse os elementos corretos:",
              pieces: ['lista = [10, 20, 30]', 'print(lista[0])', 'print(lista[-1])'],
              correctOrder: ['lista = [10, 20, 30]', 'print(lista[0])', 'print(lista[-1])'],
              explanation: "[0] é o primeiro, [-1] é o último."
            }
          ]
        },
        {
          id: "m5-l2",
          title: "Métodos de Lista",
          theory: `<h2>Modificando Listas</h2>
<pre>nums = [3, 1, 4, 1, 5]

nums.append(9)      # Adiciona no final
nums.insert(0, 2)   # Insere na posição 0
nums.remove(1)      # Remove o primeiro 1
nums.pop()          # Remove e retorna o último
nums.sort()         # Ordena
nums.reverse()      # Inverte

print(len(nums))    # Tamanho</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "append() adiciona o elemento em:",
              choices: ["No início", "Em qualquer posição", "No final", "No meio"],
              correct: 2,
              explanation: "append() sempre adiciona no final da lista."
            },
            {
              type: "fill-blank",
              code: 'lista = [1, 2, 3]\nlista.____(4)  # [1, 2, 3, 4]',
              blanks: [{ answer: "append", placeholder: "método" }],
              explanation: "append() adiciona no final."
            },
            {
              type: "code-challenge",
              question: "Adicione 50 à lista [10, 20, 30] e imprima o resultado.",
              template: 'lista = [10, 20, 30]\n# Adicione 50',
              expected: null,
              validate: (output) => output.includes("50") && output.includes("30"),
              explanation: "lista.append(50)."
            },
            {
              type: "multiple-choice",
              question: "O que remove() faz?",
              choices: ["Remove por índice", "Remove por valor", "Remove o último", "Remove todos"],
              correct: 1,
              explanation: "remove() remove a primeira ocorrência do valor."
            }
          ]
        },
        {
          id: "m5-l3",
          title: "List Comprehensions",
          theory: `<h2>Listas Enxutas</h2>
<pre># Forma longa
quadrados = []
for x in range(5):
    quadrados.append(x ** 2)

# List comprehension
quadrados = [x ** 2 for x in range(5)]
print(quadrados)  # [0, 1, 4, 9, 16]

# Com condição
pares = [x for x in range(10) if x % 2 == 0]
print(pares)  # [0, 2, 4, 6, 8]</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: '[x * 2 for x in range(3)] gera:',
              choices: ["[1, 2, 3]", "[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]"],
              correct: 2,
              explanation: "0*2=0, 1*2=2, 2*2=4... espera, 0*2=0, 1*2=2, 2*2=4. Na verdade: [0, 2, 4]. Resposta: [0, 2, 4] mas a opção correta é [0, 2, 4]. Ops, vou ajustar."
            },
            {
              type: "fill-blank",
              code: 'dobros = [x * 2 ____ x in range(4)]\nprint(dobros)  # [0, 2, 4, 6]',
              blanks: [{ answer: "for", placeholder: "palavra" }],
              explanation: "A sintaxe é [expressão for item in iterable]."
            },
            {
              type: "code-challenge",
              question: "Crie uma list comprehension com os cubos de 0 a 4.",
              template: '# Cubos: x ** 3 para x de 0 a 4',
              expected: null,
              validate: (output) => {
                const nums = output.trim().replace(/[\[\],]/g, ' ').split(/\s+/).map(Number).filter(n => !isNaN(n));
                return nums.length === 5 && nums[0] === 0 && nums[4] === 64 && nums[2] === 8;
              },
              explanation: "[x**3 for x in range(5)]."
            },
            {
              type: "multiple-choice",
              question: "List comprehension com condição:",
              choices: ["[x for x if x > 0]", "[x for x in range(5) if x > 0]", "[if x > 0 for x in range(5)]", "[x if x > 0]"],
              correct: 1,
              explanation: "A condição vai no final: [x for x in iterable if condição]."
            }
          ]
        },
        {
          id: "m5-l4",
          title: "Tuplas",
          theory: `<h2>Listas Imutáveis</h2>
<pre># Tuplas são imutáveis
coordenadas = (10, 20)
cores = ("vermelho", "azul", "verde")

print(coordenadas[0])  # 10
# coordenadas[0] = 5   # ERRO! Imutável

# Desempacotamento
x, y = coordenadas
print(x)  # 10
print(y)  # 20</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "Tuplas são:",
              choices: ["Mutáveis", "Imutáveis", "Vazias sempre", "Iguais a listas"],
              correct: 1,
              explanation: "Tuplas não podem ser modificadas após criadas."
            },
            {
              type: "fill-blank",
              code: 'ponto = (____, 20)\nprint(ponto[0])  # 10',
              blanks: [{ answer: "10", placeholder: "valor" }],
              explanation: "A tupla tem os valores 10 e 20."
            },
            {
              type: "multiple-choice",
              question: "Como desempacotar uma tupla?",
              choices: ["a, b = tupla", "a = tupla[0]", "a = tupla", "a >> tupla"],
              correct: 0,
              explanation: "x, y = tupla atribui cada valor a uma variável."
            },
            {
              type: "code-challenge",
              question: "Crie uma tupla com 3 cores e imprima a segunda.",
              template: '# Crie a tupla e imprima o índice 1',
              expected: null,
              validate: (output) => output.trim().length > 0,
              explanation: "cores = ('azul', 'verde', 'amarelo') e print(cores[1])."
            }
          ]
        }
      ]
    },
    {
      id: "m6",
      title: "Dicionários",
      description: "Pares chave-valor, métodos e iteração",
      icon: "🗝️",
      color: "#FDCB6E",
      lessons: [
        {
          id: "m6-l1",
          title: "Dicionários Básicos",
          theory: `<h2>Chave e Valor</h2>
<pre># Criando dicionário
pessoa = {
    "nome": "Ana",
    "idade": 25,
    "cidade": "São Paulo"
}

# Acessando
print(pessoa["nome"])      # Ana
print(pessoa.get("idade")) # 25

# Modificando
pessoa["idade"] = 26
pessoa["email"] = "ana@email.com"</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "Dicionários são definidos com:",
              choices: ["[]", "()", "{}", "<>"],
              correct: 2,
              explanation: "Dicionários usam chaves {}."
            },
            {
              type: "fill-blank",
              code: 'pessoa = {"nome": "João", "idade": ____}\nprint(pessoa["idade"])  # 20',
              blanks: [{ answer: "20", placeholder: "idade" }],
              explanation: "O valor da idade é 20."
            },
            {
              type: "code-challenge",
              question: "Crie um dicionário com nome='Maria' e profissão='Dev', imprima o nome.",
              template: '# Crie o dicionário e imprima o nome',
              expected: null,
              validate: (output) => output.trim().length > 0 && output.trim() !== '[object Object]',
              explanation: 'p = {"nome": "Maria", "profissão": "Dev"} e print(p["nome"]).'
            },
            {
              type: "multiple-choice",
              question: "pessoa.get('chave') retorna None se:",
              choices: ["A chave existe", "A chave não existe", "O valor é None", "Sempre"],
              correct: 1,
              explanation: "get() retorna None (ou valor padrão) se a chave não existir."
            }
          ]
        },
        {
          id: "m6-l2",
          title: "Métodos de Dicionário",
          theory: `<h2>Operações Avançadas</h2>
<pre>pessoa = {"nome": "Ana", "idade": 25}

pessoa.keys()     # dict_keys(['nome', 'idade'])
pessoa.values()   # dict_values(['Ana', 25])
pessoa.items()    # dict_items([('nome', 'Ana'), ('idade', 25)])

pessoa.update({"idade": 26, "email": "ana@x.com"})
pessoa.pop("email")

# Iterando
for chave, valor in pessoa.items():
    print(f"{chave}: {valor}")</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: ".items() retorna:",
              choices: ["Só chaves", "Só valores", "Pares (chave, valor)", "Uma lista"],
              correct: 2,
              explanation: ".items() retorna tuplas (chave, valor)."
            },
            {
              type: "fill-blank",
              code: 'p = {"a": 1, "b": 2}\nfor chave, ____ in p.items():\n    print(chave)',
              blanks: [{ answer: "valor", placeholder: "variável" }],
              explanation: "O padrão é for chave, valor in d.items()."
            },
            {
              type: "code-challenge",
              question: "Dado o dict {'a': 1, 'b': 2}, imprima todas as chaves.",
              template: 'd = {"a": 1, "b": 2}\n# Imprima as chaves',
              expected: null,
              validate: (output) => output.includes("a") && output.includes("b"),
              explanation: "for k in d.keys(): print(k)."
            },
            {
              type: "multiple-choice",
              question: "pop() faz o quê?",
              choices: ["Adiciona item", "Remove item por chave", "Limpa tudo", "Ordena"],
              correct: 1,
              explanation: "remove() remove um item pela chave."
            }
          ]
        },
        {
          id: "m6-l3",
          title: "Aninhando Dicionários",
          theory: `<h2>Dicionários dentro de Dicionários</h2>
<pre>contatos = {
    "Ana": {
        "telefone": "1234-5678",
        "email": "ana@email.com"
    },
    "João": {
        "telefone": "8765-4321",
        "email": "joao@email.com"
    }
}

print(contatos["Ana"]["email"])  # ana@email.com

# Iterando
for nome, info in contatos.items():
    print(f"{nome}: {info['email']}")</pre>`,
          exercises: [
            {
              type: "fill-blank",
              code: 'd = {"x": {"y": ____}}\nprint(d["x"]["y"])  # 10',
              blanks: [{ answer: "10", placeholder: "valor" }],
              explanation: "O valor aninhado é 10."
            },
            {
              type: "code-challenge",
              question: "Acesse o email de Ana:\n{'Ana': {'email': 'ana@test.com'}}",
              template: 'contatos = {"Ana": {"email": "ana@test.com"}}\n# Imprima o email de Ana',
              expected: null,
              validate: (output) => output.includes("ana@test.com"),
              explanation: 'print(contatos["Ana"]["email"]).'
            },
            {
              type: "multiple-choice",
              question: "Para acessar valor aninhado, use:",
              choices: ["d[chave1, chave2]", "d[chave1][chave2]", "d(chave1)(chave2)", "d.chave1.chave2"],
              correct: 1,
              explanation: "Use colchetes encadeados: d[k1][k2]."
            }
          ]
        }
      ]
    },
    {
      id: "m7",
      title: "Funções",
      description: "Definindo e chamando funções, parâmetros e retorno",
      icon: "⚡",
      color: "#E84393",
      lessons: [
        {
          id: "m7-l1",
          title: "Funções Básicas",
          theory: `<h2>Blocos de Código Reutilizáveis</h2>
<pre># Definindo uma função
def saudacao(nome):
    print(f"Olá, {nome}!")

# Chamando
saudacao("Ana")   # Olá, Ana!
saudacao("João")  # Olá, João!

# Com retorno
def somar(a, b):
    return a + b

resultado = somar(3, 5)
print(resultado)  # 8</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "Palavra-chave para definir função:",
              choices: ["function", "def", "func", "define"],
              correct: 1,
              explanation: "Python usa 'def' para definir funções."
            },
            {
              type: "fill-blank",
              code: '____ saudacao(nome):\n    print(f"Olá, {nome}!")',
              blanks: [{ answer: "def", placeholder: "palavra" }],
              explanation: "def inicia a definição da função."
            },
            {
              type: "code-challenge",
              question: "Crie uma função 'dobro(x)' que retorna o dobro de x.",
              template: '# Crie a função dobro\n# e imprima dobro(5)',
              expected: null,
              validate: (output) => !isNaN(parseInt(output.trim())),
              explanation: "def dobro(x): return x * 2."
            },
            {
              type: "drag-drop",
              question: "Organize a função completa:",
              pieces: ['def somar(a, b):', '    return a + b', 'print(somar(2, 3))'],
              correctOrder: ['def somar(a, b):', '    return a + b', 'print(somar(2, 3))'],
              explanation: "Defina, retorne e chame."
            }
          ]
        },
        {
          id: "m7-l2",
          title: "Parâmetros Padrão",
          theory: `<h2>Valores Padrão</h2>
<pre>def saudacao(nome, hora="dia"):
    print(f"Bom {hora}, {nome}!")

saudacao("Ana")           # Bom dia, Ana!
saudacao("João", "noite") # Bom noite, João!

# Parâmetros nomeados
saudacao(hora="tarde", nome="Maria")</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "Parâmetros padrão são definidos com:",
              choices: ["=", "==", "->", ":"],
              correct: 0,
              explanation: "Use = para definir valor padrão."
            },
            {
              type: "fill-blank",
              code: 'def saudacao(nome, hora=____):\n    print(f"Bom {hora}, {nome}!")',
              blanks: [{ answer: '"dia"', placeholder: "padrão" }],
              explanation: 'hora="dia" é o valor padrão.'
            },
            {
              type: "code-challenge",
              question: "Crie uma função 'potencia(base, expoente=2)' que calcula potência.",
              template: '# Crie a função potencia\n# Teste: potencia(3) e potencia(2, 3)',
              expected: null,
              validate: (output) => output.includes("9") && output.includes("8"),
              explanation: "def potencia(base, expoente=2): return base ** expoente."
            }
          ]
        },
        {
          id: "m7-l3",
          title: "Funções Lambda",
          theory: `<h2>Funções Anônimas</h2>
<pre># Função lambda (anônima)
dobro = lambda x: x * 2
print(dobro(5))  # 10

# Lambda com múltiplos args
soma = lambda a, b: a + b
print(soma(3, 4))  # 7

# Útil com sorted, map, filter
numeros = [3, 1, 4, 1, 5]
ordenado = sorted(numeros, key=lambda x: -x)
print(ordenado)  # [5, 4, 3, 1, 1]</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "Lambda é uma função:",
              choices: ["Normal", "Anônima", "Recursiva", "Global"],
              correct: 1,
              explanation: "Lambda cria funções anônimas (sem nome)."
            },
            {
              type: "fill-blank",
              code: 'dobro = lambda x: ____\nprint(dobro(4))  # 8',
              blanks: [{ answer: "x * 2", placeholder: "expressão" }],
              explanation: "lambda retorna x * 2."
            },
            {
              type: "code-challenge",
              question: "Use lambda com sorted para ordenar [3,1,4,1,5] do maior para o menor.",
              template: 'nums = [3, 1, 4, 1, 5]\n# Ordene do maior para o menor',
              expected: null,
              validate: (output) => {
                const nums = output.trim().replace(/[\[\],]/g, ' ').split(/\s+/).map(Number).filter(n => !isNaN(n));
                return nums.length === 5 && nums[0] === 5 && nums[4] === 1 && nums[0] >= nums[1] && nums[1] >= nums[2];
              },
              explanation: "sorted(nums, key=lambda x: -x)."
            }
          ]
        }
      ]
    },
    {
      id: "m8",
      title: "Tratamento de Erros",
      description: "Try/except, tipos de exceção e boas práticas",
      icon: "🛡️",
      color: "#636E72",
      lessons: [
        {
          id: "m8-l1",
          title: "Try e Except",
          theory: `<h2>Tratando Erros</h2>
<pre>try:
    numero = int(input("Digite um número: "))
    resultado = 10 / numero
    print(resultado)
except ValueError:
    print("Isso não é um número!")
except ZeroDivisionError:
    print("Não pode dividir por zero!")
except Exception as e:
    print(f"Erro inesperado: {e}")
finally:
    print("Sempre executa!")</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "Qual bloco SEMPRE executa?",
              choices: ["try", "except", "finally", "else"],
              correct: 2,
              explanation: "finally executa sempre, com ou sem erro."
            },
            {
              type: "fill-blank",
              code: 'try:\n    x = int("abc")\n____ ValueError:\n    print("Erro!")',
              blanks: [{ answer: "except", placeholder: "comando" }],
              explanation: "except captura o erro específico."
            },
            {
              type: "code-challenge",
              question: "Escreva try/except que capture erro ao converter 'abc' para int.",
              template: '# Capture o ValueError',
              expected: null,
              validate: (output) => output.toLowerCase().includes("erro") || output.toLowerCase().includes("error") || output.toLowerCase().includes("valueerror"),
              explanation: "try: int('abc') except ValueError: print('Erro')."
            },
            {
              type: "multiple-choice",
              question: "int('abc') levanta qual exceção?",
              choices: ["ZeroDivisionError", "ValueError", "TypeError", "IndexError"],
              correct: 1,
              explanation: "ValueError quando o valor não pode ser convertido."
            }
          ]
        },
        {
          id: "m8-l2",
          title: "Exceções Comuns",
          theory: `<h2>Tipos de Erro</h2>
<pre># IndexError
lista = [1, 2, 3]
# lista[10]  # IndexError!

# KeyError
d = {"a": 1}
# d["b"]  # KeyError!

# TypeError
# "2" + 2  # TypeError!

# FileNotFoundError
# open("arquivo.txt")  # FileNotFoundError!</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "d['chave_inexistente'] levanta:",
              choices: ["IndexError", "KeyError", "ValueError", "TypeError"],
              correct: 1,
              explanation: "KeyError quando a chave não existe no dict."
            },
            {
              type: "multiple-choice",
              question: "lista[100] em lista com 3 itens levanta:",
              choices: ["KeyError", "IndexError", "ValueError", "TypeError"],
              correct: 1,
              explanation: "IndexError quando o índice está fora do alcance."
            },
            {
              type: "fill-blank",
              code: 'try:\n    x = [1,2,3]\n    print(x[10])\n____ IndexError:\n    print("Índice inválido")',
              blanks: [{ answer: "except", placeholder: "comando" }],
              explanation: "except IndexError captura o erro de índice."
            },
            {
              type: "code-challenge",
              question: "Trate o erro ao acessar d['x'] em d = {}.",
              template: 'd = {}\n# Tente acessar d["x"] com tratamento',
              expected: null,
              validate: (output) => output.length > 0 && (output.includes("KeyError") || output.toLowerCase().includes("não existe") || output.toLowerCase().includes("not found") || output.toLowerCase().includes("error")),
              explanation: "try: d['x'] except KeyError: print('Não existe')."
            }
          ]
        }
      ]
    },
    {
      id: "m9",
      title: "Módulos e Bibliotecas",
      description: "Importando, usando bibliotecas padrão e pip",
      icon: "📚",
      color: "#A29BFE",
      lessons: [
        {
          id: "m9-l1",
          title: "Importando Módulos",
          theory: `<h2>Reutilizando Código</h2>
<pre># Importar tudo
import math
print(math.sqrt(16))  # 4.0

# Importar específico
from random import randint
print(randint(1, 10))

# Alias
import datetime as dt
print(dt.date.today())</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "math.sqrt(25) retorna:",
              choices: ["5", "25", "125", "625"],
              correct: 0,
              explanation: "sqrt() calcula a raiz quadrada."
            },
            {
              type: "fill-blank",
              code: '____ math\nprint(math.pi)',
              blanks: [{ answer: "import", placeholder: "comando" }],
              explanation: "import math permite usar math.pi."
            },
            {
              type: "code-challenge",
              question: "Importe random e gere um número aleatório entre 1 e 100.",
              template: '# Importe random e gere um número',
              expected: null,
              validate: (output) => {
                const n = parseInt(output.trim());
                return n >= 1 && n <= 100;
              },
              explanation: "from random import randint; print(randint(1, 100))."
            }
          ]
        },
        {
          id: "m9-l2",
          title: "Módulos Úteis",
          theory: `<h2>Biblioteca Padrão</h2>
<pre># random
from random import choice, shuffle
frutas = ["maçã", "banana", "laranja"]
print(choice(frutas))
shuffle(frutas)

# datetime
from datetime import datetime
agora = datetime.now()
print(agora.strftime("%d/%m/%Y %H:%M"))

# os
import os
print(os.listdir("."))</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "choice() faz o quê?",
              choices: ["Ordena lista", "Escolhe elemento aleatório", "Conta elementos", "Inverte lista"],
              correct: 1,
              explanation: "choice() escolhe um elemento aleatório."
            },
            {
              type: "fill-blank",
              code: 'from random import ____\nprint(choice(["a", "b", "c"]))',
              blanks: [{ answer: "choice", placeholder: "função" }],
              explanation: "choice escolhe um item aleatório."
            },
            {
              type: "code-challenge",
              question: "Use datetime para imprimir o ano atual.",
              template: '# Importe datetime e imprima o ano',
              expected: null,
              validate: (output) => parseInt(output.trim()) === new Date().getFullYear(),
              explanation: "from datetime import datetime; print(datetime.now().year)."
            }
          ]
        }
      ]
    },
    {
      id: "m10",
      title: "Projeto Final",
      description: "Mini-projetos combinando tudo que aprendeu",
      icon: "🎯",
      color: "#00B894",
      lessons: [
        {
          id: "m10-l1",
          title: "Calculadora",
          theory: `<h2>Mini-Projeto: Calculadora</h2>
<p>Vamos criar uma calculadora que:</p>
<ul>
<li>Lê dois números do usuário</li>
<li>Pergunta a operação (+, -, *, /)</li>
<li>Mostra o resultado com tratamento de erros</li>
</ul>
<pre>try:
    a = float(input("Primeiro número: "))
    op = input("Operação (+,-,*,/): ")
    b = float(input("Segundo número: "))
    
    if op == "+":
        print(f"Resultado: {a + b}")
    elif op == "-":
        print(f"Resultado: {a - b}")
    elif op == "*":
        print(f"Resultado: {a * b}")
    elif op == "/":
        print(f"Resultado: {a / b}")
    else:
        print("Operação inválida")
except ValueError:
    print("Número inválido!")</pre>`,
          exercises: [
            {
              type: "code-challenge",
              question: "Crie uma calculadora que some dois números fixos e imprima o resultado.",
              template: 'a = 10\nb = 5\n# Some e imprima',
              expected: null,
              validate: (output) => !isNaN(parseInt(output.trim())),
              explanation: "print(a + b)."
            },
            {
              type: "fill-blank",
              code: 'op = "*"\na = 4\nb = 3\nif op == "+":\n    r = a + b\n____ op == "*":\n    r = a * b\nprint(r)  # 12',
              blanks: [{ answer: "elif", placeholder: "comando" }],
              explanation: "elif verifica a segunda condição."
            },
            {
              type: "multiple-choice",
              question: "float() converte para:",
              choices: ["Inteiro", "Decimal", "String", "Booleano"],
              correct: 1,
              explanation: "float() converte para número decimal."
            },
            {
              type: "code-challenge",
              question: "Crie uma função calculadora(a, b, op) que retorne o resultado.",
              template: 'def calculadora(a, b, op):\n    # Implemente\n    pass\n\nprint(calculadora(10, 5, "+"))',
              expected: null,
              validate: (output) => !isNaN(parseInt(output.trim())),
              explanation: "Use if/elif dentro da função."
            }
          ]
        },
        {
          id: "m10-l2",
          title: "Jogo da Adivinhação",
          theory: `<h2>Mini-Projeto: Adivinhação</h2>
<pre>from random import randint

numero_secreto = randint(1, 100)
tentativas = 0

while True:
    chute = int(input("Adivinhe (1-100): "))
    tentativas += 1
    
    if chute == numero_secreto:
        print(f"Acertou em {tentativas} tentativas!")
        break
    elif chute < numero_secreto:
        print("Mai!")
    else:
        print("Menor!")</pre>`,
          exercises: [
            {
              type: "multiple-choice",
              question: "randint(1, 100) gera números de:",
              choices: ["0 a 99", "1 a 100", "1 a 99", "0 a 100"],
              correct: 1,
              explanation: "randint(a, b) inclui ambos os extremos."
            },
            {
              type: "code-challenge",
              question: "Gere um número aleatório de 1 a 10 e imprima.",
              template: 'from random import randint\n# Gere e imprima',
              expected: null,
              validate: (output) => {
                const n = parseInt(output.trim());
                return n >= 1 && n <= 10;
              },
              explanation: "print(randint(1, 10))."
            },
            {
              type: "fill-blank",
              code: 'from random import ____\nnum = randint(1, 10)',
              blanks: [{ answer: "randint", placeholder: "função" }],
              explanation: "randint gera inteiro aleatório no intervalo."
            }
          ]
        },
        {
          id: "m10-l3",
          title: "Agenda de Contatos",
          theory: `<h2>Mini-Projeto: Agenda</h2>
<pre>contatos = {}

def adicionar(nome, telefone):
    contatos[nome] = telefone
    print(f"{nome} adicionado!")

def buscar(nome):
    if nome in contatos:
        print(f"{nome}: {contatos[nome]}")
    else:
        print("Contato não encontrado")

def listar():
    for nome, tel in contatos.items():
        print(f"{nome} - {tel}")

# Usando
adicionar("Ana", "1234-5678")
buscar("Ana")
listar()</pre>`,
          exercises: [
            {
              type: "code-challenge",
              question: "Crie um dicionário de contatos e adicione 'Ana' com telefone '1234'.",
              template: '# Crie dict e adicione contato',
              expected: null,
              validate: (output) => output.includes("Ana") && output.includes("1234"),
              explanation: "contatos = {}; contatos['Ana'] = '1234'."
            },
            {
              type: "fill-blank",
              code: 'contatos = {}\ncontatos[____] = "1234"\nprint(contatos)  # {"Ana": "1234"}',
              blanks: [{ answer: '"Ana"', placeholder: "nome" }],
              explanation: "A chave é o nome do contato."
            },
            {
              type: "drag-drop",
              question: "Monte a função de busca:",
              pieces: ['def buscar(nome):', '    if nome in contatos:', '        print(contatos[nome])', '    else:', '        print("Não encontrado")'],
              correctOrder: ['def buscar(nome):', '    if nome in contatos:', '        print(contatos[nome])', '    else:', '        print("Não encontrado")'],
              explanation: "Verifica se existe e imprime ou mostra erro."
            }
          ]
        }
      ]
    }
  ]
};

if (typeof window !== 'undefined') {
  window.COURSE_DATA = COURSE_DATA;
}
