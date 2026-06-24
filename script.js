const perguntas = [
  {
    p: "O que é biomassa?",
    ops: [
      "Matéria orgânica de origem animal ou vegetal usada para produzir energia",
      "Um tipo de combustível fóssil extraído do subsolo",
      "Energia gerada pelo vento e pela água",
      "Um mineral encontrado em regiões tropicais"
    ],
    certa: 0,
    exp: "✅ Correto! Biomassa é toda matéria orgânica de origem vegetal ou animal que pode ser transformada em energia — como bagaço de cana, esterco e resíduos agrícolas."
  },
  {
    p: "Qual é a principal matéria-prima do etanol brasileiro?",
    ops: ["Soja", "Cana-de-açúcar", "Milho", "Eucalipto"],
    certa: 1,
    exp: "✅ Exato! O etanol brasileiro é produzido principalmente a partir da cana-de-açúcar, tornando o Brasil o 2.º maior produtor mundial do biocombustível."
  },
  {
    p: "O que é o Etanol de Segunda Geração (E2G)?",
    ops: [
      "Etanol produzido em usinas construídas após 2000",
      "Etanol feito de duas espécies diferentes de cana",
      "Etanol obtido da palha e do bagaço da cana, sem plantar mais",
      "Um tipo de gasolina com 2% de etanol na mistura"
    ],
    certa: 2,
    exp: "✅ Perfeito! O E2G aproveita a palha e o bagaço que antes eram descartados, produzindo mais combustível sem ampliar a área cultivada."
  },
  {
    p: "Como o biogás é produzido nas granjas?",
    ops: [
      "Pela queima da lenha dos pomares",
      "Pela decomposição dos dejetos dos animais em biodigestores",
      "Pela fermentação de grãos de soja",
      "Pela irradiação solar de estufas agrícolas"
    ],
    certa: 1,
    exp: "✅ Isso mesmo! Os dejetos de suínos, bovinos e aves são colocados em biodigestores, onde micro-organismos os decompõem e liberam o biogás."
  },
  {
    p: "Qual benefício está DIRETAMENTE relacionado à bioenergia?",
    ops: [
      "Aumento das exportações de petróleo",
      "Maior desmatamento para plantar energéticas",
      "Redução das emissões de gases do efeito estufa",
      "Importação de tecnologia nuclear"
    ],
    certa: 2,
    exp: "✅ Correto! A bioenergia substitui combustíveis fósseis, reduzindo a emissão de CO₂ e outros gases que causam o aquecimento global."
  }
];

/* Controla qual pergunta está aparecendo e a pontuação do usuário */
let perguntaAtual = 0;
let pontos = 0;
let jaRespondeu = false;

/* Monta e exibe a pergunta atual na tela */
function carregarPergunta() {
  jaRespondeu = false;

  /* Esconde os botões de navegar */
  document.getElementById('btn-proximo').classList.remove('show');
  document.getElementById('btn-reiniciar').classList.remove('show');

  /* Apaga o feedback da pergunta anterior */
  const feedback = document.getElementById('quiz-feedback');
  feedback.className = 'quiz-feedback';
  feedback.textContent = '';

  /* Pega a pergunta atual */
  const q = perguntas[perguntaAtual];

  /* Coloca o texto da pergunta na tela */
  document.getElementById('quiz-pergunta').textContent = q.p;

  /* Atualiza o número da pergunta e a barra de progresso */
  document.getElementById('quiz-count').textContent = `${perguntaAtual + 1} / ${perguntas.length}`;
  const porcentagem = ((perguntaAtual + 1) / perguntas.length) * 100;
  document.getElementById('quiz-bar').style.width = porcentagem + '%';

  /* Cria os botões de opção dinamicamente */
  const containerOpcoes = document.getElementById('quiz-opcoes');
  containerOpcoes.innerHTML = '';

  q.ops.forEach(function(textoOpcao, indice) {
    const botao = document.createElement('button');
    botao.className = 'quiz-opcao';
    botao.textContent = textoOpcao;
    botao.onclick = function() { responder(indice, botao); };
    containerOpcoes.appendChild(botao);
  });
}

