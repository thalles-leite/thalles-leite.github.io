const pagina = document.querySelector('body');
const player = document.getElementById('player');
const game = document.querySelector('.game');
const chao = document.querySelector('.chao');
const audioCorrida = document.querySelector('.audioCorrida');
const audioPular = document.querySelector('.audioJump');

// const botaoTeste = document.getElementById('teste');
const botaoStop = document.getElementById('stop');
const botaoPlay = document.getElementById('play');
const localRespawn = document.getElementById('respawn');
const tamanhoTela = window.innerWidth;
const alturaTela = window.innerHeight;
const campoScore = document.getElementById('score');
const campoPlayer = document.getElementById('jogador');
const bestScore = document.getElementById('bestScore');
const botaoSom = document.getElementById('sound');
const mesmoPlayer = false;
const sectionVelocidade = document.getElementById('velocidade')
let movimentoChao = '';
let info = [];
let nomeInput = '';
let Pname = 'Visitante';
let score = 0;
let estado = 'stop';
let obstaculoInterval = '';
let moverIntervalo = '';
let pontuacaoInterval = '';
let verificaIntervalo = '';
let verificaVelocidade = '';
let frequencia = 1000;
let preOponentes = ['imagens/each/op2.png', 'imagens/each/op3.png', 'imagens/each/op4.png', 'imagens/each/op5.png', 'imagens/each/op6.png', 'imagens/each/op7.png', 'imagens/each/op8.png', 'imagens/each/op9.png', 'imagens/each/op10.png', 'imagens/each/op11.png', 'imagens/each/op12.png', 'imagens/each/op13.png', 'imagens/each/op14.png', 'imagens/each/op15.png']
let players = ['imagens/players/p1.png', 'imagens/players/p2.png', 'imagens/players/p3.png', 'imagens/players/p4.png']
let oponentes = [];
let velocidadeInicial = '';

if (window.devicePixelRatio > 1) {
    velocidadeInicial = 1.2;
    console.log('celular');
}
else {
    velocidadeInicial = 2.5;
    console.log('computador')
}
let velocidade = velocidadeInicial;




const aumentarVelocidade = () => {
    velocidade += 0.1
    sectionVelocidade.innerText = velocidade.toFixed(1);

}

const iconeMusic = () => {
    const som = document.createElement('i');

    if (audioCorrida.muted) {
        som.className = 'fa-solid fa-volume-xmark'
    } else {
        som.className = 'fa-solid fa-volume-high'
    }
    botaoSom.innerHTML = ''
    botaoSom.appendChild(som);
}

const ativarDesativarSom = () => {
    botaoSom.addEventListener('click', () => {
        audioCorrida.muted = !audioCorrida.muted
        iconeMusic();
    })
}


preOponentes.forEach((imagemPath) => {
    const imagem = new Image();
    imagem.src = imagemPath;
    oponentes.push(imagem);
})

player.style.marginLeft = 0;
player.style.marginBottom = 0;

chao.style.backgroundPositionX = 0;

window.onload

const fInfoLocal = () => {
    const infoLocal = localStorage.getItem('info');
    const trof = document.createElement('img');
    const locTrof = document.getElementById('pts');
    trof.src = 'imagens/trofeu.png'
    trof.className = 'trofeu';
    if (infoLocal) {
        info = (JSON.parse(infoLocal));
        //Ordena os valores de ordem decrescente
        info.sort((a, b) => b.pontos - a.pontos)
        bestScore.innerText = `${info[0].nome} - ${info[0].pontos} pts`
        locTrof.innerHTML = ''
        locTrof.appendChild(trof);
    }
}
const somarScore = () => {

    score += 1;
    campoScore.innerText = score;

}


