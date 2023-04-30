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
			print();
			// take in player move and update player location
			// test player location
			// update field or end game
		}
		console.log("Thank you for playing! Good bye!");
	}

	print() {
		const len = this._field[0].length;
		for (let i = 0; i < len; i++) {
			console.log(this._field[i].join(''));
		}
	}

	
}

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