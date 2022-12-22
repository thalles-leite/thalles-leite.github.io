// Elementos
let nGabarito = 0;
let corGabarito = '';
let placar = 0;
let vidas = 5;
let player = {}
const quantidadeDeCores = 6;
const rankingLocal = JSON.parse(localStorage.getItem('rank'));
if (rankingLocal) {
  player = rankingLocal;
}

const divCirculo = document.querySelector('.circulos');
const circulos = document.getElementsByClassName('ball');
const textAnswer = document.getElementById('answer');
const resetButton = document.getElementById('reset-game');
const valueScore = document.getElementById('score');
const valueLife = document.getElementById('vidas');
const campoLog = document.getElementById('logList');
const campoRank = document.getElementById('rank');
const botaoReset = document.querySelector('.reset-rank');

textAnswer.innerText = 'Escolha uma cor';
valueScore.innerText = placar;
valueLife.innerText = vidas;

// Funções

// Função que gera uma cor no formato RGB de forma aleatória.
const corAleatoria = () => {
  const cor = [];
  for (let index = 0; index < 3; index += 1) {
    cor.push(Math.round(Math.random() * 255));
  }
  return `(${cor.join(',')})`;
};

// Funçao para preencher o parágrafo com uma cor aleatória
const preencherParagrafo = (cor) => {
  document.querySelector('#rgb-color').innerHTML = cor;
};

// Função para gerar os botões das cores
const gerarBotoesCores = () => {
  divCirculo.innerHTML = '';
  for (let i = 0; i < quantidadeDeCores; i += 1) {
    const cor = document.createElement('div');
    cor.classList.add('ball');
    cor.id = 'ball';
    cor.style.backgroundColor = `rgb${corAleatoria()}`;
    divCirculo.appendChild(cor);
  }
};

// Função que pega uma cor aleatória das cores geradas
const corAleatoriaSorteada = () => {
  // número aleatório entre 1 e 6;
  nGabarito = Math.round(Math.random() * 5);
  corGabarito = circulos[nGabarito].style.backgroundColor.slice(3);
  preencherParagrafo(corGabarito);
};

// Função para verificar se clicou na cor certo.
const verificarCor = () => {
  Object.values(circulos).forEach((circulo) => {
    circulo.addEventListener('click', () => {
      console.log(nGabarito + 1);
      if (circulo.style.backgroundColor.slice(3) === corGabarito) {
        textAnswer.innerText = 'Acertou!';
        fLog('Acertou! +3pts')
        placar += 3;
        valueScore.innerText = placar;
        gerarBotoesCores();
        corAleatoriaSorteada();
        verificarCor();

      } else {
        textAnswer.innerText = 'Errou! Tente novamente!';
        fLog('Errou! -1 vida')
        vidas -= 1;
        valueLife.innerText = vidas;
        if (vidas <= 0) {
          fLog(`Fim de jogo! ${placar}pts`)
          vidas = 0;
          valueLife.innerText = vidas;
          const thisPlayer = prompt(`Game Over! \nSua pontuação foi: ${placar} \nDigite seu nome:`)
          if (thisPlayer) {
            player[`${thisPlayer}`] = placar;
            localStorage.setItem('rank', JSON.stringify(player));
            atualizarRank();
          }
          começar();
        }
      }
    });
  });
};


// Função do botão reset
const resetGame = () => {
  resetButton.addEventListener('click', () => {
    if (confirm('Deseja resetar o jogo?')) {
      começar();
    }
  });
};

const começar = () => {
  textAnswer.innerText = 'Escolha uma cor';
  gerarBotoesCores();
  corAleatoriaSorteada();
  verificarCor();
  vidas = 5;
  placar = 0;
  valueScore.innerText = placar;
  valueLife.innerText = vidas;

  console.log(nGabarito + 1);
}
// Função atualizar log
const fLog = (texto) => {
  const log = document.createElement('p');
  log.innerText = texto;
  campoLog.appendChild(log)
}

// Atualizar Rank 
const atualizarRank = () => {
  if (rankingLocal) {
    player = rankingLocal;
  }
  campoRank.innerHTML = '';
  const lista = Object.entries(player);
  lista.sort((a, b) => b[1] - a[1]);
  for (const player of lista) {
    const posicao = document.createElement('li');
    posicao.classList.add('lista');
    posicao.innerText = `${player[0]}: ${player[1]}pts`
    campoRank.appendChild(posicao);
  }
}

const resetRank = () => {
  botaoReset.addEventListener('click', () => {
    localStorage.removeItem('rank');
    player = {};
    atualizarRank();
  })
}

fLog('Jogo iniciado.')
preencherParagrafo();
gerarBotoesCores();
corAleatoriaSorteada();
verificarCor();
resetGame();
atualizarRank();
resetRank();

console.log(nGabarito + 1);
