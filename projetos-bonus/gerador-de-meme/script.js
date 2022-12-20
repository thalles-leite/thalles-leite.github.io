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

// Funções

const atualizarTexto = () => {
  campoTexto.addEventListener('keyup', (event) => {
    console.log(event.target.value);
    textoMeme.innerText = event.target.value;
  });
};

const atualizarImagem = () => {
  inputImagem.addEventListener('change', () => {
    const imagemCarregada = inputImagem.files[0];
    const urlImagem = URL.createObjectURL(imagemCarregada);
    imagemMeme.src = urlImagem;
    // imagemMeme.src = imagemCarregada;
  });
};

const botaoFire = () => '3px dashed rgb(255,0,0)';
const botaoWater = () => '5px double rgb(0,0,255)';
const botaoEarth = () => '6px groove rgb(0,128,0)';

const atualizarBorda = () => {
  for (const botoes of botoesCor) {
    botoes.addEventListener('click', (event) => {
      if (event.target.classList.contains('fire')) {
        containerImage.style.border = botaoFire();
      } else if (event.target.classList.contains('water')) {
        containerImage.style.border = botaoWater();
      } else if (event.target.classList.contains('earth')) {
        containerImage.style.border = botaoEarth();
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

imagensCarregadas();
atualizarBorda();
atualizarTexto();
atualizarImagem();
