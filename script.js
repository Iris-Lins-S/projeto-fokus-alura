const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const displayTempo = document.querySelector('#timer');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const SomPlay = new Audio('/sons/play.wav');
const SomPause = new Audio('/sons/pause.mp3');
const SomFim = new Audio('/sons/beep.mp3');
const iconePause = document.querySelector('.app__card-primary-butto-icon');
let tempoDecorridoEmSegundos = 30 ;
let intervaloId = null;
musica.loop = true;

const botaoIniciar = document.querySelector('.app__card-primary-button');

const duracaoFoco = 30; 
const duracaoDescansoCurto = 5; 
const duracaoDescansoLongo = 15; 


musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 30;
    alterarContexto('foco');
    focoBt.classList.add('active');
    mostrarTempo();
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 5;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
    mostrarTempo();
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 15;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
    mostrarTempo();

});

function alterarContexto(contexto) {
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active');
        
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície. <br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
    
}

const contagemRegressiva = () => {    
    if (tempoDecorridoEmSegundos <= 0){
        // SomFim.play();
        alert('Acabou!');
        const focoAtivo = html.getAttribute('data-contexto') === 'foco';
        if(focoAtivo){
            const evento = new CustomEvent('focoFinalizado');
            document.dispatchEvent(evento);
        }
        parar();
        // tempoDecorridoEmSegundos = 30;
        // mostrarTempo();
        return;
    }
    mostrarTempo();
    tempoDecorridoEmSegundos-= 1;

}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if (intervaloId){
        parar();
        SomPause.play();
        return;
    }
    SomPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iconePause.setAttribute('src', '/imagens/pause.png');
    iniciarOuPausarBt.textContent = 'Pausar';
}

function parar(){
    clearInterval(intervaloId);
    iconePause.setAttribute('src', '/imagens/play_arrow.png');
    iniciarOuPausarBt.textContent = 'Começar';
    intervaloId = null;
    
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}
mostrarTempo();