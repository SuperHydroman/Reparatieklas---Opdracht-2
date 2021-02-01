/*
 * 	Global Variables
 */

var largeGroupSize = 30;
var currentQuestion = 0;
var answers = [];
var totalScore = [];
var commentContainer = document.getElementById("comment-container");
var buttonsCreated = false;
var backButton = document.getElementById("arrow-back");
var questionsComplete = false;
var checkboxesCreated = false;
var entriesCreated = false;
var surveyFinished = false;
var totalScore = [];
var checkBoxArray = [];
var sortedArray = [];

/*
 * 	Start of the code
 */

 for (var i = 0; i < parties.length; i++) {
 	totalScore[parties[i].name] = {
 		name: parties[i].name,
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
		// setScore();
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
	if (!surveyFinished) {
		console.log("Went back one question! Loading previous answer (if needed)...")
		currentQuestion--;
		loadQuestion(currentQuestion);
		colorButton();
		doVisibility();
	}
	else {
		console.log("Went back to checkboxes!");
	}
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
	nextBTN.setAttribute("onclick", "endScreen()")
	checkBoxRow.appendChild(nextBTN);

}

function endScreen() {
											// Endscreen!!
	document.getElementById("content").style.height = "86vh";
	setScore();
	removeChilds("checkbox-row");

	document.getElementById("checkbox-row").id = "endscreen-row";

	document.getElementById("statement-title").innerHTML = "Eind score";
	document.getElementById("statement-comment").innerHTML = "Verander het overzicht met de knoppen aan de linkerkant";

	sortParties();
	createEndScreenContent();
	surveyFinished = true;
}

function createEndScreenContent() {
	let sideBarDIV = document.createElement("DIV");
	sideBarDIV.classList.add("col-3");
	document.getElementById("endscreen-row").appendChild(sideBarDIV);

	let mainResultDIV = document.createElement("DIV");
	mainResultDIV.classList.add("col-9");
	mainResultDIV.id = "main-result";
	document.getElementById("endscreen-row").appendChild(mainResultDIV);

	// Sidebar
	let optionDIV = document.createElement("DIV");
	optionDIV.classList.add("ml-4");
	sideBarDIV.appendChild(optionDIV);

	let optionText = ["Alle partijen", "Seculaire partijen", "Grote partijen"];
	let optionId = ["show-all", "secular-only", "large-only"];

	for (let i = 0; i < 3; i++) {
		let createOption = document.createElement("INPUT");
		createOption.id = optionId[i];
		createOption.setAttribute("type", "radio");
		createOption.setAttribute("name", "choice");
		createOption.setAttribute("onclick", "createProfileContent()");
		optionDIV.appendChild(createOption);

		let createOptionLabel = document.createElement("LABEL");
		createOptionLabel.innerHTML = optionText[i];
		createOptionLabel.setAttribute("for", optionId[i]);
		if (i === 0) {
			createOption.setAttribute("checked", "");
		}
		createOptionLabel.classList.add("text-left");
		optionDIV.appendChild(createOptionLabel);
	}

	// Profile for all parties
	createProfileContent();
}

function createProfileContent() {
	if (!entriesCreated) {
		for (let i = 0; i < sortedArray.length; i++) {
			let party_qual = calculateQual(i);

			let profileRow = document.createElement("DIV");
			let profile_Pframe = document.createElement("DIV");
			let profile_pic = document.createElement("IMG");
			let profile_qualification = document.createElement("DIV");
			let profile_progressBar = document.createElement("DIV");
			let doQualWidth = document.createElement("DIV");
			let profile_qualificationBar = document.createElement("DIV");
			let qualText = document.createElement("P");

			profileRow.classList.add("row", "prof-row");
			profileRow.id = "endscreen-qual-prof-" + (i+1);
			document.getElementById("main-result").appendChild(profileRow);

			profile_Pframe.classList.add("col-2");
			profile_Pframe.classList.add("text-center");
			profileRow.appendChild(profile_Pframe);

			profile_pic.id = "profile-picture";
			profile_pic.src = "../img/"+ sortedArray[i].name +".png";
			profile_Pframe.appendChild(profile_pic);

			profile_qualification.classList.add("col-10");
			profileRow.appendChild(profile_qualification);

			profile_progressBar.classList.add("progress-bar");
			profile_qualification.appendChild(profile_progressBar);

			doQualWidth.classList.add("fixed-width");
			doQualWidth.style.width = party_qual;					// <=== Function returns width into the style property
			profile_progressBar.appendChild(doQualWidth);

			profile_qualificationBar.classList.add("text-center", "qualification-bar");
			doQualWidth.appendChild(profile_qualificationBar);

			qualText.classList.add("qual-text");
			qualText.innerHTML = party_qual;
			profile_qualificationBar.appendChild(qualText);

			entriesCreated = true;
		}
	}
	else {
		doOptions();
	}
}

function doOptions() {
	let showAll = document.getElementById("show-all");
	let secularOnly = document.getElementById("secular-only");
	let largeOnly = document.getElementById("large-only");

	if (showAll.checked) {
		for (let i = 0; i < sortedArray.length; i++) {
			document.getElementById("endscreen-qual-prof-" + (i+1)).style.display = "flex";
		}
	}
	else if (secularOnly.checked) {
		for (let i = 0; i < sortedArray.length; i++) {
			for (let j = 0; j < parties.length; j++) {
				if (sortedArray[i].name === parties[j].name) {
					if (!parties[j].secular) {
						document.getElementById("endscreen-qual-prof-" + (i+1)).style.display = "none";
					}
					else {
						document.getElementById("endscreen-qual-prof-" + (i+1)).style.display = "flex";	
					}
				}
			}
		}
	}
	else {
		for (let i = 0; i < sortedArray.length; i++) {
			for (let j = 0; j < parties.length; j++) {
				if (sortedArray[i].name === parties[j].name) {
					if (parties[j].size < largeGroupSize) {
						document.getElementById("endscreen-qual-prof-" + (i+1)).style.display = "none";
					}
					else {
						document.getElementById("endscreen-qual-prof-" + (i+1)).style.display = "flex";						
					}
				}
			}
		}
	}
}

function calculateQual(index) {
	return (sortedArray[index].score / 60 * 100).toFixed(2) + "%";
}

function sortParties() {									// Sorts parties from higher to lower score
	for (let i = (subjects.length*2); i >= 0; i--) {
		Object.entries(totalScore).forEach(value => {
			if (value[1].score === i) {
				sortedArray.push({"name":value[1].name, "score":value[1].score});
			}
		});
	}
}

function setScore() {										// Adds score to the corresponding party if your answer is the same as party's answer
	for (let i = 0; i < subjects.length; i++) {
		for (let j = 0; j < subjects[i].parties.length; j++) {
			if (answers[i] == subjects[i].parties[j].position) {
				totalScore[subjects[i].parties[j].name].score += 1;
				// console.log(answers[i] + " ═════════•°• > ⚠ < •°•═════════ " + subjects[i].parties[j].position)

				if (checkBoxArray[i].checked) {				// Checks if checkbox is checked, if so. Give one additional point to the corresponding party
					totalScore[subjects[i].parties[j].name].score += 1;
					// console.log(answers[i] + " ═════════•°• > ⚠ < •°•═════════ " + subjects[i].parties[j].position);
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