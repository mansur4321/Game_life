let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let start_btn = document.querySelector('.start');
let oneStep_btn = document.querySelector('.oneStep');
let stop_btn = document.querySelector('.stop');


function life(x, y) {
	ctx.beginPath();
	ctx.clearRect(x, y, per, per);
	ctx.lineWidth = 2;
	ctx.fillStyle = '#fff';
	ctx.strokeStyle = '#000';
	ctx.fillRect(x, y, per, per);
	ctx.strokeRect(x, y, per, per);
}
function dead(x, y) {
	ctx.beginPath();
	ctx.clearRect(x, y, per, per);
	ctx.lineWidth = 2;
	ctx.fillStyle = '#000';
	ctx.strokeStyle = '#fff';
	ctx.fillRect(x, y, per, per);
	ctx.strokeRect(x, y, per, per);
}

function arrСoord(coord) {
	return Math.floor((coord / 10) / 8);
}

function neighbour(i, j) {
	let sum = 0;
	let x = -1;
	let y = -1;

	 for (let q = 0; q < 9; q++) {
		if (x == 2) {
			y += 1;
			x = -1;
		}

		if (x == 0 && y == 0) {
			x += 1;
			continue;
		}else if ((i + y) >= 0 && (i + y) <= 9 && (j + x) >= 0 && (j + x) <= 9) {
			if (pixel[i + y][j + x] == true) {
				sum += 1; 
			}
		}


		x += 1;
	}
	

	return sum;
}

let pixel = [];
let myInterval;
const per = 80;


canvas.onclick = function(event) {
	let myX = event.offsetX;
	let myY = event.offsetY;

	let i = arrСoord(myY)
	let j = arrСoord(myX);


	if (pixel[i][j] == true) {	
		dead(j * per, i * per);
		pixel[i][j] = false;
	}else {
		life(j * per, i * per);
		pixel[i][j] = true;
	}
}

oneStep_btn.onclick = () => {checkForLife()}

start_btn.onclick = () => {
	myInterval = setInterval(() => {checkForLife()}, 500);
}

stop_btn.onclick = function() {clearInterval(myInterval)}

function step() {
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			if (pixel[i][j] == true) {
				life(j * per, i * per);
			}else {
				dead(j * per, i * per);
			}
		}		
	}	
}

function generationNewLife(arrayN) {
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			if (arrayN[i][j] == 3) {
				pixel[i][j] = true;
			}else if (arrayN[i][j] < 2 || arrayN[i][j] > 3) {
				pixel[i][j] = false;
			}
		}		
	}	


	step();
}

function checkForLife() {
	let arrNeighbour = [];


	for (let i = 0; i < 10; i++) {
		arrNeighbour[i] = [];


		for (let j = 0; j < 10; j++) {
			arrNeighbour[i][j] = neighbour(i, j);
		}		
	}	


	generationNewLife(arrNeighbour);
}


function goPole() {
	let x = 0;
	let y = 0;


	for (let i = 0; i < 10; i++) {
		pixel[i] = [];


		for (let j = 0; j < 10; j++) {
			pixel[i][j] = false;
			dead(x, y);
			x += per;
		}


		x = 0;
		y +=per;
	}
}

goPole();

console.log(pixel);