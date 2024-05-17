let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 'X'; // Startet mit Spieler 1

function render() {
    for (let i = 0; i < fields.length; i++) {
        const field = document.getElementById(`field${i}`);
        if (fields[i] === "X") {
            field.innerHTML = '<img src="img/xmark.svg" alt="X">';
            field.onclick = null; // Entfernt den Klick-Handler
        } else if (fields[i] === "O") {
            field.innerHTML = '<img src="img/circle.svg" alt="O">';
            field.onclick = null; // Entfernt den Klick-Handler
        } else {
            field.innerHTML = '';
            field.onclick = function() { play(i); }; // Fügt onclick-Handler dynamisch hinzu
        }
    }
}

function play(index) {
    if (fields[index] === null) { // Prüft, ob das Feld leer ist
        if (currentPlayer === 'X') {
            playerOne(index);
        } else {
            playerTwo(index);
        }
    }
}

function playerOne(index) {
    fields[index] = "X"; // Setzt das Feld auf X
    currentPlayer = 'O'; // Wechselt zum Spieler 2
    render(); // Rendert das Spielfeld neu
    document.getElementById('chooseX').classList.remove('active'); // Entfernt active von Spieler 1
    document.getElementById('chooseO').classList.add('active'); // Fügt active zu Spieler 2 hinzu
}

function playerTwo(index) {
    fields[index] = "O"; // Setzt das Feld auf O
    currentPlayer = 'X'; // Wechselt zurück zu Spieler 1
    render(); // Rendert das Spielfeld neu
    document.getElementById('chooseO').classList.remove('active'); // Entfernt active von Spieler 2
    document.getElementById('chooseX').classList.add('active'); // Fügt active zu Spieler 1 hinzu
}

render(); // Die Render-Funktion einmalig aufrufen, um das initiale Spielfeld anzuzeigen
