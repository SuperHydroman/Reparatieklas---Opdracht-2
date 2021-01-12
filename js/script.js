var currentQuestion = 0;
var answers = [];
var totalScore = [];
var commentContainer = document.getElementById("comment-container");
var buttonsCreated = false;
var backButton = document.getElementById("arrow-back");

doVisibility();

function startStemWijzer() {
	while(commentContainer.firstChild) {
		commentContainer.removeChild(commentContainer.lastChild);
	}
	// console.log("All childs cleared! :)");
	createContent();
}

function createContent() {
	let createTitle = document.createElement("H1");
	createTitle.id = "statement-title";
	commentContainer.appendChild(createTitle);

	let createComment = document.createElement("P");
	createComment.id = "statement-comment";
	commentContainer.appendChild(createComment);

	loadQuestion(currentQuestion);
}

function createButtons() {
	if (buttonsCreated == false) {
		let button_text = ["Eens", "Geen van beide", "Oneens", "Sla deze vraag over <i class=\"fas fa-long-arrow-alt-right\"></i>"]

		let createMyRow = document.createElement("DIV");
		createMyRow.classList.add("row");
		createMyRow.id = "button-row";
		commentContainer.appendChild(createMyRow);

		for (var i = 0 ; i < 4; i++) {
			let attributes = ['pro', 'none', 'contra', 'skipped'];
			let createButton = document.createElement("BUTTON");
			createButton.innerHTML = button_text[i];
			createButton.id = "button-" + (i+1);
			createButton.classList.add("button");
			createButton.setAttribute('onclick', "nextQuestion('" + attributes[i] + "')");
			document.getElementById("button-row").appendChild(createButton);
		}
		buttonsCreated = true;
	}
}

function doVisibility() {
	if (currentQuestion <= 0) {
		backButton.style.display = "none";
	}
	else {
		backButton.style.display = "initial";
	}
}	

function loadQuestion(index) {
	console.log(answers.length);
	if (answers.length <= 29) {
		document.getElementById("statement-title").innerHTML = (index + 1) + ". " + subjects[index].title;		// Creates the Title of the Statement
		document.getElementById("statement-comment").innerHTML = subjects[index].statement;						// Creates the Comment of the Statement

		// console.log("Question " + (index + 1) + " loaded! At index nr. " + index)
		createButtons();
	}
	else {
		createCheckBoxesContainer();
		console.log("Finished all questions. Well played.");
	}
}

function nextQuestion(answer) {
	// console.log("The users answer was \"" + answer + "\". Loading next question...")
	answers[currentQuestion] = answer;
	currentQuestion++;
	loadQuestion(currentQuestion);
	colorButton();
	doVisibility();
}

function previousQuestion(answer) {
	// console.log("Went back one question! Loading previous answer (if needed)...")
	currentQuestion--;
	loadQuestion(currentQuestion);
	// console.log(document.getElementById("button-1"));
	colorButton();
	doVisibility();
}

function colorButton() {
	let btn1 = document.getElementById("button-1");
	let btn2 = document.getElementById("button-2");
	let btn3 = document.getElementById("button-3");
	let btn4 = document.getElementById("button-4");

	console.log[answers[currentQuestion]];
	if (answers[currentQuestion] == "pro") {
		btn1.style.backgroundColor = "#01B4DC";
		btn2.style.backgroundColor = "black";
		btn3.style.backgroundColor = "black";
		btn4.style.backgroundColor = "black";
	}
	else if (answers[currentQuestion] == "none") {
		btn1.style.backgroundColor = "black";
		btn2.style.backgroundColor = "#01B4DC";
		btn3.style.backgroundColor = "black";
		btn4.style.backgroundColor = "black";
	}
	else if (answers[currentQuestion] == "contra") {
		btn1.style.backgroundColor = "black";
		btn2.style.backgroundColor = "black";
		btn3.style.backgroundColor = "#01B4DC";
		btn4.style.backgroundColor = "black";
	}
	else if (answers[currentQuestion] == "skipped") {
		btn1.style.backgroundColor = "black";
		btn2.style.backgroundColor = "black";
		btn3.style.backgroundColor = "black";
		btn4.style.backgroundColor = "#01B4DC";
	}
	else {
		btn1.style.backgroundColor = "black";
		btn2.style.backgroundColor = "black";
		btn3.style.backgroundColor = "black";
		btn4.style.backgroundColor = "black";
	}
}

function createCheckBoxesContainer() {
	document.getElementById("statement-title").innerHTML = "Zijn er onderwerpen die u extra belangrijk vindt?";
	document.getElementById("statement-comment").innerHTML = "Aangevinkte stellingen tellen extra mee bij het berekenen van het resulaat.";

	


	// let test1 = document.createElement("INPUT");
	// test1.setAttribute('type', 'checkbox');
	// test1.id = "test1";
	// document.getElementById("content").appendChild(test1);

	// let test2 = document.createElement("LABEL");
	// test2.setAttribute('for', 'test1');
	// test2.innerHTML = "Bindend Referendum";
	// document.getElementById("content").appendChild(test2);
}