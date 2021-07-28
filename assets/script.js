$( document ).ready(function() {
  });



var body = document.body

// *********************************************************************Home page
// Home elements

var homeTitle = $("<div class='page-heading'>Coding Quiz Challenge</div><hr>")
var welcomeText = $("<p id = 'welcomeText' class = 'centerHomeText'>Welcome to the Coding Quiz Challenge, click the button below to start the quiz.</p>")
var rulesText1 = $("<li id = 'rulesText' class = 'centerHomeText'><strong class = 'centerHomeText'>Rule:</strong> 3 minutes quiz, wrong answer will subtract the time by 40 seconds.</li><p class = 'centerHomeText'>Good luck!!</p>")
var startBut = $("<button id='start'>Start Quiz!</button>")
var viewScores = $("<button id='viewScores' class = 'offset-md-3 nav-btn btn btn-success' onclick = 'scoreboardLoad()'>View Highscores</button>")
var clearScoresBtn = $("<button id='clearScoresBtn' class='btn btn-danger' onclick = 'localStorage.clear(); location.reload()'>Clear Scores</button>")
var rulesContainer = $("<ul id='rulesContainer'></ul>")
var rulesTitle = $("<p id='rulesTitle'>Rules</p>")
var rules= $("<li>8 Questions</li><li>Try answering all questions under 3 minutes</li><li>wrong answers will subtract the time by 40 seconds</li>")
function loadHome () {
  document.body.innerHTML = "";
  $(body).append(viewScores)
  $(body).append(homeTitle)
  $(body).append(welcomeText)
  $(body).append(rulesContainer)
  $(body).append(startBut)
  $(rulesContainer)
  .append(rulesTitle)
  .append(rules)
}
loadHome()
$("button").addClass("btn btn-primary")

homeBtn = $("<button id='home' class = 'btn btn-success nav-btn offset-md-3'>Home</button>").on("click", function () {
  loadHome()
})

// ********************************************************************Quiz start
// Start quiz and timer upon clicking the start button

startBut.on("click", function() {
document.body.innerHTML = "";
$(body).append(viewScores)
$(body).append("<p id = 'timerDisplay' class = 'offset-md-3'>Time left:    <span id='countdowntimer'>    </span></p>")
runQuiz (myQASets)
startTimer()

$(body).append("<hr class ='col-md-6 offset-md-3' ><p id = 'feedback'></p>")

});

// Timer function
// Setting play duration to 180 seconds (3 minutes)
function startTimer(){
  time = 180;
  var timerDisplay = document.getElementById("countdowntimer")
  var timer = setInterval(function(){
      time--;
      var minutes = parseInt(time / 60, 10);
      var seconds = parseInt(time % 60, 10);
      timerDisplay.innerHTML = minutes + ":" +seconds;
      if (seconds < 10) {
        timerDisplay.innerHTML = minutes + ":" + "0" + seconds;
      } else {
        timerDisplay.innerHTML = minutes + ":" +seconds;
      }
      if (time < 0) {
          clearInterval(timer);
          alert("Time is up!")
          document.body.innerHTML = "";
          nameAndScore(score)
      }
      $(".lastAns").on("click", function () {
        clearInterval(timer);
        document.body.innerHTML = "";
          nameAndScore(score)
        
     })
  }, 1000);
}

// Quiz questions    
var myQASets= [ {
  question: "1. The following expression : 'typeof(3);' will return:",
  answers: {
    1: "string",
    2: "number",
    3: "true"
  },
  correctAnswer: "number"
},
{
  question: "2. The following expression : 'NaN === NaN;' will return:",
  answers: {
    1: "NaN",
    2: "true",
    3: "false"
  },
  correctAnswer: "false"
},
{
  question: "3. The following expression : 'Math.pow(3,3);' will return:",
  answers: {
    1: "6",
    2: "27",
    3: "3.3",
    4: "9"
  },
  correctAnswer: "27"
},
{
  question: "4. Which of the following tags is used to insert a blank line?",
  answers: {
    1: "<br>",
    2: "<h1>",
    3: "<hr>",
    4: "<p>"
  },
  correctAnswer: "<br>"
},
{
  question: "5. The ___ tag set provides information to the browser about your webpage including the author name and keywords.",
  answers: {
    1: "<html></html>",
    2: "<body></body>",
    3: "<style></style>",
    4: "<meta></meta>"
  },
  correctAnswer: "<meta></meta>"
},
{
  question: "6. What does CSS stand for?",
  answers: {
    1: "Custom Style Sheets",
    2: "Customizable Style Sheets",
    3: "Cascading Style Sheets",
    4: "Computer Style Sheets"
  },
  correctAnswer: "Cascading Style Sheets"
},
{
  question: "7. The # symbol specifies that the selector is?",
  answers: {
    1: "id",
    2: "tag",
    3: "class",
  },
  correctAnswer: "id"
},
{
  question:  "8. Which of the following is true about variable naming conventions in JavaScript??",
  answers: {
    1: "You should not use any of the JavaScript reserved keyword as variable name",
    2: "JavaScript variable names should not start with a numeral (0-9)",
    3: "Both of the above",
    4: "None of the above"
  },
  correctAnswer: "Both of the above"
}];

