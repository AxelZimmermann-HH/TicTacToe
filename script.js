let fields = [null, null, null, null, null, null, null, null, null];
let currentPlayer = 'X'; // Startet mit Spieler 1
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function render() {
    for (let i = 0; i < fields.length; i++) {
        const field = document.getElementById(`field${i}`);
        if (fields[i]) {
            let image = fields[i] === 'X' ? 'xmark' : 'circle';
            field.innerHTML = `<img src="img/${image}.svg" alt="${fields[i]}">`;
        } else {
            field.innerHTML = ''; // Stellt sicher, dass das Feld leer ist
            field.classList.remove('winner'); // Entfernt die Gewinner-Klasse
        }
    }
}


function makeMove(index) {
    if (!fields[index] && gameActive) { // Bedingungen: Feld ist leer und Spiel aktiv
        fields[index] = currentPlayer; // Setzt X oder O
        render();
        checkForWin();
        lost();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // wechselt Player
        document.getElementById('chooseX').classList.toggle('active'); // ändert Button-Highlight
        document.getElementById('chooseO').classList.toggle('active');
    }
}


function checkForWin() {
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            gameActive = false; // Stop the game
            highlightWinnerFields(combination);
            clearNonWinnerFields(combination);
            showRestartButton();
            break;
        }
    }
}

function lost() {
    if (fields.every(field => field !== null)) { 
        showRestartButton();
        for (let i = 0; i < 9; i++) { 
            if (fields[i]) { 
                let element = document.getElementById(`field${i}`); 
                element.classList.add('loser'); 
            }    
        }
    }
}


function highlightWinnerFields(winningCombination) {
    for (let i = 0; i < 9; i++) {
        let field = document.getElementById(`field${i}`);
        if (winningCombination.includes(i)) {
            field.classList.add('winner');
        }
    }
}


function clearNonWinnerFields(winningCombination) {
    for (i=0; i<9; i++) {
        let field = document.getElementById(`field${i}`);
        if (!winningCombination.includes(i)) {
            fields[i] = null;
            field.innerHTML = '';
        }
    }
}


function showRestartButton() {
    document.getElementById('playAgain').classList.remove('d-none');
}


function restartGame() {
    fields.fill(null); // Füllt das gesamte Array mit null, um das Spielfeld zurückzusetzen
    gameActive = true;
    currentPlayer = 'X'; // Stellt sicher, dass Spieler X immer beginnt

    clearFields();
    
    document.getElementById('playAgain').classList.add('d-none'); // Entfernt den "Nochmal spielen" Button
    
    document.getElementById('chooseX').classList.add('active'); // Setzt die Active-Klassen korrekt zurück
    document.getElementById('chooseO').classList.remove('active');

    render(); // Zeichnet das Spielfeld neu
}


function clearFields () {
    document.querySelectorAll('.field').forEach(field => { //hier wird die Variable field definiert für alle HTML-Elemente mit class field
        field.classList.remove('winner'); // Entfernt die 'winner' Klasse von allen Feldern
        field.classList.remove('loser');
        field.innerHTML = ''; // Leert den Inhalt aller Felder
        field.onclick = () => makeMove(parseInt(field.id.substring(5))); // Setzt die onClick-Handler zurück
    });
}