window.addEventListener('load', () => {
    const corFundo = localStorage.getItem('corFundo');
    const corFonte = localStorage.getItem('corFonte');
    const tamanhoFonte = localStorage.getItem('tamanhoFonte');
    const espacamento = localStorage.getItem('espacamento');
    const tipoFonte = localStorage.getItem('tipoFonte');

    if (corFundo) {
        fundoDaTela.style.backgroundColor = corFundo;
    };

    if (corFonte) {
        texto.style.color = corFonte;
    };

    if (tamanhoFonte) {
        texto.style.fontSize = tamanhoFonte;
    }

    if (espacamento) {
        texto.style.lineHeight = espacamento;
    }
    if (tipoFonte) {
        for (const elementos of textop) {
            elementos.style.fontFamily = tipoFonte;
        }
    }


})


// propriedades
const fundoDaTela = document.querySelector('body');
const texto = document.querySelector('.texto');
const textop = document.querySelectorAll('.texto *');


// botões

const botoesCorFundo = document.querySelectorAll('.mudarCorFundo button');
const botoesCorFonte = document.querySelectorAll('.mudarCorFonte button');
const botoesTamanhoFonte = document.querySelectorAll('.mudarTamanhoFonte button')
const botoesEspacamento = document.querySelectorAll('.mudarEspacamentoEntreLinhas button')
const botoesMudarTipoFonte = document.querySelectorAll('.mudarTipoFonte button')
const botaoResetar = document.querySelector('.resetar')

console.log(botoesTamanhoFonte)

//funções

const mudarCorDoFundo = () => {
    for (let botoes of botoesCorFundo) {
        botoes.addEventListener('click', (event) => {
            fundoDaTela.style.backgroundColor = event.target.value;
            localStorage.setItem('corFundo', event.target.value)
        })
    }
}

const mudarCorDaFonte = () => {
    for (let botoes of botoesCorFonte) {
        botoes.addEventListener('click', (event) => {
            texto.style.color = event.target.value;
            localStorage.setItem('corFonte', event.target.value)
        })
    }
}

const mudarTamanhoDaFonte = () => {
    for (const botoes of botoesTamanhoFonte) {
        botoes.addEventListener('click', (event) => {
            console.log(event.target.value);
            texto.style.fontSize = event.target.value;
            localStorage.setItem('tamanhoFonte', event.target.value);
        })
    }
}

const mudarEspacamento = () => {
    for (const botoes of botoesEspacamento) {
        botoes.addEventListener('click', (event) => {
            texto.style.lineHeight = event.target.value;
            localStorage.setItem('espacamento', event.target.value);
        })
    }
}

const mudarTipoDaFonte = () => {
    for (const botoes of botoesMudarTipoFonte) {

        botoes.addEventListener('click', (event) => {
            for (const child of textop) {
                child.style.fontFamily = event.target.value;
            }
            localStorage.setItem('tipoFonte', event.target.value)
        })
    }
}

const valoresPadrao = () => {
    botaoResetar.addEventListener('click', () => {
        fundoDaTela.style.backgroundColor = 'white';
        texto.style.color = 'black';
        texto.style.fontSize = '12pt';
        texto.style.lineHeight = 'normal';
        for (const child of textop) {
            child.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        }
        localStorage.clear()
    })
}


// Chamada das funções
mudarCorDoFundo();
mudarCorDaFonte();
mudarTamanhoDaFonte();
mudarEspacamento();
mudarTipoDaFonte();
mudarTipoDaFonte();
valoresPadrao();