// Score
var score = 0;
// Create question and answer option diplay (after clicking on the start button)
function runQuiz(quiz) {

  var s = 0;
  currentSet = quiz [s]
  var questionDisplay = $("<div class = 'offset-md-4'>")
  questionDisplay.text (currentSet.question)
  $(body).append(questionDisplay)
  var answersOptions = $("<div class = 'offset-md-4'> <div>")
  $(body).append(answersOptions)

// Changes and display question and answer sets
  displaySet()
  function displaySet (){
    currentSet = quiz [s]
    questionDisplay.text (currentSet.question)
    $.each(currentSet.answers, function (x,y) {
      var optionBut = $("<button class = 'ans btn btn-light'>").text(y)
      var ansContainer = $("<div></div>")
      $(optionBut).on("click", function () {
        var feedbackMessage = $("#feedback")
        if ( y === currentSet.correctAnswer) {
          feedbackMessage.text("Correct!")
          score += 10
        } else {
          feedbackMessage.text("Incorrect!")
          time -= 40;
        }
      })
      ansContainer.append(optionBut)
      answersOptions.append(ansContainer)
      if (y !== currentSet.correctAnswer) {
        $(optionBut).attr("class", "ans btn btn-light wrongChoice")
      }
      optionBut.on("click", function () {nextQ()})
      if (s == quiz.length - 1) {
        $(optionBut).attr("class","wrongChoice lastAns")
      }
      }
    )
  }
 


// function that triggers next question/answer set
  function nextQ() {
    if (s < quiz.length - 1) { 
    s++
    currentSet = quiz [s]
    answersOptions.empty()
    displaySet()    
  }
  }
}
// Submit button
var playerName = "";
if (localStorage.length == 0) {
var nameOrder = localStorage.length;
var scoreOrder = localStorage.length;
} else {
  nameOrder = localStorage.length-1;
  scoreOrder = localStorage.length;
}

// Function to submit names and scores at the end of the quiz
function nameAndScore () {
  var getName = $("<input id = 'nameInput'></input>")
  getName.attr("value", "")
  var subm = $("<button id = 'submitPlay'>Submit Result</button>")
  var yourScore =  $("<p class = 'offset-md-4'> Your final score is: " + score + "</p>")
  $(body).append (yourScore)
  $(body).append ("<span class = 'offset-md-4 yourScore'></span>")
  $(".yourScore").append("Enter initials: ").append(getName)
  $(body).append (subm)
  $("#submitPlay").on("click", function () { 
    console.log(nameOrder)
    console.log(scoreOrder)
    if (getName.val() === "") {
      getName.val("-")
    }
    var playerName = getName.val()
    nameOrder == 0 ? nameOrder +=1 : nameOrder +=2; 
    scoreOrder += 2
    console.log(nameOrder)
    console.log(scoreOrder)
    localStorage.setItem (nameOrder,playerName)
    localStorage.setItem (scoreOrder,score)
    scoreboardLoad()
    score = 0;
  } )

}

// Scoreboard
function scoreboardLoad() {
  document.body.innerHTML = "";
  $(body)
  .append(homeBtn)
  .append("<div class='page-heading'>Scoreboard</div><hr>")
  
//Button to return home page
  const btnContainer = document.createElement("div");
  $(btnContainer).attr("id", "scoreboard-btns-container")
  .append(clearScoresBtn)
  $(body).append (btnContainer)
  $(body).append ("<table id = 'scoreboard' class= 'table table-striped offset-md-3' ></table>");
  var scoreboard = $("#scoreboard");
  var thead = $("<thead>")
  var tbody = $("<tbody>")
  var headerRow = $("<tr></tr>");
  var userName = $("<th>Name</th>");
  var userScore = $("<th>Score</th>");
  
  $(scoreboard).append (thead)
  $(scoreboard).append (tbody)
  $(thead).append (headerRow)
  $(headerRow).append(userName);
  $(headerRow).append(userScore);
  for (i=1; i<=localStorage.length;i += 2) {
    var row = $("<tr class = 'resultRow' scope='row'></tr>")
    $(tbody).append (row);
    var storedName = $("<td class = 'storedName'>" + localStorage.getItem (i) + "</td>")
    var storedScore = $("<td class = 'storedScore'>"+ localStorage.getItem (i+1) + "</td>")
    row.append(storedName)
    row.append(storedScore)
    
  }
}

// Show answer contents on buttons
// QA set count/index
var setCount = 0;

// Function setting QA set count to zero
function setToZero() {
  startBut.addEventListener("click", function(){setCount = 0});
}


