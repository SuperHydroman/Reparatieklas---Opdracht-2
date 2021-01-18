/*
 * 	Global Variables
 */

var currentQuestion = 0;
var answers = [];
var totalScore = [];
var commentContainer = document.getElementById("comment-container");
var buttonsCreated = false;
var backButton = document.getElementById("arrow-back");
var questionsComplete = false;
var checkboxesCreated = false;

/*
 * 	Start of the code
 */

doVisibility();

function startStemWijzer() {				// Starts the StemWijzer
	removeChilds("comment-container");

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

function createButtons() {											// This functions creates the buttons ONLY if the don't exist yet
	if (buttonsCreated == false || questionsComplete == true) {
		let button_text = ["Eens", "Geen van beide", "Oneens", "Sla deze vraag over <i class=\"fas fa-long-arrow-alt-right\"></i>"]
		questionsComplete = false;

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

function doVisibility() {				// Controls the visibility of the "BACK button"
	if (currentQuestion <= 0) {
		backButton.style.visibility = "hidden";
	}
	else {
		backButton.style.visibility = "visible";
	}
}	

function loadQuestion(index) {
	// console.log(answers.length);		<== DEBUGGING
	// console.log(currentQuestion);	<== DEBUGGING

	if (currentQuestion <= 29) {
		document.getElementById("statement-title").innerHTML = (index + 1) + ". " + subjects[index].title;		// Creates the Title of the Statement
		document.getElementById("statement-comment").innerHTML = subjects[index].statement;						// Creates the Comment of the Statement

		console.log("Question " + (index + 1) + " loaded! At index nr. " + index);
		console.log("");
		createButtons();
		if(currentQuestion == 29 && checkboxesCreated == true) {					// Checks if you're at the last questions and if the checkboxes
			document.getElementById("checkbox-row").remove();						// are already created, if so: The will be removed from the DOM
			createButtons();
		}
	}
	else {
		createCheckBoxesContainer();
		questionsComplete = true;
		checkboxesCreated = true;
		console.log("Finished all questions. Well played.");
	}
}

function nextQuestion(answer) {			// Saves the answer and goes to the next question.
	console.log("The users answer was \"" + answer + "\". Loading next question...")
	answers[currentQuestion] = answer;
	currentQuestion++;
	colorButton();
	loadQuestion(currentQuestion);
	doVisibility();
}

function previousQuestion() {			// Goes back one questions and retrieves the previous saved answer.
	console.log("Went back one question! Loading previous answer (if needed)...")
	currentQuestion--;
	loadQuestion(currentQuestion);
	colorButton();
	doVisibility();
}

function colorButton() {		// Controls button colors.
	let btn1 = document.getElementById("button-1");
	let btn2 = document.getElementById("button-2");
	let btn3 = document.getElementById("button-3");
	let btn4 = document.getElementById("button-4");

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

function createCheckBoxesContainer() {		// Creates the CheckBoxes after all questions have been answered.
	document.getElementById("statement-title").innerHTML = "Zijn er onderwerpen die u extra belangrijk vindt?";
	document.getElementById("statement-comment").innerHTML = "Aangevinkte stellingen tellen extra mee bij het berekenen van het resulaat.";

	removeChilds("button-row");
	document.getElementById("button-row").id = "checkbox-row";

	for (let i = 0; i < 3; i++) {
		let col_div = document.createElement("DIV");
		col_div.classList.add("col-4");
		col_div.id = "column_" + (i+1);
		document.getElementById("checkbox-row").appendChild(col_div);
	}

	
	for (let i = 0; i < subjects.length; i++) {
		let subjectCheckBox = document.createElement("INPUT");
		subjectCheckBox.setAttribute('type', 'checkbox');
		subjectCheckBox.id = "subject_" + (i+1);

		let subjectLabel = document.createElement("LABEL");
		subjectLabel.setAttribute('for', 'subject_' + (i+1));
		subjectLabel.innerHTML = subjects[i].title;
		subjectCheckBox.style.display = "inline-block";

		if (i <= 9) {
			document.getElementById("column_1").appendChild(subjectCheckBox);
			document.getElementById("column_1").appendChild(subjectLabel);
		}
		else if (i <= 19) {
			document.getElementById("column_2").appendChild(subjectCheckBox);
			document.getElementById("column_2").appendChild(subjectLabel);
		}
		else {
			document.getElementById("column_3").appendChild(subjectCheckBox);
			document.getElementById("column_3").appendChild(subjectLabel);			
		}
	}
}

function removeChilds(id) {			// Custom method I made to easily removev childs from the specified DOM element.
	while(document.getElementById(id).firstChild) {
		document.getElementById(id).removeChild(document.getElementById(id).lastChild);
	}
	console.log("All childs cleared! :)");
}