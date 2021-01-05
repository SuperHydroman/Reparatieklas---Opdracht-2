var currentQuestion = 0;
var commentContainer = document.getElementById("comment-container");


function startStemWijzer() {
	while(commentContainer.firstChild) {
		commentContainer.removeChild(commentContainer.lastChild);
	}
	console.log("All childs cleared! :)");
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
	let button_text = ["Eens", "Geen van beide", "Oneens", "Sla deze vraag over <i class=\"fas fa-long-arrow-alt-right\"></i>"]

	let createMyRow = document.createElement("DIV");
	createMyRow.classList.add("row");
	createMyRow.id = "button-row";
	commentContainer.appendChild(createMyRow);

	for (var i = 0 ; i < 4; i++) {
		let createButton = document.createElement("BUTTON");
		createButton.innerHTML = button_text[i];
		createButton.id = "button-" + (i+1);
		createButton.classList.add("button");
		document.getElementById("button-row").appendChild(createButton);
	}

}

function loadQuestion(index) {
	document.getElementById("statement-title").innerHTML = (index + 1) + ". " + subjects[index].title;		// Creates the Title of the Statement
	document.getElementById("statement-comment").innerHTML = subjects[index].statement;						// Creates the Comment of the Statement

	createButtons();
}