// Elementos
const botaoCriar = document.getElementById('criar-carta');
const inputCarta = document.getElementById('carta-texto');
const campoCarta = document.getElementById('carta-gerada');
const cartaContador = document.getElementById('carta-contador');

let spans = '';

// Funções
const adicionarSpan = () => {
  const arrayPalavras = inputCarta.value.split(' ');
  arrayPalavras.forEach((element, indice) => {
    arrayPalavras[indice] = `<span>${element}</span>`;
  });
  return arrayPalavras.join(' ');
};

const numeroAleatorio = (tam) => Math.round(Math.random() * tam);

const classeAleatoria = () => {
  const estilos = {
    grupoEstilo: ['newspaper', 'magazine1', 'magazine2'],
    grupoTamanho: ['medium', 'big', 'reallybig'],
    grupoRotacao: ['rotateleft', 'rotateright'],
    grupoInclinacao: ['skewleft', 'skewright'],
  };
  const arrayClasse = [];

  Object.entries(estilos).forEach((itemClasse) => {
    const numAleatorio = numeroAleatorio(itemClasse[1].length - 1);
    const classe = itemClasse[1][numAleatorio];
    arrayClasse.push(classe);
  });
  return arrayClasse;
};

const atribuirClasse = () => {
  spans = document.querySelectorAll('.carta-gerada span');
  cartaContador.innerText = spans.length;
  spans.forEach((element) => {
    const classe = classeAleatoria().join(' ');
    const localElement = element;
    localElement.className = classe;
  });
};

const clickPalavra = () => {
  Object.entries(spans).forEach((palavra) => {
    palavra[1].addEventListener('click', () => {
      const classe = classeAleatoria().join(' ');
      const localElement = palavra[1];
      localElement.className = classe;
    });
  });
};

const adicionarCarta = () => {
  botaoCriar.addEventListener('click', () => {
    if (inputCarta.value.trim() === '') {
      campoCarta.innerHTML = 'Por favor, digite o conteúdo da carta.';
    } else {
      campoCarta.innerHTML = adicionarSpan();
      atribuirClasse();
      clickPalavra();
    }
  });
};

adicionarCarta();
clickPalavra();