const mensagemInicio = () => {
    const container = criarPopUp();
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
    nome.style.maxWidth = '30vw'
    nome.id = 'nomePlayer';
    const botaoStart = document.createElement('button');
    botaoStart.innerText = 'Começar';
    botaoStart.style.margin = '15px';
    botaoStart.style.padding = '8px';
    botaoStart.style.border = '1px solid black';
    botaoStart.style.borderRadius = '50px';
    botaoStart.style.fontWeight = 900;
    botaoStart.style.width = '20vw'
    botaoStart.addEventListener('click', () => {

        start();
    })

    titulo.innerText = "Pressione Enter para começar!"

    const contSelectPlayer = document.createElement('section')
    contSelectPlayer.className = 'selectPlayer';

    players.forEach((elemento, indice) => {
        const boxPlayer = document.createElement('section');
        boxPlayer.className = 'boxPlayer';
        boxPlayer.style.backgroundImage = `url(${elemento})`;
        boxPlayer.style.backgroundSize = 'cover';
        boxPlayer.style.cursor = 'pointer';
        if (indice === 0) {
            boxPlayer.classList.add('selected');
            player.style.backgroundImage = `url(${elemento})`;
        }
        boxPlayer.addEventListener('click', (element) => {
            const allBoxes = document.getElementsByClassName('boxPlayer');
            Object.values(allBoxes).forEach((element) => {
                element.className = 'boxPlayer'
            })
            if (!element.target.classList.contains('selected')) {
                element.target.classList.add('selected')
                player.style.backgroundImage = `url(${elemento})`;
            }
        })

        contSelectPlayer.appendChild(boxPlayer)

    })
    contSelectPlayer.id = 'selectPlayer'
    container.appendChild(nome);
    container.appendChild(contSelectPlayer)
    container.appendChild(botaoStart)
    container.appendChild(titulo);
    return container;
}
const criarPopUp = () => {
    const popUp = document.createElement('section');
    popUp.id = 'popUp';
    popUp.className = 'popUp'
    popUp.style.display = 'flex';
    popUp.style.flexDirection = 'column'
    popUp.style.height = 'fit-content';
    return popUp;
}


const mensagemGameOver = () => {
    const cont = criarPopUp();
    cont.style.flexDirection = 'row';
    const mensagem = document.createElement('section');
    mensagem.className = 'mensagem';
    const h2GameOver = document.createElement('h2');
    const spanGameOver = document.createElement('span');
    spanGameOver.className = 'GameOver';
    spanGameOver.innerText = 'Game Over';
    const h3Pontuacao = document.createElement('h3');
    h3Pontuacao.innerText = `Pontuação: ${score}`
    const h5Press = document.createElement('h5');
    h5Press.innerText = `Pressione 'Enter' para tentar novamente.`
    const contBotoes = document.createElement('section');
    contBotoes.className = 'contBotoes';
    const botaoStart = document.createElement('button');
    botaoStart.className = 'btnG'
    botaoStart.innerText = 'Tentar Novamente';

    botaoStart.addEventListener('click', () => {
        start();
    })
    const botaoNovo = document.createElement('button')

    botaoNovo.innerText = 'Novo Jogo';
    botaoNovo.className = 'btnG'
    botaoNovo.addEventListener('click', () => {
        removerPopUp();
        localRespawn.innerHTML = '';
        player.style.animation = '';
        player.style.bottom = '69px';
        player.style.left = '10vw';
        exibirPopUp(mensagemInicio());
    })

    contBotoes.appendChild(botaoStart)
    contBotoes.appendChild(botaoNovo)
    h2GameOver.appendChild(spanGameOver);
    mensagem.appendChild(h2GameOver)
    mensagem.appendChild(h3Pontuacao)

    mensagem.appendChild(contBotoes)
    mensagem.appendChild(h5Press)
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
    elemento.style.display = 'flex';
    pagina.appendChild(elemento)
}
const removerPopUp = () => {
    console.log(1)
    const campoPopUp = document.getElementById('popUp')
    console.log(campoPopUp.parentNode)
    campoPopUp.parentNode.removeChild(campoPopUp)
}



document.addEventListener('keydown', (element) => {
    const tecla = element.key;
    console.log(estado)
    if (estado === 'run' || tecla === 'Enter') {
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
    }

})

document.addEventListener('touchstart', () => {
    if (estado === 'run') {
        pular();
    }
})

