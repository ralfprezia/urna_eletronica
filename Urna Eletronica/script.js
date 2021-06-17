// variáveis de controle de interface
let seuVotoPara = document.querySelector('.tela-principal-left-1 span');
let cargo = document.querySelector('.tela-principal-left-2 span');
let numeros = document.querySelector('.tela-principal-left-3');
let descricao = document.querySelector('.tela-principal-left-4');
let rodape = document.querySelector('.tela-rodape');
let lateralFotos = document.querySelector('.tela-principal-right');


// variáveis de ambiente
let etapaAtual = 0;
let numeroVoto = '';
let votoEmBranco = false;

// dando inicio a etapa de votação
function comecarEtapa() {

    numeroVoto = ''; // zerando numero do voto da memoria

    let etapa = etapas[etapaAtual];

    let casaDigitos = '';

    // inserindo os digitos para digitar os numeros
    for(let i = 0; i < etapa.numeros; i++) {
        if(i === 0) {
            casaDigitos += '<div class="digito pisca"></div>';    
        } else {
            casaDigitos += '<div class="digito"></div>';
        }        
    }

    // limpando as informações da tela
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    numeros.innerHTML = casaDigitos;
    descricao.innerHTML = '';
    lateralFotos.innerHTML = '';
    rodape.style.display = 'none';
}

// função para alterar as informações da tela
function atualizaInterface() {
    let etapa = etapas[etapaAtual];

    // procurando candidato dentro do array
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero == numeroVoto) {
            return true;
        } else {
            return false;
        }
    });

    // preenchendo a tela com as informações do candidato
    if(candidato.length > 0) {
        candidato = candidato[0]

        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;
        let fotosHtml = '';
        for(let i in candidato.fotos){
            fotosHtml += 
                `<div class="tela-principal-right-image">
                    <img src="images/${candidato.fotos[i].url}" alt="${candidato.fotos[i].legenda}"> ${candidato.fotos[i].legenda}
                </div>`
        }
        lateralFotos.innerHTML = fotosHtml;
        rodape.style.display = 'block';
    } else {
        seuVotoPara.style.display = 'block';
        rodape.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>'
    }

}

// função de captura dos numeros digitados
function clicou(n) {
    // pegando digito pela classe 'digito' e 'pisca'
    let numPiscando = document.querySelector('.digito.pisca');
    
    if(numPiscando != null) {
        numPiscando.innerHTML = n;
        numeroVoto = `${numeroVoto}${n}`; // concatenando digito ao numero de voto

        numPiscando.classList.remove('pisca'); // removendo classe 'pisca'

        if(numPiscando.nextElementSibling !== null) { // verificando se há um próximo elemento
            numPiscando.nextElementSibling.classList.add('pisca'); // acrescentando classe 'pisca' ao próximo elemento
        } else {
            //chamando função para atualizar a tela com as informações
            atualizaInterface();
        }
        
    }
}


// botoes de ações 
function branco() {

    if(numeroVoto == '') {
        votoEmBranco = true;
        numeroVoto = ''; // zerando numero do voto da memoria
        seuVotoPara.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>'
        rodape.style.display = 'block';     
    } else {
        descricao.innerHTML = '<div class="pisca">ANTES DE VOTAR EM BRANCO TECLE CORRIGE</div>'
    }
}

function corrige() {
    comecarEtapa();
}
//1:53mi vídeo youtube
function confirma() {
    let etapa = etapas[etapaAtual];
    
    let votoConfirmado = false;

    if(votoEmBranco === true){
        votoConfirmado = true;
        console.log("Confirmando como BRANCO");
    } else if(numeroVoto.length === etapa.numeros){
        votoConfirmado = true;
        console.log("Confirmado como número");
    }else if(numeroVoto.length == etapa.numeros) {
        votoConfirmado = true;
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecarEtapa();
        }else {
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>'
        }
        
    }
}


// dando start no programa
comecarEtapa();

