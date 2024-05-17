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
        if (fields[i]) {
            let image = fields[i] === 'X' ? 'xmark' : 'circle'; // Hier wird das entsprechende Bild gesetzt, basierend auf currentPlayer
            field.innerHTML = `<img src="img/${image}.svg" alt="${fields[i]}">`;
        } else {
            field.innerHTML = '';
            field.onclick = () => makeMove(i); // Erlaubt Klicks nur auf leeren Feldern
        }
    }
}

render(); // Initialer Renderaufruf
