const player = document.getElementById('player');
const game = document.querySelector('.game');
const chao = document.querySelector('.chao');
const audioCorrida = document.querySelector('.audioCorrida');
const audioPular = document.querySelector('.audioJump');
const campoPopUp = document.getElementById('popUp');
// const botaoTeste = document.getElementById('teste');
const botaoStop = document.getElementById('stop');
const botaoPlay = document.getElementById('play');
const localRespawn = document.getElementById('respawn');

const tamanhoTela = window.innerWidth;
const alturaTela = window.innerHeight;
const velocidade = 5;
const campoScore = document.getElementById('score');
const campoPlayer = document.getElementById('jogador');
let info = [];
let nomeInput = '';
let Pname = 'Visitante';
let score = 0;
let estado = 'stop';
let obstaculoInterval = '';
let moverIntervalo = '';
let pontuacaoInterval = '';
let verificaIntervalo = '';
let frequencia = 1000;
player.style.marginLeft = 0;
player.style.marginBottom = 0;

chao.style.backgroundPositionX = 0;
const infoLocal = localStorage.getItem('info');
if (infoLocal) {
    info = (JSON.parse(infoLocal));
    //Ordena os valores de ordem decrescente

}

const iniciarScore = () => {
    pontuacaoInterval = setInterval(() => {
        score += 1;
        campoScore.innerText = score;
    }, 1000);
}


const mensagemInicio = () => {
    const container = document.createElement('section');
    container.id = 'msgInicio';
    const titulo = document.createElement('h4');
    const nome = document.createElement('input');
    nome.type = 'text';
    nome.style.width = '94%'
    nome.style.textAlign = 'center';
    nome.style.marginBottom = '15px'
    nome.style.padding = '10px';
    nome.placeholder = 'Digite seu nome';
    nome.style.border = '1px solid black'
    nome.style.borderRadius = '50px'
    nome.id = 'nomePlayer';
    const botaoStart = document.createElement('button');
    botaoStart.innerText = 'Começar';
    botaoStart.style.marginTop = '10px';
    botaoStart.style.padding = '8px';
    botaoStart.style.border = '1px solid black';
    botaoStart.style.borderRadius = '50px';
    botaoStart.style.fontWeight = 900;
    botaoStart.addEventListener('click', () => {
        start();
    })

    titulo.innerText = "Pressione Enter para começar!"
    container.appendChild(nome);
    container.appendChild(titulo);
    container.appendChild(botaoStart)
    return container;
}

const mensagemGameOver = () => {
    const cont = document.getElementById('containerMsg');
    const mensagem = document.createElement('section');
    mensagem.className = 'mensagem';
    const h2GameOver = document.createElement('h2');
    const spanGameOver = document.createElement('span');
    spanGameOver.className = 'GameOver';
    spanGameOver.innerText = 'Game Over';
    const h3Pontuacao = document.createElement('h3');
    h3Pontuacao.innerText = `Pontuação: ${score}`
    const h5Press = document.createElement('h5');
    h5Press.innerText = `Pressione 'Enter' para iniciar um novo jogo.`
    const botaoStart = document.createElement('button');
    botaoStart.innerText = 'Começar';
    botaoStart.style.marginTop = '10px';
    botaoStart.style.padding = '8px';
    botaoStart.style.border = '1px solid black';
    botaoStart.style.borderRadius = '50px';
    botaoStart.style.fontWeight = 900;
    botaoStart.addEventListener('click', () => {
        start();
    })
    h2GameOver.appendChild(spanGameOver);
    mensagem.appendChild(h2GameOver)
    mensagem.appendChild(h3Pontuacao)
    mensagem.appendChild(h5Press)
    mensagem.appendChild(botaoStart);
    // console.log(cont)
    cont.appendChild(mensagem);

    const resultados = document.createElement('section');
    resultados.className = 'resultados';
    const h2Rank = document.createElement('h2');
    h2Rank.innerText = 'Ranking Geral';
    const rankCont = document.createElement('section');
    rankCont.className = 'rankCont';
    const olRank = document.createElement('ol');
    olRank.className = 'rank';
    olRank.id = 'rank'
    info.sort((a, b) => b.pontos - a.pontos)
    Object.values(info).forEach((elemento) => {
        const liRank = document.createElement('li');
        const secPont = document.createElement('section');
        secPont.className = 'pontuacao'
        const spanNome = document.createElement('span');
        spanNome.className = 'nome';
        spanNome.innerText = elemento.nome

        const spanPts = document.createElement('span');
        spanPts.className = 'pts';
        spanPts.innerText = elemento.pontos;

        secPont.appendChild(spanNome);
        secPont.appendChild(spanPts);
        liRank.appendChild(secPont);
        olRank.appendChild(liRank);
    })
    resultados.appendChild(h2Rank);
    rankCont.appendChild(olRank);
    resultados.appendChild(rankCont);
    cont.appendChild(resultados);
    return cont;
}

const exibirPopUp = (elemento) => {
    const campoMsg = document.getElementById('containerMsg');
    campoPopUp.style.display = 'flex';
    // console.log(elemento)
    campoPopUp.appendChild(elemento)
}
const removerPopUp = () => {
    const campoMsg = document.getElementById('containerMsg');
    const msgInicio = document.getElementById('msgInicio');
    msgInicio.innerHTML = '';
    campoMsg.innerHTML = '';
    campoPopUp.style.display = 'none';
}



document.addEventListener('keydown', (element) => {
    const tecla = element.key;
    switch (tecla) {
        case 'ArrowRight':
            moveDireita();
            break;
        case 'ArrowLeft':
            moveEsquerda();
            break;
        case ' ':
            // voarCima();
            pular();
            break;
        case 'ArrowDown':

            // voarBaixo();
            break;
        case 'Enter':
            start();

            break;

        default:
            break;
    }

})

