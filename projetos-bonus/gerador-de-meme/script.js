/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-restricted-syntax */
// elementos

const campoTexto = document.getElementById('text-input');
const textoMeme = document.getElementById('meme-text');
const imagemMeme = document.getElementById('meme-image');
const inputImagem = document.getElementById('meme-insert');
const botoesCor = document.querySelectorAll('.bcor');
const containerImage = document.querySelector('.meme-image-container');
const imagensPreCarregadas = document.querySelectorAll('.boxImage');
const botaoDownload = document.querySelector('#download');
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

// Funções

const atualizarTexto = () => {
  campoTexto.addEventListener('keyup', (event) => {
    console.log(event.target.value);
    textoMeme.innerText = event.target.value;
  });
};

/* const atualizarImagem = () => {
  inputImagem.addEventListener('change', () => {
    const imagemCarregada = inputImagem.files[0];
    const urlImagem = URL.createObjectURL(imagemCarregada);
    imagemMeme.src = urlImagem;
    // imagemMeme.src = imagemCarregada;
  });
}; */

const atualizarImagem = () => {
  inputImagem.addEventListener('change', () => {
    const imagemCarregada = inputImagem.files[0];
    const urlImagem = URL.createObjectURL(imagemCarregada);
    imagemMeme.src = urlImagem;
    // imagemMeme.src = imagemCarregada;
  });
};

const baixarImagem = () => {
  botaoDownload.addEventListener('click', () => {
    context.drawImage(imagemMeme, 0, 0, canvas.width, canvas.height);
    context.font = ('30px "impact"');
    context.fillStyle = 'white';
    const textWidth = context.measureText(textoMeme.innerText).width;
    const x = (canvas.width - textWidth) / 2;
    const y = canvas.height - 20;
    context.shadowColor = 'black';
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 5;
    context.fillText(textoMeme.innerText, x, y);
    const imageDataUrl = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = `${textoMeme.innerText}.png`;
    link.click();
  });
};

const botaoFire = () => '3px dashed rgb(255,0,0)';
const botaoWater = () => '5px double rgb(0,0,255)';
const botaoEarth = () => '6px groove rgb(0,128,0)';
const botaoBlack = () => '2px solid rgb(0,0,0)';

const atualizarBorda = () => {
  for (const botoes of botoesCor) {
    botoes.addEventListener('click', (event) => {
      if (event.target.classList.contains('fire')) {
        containerImage.style.border = botaoFire();
      } else if (event.target.classList.contains('water')) {
        containerImage.style.border = botaoWater();
      } else if (event.target.classList.contains('earth')) {
        containerImage.style.border = botaoEarth();
      } else if (event.target.classList.contains('black')) {
        containerImage.style.border = botaoBlack();
      }
    });
  }
};

const imagensCarregadas = () => {
  for (const elemento of imagensPreCarregadas) {
    const imagem = elemento.children[0];
    elemento.addEventListener('click', () => {
      imagemMeme.src = imagem.src;
    });
  }
};

baixarImagem();
imagensCarregadas();
atualizarBorda();
atualizarTexto();
atualizarImagem();