const moveChao = () => {
    // chao.style.animation = `moverObj ${tamanhoTela / 200 * velocidade}s linear infinite`;
    // audioCorrida.play();
    // audioCorrida.loop = true;

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

const moverChao = () => {
    audioCorrida.play();
    audioCorrida.loop = true;
    chao.style.left = chao.offsetLeft - 10 + 'px';
    if (chao.offsetLeft < -chao.offsetWidth / 2) {
        chao.style.left = 0;
    }
}

const moverObstaculo = (obstaculo) => {

    obstaculo.style.left = obstaculo.offsetLeft - 10 + 'px';

    if ((obstaculo.getBoundingClientRect().x < 0)) {
        localRespawn.removeChild(obstaculo);
        somarScore();
    }

}

const criarObstaculo = () => {
    // console.log(document.getElementsByClassName('obstacle').length)
    if (document.getElementsByClassName('obstacle').length === 0) {
        const obstaculo = document.createElement('span')
        oponenteAleatorio = oponentes[Math.floor(Math.random() * oponentes.length)]
        console.log(oponenteAleatorio);
        obstaculo.appendChild(oponenteAleatorio);
        obstaculo.className = 'obstacle'
        localRespawn.appendChild(obstaculo);
        moverIntervalo = setInterval(() => {
            moverObstaculo(obstaculo);

        }, (Math.round(tamanhoTela / (25 * (velocidade)))));
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
    clearInterval(verificaVelocidade);
    clearInterval(moverIntervalo)
    clearInterval(movimentoChao);
    player.style.animationPlayState = 'paused';
    estado = 'stop';
    clearInterval(pontuacaoInterval);
    const resultado = info.filter(objeto => objeto.nome === Pname)
    if (resultado.length > 0) {
        if (score > resultado[0].pontos) {
            const indiceObj = info.indexOf(resultado[0])
            info[indiceObj] = { nome: Pname, pontos: score }
            localStorage.setItem('info', JSON.stringify(info));
        }
    } else {
        info.push({ nome: Pname, pontos: score })
        localStorage.setItem('info', JSON.stringify(info));
    }

    exibirPopUp(mensagemGameOver());
    fInfoLocal();
    fBestScore();
    score = 0;

}


const posicaoPlayer = () => {
    const posicaoX = player.getBoundingClientRect().x;
    const posicaoY = player.getBoundingClientRect().y;
    const limites = [];
    limites.push(posicaoX);
    limites.push(posicaoX + player.getBoundingClientRect().width * 0.9);
    limites.push(alturaTela - posicaoY - 209);
    return limites;
}

const posicaoObstaculos = () => {
    const obstaculos = document.getElementsByClassName('obstacle');
    const limites = []
    Object.values(obstaculos).forEach((obstaculo) => {
        limites.push(obstaculo.getBoundingClientRect().x)
        limites.push(obstaculo.getBoundingClientRect().x + 95);
        limites.push(alturaTela - obstaculo.getBoundingClientRect().y - 70);
    })
    return limites
}

const fBestScore = () => {
    const trof = document.createElement('span');
    trof.className = 'trofeu';
    if (info.length > 0) {
        if (score > info[0].pontos) {
            bestScore.appendChild(trof)
            bestScore.innerText = ` ${Pname} - ${score} pts`
        }
    }
}

const verificaColisao = () => {
    fInfoLocal();
    fBestScore()
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
    velocidade = velocidadeInicial;
    movimentoChao = setInterval(() => {
        moverChao();
    }, (Math.round(tamanhoTela / (25 * (velocidade)))));

    if (document.getElementById('nomePlayer')) {
        nomeInput = document.getElementById('nomePlayer').value;
    }
    nomeInput.trim() !== '' && (Pname = nomeInput);
    removerPopUp();
    campoPlayer.innerText = `${Pname} :`;
    campoScore.innerHTML = 0;
    const obstaculos = document.getElementsByClassName('obstacle');
    // moveChao();
    obstaculoAleatorio();
    localRespawn.innerHTML = '';
    player.style.animation = '';
    player.style.bottom = '69px';
    player.style.left = '10vw';
    sectionVelocidade.innerText = velocidade.toFixed(1);
    verificaIntervalo = setInterval(verificaColisao, 10);
    verificaVelocidade = setInterval(aumentarVelocidade, 10000)
}

const obstaculoAleatorio = () => {
    if (estado !== 'run') {
        obstaculoInterval = setInterval(() => {
            criarObstaculo();
        }, Math.random() * frequencia + 1500);
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
fInfoLocal();
ativarDesativarSom();
iconeMusic();