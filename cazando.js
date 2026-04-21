let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

let imgGato = new Image();
imgGato.src = "gato.png";
let imgComida = new Image();
imgComida.src = "comida.png";

let puntaje = 0;
let tiempoInicialRonda = 15; 
let tiempoRestante;
let temporizador;

// Personaje (Gato)
let gatox = 0;
let gatoy = 0;
const ANCHOGATO = 50;
const ALTOGATO = 50;

// Comida
let comidax = 0;
let comiday = 0;
const ANCHOCOMIDA = 30;
const ALTOCOMIDA = 30;

const LIMITE_X = canvas.width - ANCHOGATO;
const LIMITE_Y = canvas.height - ALTOGATO;

function graficarRectangulo(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
}

function graficarGato() {
    ctx.drawImage(imgGato, gatox, gatoy, ANCHOGATO, ALTOGATO);
}

function graficarComida() {
    ctx.drawImage(imgComida, comidax, comiday, ANCHOCOMIDA, ALTOCOMIDA);
}

function iniciarJuego() {
    clearInterval(temporizador);
    
    puntaje = 0;
    tiempoRestante = tiempoInicialRonda; 
    
    // Reducimos el tiempo para la PRÓXIMA vez (mínimo 5s para que sea jugable)
    if (tiempoInicialRonda > 5) { 
        tiempoInicialRonda--; 
    }
    
    // 1. Definir posiciones primero
    gatox = (canvas.width / 2) - (ANCHOGATO / 2);
    gatoy = (canvas.height / 2) - (ALTOGATO / 2);
    moverComida(); 

    // 2. Actualizar Interfaz
    mostrarEnSpan("tiempo", tiempoRestante); 
    mostrarEnSpan("puntaje", puntaje);
    
    // 3. Dibujar y arrancar ciclo
    actualizarJuego();
    iniciarTemporizador();
}

function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function actualizarJuego() {
    limpiarCanva();
    graficarComida();
    graficarGato();
}

function moverIzquierda() {
    if (gatox > 0) {
        gatox -= 15;
        actualizarJuego();
        detectarColision();
    }
}

function moverDerecha() {
    if (gatox < LIMITE_X) {
        gatox += 15;
        actualizarJuego();
        detectarColision();
    }
}

function moverArriba() {
    if (gatoy > 0) {
        gatoy -= 15;
        actualizarJuego();
        detectarColision();
    }
}

function moverAbajo() {
    if (gatoy < LIMITE_Y) {
        gatoy += 15;
        actualizarJuego();
        detectarColision();
    }
}

function detectarColision() {
    if (gatox < comidax + ANCHOCOMIDA && 
        gatox + ANCHOGATO > comidax && 
        gatoy < comiday + ALTOCOMIDA && 
        gatoy + ALTOGATO > comiday) {

        puntaje++;
        mostrarEnSpan("puntaje", puntaje);
        
        if (puntaje === 6) {
            clearInterval(temporizador);
            alert("¡PROTOCOLO COMPLETADO: GANASTE!");
            iniciarJuego();
        } else {
            // Restar tiempo por cada comida y moverla
            tiempoRestante -= 1;
            if (tiempoRestante < 0) tiempoRestante = 0;
            mostrarEnSpan("tiempo", tiempoRestante);
            
            moverComida(); 
            actualizarJuego();
        } 
    }
}

function iniciarTemporizador() {
    temporizador = setInterval(function() {
        tiempoRestante--;
        mostrarEnSpan("tiempo", tiempoRestante);
        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            alert("¡SISTEMA CAÍDO: GAME OVER!");
            iniciarJuego();
        }
    }, 1000);
}

function moverComida() {
    comidax = generarAleatorio(0, canvas.width - ANCHOCOMIDA);
    comiday = generarAleatorio(0, canvas.height - ALTOCOMIDA);
}

// Registro de eventos
document.getElementById("btnArriba").onclick = moverArriba;
document.getElementById("btnAbajo").onclick = moverAbajo;
document.getElementById("btnIzquierda").onclick = moverIzquierda;
document.getElementById("btnDerecha").onclick = moverDerecha;
document.getElementById("btnReiniciar").onclick = iniciarJuego;