
let divShowRockets = document.getElementsByClassName("showRockets")[0] as HTMLDivElement;
let rockets:rocket[] = [];
let player:number = 1;

// Crea random rocket
function createRandomRocket(num:number) {
    let engines:number[] = [];
    let code:string = Math.random().toString(36).replace(/[^a-z,0-9]+/g, '').substr(0, 5); //Crea código alfanumérico aleatorio
    for (let i = 0; i<3; i++) {
        engines[i] = (Math.floor(Math.random()*10))*10; //Crea motor de potencia aleatoria
    }
    let newRocket:Rocket = new Rocket(code, engines); //Crea nuevo rocket

    rockets.push(newRocket); //Añade el rocket al array de rockets
    console.log(rockets);  
}

//Mostrar rocket en tabla
function displayRocket(player:number, rocket:Rocket) {
    let code = document.getElementById("p"+player+"-code");
    code?.innerHTML = rocket.code;

    for (let i=0; i<3; i++) {
        let engine = document.getElementById("p"+player+"-engine"+(i+1));
        engine?.innerHTML = rocket.engines[i];
    }
}

//Crea rocket para jugador 1 ¡¡¡¡¡¡¡ ESTO SE PUEDE OPTIMIZAR FIJO !!!!!!!!!!
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
let startGame = document.getElementById("startGame");
startGame?.addEventListener("click", function() {
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
function changeEngine(enginePlayer:number) {
    if (enginePlayer == 2) {
        enginePlayer = 0;
    } else {
        enginePlayer++;
    }
    return enginePlayer;
}

//Función Avance Rocket
function advanceRocketX2(rocket:Rocket, enginePlayer:number) {
    rocket.position += rocket.engines[enginePlayer];
}

//Función Avance x2 Rocket
function advanceRocketX2(rocket:Rocket, enginePlayer:number) {
    rocket.position += ((rocket.engines[enginePlayer])*2);
}

//Función comprobar si hay ganador
function checkWinner(rockets:Rocket[]) {
    let playersControls = document.getElementById("playersControls");
    let showWinner = document.getElementById("showWinner");
    let rocket1 = document.getElementById("rocket1");
    let rocket2 = document.getElementById("rocket2");
    let divRockets = document.getElementById("divRockets");
    if (rockets[1].position ==1000 || rockets[0].position > 1000) {
        rocket2.style.left = 1030 + "px";
        showWinner?.innerHTML = "Gana el jugador 2 ! ! !"
        playersControls?.classList.remove("d-flex");
        playersControls?.classList.add("d-none");
        showWinner?.classList.remove("d-none");
        divRockets?.classList.remove("overflow-hidden");
        rocket1.src = "assets/explosion.svg";
    } else if (rockets[0].position ==1000 || rockets[1].position > 1000) {
        rocket2.style.left = 1030 + "px";
        showWinner?.innerHTML = "Gana el jugador 1 ! ! !"
        playersControls?.classList.remove("d-flex");
        playersControls?.classList.add("d-none");
        showWinner?.classList.remove("d-none");
        divRockets?.classList.remove("overflow-hidden");
        rocket2.src = "assets/explosion.svg";
    }
}

function game() {
    console.log("game started");

    let acceleratePlayer1 = document.getElementById("acceleratePlayer1") as HTMLButtonElement;
    let accelerateX2Player1 = document.getElementById("accelerateX2Player1") as HTMLButtonElement;
    let passPlayer1 = document.getElementById("passPlayer1") as HTMLButtonElement;
    let enginePlayer1:number = 0;
    let position1 = document.getElementById("showPosition1");
    let rocket1 = document.getElementById("rocket1");
    
    let acceleratePlayer2 = document.getElementById("acceleratePlayer2") as HTMLButtonElement;
    let accelerateX2Player2 = document.getElementById("accelerateX2Player2") as HTMLButtonElement;
    let passPlayer2 = document.getElementById("passPlayer2") as HTMLButtonElement;
    let enginePlayer2:number = 0;
    let position2 = document.getElementById("showPosition2");
    let rocket2 = document.getElementById("rocket2");

    let turn:boolean = true;

    acceleratePlayer1.disabled = false;
    accelerateX2Player1.disabled = false;
    passPlayer1.disabled = false;
    
    acceleratePlayer2.disabled = true;
    accelerateX2Player2.disabled = true;
    passPlayer2.disabled = true;

                                  
    acceleratePlayer1.addEventListener("click", function() {
        rockets[0].position += rockets[0].engines[enginePlayer1];
        position1?.innerHTML = "Posición: "+rockets[0].position;
        rocket1.style.left = rockets[0].position + "px";
        enginePlayer1 = changeEngine(enginePlayer1);
        turn = !turn;
        checkWinner(rockets);
        disableButtons(turn);
    });
    accelerateX2Player1.addEventListener("click", function(){
        rockets[0].position += ((rockets[0].engines[enginePlayer1])*2);
        position1?.innerHTML = "Posición: "+rockets[0].position;
        rocket1.style.left = rockets[0].position + "px";
        enginePlayer1 = changeEngine(enginePlayer1);
        turn = !turn;
        checkWinner(rockets);
        disableButtons(turn);
    });
    passPlayer1.addEventListener("click", function(){
        enginePlayer1 = changeEngine(enginePlayer1);
        turn = !turn;
        checkWinner(rockets);
        disableButtons(turn);
    });
    

    disableButtons(turn);
    acceleratePlayer2.addEventListener("click", function() {
        rockets[1].position += rockets[1].engines[enginePlayer2];
        position2?.innerHTML = "Posición: "+rockets[1].position;
        rocket2.style.left = rockets[1].position + "px";
        enginePlayer2 = changeEngine(enginePlayer2);
        turn = !turn;
        checkWinner(rockets);
        disableButtons(turn);
    });
    accelerateX2Player2.addEventListener("click", function(){
        rockets[1].position += ((rockets[1].engines[enginePlayer2])*2);
        position2?.innerHTML = "Posición: "+rockets[1].position;
        rocket2.style.left = rockets[1].position + "px";
        enginePlayer2 = changeEngine(enginePlayer2);
        turn = !turn;
        checkWinner(rockets);
        disableButtons(turn);
    });
    passPlayer2.addEventListener("click", function(){
        enginePlayer2 = changeEngine(enginePlayer2);
        turn = !turn;
        checkWinner(rockets);
        disableButtons(turn);
    });
}















/////////////////////////////////////////////////////////////////////////////
/*
let rockets:Rocket[] = [];      // Crea un array para almacenar cohetes
let divShowRockets = document.getElementsByClassName("showRocket")[0] as HTMLDivElement;
let acceleration:number = 10;   // Determina la aceleración

// Función pora imprimir cohete
function printRocket(rocket:Rocket){
    let showRocket = document.createElement("p");
    showRocket.innerHTML = rocket.printRocket();
    divShowRockets.appendChild(showRocket);
}

// Función pora crear cohete y mostrar sus botones de control e impresión
function createRocket(code:string, engines:number[]) {
          // Crea instancia de cohete
    console.log(rocket);        // Muestra cohete en consola
    rockets.push(rocket);       // Añade cohete al array de cohetes
    
    let accelerateRocketsDiv = document.getElementsByClassName("accelerateRockets")[0];
    let printRocketsDiv = document.getElementsByClassName("printRockets")[0];
    
    // Crea botón de aceleración
    let accelerateDiv = document.createElement("div");
    let accelerateButton = document.createElement("button");
    accelerateButton.className = "accelerateRocket"+code;
    accelerateButton.innerHTML = "Accelerate Rocket "+code;
    accelerateButton.addEventListener("click", function(){
        rocket.accelerate(acceleration);
    });
    accelerateDiv.appendChild(accelerateButton);

    // Crea botón de freno
    let brakeButton = document.createElement("button");
    brakeButton.className = "brakeRocket"+code;
    brakeButton.innerHTML = "Brake Rocket "+code;
    brakeButton.addEventListener("click", function(){
        rocket.accelerate(-acceleration);
    });
    accelerateDiv.appendChild(brakeButton);
    accelerateRocketsDiv.appendChild(accelerateDiv);

    // Crea botón de impresión
    let printButton = document.createElement("button");
    printButton.className = "printRocket"+code;
    printButton.innerHTML = "Print Rocket "+code+" info";
    printButton.addEventListener("click", function(){
        divShowRockets.innerHTML = "";
        printRocket(rocket);
    });
    printRocketsDiv.appendChild(printButton);

}


let createRocket1Input = document.getElementById("createRocket1") as HTMLButtonElement;
createRocket1Input?.addEventListener("click", function(){
    createRocket("32WESSDS",[10,30,80]);
    createRocket1Input.disabled = true;
});
*/

// Imprime información de todos los cohetes
let printAllRocketsInput = document.getElementById("printAll");
printAllRocketsInput?.addEventListener("click", function(){
    divShowRockets.innerHTML = "";
    
    rockets.forEach(element => printRocket(element));
});

