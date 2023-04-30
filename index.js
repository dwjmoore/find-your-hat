const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
	constructor(field) {
		this._field = field;
		this._playerLocation = [0, 0];
		this._gameOn = true;
	}

	runGame() {
		console.log("Welcome to the game. Go find your hat, but don't fall into a hole.")
		while (this._gameOn) {
			this.print();
			this.inputPlayerMove();
			// test player location
			// update field or end game
			this._gameOn = false;
		}
		console.log("Thank you for playing! Good bye!");
	}

	print() {
		const len = this._field[0].length;
		for (let i = 0; i < len; i++) {
			console.log(this._field[i].join(''));
		}
	}

	inputPlayerMove() {
		let tempLocation = this._playerLocation;
		const fieldColLength = this._field.length;
		const fieldRowLength = this._field[0].length

		let playerMove = prompt("What direction to you want to go? Type L, R, U, or D: ");
		playerMove = playerMove.toUpperCase();

		while (playerMove !== "L" && playerMove !== "R" && playerMove !== "U" && playerMove !== "D") {
			playerMove = prompt("Invalid entry. Type L, R, U, or D: ");
			playerMove = playerMove.toUpperCase();
		}

		if (playerMove === "U") tempLocation[0] -= 1;
		if (playerMove === "D") tempLocation[0] += 1;
		if (playerMove === "L") tempLocation[1] -= 1;
		if (playerMove === "R") tempLocation[1] += 1;

		while (tempLocation[0] < 0 || tempLocation[0] >= fieldColLength || tempLocation[1] < 0 || tempLocation[1] >= fieldRowLength) {
			if (playerMove === "U") tempLocation[0] += 1;
			if (playerMove === "D") tempLocation[0] -= 1;
			if (playerMove === "L") tempLocation[1] += 1;
			if (playerMove === "R") tempLocation[1] -= 1;

			playerMove = prompt("Out of bounds! Try a different direction: ");
			playerMove = playerMove.toUpperCase();

			while (playerMove !== "L" && playerMove !== "R" && playerMove !== "U" && playerMove !== "D") {
				playerMove = prompt("Invalid entry. Type L, R, U, or D: ");
				playerMove = playerMove.toUpperCase();
			}

			tempLocation = this._playerLocation;
			if (playerMove === "U") tempLocation[0] -= 1;
			if (playerMove === "D") tempLocation[0] += 1;
			if (playerMove === "L") tempLocation[1] -= 1;
			if (playerMove === "R") tempLocation[1] += 1;
		}

		console.log(`Your location is ${this._playerLocation}`);
	}


}

const field = new Field([
	['*', '░', 'O', '░', '░', '░', '░', '░'],
	['░', 'O', '░', '░', '░', '░', '░', '░'],
	['░', '^', '░', '░', '░', '░', '░', '░'],
	['░', 'O', '░', '░', '░', '░', '░', '░'],
	['░', 'O', '░', '░', '░', '░', '░', '░'],
	['░', 'O', '░', '░', '░', '░', '░', '░'],
	['░', 'O', '░', '░', '░', '░', '░', '░'],
	['░', 'O', '░', '░', '░', '░', '░', '░'],
]);
field.runGame();

/*
testPlayerLocation() {
	if (this._field[this._playerLocation[0]][this._playerLocation[1]] === hat) {
		console.log("You found your hat! You win!");
		// call method to exit the program
	}
	if (this._field[this._playerLocation[0]][this._playerLocation[1]] === hole) {
		console.log("You fell down a hole. Game over!");
		// call method to exit program
	}
}
*/