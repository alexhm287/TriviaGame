

var q1 = {
	question: "What color is an alligator?", 
	answers:["green","red","blue","pink"],
	correctAnswer: 0
}

var q2 = {
	question: "What year did the movie 'Bill and Ted' come out?",
	answers:[1999,1989,1977,1988],
	correctAnswer: 1

}

var questions = [q1,q2];

var gameState = {
	currentQuestion: 0, 
	 
}

//  <input type="radio" name="gender" value="male"> Male<br>
function formatAnswers(q) {
	var html = ""; 
	for (var i=0; i<q.answers.length ; i++) {
		html += "<input type='radio' name='q' value='" + i + "'>" + q.answers[i] + "<br>";
	} 
	return html;

}

function getQuestionHtml() {
	var q = questions[gameState.currentQuestion]; 
	var html = "<h1>" + q.question + "</h1>";
	html += "<p>" + formatAnswers(q);

	return html;
}

function startGame() {
	$("#question").html(getQuestionHtml());
}




$(document).ready(startGame);

//get the radio buttons working to switch to the next question. 

