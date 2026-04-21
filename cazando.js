let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

// --- CARGA DE ASSETS ---
let imgGato = new Image();
imgGato.src = "gato.png";
let imgComida = new Image();
imgComida.src = "comida.png";

// --- VARIABLES DE ESTADO ---
let puntaje = 0;
let tiempoInicialRonda = 15; // Este tiempo bajará cada vez que ganes una ronda completa
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

// Límites de movimiento
const LIMITE_X = canvas.width - ANCHOGATO;
const LIMITE_Y = canvas.height - ALTOGATO;

// --- FUNCIONES DE DIBUJO ---
function limpiarCanva() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function graficarGato() {
    ctx.drawImage(imgGato, gatox, gatoy, ANCHOGATO, ALTOGATO);
}

function graficarComida() {
    ctx.drawImage(imgComida, comidax, comiday, ANCHOCOMIDA, ALTOCOMIDA);
}

function actualizarJuego() {
    limpiarCanva();
    graficarComida();
    graficarGato();
}

// --- LÓGICA DEL JUEGO ---
function iniciarJuego() {
    clearInterval(temporizador);
    
    puntaje = 0;
    // El tiempo de esta partida será el tiempo base actual (que puede haber bajado)
    tiempoRestante = tiempoInicialRonda; 
    
    // Posiciones iniciales
    gatox = (canvas.width / 2) - (ANCHOGATO / 2);
    gatoy = (canvas.height / 2) - (ALTOGATO / 2);
    moverComida(); 

    // Actualizar Interfaz 
    mostrarEnSpan("tiempo", tiempoRestante); 
    mostrarEnSpan("puntaje", puntaje);
    
    actualizarJuego();
    iniciarTemporizador();
}

function moverComida() {
    // Usa la función de utils.js para posición aleatoria
    comidax = generarAleatorio(0, canvas.width - ANCHOCOMIDA);
    comiday = generarAleatorio(0, canvas.height - ALTOCOMIDA);
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
            
            // DIFICULTAD: Bajamos el tiempo base para la siguiente ronda 
            if (tiempoInicialRonda > 5) { 
                tiempoInicialRonda--; 
            }
            iniciarJuego();
        } else {
            // RECARGA DE TIEMPO: El tiempo vuelve al máximo de la ronda actual
            tiempoRestante = tiempoInicialRonda; 
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
            // Al perder, podrías decidir si resetear tiempoInicialRonda a 15 o dejarlo donde estaba
            iniciarJuego();
        }
    }, 1000);
}

// --- CONTROLES ---
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

// Registro de eventos de botones
document.getElementById("btnArriba").onclick = moverArriba;
document.getElementById("btnAbajo").onclick = moverAbajo;
document.getElementById("btnIzquierda").onclick = moverIzquierda;
document.getElementById("btnDerecha").onclick = moverDerecha;
document.getElementById("btnReiniciar").onclick = function() {
    tiempoInicialRonda = 15; // Reset total de dificultad al pulsar reiniciar
    iniciarJuego();
};