const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
	constructor(field) {
		this._field = field;
	}

	print() {
		const len = this._field[0].length;
		for (let i = 0; i < len; i++) {
			console.log(this._field[i].join(''));
		}
	}
}

const field = new Field([
	['*', '░', 'O'],
	['░', 'O', '░'],
	['░', '^', '░'],
]);

field.print();