/* Chamada quando o usuário clica em uma opção */
function responder(indiceSelecionado, botaoClicado) {

  /* Impede clicar de novo na mesma pergunta */
  if (jaRespondeu) return;
  jaRespondeu = true;

  const q = perguntas[perguntaAtual];

  /* Desabilita todos os botões */
  const todosBotoes = document.querySelectorAll('.quiz-opcao');
  todosBotoes.forEach(function(b) { b.disabled = true; });

  const feedback = document.getElementById('quiz-feedback');

  /* Acertou: fica verde e soma ponto */
  if (indiceSelecionado === q.certa) {
    pontos++;
    botaoClicado.classList.add('correta');
    feedback.className = 'quiz-feedback ok show';
    feedback.textContent = q.exp;

  /* Errou: fica vermelho e mostra a certa em verde */
  } else {
    botaoClicado.classList.add('errada');
    todosBotoes[q.certa].classList.add('correta');
    feedback.className = 'quiz-feedback nao show';
    feedback.textContent = '❌ Não foi dessa vez. ' + q.exp;
  }

  /* Se ainda tem perguntas, mostra o botão de próxima */
  if (perguntaAtual < perguntas.length - 1) {
    document.getElementById('btn-proximo').classList.add('show');
  } else {
    /* Se acabou, mostra o resultado */
    document.getElementById('btn-reiniciar').classList.add('show');
    mostrarResultado();
  }
}

/* Vai para a próxima pergunta */
function proximaPergunta() {
  perguntaAtual++;
  carregarPergunta();
}

/* Mostra a tela de resultado com emoji e mensagem */
function mostrarResultado() {
  setTimeout(function() {

    document.getElementById('quiz-conteudo').style.display = 'none';
    document.getElementById('quiz-resultado').classList.add('show');

    const aproveitamento = pontos / perguntas.length;
    let emoji, mensagem;

    if (aproveitamento === 1) {
      emoji = '🏆';
      mensagem = 'Parabéns! Você é um expert em bioenergia!';
    } else if (aproveitamento >= 0.6) {
      emoji = '🌱';
      mensagem = 'Muito bem! Você sabe bastante sobre o tema!';
    } else {
      emoji = '📚';
      mensagem = 'Continue estudando! A bioenergia tem muito a ensinar.';
    }

    document.getElementById('resultado-emoji').textContent = emoji;
    document.getElementById('resultado-texto').textContent = mensagem;
    document.getElementById('resultado-pts').textContent =
      `Você acertou ${pontos} de ${perguntas.length} perguntas.`;

  }, 800);
}

/* Reinicia tudo do zero */
function reiniciarQuiz() {
  perguntaAtual = 0;
  pontos = 0;
  document.getElementById('quiz-resultado').classList.remove('show');
  document.getElementById('quiz-conteudo').style.display = 'block';
  carregarPergunta();
}

/* Começa o quiz quando a página carrega */
carregarPergunta();

/* Faz os elementos aparecerem suavemente ao rolar a página */
const elementosParaAnimar = document.querySelectorAll('.aparecer');

/* O IntersectionObserver fica de olho em cada elemento e avisa quando ele aparece na tela */
const observador = new IntersectionObserver(function(entradas) {
  entradas.forEach(function(entrada, indice) {
    if (entrada.isIntersecting) {

      /* Adiciona a classe que faz o elemento aparecer */
      setTimeout(function() {
        entrada.target.classList.add('visivel');
      }, indice * 80);

      /* Para de observar esse elemento, já apareceu */
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.1 });

/* Começa a observar todos os elementos */
elementosParaAnimar.forEach(function(el) {
  observador.observe(el);
});