let arrayPalavras = [];
fetch("palavras.json")
    .then(response => response.json())
    .then(data => {
        arrayPalavras = data;
        selecionaPalavra(arrayPalavras);
        
    })

let tema;
let palavraSorteada;
let palavraSecreta = [];
let palavraResultado = [];
let underline;
let errou;
let erros = [];
let vida = 7;
let input;
let vitoria;
let derrota;

function getTema () {
    tema = document.getElementById("select-temas").value;
    return tema;
}

function selecionaPalavra(arrayPalavras) {
    getTema();
    const indicePalavra = parseInt(Math.random() * arrayPalavras[tema].length);
    palavraSorteada = arrayPalavras[tema][indicePalavra];
    palavraSorteada = palavraSorteada.toUpperCase();
    return defineForca(palavraSorteada);
}

function defineForca(palavraSorteada) {
    palavraSecreta = palavraSorteada.split("")
    palavraResultado = palavraSecreta.map(char => { return "_"});
    palavraLimpa = palavraResultado.join("");
    underline = document.getElementById('palavra-secreta')
    underline.innerHTML = (palavraLimpa);
    return palavraLimpa, palavraSecreta;
}

function recebeLetra (letra) {
    let posicaoLetra = palavraSecreta.indexOf(letra);

    if (palavraResultado.includes(letra)) {
        alert('Letra ja descoberta');
        return;
    } else if ( erros.includes(letra)) {
        alert('Letra ja descoberta!');
        return;
    }

    if (posicaoLetra == -1) {
        errou = document.getElementById('letras-erradas');
        erros.push(letra);
        errou.innerHTML = erros.join(', ');
        vidasForca(--vida)
        return;
    }
    while (posicaoLetra != -1) {
        palavraResultado[posicaoLetra] = letra;
        posicaoLetra = palavraSecreta.indexOf(letra, posicaoLetra + 1);
        palavraLimpa = palavraResultado.join("");
        underline = document.getElementById('palavra-secreta')
        underline.innerHTML = (palavraLimpa);
        console.log(palavraResultado);
        console.log(palavraSecreta);
    }
    return;
}


function vidasForca (vida) {
 
    switch (vida) {
        case 6:
            document.getElementById('forca-img').src="./assets/images/Forca 1.png";
            break;
        case 5:
            document.getElementById('forca-img').src="./assets/images/Forca 2.png";
            break;
        case 4:
            document.getElementById('forca-img').src="./assets/images/Forca 3.png";
            break;
        case 3:
            document.getElementById('forca-img').src="./assets/images/Forca 4.png";
            break;
        case 2:
            document.getElementById('forca-img').src="./assets/images/Forca 5.png";
            break;
        case 1:
            document.getElementById('forca-img').src="./assets/images/Forca 6.png";
            break;
        case 0:
            document.getElementById('forca-img').src="./assets/images/Forca 7.png";
            break;
    }

    if ( vida == 0) {
        alert('Perdeste');
        derrota = document.getElementById('derrotas').innerHTML;
        derrota++;
        //vida = 7;
        vidasForca(vida);
        erros = [];
        errou.innerHTML = erros;
        return selecionaPalavra(arrayPalavras), derrota;
    }
}

function computaVitoria() {
    if (palavraLimpa.indexOf('_') === -1) {
        alert('Ganhaste');
        vitoria = document.getElementById('vitorias').innerHTML;
        vitoria++;
        vidasForca(vida);
        console.log(vitoria);
        return palavraSorteada, vitoria;
    }
}

/*
function vitoria() {
    alert("ACERTOOOU!");
}
function derrota(palavra) {
    alert(`ERRRRROOOU!!! A palavra era ${PALAVRA SECRETA}`);
}*/

document.onkeyup = (event) => {
    if (event.key === "Enter") {
        selecionaPalavra(arrayPalavras);
        return;
    } else if (event.keyCode == 186) {
        input = event.key;
        recebeLetra(input.toUpperCase());
        return;
    }
    if (event.keyCode > 90 || event.keyCode < 65) {
        return;
    }
    input = event.key;
    recebeLetra(input.toUpperCase());
}