document.addEventListener('touchstart', () => {
    pular();
})

const moveChao = () => {
    chao.style.animation = 'moverObj 5s linear infinite';
    audioCorrida.play();
    audioCorrida.loop = true;
}

const moveDireita = () => {
    const posicaoX = player.getBoundingClientRect().x + player.getBoundingClientRect().width + 5;

    if (posicaoX < tamanhoTela) {
        player.style.marginLeft = parseInt(player.style.marginLeft) + 15 + 'px';
    }
}
const voarCima = () => {
    const posicaoY = player.getBoundingClientRect().y + player.getBoundingClientRect().height + 5;
    if (posicaoY > 150) player.style.marginBottom = parseInt(player.style.marginBottom) + 50 + 'px';
    moveChao();
}

const voarBaixo = () => {
    const posicaoY = player.getBoundingClientRect().y + player.getBoundingClientRect().height + alturaTela * 0.1;
    if (posicaoY < alturaTela) player.style.marginBottom = parseInt(player.style.marginBottom) - 50 + 'px';
    moveChao();

}

const moveEsquerda = () => {
    if (player.getBoundingClientRect().x > 0) {
        player.style.marginLeft = parseInt(player.style.marginLeft) - 15 + 'px';
    }


}

const pular = () => {
    if (player.style.animationName === '') {
        player.style.animation = 'pular 1.5s linear';
        audioPular.pause();
        audioPular.currentTime = 0;
        audioPular.play();
        setTimeout(() => {
            if (player.style.animationPlayState === 'running') {
                player.style.animation = '';
            }
        }, 1500)
    };
}


const moverObstaculo = (obstaculo) => {

    obstaculo.style.left = obstaculo.offsetLeft - 10 + 'px';
    if ((obstaculo.getBoundingClientRect().x < 0)) {
        localRespawn.removeChild(obstaculo);
    }

}

const criarObstaculo = () => {
    // console.log(document.getElementsByClassName('obstacle').length)
    if (document.getElementsByClassName('obstacle').length === 0) {
        const obstaculo = document.createElement('span')
        obstaculo.className = 'obstacle'
        localRespawn.appendChild(obstaculo);
        moverIntervalo = setInterval(() => {
            moverObstaculo(obstaculo);

        }, (Math.round(tamanhoTela / (velocidade * 10))));
        estado = 'run';
    }
}
// const clicarBotaoTeste = () => {
//     botaoTeste.addEventListener('click', () => {
//         moveChao();
//         criarObstaculo();
//     })
// }

const pararMovimento = () => {
    chao.style.animation = '';
}
const pararMusica = () => {
    audioCorrida.pause();
}
const pararObstaculo = () => {
    clearInterval(moverIntervalo)
}

const pararTudo = () => {
    pararMovimento();
    pararMusica();
    pararObstaculo();
    clearInterval(obstaculoInterval);
    clearInterval(verificaIntervalo);
    clearInterval(moverIntervalo)
    player.style.animationPlayState = 'paused';
    estado = 'stop';
    clearInterval(pontuacaoInterval);
    info.push({ nome: Pname, pontos: score })
    localStorage.setItem('info', JSON.stringify(info));
    exibirPopUp(mensagemGameOver());

}
// const clicarBotaoStop = () => {
//     botaoStop.addEventListener('click', () => {
//         pararTudo();
//     })
// }

const posicaoPlayer = () => {
    const posicaoX = player.getBoundingClientRect().x;
    const posicaoY = player.getBoundingClientRect().y;
    const limites = [];
    limites.push(posicaoX);
    limites.push(posicaoX + 200);
    limites.push(alturaTela - posicaoY - 209);
    return limites;
}

const posicaoObstaculos = () => {
    const obstaculos = document.getElementsByClassName('obstacle');
    const limites = []
    Object.values(obstaculos).forEach((obstaculo) => {
        limites.push(obstaculo.getBoundingClientRect().x)
        limites.push(obstaculo.getBoundingClientRect().x + 100);
        limites.push(alturaTela - obstaculo.getBoundingClientRect().y - 69);
    })
    return limites
}


const verificaColisao = () => {
    const posPlayer = posicaoPlayer();
    const posObstaculo = posicaoObstaculos();

    for (let i = 0; i < posObstaculo.length; i += 3) {
        if ((posPlayer[1] > posObstaculo[i] && posPlayer[0] < posObstaculo[i + 1]) && (posPlayer[2] < posObstaculo[i + 2])) {
            pararTudo();
            console.log('Colisão');
        }
    }
}



const start = () => {
    if (document.getElementById('nomePlayer')) {
        nomeInput = document.getElementById('nomePlayer').value;
    }
    nomeInput.trim() !== '' && (Pname = nomeInput);
    removerPopUp();
    score = 0;
    campoPlayer.innerText = Pname;
    campoScore.innerHTML = 0;
    iniciarScore();
    const obstaculos = document.getElementsByClassName('obstacle');
    moveChao();
    obstaculoAleatorio();
    localRespawn.innerHTML = '';
    player.style.animation = '';
    player.style.bottom = '69px';
    player.style.left = '10vw';
    estado = 'stop'
    verificaIntervalo = setInterval(verificaColisao, 10);
}

const obstaculoAleatorio = () => {
    if (estado !== 'run') {
        obstaculoInterval = setInterval(() => {
            criarObstaculo();
        }, Math.random() * frequencia + 2000);
        estado = 'run';
    }
}

const clicarBotaoPlay = () => {
    botaoPlay.addEventListener('click', () => {
        start();
    })
}

// clicarBotaoTeste();
// clicarBotaoStop();
// clicarBotaoPlay();

exibirPopUp(mensagemInicio());
