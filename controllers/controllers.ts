
let divShowRockets = document.getElementsByClassName("showRockets")[0] as HTMLDivElement;
let rockets:Rocket[] = [];
let player:number = 1;

// Variables Jugador 1
let acceleratePlayer1 = document.getElementById("acceleratePlayer1") as HTMLButtonElement;
let accelerateX2Player1 = document.getElementById("accelerateX2Player1") as HTMLButtonElement;
let passPlayer1 = document.getElementById("passPlayer1") as HTMLButtonElement;
let enginePlayer1:number = 0;
let position1 = document.getElementById("showPosition1") as HTMLElement;
let rocket1 = document.getElementById("rocket1") as HTMLImageElement;

// Variables Jugador 2
let acceleratePlayer2 = document.getElementById("acceleratePlayer2") as HTMLButtonElement;
let accelerateX2Player2 = document.getElementById("accelerateX2Player2") as HTMLButtonElement;
let passPlayer2 = document.getElementById("passPlayer2") as HTMLButtonElement;
let enginePlayer2:number = 0;
let position2 = document.getElementById("showPosition2") as HTMLElement;
let rocket2 = document.getElementById("rocket2") as HTMLImageElement;

let turn:boolean = true;
let showWinner = document.getElementById("showWinner") as HTMLElement;

// Crea random rocket
function createRandomRocket() {
    let engines:number[] = [];
    let code:string = Math.random().toString(36).replace(/[^a-z,0-9]+/g, '').substr(0, 5); //Crea código alfanumérico aleatorio
    for (let i = 0; i<3; i++) {
        engines[i] = (Math.floor(Math.random()*10))*10; //Crea motor de potencia aleatoria
    }
    let newRocket:Rocket = new Rocket(code, engines, 0); //Crea nuevo rocket

    rockets.push(newRocket); //Añade el rocket al array de rockets
    console.log(rockets);  
}

//Mostrar rocket en tabla
function displayRocket(player:number, rocket:Rocket) {
    let code = document.getElementById("p"+player+"-code") as HTMLElement;
    code.innerHTML = rocket.code;
    for (let i=0; i<3; i++) {
        let engine = document.getElementById("p"+player+"-engine"+i)  as HTMLElement;
        engine.innerHTML = ""+rocket.engines[i];
    }
}

//Crea rocket para jugador 1
let createRocket1Input = document.getElementById("createRocket1") as HTMLButtonElement;
createRocket1Input?.addEventListener("click", function(){
    createRandomRocket();
    createRocket1Input.disabled = true;
    displayRocket(1, rockets[0]);
});

//Crea rocket para jugador 2
let createRocket2Input = document.getElementById("createRocket2") as HTMLButtonElement;
createRocket2Input?.addEventListener("click", function(){
    createRandomRocket();
    createRocket2Input.disabled = true;
    displayRocket(2, rockets[1]);
});

//Empezar juego
let startGame = document.getElementById("startGame") as HTMLButtonElement;
startGame.addEventListener("click", function() {
    startGame.disabled = true;
    game();
});

//Desactivar botones jugador que no tiene turno
function disableButtons(turn:boolean) {
    if (turn) {
        acceleratePlayer1.disabled = false;
        accelerateX2Player1.disabled = false;
        passPlayer1.disabled = false;
        
        acceleratePlayer2.disabled = true;
        accelerateX2Player2.disabled = true;
        passPlayer2.disabled = true;
    } else {
        acceleratePlayer1.disabled = true;
        accelerateX2Player1.disabled = true;
        passPlayer1.disabled = true;
        
        acceleratePlayer2.disabled = false;
        accelerateX2Player2.disabled = false;
        passPlayer2.disabled = false;
    }
}

//Función cambio motor
function changeEngine(player:number, enginePlayer:number) {
    let playerEngine = document.getElementById("p"+player+"-engine"+enginePlayer);
    playerEngine?.classList.remove("bg-dark", "text-light", "font-weight-bold");
    if (enginePlayer == 2) {
        enginePlayer = 0;
    } else {
        enginePlayer++;
    }
    playerEngine = document.getElementById("p"+player+"-engine"+enginePlayer);
    playerEngine?.classList.add("bg-dark", "text-light", "font-weight-bold");
    return enginePlayer;
}

//Función cambio display de paneles
function changeDisplays() {
    let playersControls = document.getElementById("playersControls") as HTMLDivElement;
    
    let divRockets = document.getElementById("divRockets") as HTMLDivElement;
    
    playersControls?.classList.remove("d-flex");
    playersControls?.classList.add("d-none");
    showWinner.classList.remove("d-none");
    divRockets.classList.remove("overflow-hidden");
}

//Función comprobar si hay ganador
function checkWinner(rockets:Rocket[]) {
    
    if (rockets[1].position ==1000 || rockets[0].position > 1000) {
        rocket2.style.left = 1030 + "px";
        showWinner.innerHTML = "Gana el jugador 2 ! ! !"
        changeDisplays();
        rocket1.src = "./views/assets/explosion.svg";
    } else if (rockets[0].position ==1000 || rockets[1].position > 1000) {
        rocket2.style.left = 1030 + "px";
        showWinner.innerHTML = "Gana el jugador 1 ! ! !"
        changeDisplays();
        rocket2.src = "./views/assets/explosion.svg";
    }
}

//Actualizar Jugador 1
function updatePlayer1() {
    position1.innerHTML = "Posición: "+rockets[0].position;
    rocket1.style.left = rockets[0].position + "px";
    enginePlayer1 = changeEngine(1, enginePlayer1);
    turn = !turn;
}

//Actualizar Jugador 2
function updatePlayer2() {
    position2.innerHTML = "Posición: "+rockets[1].position;
    rocket2.style.left = rockets[1].position + "px";
    enginePlayer2 = changeEngine(2, enginePlayer2);
    turn = !turn;
}

function game() {
    
    acceleratePlayer1.addEventListener("click", function() {   
        rockets[0].position += rockets[0].engines[enginePlayer1];
        updatePlayer1();
        checkWinner(rockets);
        disableButtons(turn);
    });
    accelerateX2Player1.addEventListener("click", function(){
        rockets[0].position += ((rockets[0].engines[enginePlayer1])*2);
        updatePlayer1();
        checkWinner(rockets);
        disableButtons(turn);
    });
    passPlayer1.addEventListener("click", function(){
        enginePlayer1 = changeEngine(1, enginePlayer1);
        turn = !turn;
        checkWinner(rockets);
        disableButtons(turn);
    });
    

    disableButtons(turn);
    acceleratePlayer2.addEventListener("click", function() {
        rockets[1].position += rockets[1].engines[enginePlayer2];
        updatePlayer2();
        checkWinner(rockets);
        disableButtons(turn);
    });
    accelerateX2Player2.addEventListener("click", function(){
        rockets[1].position += ((rockets[1].engines[enginePlayer2])*2);
        updatePlayer2();
        checkWinner(rockets);
        disableButtons(turn);
    });
    passPlayer2.addEventListener("click", function(){
        enginePlayer2 = changeEngine(2, enginePlayer2);
        turn = !turn;
        checkWinner(rockets);
        disableButtons(turn);
    });
}
