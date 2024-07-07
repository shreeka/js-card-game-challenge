function createNewDeck () {
    let deck = [];
    for(let i = 1;i<=10;i++) {
        for(let j = 1;j<=4;j++) {
            deck.push(i);
        }
    }
    return deck;
}

function shuffleDeck (deck) {
    let i = deck.length;
    while (--i > 0) {
        let temp = Math.floor(Math.random() * (i + 1));
        [deck[temp], deck[i]] = [deck[i], deck[temp]];
    }
    return deck;
}

function createDrawPile (shuffledDeck) {
    let player1DrawPile = [];
    let player2DrawPile = [];
    for (let i = 0; i < 40 ; i = i + 2 ) {
        player1DrawPile.push(shuffledDeck[i]);
        player2DrawPile.push(shuffledDeck[i+1]);
    }
    return {
      player1DrawPile,
      player2DrawPile
    };

}

function drawACard (player) {
    let drawPile = player.drawPile;
    let discardPile = player.discardPile;
    if(drawPile.length === 0) {
        if (discardPile.length === 0) {
            return null;
        }else {
            let shuffledDiscardPile = shuffleDeck([...discardPile]);
            player.drawPile = [...shuffledDiscardPile];
            player.discardPile.length = 0;

        }
    }
    return player.drawPile.pop();
}

function playCardGame(player1,player2) {
    let tiedRoundPile = [];
    let continueGame = true;

    while(continueGame) {
        let player1TotalCards = player1.drawPile.length + player1.discardPile.length;
        let player2TotalCards = player2.drawPile.length + player2.discardPile.length;

        let player1Card = drawACard(player1);
        let player2Card = drawACard(player2);

        if (player1Card === null || player2Card === null) {
            console.log(player1Card === null ? 'Player 2 wins the game!' : 'Player 1 wins the game!');
            continueGame = false;
            break;
        }

        console.log (`Player 1 (${player1TotalCards}): ${player1Card}`);
        console.log (`Player 2 (${player2TotalCards}): ${player2Card}`);

        if (player1Card > player2Card) {
            if (tiedRoundPile.length > 0) {
                player1.discardPile.push(player1Card,player2Card,...tiedRoundPile);
                tiedRoundPile = [];
            }else{
                player1.discardPile.push(player1Card,player2Card);
            }
            console.log('Player 1 wins this round \n');
        } else if (player2Card > player1Card) {
            if (tiedRoundPile.length > 0) {
                player2.discardPile.push(player1Card,player2Card,...tiedRoundPile);
                tiedRoundPile = [];
            }else {
                player2.discardPile.push(player1Card,player2Card);
            }
            console.log('Player 2 wins this round \n');

        } else { // Both players have same value card
            tiedRoundPile.push(player1Card, player2Card);
            console.log('No winner in this round \n');
        }
    }


}

const newDeck = createNewDeck();
const shuffledDeck = shuffleDeck(newDeck);
let drawPiles = createDrawPile(shuffledDeck);

let player1 = {
    drawPile: drawPiles.player1DrawPile,
    discardPile: []
}
let player2 = {
    drawPile: drawPiles.player2DrawPile,
    discardPile: []
}


playCardGame(player1,player2);
module.exports = {createNewDeck,shuffleDeck,drawACard,playCardGame};
