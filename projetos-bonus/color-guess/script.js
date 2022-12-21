// Elementos
let nGabarito = 0;
let corGabarito = '';
let placar = 0;
const quantidadeDeCores = 6;


const divCirculo = document.querySelector('.circulos');
const circulos = document.getElementsByClassName('ball');
const textAnswer = document.getElementById('answer');
const resetButton = document.getElementById('reset-game');
const valueScore = document.getElementById('score');
// Variáveis

textAnswer.innerText = 'Escolha uma cor';
valueScore.innerText = placar;

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
        placar += 3;
        valueScore.innerText = placar;
        gerarBotoesCores();
        corAleatoriaSorteada();
        verificarCor();
        console.log(nGabarito + 1);
      } else {
        textAnswer.innerText = 'Errou! Tente novamente!';
      }
    });
  });
};

// Função do botão reset
const resetGame = () => {
  resetButton.addEventListener('click', () => {
    textAnswer.innerText = 'Escolha uma cor';
    gerarBotoesCores();
    corAleatoriaSorteada();
    verificarCor();
    console.log(corGabarito);
    console.log(nGabarito + 1);
  });
};

preencherParagrafo();
gerarBotoesCores();
corAleatoriaSorteada();
verificarCor();
resetGame();

console.log(corGabarito);
console.log(nGabarito + 1);
