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

	static generateField(height, width, holeWeight) {
		let hatLocation = [Math.floor(Math.random() * height), Math.floor(Math.random() * width)];
		while (hatLocation === [0, 0]) {
			hatLocation = [Math.floor(Math.random() * height), Math.floor(Math.random() * width)];
		}

		let field = [];
		for (let i = 0; i < height; i++) {
			field.push([]);
			for (let j = 0; j < width; j++) {
				if (i === 0 && j === 0) {
					field[i][j] = pathCharacter;
				} else if (i === hatLocation[0] && j === hatLocation[1]) {
					field[i][j] = hat;
				} else {
					field[i][j] = Field.weightedRandom([hole, fieldCharacter], [holeWeight, 100 - holeWeight]);
				}
			}
		}
		return field;
	}

	static weightedRandom(items, weights) {
		const cumulativeWeights = [];
		for (let i = 0; i < weights.length; i += 1) {
			cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0);
		}

		const maxCumulativeWeight = cumulativeWeights[cumulativeWeights.length - 1];
		const randomNumber = maxCumulativeWeight * Math.random();

		for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
			if (cumulativeWeights[itemIndex] >= randomNumber) {
				return items[itemIndex];
			}
		}
	}

	runGame() {
		console.log("Welcome to the game. Go find your hat, but don't fall into a hole.")
		while (this._gameOn) {
			this.print();
			this.inputPlayerMove();
			this.testPlayerLocation();
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
		return;
	}

	testPlayerLocation() {
		let rowLocation = this._playerLocation[0];
		let colLocation = this._playerLocation[1];
		if (this._field[rowLocation][colLocation] === hat) {
			console.log("You found your hat! You win!");
			this._gameOn = false;
			return;
		}
		if (this._field[rowLocation][colLocation] === hole) {
			console.log("You fell down a hole. Game over!");
			this._gameOn = false;
			return;
		}
		if (this._field[rowLocation][colLocation] === fieldCharacter) {
			console.log("Update field method to be called");
			this.updateField();
			return;
		}
		console.log("You are going where you have already been.");
		return;
	}

	updateField() {
		let rowLocation = this._playerLocation[0];
		let colLocation = this._playerLocation[1];
		this._field[rowLocation][colLocation] = pathCharacter;
	}
}

const field = new Field(Field.generateField(10, 10, 25));
field.runGame();