let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

//Gato
let gatox = 0;
let gatoy = 0;
const ANCHOGATO = 50;
const ALTOGATO = 50;
const VELOCIDAD = 15;
///Comida
let comidax = 0;
let comiday = 0;
const ANCHOCOMIDA = 30;
const ALTOCOMIDA = 30;

//ctx.fillStyle = "#000000";
function graficarRectangulo(x,y,ancho,alto,color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,ancho,alto);
}   
//Funcion para graficar el gato
function graficarGato(){
    graficarRectangulo(gatox,gatoy,ANCHOGATO,ALTOGATO,"#000000");
}
//Funcion para graficar la comida
function graficarComida(){
    graficarRectangulo(comidax,comiday,ANCHOCOMIDA,ALTOCOMIDA,"#FF0000");
}
//Funcion Iniciar Juego
function iniciarJuego(){
    //gato centro del rectangulo
    gatox = (canvas.width/2) - (ANCHOGATO/2);
    gatoy = (canvas.height/2) - (ALTOGATO/2);
    //Comida en esquina inferior derecha
    comidax = canvas.width - ANCHOCOMIDA;
    comiday = canvas.height - ALTOCOMIDA;

    graficarGato();
    graficarComida();

}
function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}
const LIMITE_X = canvas.width - ANCHOGATO;
const LIMITE_Y = canvas.height - ALTOGATO;

function moverIzquierda(){
    if(gatox > 0){
        gatox-=10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}
function moverDerecha(){
    if(gatox < LIMITE_X){
        gatox+=10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}
function moverArriba(){
    if(gatoy > 0){
        gatoy-=10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}
function moverAbajo(){
    if(gatoy < LIMITE_Y){
        gatoy+=10;
        limpiarCanva();
        graficarGato();
        graficarComida();
        detectarColision();
    }
}
function detectarColision(){
    if(gatoX < comidax + ANCHOCOMIDA && gatoX + ANCHOGATO > comidaX && gatoY < comidaY + ALTOCOMIDA && gatoy + ALTOGATO > comidaY){

        alert("¡Has atrapado la comida!");
        moverComida();
        puntaje=puntaje+1;
        mostrarEnSpan("puntaje",puntaje);
        limpiarCanvas();
        graficarGato();
        graficarComida();
    }
}
function moverComida(){
    comidax = generarAleatorio(0,canvas.width - ANCHOCOMIDA);
    comiday = generarAleatorio(0,canvas.height - ALTOCOMIDA);
}
function reiniciarJuego(){
    puntaje=0;
    mostrarEnSpan("puntaje",puntaje);
    iniciarJuego();
}
function restarTiempo(){
    tiempoRestante-=1;
    mostrarEnSpan("tiempo",tiempoRestante);
}
document.getElementById("btnArriba").onclick = () => moverArriba();
document.getElementById("btnAbajo").onclick = () => moverAbajo();
document.getElementById("btnIzquierda").onclick = () => moverIzquierda();
document.getElementById("btnDerecha").onclick = () => moverDerecha();
document.getElementById("btnReiniciar").onclick = () => reiniciarJuego();
function restarTiempo() {
    let temporizador = setInterval(function () {
        tiempo--;
        mostrarEnSpan('tiempo', tiempo);

        if (tiempo <= 0) {
            alert("Game Over!")
            clearInterval(temporizador);
        }
        if (puntaje === 6) {
            alert("¡Ganaste!");
            clearInterval(temporizador);
        }
    }, 1000);
}

if (!(tiempo <= 0)) {
    restarTiempo();
}
function reiniciarJuego() {
    puntaje = 0;
    tiempo = 30;
    mostrarEnSpan("puntaje", puntaje);
    mostrarEnSpan("tiempo", tiempo);
    limpiarCanva();
    graficarGato();
    graficarComida();
    restarTiempo();
    iniciarJuego();
}