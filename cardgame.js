// Function to create a new deck of 40 cards
function createNewDeck () {
    let deck = [];
    for(let cardNum = 1; cardNum<=10; cardNum++) {
        for(let amount = 1; amount<=4; amount++) {
            deck.push(cardNum);
        }
    }
    return deck;
}

// Function to shuffle a deck of cards using the Fisher-Yates algorithm
function shuffleDeck (deck) {
    let deckLen = deck.length;
    while (--deckLen > 0) {
        let temp = Math.floor(Math.random() * (deckLen + 1));
        [deck[temp], deck[deckLen]] = [deck[deckLen], deck[temp]];
    }
    return deck;
}

// Function to create draw piles for two players
function createDrawPile (shuffledDeck) {
    const midpoint = shuffledDeck.length / 2;
    const player1DrawPile = shuffledDeck.slice(0, midpoint);
    const player2DrawPile = shuffledDeck.slice(midpoint);
    return { player1DrawPile, player2DrawPile };
}

// Function to draw a card from a player's draw pile, and if draw pile is empty, transfer discard pile to draw pile
function drawACard (player) {
    let drawPile = player.drawPile;
    let discardPile = player.discardPile;
    if(drawPile.length === 0) {
        if (discardPile.length === 0) {
            return null; // No cards left to draw
        }else {
            player.drawPile = shuffleDeck([...discardPile]);
            player.discardPile.length = 0;
        }
    }
    return player.drawPile.pop();
}

// Helper function to handle a round win
function resolveRound(winner, tiedRoundPile, player1Card, player2Card) {
    if (tiedRoundPile.length > 0) {
        winner.discardPile.push(player1Card, player2Card, ...tiedRoundPile);
        tiedRoundPile.length = 0;
    } else {
        winner.discardPile.push(player1Card, player2Card);
    }
    console.log(`${winner.playerName} wins this round \n`);
}

const logHands = (player, playerCard) => {
    console.log(`${player.playerName} (${player.drawPile.length + player.discardPile.length}): ${playerCard}`);
}

// Function to play the card game between two players
function playCardGame(player1,player2) {
    let tiedRoundPile = [];
    let continueGame = true;

    while(continueGame) {
        let player1Card = drawACard(player1);
        let player2Card = drawACard(player2);

        if (player1Card === null || player2Card === null) {
            console.log(player1Card === null ? 'Player 2 wins the game!' : 'Player 1 wins the game!');
            continueGame = false;
            break;
        }

        logHands(player1,player1Card);
        logHands(player2,player2Card);

        if (player1Card > player2Card) {
            resolveRound(player1, tiedRoundPile, player1Card, player2Card);
        } else if (player2Card > player1Card) {
            resolveRound(player2, tiedRoundPile, player1Card, player2Card);
        } else { // Both players have same value card
            tiedRoundPile.push(player1Card, player2Card);
            console.log('No winner in this round \n');
        }
    }


}

// Main code to set up and start the game
const newDeck = createNewDeck();
const shuffledDeck = shuffleDeck(newDeck);
const drawPiles = createDrawPile(shuffledDeck);

const player1 = {
    drawPile: drawPiles.player1DrawPile,
    discardPile: [],
    playerName:'Player 1'
}
const player2 = {
    drawPile: drawPiles.player2DrawPile,
    discardPile: [],
    playerName:'Player 2'
}

playCardGame(player1,player2);

module.exports = {createNewDeck,shuffleDeck,drawACard,playCardGame};
