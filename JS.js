"use strict"

//объявление переменных изменения канваса и кнопок для ивентов
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let start_btn = document.querySelector('.start');
let oneStep_btn = document.querySelector('.oneStep');
let stop_btn = document.querySelector('.stop');

//функции закрашивания клеточки при смерти и жизни
function life(x, y) {
	ctx.beginPath();
	ctx.clearRect(x, y, per, per);
	ctx.lineWidth = 1;
	ctx.fillStyle = '#fff';
	ctx.strokeStyle = '#000';
	ctx.fillRect(x, y, per, per);
	ctx.strokeRect(x, y, per, per);
}
function dead(x, y) {
	ctx.beginPath();
	ctx.clearRect(x, y, per, per);
	ctx.lineWidth = 1;
	ctx.fillStyle = '#000';
	ctx.strokeStyle = '#fff';
	ctx.fillRect(x, y, per, per);
	ctx.strokeRect(x, y, per, per);
}

function arrСoord(coord) {
	return Math.floor(coord / 8);
}

//узнает сколько живых соседей у клеточки
function neighbour(i, j) {
	let sum = 0;
	let x = -1;
	let y = -1;

	//проверяю все клеточки вокруг(соседей) основной на наличие жизни)))
	for (let q = 0; q < 9; q++) {
		if (x == 2) {
			y += 1;
			x = -1;
		}

		if (x == 0 && y == 0) {
			x += 1;
			continue;
		}else if ((i + y) >= 0 && (i + y) <= (perInLine - 1) && (j + x) >= 0 && (j + x) <= (perInLine - 1)) {//проверка на край массива
			if (pixel[i + y][j + x] == true) {
				sum += 1; 
			}
		}


		x += 1;
	}
	

	return sum;
}

//переменные главный массив с режимом жизни, интервал и главные численные переменные для заполнения клеточек
let pixel = [];
let myInterval;
const per = 8;
const perInLine = 100;


//изменение режима жизни у клеточки
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

//ивенты для запуска жизненных циклов и остановки их
oneStep_btn.onclick = () => {checkForLife()}

start_btn.onclick = () => {
	myInterval = setInterval(() => {checkForLife()}, 50);
}

stop_btn.onclick = function() {clearInterval(myInterval)}

//изменяет жизненный цикл клеточки в зависимости от режима ее жизни
function step() {
	for (let i = 0; i < perInLine; i++) {
		for (let j = 0; j < perInLine; j++) {
			if (pixel[i][j] == true) {
				life(j * per, i * per);
			}else {
				dead(j * per, i * per);
			}
		}		
	}	
}

//изменяет режим жизни клеточки по кол-ву соседей запускает step()
function generationNewLife(arrayN) {
	for (let i = 0; i < perInLine; i++) {
		for (let j = 0; j < perInLine; j++) {
			if (arrayN[i][j] == 3) {
				pixel[i][j] = true;
			}else if (arrayN[i][j] < 2 || arrayN[i][j] > 3) {
				pixel[i][j] = false;
			}
		}		
	}	


	step();
}

//записывает сколько соседей у каждой клеточки запускает generationNewLife()
function checkForLife() {
	let arrNeighbour = [];


	for (let i = 0; i < perInLine; i++) {
		arrNeighbour[i] = [];


		for (let j = 0; j < perInLine; j++) {
			arrNeighbour[i][j] = neighbour(i, j);
		}		
	}	


	generationNewLife(arrNeighbour);
}

//заполение поля мертвыми клеточками
function goPole() {
	let x = 0;
	let y = 0;


	for (let i = 0; i < perInLine; i++) {
		pixel[i] = [];


		for (let j = 0; j < perInLine; j++) {
			pixel[i][j] = false;
			dead(x, y);
			x += per;
		}


		x = 0;
		y +=per;
	}
}

goPole();
