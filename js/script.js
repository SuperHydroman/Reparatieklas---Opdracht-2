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
var totalScore = [];
var checkBoxArray = [];

/*
 * 	Start of the code
 */

 for (var i = 0; i < parties.length; i++) {
 	totalScore[parties[i].name] = {
 		score: 0
 	}
 }

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
			if (document.getElementById("checkbox-row") != null) {					// are already created, if so: The will be removed from the DOM
				document.getElementById("checkbox-row").remove();					// Only for going back a few questions and then go back to the last question.
				createButtons();													// This is so that you get no error.
			}
		}
	}
	else {
		createCheckBoxesContainer();
		setScore();
		questionsComplete = true;
		checkboxesCreated = true;
		console.log("Finished all questions. Well played.");
		console.log("");
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

function resetBTN() {
	for (var i = 1; i <= 4; i++) {
		document.getElementById("button-" + i).style.backgroundColor = "black";
	}
}

function colorButton() {				// Controls button colors.
	let btn1 = document.getElementById("button-1");
	let btn2 = document.getElementById("button-2");
	let btn3 = document.getElementById("button-3");
	let btn4 = document.getElementById("button-4");

	resetBTN();
	switch (answers[currentQuestion]) {
		case "pro":
			btn1.style.backgroundColor = "#01B4DC";
			break;
		case "none":
			btn2.style.backgroundColor = "#01B4DC";
			break;
		case "contra":
			btn3.style.backgroundColor = "#01B4DC";
			break;
		case "skipped":
			btn4.style.backgroundColor = "#01B4DC";
			break;
		default:
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

	let checkBoxRow = document.getElementById("checkbox-row");

	for (let i = 0; i < 3; i++) {
		let col_div = document.createElement("DIV");
		col_div.classList.add("col-4");
		col_div.id = "column_" + (i+1);
		checkBoxRow.appendChild(col_div);
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
		checkBoxArray[i] = subjectCheckBox;
	}
	let nextBTN = document.createElement("BUTTON");
	nextBTN.innerHTML = "Volgende <i class=\"fas fa-long-arrow-alt-right\"></i>";
	nextBTN.style.width = "100%";
	nextBTN.classList.add("button", "mt-3");
	checkBoxRow.appendChild(nextBTN);

}

function setScore() {										// Adds score to the corresponding party if your answer is the same as party's answer
	for (let i = 0; i < subjects.length; i++) {
		for (let j = 0; j < subjects[i].parties.length; j++) {
			if (answers[i] == subjects[i].parties[j].position) {
				totalScore[subjects[i].parties[j].name].score += 1;
				console.log(answers[i] + " ═════════•°• > ⚠ < •°•═════════ " + subjects[i].parties[j].position)

				if (checkBoxArray[i].checked) {				// Checks if checkbox is checked, if so. Give one additional point to the corrsponding party
					totalScore[subjects[i].parties[j].name].score += 1;
					console.log(answers[i] + " ═════════•°• > ⚠ < •°•═════════ " + subjects[i].parties[j].position)
				}
			}
		}
	}
}

function removeChilds(id) {									// Custom method I made to easily remove childs from the specified DOM element.
	while(document.getElementById(id).firstChild) {
		document.getElementById(id).removeChild(document.getElementById(id).lastChild);
	}
	console.log("All childs cleared! :)");
}