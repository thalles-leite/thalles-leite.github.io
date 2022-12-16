/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable no-loop-func */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-restricted-syntax */
// variáveis
let corLocal = {};
let pixelLocal = {};
let quantidadeDeBotoes = 4;
let ladosQuadro = 5;

// LocalStorage
const objCor = localStorage.getItem('colorPalette');
const pixelBoard = localStorage.getItem('pixelBoard');
const boardSize = localStorage.getItem('boardSize');
const qtdBotoes = localStorage.getItem('qtdBotoes');

if (objCor) {
  corLocal = JSON.parse(objCor);
}

if (pixelBoard) {
  pixelLocal = JSON.parse(pixelBoard);
}

if (boardSize) {
  ladosQuadro = parseInt(boardSize, 10);
}
if (qtdBotoes) {
  quantidadeDeBotoes = parseInt(qtdBotoes, 10);
}

// elementos
let botoesPaleta = document.getElementsByClassName('color');
const divBotoesPaleta = document.querySelector('.color-palette');
const botaoCoresAleatorias = document.querySelector('.button-random-color');
const quadroPixels = document.querySelector('.pixel-board');
let pixels = document.getElementsByClassName('pixel');
const botaoLimpar = document.querySelector('.clear-board');
const botaoVqv = document.querySelector('.generate-board');
let campoTamanho = document.querySelector('.board-size');
const botaoQtdCores = document.querySelector('#generate-palette');
const campoQtdCores = document.querySelector('#palette-size');
const dCorSelecionada = document.querySelector('.dCorSelecionada');
const audioClick = document.querySelector('#audioClick');

quadroPixels.style.height = `${60}vh`;
// Funções
const gerarCores = () => {
  let rCor = 'rgb(';
  rCor += Math.round(Math.random() * 255);
  rCor += ',';
  rCor += Math.round(Math.random() * 255);
  rCor += ',';
  rCor += Math.round(Math.random() * 255);
  rCor += ')';
  return rCor;
};

const gerarBotoesPaleta = (quantidade) => {
  for (let index = 0; index < quantidade; index += 1) {
    const botao = document.createElement('button');
    if (index === 0) {
      botao.classList.add('selected');
      botao.style.backgroundColor = 'rgb(0,0,0)';
    }
    if (index === 1) {
      botao.style.backgroundColor = 'rgb(254,254,254)';
    }
    botao.classList.add('color');
    divBotoesPaleta.appendChild(botao);
  }
};

const preencherPaleta = () => {
  botoesPaleta = document.getElementsByClassName('color');
  for (let index = 2; index < botoesPaleta.length; index += 1) {
    if (!botoesPaleta[index].classList.contains('borracha')) {
      if (Object.keys(corLocal).length !== botoesPaleta.length - 3) {
        // Gera uma cor aleatória e atribui ao botão
        botoesPaleta[index].style.backgroundColor = gerarCores();
        // Adiciona essa cor ao array;
        corLocal[index] = (botoesPaleta[index].style.backgroundColor);
        // se o tamanho for igual
      } else {
        // atribui a cor do array ao botão.
        botoesPaleta[index].style.backgroundColor = corLocal[index];
      }
    }
  }
  localStorage.setItem('colorPalette', JSON.stringify(corLocal));
};

const botaoCores = () => {
  botaoCoresAleatorias.addEventListener('click', () => {
    localStorage.removeItem('colorPalette');
    corLocal = {};
    preencherPaleta();
  });
};

const gerarPixels = () => {
  const lateralPixel = ((quadroPixels.getBoundingClientRect().height) / ladosQuadro);
  console.log(dCorSelecionada);
  for (let i = 0; i < ladosQuadro; i += 1) {
    const linha = document.createElement('div');
    linha.classList.add('linha');
    for (let j = 0; j < ladosQuadro; j += 1) {
      const numeroDoPixel = j + (ladosQuadro * i);
      const pixel = document.createElement('div');
      pixel.style.width = `${lateralPixel}px`;
      pixel.style.height = `${lateralPixel}px`;

      pixel.classList.add('pixel');
      if (pixelLocal[numeroDoPixel]) {
        pixel.style.backgroundColor = pixelLocal[numeroDoPixel];
        if (pixelLocal[numeroDoPixel] !== 'rgb(255, 255, 255)') {
          pixel.style.borderColor = pixelLocal[numeroDoPixel];
        }
      } else {
        pixel.style.backgroundColor = 'rgb(255,255,255)';
      }
      linha.appendChild(pixel);
    }
    quadroPixels.appendChild(linha);
  }
};

