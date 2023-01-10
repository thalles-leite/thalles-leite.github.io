const campoPlayer = document.getElementById('playerName');
const campoScore = document.getElementById('score');
const campoRecordScore = document.getElementById('recordScore');
const campoRecordName = document.getElementById('recordName');
const gameGenius = document.getElementsByClassName('part');
const gCenter = document.querySelector('#gCenter');
let playerName;
let lvl = 0;
let stage = [];
let generatedArray = [];
let timesClicked = 0;
let indexCompare = 0;
let score = 0;
let recordName = '';
let recordScore = 0;
const phrases = ['Boa!', 'Isso ai!', 'Joga bem!', 'Acertou!', 'Parabéns!'];
document.addEventListener('contextmenu', (event) => event.preventDefault());

const checkLocalData = () => {
  const player = JSON.parse(localStorage.getItem('playerName'));
  const recordNameLocal = localStorage.getItem('recordName');
  const recordScoreLocal = localStorage.getItem('recordScore');
  if (player) playerName = player;
  if (recordNameLocal) recordName = recordNameLocal;
  if (recordScoreLocal) recordScore = recordScoreLocal;
};

checkLocalData();

const blinkColor = () => {
  for (const part in gameGenius) {
    if (gameGenius.hasOwnProperty(part)) {
      const arrPart = [0, 1, 3, 2];
      gameGenius[arrPart[part]].style.animation = `blink 2s linear infinite`;
      gameGenius[arrPart[part]].style.animationDelay = `${0.5 * part}s`;
    }
  }
};

const stopBlinkColor = () => {
  for (const part in gameGenius) {
    if (gameGenius.hasOwnProperty(part)) {
      gameGenius[part].style.animation = '';
      gameGenius[part].style.animationDelay = ``;
    }
  }
};

const tocarAudio = (key) => {
  const audio = new Audio(`../sons/${key}.wav`);
  audio.play();
};

const endGame = () => {
  alteraTextoBotao('Errou!');
  const option = confirm(`Que pena, você errou!
Pressione "OK" para tentar novamente ou "Cancelar" para sair`);
  if (score > recordScore) {
    localStorage.setItem('recordScore', score);
    localStorage.setItem('recordName', playerName);
  }
  score = 0;
  setTimeout(() => {
    if (option) {
      loadGame();
    } else {
      window.location = '../index.html';
    }
  }, 1000);
};
updateScore = (arg) => {
  score += Number(arg);
  campoScore.innerText = `${score} pts`;
};

const compareKey = (arg) => {
  let erro = false;
  timesClicked += 1;
  if (timesClicked <= stage.length) {
    if (Number(arg[1]) === stage[indexCompare]) {
      indexCompare += 1;
      updateScore(1);
    } else {
      disableSound();
      erro = true;
      setTimeout(() => {
        endGame();
      }, 100);
    };
    if (timesClicked === stage.length && erro === false) {
      alteraTextoBotao(phrases[Math.floor(Math.random() * 5)]);

      setTimeout(() => {
        console.log(phrases[Math.floor(Math.random() * 5)]);
        stage = '';
        timesClicked = 0;
        indexCompare = 0;
        start();
        disableSound();
      }, 1000);
    }
  }
};

const handleClick = (event) => {
  alteraTextoBotao('');
  const key = event.target.getAttribute('data-key');
  event.target.classList.add('elementActive');
  tocarAudio(key);
  blink(event.target.id);
  compareKey(event.target.id);
};

const activeSound = () => {
  Object.values(gameGenius).forEach((part) => {
    part.addEventListener('mousedown', handleClick);
  });
};


const disableSound = () => {
  Object.values(gameGenius).forEach((part) => {
    part.removeEventListener('mousedown', handleClick);
  });
};

const arrayGenerator = () => {
  generatedArray.push(Math.floor(Math.random() * 4) + 1);
  return (generatedArray);
};

const blink = (arg) => {
  const elemento = document.getElementById(arg);
  elemento.style.filter = 'saturate(1)';
  const corPart = window.getComputedStyle(elemento).backgroundColor;
  gCenter.style.backgroundColor = corPart;
  gCenter.style.filter = 'saturate(1)';
  setTimeout(() => {
    elemento.style.filter = '';
    gCenter.style.backgroundColor = 'white';
  }, 500);
};

const playersTurn = () => {
  setTimeout(() => {
    alteraTextoBotao('Sua vez!');
    activeSound();
  }, 1000);
};

const soundPlay = (index = 0, size) => {
  if (stage.length === 0) {
    stage = arrayGenerator(size);
  };
  if (index === stage.length) {
    playersTurn();
    return;
  }

  setTimeout(() => {
    blink(`s${stage[index]}`);
    tocarAudio(stage[index]);
    soundPlay(index + 1);
  }, 1000);
};

const alteraTextoBotao = (arg) => {
  gCenter.innerHTML = arg;
};
disableGcenter = () => {
  gCenter.removeEventListener('click', start);
};
const start = () => {
  lvl += 1;
  disableGcenter();
  alteraTextoBotao('');
  stopBlinkColor();
  soundPlay(0, lvl);
};

verificarPlayer = () => {
  if (playerName !== null) {
    campoPlayer.innerText = `${playerName} :`;
    campoScore.innerText = `${score} pts`;
  } else {
    window.location = '../index.html';
  }
};

const atualizaRecord = () => {
  console.log(recordScore);
  if (recordScore > 0) {
    campoRecordName.innerText = `Record: ${recordName} `;
    campoRecordScore.innerText = `${recordScore} pts`;
  }
};

const loadGame = () => {
  generatedArray = [];
  score = 0;
  lvl = 0;
  timesClicked = 0;
  indexCompare = 0;
  stage = '';
  checkLocalData();
  atualizaRecord();
  verificarPlayer();
  alteraTextoBotao('Começar!');
  blinkColor();
  disableSound();
  gCenter.addEventListener('click', start);
};

loadGame();


