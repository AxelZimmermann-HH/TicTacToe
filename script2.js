let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 'X'; // Startet mit Spieler 1

function makeMove(index) {
    if (fields[index] === null) { // Nur leere Felder sind spielbar
        fields[index] = currentPlayer; // Setzt das Feld auf das Symbol des aktuellen Spielers. Wechsel geschieht im ARRAY!
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Wechselt den Spieler. 1. True -> Wechsel auf O...
        render(); // Rendert das Spielfeld neu
        document.getElementById('chooseX').classList.toggle('active');
        document.getElementById('chooseO').classList.toggle('active');
    }
}

function render() {
    for (let i = 0; i < fields.length; i++) {
        const field = document.getElementById(`field${i}`);
        if (fields[i] === "X") {
            field.innerHTML = '<img src="img/xmark.svg" alt="X">';
        } else if (fields[i] === "O") {
            field.innerHTML = '<img src="img/circle.svg" alt="O">';
        } else {
            field.innerHTML = ''; // Das Feld bleibt leer, `onclick` wird nicht mehr hier zugewiesen
        }
    }
}

render(); // Initialer Renderaufruf
