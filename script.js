// Dot colors
colors = ['red', 'yellow', 'green', "blue", ];

// Number of dots in a code
length = 3;

// Parts of the web page
responseDiv = document.getElementById("response");
guessDiv = document.getElementById("guess");
dotsDiv = document.getElementById("dots");
menuDiv = document.getElementById("menu");

// An array of random colors is created as the 'secret' code
secret = [];
let choose = function(choices) { // Picks a random element from choices
	return choices[Math.floor(Math.random() * choices.length)];
}
while (secret.length < length) {
    secret[secret.length] = choose(colors);
}

// Makes a dot
function makeDot(color=colors[0], htmlClass="dot") {
	let dot = document.createElement("span");
    dot.style.backgroundColor = color;
	dot.className = htmlClass;
	return dot;
}

// Make the dots that change color
for (let i=0; i<length; i++) {
	guessDiv.appendChild(makeDot('white', 'empty'));
}

// Clears the current guess
function clear() {
	for (let i=0; i<guessDiv.children.length; i++) {
	    guessDiv.children[i].style.backgroundColor = 'white';
	    guessDiv.children[i].className = 'empty';
	}
	responseDiv.innerText = '';
}

// Add a clear button to the page
let clear_button = document.createElement("button");
clear_button.onclick = clear;
clear_button.appendChild(document.createTextNode("Clear"));
menu.appendChild(clear_button);

// Changes the color of the given dot
function addColor(color) {
	// The first 'empty' dot is colored
	for (let i=0; i<guessDiv.children.length; i++) {
	    if (guessDiv.children[i].className == 'empty') {
	        guessDiv.children[i].style.backgroundColor = color;
	        guessDiv.children[i].className = 'dot';
	        break; // No 'empty' dot? Then nothing happens in this loop
	    }
	}
}

// Gives a response to a guess
function respond() {
	let response = "";
	for (let i=0; i<guessDiv.children.length; i++) {
	    if (guessDiv.children[i].style.backgroundColor == secret[i]) {
	        response += "right ";
	    } else if (guessDiv.children[i].className == "dot") {
	        response += "wrong ";
	    }
	}
	responseDiv.innerText = response;
}

// Add a clickable dot for each color
for (let i=0; i < colors.length; i++) {
	let dot = makeDot(colors[i]);
	dot.onclick = function () {
	    addColor(colors[i]);
	    respond();
	};
	dotsDiv.appendChild(dot);
}