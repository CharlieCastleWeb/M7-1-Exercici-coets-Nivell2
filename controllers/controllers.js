var divShowRockets = document.getElementsByClassName("showRockets")[0];
var rockets = [];
var player = 1;
// Variables Jugador 1
var acceleratePlayer1 = document.getElementById("acceleratePlayer1");
var accelerateX2Player1 = document.getElementById("accelerateX2Player1");
var passPlayer1 = document.getElementById("passPlayer1");
var enginePlayer1 = 0;
var position1 = document.getElementById("showPosition1");
var rocket1 = document.getElementById("rocket1");
// Variables Jugador 2
var acceleratePlayer2 = document.getElementById("acceleratePlayer2");
var accelerateX2Player2 = document.getElementById("accelerateX2Player2");
var passPlayer2 = document.getElementById("passPlayer2");
var enginePlayer2 = 0;
var position2 = document.getElementById("showPosition2");
var rocket2 = document.getElementById("rocket2");
var turn = true;
var showWinner = document.getElementById("showWinner");
// Crea random rocket
function createRandomRocket() {
    var engines = [];
    var code = Math.random().toString(36).replace(/[^a-z,0-9]+/g, '').substr(0, 5); //Crea código alfanumérico aleatorio
    for (var i = 0; i < 3; i++) {
        engines[i] = (Math.floor(Math.random() * 10)) * 10; //Crea motor de potencia aleatoria
    }
    var newRocket = new Rocket(code, engines, 0); //Crea nuevo rocket
    rockets.push(newRocket); //Añade el rocket al array de rockets
    console.log(rockets);
}
//Mostrar rocket en tabla
function displayRocket(player, rocket) {
    var code = document.getElementById("p" + player + "-code");
    code.innerHTML = rocket.code;
    for (var i = 0; i < 3; i++) {
        var engine = document.getElementById("p" + player + "-engine" + i);
        engine.innerHTML = "" + rocket.engines[i];
    }
}
//Crea rocket para jugador 1
var createRocket1Input = document.getElementById("createRocket1");
createRocket1Input === null || createRocket1Input === void 0 ? void 0 : createRocket1Input.addEventListener("click", function () {
    createRandomRocket();
    createRocket1Input.disabled = true;
    displayRocket(1, rockets[0]);
});
//Crea rocket para jugador 2
var createRocket2Input = document.getElementById("createRocket2");
createRocket2Input === null || createRocket2Input === void 0 ? void 0 : createRocket2Input.addEventListener("click", function () {
    createRandomRocket();
    createRocket2Input.disabled = true;
    displayRocket(2, rockets[1]);
});
//Empezar juego
var startGame = document.getElementById("startGame");
startGame.addEventListener("click", function () {
    startGame.disabled = true;
    game();
});
//Desactivar botones jugador que no tiene turno
function disableButtons(turn) {
    if (turn) {
        acceleratePlayer1.disabled = false;
        accelerateX2Player1.disabled = false;
        passPlayer1.disabled = false;
        acceleratePlayer2.disabled = true;
        accelerateX2Player2.disabled = true;
        passPlayer2.disabled = true;
    }
    else {
        acceleratePlayer1.disabled = true;
        accelerateX2Player1.disabled = true;
        passPlayer1.disabled = true;
        acceleratePlayer2.disabled = false;
        accelerateX2Player2.disabled = false;
        passPlayer2.disabled = false;
    }
}
//Función cambio motor
function changeEngine(player, enginePlayer) {
    var playerEngine = document.getElementById("p" + player + "-engine" + enginePlayer);
    playerEngine === null || playerEngine === void 0 ? void 0 : playerEngine.classList.remove("bg-dark", "text-light", "font-weight-bold");
    if (enginePlayer == 2) {
        enginePlayer = 0;
    }
    else {
        enginePlayer++;
    }
    playerEngine = document.getElementById("p" + player + "-engine" + enginePlayer);
    playerEngine === null || playerEngine === void 0 ? void 0 : playerEngine.classList.add("bg-dark", "text-light", "font-weight-bold");
    return enginePlayer;
}
//Función cambio display de paneles
function changeDisplays() {
    var playersControls = document.getElementById("playersControls");
    var divRockets = document.getElementById("divRockets");
    playersControls === null || playersControls === void 0 ? void 0 : playersControls.classList.remove("d-flex");
    playersControls === null || playersControls === void 0 ? void 0 : playersControls.classList.add("d-none");
    showWinner.classList.remove("d-none");
    divRockets.classList.remove("overflow-hidden");
}
//Función comprobar si hay ganador
function checkWinner(rockets) {
    if (rockets[1].position == 1000 || rockets[0].position > 1000) {
        rocket2.style.left = 1030 + "px";
        showWinner.innerHTML = "Gana el jugador 2 ! ! !";
        changeDisplays();
        rocket1.src = "./views/assets/explosion.svg";
    }
    else if (rockets[0].position == 1000 || rockets[1].position > 1000) {
        rocket2.style.left = 1030 + "px";
        showWinner.innerHTML = "Gana el jugador 1 ! ! !";
        changeDisplays();
        rocket2.src = "./views/assets/explosion.svg";
    }
}
//Actualizar Jugador 1
function updatePlayer1() {
    position1.innerHTML = "Posición: " + rockets[0].position;
    rocket1.style.left = rockets[0].position + "px";
    enginePlayer1 = changeEngine(1, enginePlayer1);
    turn = !turn;
}
//Actualizar Jugador 2
function updatePlayer2() {
    position2.innerHTML = "Posición: " + rockets[1].position;
    rocket2.style.left = rockets[1].position + "px";
    enginePlayer2 = changeEngine(2, enginePlayer2);
    turn = !turn;
}
function game() {
    acceleratePlayer1.addEventListener("click", function () {
        rockets[0].position += rockets[0].engines[enginePlayer1];
        updatePlayer1();
        checkWinner(rockets);
        disableButtons(turn);
    });
    accelerateX2Player1.addEventListener("click", function () {
        rockets[0].position += ((rockets[0].engines[enginePlayer1]) * 2);
        updatePlayer1();
        checkWinner(rockets);
        disableButtons(turn);
    });
    passPlayer1.addEventListener("click", function () {
        enginePlayer1 = changeEngine(1, enginePlayer1);
        turn = !turn;
        checkWinner(rockets);
        disableButtons(turn);
    });
    disableButtons(turn);
    acceleratePlayer2.addEventListener("click", function () {
        rockets[1].position += rockets[1].engines[enginePlayer2];
        updatePlayer2();
        checkWinner(rockets);
        disableButtons(turn);
    });
    accelerateX2Player2.addEventListener("click", function () {
        rockets[1].position += ((rockets[1].engines[enginePlayer2]) * 2);
        updatePlayer2();
        checkWinner(rockets);
        disableButtons(turn);
    });
    passPlayer2.addEventListener("click", function () {
        enginePlayer2 = changeEngine(2, enginePlayer2);
        turn = !turn;
        checkWinner(rockets);
        disableButtons(turn);
    });
}
