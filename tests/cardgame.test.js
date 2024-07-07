const {createNewDeck,shuffleDeck,drawACard,playCardGame} = require('../cardgame');

describe('Task 1: Create a shuffled deck of cards test', () => {
    test('A new deck should contain 40 cards', () => {
        expect(createNewDeck()).toHaveLength(40);
    });

    test('A shuffle function should shuffle a deck', () => {
        const mathSpy =
            jest.spyOn(global.Math, 'random')
                .mockReturnValue(0.123456789); //Mock Math.random()
        const deck = [1,2,3,4,5,6,7,8,9,10];
        const shuffledDeck =  shuffleDeck(deck);
        const expectedShuffledDeck = [9,3,4,5,6,7,8,1,10,2];

        expect(shuffledDeck).toStrictEqual(expectedShuffledDeck);
        mathSpy.mockRestore();
    });

});

describe('Task 2: Draw cards test', () => {
    test('If a player with an empty draw pile tries to draw a card, the discard pile is ' +
        'shuffled into the draw pile', () => {
        const mathSpy =
            jest.spyOn(global.Math, 'random')
                .mockReturnValue(0.123456789); //Mock Math.random()
        const player = {
            drawPile: [],
            discardPile: [1,2,3,4,5,6,7,8,9,10],
            playerName: 'Player1'
        };
        drawACard(player); // To trigger shuffle
        const expectedShuffledDrawPileAfterDrawn = [9,3,4,5,6,7,8,1,10]; // After 2 is drawn from the pile

        expect(player.drawPile).toStrictEqual(expectedShuffledDrawPileAfterDrawn);
        mathSpy.mockRestore();

    });
});

describe('Task 3: Playing a turn test', () => {
    let consoleSpy;
    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

   test('When comparing two cards, the higher card should win', () => {
       let player1 = {
         drawPile: [7],
         discardPile: [],
         playerName:'Player 1'
       };
       let player2 = {
         drawPile: [10],
         discardPile: [],
         playerName:'Player 2'
       };

       playCardGame(player1,player2);
       const lastLogCall = consoleSpy.mock.calls[consoleSpy.mock.calls.length - 1][0];
       expect(lastLogCall).toBe('Player 2 wins the game!');


   });

   test('When comparing two cards of the same value, the winner of the next round should win 4 cards', () => {
       let player1 = {
         drawPile: [7,9],
         discardPile: [],
         playerName: 'Player1'
       };
       let player2 = {
         drawPile: [7,2],
         discardPile: [],
         playerName: 'Player2'
       };

       playCardGame(player1,player2);
       const lastLogCall = consoleSpy.mock.calls[consoleSpy.mock.calls.length - 1][0];
       expect(lastLogCall).toBe('Player 1 wins the game!');
   });


});

