window.onload = init;

function init() {
	var button = document.getElementById("sub");
	var buttonGrat = document.getElementById("congrat");
	button.onclick = buttonClick;
	buttonGrat.onclick = buttonCongrat;
}

function buttonClick() {

	var textInput = document.getElementById("input");
	var number = textInput.value;
	count(number);
	// document.write("Вы нажали на кнопку и ввели число " + number);
}

function count(number) {
	document.getElementById("result").innerHTML = 'Результат: abs(' + number + ') = ' + Math.abs(number);
}

function buttonCongrat() {
	var image = document.createElement('img');
	image.src = 'res/cat.gif';
	document.body.appendChild(image);
	// document.write("Поздравляю!");
	}
