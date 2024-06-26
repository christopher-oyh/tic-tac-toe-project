# Tic Tac Toe Project

This project is a collection of implementations of the classic game Tic Tac Toe in multiple flavors: React, TypeScript, and Vanilla JavaScript.

## Project Structure

The project is divided into three main directories, each representing a different implementation of the game:

- `react/`: This directory contains the React implementation of the game. The main entry point of the application is App.tsx. The game logic is handled by the `App` component and various helper functions in utils.ts.

- `typescript/`: This directory contains the TypeScript implementation of the game. The main entry point of the application is app.ts.

- `vanilla/`: This directory contains the Vanilla JavaScript implementation of the game. The main entry point of the application is app.js.

## Game Features

Each implementation of the game includes the following features:

- A game board where players can make their moves.
- A turn indicator that shows which player's turn it is.
- A score board that keeps track of the number of wins for each player and the number of ties.
- A reset game button that allows players to start a new game.
- A reset scores button that resets the score board.
- A modal that appears when the game ends, displaying the winner or indicating a draw.
- Local storage to persist the scores across page reloads.
- State Management allowing game to be played in multiple tabs.

## Running the Game

The Game is hosted on GitHub Pages. You can play the game by visiting the following link: [Tic Tac Toe](https://christopher-oyh.github.io/tic-tac-toe-project/)

## Game Play

![Tic Tac Toe](./images/game.png)

![Game Over](./images/game-over.png)

![Menu](./images/menu.png)
