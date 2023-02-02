/* eslint-disable object-curly-spacing */
/* eslint-disable max-len */
const bCards = document.querySelector('.cards');
const blueLight = document.querySelector('.blueLight');
const lvl = document.querySelector('#lvl');
const campStars = document.querySelector('#stars');
const campMissing = document.querySelector('.missing');
const campNextLevel = document.querySelector('.nextLevel');
const star2 = document.querySelector('#star2');
const star3 = document.querySelector('#star3');
const containerMsg = document.querySelector('.containerMsg');
const containerModal = document.querySelector('.modal');
const campPlayer = document.querySelector('.name');
const btnNewPlayer = document.querySelector('.btNewPlayer');
let missingStars = 6;
let starsByLvl = {};
let playersData = [];
let soundCorrect;
let soundWrong;
let soundVictory;
let firstClickedCard = '';
let lastClickedCard = '';
let level = 2;
let stars = 0;
let starsPoints;
let player = 'Visitante';

const resetValues = () => {
  missingStars = 6;
  starsByLvl = {};
  soundCorrect;
  soundWrong;
  soundVictory;
  firstClickedCard = '';
  lastClickedCard = '';
  level = 2;
  stars = 0;
  starsPoints;
  player = 'Visitante';
};


for (let index = 0; index < 20; index++) {
  starsByLvl = {...starsByLvl, [(index+1)]: ((Math.pow(index, 2))+index)};
}

const localStorageInsert= (key, value) =>{
  playersData = [...playersData, {[key]: value}];
  localStorage.setItem('data', JSON.stringify(playersData));
};

const newNameTags = () => {
  const titulo = document.createElement('h4');
  const inputName = document.createElement('input');
  const inputButton = document.createElement('button');

  titulo.style.marginBottom = '20px';
  titulo.innerText = `Digite seu nome`;

  inputName.type = 'text';
  inputName.className = ('nome');
  inputName.style.padding = '10px';
  inputName.style.width = '50%';
  inputName.style.marginBottom = '20px';
  inputName.style.textAlign = 'center';
  inputName.addEventListener('keyup', ({target: {value}}) => {
    value.length>0?inputButton.removeAttribute('disabled'):
    inputButton.setAttribute('disabled', '')
    ;
  });

  inputButton.innerText = 'Ok';
  inputButton.style.padding = '10px';
  inputButton.setAttribute('disabled', '');
  inputButton.addEventListener('click', () => {
    localStorageInsert('name', inputName.value);
    player = inputName.value;
    displayModal(false);
    generateAllCards(level);
  });

  containerMsg.appendChild(titulo);
  containerMsg.appendChild(inputName);
  containerMsg.appendChild(inputButton);
};

const displayModal = (disp) => {
  disp === true ? containerModal.classList.remove('displayNone') :
  containerModal.classList.add('displayNone');
};

const exibirModal = (arg) => {
  if (arg === 'novoUser') {
    displayModal(true);
    newNameTags();
  }
};

const verifyData = () => {
  const dados = JSON.parse(localStorage.getItem('data'));
  if (!dados) {
    exibirModal('novoUser');
  } else {
    playersData = dados,
    player = dados[dados.length-1].name; ;
  }
};

verifyData();

// Cria um novo objeto do cronômetro
const timer = new Timer();

const updateStars = () => {
  const tempoTotal = timer.getTotalTimeValues().seconds;

  if (tempoTotal > 10 * (level-1)) {
    starsPoints = 1;
    star2.classList.add('starDisabled');
  } else if (tempoTotal > 8 * (level-1)) {
    starsPoints = 2;
    star3.classList.add('starDisabled');
  } else {
    starsPoints = 3;
  }
};
// Atualiza o tempo exibido na tela a cada segundo
timer.addEventListener('secondsUpdated', () => {
  updateStars();
  document.getElementById('timer').innerHTML = `${timer.getTimeValues().toString(['minutes', 'seconds'])}`;
});

const loadSounds = () => {
  soundCorrect = new Audio('./files/sounds/correct.wav');
  soundWrong = new Audio('./files/sounds/wrong.wav');
  soundVictory = new Audio('./files/sounds/win.wav');
  soundCorrect.load();
  soundWrong.load();
  soundVictory.load();
};

const playSoundCorrect = () => {
  soundCorrect.pause();
  soundCorrect.currentTime = 0;
  soundCorrect.play();
};

const playSoundWrong = () => {
  soundWrong.pause();
  soundWrong.currentTime = 0;
  soundWrong.play();
};

