const iconeGenius = document.querySelector('.iconeGenius');

let rotacao = 0;

const rotacionarIcone = (rotacao) => {
  iconeGenius.style.transform = `rotate(${rotacao}deg)`;
};

const animacaoRotacionar = (angulo, velocidade, elemento) => {
  setInterval(() => {
    rotacao += angulo;
    rotacionarIcone(rotacao);
  }, velocidade);
};

animacaoRotacionar(90, 500, rotacionarIcone());

