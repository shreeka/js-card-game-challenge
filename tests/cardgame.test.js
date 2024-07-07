const {createNewDeck,shuffleDeck,drawACard,playCardGame} = require('../cardgame');

describe('Shuffle deck test', () => {
    beforeAll(() => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
    });

    afterAll(() => {
        jest.spyOn(global.Math, 'random').mockRestore();
    });

    test('New deck has 40 cards', () => {
        expect(createNewDeck()).toHaveLength(40);
    });

    test('shuffleDeck function shuffles the deck', () => {
        const deck = [1,2,3,4,5,6,7,8,9,10];
        const shuffledDeck =  shuffleDeck(deck);
        const expectedShuffledDeck = [9,3,4,5,6,7,8,1,10,2];

        expect(shuffledDeck).toStrictEqual(expectedShuffledDeck);
    });

});

describe('Draw card test', () => {
    let consoleSpy;
    let mathSpy;
    beforeAll(() => {
        consoleSpy = jest.spyOn(global.console, 'log').mockImplementation(() => {});
        mathSpy = jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
    });

    afterAll(() => {
        consoleSpy.mockRestore();
        mathSpy.mockRestore();
    });

    test('If empty draw pile, discard pile shuffled into draw pile', () => {
        let player = {
            drawPile: [],
            discardPile: [1,2,3,4,5,6,7,8,9,10]
        };
        drawACard(player); // To trigger shuffle
        const expectedShuffledDrawPileAfterDrawn = [9,3,4,5,6,7,8,1,10]; // After 2 is drawn from the pile

        expect(player.drawPile).toStrictEqual(expectedShuffledDrawPileAfterDrawn);

    });
});

describe('Playing a turn test', () => {
   test('When comparing two cards, higher card wins', () => {
       let player1 = {
         drawPile: [7],
         discardPile: []
       };
       let player2 = {
         drawPile: [10],
         discardPile: []
       };
       const consoleSpy =
           jest.spyOn(console, 'log').mockImplementation(() => {});

       playCardGame(player1,player2);
       const lastLogCall = consoleSpy.mock.calls[consoleSpy.mock.calls.length - 1][0];
       expect(lastLogCall).toBe('Player 2 wins the game!');


   });
   test('When comparing two cards of same value, winner of next round wins all 4', () => {
       let player1 = {
         drawPile: [7,9],
         discardPile: []
       };
       let player2 = {
         drawPile: [7,2],
         discardPile: []
       };
       const consoleSpy =
           jest.spyOn(console, 'log').mockImplementation(() => {});

       playCardGame(player1,player2);
       const lastLogCall = consoleSpy.mock.calls[consoleSpy.mock.calls.length - 1][0];
       expect(lastLogCall).toBe('Player 1 wins the game!');


   });


});