const playSoundVictory = () => {
  soundVictory.pause();
  soundVictory.currentTime = 0;
  soundVictory.play();
};

const arrayGenerator = (dificult) => {
  const arrayCards = [];
  const qtdCards = (dificult);
  while (arrayCards.length < qtdCards) {
    const number = Math.floor((Math.random()) * 39) + 1;
    if (!arrayCards.includes(number)) {
      arrayCards.push(number);
    };
  };
  const cards = [...arrayCards, ...arrayCards].sort(() => Math.random() - 0.5);
  return cards;
};

const verifyStars = (level, stars) => {
  const proxLvl = Object.entries(starsByLvl).find((lvl) => +lvl[0]=== level+1)[1];
  missingStars = proxLvl-stars;
  return stars>= proxLvl;
};
const victoryVerify = () => {
  const corrects = document.querySelectorAll('.correct').length;
  const cards = document.querySelectorAll('.card').length;
  if (corrects >= cards) {
    playSoundVictory();
    timer.stop();

    stars+=starsPoints;

    setTimeout(() => {
      verifyStars(level, stars) ? levelUp() :generateAllCards(level);
    }, 2000);
  }
};

const correctMove = () => {
  firstClickedCard.previousSibling.classList.add('correct');
  lastClickedCard.previousSibling.classList.add('correct');
  firstClickedCard = '';
  lastClickedCard = '';
  if (victoryVerify()) {
    return;
  }
  playSoundCorrect();
};

const wrongMove = () => {
  playSoundWrong();
  setTimeout(() => {
    firstClickedCard.parentNode.classList.remove('rotate');
    lastClickedCard.parentNode.classList.remove('rotate');
    firstClickedCard = '';
    lastClickedCard = '';
  }, 1000);
};

const checkPlay = (target) => {
  target.parentNode.classList.add('rotate');
  if (firstClickedCard === '') {
    firstClickedCard = target;
    return;
  };
  lastClickedCard = target;
  console.log(`Primeira carta: ${firstClickedCard.getAttribute('data-key')}\nSegunda carta: ${lastClickedCard.getAttribute('data-key')}`);
  firstClickedCard.getAttribute('data-key') === lastClickedCard.getAttribute('data-key') ? correctMove() : wrongMove();
};

const generateCard = (image, lados) => {
  const cards = document.querySelector('.cards');
  const colGrid = Math.ceil(Math.sqrt(2 * lados));
  const rowGrid = Math.floor(Math.sqrt(2 * lados));
  const card = document.createElement('section');
  const frontCard = document.createElement('section');
  const backCard = document.createElement('section');

  card.className = 'card';
  cards.style.gridTemplateColumns = `repeat(${colGrid}, 1fr)`;
  cards.style.gridTemplateRows = `repeat(${rowGrid}, 1fr)`;

  card.addEventListener('click', ({ target }) => {
    if (firstClickedCard === '' || lastClickedCard === '') {
      // Inicia o cronômetro
      timer.start({ precision: 'secondTenths' });
      checkPlay(target);
    }
  });

  frontCard.className = 'frontCard side';
  frontCard.style.backgroundImage = `url(./files/images/pokemons/${image}.gif)`;
  backCard.setAttribute('data-key', image);
  backCard.className = 'backCard side';

  card.appendChild(frontCard);
  card.appendChild(backCard);
  bCards.appendChild(card);
};

const generateAllCards = (lados) => {
  lvl.innerText = level-1;
  campStars.innerText = stars;
  campMissing.innerText = missingStars;
  campNextLevel.innerText = level;
  campPlayer.innerText = `${player}`;
  star2.className = 'star';
  star3.className = 'star';
  bCards.innerHTML = '';
  const arrayCards = arrayGenerator(lados);
  arrayCards.forEach((element) => {
    generateCard(element, lados);
  });
};

blueLight.addEventListener('click', () => {
  levelUp();
});

blueLight.addEventListener('contextmenu', (element) => {
  element.preventDefault();
  generateAllCards(level);
  level -= 1;
});

const levelUp = () => {
  level += 1;
  verifyStars(level, stars);
  timer.stop();
  timer.reset();
  firstClickedCard = '';
  lastClickedCard = '';
  generateAllCards(level);
};
const start = () => {
  btnNewPlayer.addEventListener('click', () => {
    resetValues();
    exibirModal('novoUser');
  });
  generateAllCards(level);
};
start();
loadSounds();
