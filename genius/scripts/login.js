/* eslint-disable object-curly-spacing */
const inputPlayerName = document.querySelector('.inputPlayerName');
const buttonPlay = document.querySelector('.buttonPlay');
const formLogin = document.querySelector('.formLogin');
const playerName = [];


const login = () => {
  const verificarInput = () => {
    inputPlayerName.addEventListener('input', ({ target }) => {
      target.value.length > 3 ? buttonPlay.removeAttribute('disabled', '') :
        buttonPlay.setAttribute('disabled', '');
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    playerName.push(inputPlayerName.value);
    localStorage.setItem('playerName', JSON.stringify(playerName));
    console.log(inputPlayerName.value.length);
    if (inputPlayerName.value.length > 0) {
      window.location = 'pages/game.html';
    } else {
      buttonPlay.setAttribute('disabled', '');
    }
  };

  verificarInput();
  formLogin.addEventListener('submit', handleSubmit);
};

login();
