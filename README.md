# Programming Challenge: Card game

This is a simple card game where two players draw cards from their respective draw piles, compare the values, and add the cards to their discard piles. The game continues until one player loses by losing all their cards to the other player.
This game is built in Javascript.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/package-manager)
- npm (Node Package Manager)


### Install dependencies

Navigate to the project directory and install the required dependencies:

    npm install

### Run the game

You can start to run the game using the following command:

    node cardgame.js

### Run the tests

To run the unit tests for the game:

    npm test

## Game details

- The game starts with a deck of 40 cards, each showing a number from 1 to 10.
- The deck is shuffled and distributed to the two players. 
- Each player receives a stack of 20 cards from the shuffled deck as their
  draw pile.
- Each player draws the top card from their draw pile. 
- The one with the highest card wins the round and gets to keep both of the cards in their discard pile.
- If the drawn cards have the same value,  the winner of the next round wins all cards from the tied rounds.
- If a player's draw pile is empty, their discard pile is shuffled and becomes their new draw pile.
- The game continues until one player has no cards left in both their draw and discard piles. So the remaining player wins the game.