const salvarAcao = () => {
  for (let pixel = 0; pixel < pixels.length; pixel += 1) {
    if (pixels.length > 0) {
      pixelLocal[pixel] = pixels[pixel].style.backgroundColor;
    }
  }
  localStorage.removeItem('pixelBoard');
  localStorage.setItem('pixelBoard', JSON.stringify(pixelLocal));
};

const pintar = () => {
  const corSelecionada = document.querySelector('.selected');
  dCorSelecionada.style.backgroundColor = corSelecionada.style.backgroundColor;
  for (const pixel of pixels) {
    pixel.addEventListener('click', () => {
      pixel.style.backgroundColor = corSelecionada.style.backgroundColor;
      pixel.style.borderColor = corSelecionada.style.backgroundColor;
      console.log(audioClick);
      audioClick.pause();
      audioClick.currentTime = 0;
      audioClick.play();
      salvarAcao();
    });
  }
};

const selecionar = () => {
  botoesPaleta = document.getElementsByClassName('color');
  for (const botao of botoesPaleta) {
    botao.addEventListener('click', (event) => {
      for (const botaoF of botoesPaleta) {
        botaoF.classList.remove('selected');
      }
      event.target.classList.add('selected');
      pintar();
    });
  }
};

const limpar = () => {
  for (const pixel of pixels) {
    pixel.style.backgroundColor = 'rgb(255,255,255)';
    pixel.style.borderColor = 'black';
  }
  pixelLocal = {};
  localStorage.removeItem('pixelBoard');
  salvarAcao();
};

const botaoLimparAcao = () => {
  botaoLimpar.addEventListener('click', () => limpar());
};

const tamanhoDoQuadro = () => {
  // eslint-disable-next-line complexity
  botaoVqv.addEventListener('click', () => {
    pixels = document.getElementsByClassName('pixel');
    campoTamanho = document.querySelector('.board-size');
    if (campoTamanho.value > 0) {
      if (campoTamanho.value < 5) {
        console.log(campoTamanho.value);
        ladosQuadro = 5;
        quadroPixels.innerHTML = '';
      } else if (campoTamanho.value > 50) {
        console.log(campoTamanho.value);
        ladosQuadro = 50;
        quadroPixels.innerHTML = '';
      }
      if (campoTamanho.value >= 5 && campoTamanho.value <= 50) {
        console.log(campoTamanho.value);
        ladosQuadro = campoTamanho.value;
        quadroPixels.innerHTML = '';
      }
      localStorage.removeItem('pixelBoard');
      gerarPixels();
      pintar();
      selecionar();
      limpar();
    } else {
      console.log(campoTamanho.value);
      alert('Board inválido!');
    }
    localStorage.setItem('boardSize', ladosQuadro);
  });
};

botaoQtdCores.addEventListener('click', () => {
  if (campoQtdCores.value > 0) {
    campoQtdCores.style.border = 'none';
    localStorage.removeItem('colorPalette');
    divBotoesPaleta.innerHTML = '';
    corLocal = {};
    gerarBotoesPaleta(campoQtdCores.value);
    preencherPaleta();
    selecionar();
    localStorage.setItem('qtdBotoes', campoQtdCores.value);
  } else {
    alert('Defina uma quantidade de cores por favor.');
    campoQtdCores.focus();
  }
});
//
document.querySelector('.board-size').placeholder = ladosQuadro;
document.querySelector('#palette-size').placeholder = quantidadeDeBotoes;
// Chamada das funções
gerarBotoesPaleta(quantidadeDeBotoes);
preencherPaleta();
botaoCores();

gerarPixels();
pintar();
botaoLimparAcao();
tamanhoDoQuadro();
selecionar();
