var clockRunning = false; 

var waitTime = 3000;

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

var q3 = {
	question: "What year did Donald Trump win?",
	answers:[1999,1989,1977,1988],
	correctAnswer: 3

}

var questions = [q1,q2,q3];

var gameState = {
	currentQuestion: 0,
	wins: 0,
	losses: 0,
	unanswered: 0
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

function installChangeHandler() {
 	$("input[name=q]").on("change", function(ev)
	  {
	    var val = ev.currentTarget.value;
	    var cq = questions[gameState.currentQuestion];

	     if (cq.correctAnswer == val) {
	    	gameState.wins++;
	    	$("#timeremaining").html("Correct!");
	     }
	     else {
	    	gameState.losses++;
	    	$("#timeremaining").html("Incorrect! The correct answer is " + 
	    		cq.answers[cq.correctAnswer] + "!");
	    }

	    showCorrectAnswer();

	    stopwatch.stop();
    	stopwatch.reset();	
    	gameState.currentQuestion++;
    	if (gameState.currentQuestion >= questions.length) { 
	    		setTimeout(showWins,waitTime);
	    		return;
	    	}

    	setTimeout(function(){
    		stopwatch.start();
    		$("#timeremaining").html(stopwatch.time + " seconds remaining");
    		$("#question").html(getQuestionHtml()); 
    		$("#image").hide();
    		installChangeHandler();
    	},waitTime);
	  });
}

function showWins() {
	$("#question").html("Game Over!<br>Wins:" + 
		gameState.wins + 
		"<br>Losses:" + 
		gameState.losses +
		"<br>Unanswered:" + gameState.unanswered);
	$("#timeremaining").html("");
}

function showCorrectAnswer(){
	$("#question").html("");
	$("#image").show();
	$("#image").html('<iframe src="https://giphy.com/embed/qponxBxNCW772" width="390" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/attack-truck-alligator-qponxBxNCW772">via GIPHY</a></p>');
}
//<iframe src="https://giphy.com/embed/qponxBxNCW772" width="390" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/attack-truck-alligator-qponxBxNCW772">via GIPHY</a></p>
function startGame() {

	$("#question").html(getQuestionHtml());
	stopwatch.start();
	installChangeHandler();
}

var intervalId;

var stopwatch = {

  time: 10,
  
  reset: function() {
 	  stopwatch.time = 10;
  },

  start: function() {
    if (!clockRunning) {
    	clockRunning = true;
    	intervalId = setInterval(stopwatch.count,1000);
    }
  },
  stop: function() {
    clockRunning = false;
    clearInterval(intervalId);
  },
  count: function() {  	
  	if (stopwatch.time <= 0) {
  		stopwatch.reset();
  		gameState.unanswered++;
  		stopwatch.stop();
  		$("#timeremaining").html("Out of time!");
  		showCorrectAnswer();
  		gameState.currentQuestion++;
  		if (gameState.currentQuestion >= questions.length) {
  				setTimeout(showWins,waitTime)
  		}
  		else {
  			setTimeout(function(){
  				stopwatch.reset();
  				stopwatch.start();
  				$("#question").html(getQuestionHtml());
  				$("#image").hide();
  				installChangeHandler();
  				$("#timeremaining").html(stopwatch.time + " seconds remaining");
  			},waitTime);
  		}
  		return;
  	}


  	$("#timeremaining").html(stopwatch.time + " seconds remaining");
  	stopwatch.time--;
  }
};

$(document).ready(function() {
	$("#startbutton").click(function(){
		startGame();
		$("#startbutton").hide();
	});
	
});

